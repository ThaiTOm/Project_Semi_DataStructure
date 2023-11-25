import {
  Row,
  Button,
  Form,
  AutoComplete,
  Drawer,
  Avatar,
  Menu,
  Dropdown,
  Badge,
} from "antd";
import "./responsiveContainer.scss";
import "./layoutDefault.scss";

import {
  AlignLeftOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../image/Logo.png";
import donhang from "../../image/donhang.png";
import position from "../../image/position.png";
import person from "../../image/person.png";
import cart from "../../image/cart.png";
import email from "../../image/email.png";
import telephone from "../../image/telephone.png";
import { getCookie } from "../../components/takeCookies/takeCookies";
import {
  getCategory,
  getProductsearch,
} from "../../service/getcategory/getCategory";
import { get } from "../../tienich/request";
import { Layout } from "antd";
import { useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;
const cookies = getCookie("token");

const items =
  cookies.length === 0
    ? [
        {
          key: "1",
          label: <Link to="/login">Đăng Nhập</Link>,
        },
        {
          key: "2",
          label: <Link to="/register">Đăng Ký</Link>,
        },
      ]
    : [
        {
          key: "1",
          label: <Link to="/infor/thongtinkh">Thông Tin Khách Hàng</Link>,
        },
        {
          key: "2",
          label: <Link to="/infor/address">Địa Chỉ</Link>,
        },
        {
          key: "3",
          label: <Link to="/infor/changepass">Đổi Mật Khẩu</Link>,
        },
        {
          key: "4",
          label: <Link to="/infor/yourorder">Lịch Sử Đơn Hàng</Link>,
        },
        {
          key: "5",
          label: <Link to="/infor/logout">Đăng Xuất</Link>,
        },
      ];

function LayoutDefault() {
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [render, setRender] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
 
  const [data, setData] = useState([
    {
      id: "",
    },
  ]);
  const [data_1, setData_1] = useState([
    {
      title: "",
    },
  ]);
  const soluong = useSelector((state) => state.cartStore);
  useEffect(() => {
    const fetchapi = async () => {
      const res = await getCategory();
      if (!res) {
      } else {
        setData(res);
      }
    };

    fetchapi();
  }, []);

  const getProduct = async (e) => {
    const result = await get("beverages/?category=" + e);
    return result;
  };

  useEffect(() => {
    const fetchData2 = async () => {
      const newData2 = [];
      for (const item of data) {
        const result = await getProduct(item.cate);
        newData2.push(result);
      }

      setData_1(newData2);
    };

    fetchData2();
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleScroll = () => {
    setShowOptions(false);
  };

  const handleFocus = () => {
    setShowOptions(false);
  };

  const handleBlur = () => {
    setShowOptions(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setShowOptions(true);

    if (value.length == 0) {
      setShowOptions(false);
    }
  };

  const handleKeydown = (e) => {
    if (e.code == "Enter") {
      form.resetFields();
      setRender(!render);
      if (e.target.value != "") {
        navigate(`/search/${e.target.value}`);
      }
    }
  };

  const handleFinish = (e) => {
    setRender(!render);
    navigate(`/search/${e["name-product"]}`);
    form.resetFields();
  };
  const onFinishFailed = (e) => {};

  const fetchData = async (searchText) => {
    const results = await getProductsearch(searchText);
  
    setOptions(results);
  };

  // sử dụng useEffect để gọi fetchData khi searchText thay đổi
  useEffect(() => {
    if (searchText) {
      fetchData(searchText);
    }
  }, [searchText]);

  return (
    <>
      <body>
        <header className="header">
          <div className="container">
            <div className="header--main">
              <div className="header--3gach">
                <AlignLeftOutlined
                  className="homesider--icon"
                  onClick={showDrawer}
                />
              </div>
              <div className="header--logo">
                <Link to="/">
                  <img src={Logo} alt="logo 3Tstore" />
                </Link>
              </div>

              {/* header-search */}
              <div className="header--form">
                <Form
                  form={form}
                  className="header--search"
                  layout="inline"
                  onFinish={handleFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item name={"name-product"}>
                    <AutoComplete
                      size="large"
                      className="header--search__input"
                      autoFocus
                      onKeyUp={handleKeydown}
                      options={
                        showOptions && options.length > 0
                          ? options.map((option) => ({
                              label: (
                                <Link to={`/product/` + option.id}>
                                  <div className="header--search__item">
                                    <img
                                      className="img"
                                      src={option.thumbnail}
                                      alt={option.title}
                                    />
                                    <div className="under">
                                      <h3>{option.title}</h3>
                                      {option.discountPercentage !== 0 ? (
                                        <p className="p1">
                                          {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                          }).format(
                                            `${
                                              option.price *
                                              ((100 -
                                                Math.floor(
                                                  option.discountPercentage
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
                                          className={`p2 ${
                                            option.discountPercentage !== 0
                                              ? "home--discount__gachngang"
                                              : ""
                                          }`}
                                        >
                                          {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                          }).format(`${option.price}`)}
                                        </p>
                                        <div>
                                          {option.discountPercentage !== 0
                                            ? `${option.discountPercentage}%`
                                            : ""}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              ),
                              value: option.title,
                            }))
                          : []
                      }
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onSearch={handleSearch}
                      placeholder="Tìm kiếm"
                    />
                  </Form.Item>
                  <Form.Item>
                    {" "}
                    <Button
                      className="header--search__button"
                      type="primary"
                      shape="circle"
                      icon={<SearchOutlined />}
                      htmlType="submit"
                    />
                  </Form.Item>
                </Form>
              </div>

              {/* header-search */}

              <div className="header--function">
                <div className="header--function__c header--function__bell">
                  <img
                    width="100"
                    height="100"
                    src="https://img.icons8.com/plasticine/100/bell--v1.png"
                    alt="bell--v1"
                  />
                </div>
                <div className="header--function__donhang header--function__c">
                  <NavLink to={cookies.length === 0 ? "/login" : "/order"}>
                    <img
                      src="https://img.icons8.com/fluency/48/purchase-order.png"
                      alt="purchase-order"
                    />
                    <p className="header--function__chung">Đơn hàng</p>
                  </NavLink>
                </div>
                <div className="header--function__cuahang header--function__c">
                  <NavLink to="/dscuahang">
                    <img
                      src="https://img.icons8.com/color/48/place-marker--v1.png"
                      alt="place-marker--v1"
                    />
                    <p className="header--function__chung">Cửa hàng</p>
                  </NavLink>
                </div>

                <div className="header--function__taikhoan header--function__c">
                  <Dropdown placement="bottom" menu={{ items }}>
                    <NavLink
                      to={cookies.length === 0 ? "/login" : "/infor/thongtinkh"}
                    >
                      <img
                        src="https://img.icons8.com/color/48/person-male.png"
                        alt="person-male"
                      />
                      <p className="header--function__chung">Tài khoản </p>
                    </NavLink>
                  </Dropdown>
                </div>

                <div className="header--function__giohang header--function__c">
                  <NavLink to={cookies.length === 0 ? "/login" : "/cart"}>
                    <Badge
                      count={
                        soluong ? soluong.length : ""
                      }
                      overflowCount={99}
                    >
                      <img
                        src="https://img.icons8.com/fluency/48/shopping-cart.png"
                        alt="shopping-cart"
                      />
                    </Badge>

                    <p className="header--function__chung">Giỏ hàng</p>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="header--main0">
              <Form
                form={form}
                className="header--search"
                layout="inline"
                onFinish={handleFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item name={"name-product"}>
                  <AutoComplete
                    size="large"
                    className="header--search__input"
                    autoFocus
                    onKeyUp={handleKeydown}
                    options={
                      showOptions && options.length > 0
                        ? options.map((option) => ({
                            label: (
                              <Link to={`/product/` + option.id}>
                                <div className="header--search__item">
                                  <img
                                    className="img"
                                    src={option.thumbnail}
                                    alt={option.title}
                                  />
                                  <div className="under">
                                    <h3>{option.title}</h3>
                                    {option.discountPercentage !== 0 ? (
                                      <p className="p1">
                                        {new Intl.NumberFormat("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                        }).format(
                                          `${
                                            option.price *
                                            ((100 -
                                              Math.floor(
                                                option.discountPercentage
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
                                        className={`p2 ${
                                          option.discountPercentage !== 0
                                            ? "home--discount__gachngang"
                                            : ""
                                        }`}
                                      >
                                        {new Intl.NumberFormat("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                        }).format(`${option.price}`)}
                                      </p>
                                      <div>
                                        {option.discountPercentage !== 0
                                          ? `${option.discountPercentage}%`
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ),
                            value: option.title,
                          }))
                        : []
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onSearch={handleSearch}
                    placeholder="Tìm kiếm"
                  />
                </Form.Item>
                <Form.Item>
                  {" "}
                  <Button
                    className="header--search__button"
                    type="primary"
                    shape="circle"
                    icon={<SearchOutlined />}
                    htmlType="submit"
                  />
                </Form.Item>
              </Form>
            </div>
            <div className="header--main1">
              <div className="header--main1__home header--main1__chung">
                <NavLink to={"/"}>Trang chủ</NavLink>
              </div>
              <div className="header--main1__introduce header--main1__chung">
                <NavLink to={"/introduce"}>Giới thiệu</NavLink>
              </div>
              <div className="header--main1__product header--main1__chung">
                <NavLink to={"/collections"}>Sản phẩm</NavLink>
              </div>
              <div className="header--main1__discount header--main1__chung">
                <NavLink to={"/discount"}>Khuyến mãi</NavLink>
              </div>
              <div className="header--main1__contact header--main1__chung">
                <NavLink to={"/contact"}>Liên hệ</NavLink>
              </div>
            </div>
          </div>
        </header>
        <Content className="content">
          <div className="container">
            <Outlet />
          </div>
        </Content>

        <Footer className="footer">
          <div className="container">
            {" "}
            <div className="footer--one">
              <div className="footer--qc">
                <img className="footer--logo" src={Logo} alt="logo" />
                <div className="footer--address footer--chunginfor">
                  <img src={position} alt="diachi" />
                  <p>
                    <b>Địa chỉ:</b> 93 Hồ Văn Huê, Phú Nhuận{" "}
                  </p>
                </div>
                <div className="footer--number footer--chunginfor">
                  <img src={telephone} alt="sdt" />
                  <p>
                    <b>Số điện thoại:</b> 0399038165
                  </p>
                </div>
                <div className="footer--email footer--chunginfor">
                  <img src={email} alt="email" />
                  <p>
                    <b>Email:</b> sonthanh@gmail.com
                  </p>
                </div>
              </div>

              <div className="footer--cskh">
                <h3>Hỗ trợ khách hàng</h3>
                <p>
                  <Link to={"/introduce"}>Giới thiệu</Link>
                </p>
                <p>
                  <Link to={cookies ? "/" : "/login"}>Đăng Nhập</Link>
                </p>
                <p>
                  <Link to={cookies ? "/" : "/login"}>Đăng kí</Link>
                </p>
                <p>
                  <Link to={"/cart"}>Giỏ Hàng</Link>
                </p>
              </div>
              <div className="footer--tongdai">
                <div className="footer--cskh__phu">
                  <h3>Hỗ trợ khách hàng</h3>
                  <p>
                    <Link to={"/introduce"}>Giới thiệu</Link>
                  </p>
                  <p>
                    <Link to={cookies ? "/" : "/login"}>Đăng Nhập</Link>
                  </p>
                  <p>
                    <Link to={cookies ? "/" : "/register"}>Đăng kí</Link>
                  </p>
                  <p>
                    <Link to={"/cart"}>Giỏ Hàng</Link>
                  </p>
                </div>

                <h3 className="h3">Tổng đài hỗ trợ</h3>
                <p>
                  <b>Bộ phận chăm sóc:</b> 0399038165 (9h-22h)
                </p>
                <h3 className="h3">Kết nối với chúng tôi</h3>
                <div className="footer--network">
                  <a href="https://www.facebook.com" target="_blank">
                    <img
                      src="https://bizweb.dktcdn.net/100/457/224/themes/870030/assets/footer_trustbadge1.jpg?1696210463947"
                      alt="facebook"
                    />
                  </a>
                  <a href="https://www.instagram.com" target="_blank">
                    <img
                      src="https://bizweb.dktcdn.net/100/457/224/themes/870030/assets/footer_trustbadge2.jpg?1696210463947"
                      alt="insta"
                    />
                  </a>
                  <a href="https://www.tiktok.com" target="_blank">
                    <img
                      src="https://bizweb.dktcdn.net/100/457/224/themes/870030/assets/footer_trustbadge5.jpg?1696210463947"
                      alt="tiktok"
                    />
                  </a>
                </div>
                <h3>Phương thức thanh toán</h3>
                <img
                  src="https://bizweb.dktcdn.net/100/419/628/themes/897067/assets/footer_trustbadge.jpg?1691667076140"
                  alt="thanhtoan"
                />
              </div>
            </div>
          </div>

          <Row className="footer-two"></Row>
        </Footer>

        <Drawer
          className="drawer"
          placement="left"
          closable={false}
          onClose={onClose}
          open={visible}
        >
          {/* Hàng đầu là tài khoản */}
          <div className="drawer--user">
            <NavLink
              to={cookies.length != 20 ? "/login" : "/infor/thongtinkh"}
              onClick={onClose}
            >
              <Avatar icon={<UserOutlined />} size={40} />
              <div className="drawer--user__tk">
                <p className="tk">Tài khoản</p>
                {cookies.length == 0 ? (
                  <Link to="/login">
                    <p>Đăng nhập</p>
                  </Link>
                ) : (
                  <Link to="/infor/logout">
                    <p>Đăng xuất</p>
                  </Link>
                )}
              </div>
            </NavLink>

            {/* Thêm các thông tin tài khoản khác nếu cần */}
          </div>
          <div className="drawer--function__donhang drawer--function__c">
            <NavLink
              to={cookies.length != 20 ? "/login" : "/order"}
              onClick={onClose}
            >
              <img src={donhang} alt="don hang" />
              <p className="drawer--function__chung">Đơn hàng</p>
            </NavLink>
          </div>
          <div className="drawer--function__cuahang drawer--function__c">
            <NavLink to="/dscuahang" onClick={onClose}>
              <img src={position} alt="cua hang" />
              <p className="drawer--function__chung">Cửa hàng</p>
            </NavLink>
          </div>
          {/* Các hàng còn lại là danh mục sản phẩm */}
          <div className="drawer--collection">
            {data.map((item) => (
              <div>
                <Link to={"/category/" + item.cate} onClick={onClose}>
                  <div className="drawer--product" key={item.id}>
                    <Menu
                      className="drawer--product__menu"
                      mode="vertical"
                      items={[
                        {
                          icon: (
                            <img
                              className="drawer--product__img"
                              src={item.icon}
                              alt="Icon"
                            />
                          ),
                          label: item.cate,

                          children: Array.isArray(data_1[item.id - 1])
                            ? data_1[item.id - 1].map((x) => ({
                                label: (
                                  <Link
                                    to={`/product/${x.id}`}
                                    key={x.title}
                                    onClick={onClose}
                                  >
                                    {x.title}
                                  </Link>
                                ),
                              }))
                            : null,
                        },
                      ]}
                    />
                  </div>
                </Link>
                <hr className="drawer--hr" />
              </div>
            ))}
          </div>
        </Drawer>
      </body>
    </>
  );
}

export default LayoutDefault;
