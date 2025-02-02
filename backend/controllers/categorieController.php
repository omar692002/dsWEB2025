<?php
require_once __DIR__ . '/../service/categorieService.php';
require_once __DIR__ . '/../dao/categorieDAO.php';

class CategorieController {
    private $categorieService;

    public function __construct() {
        $this->categorieService = new CategorieService();
    }

    // Afficher toutes les catégories
    public function all() {
        $categories = $this->categorieService->getAll();
        foreach ($categories as $categorie) {
            echo $categorie->nom . "<br>";
        }
    }

    // Ajouter une catégorie
    public function add() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $nom = $_POST['nom'];

            $categorie = new Categorie(0, $nom);
            if ($this->categorieService->create($categorie)) {
                echo "Catégorie ajoutée avec succès";
            } else {
                echo "Erreur lors de l'ajout de la catégorie";
            }
        }
    }

    // Modifier une catégorie
    public function update() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id = $_POST['id'];
            $nom = $_POST['nom'];

            $categorie = new Categorie($id, $nom);
            if ($this->categorieService->update($categorie)) {
                echo "Catégorie mise à jour avec succès";
            } else {
                echo "Erreur lors de la mise à jour de la catégorie";
            }
        }
    }

    // Supprimer une catégorie
    public function delete() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id = $_POST['id'];
            if ($this->categorieService->delete($id)) {
                echo "Catégorie supprimée avec succès";
            } else {
                echo "Erreur lors de la suppression de la catégorie";
            }
        }
    }
}
?>
