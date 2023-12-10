import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import "./information.scss";
import { getCookie } from "../../../components/takeCookies/takeCookies";
import { getUserstk } from "../../../service/getcategory/getCategory";
import { Breadcrumb, Col, Layout, Row } from "antd";
import Error from "../../../components/error/error";
const { Header, Content, Footer, Sider } = Layout;
function Infor() {
  const cookies = getCookie("token");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async (e) => {
      const result = await getUserstk(e);
      setData(result);
    };

    fetchApi(cookies);
  }, []);

  return (
    <>
  {cookies.length !== 0 ? (<>  <div className="infor">
        <div className="infor--bread">
          <Breadcrumb
            items={[
              {
                title: <Link to="/">Trang chủ</Link>,
              },

              {
                title: "Thông tin khách hàng",
              },
            ]}
          />
        </div>
        <Layout className="infor--layout">
          <Sider
            theme="light"
            className="infor--sider  animate__animated animate__fadeInLeft animate__faster"
          >
            <div className="infor--sidermain">
              <h2>TRANG TÀI KHOẢN</h2>
              <p>
                {" "}
                Xin chào, <b>{data && data[0] && data[0].username}</b>!{" "}
              </p>
              <Row gutter={[0, 15]} className="infor--row">
                <Col span={24}>
                  <Link to="/infor/thongtinkh">Thông Tin Khách Hàng</Link>
                </Col>
                <Col span={24}>
                  <Link to="/infor/address">Địa Chỉ</Link>
                </Col>
                <Col span={24}>
                  <Link to="/infor/changepass">Đổi Mật Khẩu</Link>
                </Col>
                <Col span={24}>
                  <Link to="/infor/yourorder">Lịch Sử Đơn Hàng</Link>
                </Col>
                <Col span={24}>
                  <Link to="/infor/logout">Đăng xuất</Link>
                </Col>
              </Row>
            </div>
          </Sider>
          <Content className="infor--content animate__animated animate__fadeInRight animate__faster">
            <Outlet />
          </Content>
        </Layout>
      </div></>) : (Error("Truy Cập Thông Tin Người Dùng", navigate))}
    
    </>
  );
}
export default Infor;
