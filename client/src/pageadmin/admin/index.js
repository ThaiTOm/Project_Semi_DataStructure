import Adminlayout from "../adminlayout";
import "./admin.scss";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";
function Admin() {
  const cookies = getCookie("token");

  return (
    <>
      <div className="admin">
        <div className="admin--glass">
          {cookies.includes("admin0305") === true ? (
            <Adminlayout />
          ) : (
            <Result
    status="403"
    title="403"
    subTitle="Xin lỗi, Bạn không có quyền truy cập trang này!."
    extra={ <Link to="/" className="admin--gobackbutton"> Back Home
  </Link>}
  />
          )}
        </div>
      </div>
    </>
  );
}
export default Admin;
