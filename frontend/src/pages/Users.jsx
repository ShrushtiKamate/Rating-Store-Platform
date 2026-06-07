import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";

function Users() {

    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const token =
            localStorage.getItem("token");

            const response =
            await api.get(
                `/admin/users?name=${name}&email=${email}`,
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            setUsers(response.data);

        }
        catch(error){

            console.log(error);

        }

    };

    return (

        <div className="dashboard-container">

            <div className="dashboard-header">

                <h1 className="dashboard-title">
                    Users
                </h1>

            </div>            
            <input
                type="text"
                placeholder="Search By Name"
                value={name}
                onChange={(e)=>
                    setName(e.target.value)
                }
            />

            <br /><br />
            <div className="card">

                <h3>Search Users</h3>

                <input
                    type="text"
                    placeholder="Search By Name"
                    value={name}
                    onChange={(e)=>
                        setName(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Search By Email"
                    value={email}
                    onChange={(e)=>
                        setEmail(e.target.value)
                    }
                />

                <br /><br />

                <button onClick={fetchUsers}>
                    Search
                </button>

            </div>

            <br />
            {
                users.map((user) => (

                    <div key={user.id} className="store-card">

                        <h3>{user.name}</h3>

                    <p>
                        <strong>Email:</strong>
                        {" "}
                        {user.email}
                    </p>

                    <p>
                        <strong>Role:</strong>
                        {" "}
                        {user.role}
                    </p>
                        <hr />

                    </div>

                ))
            }

        </div>

    );

}

export default Users;