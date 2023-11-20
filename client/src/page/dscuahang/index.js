

import { Link } from "react-router-dom";
import "./dscuahang.scss"
import { Breadcrumb, Col, Layout } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function Dscuahang(){

    return (
        <>
            <div className="dscuahang--bread">
          {" "}
          <Breadcrumb
            items={[
              {
                title: <Link to="/">Trang chủ</Link>,
              },

              {
                title: "Danh sách cửa hàng",
              },
            ]}
          />
        </div>
        <Content className="dscuahang  animate__animated animate__slideInLeft animate__faster">
        <h1 className="dscuahang--title">
        DANH SÁCH CỬA HÀNG 3Tstore
        </h1>
        <div  className="dscuahang--cs1">
            <h2 className="dscuahang--cs1__place">
               A. HÀ NỘI
            </h2>
            <div className="dscuahang--cs1__s1 dscuahang--cs1__s">
            <h3> CƠ SỞ 1 </h3>
                <p><b>Địa chỉ: </b>122 Hoàng Quốc Việt, Q.Cầu Giấy, Hà Nội.</p>
                <p><b>Hotline:</b> 0939393939</p>
                <p><b>Email: </b>sonthanh@gmail.com</p>
            </div>
            <div className="dscuahang--cs1__s2 dscuahang--cs1__s">
            <h3> CƠ SỞ 2 </h3>
                <p><b>Địa chỉ: </b>Km10, Đường Nguyễn Trãi, Q.Hà Đông, Hà Nội</p>
                <p><b>Hotline:</b> 0938383838</p>
                <p><b>Email: </b>sonthanh@gmail.com</p>
            </div>
        </div>
        <div className="dscuahang--cs2">
            <h2 className="dscuahang--cs2__place">
               B. HỒ CHÍ MINH
            </h2>
            <div className="dscuahang--cs2__s1 dscuahang--cs2__s">
            <h3> CƠ SỞ 3 </h3>
                <p><b>Địa chỉ: </b>122 Hoàng Quốc Việt, Q.Cầu Giấy, Hà Nội.</p>
                <p><b>Hotline:</b> 0939393939</p>
                <p><b>Email: </b>sonthanh@gmail.com</p>
            </div>
            <div className="dscuahang--cs2__s2 dscuahang--cs2__s">
            <h3> CƠ SỞ 4 </h3>
                <p><b>Địa chỉ: </b>Km10, Đường Nguyễn Trãi, Q.Hà Đông, Hà Nội</p>
                <p><b>Hotline:</b> 0938383838</p>
                <p><b>Email: </b>sonthanh@gmail.com</p>
            </div>
        </div>
        </Content>
        </>
    )
}
export default Dscuahang;