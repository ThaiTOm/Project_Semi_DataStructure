import "./home.scss";
import { Button, Carousel, Col, Layout, Row } from "antd";
import Homesider from "../../components/homeSider/index.js";
// import slide1 from "../../image/slide1.png";
// import slide2 from "../../image/slide2.png";
import { useEffect, useState } from "react";
import { getProductsp } from "../../service/getcategory/getCategory";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../components/takeCookies/takeCookies.js";
import { PlusOutlined } from "@ant-design/icons";
import { AddtoCart } from "../../components/filter/index.js";
const {  Content, Sider } = Layout;
function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const checkId = useSelector((state) => state.cartStore);
  const dispatch = useDispatch();

  useEffect(() => {  // lấy hết dữ liệu sản phẩm
    const fetchApi = async () => {
      const result = await getProductsp();

      if (!result) {
      } else {
        setData(result);
      }
    };

    fetchApi();
  }, []);

  const cookies = getCookie("token");

  const discount = data.filter((item) => {
    return item.discountPercentage !== 0;
  });

  const fruitjuice = data.filter((item) => {
    return item.category === "Fruit Juice";
  });

  const fruitsmoothie = data.filter((item) => {
    return item.category === "Fruit Smoothie";
  });

  const coffeebeverages = data.filter((item) => {
    return item.category === "Coffee Beverages";
  });

  const milktea = data.filter((item) => {
    return item.category === "Milk Tea";
  });

  const wine = data.filter((item) => {
    return item.category === "Wine";
  });

  const softdrink = data.filter((item) => {
    return item.category === "Soft Drinks";
  });

  // const handleClick = (id, infor) => {
  //   if (cookies) {
  //     const check = checkId.some((item) => {
  //       return item.id === id;
  //     });

  //     if (check) {
  //       const productSlg = checkId.find((item) => {
  //         return item.id === id;
  //       });

  //       if (infor.Quantity > productSlg.quanlity) {
  //         dispatch(up(id));
  //       } else {
  //         Modal.error({
  //           title: "Không Thể Thêm Sản Phẩm",
  //           content:
  //             "Số lượng bạn chọn đã đạt mức tối đa số lượng của sản phẩm này ",
  //         });
  //       }
  //     } else {
  //       dispatch(add(id, infor));
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // };

  const handleClick_trs = () => {
    navigate(`/category/${milktea[1].category}`);
  };
  const handleClick_wine = () => {
    navigate(`/category/${wine[1].category}`);
  };
  const handleClick_cafe = () => {
    navigate(`/category/${coffeebeverages[1].category}`);
  };
  const handleClick_sto = () => {
    navigate(`/category/${fruitsmoothie[1].category}`);
  };
  const handleClick_juice = () => {
    navigate(`/category/${fruitjuice[1].category}`);
  };
  const handleClick_soda = () => {
    navigate(`/category/${softdrink[1].category}`);
  };

  return (
    <>
      <div className="home">
        {" "}
        <Layout>
          <Sider
            theme="light"
            className="home--sider animate__animated animate__fadeInLeft animate__faster"
          >
            <Homesider />
          </Sider>
          <Content className="home--content  animate__animated animate__fadeInRight animate__faster">
            <Carousel autoplay>
              <div>
                <img className="home--image" src="https://i.imgur.com/CoIEhGn.png" alt="hinhnen" />
              </div>
              <div>
                <img className="home--image" src="https://i.imgur.com/DbCtOnP.png" alt="hinhnen_2" />
              </div>
            </Carousel>

            <div className="home--discount">
              <Link to={"/discount"}>
                <div className="home--discount__header">
                  <img
                    src="https://img.icons8.com/dusk/64/discount.png"
                    alt="discount"
                  />
                  <p>NƯỚC UỐNG ĐẠI HẠ GIÁ</p>
                </div>
              </Link>
              <div className="home--discount__content">
                <Row gutter={[15, 10]}>
                  {discount.slice(0, 8).map((item) => (
                    <Col className="col" key={item.id}>
                      <Link to={"/product/" + item.id}>
                        <div className="item">
                          <div className="top">
                            <img src={item.thumbnail} alt={item.title} />
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
                                      Math.floor(item.discountPercentage)) /
                                      100)
                                  }`
                                )}
                              </p>
                            ) : (
                              ""
                            )}
                            <div className="price">
                              <p
                                className={`p2 ${
                                  item.discountPercentage !== 0
                                    ? "home--discount__gachngang"
                                    : "home--discount__tomau"
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
                      <div className="home--discount__add">
                        <Button
                          shape="circle"
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => AddtoCart(item.id, item, checkId, cookies, dispatch, navigate)}
                        ></Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="home--discount__footer">
                <Link to={"/discount"}>
                  <button className="home--discount__button">Xem tất cả</button>
                </Link>
              </div>
            </div>

            <div className="home--discount">
              <div onClick={handleClick_trs} className="home--discount__header">
                <img
                  src="https://img.icons8.com/emoji/48/bubble-tea.png"
                  alt="bubble-tea"
                />
                <p>TRÀ SỮA SIÊU NGON</p>
              </div>
              <div className="home--discount__content">
                <Row gutter={[15, 10]}>
                  {milktea.slice(0, 4).map((item) => (
                    <Col className="col" key={item.id}>
                      <Link to={"/product/" + item.id}>
                        <div className="item">
                          <div className="top">
                            <img src={item.thumbnail} alt={item.title} />
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
                                      Math.floor(item.discountPercentage)) /
                                      100)
                                  }`
                                )}
                              </p>
                            ) : (
                              ""
                            )}
                            <div className="price">
                              <p
                                className={`p2 ${
                                  item.discountPercentage !== 0
                                    ? "home--discount__gachngang"
                                    : "home--discount__tomau"
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
                      <div className="home--discount__add">
                        <Button
                          shape="circle"
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => AddtoCart(item.id, item, checkId, cookies, dispatch, navigate)}
                        ></Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="home--discount__footer">
                <button
                  onClick={handleClick_trs}
                  className="home--discount__button"
                >
                  Xem tất cả
                </button>
              </div>
            </div>

            <div className="home--discount">
              <div
                onClick={handleClick_wine}
                className="home--discount__header"
              >
                <img
                  src="https://img.icons8.com/cotton/64/wine.png"
                  alt="wine"
                />
                <p>RƯỢU ĐẬM VỊ</p>
              </div>
              <div className="home--discount__content">
                <Row gutter={[15, 10]}>
                  {wine.slice(0, 4).map((item) => (
                    <Col className="col" key={item.id}>
                      <Link to={"/product/" + item.id}>
                        <div className="item">
                          <div className="top">
                            <img src={item.thumbnail} alt={item.title} />
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
                                      Math.floor(item.discountPercentage)) /
                                      100)
                                  }`
                                )}
                              </p>
                            ) : (
                              ""
                            )}
                            <div className="price">
                              <p
                                className={`p2 ${
                                  item.discountPercentage !== 0
                                    ? "home--discount__gachngang"
                                    : "home--discount__tomau"
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
                      <div className="home--discount__add">
                        <Button
                          shape="circle"
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => AddtoCart(item.id, item, checkId, cookies, dispatch, navigate)}
                        ></Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="home--discount__footer">
                <button
                  onClick={handleClick_wine}
                  className="home--discount__button"
                >
                  Xem tất cả
                </button>
              </div>
            </div>

            <div className="home--discount">
              <div
                onClick={handleClick_cafe}
                className="home--discount__header"
              >
                <img
                  src="https://img.icons8.com/doodle/48/cafe--v3.png"
                  alt="cafe--v3"
                />
                <p>CAFE - ĐẬP TAN UỂ OẢI</p>
              </div>
              <div className="home--discount__content">
                <Row gutter={[15, 10]}>
                  {coffeebeverages.slice(0, 8).map((item) => (
                    <Col className="col" key={item.id}>
                      <Link to={"/product/" + item.id}>
                        <div className="item">
                          <div className="top">
                            <img src={item.thumbnail} alt={item.title} />
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
                                      Math.floor(item.discountPercentage)) /
                                      100)
                                  }`
                                )}
                              </p>
                            ) : (
                              ""
                            )}
                            <div className="price">
                              <p
                                className={`p2 ${
                                  item.discountPercentage !== 0
                                    ? "home--discount__gachngang"
                                    : "home--discount__tomau"
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
                      <div className="home--discount__add">
                        <Button
                          shape="circle"
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => AddtoCart(item.id, item, checkId, cookies, dispatch, navigate)}
                        ></Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="home--discount__footer">
                <button
                  onClick={handleClick_cafe}
                  className="home--discount__button"
                >
                  Xem tất cả
                </button>
              </div>
            </div>

            <div className="home--discount">
              <div onClick={handleClick_sto} className="home--discount__header">
                <img
                  src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-smoothie-street-food-flaticons-lineal-color-flat-icons.png"
                  alt="external-smoothie-street-food-flaticons-lineal-color-flat-icons"
                />
                <p>SINH TỐ - CHỨA NHIỀU DƯỠNG CHẤT TỐT CHO SỨC KHỎE</p>
              </div>
              <div className="home--discount__content">
                <Row gutter={[15, 10]}>
                  {fruitsmoothie.slice(0, 8).map((item) => (
                    <Col className="col" key={item.id}>
                      <Link to={"/product/" + item.id}>
                        <div className="item">
                          <div className="top">
                            <img src={item.thumbnail} alt={item.title} />
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
                                      Math.floor(item.discountPercentage)) /
                                      100)
                                  }`
                                )}
                              </p>
                            ) : (
                              ""
                            )}
                            <div className="price">
                              <p
                                className={`p2 ${
                                  item.discountPercentage !== 0
                                    ? "home--discount__gachngang"
                                    : "home--discount__tomau"
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
                      <div className="home--discount__add">
                        <Button
                          shape="circle"
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => AddtoCart(item.id, item, checkId, cookies, dispatch, navigate)}
                        ></Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="home--discount__footer">
                <button
                  onClick={handleClick_sto}
                  className="home--discount__button"
                >
                  Xem tất cả
                </button>
              </div>
            </div>

            <div className="home--discount">
              <div
                onClick={handleClick_juice}
                className="home--discount__header"
              >
                <img
                  src="https://img.icons8.com/external-nawicon-outline-color-nawicon/64/external-juice-grocery-nawicon-outline-color-nawicon.png"
                  alt="external-juice-grocery-nawicon-outline-color-nawicon"
                />
                <p>NƯỚC ÉP - VỊ NGON NGUYÊN CHẤT TỪ TRÁI CÂY TƯƠI</p>
              </div>
              <div className="home--discount__content">
                <Row gutter={[15, 10]}>
                  {fruitjuice.slice(0, 8).map((item) => (
                    <Col className="col" key={item.id}>
                      <Link to={"/product/" + item.id}>
                        <div className="item">
                          <div className="top">
                            <img src={item.thumbnail} alt={item.title} />
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
                                      Math.floor(item.discountPercentage)) /
                                      100)
                                  }`
                                )}
                              </p>
                            ) : (
                              ""
                            )}
                            <div className="price">
                              <p
                                className={`p2 ${
                                  item.discountPercentage !== 0
                                    ? "home--discount__gachngang"
                                    : "home--discount__tomau"
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
                      <div className="home--discount__add">
                        <Button
                          shape="circle"
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => AddtoCart(item.id, item, checkId, cookies, dispatch, navigate)}
                        ></Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="home--discount__footer">
                <button
                  onClick={handleClick_juice}
                  className="home--discount__button"
                >
                  Xem tất cả
                </button>
              </div>
            </div>

            <div className="home--discount">
              <div
                onClick={handleClick_soda}
                className="home--discount__header"
              >
                <img
                  src="https://img.icons8.com/cotton/64/soda-cup.png"
                  alt="soda-cup"
                />
                <p>NƯỚC NGỌT CÓ GA - SẢNG KHOÁI</p>
              </div>
              <div className="home--discount__content">
                <Row gutter={[15, 10]}>
                  {softdrink.slice(0, 4).map((item) => (
                    <Col className="col" key={item.id}>
                      <Link to={"/product/" + item.id}>
                        <div className="item">
                          <div className="top">
                            <img src={item.thumbnail} alt={item.title} />
                          </div>
                          <div className="under">
                            <h3>
                              <Link to="/" key={item.title}>
                                {item.title}
                              </Link>
                            </h3>
                            {item.discountPercentage !== 0 ? (
                              <p className="p1">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  `${
                                    item.price *
                                    ((100 -
                                      Math.floor(item.discountPercentage)) /
                                      100)
                                  }`
                                )}
                              </p>
                            ) : (
                              ""
                            )}
                            <div className="price">
                              <p
                                className={`p2 ${
                                  item.discountPercentage !== 0
                                    ? "home--discount__gachngang"
                                    : "home--discount__tomau"
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
                      <div className="home--discount__add">
                        <Button
                          shape="circle"
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => AddtoCart(item.id, item, checkId, cookies, dispatch, navigate)}
                        ></Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="home--discount__footer">
                <button
                  onClick={handleClick_soda}
                  className="home--discount__button"
                >
                  Xem tất cả
                </button>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    </>
  );
}
export default Home;
