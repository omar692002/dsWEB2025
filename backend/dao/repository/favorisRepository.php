<?php
require_once __DIR__ . '/../favorisDAO.php';
require_once __DIR__ . '/../../config/db.php';

class FavoriRepository {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance();
    }

    public function addFavori(Favori $favoris): bool {
        $stmt = $this->pdo->prepare("INSERT INTO favoris (utilisateur_id, article_id) VALUES (?,?)");
        return $stmt->execute([$favoris->utilisateur_id, $favoris->article_id]);
    }

    // Supprimer un favori
    public function removeFavori(Favori $favoris): bool {
        $stmt = $this->pdo->prepare("DELETE FROM favoris WHERE utilisateur_id = ? AND article_id = ?");
        return $stmt->execute([$favoris->utilisateur_id, $favoris->article_id]);
    }

    public function getFavorisByUtilisateur(int $utilisateur_id): array {
        $stmt = $this->pdo->prepare("SELECT * FROM favoris WHERE utilisateur_id = ?");
        $stmt->execute([$utilisateur_id]);
        $favorisArray = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $favoris = [];
        foreach ($favorisArray as $row) {
            $favoris[] = new Favori($row); 
        }
        
        return $favoris;
    }

    public function isFavori(int $utilisateur_id, int $article_id): bool {
        $stmt = $this->pdo->prepare("SELECT 1 FROM favoris WHERE utilisateur_id = ? AND article_id = ?");
        $stmt->execute([$utilisateur_id, $article_id]);
        return $stmt->fetch() !== false;
    }
}
?>
