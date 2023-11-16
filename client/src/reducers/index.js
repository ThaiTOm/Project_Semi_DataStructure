import { combineReducers } from "redux";
import cartStore from "./cartStore"; 
import ttStore from "./ttStore";
const allReducers = combineReducers({
    cartStore,
    ttStore

});
export default allReducers;