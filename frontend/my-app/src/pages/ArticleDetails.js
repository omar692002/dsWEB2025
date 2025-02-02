import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Navbar from '../components/Navbar';

const ArticleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost/api/articles/${id}`)
            .then(response => setArticle(response.data))
            .catch(error => console.error('Error fetching article details:', error));
    }, [id]);

    if (!article) return <p>Loading...</p>;

    return (
        <div>
            <Navbar />
            <div className="p-4 flex justify-content-center">
                <Card title={article.title} subTitle={`Price: ${article.price} TND`} className="w-6">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-60 object-cover" />
                    <p>{article.description}</p>
                    <div className="flex justify-content-between mt-4">
                        <Button label="Back" icon="pi pi-arrow-left" className="p-button-secondary" onClick={() => navigate('/')} />
                        <Button label="Add to Favorites" icon="pi pi-heart" className="p-button-danger" />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ArticleDetails;