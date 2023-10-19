import re
import json

file_ = open("storage.json", "rb")
config = json.load(file_)
file_.close()


def validateId(text):
    # Define a regular expression pattern to match special characters and whitespace
    pattern = r'[^a-zA-Z0-9\s]'  # This pattern matches anything that is not a letter, digit, or whitespace

    # Use the sub function to replace matched characters with an empty string
    cleaned_text = re.sub(pattern, '', text).replace(" ", "")

    return cleaned_text


def write_json(path: str, data):
    try:
        with open(path, "w") as outfile:
            json.dump(data, outfile, indent=4)
    except Exception as e:
        print("There is an error in write_json function")
        print(e)


def read_json(path: str):
    try:
        file_json = open(path, "rb")
        jsonObject_ = json.load(file_json)
        file_.close()
        return jsonObject_
    except Exception as e:
        print("There is an error in write_json function")
        print(e)


def validateFormData(formData, keys):
    for key in keys:
        if key not in formData or formData[key] is None:
            assert f'Missing information {key} not in formData or {key} is None'
