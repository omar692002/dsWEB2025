<?php
require_once __DIR__ . '/../services/ArticleService.php';

header("Content-Type: application/json");

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
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode(["message" => $articleService->addArticle($data) ? "Article ajouté" : "Erreur"]);
        break;

    case 'PUT':
        parse_str(file_get_contents("php://input"), $data);
        echo json_encode(["message" => $articleService->updateArticle($_GET['id'], $data) ? "Article modifié" : "Erreur"]);
        break;

    case 'DELETE':
        echo json_encode(["message" => $articleService->deleteArticle($_GET['id']) ? "Article supprimé" : "Erreur"]);
        break;
}
?>
