import React from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const ArticleCard = ({ article, loggedIn, isFavorite, onFavoriteClick, setSelectedArticle }) => {
    return (
        <div className="card">
            {loggedIn !== null && (
                <div className="favorite-btn">
                    <button
                        onClick={onFavoriteClick}
                        className="p-button p-button-text p-button-rounded heart-icon"
                    >
                        <i className={isFavorite ? "pi pi-heart-fill" : "pi pi-heart"} />
                    </button>
                </div>
            )}
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
                <button className="details-btn" onClick={() => setSelectedArticle(article)}>
                    Voir détails 🔍
                </button>
            </div>
        </div>
    );
};

export default ArticleCard;