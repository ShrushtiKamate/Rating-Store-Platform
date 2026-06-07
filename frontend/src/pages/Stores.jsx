import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Dashboard.css";

function Stores() {

    const [stores, setStores] = useState([]);
    const [ratings, setRatings] = useState({});
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        fetchStores();

    }, []);

    const fetchStores = async () => {

        try {

            const token =
            localStorage.getItem("token");

            const response =
            await api.get(
                `/stores?name=${name}&address=${address}`,
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            setStores(response.data);

        }
        catch(error){

            console.log(error);

        }

    };

    const handleRatingChange =
    (storeId,value)=>{

        setRatings({
            ...ratings,
            [storeId]: value
        });

    };

    const submitRating = async (
        storeId
    ) => {

        try{

            const token =
            localStorage.getItem(
                "token"
            );

            const response =
            await api.post(
                "/ratings/submit",
                {
                    store_id: storeId,
                    rating:
                    ratings[storeId]
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

    const updateRating = async (
        storeId
    ) => {

        try{

            const token =
            localStorage.getItem(
                "token"
            );

            const response =
            await api.put(
                "/ratings/update",
                {
                    store_id: storeId,
                    rating:
                    ratings[storeId]
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

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");

    };

    return (

        <div className="dashboard-container">

            <div className="dashboard-header">

                <h1 className="dashboard-title">
                    Stores
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

            <div className="card">

                <h3>Search Stores</h3>

                <input
                    type="text"
                    placeholder="Search Store Name"
                    value={name}
                    onChange={(e)=>
                        setName(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Search Address"
                    value={address}
                    onChange={(e)=>
                        setAddress(e.target.value)
                    }
                />

                <br /><br />

                <button onClick={fetchStores}>
                    Search
                </button>

            </div>

            <br />

            {
                stores.map((store)=>(

                    <div
                        key={store.id}
                        className="store-card"
                    >

                        <h3>{store.name}</h3>

                        <p>{store.email}</p>

                        <p>{store.address}</p>

                        <input
                            type="number"
                            min="1"
                            max="5"
                            placeholder="Rating"
                            value={
                                ratings[store.id] || ""
                            }
                            onChange={(e)=>
                                handleRatingChange(
                                    store.id,
                                    e.target.value
                                )
                            }
                        />

                        <div className="store-actions">

                            <button
                                onClick={()=>
                                    submitRating(
                                        store.id
                                    )
                                }
                            >
                                Submit Rating
                            </button>

                            <button
                                onClick={()=>
                                    updateRating(
                                        store.id
                                    )
                                }
                            >
                                Update Rating
                            </button>

                        </div>

                    </div>

                ))
            }

        </div>

    );

}

export default Stores;