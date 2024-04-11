import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosPrivate } from "../axios/axios";
import { useNavigate } from "react-router-dom" 

export const Protected = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState("");
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const response = await axiosPrivate.get("/protected");
                setUser(response.data)
            } catch(error) {
                if (error.response?.status === 401 || error.response?.status === 403) return navigate("/signin");
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, []);

    if (loading) return <h1>Loading....</h1>

    return(
        <>
            <Outlet />
        </>
    )
}