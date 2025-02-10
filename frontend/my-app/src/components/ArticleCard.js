import { Card } from "primereact/card";
import { Button } from "primereact/button";
import DisplayCardByCategorie from './DisplayCardByCategorie'; // Import the new component
const ArticleCard = ({ filteredArticles, setSelectedArticle, selectedFilter, categories }) => {
    const groupedArticles = filteredArticles.reduce((acc, article) => {
        const categoryName = categories.find(cat => cat.id === article.categorie_id)?.nom || "Uncategorized";
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(article);
        return acc;
    }, {});

    return (
        <div className="articles-container">
            {selectedFilter === "category" ? (
                <DisplayCardByCategorie 
                groupedArticles={groupedArticles} 
                setSelectedArticle={setSelectedArticle}
                />) : (
                filteredArticles.length === 0 ? (
                    <div className="no-articles">No articles available.</div>
                ) : (
                    filteredArticles.map(article => (
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
                    ))
                )
            )}
        </div>
    );
};

export default ArticleCard;
