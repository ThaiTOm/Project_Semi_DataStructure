import { Row, Button, Form, AutoComplete } from "antd";
import "./responsiveContainer.scss";
import "./layoutDefault.scss";
import { Content, Footer } from "antd/es/layout/layout";

import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import logoheader from "../../image/logoheader.png";
import donhang from "../../image/donhang.png";
import position from "../../image/position.png";
import person from "../../image/person.png";
import cart from "../../image/cart.png";
import email from "../../image/email.png";
import telephone from "../../image/telephone.png";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { getProductsearch } from "../../service/getcategory/getCategory";
function LayoutDefault() {
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [render, setRender] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cookies = getCookie("token");

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

    console.log(value);
    if (value.length == 0) {
      setShowOptions(false);
    }
  };
  const handleFinish = (e) => {
    setRender(!render);
    navigate(`/search/${e["name-product"]}`);
  };
  const onFinishFailed = () => {};
  const handleKeydown = (e) => {
    if (e.code == "Enter") {
      setRender(!render);
      navigate(`/search/${e.target.value}`);
    }
  };
  const fetchData = async (searchText) => {
    const results = await getProductsearch(searchText);
    // Cập nhật options với kết quả từ tìm kiếm
    setOptions(results);
  };

  // Sử dụng useEffect để gọi fetchData khi searchText thay đổi
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
              <div className="header--logo">
                <img src={logoheader} alt="logo 3Tstore" />
              </div>

              {/* header-search */}

              <Form
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

              {/* header-search */}

              <div className="header--function">
                <div className="header--function__donhang header--function__c">
                  <NavLink to={cookies.length != 20 ? "/register" : "/order"}>
                    <img src={donhang} alt="don hang" />
                    <p className="header--function__chung">Đơn hàng</p>
                  </NavLink>
                </div>
                <div className="header--function__cuahang header--function__c">
                  <NavLink to="/dscuahang">
                    <img src={position} alt="cua hang" />
                    <p className="header--function__chung">Cửa hàng</p>
                  </NavLink>
                </div>

                <div className="header--function__taikhoan header--function__c">
                  <NavLink
                    to={
                      cookies.length != 20 ? "/register" : "/infor/thongtinkh"
                    }
                  >
                    <img src={person} alt="tai khoan" />
                    <p className="header--function__chung">Tài khoản </p>
                  </NavLink>
                </div>

                <div className="header--function__giohang header--function__c">
                  <NavLink to={cookies.length != 20 ? "/register" : "/cart"}>
                    <img src={cart} alt="gio hang" />
                    <p className="header--function__chung">Giỏ hàng</p>
                  </NavLink>
                </div>
              </div>
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
                <img className="footer--logo" src={logoheader} alt="logo" />
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
                  <Link to={"/"}>Giới thiệu</Link>
                </p>
                <p>
                  <Link to={"/"}>Đăng Nhập</Link>
                </p>
                <p>
                  <Link to={"/"}>Đăng kí</Link>
                </p>
                <p>
                  <Link to={"/"}>Giỏ Hàng</Link>
                </p>
              </div>
              <div className="footer--tongdai">
                <h3>Tổng đài hỗ trợ</h3>
                <p>
                  <b>Bộ phận chăm sóc:</b> 0399038165 (9h-22h)
                </p>
                <h3>Kết nối với chúng tôi</h3>
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
      </body>
    </>
  );
}

export default LayoutDefault;
