import { useState } from "react";
import api from "../services/api";

function AddStore() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [ownerId, setOwnerId] = useState("");

    const handleSubmit = async () => {

        try {

            const token =
            localStorage.getItem("token");

            const response =
            await api.post(
                "/admin/add-store",
                {
                    name,
                    email,
                    address,
                    owner_id: ownerId
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

            console.log(error);

        }

    };

    return (

        <div>

            <h1>Add Store</h1>

            <input
                type="text"
                placeholder="Store Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />

            <br /><br />

            <input
                type="email"
                placeholder="Store Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Owner ID"
                value={ownerId}
                onChange={(e)=>setOwnerId(e.target.value)}
            />

            <br /><br />

            <button onClick={handleSubmit}>
                Add Store
            </button>

        </div>

    );

}

export default AddStore;