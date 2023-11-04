import { Button } from "antd";
import { setCookie } from "../../../components/setTime/setTime";
import Swal from "sweetalert2";
import { getCookie } from "../../../components/takeCookies/takeCookies";
import { Link, useNavigate } from "react-router-dom";
function Logout() {
const navigate = useNavigate();
   


    const handleClick = ()  => {
        Swal.fire({
          title: 'Do you want to log out?',
         
          showCancelButton: true,
          confirmButtonText: 'Yes',
          
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Logged out!', '', 'success')
            .then((result) => {
              if (result.isConfirmed){
                const removeCookie = getCookie("token");
                setCookie("token", removeCookie, -10);
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