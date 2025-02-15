<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../utilisateurDAO.php';

class UtilisateurRepository {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function findByEmail(string $email): ?Utilisateur {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row ? new Utilisateur($row) : null;
    }

    public function save(Utilisateur $utilisateur): bool {
        $stmt = $this->db->prepare("
            INSERT INTO users (nom, email, password, role) 
            VALUES (:nom, :email, :password, :role)
        ");
        return $stmt->execute([
            'nom' => $utilisateur->nom,
            'email' => $utilisateur->email,
            'password' => password_hash($utilisateur->password, PASSWORD_BCRYPT),
            'role' => $utilisateur->role
        ]);
    }
}
?>