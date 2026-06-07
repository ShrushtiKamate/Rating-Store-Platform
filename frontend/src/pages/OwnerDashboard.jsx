import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

function OwnerDashboard() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const token =
            localStorage.getItem("token");

            const response =
            await api.get(
                "/owner/dashboard",
                {
                    headers: {
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            setData(response.data);

        }
        catch(error){

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
                Owner Dashboard
            </h1>

            <button onClick={logout}>
                Logout
            </button>

        </div>

        <div className="nav-buttons">

            <Link to="/change-password">
                <button>
                    Change Password
                </button>
            </Link>

        </div>

        <br />

        {
            data.map((item,index)=>(

                <div
                    key={index}
                    className="store-card"
                >

                    <h3>
                        {item.storeName}
                    </h3>

                    <p>
                        <strong>
                            Average Rating:
                        </strong>{" "}
                        {Number(
                            item.averageRating
                        ).toFixed(1)}
                    </p>

                    <p>
                        <strong>
                            User:
                        </strong>{" "}
                        {item.userName}
                    </p>

                    <p>
                        <strong>
                            Rating:
                        </strong>{" "}
                        {item.rating}
                    </p>

                </div>

            ))
        }

    </div>

);

}

export default OwnerDashboard;