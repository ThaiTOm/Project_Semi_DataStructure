


import RightSide from "../components/RigtSide/RightSide";
import MainDash from "../components/MainDash/MainDash";
import "./admindash.scss"


function Admindash () {
    return (
        <>
        <div className="admindash" >
            <h1>Dashboard</h1>
            
      <MainDash />
      {/* <RightSide /> */}
        </div>
            
           
        </>
    )
}
export default Admindash;