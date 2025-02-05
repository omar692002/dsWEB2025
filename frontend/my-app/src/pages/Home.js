import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Navbar from '../components/Navbar';
import { Dialog } from 'primereact/dialog';
import './Home.css';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/DS/dsWEB2025/backend/controllers/articleController.php')
            .then(response => {
                setArticles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                setError('Failed to fetch articles.');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <Navbar />
            <div className="articles-container">
                {articles.length === 0 ? (
                    <div className="no-articles">No articles available.</div>
                ) : (
                    articles.map(article => (
                        <Card key={article.id} className="article-card">
                            <div className="article-header">
                                <Button icon="pi pi-heart" rounded text severity="help" aria-label="Favorite" />
                            </div>
                            <div className="article-image">
                                <img 
                                    src={article.image || 'path/to/placeholder-image.jpg'} 
                                    alt={article.titre} 
                                />
                            </div>
                            <div className="article-content">
                                <h3 className="article-title">{article.titre}</h3>
                                <p className="article-description">{article.description || 'No description available.'}</p>
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
                )}
            </div>

            {selectedArticle && (
                <Dialog 
                header={selectedArticle.titre} 
                visible={!!selectedArticle} 
                style={{ width: '50vw' }} 
                onHide={() => setSelectedArticle(null)}
            >
                <div className="dialog-content">
                    {/* Left: Image Section */}
                    <div className="dialog-image-container">
                        <img 
                            src={selectedArticle.image || 'path/to/placeholder-image.jpg'} 
                            alt={selectedArticle.titre} 
                            className="dialog-image"
                        />
                    </div>
            
                    {/* Right: Product Details */}
                    <div className="dialog-details">
                        <h2>{selectedArticle.titre}</h2>
                        <p><strong>Description:</strong> {selectedArticle.description || 'No description available.'}</p>
                        <p><strong>Price:</strong> {selectedArticle.prix ? `${selectedArticle.prix} TND` : 'N/A'}</p>
                        <p><strong>Category:</strong> {selectedArticle.category || 'Uncategorized'}</p>
                    </div>
                </div>
            </Dialog>
            
            )}
        </div>
    );
};

export default Home;
