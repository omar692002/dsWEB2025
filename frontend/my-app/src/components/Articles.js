import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { useState,useEffect } from "react";
import axios from "axios";
import GroupedByCategoryAndSubCategory from "./articlesByCategoryAndSubCategory";
import GroupedByCategory from "./articlesByCategoryOnly";
import AdminTools from "./adminTools";

import './ArticleCard.css';

const Articles = ({ role,groupedByCategoryAndSubCategory, groupedByCategory,articlesWithoutFilter, setSelectedArticle, selectedFilter }) => {
    
    const [visible, setVisible] = useState(false);
    const [articleIdToFavorite, setArticleIdToFavorite] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    

    const ajoutAuFavoris = (articleId) => {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/controllers/favorisController.php", { articleId })
            .then(response => {
                setVisible(false);
                setArticleIdToFavorite(null);
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout aux favoris", error);
            });
    };

  
    
    return (
        <div className="articles-container">
            {selectedFilter === "category" ? (
                <GroupedByCategory groupedByCategory = {groupedByCategory} />
            ) : selectedFilter === "sousCategory" ? (
                <GroupedByCategoryAndSubCategory groupedByCategoryAndSubCategory={groupedByCategoryAndSubCategory} />
            ) : (
                articlesWithoutFilter.length === 0 ? (
                    <div className="no-articles">No articles available.</div>
                ) : (
                   
                    <div className="container">
                    <h1 style={{color :"red" , display:"flex", justifyContent:"center"}}>Nos Articles</h1>
                    <div className="cards-container">
                        {articlesWithoutFilter.map((article) => (
                            <div key={article.id} className="card">
                                {loggedIn && role!="admin" && (
                                    <div className="favorite-btn">
                                        <button 
                                            onClick={() => {
                                                setVisible(true);
                                                setArticleIdToFavorite(article.id);
                                            }}
                                        >
                                            ❤️
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
                        ))}
                    </div>
                </div>
                )
            )}

            <Dialog
                header="Ajout au favoris"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                <div className="flex flex-col">
                    <p className="m-0">Voulez-vous vraiment ajouter cet article aux favoris ?</p>
                    <div className="flex justify-end mt-4">
                        <Button severity="success" onClick={() => ajoutAuFavoris(articleIdToFavorite)}>Oui</Button>
                        <Button severity="danger" className="ml-2" onClick={() => setVisible(false)}>Non</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default Articles;
