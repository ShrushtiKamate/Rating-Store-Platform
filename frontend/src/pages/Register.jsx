import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/Login.css";

function Register() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [address,setAddress] = useState("");
    const [password,setPassword] = useState("");

    const handleRegister = async () => {

        try{

            const response =
            await api.post(
                "/api/auth/register",
                {
                    name,
                    email,
                    address,
                    password
                }
            );

            alert(
                response.data.message
            );

        }
       catch(error){

            alert(
                error.response?.data?.message
            );

        }

    };

    return (

        <div className="login-container">

            <h2>Create Account</h2>
           <div className="form-group">

                <label>Name</label>

                <input
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />

                <p className="helper-text">
                    Name must be 20–60 characters.
                </p>

            </div>

            <div className="form-group">

                <label>Email</label>

                <input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <p className="helper-text">
                    Please enter a valid email address.
                </p>

            </div>


            <div className="form-group">

                <label>Address</label>

                <input
                    type="text"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                />

                <p className="helper-text">
                    Address must be at most 400 characters.
                </p>

            </div>


            <div className="form-group">

                <label>Password</label>

                <input
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <p className="helper-text">
                    Password must contain 8-16 characters,
                    one uppercase letter and one special character.
                </p>

            </div>

            <button onClick={handleRegister}>
                Register
            </button>

            <br /><br />

            <p>
                Already have an account?
            </p>

            <Link to="/">
                Login
            </Link>

        </div>

    );

}

export default Register;