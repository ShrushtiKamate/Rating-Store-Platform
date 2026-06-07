import { useState } from "react";
import api from "../services/api";
import "../styles/Login.css";

function ChangePassword() {

    const [oldPassword, setOldPassword] =
    useState("");

    const [newPassword, setNewPassword] =
    useState("");

    const handleChangePassword =
    async () => {

        try{

            const token =
            localStorage.getItem("token");

            const response =
            await api.put(
                "/api/auth/change-password",
                {
                    oldPassword,
                    newPassword
                },
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            alert(
                response.data.message
            );

        }
        catch(error){

            console.log(error);

        }

    };

    return (

        <div className="login-container">

            <h2>Update Password</h2>

            <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e)=>
                    setOldPassword(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e)=>
                    setNewPassword(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <button
                onClick={
                    handleChangePassword
                }
            >
                Update Password
            </button>

        </div>

    );

}

export default ChangePassword;