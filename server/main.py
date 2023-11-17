from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from cryptography.fernet import Fernet
import datetime
from method.utils import write_json, read_json, validateFormData, validateId, push_json, change_json, compareStrDate, \
    delete_json
from werkzeug.utils import secure_filename
import os
from datetime import timedelta

app = Flask(__name__)

CORS(app)

# some config for constant value of code
app.config["ALLOWED_EXTENSIONS"] = {"jpg", "png", "jpeg"}
app.config["UPLOAD_IMAGE_FOLDER"] = "static"
app.config["DATA"] = "storage.json"

key = b'ZmDfcTF7_60GrrY167zsiPd67pEvs0aGOv2oasOM1Pg='
cipher_suite = Fernet(key)
pathJson = "database/database.json"


@app.route("/login", methods=["GET", "POST"])
def login():
    """
    This function to handle login post request
    :return:
    """
    if request.method == "POST":
        keys = request.form.keys()
        formData = request.form
        if "name" not in keys:
            return jsonify({
                "res": "Please provide the username"
            })
        if "password" not in keys:
            return jsonify({
                "res": "Please provide the password"
            })

        userName, userPassword = formData["name"], formData["password"]

        if userName is None:
            return jsonify({
                "res": "Please provide the username"
            })
        if userPassword is None:
            return jsonify({
                "res": "Please provide the password"
            })

        data = read_json(path="storage.json")
        for temp in data["user"]:
            if userName == temp["userName"]:
                ps = cipher_suite.decrypt(temp["password"]).decode()
                if ps == userPassword:
                    return jsonify({
                        "res": "success",
                        "id": temp["id"]
                    })
                else:
                    return jsonify({
                        "res": "Wrong password, please try again"
                    })
        return jsonify({
            "res": "User doesn't exists"
        })


@app.route("/signin", methods=["GET", "POST"])
def signin():
    if request.method == "POST":
        keys = request.form.keys()
        formData = request.form
        print(formData)
        if "name" not in keys:
            return jsonify({
                "res": "Please provide the username"
            })
        if "password" not in keys:
            return jsonify({
                "res": "Please provide the password"
            })

        userName, userPassword = formData["name"], formData["password"]

        if userName is None:
            return jsonify({
                "res": "Please provide the username"
            })
        if userPassword is None:
            return jsonify({
                "res": "Please provide the password"
            })

        data = read_json(path="storage.json")
        # data = data["user"]
        for temp in data["user"]:
            if "userName" in temp and userName == temp["userName"]:
                return jsonify({"res": "The username already exists"})
        userPassword = str(cipher_suite.encrypt(userPassword.encode()), "utf-8")
        userId = validateId(str(datetime.datetime.now()))
        data["user"].append({
            "id": userId,
            "userName": userName,
            "password": userPassword,
            "product": []
        })
        write_json(app.config["DATA"], data)
        return jsonify({
            "res": 'success',
            "id": userId
        })


@app.route("/", methods=["GET"])
def home():
    data = read_json(path=pathJson)
    deleteData = []
    now = datetime.datetime.now().strftime("%Y%m%d%H")

    for i, temp in enumerate(data["notification"]):
        if compareStrDate(temp['date'], now) == -1:
            print(now, temp['date'])
            deleteData.append(i)

    for idx in deleteData:
        for product_temp in data["beverages"]:
            if product_temp["id"] == data["notification"][idx]["idProduct"]:
                product_temp["discountPercentage"] = 0

    change_json(pathJson, data["beverages"], "beverages")
    delete_json(pathJson, deleteData, "notification")
    return jsonify("yes")





@app.route("/product/", methods=["GET"])
def product():
    idProduct = request.args.get('idProduct')
    data = read_json(path="storage.json")["product"]
    for temp in data:
        if temp["id"] == idProduct:
            return jsonify({
                "res": "success",
                "data": temp
            })


