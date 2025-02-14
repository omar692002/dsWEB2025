import React from 'react';
import './articlesByCategoryAndSubCategory.css'

const GroupedByCategory = ({ groupedByCategory }) => {
    console.log(groupedByCategory); // Vérifier les données en console

    return (
        <div className="container">
            {Object.entries(groupedByCategory).map(([category, perfumes]) => (
                <div key={category} className="category-section">
                    <h2>{category}</h2>
                    <div className="cards-container">
                        {perfumes.map((perfume) => (
                            <div key={perfume.id} className="card">
                                <div className="card-header">
                                    <img 
                                        src={perfume.image || 'https://via.placeholder.com/150'} 
                                        alt={perfume.titre} 
                                        className="card-image"
                                    />
                                </div>
                                <div className="card-body">
                                    <h3>{perfume.titre}</h3>
                                    <p className="description">{perfume.description}</p>
                                    <p className="price">{perfume.prix}€</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GroupedByCategory;
