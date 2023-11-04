import { Breadcrumb } from "antd";
import { Link, Outlet } from "react-router-dom";

function Search () {
    return (
        <>
       
         
         <Breadcrumb
           items={[
             {
               title: <Link to="/">Trang chủ</Link>,
             },

             {
               title: <div>Tìm kiếm</div>,
             },
           ]}
         />
       
            <Outlet />
        </>
    )
}

export default Search;