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

    

    return (
        <div>
          <div style={{ display: "flex", justifyContent: "end", marginTop: "10px", marginRight: "10px" }}>
                <IconField iconPosition="left" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <InputIcon className="pi pi-search" />
                    <InputText placeholder="Search" onChange={handleSearchQuery} />
                    <Filters selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
                </IconField>
            </div>

            <Articles  groupedByCategoryAndSubCategory={groupedByCategoryAndSubCategory} groupedByCategory={groupedByCategory} articlesWithoutFilter={articlesWithoutFilter} setSelectedArticle={setSelectedArticle} selectedFilter={selectedFilter}></Articles>
            {selectedArticle && (
                <ArticleDetails header={selectedArticle.titre} visible={!!selectedArticle} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle}>
                    </ArticleDetails>
            )}
        
        </div>
    );
};

export default Home;
