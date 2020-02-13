import { combineReducers } from "redux";
import loginUser from "./usersLogin";
import regisUser from "./userRegis";

const reducers = combineReducers({
  loginUser,regisUser
});

export default reducers;
