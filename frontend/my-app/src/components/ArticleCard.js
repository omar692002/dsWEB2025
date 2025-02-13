import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { useState } from "react";
import axios from "axios";
import DisplayCardsByCategorie from './DisplayCardByCategorie'; 

const Articles = ({ filteredArticles, setSelectedArticle, selectedFilter, categories }) => {
    const groupedArticles = filteredArticles.reduce((acc, article) => {
        const categoryName = categories.find(cat => cat.id === article.categorie_id)?.nom || "nonCategorizé";
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(article);
        return acc;
    }, {});

    const [visible, setVisible] = useState(false);
    const [articleIdToFavorite, setArticleIdToFavorite] = useState(null); 
    const [loggedIn, isLoggedIn] = useState(false);

    const ajoutAuFavoris = (articleId) => {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/controllers/favorisController.php", { articleId })
            .then(response => {
                console.log("Article ajouté aux favoris", response.data);
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
                <DisplayCardsByCategorie 
                    groupedArticles={groupedArticles} 
                    setSelectedArticle={setSelectedArticle}
                />
            ) : (
                filteredArticles.length === 0 ? (
                    <div className="no-articles">No articles available.</div>
                ) : (
                    filteredArticles.map(article => (
                        <Card key={article.id} className="article-card">
                             {loggedIn && 
                            <div className="article-header">
                                <Button 
                                    icon="pi pi-heart" 
                                    rounded 
                                    text 
                                    severity="help" 
                                    aria-label="Favorite" 
                                    onClick={() => {
                                        setVisible(true); 
                                        setArticleIdToFavorite(article.id); 
                                    }} 
                                />
                            </div>
                                }
                            <div className="article-image">
                                <img 
                                    src={article.image || "path/to/placeholder-image.jpg"} 
                                    alt={article.titre} 
                                />
                            </div>
                            <div className="article-content">
                                <h3 className="article-title">{article.titre}</h3>
                                <p className="article-description">{article.description || "No description available."}</p>
                                <p>{article.prix} TND</p>
                            </div>
                            <div className="article-footer">
                                <Button 
                                    label="View details" 
                                    icon="pi pi-search" 
                                    className="p-button-sm article-button" 
                                    onClick={() => setSelectedArticle(article)}
                                />
                            </div>
                        </Card>
                    ))
                )
            )}

            <Dialog 
                header="Ajout au favoris" 
                visible={visible} 
                style={{ width: '50vw' }} 
                onHide={() => setVisible(false)}
            >
                <div style={{ flexDirection: "column", justifyContent: "start" }}>
                    <p className="m-0">
                        Vous voulez vraiment ajouter cet article aux favoris ?
                    </p>
                   
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <Button 
                            severity="success" 
                            onClick={() => ajoutAuFavoris(articleIdToFavorite)} 
                        > 
                            Oui  
                        </Button>
                        <Button  
                            severity="danger" 
                            style={{ marginLeft: "5px" }}
                            onClick={() => setVisible(false)} 
                        >
                            Non
                        </Button>
                    </div>
                    
                </div>
            </Dialog>
        </div>
    );
};

export default Articles;
