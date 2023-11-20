import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./adminContent.scss"
const { Header, Content, Footer, Sider } = Layout;

function Admincontent() {
  return (
    <>
     
       <div className="admincontent" >
          <Outlet />
       </div>
        
       
    
    </>
  );
}
export default Admincontent;
