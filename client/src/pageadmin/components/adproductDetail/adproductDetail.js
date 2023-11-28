import { useNavigate, useParams } from "react-router-dom";
import "./adproductDetail.scss"
import { getProductdt } from "../../../service/getcategory/getCategory";
import { useEffect, useState } from "react";
import { Button, Image, Layout, Rate } from "antd";
import { Content } from "antd/es/layout/layout";
import AddProductModal from "./admodalDetail";
import Admodaldetail from "./admodalDetail";
import { patchProduct } from "../../../service/patch/patch";
function Adproductdetail () {
  const navigate = useNavigate();
    const params = useParams();
    const param = parseInt(params.id);
    const [data, setData] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [reload, setReload] = useState(true);
    const [show, setShow] = useState(false);
    const selectImage = (index) => {
      setCurrentImage(index);
    };

const patchsp = async (id, values) => {
  const result = patchProduct(id, values);
}
   
useEffect(() => {
  const fetchData = async () => {
    const result = await getProductdt(param);
    if (!result) {
      console.log(result);
    } else {
      console.log(result);
      setData(result);
    }
  };

  fetchData();
}, [reload]);

const handlePatch = (e) => {
const imageArray = [
    e.images_1, e.images_2, e.images_3, e.images_4
]
delete  e.images_1
delete  e.images_2
delete  e.images_3
delete  e.images_4
console.log({
  ...e,
  images: imageArray
})
const updateValues = {
  ...e,
  images: imageArray
}
patchsp(param, updateValues);

  setShow(false);
  setReload(!reload);
}

const handleClick = () => {

  setShow(true);
}

const handleBack = () => {
     navigate("/admin/product/productlist");
}
console.log(data);

    return (
        <>
            <div className="adproduct">
            
            <Button onClick={handleBack} type="primary" className="adproduct--back">
              Quay về
            </Button>
            <Button onClick={handleClick} type="primary" className="adproduct--chinhsua">
              Chỉnh sửa
            </Button>
            <Layout className="adproduct--layout">
            {
              data && data[0] ? (  <Content className="adproduct--content">
            <div className="adproduct--main">
              <div className="adproduct--left">
                <div className="adproduct--left__show">
                  {currentImage !== null && (
                    <Image
                      src={data[0].images[currentImage]}
                      alt={`Selected Image`}
                      className="adproduct--left__selected"
                    />
                  )}
                </div>
                <div className="adproduct--left__list">
                  <Image.PreviewGroup>
                    {Array.isArray(data[0].images) &&
                      data[0].images.map((image, index) => (
                        <div className="adproduct--left__img">
                          {" "}
                          <Image
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className={"adproduct--left__active"}
                            onClick={() => selectImage(index)}
                            onMouseEnter={() => selectImage(index)}
                          />
                        </div>
                      ))}
                  </Image.PreviewGroup>
                </div>
              </div>
              <div className="adproduct--right">
                <h1 className="adproduct--right__title">{data[0].title}</h1>
                <div className="adproduct--right__rate">
                  {data[0].rating != undefined ? (
                    <Rate disabled allowHalf defaultValue={data[0].rating} />
                  ) : (
                    ""
                  )}
                  <p>({data[0].rating})</p>
                </div>
                <div className="adproduct--right__center">
                  <p className="adproduct--right__p1">
                    <b>Thương hiệu:</b> {data[0].brand}
                  </p>
                  <p className="adproduct--right__p2">
                    <b> Loại sản phẩm:</b> {data[0].category}
                  </p>
                </div>
                {data[0].discountPercentage !== 0 ? (
                  <div className="adproduct--right__price">
                    <div className="giatk">
                      <p className="p1">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          `${
                            data[0].price *
                            ((100 - Math.floor(data[0].discountPercentage)) /
                              100)
                          }`
                        )}
                      </p>
                      <p className="tk">
                        <b>(Tiết kiệm: </b>{" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          `${
                            data[0].price -
                            data[0].price *
                              ((100 - Math.floor(data[0].discountPercentage)) /
                                100)
                          }`
                        )}
                        ){" "}
                      </p>
                    </div>
                    <div className="main">
                      <p
                        className={`p2 ${
                          data[0].discountPercentage !== 0 ? "gachngang" : ""
                        }`}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(`${data[0].price}`)}
                      </p>
                      <div className="discount">
                        {data[0].discountPercentage !== 0
                          ? `-${data[0].discountPercentage}%`
                          : ""}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="adproduct--right__price">
                    <p className="giagoc">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(`${data[0].price}`)}
                    </p>
                  </div>
                )}

                <div className="adproduct--button">
                  <p className="adproduct--button__sl">Sản phẩm có sẵn: </p>
                  
                  <div className="adproduct--button__slcl">
                    {data[0].Quantity} sản phẩm
                  </div>
                </div>
              </div>
            </div>
            <div className="adproduct--mota">
              <h1>Chi tiết sản phẩm</h1>
              <hr />
              <p>{data[0].description}</p>
            </div>
          </Content>) : ("")
            }
        
        </Layout>
        <Admodaldetail reload={reload} show={show} setShow={setShow} onPatchProduct={handlePatch} data={data} />
            </div>
        </>
    )
}
export default Adproductdetail;