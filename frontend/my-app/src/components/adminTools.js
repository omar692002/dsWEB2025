import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import 'primeicons/primeicons.css';
import axios from "axios";

const AdminTools = ({ article }) => {
    const [articleFormData, setArticleFormData] = useState({});
    const [initialFormData, setInitialFormData] = useState(null);  
    const [showAddEditDialog, setShowAddEditDialog] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState(null);
    const [isFormChanged, setIsFormChanged] = useState(false);

    useEffect(() => {
        if (article) {
            setArticleFormData(article);
            setInitialFormData(article);  
        }
    }, [article]);

    const API_BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/controllers/articleController.php`;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticleFormData((prevState) => {
            const updatedFormData = { ...prevState, [name]: value };
            checkFormChanged(updatedFormData); 
            return updatedFormData;
        });
    };

    const checkFormChanged = (currentFormData) => {
        const isChanged = JSON.stringify(currentFormData) !== JSON.stringify(initialFormData);
        setIsFormChanged(isChanged);  
    };

    const handleSave = async () => {
        try {
            await axios.put(`${API_BASE_URL}?id=${articleFormData.id}`, articleFormData);
            setInitialFormData(articleFormData);
            setShowAddEditDialog(false);
            setIsFormChanged(false);
            window.location.reload(); 
        } catch (error) {
            console.error('Erreur lors de la modification:', error);
        }
    };
    
    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}?id=${articleToDelete}`);
            setArticleToDelete(null);
            window.location.reload(); 
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
        }
    };
    

    const isFormValid = () => {
        return (
            articleFormData.titre &&
            articleFormData.description &&
            articleFormData.prix &&
            articleFormData.image
        );
    };

    return (
        <div className="admin-actions" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button 
                label="Modifier" 
                icon="pi pi-pencil" 
                onClick={() => setShowAddEditDialog(true)} 
                className="p-button-rounded p-button-info"
                style={{ padding: "10px 20px", fontSize: "14px" }}
            />
            
            <Button 
                label="Supprimer" 
                icon="pi pi-trash" 
                onClick={() => {
                    setArticleToDelete(article.id);
                }} 
                className="p-button-rounded p-button-danger"
                style={{ padding: "10px 20px", fontSize: "14px" }}
            />

            <Dialog 
                visible={articleToDelete !== null} 
                header="Confirmer la suppression" 
                modal 
                onHide={() => setArticleToDelete(null)}
                style={{ width: '50vw' }}
            >
                <div style={{ textAlign: 'start' }}>
                    <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
                    <div style={{ display: "flex", justifyContent: "end" }}>

                    <Button 
                        label="Confirmer" 
                        icon="pi pi-check" 
                        onClick={handleDelete} 
                        className="p-button-sucess p-mr-2"
                        style={{ padding: "8px 16px", fontSize: "14px" }}
                    />
                    <Button 
                        label="Annuler" 
                        icon="pi pi-times" 
                        onClick={() => {setArticleToDelete(null) ; }} 
                        className="p-button-danger"
                        style={{ padding: "8px 16px",marginLeft:"10px", fontSize: "14px" }}
                    />
                    </div>
                </div>
            </Dialog>

            <Dialog 
                visible={showAddEditDialog} 
                header="Modifier l'article" 
                modal 
                onHide={() => { setShowAddEditDialog(false) ;  setIsFormChanged(false) }}
                style={{ width: '50vw' }} 
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <label htmlFor="titre">Titre</label>
                    <input
                        type="text"
                        name="titre"
                        value={articleFormData.titre || ''}
                        onChange={handleChange}
                        placeholder="Titre de l'article"
                        style={{ padding: "10px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        value={articleFormData.description || ''}
                        onChange={handleChange}
                        placeholder="Description de l'article"
                        style={{ padding: "10px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc", height: "100px" }}
                    />

                    <label htmlFor="prix">Prix</label>
                    <input
                        type="text"
                        name="prix"
                        value={articleFormData.prix || ''}
                        onChange={handleChange}
                        placeholder="Prix"
                        style={{ padding: "10px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />

                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        name="image"
                        value={articleFormData.image || ''}
                        onChange={handleChange}
                        placeholder="URL de l'image"
                        style={{ padding: "10px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <Button 
                            label="Confirmer" 
                            icon="pi pi-save" 
                            onClick={handleSave} 
                            className="p-button-success p-mt-2"
                            disabled={!isFormChanged || !isFormValid()}  
                            style={{ padding: "10px 20px", fontSize: "14px" }}
                        />
                        <Button 
                            label="Annuler" 
                            icon="pi pi-times" 
                            onClick={() => {setShowAddEditDialog(false) }} 
                            className="p-button-danger"
                            style={{ padding: "8px 16px", marginLeft: "10px", fontSize: "14px" }}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default AdminTools;
