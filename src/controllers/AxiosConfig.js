import axios from "axios";
import { DEV_API_URL, PRODUCTION_API_URL } from '../Constant/Static';

axios.defaults.baseURL = DEV_API_URL;

export const axiosinstance = axios.create({
    baseURL: DEV_API_URL,
    headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Accept-Language": "en-GB,en"
    }
})

//ADD REQUEST INTERCEPTOR
// @ts-ignore
axiosinstance.interceptors.request.use(function (config) {
    const userLogincred = localStorage.getItem('usrCred');
    const AUTH_TOKEN = userLogincred ? JSON.parse(userLogincred).token : 0;
    config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    return config;
}, function (err) {
    console.log(err)
})