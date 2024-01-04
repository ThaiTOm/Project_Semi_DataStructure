import { Breadcrumb, Button, Col, Image, Layout, Modal, Rate, Row } from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getMyUser,
  getOrder,
  getProductcate,
  getProductdt,
  getProductsp,
} from "../../service/getcategory/getCategory";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./products.scss";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { useDispatch, useSelector } from "react-redux";
import { addmt, addtt, upmt } from "../../actions/actCart";
import { AddtoCart } from "../../components/filter";
import { Errorempty } from "../../components/error/error";
import { postSameProducts } from "../../service/post/post";
const { Content } = Layout;

function Productdetail() {
  const checkId = useSelector((state) => state.cartStore);
  const navigate = useNavigate(); // chuyển trang
  const dispatch = useDispatch(); // chuyển dữ liệu
  const [data, setData] = useState([]);
  const [cate, setCate] = useState([]);
  const { pathname } = useLocation();
  const params = useParams();
  const param = parseInt(params.id);
  const [currentImage, setCurrentImage] = useState(0);
  const selectImage = (index) => {
    setCurrentImage(index);
  };
  const cookies = getCookie("token");
  const [count, setCount] = useState(1);
  const [randomNumber, setrandomNumber] = useState(0);

  const takeSameProducts = async (productId) => {
    const result = await postSameProducts({
      productId: productId,
    });
    console.log(result);
    return result.recommend;
  };

  const fetchPur = async (id) => {
    const result = await getOrder(id);
    return result;
  };

  const takeMyId = async (data) => {
    try {
      const result = await getMyUser(data);
      return result;
    } catch (error) {
      console.error("Error while patching cart:", error);
    }
  };

  const fetchApi = async (e) => {
    const result = await getProductdt(e);
    if (!result) {
      //
    } else {
      setData(result);
    }
  };
  let productID = [];
  const fetchcate = async () => {
    const result = await getProductsp();
    if (!result) {
    } else {
      const productId = await takeSameProducts(param);
      for (let i = 0; i < productId.length; i++) {
        if (productId[i] === param) {
          continue;
        } else {
          const findSameProducts = result.find((item) => {
            return item.id === productId[i];
          });
          productID.push(findSameProducts);
        }
      }
      setCate(productID);
    }
  };

  useEffect(() => {
    // path thay đổi thì biến đếm count quay về 1
    setCount(1);
  }, [pathname]);

  const increaseCount = () => {
    // tăng số lượng
    const productSlg = checkId.find((item) => {
      // tìm id sản phẩm trong giỏ hàng
      return item.id === param;
    });
    // nếu không có
    if (data[0].Quantity > count) {
      // thì so với số lượng tồn kho
      setCount(count + 1);
    } else {
      Modal.error({
        title: "Không Thể Thêm Sản Phẩm",
        content:
          "Số lượng bạn chọn đã đạt mức tối đa số lượng của sản phẩm này ",
      });
    }
  };

  const decreaseCount = () => {
    // giảm số lượng không được nhỏ hơn 1
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleClick = (id, infor) => {
    // nút thêm
    if (cookies && cookies.length >= 0) {
      const check = checkId.find((item) => {
        return item.id === id;
      });
      if (check !== undefined) {
        if (check.quanlity + count <= data[0].Quantity) {
          dispatch(upmt(id, count));
        } else {
          Modal.error({
            title: "Không Thể Thêm Sản Phẩm",
            content:
              "Số lượng bạn chọn đã đạt mức tối đa số lượng của sản phẩm này ",
          });
        }
      } else {
        dispatch(addmt(id, infor, count));
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchcate();
  }, [data, param]);

  useEffect(() => {
    fetchApi(param);
    // lấy data gốc của sản phẩm theo id
  }, [param]);

  const handleBuy = async (data, count) => {
    if (cookies && cookies.length >= 0) {
      const user = await takeMyId(cookies);
      const orderData = await fetchPur(user.id);
      const newestOrder = orderData.reduce((maxDateItem, currentItem) => {
        if (!maxDateItem || currentItem.date > maxDateItem.date) {
          return currentItem;
        } else {
          return maxDateItem;
        }
      }, null);
      if (newestOrder && newestOrder.orderStep === 3) {
        Modal.error({
          title: "Không thể mua hàng",
          content: "Đơn hàng của bạn vẫn chưa hoàn thành!",
        });
      } else {
        dispatch(addtt(data, count));
        navigate("/thanhtoan");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {data.length !== 0 ? (
        <>
          {" "}
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
                      {data[0].rating !== undefined ? (
                        <Rate
                          disabled
                          allowHalf
                          defaultValue={data[0].rating}
                        />
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
                                ((100 -
                                  Math.floor(data[0].discountPercentage)) /
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
                                  ((100 -
                                    Math.floor(data[0].discountPercentage)) /
                                    100)
                              }`
                            )}
                            ){" "}
                          </p>
                        </div>
                        <div className="main">
                          <p
                            className={`p2 ${
                              data[0].discountPercentage !== 0
                                ? "gachngang"
                                : ""
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
                          <img
                            width="24"
                            height="24"
                            src="https://img.icons8.com/android/24/minus.png"
                            alt="minus"
                          />
                        </button>
                        <span>{count}</span>
                        <button
                          className="product--button__s product--button__s2"
                          onClick={increaseCount}
                        >
                          <img
                            width="24"
                            height="24"
                            src="https://img.icons8.com/android/24/plus.png"
                            alt="plus"
                          />
                        </button>
                      </div>
                      <div className="product--button__slcl">
                        Có {data[0].Quantity} sản phẩm có sẵn
                      </div>
                    </div>

                    <div className="product--addtocart">
                      <button
                        onClick={() => handleClick(data[0].id, data[0])}
                        className="product--addtocart__s  product--addtocart__s1"
                      >
                        <div className="product--addtocart__main">
                          <img
                            src="https://img.icons8.com/doodle/48/shopping-cart--v1.png"
                            alt="shopping-cart--v1"
                          />
                          <p className="product--addtocart__p1">
                            Thêm Vào Giỏ Hàng
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleBuy(data, count)}
                        className="product--addtocart__s  product--addtocart__s2"
                      >
                        <p className="product--addtocart__p2">Mua Ngay</p>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product--cungloai">
                  <Link to={`/category/${data[0].category}`}>
                    <div className="product--cungloai__header">
                      <h2>Sản Phẩm Có Thể Bạn Thích</h2>
                    </div>
                  </Link>
                  <div className="product--cungloai__content">
                    <Row gutter={[15, 10]}>
                      {cate && cate.length > 0
                        ? cate.map((item) =>
                            item !== undefined ? (
                              <Col className="col" key={item.id}>
                                <Link to={"/product/" + item.id}>
                                  <div className="item">
                                    <div className="top">
                                      <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                      />
                                    </div>
                                    <div className="under">
                                      <h3>{item.title}</h3>
                                      {item.discountPercentage !== 0 ? (
                                        <p className="p1">
                                          {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                          }).format(
                                            `${
                                              item.price *
                                              ((100 -
                                                Math.floor(
                                                  item.discountPercentage
                                                )) /
                                                100)
                                            }`
                                          )}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                      <div className="price">
                                        <p
                                          className={`p2  ${
                                            item.discountPercentage !== 0
                                              ? "product--cungloai__gachngang"
                                              : "product--cungloai__tomau"
                                          }`}
                                        >
                                          {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                          }).format(`${item.price}`)}
                                        </p>
                                        <div className="dc">
                                          {item.discountPercentage !== 0
                                            ? `-${item.discountPercentage}%`
                                            : ""}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                                <div className="product--cungloai__add">
                                  <Button
                                    icon={<PlusOutlined />}
                                    onClick={() =>
                                      AddtoCart(
                                        item.id,
                                        item,
                                        checkId,
                                        cookies,
                                        dispatch,
                                        navigate
                                      )
                                    }
                                  ></Button>
                                </div>
                              </Col>
                            ) : (
                              ""
                            )
                          )
                        : ""}
                    </Row>
                  </div>
                  <div className="product--cungloai__footer">
                    <Link to={`/category/${data[0].category}`}>
                      <button className="product--cungloai__button">
                        Xem Sản Phẩm Cùng Loại
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="product--mota">
                  <h1>Chi tiết sản phẩm</h1>
                  <hr />
                  <p>{data[0].description}</p>
                </div>
              </Content>
            </Layout>
          </div>
        </>
      ) : (
        Errorempty(navigate)
      )}
    </>
  );
}
export default Productdetail;
