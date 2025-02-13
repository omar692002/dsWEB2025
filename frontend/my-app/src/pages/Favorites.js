import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    const removeFromFavorites = (id) => {
        setFavorites(favorites.filter(article => article.id !== id));
    };

    return (
        <div>
            <div className="grid p-4">
                {favorites.length === 0 ? (
                    <p>No favorites yet.</p>
                ) : (
                    favorites.map(article => (
                        <div key={article.id} className="col-12 md:col-4 lg:col-3">
                            <Card title={article.title} subTitle={`Price: ${article.price} TND`}>
                                <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
                                <div className="flex justify-content-between mt-2">
                                    <Button label="Remove" icon="pi pi-trash" className="p-button-danger" onClick={() => removeFromFavorites(article.id)} />
                                </div>
                            </Card>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Favorites;