<?php
require_once __DIR__ . '/../service/sousCategorieService.php';
require_once __DIR__ . '/../dao/sousCategorieDAO.php';

header("Content-Type: application/json");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Création de l'instance du service
$sousCategorieService = new SousCategorieService();

// Gestion de la requête HTTP
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            getSousCategorieById($_GET['id']);
        } else {
            getAllSousCategories();
        }
        break;

    case 'POST':
        createSousCategorie();
        break;

    case 'PUT':
        updateSousCategorie();
        break;

    case 'OPTIONS': // Préflight request (utile pour certaines requêtes CORS)
        http_response_code(200);
        break;

    default:
        echo json_encode(["error" => "Méthode non supportée"]);
        break;
}

// Fonction pour récupérer toutes les catégories
function getAllSousCategories() {
    global $sousCategorieService;
    $sousCategories = $sousCategorieService->getAll();
    echo json_encode($sousCategories);
}

// Fonction pour récupérer une catégorie par ID
function getSousCategorieById($id) {
    global $sousCategorieService;
    $sousCategories = $sousCategorieService->getSousCategorieById($id);
    echo json_encode($sousCategories);
}

// Fonction pour créer une catégorie
function createSousCategorie() {
    global $sousCategorieService;

    // Récupération des données envoyées en POST (JSON ou x-www-form-urlencoded)
    $input = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($input['nom'])) {
        echo json_encode(["error" => "Nom de la sous catégorie manquant"]);
        return;
    }

    $sousCategories = new SousCategorie(["nom" => $input['nom']]);
    if ($sousCategorieService->create($sousCategories)) {
        echo json_encode(["message" => "Sous Catégorie ajoutée avec succès"]);
    } else {
        echo json_encode(["error" => "Erreur lors de l'ajout de la sous catégorie"]);
    }
}

function updateSousCategorie() {
    global $sousCategorieService;

    // Récupération des données envoyées en PUT
    parse_str(file_get_contents("php://input"), $input);

    if (!isset($input['id']) || !isset($input['nom'])) {
        echo json_encode(["error" => "ID ou nom de la sous catégorie manquant"]);
        return;
    }

    $categorie = new SousCategorie(["id" => $input['id'], "nom" => $input['nom']]);
    if ($sousCategorieService->update($categorie)) {
        echo json_encode(["message" => "Sous Catégorie mise à jour avec succès"]);
    } else {
        echo json_encode(["error" => "Erreur lors de la mise à jour de la sous catégorie"]);
    }
}

