import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { getCookie } from '../takeCookies/takeCookies';
export const checkRegister = (e) => {
    let newState = 0;
    fetch("http://localhost:3000/users")
.then(res => res.json())
.then(data => {
       for (let i = 0 ; i < data.length ; i++){
        if(e.target[1].value == data[i].password && e.target[0].value == data[i].username ){
            newState = data[i].token;
            Swal.fire({
                icon: 'success', // Sử dụng icon "success" cho thông báo thành công
                title: 'Đăng nhập thành công',
                text: 'Chào mừng bạn đã đăng nhập!',
              }).then((result) => {
                // Đoạn mã được thực thi khi người dùng ấn nút OK trong thông báo
                if (result.isConfirmed) {
                    window.location.href = "/";
                }
              });
          
            document.cookie ="token=" + newState;
           fetch(`http://localhost:3000/cart/${data[i].id}`)
           .then(res => res.json())
           .then(result => {
            localStorage.setItem(data[i].token, JSON.stringify(result));  
           })       
        } 
        else {
            continue;
        }
}
if (newState == 0) {
    Swal.fire({
      
        icon: 'error',
        title: 'ĐĂNG NHẬP KHÔNG THÀNH CÔNG',
        text: 'MỜI BẠN ĐĂNG NHẬP LẠI',
        
      })
}     

})
}