import { combineReducers } from "redux";
import { carReducers } from "./carReducers";
import selectedReducer from "./selectedReducer";
import { loggedUser, userReducers } from "./userReducers";

const reducers = combineReducers({
    users: userReducers,
    loggedUser: loggedUser,
    cars: carReducers,
    selectedcar: selectedReducer
});

export default reducers