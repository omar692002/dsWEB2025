<?php
require_once __DIR__ . '/../dao/repository/categorieRepository.php';
require_once __DIR__ . '/../dao/categorieDAO.php';

class CategorieService {
    private $categorieRepo;

    public function __construct() {
        $this->categorieRepo = new CategorieRepository();
    }

    // Récupérer toutes les catégories
    public function getAll(): array {
        return $this->categorieRepo->getAll();
    }
    public function getCategorieById($id): Categorie {
        return $this->categorieRepo->getById($id);
    }

    // Créer une nouvelle catégorie
    public function create(Categorie $categorie): bool {
        return $this->categorieRepo->create($categorie);
    }

    public function update(Categorie $categorie): bool {
        return $this->categorieRepo->update($categorie);
    }
}
?>
