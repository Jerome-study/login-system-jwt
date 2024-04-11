import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
    withCredentials: true
})


export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
    withCredentials: true
})


    




