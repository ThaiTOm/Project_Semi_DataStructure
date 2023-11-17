// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
// import { check } from "../../actions/Tracnghiem";
import { checkRegister } from "../../components/checkRegister";
import "./register.scss"
import { getCookie } from "../../components/takeCookies/takeCookies";
import { Link } from "react-router-dom";
import { Button, Input } from "antd";
// import { check } from "../../actions/Tracnghiem";
// import { useEffect, useState } from "react";
function Register(){
    // const dispatch = useDispatch();
    // const [data, setData] = useState("concac");
    // var chuyendoi = true;
    // const Check = useSelector((state) => state.inforReducer);

    const cookie = getCookie("token")
   

    
    const inputRef = useRef();

    
    useEffect(() => {
      {cookie.length == 0 ? (inputRef.current.focus()) : (console.log('ok'))}
      
    }, []);


    const handleSubmit = (e) => {
      console.log(e);
        e.preventDefault();
     checkRegister(e);
   }
  

//    document.cookie = 'token=checkToken';

    return (
        <>
        {cookie.length == 0 ? (<form action="" className="register--form" onSubmit={handleSubmit}>
       <div className="register" >
        <h3 className="register--heading"> Đăng Nhập </h3>
        <p className="register--login">Bạn chưa có tài khoản? <Link to="/login">Đăng kí tại đây</Link></p>
        <div class="register--group">
          <label for="username" className="register--group__label">Username</label>
          <br/>
          <Input ref={inputRef} id="username" name="username" placeholder="VD: sonthanhdepzai" className="register--group__control" required />
         
        </div>

        <div class="register--group">
          <label for="password" className="register--group__label">Mật khẩu</label>
          <br/>
          <Input.Password id="password" name="password"  placeholder="Nhập mật khẩu" className="register--group__control" required />
         
        </div>

        <Button className="register--submit" htmlType="submit" >Đăng Nhập</Button>
        </div>
      </form>) : (
    
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
export default Register;