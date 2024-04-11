import { useState } from "react"
import { axiosPrivate } from "../axios/axios";
import { useNavigate } from 'react-router-dom'

export const SignUpPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validate, setValidate] = useState("");
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post("/auth/register", { username, password, confirmPassword });
            if (response.status === 203) {
                console.log(response)
                setValidate(response?.data.message);
            } else {
                navigate("/signin");
            }
        } catch(error) {
            setValidate(error?.response?.data?.message);
        }
    }

    return(
        <>
            <div>
                {validate}
                <h1>Sign Up</h1>
                <form onSubmit={handleClick}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}