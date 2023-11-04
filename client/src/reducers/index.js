import { combineReducers } from "redux";
import cartStore from "./cartStore"; 
const allReducers = combineReducers({
    cartStore,

});
export default allReducers;