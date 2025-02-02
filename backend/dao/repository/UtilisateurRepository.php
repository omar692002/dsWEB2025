<?php
require_once __DIR__ . '/../entities/Utilisateur.php';
require_once __DIR__ . '/../../config/db.php';

class UtilisateurRepository {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance();
    }

    // Récupérer un utilisateur par ID
    public function getById(int $id): ?Utilisateur {
        $stmt = $this->pdo->prepare("SELECT * FROM utilisateurs WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetchObject("Utilisateur") ?: null;
    }

    // Récupérer un utilisateur par email
    public function getByEmail(string $email): ?Utilisateur {
        $stmt = $this->pdo->prepare("SELECT * FROM utilisateurs WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetchObject("Utilisateur") ?: null;
    }

    // Récupérer un utilisateur par email et rôle
    public function getByEmailAndRole(string $email, string $role): ?Utilisateur {
        $stmt = $this->pdo->prepare("SELECT * FROM utilisateurs WHERE email = ? AND role = ?");
        $stmt->execute([$email, $role]);
        return $stmt->fetchObject("Utilisateur") ?: null;
    }

    // Ajouter un utilisateur
    public function create(Utilisateur $utilisateur): bool {
        $stmt = $this->pdo->prepare("INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$utilisateur->nom, $utilisateur->email, password_hash($utilisateur->mot_de_passe, PASSWORD_DEFAULT), $utilisateur->role]);
    }

    // Modifier un utilisateur existant
    public function update(Utilisateur $utilisateur): bool {
        $stmt = $this->pdo->prepare("UPDATE utilisateurs SET nom = ?, email = ?, mot_de_passe = ?, role = ? WHERE id = ?");
        return $stmt->execute([$utilisateur->nom, $utilisateur->email, $utilisateur->mot_de_passe, $utilisateur->role, $utilisateur->id]);
    }

    // Supprimer un utilisateur
    public function delete(int $id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM utilisateurs WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>
