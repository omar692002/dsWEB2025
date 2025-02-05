import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ArticleDetails from "../components/ArticleDetails";
import ArticleCard from "../components/ArticleCard";
import Filters from "../components/Filters"; 
import "./Home.css";

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [categories, setCategories]=useState([
        { id: 1, nom: "Electronics" },
        { id: 2, nom: "Clothing" },
        { id: 3, nom: "Books" },
        {id: 4, nom: "Books"},
        {id: 5, nom: "Books"},    ]);
    // useEffect(()=>{
    //     axios.get("http://localhost:8081/DS/dsWEB2025/backend/controllers/categorieController.php")
    //     .then(response=>{
    //         setCategories(response.data)
    //     }).catch(error=>{  
    //         console.error("Error fetching categories:", error);
    //         setError("Failed to fetch categories.");
    //         setLoading(false);})
    // })
    useEffect(() => {
        axios.get("http://localhost:8081/DS/dsWEB2025/backend/controllers/articleController.php")
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
    }, [selectedFilter, articles]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <Navbar />
            <Filters selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
            <ArticleCard filteredArticles={filteredArticles} setSelectedArticle={setSelectedArticle} selectedFilter={selectedFilter} categories={categories}></ArticleCard>
            {selectedArticle && (
                <ArticleDetails header={selectedArticle.titre} visible={!!selectedArticle} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle}>
                    </ArticleDetails>
            )}
        </div>
    );
};

export default Home;
