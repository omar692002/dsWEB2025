<?php
require_once __DIR__ . '/../service/utilisateurService.php';

header("Content-Type: application/json");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$utilisateurService = new UtilisateurService();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            echo json_encode($utilisateurService->getUserById($_GET['id']));
        } else {
            echo json_encode($utilisateurService->getAllUsers());
        }
        break;
    
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode(["message" => $utilisateurService->addUser($data) ? "Utilisateur ajouté" : "Erreur"]);
        break;
    
}
?>
