<?php
require_once __DIR__ . '/../entities/Favori.php';
require_once __DIR__ . '/../../config/db.php';

class FavoriRepository {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance();
    }

    // Ajouter un favori
    public function addFavori(int $utilisateur_id, int $article_id): bool {
        $stmt = $this->pdo->prepare("INSERT INTO favoris (utilisateur_id, article_id) VALUES (?, ?)");
        return $stmt->execute([$utilisateur_id, $article_id]);
    }

    // Supprimer un favori
    public function removeFavori(int $utilisateur_id, int $article_id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM favoris WHERE utilisateur_id = ? AND article_id = ?");
        return $stmt->execute([$utilisateur_id, $article_id]);
    }

    // Récupérer les favoris d'un utilisateur
    public function getFavorisByUtilisateur(int $utilisateur_id): array {
        $stmt = $this->pdo->prepare("SELECT * FROM favoris WHERE utilisateur_id = ?");
        $stmt->execute([$utilisateur_id]);
        $favoris = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $favoris;
    }

    // Vérifier si un article est déjà dans les favoris d'un utilisateur
    public function isFavori(int $utilisateur_id, int $article_id): bool {
        $stmt = $this->pdo->prepare("SELECT 1 FROM favoris WHERE utilisateur_id = ? AND article_id = ?");
        $stmt->execute([$utilisateur_id, $article_id]);
        return $stmt->fetch() !== false;
    }
}
?>
