import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import "../../layout/layoutDefault/responsiveContainer.scss"
import 'sweetalert2/src/sweetalert2.scss';
import "./register.scss"
// import { check } from "../../actions/Tracnghiem";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { Link } from "react-router-dom";
import { patchCart } from "../../service/patch/patch";
import { postCart, postShipping } from "../../service/post/post";
import { Button, Form, Input } from "antd";
function Register(){
 
const inputRef = useRef();
const cookie = getCookie("token")
    console.log(cookie);
    // function isVietnameseNameValid(name) {
    //   // Biểu thức chính quy kiểm tra định dạng tên người Việt
    //   // Cho phép chữ cái và khoảng trắng, và có thể chứa dấu (ví dụ: Nguyễn, Đỗ)
    //   const namePattern = /^[\p{L}\s']+$/u; // Yêu cầu JavaScript hỗ trợ Unicode (u flag)
    //   return namePattern.test(name);
    // }
    


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
  if (inputRef.current){
     inputRef.current.focus();
  }
 
}, []);

const [data_1, setData_1 ] = useState(true)
const [data_2, setData_2 ] = useState(true)


// hàm bấm ra ngoài thì giá trị đó hay sai?

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
const onFinish = (e) => {
   
     console.log(e);
     if( isValidUsername(e.username) == true && isValidPassword(e.password) == true) {
     
      
      var dataUsers = [];
      dataUsers = {
["username"]: e.username,
["password"]:e.password,
["token"]: generateRandomString(20)
    }
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(data => {
        let checkTk = data.some(item => {
          return item.username === dataUsers.username && item.token === dataUsers.token;
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
              // const postship = async (e) => {   không sử dụng
              //   try {
              //     const result = await postShipping(e); // Gọi hàm patchCart với tham số là data
              //     console.log(result);
              //   } catch (error) {
              //     console.error("Error while patching cart:", error);
              //     // Xử lý lỗi nếu có, có thể log ra console hoặc thực hiện các hành động khác
              //   }
              // };

              postApi({
                ["userId"]: data.id,
              ["product"]: []
              });

              // postship({  không sử dụng
              //   ["userId"]: data.id,
              // ["delivery"]: []
              // });
              // console.log(data);
            })
        
            Swal.fire({
              icon: 'success', // Sử dụng icon "success" cho thông báo thành công
              title: 'Đăng kí thành công',
              text: 'Chào mừng bạn đến với 3Tstore!',
            }).then((result) => {
              // Đoạn mã được thực thi khi người dùng ấn nút OK trong thông báo
              
              if (result.isConfirmed) {
                  window.location.href = "/login";
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

const onFinishFailed = (e) => {
  console.log(e)
  if (e.values.password !== e.values.confirmPassword) {
    // Thông báo lỗi nếu mật khẩu và xác nhận mật khẩu không khớp
    Swal.fire({
      title: 'ĐĂNG KÝ KHÔNG THÀNH CÔNG',
      text: 'Mật khẩu và xác nhận mật khẩu không khớp',
      icon: 'error',
    });
  
  }
};


// nhập thì không báo lỗi
  
    const handleChange_1 = () => {
      
      setData_1(true);
     
      
    }
    const handleChange_2 = () => {
      setData_2(true);
    }
   
// nhập thì không báo lỗi


console.log(cookie.length)
    return (
        <>
{cookie.length == 0 ? (  <Form

 layout="vertical"
      name="register"
      className="register--form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelCol={{ span: 16 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
     
    >
 <div className="container" >
       <div className="register">
        <h3 className="register--heading"> Đăng ký </h3>
        <p className="register--login">Bạn đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link></p>
        <Form.Item
        label="Username"
        name="username"
        rules={[
                  { required: true, message: '' },
                ]}
      >
        <Input ref={inputRef}  onBlur={handleOnblur_1} onChange={handleChange_1}  />
       
      </Form.Item>
      {!data_1 ? (
        <div style={{ color: 'red',
        marginTop: '-25px' }}>Username phải có ít nhất 8 ký tự và chỉ chứa chữ cái, số, gạch dưới và dấu gạch ngang.</div>
      ) : ("")}
      <Form.Item
        label="Password"
        name="password"
        rules={[
                  { required: true, message: '' },
          
                ]}
      >
       
        <Input.Password  onBlur={handleOnblur_2} onChange={handleChange_2} />
       
      </Form.Item>
      {!data_2 ? (
        <div style={{ color: 'red',
        marginTop: '-25px' }}>Vui lòng nhập tối thiểu 8 kí tự, một chữ thường, 1 chữ hoa và 1 số .</div>
      ) : ("")}
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu không khớp'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{  span: 24 }}>
        <Button type="primary" htmlType="submit" className="
        register--submit">
          Register
        </Button>
      </Form.Item>
        </div></div>
        </Form>) :  (
    
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
export default Register;