import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import "../../layout/layoutDefault/responsiveContainer.scss"
import 'sweetalert2/src/sweetalert2.scss';
import "./login.scss"
// import { check } from "../../actions/Tracnghiem";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { Link } from "react-router-dom";
import { patchCart } from "../../service/patch/patch";
import { postCart, postShipping } from "../../service/post/post";
function Login(){

const inputRef = useRef();
const cookie = getCookie("token")
    console.log(cookie);
    function isVietnameseNameValid(name) {
      // Biểu thức chính quy kiểm tra định dạng tên người Việt
      // Cho phép chữ cái và khoảng trắng, và có thể chứa dấu (ví dụ: Nguyễn, Đỗ)
      const namePattern = /^[\p{L}\s']+$/u; // Yêu cầu JavaScript hỗ trợ Unicode (u flag)
      return namePattern.test(name);
    }
    
    function isValidPassword(password) {
      // Yêu cầu tối thiểu 8 ký tự, ít nhất một chữ cái viết hoa, chữ cái viết thường và một chữ số
      const lengthRequirement = password.length >= 8;
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const digitRegex = /\d/;
    
      const hasUppercase = uppercaseRegex.test(password);
      const hasLowercase = lowercaseRegex.test(password);
      const hasDigit = digitRegex.test(password);
    
      return lengthRequirement && hasUppercase && hasLowercase && hasDigit;
    }
    

function isValidUsername(username) {
  // Yêu cầu ít nhất 8 ký tự
  const minLength = 8;
  const hasValidLength = username.length >= minLength;
  
  // Yêu cầu ký tự hợp lệ: chữ cái, số, ký tự đặc biệt như gạch dưới
  const isValidCharacters = /^[A-Za-z0-9_-]*$/.test(username);

  return hasValidLength  && isValidCharacters;
}

// Sử dụng hàm kiểm tra

useEffect(() => {
  
  inputRef.current.focus();
}, []);

const [data, setData ] = useState(true)
const [data_1, setData_1 ] = useState(true)
const [data_2, setData_2 ] = useState(true)


// hàm bấm ra ngoài thì giá trị đó hay sai?
const handleOnblur = (e) => {
  console.log(e);
  
  if (isVietnameseNameValid(e.target.value, ) == false ){
        setData(false);
        
  }
  else {
        setData(true);
  }
}
const handleOnblur_1 = (e) => {
 
  if (isValidUsername(e.target.value) == false  ){
        setData_1(false);
  }
  else {
        setData_1(true);
  }
}
const handleOnblur_2 = (e) => {
  if ( isValidPassword(e.target.value) == false ){
        setData_2(false);
  }
  else {
        setData_2(true);
  }
}
// hàm bấm ra ngoài thì giá trị đó hay sai?

// hàm string ngẫu nhiên
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  
  return result;
}
// hàm string ngẫu nhiên




// hàm check tổng thể sai hay đúng khi submit
const handleSubmit = (e) => {
     e.preventDefault();
     
     if(isVietnameseNameValid(e.target[0].value) == true && isValidUsername(e.target[1].value) == true && isValidPassword(e.target[2].value) == true) {

      var dataUsers = [];
      dataUsers = {
["fullName" ]: e.target[0].value,
["username"]: e.target[1].value,
["password"]:e.target[2].value,
["token"]: generateRandomString(20)
    }
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(data => {
        let checkTk = data.some(item => {
          return item.username == dataUsers.username;
        })
       
        if (checkTk == true){
          new Swal({
            title: "ĐĂNG KÍ KHÔNG THÀNH CÔNG",
            text: "Tài khoản đã tồn tại",
            icon: "error",
          });
        }
          else {
            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(dataUsers)
            })
            .then(res => res.json())
            .then(data => {
              const postApi = async (e) => {
                try {
                  const result = await postCart(e); // Gọi hàm patchCart với tham số là data
                  console.log(result);
                } catch (error) {
                  console.error("Error while patching cart:", error);
                  // Xử lý lỗi nếu có, có thể log ra console hoặc thực hiện các hành động khác
                }
              };
              const postship = async (e) => {
                try {
                  const result = await postShipping(e); // Gọi hàm patchCart với tham số là data
                  console.log(result);
                } catch (error) {
                  console.error("Error while patching cart:", error);
                  // Xử lý lỗi nếu có, có thể log ra console hoặc thực hiện các hành động khác
                }
              };

              postApi({
                ["userId"]: data.id,
              ["product"]: []
              });

              postship({
                ["userId"]: data.id,
              ["delivery"]: []
              });
              console.log(data);
            })
        
            Swal.fire({
              icon: 'success', // Sử dụng icon "success" cho thông báo thành công
              title: 'Đăng kí thành công',
              text: 'Chào mừng bạn đến với 3Tstore!',
            }).then((result) => {
              // Đoạn mã được thực thi khi người dùng ấn nút OK trong thông báo
              
              if (result.isConfirmed) {
                  window.location.href = "/register";
              }
            });
          }
        })
      
    
  
  }
  else {
    new Swal({
      title: "ĐĂNG KÍ KHÔNG THÀNH CÔNG",
      text: "Mời bạn nhập lại thông tin",
      icon: "error",
    });
  }
    }
