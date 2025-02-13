export const ArticlesParCategorie = ({ articlesParCategorieEtSousCategorie, setSelectedArticle }) => {
    return (
        <div className="category-container">
            {Object.entries(articlesParCategorieEtSousCategorie).map(([categorie, sousCategories]) => (
                <div key={categorie} className="category-section">
                    <h2 className="category-title">{categorie}</h2>
                    {Object.entries(sousCategories).map(([sousCategorie, articles]) => (
                        <div key={sousCategorie}>
                            <h3 className="subcategory-title">{sousCategorie}</h3>
                            <div className="category-articles">
                                {articles.map(article => (
                                    <div key={article.id} className="article-card" onClick={() => setSelectedArticle(article)}>
                                        <div className="article-image">
                                            <img src={`/images/${article.id}.jpg`} alt={article.titre} />
                                        </div>
                                        <div className="article-content">
                                            <h4>{article.titre}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};