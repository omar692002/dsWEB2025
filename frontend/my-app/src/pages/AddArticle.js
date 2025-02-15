import React, { useState, useEffect } from 'react'; 
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddArticle.css';

const AddArticle = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        prix: '',
        image: '',
        sous_categorie_id: null
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/controllers/sousCategorieController.php`);
                const formattedCategories = categoriesRes.data.map(category => ({
                    label: category.nom,  
                    value: category.id   
                }));
                
                setCategories(formattedCategories);
            } catch (err) {
                setError('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/controllers/articleController.php`, 
                formData
            );
            
            if (response.data.message) {
                navigate('/home');
            } else {
                alert('Failed to add article');
            }
        } catch (error) {
            console.error('Error adding article:', error);
            alert('An error occurred while adding the article.');
        }
    };

    if (loading) return <div>Loading categories...</div>;

    if (error) return <div>{error}</div>;

    return (
        <div className="add-article-container">
            <h2>Add New Article</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="titre">Title</label>
                    <InputText 
                        id="titre" 
                        name="titre" 
                        value={formData.titre} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <InputText 
                        id="description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="prix">Price</label>
                    <InputNumber 
                        id="prix" 
                        name="prix" 
                        value={formData.prix} 
                        onValueChange={(e) => setFormData({ ...formData, prix: e.value })} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <InputText 
                        id="image" 
                        name="image" 
                        value={formData.image} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sous_categorie_id">Sous Category</label>
                    <Dropdown
                        id="sous_categorie_id"
                        name="sous_categorie_id"
                        value={formData.sous_categorie_id}
                        options={categories}
                        onChange={handleChange}
                        optionLabel="label"
                        optionValue="value"
                        required
                    />
                </div>

                <div className="form-group">
                    <Button type="submit" label="Add Article" icon="pi pi-plus" />
                </div>
            </form>
        </div>
    );
};

export default AddArticle;
