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
        $articlesArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map(fn($row) => new Article($row), $articlesArray);
    }

    public function getById($id): ?Article {
        $stmt = $this->pdo->prepare("SELECT * FROM articles WHERE id = ?");
        $stmt->execute([$id]);
    
        $data = $stmt->fetch(PDO::FETCH_ASSOC); 
        if ($data) {
            return new Article($data); 
        }
    
        return null; // If no data found
    }

    public function create(Article $article): bool {
        $stmt = $this->pdo->prepare("INSERT INTO articles (titre, description, prix, image, sous_categorie_id) VALUES (?, ?, ?, ?, ?)");
        return $stmt->execute([
            $article->titre, 
            $article->description, 
            $article->prix, 
            $article->image, 
            $article->sous_categorie_id
        ]);
    }

    public function update(Article $article): bool {
        $stmt = $this->pdo->prepare("UPDATE articles SET titre = ?, description = ?, prix = ?, image = ?, sous_categorie_id = ? WHERE id = ?");
        return $stmt->execute([
            $article->titre, 
            $article->description, 
            $article->prix, 
            $article->image, 
            $article->sous_categorie_id, 
            $article->id
        ]);
    }

    public function delete($id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM articles WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>
