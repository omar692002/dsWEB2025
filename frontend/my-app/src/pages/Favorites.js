import React, { useEffect, useState } from 'react';
import axios from "axios";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    // const {login,user}=useAuth();
    // const idUser = user.id;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/controllers/favorisController.php`, {
            params: {
                user: 1
            }
        })
        .then(response => {
            setFavorites(response.data);
        })
        .catch(error => {
            console.error("Error fetching favorites:", error);
        });
    }, []);  

   

    return (
        <div>
            {favorites.length === 0 ? (
                <p>No favorites yet.</p>
            ) : (
                <div className="container">
                    <h1 style={{ color: "red", display: "flex", justifyContent: "center" }}>Nos Articles</h1>
                    <div className="cards-container">
                        {favorites.map((article) => (
                            <div key={article.id} className="card">
                                <div className="favorite-btn">


                                <button className="p-button p-button-text p-button-rounded heart-icon">
                                <i className={"pi pi-heart-fill"} />
                                </button>  
                                </div>
                                <div className="card-header">
                                    <img 
                                        src={article.image || "/images/default-parfum.jpg"} 
                                        alt={article.titre} 
                                        className="card-image"
                                    />
                                </div>
                                <div className="card-body">
                                    <h3>{article.titre}</h3>
                                    <p className="description">{article.description || "No description available."}</p>
                                    <p className="price">{article.prix} TND</p>
                                    {/* <button className="details-btn" onClick={() => setSelectedArticle(article)}>
                                        Voir détails 🔍
                                    </button> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Favorites;
