<?php
require_once __DIR__ . '/../service/articleService.php';
ini_set('display_errors', 0);

header("Content-Type: application/json");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$articleService = new ArticleService();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            echo json_encode($articleService->getArticleById($_GET['id']));
        } else {
            echo json_encode($articleService->getAllArticles());
        }
        break;
    
    case 'POST':
        $rawData = file_get_contents('php://input');

        $data = json_decode($rawData, true);
        
        echo json_encode(["message" => $articleService->addArticle($data) ? "Article ajouté" : "Erreur"]);
        break;

    case 'PUT':
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true);
        echo json_encode(["message" => $articleService->updateArticle($_GET['id'], $data) ? "Article modifié" : "Erreur"]);
        break;

    case 'DELETE':
        echo json_encode(["message" => $articleService->deleteArticle($_GET['id']) ? "Article supprimé" : "Erreur"]);
        break;
}
?>
