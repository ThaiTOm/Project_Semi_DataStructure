import { getCookie } from "../../components/takeCookies/takeCookies";

const Adminlayout = () => {
   
    const cookie = getCookie("token")


    return (
        <>
  {cookie == "admin0305" ? (<div>thanhcong</div>) : (<div>thatbai</div>)}
        </>
    )
}
export default Adminlayout;
