import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Navbar from '../components/Navbar';

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="grid p-4">
                {articles.length === 0 ? (
                    <div>No articles available.</div>
                ) : (
                    articles.map(article => (
                        <div key={article.id} className="col-12 md:col-4 lg:col-3">
                            <Card title={article.title} subTitle={`Price: ${article.price} TND`}>
                                <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
                                <Button label="View Details" icon="pi pi-search" className="mt-2" />
                            </Card>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
