// DisplayCardByCategorie.js
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import './DisplayCardByCategorie.css';

const DisplayCardsByCategorie = ({ groupedArticles, setSelectedArticle }) => {
    return (
        <div className="category-container">
            {Object.entries(groupedArticles).map(([category, articles]) => (
                <div key={category} className="category-section">
                    <h2 className="category-title">{category}</h2>
                    <div className="category-articles">
                        {articles.map(article => (
                            <Card key={article.id} className="article-card">
                                <div className="article-header">
                                    <Button icon="pi pi-heart" rounded text severity="help" aria-label="Favorite" />
                                </div>
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
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplayCardsByCategorie;
