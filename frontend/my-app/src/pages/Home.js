import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleDetails from "../components/ArticleDetails";
import Filters from "../components/Filters"; 
import "./Home.css";
import Articles from "../components/ArticleCard";
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [articlesWithoutFilter, setArticlesWithoutFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [categories,setCategories]=useState(null);
    const [sousCategories,setSousCategories]=useState(null);

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(()=>{
                axios.get(process.env.REACT_APP_BACKEND_URL+"/controllers/categorieController.php")
                .then(response=>{
                    setCategories(response.data)
                    
                }).catch(error=>{  
                    setError("Failed to fetch categories.");
                    setLoading(false);})
           
        }, []);
        useEffect(()=>{
            axios.get(process.env.REACT_APP_BACKEND_URL+"/controllers/sousCategorieController.php")
            .then(response=>{
                setSousCategories(response.data)
                
            }).catch(error=>{  
                setError("Failed to fetch sous categories.");
                setLoading(false);})
       
    }, []);
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+"/controllers/articleController.php")
            .then(response => {
                setArticles(response.data);
                setArticlesWithoutFilter(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to fetch articles.");
                setLoading(false);
            });
    }, []);
    
    useEffect(() => {
        let updatedArticles = [...articles];  
        if (searchQuery) {
            updatedArticles = updatedArticles.filter(article =>
                article.titre.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (selectedFilter === "price") {
            updatedArticles.sort((a, b) => a.prix - b.prix);
        } else if (selectedFilter === "date") {
            updatedArticles.sort((a, b) => new Date(b.date_ajout
            ) - new Date(a.date_ajout
            ));
        } else if (selectedFilter === "category") {
            updatedArticles = articles.filter(article => article.categorie_id
            );            
        } 

        setArticlesWithoutFilter(updatedArticles);
    }, [selectedFilter, articles,searchQuery]);


    const handleSearchQuery=(e)=>{
        setSearchQuery(e.target.value)

    }
    const groupedByCategory = {};

    // Parcours des catégories
    for (const category of categories || []) {
        // Initialisation du tableau pour chaque catégorie
        groupedByCategory[category.nom] = [];
    
        // Parcours des articles
        for (const article of articlesWithoutFilter) {
            // Vérification de chaque sous-catégorie pour l'article
            for (const sc of sousCategories || []) {
                // Vérification que la sous-catégorie de l'article correspond à celle de la catégorie
                if (sc.id == article.sous_categorie_id && sc.categorie_id == category.id) {
                    // Ajouter l'article à la catégorie correspondante
                    groupedByCategory[category.nom].push(article);
                    break;  // Sortir de la boucle des sous-catégories une fois l'article trouvé
                }
            }
        }
    }
    
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

    return (
        <div>
          <div style={{ display: "flex", justifyContent: "end", marginTop: "10px", marginRight: "10px" }}>
                <IconField iconPosition="left" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <InputIcon className="pi pi-search" />
                    <InputText placeholder="Search" onChange={handleSearchQuery} />
                    <Filters selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
                </IconField>
            </div>

            <Articles  groupedByCategoryAndSubCategory={groupedByCategoryAndSubCategory} groupedByCategory={groupedByCategory} articlesWithoutFilter={articlesWithoutFilter} setSelectedArticle={setSelectedArticle} selectedFilter={selectedFilter} categories={categories} sousCategories={sousCategories}></Articles>
            {selectedArticle && (
                <ArticleDetails header={selectedArticle.titre} visible={!!selectedArticle} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle}>
                    </ArticleDetails>
            )}
        
        </div>
    );
};

export default Home;
