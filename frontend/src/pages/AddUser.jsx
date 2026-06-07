import { useState } from "react";
import api from "../services/api";
import "../styles/Login.css";

function AddUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("USER");

    const handleSubmit = async () => {

        try {

            const token =
            localStorage.getItem("token");

            const response =
            await api.post(
                "/admin/add-user",
                {
                    name,
                    email,
                    password,
                    address,
                    role
                },
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

        }
       catch(error){

            alert(
                error.response?.data?.message
            );

        }

    };

    return (

        <div className="login-container">

            <h2>Add New User</h2>
            <p>Create a user account</p>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />

            <br /><br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
            />

            <br /><br />

            <select
                value={role}
                onChange={(e)=>setRole(e.target.value)}
            >
                <option value="USER">
                    USER
                </option>

                <option value="STORE_OWNER">
                    STORE_OWNER
                </option>
            </select>

            <br /><br />

            <button
                onClick={handleSubmit}
            >
                Add User
            </button>

        </div>

    );

}

export default AddUser;