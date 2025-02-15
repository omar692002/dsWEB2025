<?php
require_once __DIR__ . '/../dao/repository/favorisRepository.php';
require_once __DIR__ . '/../dao/repository/articleRepository.php';

class FavoriService {
    private $favoriRepo;
    private $articleRepo;

    public function __construct() {
        $this->favoriRepo = new FavoriRepository();
        $this->articleRepo = new ArticleRepository();
    }

    // Ajouter un article aux favoris
    public function addFavori(int $utilisateur_id, int $article_id): bool {
        if ($this->favoriRepo->isFavori($utilisateur_id, $article_id)) {
            return false; 
        }
        return $this->favoriRepo->addFavori(new Favori([
            "user_id" => $utilisateur_id,
            "article_id" => $article_id
        ]));
            }

    // Supprimer un article des favoris
    public function removeFavori(int $utilisateur_id, int $article_id): bool {
        return $this->favoriRepo->removeFavori(new Favori([
            "user_id" => $utilisateur_id,
            "article_id" => $article_id
        ]));
    }

    // Récupérer tous les favoris d'un utilisateur
    public function getFavorisByUtilisateur(int $utilisateur_id): array {
        $listFavoris = $this->favoriRepo->getFavorisByUtilisateur($utilisateur_id);
        $tabArticles = [];
        
        foreach ($listFavoris as $el) {
            // Assuming $el is a Favori object, use -> to access properties
            $article = $this->articleRepo->getById($el->article_id);
            array_push($tabArticles, $article);
        }
        
        // Retourner le tableau d'articles
        return $tabArticles;
    }
    
}
?>
