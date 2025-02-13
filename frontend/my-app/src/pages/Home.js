import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ArticleDetails from "../components/ArticleDetails";
import Filters from "../components/Filters"; 
import "./Home.css";
import Articles from "../components/ArticleCard";

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [categories,setCategories]=useState(null);
    const [searchQuery, setSearchQuery] = useState("");
            useEffect(()=>{
                axios.get(process.env.REACT_APP_BACKEND_URL+"/controllers/categorieController.php")
                .then(response=>{
                    setCategories(response.data)
                    console.log(response.data);
                    
                }).catch(error=>{  
                    console.error("Error fetching categories:", error);
                    setError("Failed to fetch categories.");
                    setLoading(false);})
           
        }, []);
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+"/controllers/articleController.php")
            .then(response => {
                setArticles(response.data);
                setFilteredArticles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching articles:", error);
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

        setFilteredArticles(updatedArticles);
    }, [selectedFilter, articles,searchQuery]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <Navbar setSearchQuery={setSearchQuery} />
            <Filters selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
            <Articles filteredArticles={filteredArticles} setSelectedArticle={setSelectedArticle} selectedFilter={selectedFilter} categories={categories}></Articles>
            {selectedArticle && (
                <ArticleDetails header={selectedArticle.titre} visible={!!selectedArticle} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle}>
                    </ArticleDetails>
            )}
        </div>
    );
};

export default Home;
