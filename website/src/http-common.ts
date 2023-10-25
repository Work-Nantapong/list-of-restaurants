// import axios, { AxiosInstance } from "axios";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:9000/api/",
    headers: {
        "Content-type": "application/json",
    },
});
// console.log(instance)
export default instance;