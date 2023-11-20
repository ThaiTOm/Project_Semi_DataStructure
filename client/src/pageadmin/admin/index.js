import Adminlayout from "../adminlayout";
import "./admin.scss";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { Link } from "react-router-dom";
function Admin() {
  const cookies = getCookie("token");

  return (
    <>
      <div className="admin">
        <div className="admin--glass">
          {cookies === "admin0305" ? (
            <Adminlayout />
          ) : (
            <div className="admin--error__container">
            <img src="https://img.icons8.com/3d-fluency/94/cancel.png"  className="admin--error__image" alt="cancel"/>
              <div className="admin--error__message">
                Error: Unable to access admin page
              </div>
              <div className="admin--error__description">
                It seems like you don't have the necessary permissions to access
                the admin page. Please contact the administrator for assistance.
              </div>
              <Link to="/" className="admin--gobackbutton">
                Go Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Admin;
