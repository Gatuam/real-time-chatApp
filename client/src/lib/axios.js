import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "http://localhost:3005/api",
    withCredentials: true
});