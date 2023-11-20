// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
// import { check } from "../../actions/Tracnghiem";
import { checkLogin } from "../../components/checkLogin";
import "./login.scss"
import { getCookie } from "../../components/takeCookies/takeCookies";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { check } from "../../actions/Tracnghiem";
// import { useEffect, useState } from "react";
function Login(){
    // const dispatch = useDispatch();
    // const [data, setData] = useState("concac");
    // var chuyendoi = true;
    // const Check = useSelector((state) => state.inforReducer);
    const [form] = Form.useForm();
    const cookie = getCookie("token")
   

    
    const inputRef = useRef();

    
    useEffect(() => {
      {cookie.length == 0 ? (inputRef.current.focus()) : (console.log('ok'))}
      
    }, []);


    const handleSubmit = (e) => {
      
     checkLogin(e);
   }
  

//    document.cookie = 'token=checkToken';

    return (
        <>
        {cookie.length == 0 ? (   <Form form={form} onFinish={handleSubmit} className="login--form">
      <div className="login">
        <h3 className="login--heading">Đăng Nhập</h3>
        <p className="login--register">
          Bạn chưa có tài khoản? <Link to="/register">Đăng kí tại đây</Link>
        </p>

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input ref={inputRef} prefix={<UserOutlined/>} className="login--group__control" placeholder="VD: sonthanhdepzai" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password prefix={<LockOutlined />} className="login--group__control"  placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item className="login--forgot">
      

        <a className="login--forgot__a" href="">
          Forgot password
        </a>
      </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login--submit">
            Đăng Nhập
          </Button>
        </Form.Item>
      </div>
    </Form>) : (
    
<>
<div className="body">
    <div class="error-container">
        <h1>Đã xảy ra lỗi!</h1>
        <p>Xin lỗi, trang web không thể hiển thị do lỗi không xác định.</p>
    </div>
   </div>
</>

)}
         
          
        </>
    )
}
export default Login;