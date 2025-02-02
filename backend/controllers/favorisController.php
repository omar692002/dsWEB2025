<?php
require_once __DIR__ . '/../service/favorisService.php';

class FavoriController {
    private $favoriService;

    public function __construct() {
        $this->favoriService = new FavoriService();
    }

    // Ajouter un article aux favoris
    public function add() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['article_id']) && isset($_SESSION['user_id'])) {
            $utilisateur_id = $_SESSION['user_id']; // ID de l'utilisateur connecté
            $article_id = $_POST['article_id'];

            if ($this->favoriService->addFavori($utilisateur_id, $article_id)) {
                echo "Article ajouté aux favoris";
            } else {
                echo "Cet article est déjà dans vos favoris";
            }
        }
    }

    // Supprimer un article des favoris
    public function remove() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['article_id']) && isset($_SESSION['user_id'])) {
            $utilisateur_id = $_SESSION['user_id']; // ID de l'utilisateur connecté
            $article_id = $_POST['article_id'];

            if ($this->favoriService->removeFavori($utilisateur_id, $article_id)) {
                echo "Article supprimé des favoris";
            } else {
                echo "Erreur lors de la suppression de l'article des favoris";
            }
        }
    }

    // Afficher les favoris d'un utilisateur
    public function show() {
        if (isset($_SESSION['user_id'])) {
            $utilisateur_id = $_SESSION['user_id']; // ID de l'utilisateur connecté
            $favoris = $this->favoriService->getFavorisByUtilisateur($utilisateur_id);

            echo "Vos favoris :<br>";
            foreach ($favoris as $favori) {
                echo "Article ID: " . $favori['article_id'] . "<br>";
            }
        }
    }
}
?>
