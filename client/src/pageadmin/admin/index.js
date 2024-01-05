import Adminlayout from "../adminlayout";
import "./admin.scss";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";
import { getMyUser } from "../../service/getcategory/getCategory";
import { useEffect, useState } from "react";
function Admin() {
  const cookies = getCookie("token");
  const [type, setType] = useState({ type: "" });
  const getUser = async (values) => {
    const result = await getMyUser(values);
    setType(result);
  };

  useEffect(() => {
    getUser(cookies);
  }, [cookies]);

  return (
    <>
      <div className="admin">
        <div className="admin--glass">
          {type.type === "admin" ? (
            <Adminlayout />
          ) : type.type === "" ? ("") : (
            <Result
              status="403"
              title="403"
              subTitle="Xin lỗi, Bạn không có quyền truy cập trang này!."
              extra={
                <Link to="/" className="admin--gobackbutton">
                  Back Home
                </Link>
              }
            />
          )}
        </div>
      </div>
    </>
  );
}
export default Admin;