// hàm check tổng thể sai hay đúng khi submit

// nhập thì không báo lỗi
    const handleChange = () => {
      setData(true);
     
      
    }
    const handleChange_1 = () => {
      
      setData_1(true);
     
      
    }
    const handleChange_2 = () => {
      setData_2(true);
    }
   
// nhập thì không báo lỗi

// focus thì không báo lỗi
    
    // focus thì không báo lỗi

    return (
        <>
{cookie.length == "" ? ( <form action="" className="login--form"  onSubmit={handleSubmit}>
 <div className="container" >
       <div className="login">
        <h3 className="login--heading"> Đăng ký </h3>
        <p className="login--register">Bạn đã có tài khoản? <Link to="/register">Đăng nhập tại đây</Link></p>
        <div className="login--group">
          <label for="fullname" className="login--group__label">Tên đầy đủ</label>
          <br/>
          <input ref = {inputRef}  onBlur={handleOnblur} onChange={handleChange}   id="fullname" name="fullname" type="text" placeholder="VD: Sơn Đặng" className="login--group__control" required />
          <span className={data ? 'handleNotice' : ''} id="notice">Tên sai định dạng. Vui lòng nhập lại!</span>

        </div>

        <div class="login--group">
          <label for="username" className="login--group__label">Username</label>
          <br/>
          <input  onBlur={handleOnblur_1} onChange={handleChange_1}  id="username" name="username" type="text" placeholder="VD: sonthanhdepzai" class="login--group__control" required />
          <span className={data_1 ? 'handleNotice' : ''} id="notice">Username sai định dạng. Vui lòng nhập lại!</span>
        </div>

        <div class="login--group">
          <label for="password" className="login--group__label">Mật khẩu</label>
          <br/>
          <input   onBlur={handleOnblur_2} onChange={handleChange_2}   id="password" name="password" type="password" placeholder="Nhập mật khẩu" className="login--group__control" required />
          <span className={data_2 ? 'handleNotice' : ''} id="notice">Vui lòng nhập tối thiểu 8 kí tự, một chữ thường, 1 chữ hoa và 1 số </span>
        </div>


        <button className="login--submit">Đăng ký</button>
        </div></div>
      </form>) :  (
    
    <>
    <body>
        <div class="error-container">
            <h1>Đã xảy ra lỗi!</h1>
            <p>Xin lỗi, trang web không thể hiển thị do lỗi không xác định.</p>
        </div>
       </body>
    </>
    
    )}
      
        </>
        
    )
}
export default Login;