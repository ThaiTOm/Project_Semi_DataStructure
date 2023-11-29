import { combineReducers } from "redux";
import cartStore from "./cartStore"; 
import ttStore from "./ttStore";
import Reload from "./Reload";
const allReducers = combineReducers({
    cartStore,
    ttStore,
    Reload

});
export default allReducers;