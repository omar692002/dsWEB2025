<?php
require_once __DIR__ . './categorieRepository.php';
require_once __DIR__ . '/../../config/db.php';

class CategorieRepository {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance();
    }

    // Récupérer toutes les catégories
    public function getAll(): array {
        $stmt = $this->pdo->query("SELECT * FROM categories");
        return $stmt->fetchAll(PDO::FETCH_CLASS, "Categorie");
    }

    // Récupérer une catégorie par ID
    public function getById(int $id): ?Categorie {
        $stmt = $this->pdo->prepare("SELECT * FROM categories WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetchObject("Categorie") ?: null;
    }

    // Ajouter une nouvelle catégorie
    public function create(Categorie $categorie): bool {
        $stmt = $this->pdo->prepare("INSERT INTO categories (nom) VALUES (?)");
        return $stmt->execute([$categorie->nom]);
    }

    // Modifier une catégorie existante
    public function update(Categorie $categorie): bool {
        $stmt = $this->pdo->prepare("UPDATE categories SET nom = ? WHERE id = ?");
        return $stmt->execute([$categorie->nom, $categorie->id]);
    }

    // Supprimer une catégorie
    public function delete(int $id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM categories WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>
