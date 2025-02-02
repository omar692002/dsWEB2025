import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Navbar from '../components/Navbar';

const Home = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/api/articles')
            .then(response => setArticles(response.data))
            .catch(error => console.error('Error fetching articles:', error));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="grid p-4">
                {articles.map(article => (
                    <div key={article.id} className="col-12 md:col-4 lg:col-3">
                        <Card title={article.title} subTitle={`Price: ${article.price} TND`}>
                            <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
                            <Button label="View Details" icon="pi pi-search" className="mt-2" />
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;