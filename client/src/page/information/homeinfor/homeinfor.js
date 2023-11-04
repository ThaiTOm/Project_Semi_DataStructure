import { Breadcrumb, Col, Layout, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import "./information.scss"
import { getCookie } from "../../../components/takeCookies/takeCookies";
import { getUserstk } from "../../../service/getcategory/getCategory";
function Infor () {
    const cookies = getCookie("token")
    const [data, setData] = useState([])


    useEffect(() => {
      const fetchApi = async (e) => {
        const result = await getUserstk(e)
        setData(result);
      }

      fetchApi(cookies);
    },[])
  
    console.log(data);
    return (
        <>
            <div className="infor" >
           
               
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
                <Sider theme="light" className="infor--sider">
                <div className="infor--sidermain" > 
                 <h2>
                        TRANG TÀI KHOẢN
                    </h2>
                    <p> Xin chào, <b>{data && data[0] && data[0].fullName}</b>! </p>
             <Row gutter={[0, 15]} className="infor--row">
                <Col span={24} >
                      <Link to="/infor/thongtinkh" >
                    Thông Tin Khách Hàng
                      </Link>
                </Col>
                <Col span={24} >
                       <Link to="/infor/address" >
                        Địa Chỉ
                      </Link>
                </Col>
                <Col span={24} >
                <Link to="/infor/changepass" >
                        Đổi Mật Khẩu
                        </Link>
                </Col>
                <Col span={24} >
                <Link to="/infor/yourorder" >
                        Đơn Hàng Của Bạn
                        </Link>
                </Col>
                <Col span={24} >
                <Link to="/infor/logout" >
                        Đăng xuất
                        </Link>
                </Col>
             </Row>

                    </div>
                  
                </Sider>
<Content className="infor--content">
    <Outlet />
</Content>

            </Layout>
           
            </div>
        </>
    )
}
export default Infor;