import React, { useState, useRef } from "react";
import axios from "axios";
import GroupedByCategoryAndSubCategory from "./articlesByCategoryAndSubCategory";
import GroupedByCategory from "./articlesByCategoryOnly";
import ArticleCard from "./ArticleCard";
import FavoriteDialog from "./Favoris";
import { Toast } from "primereact/toast";
import './ArticleCard.css';
import DeleteFavoriteDialog from "./DeleteFavoriteDialog";
import { useAuth } from '../routes/useAuth'; 

const Articles = ({
    role,
    groupedByCategoryAndSubCategory,
    groupedByCategory,
    articlesWithoutFilter,
    setSelectedArticle,
    selectedFilter,
    favorites,
    setFavorites,
}) => {
    const [visibleAddDialog, setVisibleAddDialog] = useState(false);
    const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
    const [articleIdToFavorite, setArticleIdToFavorite] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const toast = useRef(null);
    const { user } = useAuth(); 
    console.log("fav",favorites)
    const isFavorite = (articleId) => {
        return favorites.some(favorite => favorite.id === articleId);
    };

    const ajoutAuFavoris = (articleId) => {
        setIsLoading(true);
        axios.post(process.env.REACT_APP_BACKEND_URL + "/controllers/favorisController.php", 
            { 
                article_id: articleId,
                user_id: user.id
            })
            .then(() => {
                const articleToAdd = articlesWithoutFilter.find(article => article.id === articleId);
                if (articleToAdd) {
                    setFavorites([...favorites, articleToAdd]);
                }
                setVisibleAddDialog(false);
                setArticleIdToFavorite(null);
                toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Article ajouté aux favoris', life: 3000 });
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout aux favoris", error);
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: "Échec de l'ajout aux favoris", life: 3000 });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const supprimerDesFavoris = (articleId) => {
        setIsLoading(true);
        axios.delete(process.env.REACT_APP_BACKEND_URL + "/controllers/favorisController.php", {
            data: {
                article_id: articleId,
                user_id: user.id
            }
        })
        .then(() => {
            setFavorites(favorites.filter(favorite => favorite.id !== articleId));
            setVisibleDeleteDialog(false);
            toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Article supprimé des favoris', life: 3000 });
        })
        .catch(error => {
            console.error("Erreur lors de la suppression des favoris", error);
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: "Échec de la suppression des favoris", life: 3000 });
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    // Fonction pour gérer le clic sur le bouton favori
    const handleFavoriteClick = (articleId) => {
        if (isFavorite(articleId)) {
            // Si l'article est déjà favori, afficher la boîte de dialogue de suppression
            setArticleIdToFavorite(articleId);
            setVisibleDeleteDialog(true);
        } else {
            // Si l'article n'est pas favori, afficher la boîte de dialogue pour l'ajouter
            setArticleIdToFavorite(articleId);
            setVisibleAddDialog(true);
        }
    };

    return (
        <div className="articles-container">
            <Toast ref={toast} />
            {selectedFilter === "category" ? (
                <GroupedByCategory groupedByCategory={groupedByCategory} />
            ) : selectedFilter === "sousCategory" ? (
                <GroupedByCategoryAndSubCategory groupedByCategoryAndSubCategory={groupedByCategoryAndSubCategory} />
            ) : (
                articlesWithoutFilter.length === 0 ? (
                    <div className="no-articles">No articles available.</div>
                ) : (
                    <div className="container">
                        <h1 style={{ color: "red", display: "flex", justifyContent: "center" }}>Nos Articles</h1>
                        <div className="cards-container">
                            {articlesWithoutFilter.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    loggedIn={user.id}
                                    isFavorite={isFavorite(article.id)}
                                    onFavoriteClick={() => handleFavoriteClick(article.id)}
                                    setSelectedArticle={setSelectedArticle}
                                    role={role}
                                />
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* Boîte de dialogue pour ajouter aux favoris */}
            <FavoriteDialog
                visible={visibleAddDialog}
                onHide={() => setVisibleAddDialog(false)}
                loading={loading}
                onConfirm={() => ajoutAuFavoris(articleIdToFavorite)}
            />

            {/* Boîte de dialogue pour supprimer des favoris */}
            <DeleteFavoriteDialog
                visible={visibleDeleteDialog}
                onHide={() => setVisibleDeleteDialog(false)}
                loading={loading}
                onConfirm={() => supprimerDesFavoris(articleIdToFavorite)}
            />
        </div>
    );
};

export default Articles;