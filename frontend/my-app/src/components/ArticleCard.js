import React from "react";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { useState,useEffect } from "react";
import axios from "axios";
import GroupedByCategoryAndSubCategory from "./articlesByCategoryAndSubCategory";
import GroupedByCategory from "./articlesByCategoryOnly";
import './ArticleCard.css';
import AdminTools from "./adminTools";


const ArticleCard = ({ role, article,loggedIn,isFavorite,onFavoriteClick,setSelectedArticle }) => {

    console.log(isFavorite
    );
    
    return (
        <div className="card">
                                {loggedIn && role!="admin" && (
                <div className="favorite-btn">
                    <button
                        onClick={onFavoriteClick}
                        className="p-button p-button-text p-button-rounded heart-icon"
                    >
                        <i className={isFavorite ? "pi pi-heart-fill" : "pi pi-heart"} />
                    </button>
                </div>
            )}
              {role === "admin" && (
                                        <AdminTools article={article}></AdminTools>
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