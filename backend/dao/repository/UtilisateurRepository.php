<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../utilisateurDAO.php';

class UtilisateurRepository {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance();
    }

    public function getAll(): array {
        $stmt = $this->pdo->query("SELECT * FROM users");
        $usersArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map(fn($row) => new Utilisateur($row), $usersArray);
    }

    public function getById($id): ?Utilisateur {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        
        return $stmt->fetchObject("User") ?: null;
    }

    public function create(Utilisateur $user): bool {
        $stmt = $this->pdo->prepare("INSERT INTO articles (nom, email, password,role) VALUES (?, ?, ?, ?)");
        return $stmt->execute([
            $user->nom, 
            $user->email, 
            $user->password, 
            $user->role, 
        ]);
    }


}
?>
