<?php
require_once __DIR__ . '/../dao/repository/UtilisateurRepository.php';
require_once __DIR__ . '/../dao/utilisateurDAO.php';

class UtilisateurService {
    private $utilisateurRepo;

    public function __construct() {
        $this->utilisateurRepo = new UtilisateurRepository();
    }

    public function create(Utilisateur $utilisateur): bool {
        return $this->utilisateurRepo->create($utilisateur);
    }

    public function getByEmail(string $email): ?Utilisateur {
        return $this->utilisateurRepo->getByEmail($email);
    }

    public function getByEmailAndRole(string $email, string $role): ?Utilisateur {
        return $this->utilisateurRepo->getByEmailAndRole($email, $role);
    }

    public function update(Utilisateur $utilisateur): bool {
        return $this->utilisateurRepo->update($utilisateur);
    }

    public function delete(int $id): bool {
        return $this->utilisateurRepo->delete($id);
    }
}
?>
