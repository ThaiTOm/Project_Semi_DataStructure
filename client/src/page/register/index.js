// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
// import { check } from "../../actions/Tracnghiem";
import { checkRegister } from "../../components/checkRegister";
import "./register.scss"
import { getCookie } from "../../components/takeCookies/takeCookies";
import { Link } from "react-router-dom";
// import { check } from "../../actions/Tracnghiem";
// import { useEffect, useState } from "react";
function Register(){
    // const dispatch = useDispatch();
    // const [data, setData] = useState("concac");
    // var chuyendoi = true;
    // const Check = useSelector((state) => state.inforReducer);

    const cookie = getCookie("token")
    console.log(cookie.length);

    
    const inputRef = useRef();

    
    useEffect(() => {
      {cookie.length != 20 ? (inputRef.current.focus()) : (console.log('ok'))}
      
    }, []);


    const handleSubmit = (e) => {
      console.log(e);
        e.preventDefault();
     checkRegister(e);
   }
  

//    document.cookie = 'token=checkToken';

    return (
        <>
        {cookie.length != 20 ? (<form action="" className="register--form" onSubmit={handleSubmit}>
       <div className="register" >
        <h3 className="register--heading"> Đăng Nhập </h3>
        <p className="register--login">Bạn chưa có tài khoản? <Link to="/login">Đăng kí tại đây</Link></p>
        <div class="register--group">
          <label for="username" className="register--group__label">Username</label>
          <br/>
          <input ref={inputRef} id="username" name="username" type="text" placeholder="VD: sonthanhdepzai" className="register--group__control" required />
          <span className="register--group__message"></span>
        </div>

        <div class="register--group">
          <label for="password" className="register--group__label">Mật khẩu</label>
          <br/>
          <input id="password" name="password" type="password" placeholder="Nhập mật khẩu" className="register--group__control" required />
          <span className="register--group__message"></span>
        </div>

        <button className="register--submit">Đăng Nhập</button>
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