import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                            </div>
                            <div className="article-footer">
                                <Button label="Voir détails" icon="pi pi-search" className="p-button-sm article-button" />
                                
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
