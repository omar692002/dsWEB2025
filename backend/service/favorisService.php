<?php
require_once __DIR__ . '/../dao/repository/favorisRepository.php';

class FavoriService {
    private $favoriRepo;

    public function __construct() {
        $this->favoriRepo = new FavoriRepository();
    }

    // Ajouter un article aux favoris
    public function addFavori(int $utilisateur_id, int $article_id): bool {
        if ($this->favoriRepo->isFavori($utilisateur_id, $article_id)) {
            return false; 
        }
        return $this->favoriRepo->addFavori(new Favori([
            "utilisateur_id" => $utilisateur_id,
            "article_id" => $article_id
        ]));
            }

    // Supprimer un article des favoris
    public function removeFavori(int $utilisateur_id, int $article_id): bool {
        return $this->favoriRepo->removeFavori(new Favori([
            "utilisateur_id" => $utilisateur_id,
            "article_id" => $article_id
        ]));
    }

    // Récupérer tous les favoris d'un utilisateur
    public function getFavorisByUtilisateur(int $utilisateur_id): array {
        return $this->favoriRepo->getFavorisByUtilisateur($utilisateur_id);
    }
}
?>
