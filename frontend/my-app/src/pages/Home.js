import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleDetails from "../components/ArticleDetails";
import Filters from "../components/Filters"; 
import "./Home.css";
import Articles from "../components/Article";
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';
import { useAuth } from '../routes/useAuth'; 

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [articlesWithoutFilter, setArticlesWithoutFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [categories,setCategories]=useState(null);
    const [sousCategories,setSousCategories]=useState(null);
    const { login,user } = useAuth(); 

    const [searchQuery, setSearchQuery] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, sousCategoriesRes, articlesRes] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/controllers/categorieController.php`),
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/controllers/sousCategorieController.php`),
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/controllers/articleController.php`)
                ]);
                setCategories(categoriesRes.data);
                setSousCategories(sousCategoriesRes.data);
                setArticles(articlesRes.data);
                setArticlesWithoutFilter(articlesRes.data);
            } catch (error) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);
    const [favorites, setFavorites] = useState([]);
   

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/controllers/favorisController.php`, {
            params: {
                user: user.id
            }
        })
        .then(response => {
            setFavorites(response.data);
        })
        .catch(error => {
            console.error("Error fetching favorites:", error);
        });
    }, []);  

    
   


    const handleSearchQuery=(e)=>{
        setSearchQuery(e.target.value)

    }
    
    
    const groupedByCategory = (categories || []).reduce((acc, category) => {
        acc[category.nom] = articlesWithoutFilter.filter(article => 
            (sousCategories || []).some(sc => sc.id == article.sous_categorie_id && sc.categorie_id == category.id)
        );
        return acc;
    }, {});
    
    
    const groupedByCategoryAndSubCategory = categories?.reduce((acc, category) => {
        acc[category.nom] = sousCategories
            .filter(sc => sc.categorie_id == category.id)
            .reduce((subAcc, subCategory) => {
                subAcc[subCategory.nom] = articlesWithoutFilter.filter(article => article.sous_categorie_id === subCategory.id);
                return subAcc;
            }, {});
        return acc;
    }, {});

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
        }
        setArticlesWithoutFilter(updatedArticles);
    }, [selectedFilter, articles,searchQuery]);

    return (
        <div>
          <div style={{ display: "flex", justifyContent: "end", marginTop: "10px", marginRight: "10px" }}>
                <IconField iconPosition="left" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <InputIcon className="pi pi-search" />
                    <InputText placeholder="Search" onChange={handleSearchQuery} />
                    <Filters selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
                </IconField>
            </div>

            <Articles role={user?.role}  groupedByCategoryAndSubCategory={groupedByCategoryAndSubCategory} groupedByCategory={groupedByCategory} articlesWithoutFilter={articlesWithoutFilter} setSelectedArticle={setSelectedArticle} selectedFilter={selectedFilter} favorites={favorites} setFavorites={setFavorites}></Articles>
            {selectedArticle && (
                <ArticleDetails header={selectedArticle.titre} visible={!!selectedArticle} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle}>
                    </ArticleDetails>
            )}
        
        </div>
    );
};

export default Home;
