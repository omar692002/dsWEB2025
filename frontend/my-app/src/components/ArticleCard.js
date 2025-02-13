import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { useState,useEffect } from "react";
import axios from "axios";
import { ArticlesParCategorie } from "./ArticlesParCategorie ";
import { ArticlesParSousCategorie } from "./ArticlesParSousCategorie";

const Articles = ({ articlesWithoutFilter, setSelectedArticle, selectedFilter, categories, sousCategories }) => {

    const [visible, setVisible] = useState(false);
    const [articleIdToFavorite, setArticleIdToFavorite] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    // Regroupement par catégorie
    const groupedByCategory = categories?.reduce((acc, category) => {
        
        const articlesInCategory = articlesWithoutFilter.filter(article =>
            sousCategories?.some(sc => sc.id === article.sous_categorie_id && sc.categorie_id == category.id)
        );

        acc[category.nom] = articlesInCategory;
        return acc;
    }, {});

    // Regroupement par catégorie et sous-catégorie
    const groupedByCategoryAndSubCategory = categories?.reduce((acc, category) => {
        acc[category.nom] = sousCategories
            .filter(sc => sc.categorie_id == category.id)
            .reduce((subAcc, subCategory) => {
                subAcc[subCategory.nom] = articlesWithoutFilter.filter(article => article.sous_categorie_id === subCategory.id);
                return subAcc;
            }, {});
        return acc;
    }, {});

    const ajoutAuFavoris = (articleId) => {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/controllers/favorisController.php", { articleId })
            .then(response => {
                console.log("Article ajouté aux favoris", response.data);
                setVisible(false);
                setArticleIdToFavorite(null);
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout aux favoris", error);
            });
    };

    const GroupedByCategory = ({ groupedByCategory }) => {
        return (
            <div className="p-5">
                <h2 className="text-2xl font-bold mb-4">Parfums par Catégorie</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(groupedByCategory).map(([categoryName, items]) => (
                        <div key={categoryName} className="p-4 border rounded shadow">
                            <h3 className="text-xl font-semibold mb-3">{categoryName}</h3>
                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <div key={index} className="border-b pb-2">
                                        {/* Vous pouvez personnaliser l'affichage de chaque élément ici */}
                                        <p>{item.name}</p> {/* Exemple d'affichage d'une propriété 'name' de chaque objet */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    
    


    // Composant affichant les parfums par catégorie et sous-catégorie
    const GroupedByCategoryAndSubCategory = () => (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Parfums par Catégorie et Sous-Catégorie</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(groupedByCategoryAndSubCategory).map(([category, subCategories]) => (
                    <div key={category} className="border p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">{category}</h3>
                        {Object.entries(subCategories).map(([subCategory, articles]) => (
                            <div key={subCategory} className="mt-3">
                                <h4 className="text-lg font-medium">{subCategory}</h4>
                                {articles.length > 0 ? (
                                    <ul className="space-y-2">
                                        {articles.map(article => (
                                            <li key={article.id} className="p-2 border-b">
                                                {article.titre} - {article.prix}€
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">Aucun parfum disponible.</p>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="articles-container">
            {selectedFilter === "category" ? (
                <GroupedByCategory groupedByCategory={groupedByCategory}/>
            ) : selectedFilter === "sousCategory" ? (
                <GroupedByCategoryAndSubCategory />
            ) : (
                articlesWithoutFilter.length === 0 ? (
                    <div className="no-articles">No articles available.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articlesWithoutFilter.map(article => (
                            <Card key={article.id} className="article-card border p-4 rounded-lg shadow-md">
                                {loggedIn && (
                                    <div className="flex justify-end">
                                        <Button
                                            icon="pi pi-heart"
                                            rounded
                                            text
                                            severity="help"
                                            aria-label="Favorite"
                                            onClick={() => {
                                                setVisible(true);
                                                setArticleIdToFavorite(article.id);
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="article-image flex justify-center">
                                    <img
                                        src={article.image || "/images/default-parfum.jpg"}
                                        alt={article.titre}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                </div>
                                <div className="article-content text-center mt-3">
                                    <h3 className="text-lg font-semibold">{article.titre}</h3>
                                    <p className="text-gray-500">{article.description || "No description available."}</p>
                                    <p className="font-bold">{article.prix} TND</p>
                                </div>
                                <div className="flex justify-center mt-3">
                                    <Button
                                        label="Voir détails"
                                        icon="pi pi-search"
                                        className="p-button-sm article-button"
                                        onClick={() => setSelectedArticle(article)}
                                    />
                                </div>
                            </Card>
                        ))}
                    </div>
                )
            )}

            <Dialog
                header="Ajout au favoris"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                <div className="flex flex-col">
                    <p className="m-0">Voulez-vous vraiment ajouter cet article aux favoris ?</p>
                    <div className="flex justify-end mt-4">
                        <Button severity="success" onClick={() => ajoutAuFavoris(articleIdToFavorite)}>Oui</Button>
                        <Button severity="danger" className="ml-2" onClick={() => setVisible(false)}>Non</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default Articles;
