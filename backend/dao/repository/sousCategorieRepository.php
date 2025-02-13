<?php
require_once __DIR__ . './sousCategorieRepository.php';
require_once __DIR__ . '/../../config/db.php';

class SousCategorieRepository {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance();
    }

    // Récupérer toutes les catégories
    public function getAll(): array {
        $stmt = $this->pdo->query("SELECT * FROM sous_categories");
        $categoriesArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map(fn($row) => new SousCategorie($row), $categoriesArray);
    }

    public function getById(int $id): ?SousCategorie {
        $stmt = $this->pdo->prepare("SELECT * FROM sous_categories WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetchObject("SousCategorie") ?: null;
    }
    public function getByIdCategoriePrincipale(int $id): ?SousCategorie {
        $stmt = $this->pdo->prepare("SELECT * FROM sous_categories WHERE categorie_id = ?");
        $stmt->execute([$id]);
        return $stmt->fetchObject("SousCategorie") ?: null;
    }

    public function create(SousCategorie $sousCategorie): bool {
            $stmt = $this->pdo->prepare("INSERT INTO sous_categories (nom,categorie_id) VALUES (?,?)");
            return $stmt->execute([$sousCategorie->nom,$sousCategorie->categorie_id]);
       
    }

    // Modifier une catégorie existante
    public function update(SousCategorie $sousCategorie): bool {
        $stmt = $this->pdo->prepare("UPDATE sous_categories SET nom = ? WHERE id = ?");
        return $stmt->execute([$sousCategorie->nom, $sousCategorie->id]);
    }

    // public function delete(int $id): bool {
    //     $stmt = $this->pdo->prepare("DELETE FROM sous_categories WHERE id = ?");
    //     return $stmt->execute([$id]);
    // }
}
?>
