
export const ArticlesParSousCategorie = ({ articlesParCategorie, setSelectedArticle }) => {
    return (
        <div className="category-container">
            {Object.entries(articlesParCategorie).map(([sousCategorie, articles]) => (
                <div key={sousCategorie} className="category-section">
                    <h2 className="category-title">{sousCategorie}</h2>
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
    );
};