@app.route("/upload/product", methods=["POST"])
def postProduct():
    if request.method == "POST":
        formData = request.form
        '''
        Data send to Server with contains:
        id: idUser store in cookie
        productName: String
        quantity: Int
        Types: Array of String
        Images: Image of type of Types
        Price:  
        '''
        keys = ["idUser", "productName", "quantity", "types", "price"]
        validateFormData(formData, keys)
        idUser = formData["idUser"]
        productName = formData["productName"]
        quantity = int(formData["quantity"])
        typesName = formData["typesName"].split(",")
        if "images" not in request.files:
            return jsonify({
                "res": "Please Provide your product's images"
            })
        images = request.files.getlist("images")
        price = formData["price"]
        data = read_json(app.config["DATA"])

        if len(images) != len(typesName):
            return jsonify({
                "res": "Images must has same size with types"
            })
        if quantity <= 0:
            return jsonify({
                "res": "You must be provide more than 1 product"
            })
        # create id for product
        idProduct = idUser + productName

        imageDir = []

        for index, image in enumerate(images):
            name = os.path.join(app.config["UPLOAD_IMAGE_FOLDER"], typesName[index] + idProduct + ".jpg")
            image.save(name)
            imageDir.append(name.replace('\\', "/").replace(" ", ""))

        obj = {
            "name": productName,
            "price": price,
            "id": idProduct,
            "idUser": idUser,
            "quantity": quantity,
            "type": [
                {"type_name": typesName[i], "image": imageDir[i]} for i in range(len(typesName))
            ]
        }

        for index, user in enumerate(data["user"]):
            if user["id"] == idUser:
                data["user"][index]["product"].append({
                    "id": idProduct,
                    "sold": 0
                })

        purchaseObj = {
            "id": idProduct,
            "data":
                {
                    str(month): [
                        {
                            "type": temp,
                            "quantity": 0,
                        } for temp in typesName
                    ] for month in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                }

        }
        data["product"].append(obj)
        data["purchase"].append(purchaseObj)
        write_json(app.config["DATA"], data)
        return jsonify({
            "res": "success"
        })


@app.route("/purchase/", methods=["POST"])
def purchase():
    """
    idUser: String -> who buy
    idProduct: String
    type: String
    quantity: Int
    step1: validate Product -> Already has, enough
    step2: Push needed data to owner's product, push to purchase category
    :return:
        {
            "res"
        }
    """
    if request.method == "POST":
        keys = ["idUser", "idProduct", "type", "quantity"]
        formData = request.form
        validateFormData(formData, keys)
        data = read_json(app.config["DATA"])
        productData, userData, purchaseData = data["product"], data["user"], data["purchase"]
        # idUser = formData["idUser"]
        idProduct = formData["idProduct"]
        typeProduct = formData["type"]
        quantityProduct = int(formData["quantity"])
        for tempProduct in productData:
            if tempProduct["id"] == idProduct:
                if tempProduct["quantity"] < quantityProduct:
                    return jsonify({
                        "res": "Doesn't enough products for you"
                    })
                tempProduct["quantity"] -= quantityProduct
                for tempUser in userData:
                    if tempUser["id"] == tempProduct["idUser"]:
                        for tempProductUser in tempUser["product"]:
                            if tempProductUser["id"] == idProduct:
                                tempProductUser["sold"] += quantityProduct
                            for tempPurchase in purchaseData:
                                if tempPurchase["id"] == idProduct:
                                    currentMonth = str(datetime.datetime.now().month)
                                    for tempPurchaseMonth in tempPurchase["data"][currentMonth]:
                                        if tempPurchaseMonth["type"] == typeProduct:
                                            tempPurchaseMonth["quantity"] += quantityProduct
                                            write_json(app.config["DATA"], {
                                                "user": userData,
                                                "product": productData,
                                                "purchase": purchaseData
                                            })
                                            return jsonify({
                                                "res": "success"
                                            })

                return jsonify({
                    "res": "Something went wrong, please try again"
                })

        return jsonify({"res": "Doesn't find any product"})


@app.route('/<filename>', methods=['GET'])
def serve_image_from_static(filename):
    return send_from_directory("/", filename)



@app.route("/notification", methods=["POST"])
def thanhdaubuoi():
    if request.method == 'POST':
        keys = ["idProduct", "percentSale", "hourEnd", "message"]
        formData = request.form
        validateFormData(formData, keys)
        data = read_json(pathJson)
        data = data["beverages"]
        product = {}
        for temp in data:
            if temp["id"] == int(formData["idProduct"]):
                product["discountPercentage"] = formData["percentSale"]
                product["title"] = temp["title"]
                product["idProduct"] = temp["id"]
                product["thumbnail"] = temp["thumbnail"]
                temp["discountPercentage"] = int(formData["percentSale"])
                change_json(pathJson, data, 'beverages')
                break
        if product is None:
            return jsonify({"res": "There is no Product"})
        
        endDate = datetime.datetime.now() + timedelta(hours=int(formData["hourEnd"]))
        product["date"] = endDate.strftime("%Y%m%d%H")
        product["message"] = formData["message"]
        push_json(pathJson, product, "notification")
    return jsonify("yses")

if __name__ == "__main__":
    app.run(debug=True)
