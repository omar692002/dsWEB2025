<?php
require_once __DIR__ . '/../dao/repository/utilisateurRepository.php';

class UtilisateurService {
    private $utilisateurRepository;

    public function __construct() {
        $this->utilisateurRepository = new UtilisateurRepository();
    }

    public function getAllUsers(): array {
        $users = $this->utilisateurRepository->getAll();
        
        error_log("Fetched users: " . print_r($users, true)); // Log the fetched data
    
        return $users;
    }
    

    public function getUserById($id): ?Utilisateur {
        return $this->utilisateurRepository->getById($id);
    }

    public function addUser($data): bool {
        $user = new Utilisateur($data);
        return $this->utilisateurRepository->create($user);
    }


}
?>
