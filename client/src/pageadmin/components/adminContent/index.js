import { Outlet } from "react-router-dom";

import "./adminContent.scss"


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
