import React from 'react';
import './articlesByCategoryAndSubCategory.css'
const GroupedByCategoryAndSubCategory = ({ groupedByCategoryAndSubCategory }) => {
    return (
        <div className="container">
            {Object.entries(groupedByCategoryAndSubCategory).map(([category, subCategories]) => (
                <div key={category} className="category-section">
               <h1 style={{display:"flex",justifyContent:"center" , color:"red"}}>{category}</h1>

                    {Object.entries(subCategories).map(([subCategory, articles]) => (
                        <div key={subCategory} className="subcategory-section">
                            <h4>{subCategory}</h4>
                            <div className="cards-container">
                                {articles.length > 0 ? (
                                    articles.map((article) => (
                                        <div className="card" key={article.id}>
                                            <div className="card-header">
                                                <img 
                                                    src={article.image || 'https://via.placeholder.com/150'} 
                                                    alt={article.titre} 
                                                    className="card-image"
                                                />
                                            </div>
                                            <div className="card-body">
                                                <h5>{article.titre}</h5>
                                                <p className="price">{article.prix}€</p>
                                                <p className="description">{article.description}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Aucun parfum disponible.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GroupedByCategoryAndSubCategory;
