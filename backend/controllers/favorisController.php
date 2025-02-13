<?php
require_once __DIR__ . '/../service/favorisService.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Création d'une instance du service Favori
$favoriService = new FavoriService();

// Vérification de la méthode HTTP
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_SESSION['user_id'])) {
            $utilisateur_id = $_SESSION['user_id'];
            $favoris = $favoriService->getFavorisByUtilisateur($utilisateur_id);

            echo json_encode( $favoris);
        } else {
            echo json_encode(["message" => "Utilisateur non authentifié"]);
        }
        break;

    case 'POST':
        if (isset($_POST['article_id']) && isset($_SESSION['user_id'])) {
            $utilisateur_id = $_SESSION['user_id']; // ID de l'utilisateur connecté
            $article_id = $_POST['article_id'];

            // Ajouter l'article aux favoris et renvoyer la réponse
            if ($favoriService->addFavori($utilisateur_id, $article_id)) {
                echo json_encode(["message" => "Article ajouté aux favoris"]);
            } else {
                echo json_encode(["message" => "Cet article est déjà dans vos favoris"]);
            }
        } else {
            echo json_encode(["message" => "Données manquantes ou utilisateur non authentifié"]);
        }
        break;

    case 'DELETE':
        // Supprimer un article des favoris
        if (isset($_POST['article_id']) && isset($_SESSION['user_id'])) {
            $utilisateur_id = $_SESSION['user_id']; // ID de l'utilisateur connecté
            $article_id = $_POST['article_id'];

            // Supprimer l'article des favoris et renvoyer la réponse
            if ($favoriService->removeFavori($utilisateur_id, $article_id)) {
                echo json_encode(["message" => "Article supprimé des favoris"]);
            } else {
                echo json_encode(["message" => "Erreur lors de la suppression de l'article des favoris"]);
            }
        } else {
            echo json_encode(["message" => "Données manquantes ou utilisateur non authentifié"]);
        }
        break;

    default:
        // Si une méthode non autorisée est utilisée, renvoyer une erreur
        echo json_encode(["message" => "Méthode non autorisée"]);
        break;
}
?>
