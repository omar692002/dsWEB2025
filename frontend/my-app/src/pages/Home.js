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

    return (
        <div>
          <div style={{ display: "flex", justifyContent: "end", marginTop: "10px", marginRight: "10px" }}>
                <IconField iconPosition="left" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <InputIcon className="pi pi-search" />
                    <InputText placeholder="Search" onChange={handleSearchQuery} />
                    <Filters selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
                </IconField>
            </div>

            <Articles articlesWithoutFilter={articlesWithoutFilter} setSelectedArticle={setSelectedArticle} selectedFilter={selectedFilter} categories={categories} sousCategories={sousCategories}></Articles>
            {selectedArticle && (
                <ArticleDetails header={selectedArticle.titre} visible={!!selectedArticle} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle}>
                    </ArticleDetails>
            )}
        
        </div>
    );
};

export default Home;
