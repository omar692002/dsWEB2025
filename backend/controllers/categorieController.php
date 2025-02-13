<?php
require_once __DIR__ . '/../service/categorieService.php';
require_once __DIR__ . '/../dao/categorieDAO.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Création de l'instance du service
$categorieService = new CategorieService();

// Gestion de la requête HTTP
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            getCategorieById($_GET['id']);
        } else {
            getAllCategories();
        }
        break;

    case 'POST':
        createCategorie();
        break;

    case 'PUT':
        updateCategorie();
        break;

    // case 'DELETE':
    //     deleteCategorie();
    //     break;

    case 'OPTIONS': // Préflight request (utile pour certaines requêtes CORS)
        http_response_code(200);
        break;

    default:
        echo json_encode(["error" => "Méthode non supportée"]);
        break;
}

// Fonction pour récupérer toutes les catégories
function getAllCategories() {
    global $categorieService;
    $categories = $categorieService->getAll();
    echo json_encode($categories);
}

// Fonction pour récupérer une catégorie par ID
function getCategorieById($id) {
    global $categorieService;
    $categorie = $categorieService->getCategorieById($id);
    echo json_encode($categorie);
}

// Fonction pour créer une catégorie
function createCategorie() {
    global $categorieService;

    // Récupération des données envoyées en POST (JSON ou x-www-form-urlencoded)
    $input = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($input['nom'])) {
        echo json_encode(["error" => "Nom de la catégorie manquant"]);
        return;
    }

    $categorie = new Categorie(["nom" => $input['nom']]);
    if ($categorieService->create($categorie)) {
        echo json_encode(["message" => "Catégorie ajoutée avec succès"]);
    } else {
        echo json_encode(["error" => "Erreur lors de l'ajout de la catégorie"]);
    }
}

function updateCategorie() {
    global $categorieService;

    // Récupération des données envoyées en PUT
    parse_str(file_get_contents("php://input"), $input);

    if (!isset($input['id']) || !isset($input['nom'])) {
        echo json_encode(["error" => "ID ou nom de la catégorie manquant"]);
        return;
    }

    $categorie = new Categorie(["id" => $input['id'], "nom" => $input['nom']]);
    if ($categorieService->update($categorie)) {
        echo json_encode(["message" => "Catégorie mise à jour avec succès"]);
    } else {
        echo json_encode(["error" => "Erreur lors de la mise à jour de la catégorie"]);
    }
}

// // Fonction pour supprimer une catégorie
// function deleteCategorie() {
//     global $categorieService;

//     // Récupération des données envoyées en DELETE
//     parse_str(file_get_contents("php://input"), $input);
    
//     if (!isset($input['id'])) {
//         echo json_encode(["error" => "ID de la catégorie manquant"]);
//         return;
//     }

//     if ($categorieService->delete($input['id'])) {
//         echo json_encode(["message" => "Catégorie supprimée avec succès"]);
//     } else {
//         echo json_encode(["error" => "Erreur lors de la suppression de la catégorie"]);
//     }
// }
