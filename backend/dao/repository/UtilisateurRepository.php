<?php
require_once __DIR__ . '/../utilisateurDAO.php';
require_once __DIR__ . '/../../config/db.php';

class UtilisateurRepository {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance();
    }

    // Récupérer un utilisateur par ID
    public function getById(int $id): ?Utilisateur {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? new Utilisateur($row) : null; 
    }

    public function getByEmail(string $email): ?Utilisateur {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? new Utilisateur($row) : null; 
    }

    public function getByEmailAndRole(string $email, string $role): ?Utilisateur {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ? AND role = ?");
        $stmt->execute([$email, $role]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? new Utilisateur($row) : null; 
    }

    public function create(Utilisateur $utilisateur): bool {
        $stmt = $this->pdo->prepare("INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)");
        return $stmt->execute([
            $utilisateur->nom, 
            $utilisateur->email, 
            password_hash($utilisateur->password, PASSWORD_DEFAULT), 
            $utilisateur->role
        ]);
    }

    // Modifier un utilisateur existant
    public function update(Utilisateur $utilisateur): bool {
        $stmt = $this->pdo->prepare("UPDATE utilisateurs SET nom = ?, email = ?, password = ?, role = ? WHERE id = ?");
        return $stmt->execute([
            $utilisateur->nom, 
            $utilisateur->email, 
            $utilisateur->password, 
            $utilisateur->role, 
            $utilisateur->id
        ]);
    }

    // Supprimer un utilisateur
    public function delete(int $id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM utilisateurs WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>
