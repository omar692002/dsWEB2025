<?php
require_once __DIR__ . '/../dao/repository/articleRepository.php';

class ArticleService {
    private $articleRepository;

    public function __construct() {
        $this->articleRepository = new ArticleRepository();
    }

    public function getAllArticles(): array {
        $articles = $this->articleRepository->getAll();
        
        error_log("Fetched articles: " . print_r($articles, true)); // Log the fetched data
    
        return $articles;
    }
    

    public function getArticleById($id): ?Article {
        return $this->articleRepository->getById($id);
    }

    public function addArticle($data): bool {
        $article = new Article($data);
        return $this->articleRepository->create($article);
    }

    public function updateArticle($id, $data): bool {
        $article = $this->articleRepository->getById($id);
        if (!$article) return false;

        $article->titre = $data['titre'];
        $article->description = $data['description'];
        $article->prix = $data['prix'];
        $article->image = $data['image'] ?? null;
        $article->sous_categorie_id = $data['sous_categorie_id'];

        return $this->articleRepository->update($article);
    }

    public function deleteArticle($id): bool {
        return $this->articleRepository->delete($id);
    }
}
?>
