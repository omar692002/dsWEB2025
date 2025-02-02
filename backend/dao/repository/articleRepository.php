<?php
require_once __DIR__ . '/../../config/db.php';

require_once __DIR__ . '/../articleDAO.php';

class ArticleRepository {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance();
    }

    public function getAll(): array {
        $stmt = $this->pdo->query("SELECT * FROM articles");
        return $stmt->fetchAll(PDO::FETCH_CLASS, "Article");
    }

    public function getById($id): ?Article {
        $stmt = $this->pdo->prepare("SELECT * FROM articles WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetchObject("Article") ?: null;
    }

    public function create(Article $article): bool {
        $stmt = $this->pdo->prepare("INSERT INTO articles (titre, description, prix, image, categorie_id) VALUES (?, ?, ?, ?, ?)");
        return $stmt->execute([$article->titre, $article->description, $article->prix, $article->image, $article->categorie_id]);
    }

    public function update(Article $article): bool {
        $stmt = $this->pdo->prepare("UPDATE articles SET titre = ?, description = ?, prix = ?, image = ?, categorie_id = ? WHERE id = ?");
        return $stmt->execute([$article->titre, $article->description, $article->prix, $article->image, $article->categorie_id, $article->id]);
    }

    public function delete($id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM articles WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>
