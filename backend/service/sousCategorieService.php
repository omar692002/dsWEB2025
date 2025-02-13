<?php
require_once __DIR__ . '/../dao/repository/categorieRepository.php';
require_once __DIR__ . '/../dao/repository/sousCategorieRepository.php';
require_once __DIR__ . '/../dao/categorieDAO.php';
require_once __DIR__ . '/../dao/sousCategorieDAO.php';

class SousCategorieService {
    private $sousCategoryRepo;

    public function __construct() {
        $this->sousCategoryRepo = new SousCategorieRepository();
    }

    // Récupérer toutes les catégories
    public function getAll(): array {
        return $this->sousCategoryRepo->getAll();
    }
    public function getSousCategorieById($id): SousCategorie {
        return $this->sousCategoryRepo->getById($id);
    }

    // Créer une nouvelle catégorie
    public function create(SousCategorie $sousCategorie): bool {
        return $this->sousCategoryRepo->create($sousCategorie);
    }

    public function update(SousCategorie $sousCategorie): bool {
        return $this->sousCategoryRepo->update($sousCategorie);
    }


}
?>
