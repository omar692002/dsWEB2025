import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Navbar from '../components/Navbar';
import { Dialog } from "primereact/dialog";

const ArticleDetails = ({ header, visible, selectedArticle, setSelectedArticle }) => {


    if (!selectedArticle) return <p>Loading...</p>;

    return (
        <Dialog 
        header={header} 
        visible={visible} 
        style={{ width: "50vw" }} 
        onHide={() => setSelectedArticle(null)}
    >
        <div className="dialog-content">
            <div className="dialog-image-container">
                <img 
                    src={selectedArticle.image || "path/to/placeholder-image.jpg"} 
                    alt={selectedArticle.titre} 
                    className="dialog-image"
                />
            </div>

            <div className="dialog-details">
                <h2>{selectedArticle.titre}</h2>
                <p><strong>Description:</strong> {selectedArticle.description || "No description available."}</p>
                <p><strong>Price:</strong> {selectedArticle.prix ? `${selectedArticle.prix} TND` : "N/A"}</p>
                <p><strong>Category:</strong> {selectedArticle.category || "Uncategorized"}</p>
            </div>
        </div>
    </Dialog>
    );
};

export default ArticleDetails;