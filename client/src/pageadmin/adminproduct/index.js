import Categorylist from "../components/categoryList/cateList";
import Productlist from "../components/productList/productList";

function Adminproduct () {
    return (
        <>
            <div className="adminproduct" >
             <Productlist />
           <Categorylist />
            </div>
        </>
    )
}
export default Adminproduct;