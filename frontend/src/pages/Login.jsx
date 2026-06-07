import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";

function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {

        try{

            const response = await api.post(
                "/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            if(response.data.role === "ADMIN"){

                navigate("/admin");

            }
            else if(
                response.data.role === "STORE_OWNER"
            ){

                navigate("/owner");

            }
            else{

                navigate("/stores");

            }
        }
        catch(error){

            console.log(error.response?.data);

        }

    };

    return (
        <div className="login-container">

            <h2>Store Rating Platform</h2>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

            <br /><br />

                <p>
                    Don't have an account?
                </p>

                <Link to="/register">
                    Register
                </Link>

        </div>
    );
}

export default Login;