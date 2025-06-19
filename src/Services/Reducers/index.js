import { combineReducers } from "redux";
import productReducer from "./ProductReducer";
import cartReducer from "./CartReducer";



const rootReducer = combineReducers({
   productReducer,
   cartReducer
});

export default rootReducer;