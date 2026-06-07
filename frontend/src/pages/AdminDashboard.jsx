import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Dashboard.css";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/admin/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDashboard(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");

    };

    return (

        <div className="dashboard-container">

            <div className="dashboard-header">

                <h1 className="dashboard-title">
                    Admin Dashboard
                </h1>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

            <div className="nav-buttons">

                <Link to="/users">
                    <button>View Users</button>
                </Link>

                <Link to="/add-user">
                    <button>Add User</button>
                </Link>

                <Link to="/add-store">
                    <button>Add Store</button>
                </Link>

                <Link to="/stores">
                    <button>View Stores</button>
                </Link>

                <Link to="/change-password">
                    <button>Change Password</button>
                </Link>

            </div>

            <br />

            {
                dashboard && (

                    <div className="card-container">

                        <div className="card">
                            <h3>Total Users</h3>
                            <p>{dashboard.totalUsers}</p>
                        </div>

                        <div className="card">
                            <h3>Total Stores</h3>
                            <p>{dashboard.totalStores}</p>
                        </div>

                        <div className="card">
                            <h3>Total Ratings</h3>
                            <p>{dashboard.totalRatings}</p>
                        </div>

                    </div>

                )
            }

        </div>

    );

}

export default AdminDashboard;