import { Button } from "antd";
import { deleteCookie, setCookie } from "../../../components/setTime/setTime";
import Swal from "sweetalert2";
import { getCookie } from "../../../components/takeCookies/takeCookies";
import { Link, useNavigate } from "react-router-dom";
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