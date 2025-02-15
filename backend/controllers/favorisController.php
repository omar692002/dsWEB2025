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
    
        if (isset($_GET['user'])) {
            $utilisateur_id = $_GET['user'];  
    
            // Get favoris for this user
            $favoris = $favoriService->getFavorisByUtilisateur($utilisateur_id);
    
            echo json_encode($favoris);
        } else {
            echo json_encode(["message" => "Utilisateur non authentifié"]);
        }
        break;
    
    case 'POST':
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true);
    
        if (isset($data['article_id']) && isset($data['user_id'])) {
            $utilisateur_id = $data['user_id']; // ID de l'utilisateur connecté
            $article_id = $data['article_id'];
        
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
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true);
            if (isset($data['article_id']) && isset($data['user_id'])) {
            $utilisateur_id = $data['user_id']; 
            $article_id = $data['article_id'];
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
