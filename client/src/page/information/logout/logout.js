import { Button } from "antd";
import { deleteCookie } from "../../../components/setTime/setTime";
import Swal from "sweetalert2";
import {  useNavigate } from "react-router-dom";
import "./logout.scss"
function Logout() {
const navigate = useNavigate();
   


    const handleClick = ()  => {
        Swal.fire({
          title: 'Bạn Có Chắc Chắn Muốn Đăng Xuất Không?',
         
          showCancelButton: true,
          confirmButtonText: 'Yes',
          
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Đã Đăng Xuất!', '', 'success')
            .then((result) => {
              if (result.isConfirmed){
                // const removeCookie = getCookie("token");
                // setCookie("token", removeCookie, -10);
  
                deleteCookie("token");
                deleteCookie("checkHD");
                   navigate("/")    
              window.location.reload();
            
              }
            })
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
      }

    return (
        <>
            <div className="logout" >
                <h2> ĐĂNG XUẤT </h2>
                <Button onClick={() => handleClick()} type="primary">Đăng xuất</Button>
            </div>
        </>
    )
}
export default Logout;