import axios from "axios";

const REACT_APP_ROOT_API = 'http://localhost:3000/api';

const axiosInstance = axios.create({
    baseURL: REACT_APP_ROOT_API,
    timeout: 1000000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

axiosInstance.interceptors.request.use((request) => {
    const accessToken = localStorage.getItem('token');
    const accessHeader = `Bearer ${accessToken}`;
    if (request.headers) {
        request.headers["Authorization"] = accessHeader;
    }
    return request;
});

export default axiosInstance;