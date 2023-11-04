import { Breadcrumb, Image, Layout, Rate } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductdt } from "../../service/getcategory/getCategory";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import "./products.scss";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { useDispatch, useSelector } from "react-redux";
import { add, up } from "../../actions/actCart";

function Productdetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([
    {
      images: [""],
    },
  ]);
  
  const params = useParams();
  const param = parseInt(params.id);
  const [currentImage, setCurrentImage] = useState(0);
  console.log(param);
  const selectImage = (index) => {
    setCurrentImage(index);
  };
  const cookies = getCookie("token");
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const checkId = useSelector(state => state.cartStore);
  const handleClick = (id, infor) => {
    if(cookies) {
      const check = checkId.some(item => {
  return item.id === id;
});
if (check) {
dispatch(up(id));
}
else {
dispatch(add(id, infor));
}
  }
  else {
    navigate("/register");
  }
  console.log(id)
  console.log(infor)
  }

  useEffect(() => {
    // lấy data gốc
    const fetchApi = async (e) => {
      const result = await getProductdt(e);
      if (!result) {
        console.log("coconcac");
      } else {
        setData(result);
        console.log(result);
      }
    };
    fetchApi(param);
  }, []);

  console.log(data[0].rating);
  return (
    <>
      <div className="product">
        <div className="product--bread">
         
          <Breadcrumb
            items={[
              {
                title: <Link to="/">Trang chủ</Link>,
              },

              {
                title: `${data[0].title}`,
              },
            ]}
          />
        </div>
        <Layout>
          <Content className="product--content">
            <div className="product--main">
              <div className="product--left">
                <div className="product--left__show">
                  {currentImage !== null && (
                    <Image
                      src={data[0].images[currentImage]}
                      alt={`Selected Image`}
                      className="product--left__selected"
                    />
                  )}
                </div>
                <div className="product--left__list">
                  <Image.PreviewGroup>
                    {Array.isArray(data[0].images) &&
                      data[0].images.map((image, index) => (
                        <div className="product--left__img">
                          {" "}
                          <Image
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className={"product--left__active"}
                            onClick={() => selectImage(index)}
                            onMouseEnter={() => selectImage(index)}
                          />
                        </div>
                      ))}
                  </Image.PreviewGroup>
                </div>
              </div>
              <div className="product--right">


                <h1 className="product--right__title">{data[0].title}</h1>
                <div className="product--right__rate">
                  <p>{data[0].rating}</p>
                  {data[0].rating != undefined ? (
                    <Rate disabled allowHalf defaultValue={data[0].rating} />
                  ) : (
                    ""
                  )}
                </div>
                <div className="product--right__center">
                  <p className="product--right__p1">
                    <b>Thương hiệu:</b> {data[0].brand}
                  </p>
                  <p className="product--right__p2">
                    <b> Loại sản phẩm:</b> {data[0].category}
                  </p>
                </div>
                {data[0].discountPercentage !== 0 ? (
                  <div className="product--right__price">
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
                  <div className="product--right__price">
                    <p className="giagoc">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(`${data[0].price}`)}
                    </p>
                  </div>
                )}


                <div className="product--button">
                  <p className="product--button__sl">Số lượng:</p>
                  <div className="product--button__show">
                    <button
                      className="product--button__s  product--button__s1  "
                      onClick={decreaseCount}
                    >
                      <img width="24" height="24" src="https://img.icons8.com/android/24/minus.png" alt="minus"/>
                    </button>
                    <span>{count}</span>
                    <button
                      className="product--button__s product--button__s2"
                      onClick={increaseCount}
                    >
                      <img width="24" height="24" src="https://img.icons8.com/android/24/plus.png" alt="plus"/>
                    </button>
                  </div>
                  <div className="product--button__slcl">
                    Có {data[0].Quantity} sản phẩm có sẵn
                  </div>
                </div>


                <div className="product--addtocart">
                <Link to={cookies.length != 20 && (`/register`)}>
                  <button onClick={() => handleClick(data[0].id, data[0])} className="product--addtocart__s  product--addtocart__s1" >
                    <div className="product--addtocart__main">
                    <img src="https://img.icons8.com/doodle/48/shopping-cart--v1.png" alt="shopping-cart--v1"/>
                    <p className="product--addtocart__p1">
                      Thêm Vào Giỏ Hàng
                    </p>
                    </div>
                  </button>
                  </Link>
                  <Link to={cookies.length == 20 ? ("/") : (`/register`)}>
                    <button  className="product--addtocart__s  product--addtocart__s2">
                    <p className="product--addtocart__p2">Mua Ngay</p>
                  </button>
                  </Link>
                  
                </div>


              </div>
            </div>
          </Content>
        </Layout>
      </div>
    </>
  );
}
export default Productdetail;
