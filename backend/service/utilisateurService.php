<?php
require_once __DIR__ . '/../dao/repository/utilisateurRepository.php';
class UtilisateurService {
    private UtilisateurRepository $repository;

    public function __construct(UtilisateurRepository $repository) {
        $this->repository = $repository;
    }

    public function login(string $email, string $password): ?Utilisateur {
        $user = $this->repository->findByEmail($email);
        if ($user && $user->password === $password) {
            return $user;
        }
        return null;
    }

    public function register(string $nom, string $email, string $password, string $role = 'user'): bool {
        if ($this->repository->findByEmail($email)) {
            return false; 
        }

        $user = new Utilisateur([
           
            'nom' => $nom,
            'email' => $email,
            'password' => $password, 
            'role' => $role
        ]);

        return $this->repository->save($user);
    }
}
?>