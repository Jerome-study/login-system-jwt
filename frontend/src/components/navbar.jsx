import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useEffect, useState } from "react"
import { axiosPrivate } from "../axios/axios"



export const Navbar = () =>{ 
    const [user, setUser] = useState();
    const { auth } = useAuth();
    useEffect(() => {
        const isLoggedIn = async () => {
            try {
                const response = await axiosPrivate.get("/protected");
                setUser(response.data);
            } catch(error) {

            } finally {
                
            }
        };
        setTimeout(() => {
            isLoggedIn();
        },100)
    
        
    }, [auth])

    return(
        <>
            { user }
            <Link  to={"/"}>Home</Link>
            <Link  to={"/dashboard"}>Dashboard</Link>
            <Link  to={"/profile"}>Profile</Link>
            <Link  to={"/signin"}>Signin</Link>
        </>
    )
}