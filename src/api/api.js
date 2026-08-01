import axios from "axios";
import config from "../config/app";

console.log(import.meta.env.MODE);
console.log(import.meta.env.VITE_API_BASE_URL);
console.log("API URL:", config.apiUrl);

const api = axios.create({
    baseURL: config.apiUrl,
    timeout: 10000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
|
| Automatically attach the Bearer Token to every request.
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem("token");

        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");

            // Later we'll redirect to login
        }

        return Promise.reject(error);
    }
);

export default api;