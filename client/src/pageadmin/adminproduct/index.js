import { Outlet } from "react-router-dom";
import "./adminproduct.scss"
function Adminproduct () {
    return (
        <>
            <div className="adminproduct" >
         <Outlet />
            </div>
        </>
    )
}
export default Adminproduct;