import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})


export const axiosPrivate = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})


    




