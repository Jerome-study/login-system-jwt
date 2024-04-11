import { axiosPrivate } from "../axios/axios"



export const Profile = () => {

    const logout = async () => {
        const response = await axiosPrivate.post("/auth/logout");
        window.location.href = "/signin";
    }

    return(
        <>
            <h1>Profile Page</h1>
            <button onClick={logout}>Logout</button>
        </>
    )
}