import { useAuth } from '../hooks/useAuth';
import { axiosPrivate, instance } from '../axios/axios';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const AxiosErrorHandler = ({ children }) => {
    const { auth, setAuth } = useAuth();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config;
            }, (error) => {
                return Promise.reject(error)
            },
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const response = await instance.post("/auth/refresh");
                    setAuth({ accessToken: response.data.accessToken })
                    prevRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        
        return () => { 
            setLoading(false)    
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [auth])

    if (loading) return <h1>Loading...</h1>
    return children;
}

export default AxiosErrorHandler