import { useState } from "react"
import { useAuth } from "../hooks/useAuth";
import { axiosPrivate, instance } from "../axios/axios";
import { useNavigate } from 'react-router-dom'

export const SignInPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post("/auth/login", { username, password });
            if (response.status === 203) {
                console.log(response.data);
            } else {
                const accessToken = response?.data.accessToken;
                console.log(accessToken);
                setAuth({ accessToken })
                setTimeout(() => {
                    navigate("/dashboard");
                }, 100)
                
            }
            
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <>
            <div>
                <h1>Signin</h1>
                <form onSubmit={handleClick}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="username">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}