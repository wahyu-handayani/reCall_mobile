import Axios from "axios";


export const Login = (data) => {
  return {
    type: "LOGIN",
    payload: Axios.post("http://192.168.100.3:4000/login", data)
  };
}
export const Regis = (data) => {
  return {
    type: "REGIS",
    payload: Axios.post("http://192.168.100.3:4000/regis", data)
  };
}