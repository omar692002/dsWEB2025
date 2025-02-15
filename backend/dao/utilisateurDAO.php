<?php
class Utilisateur {
    public int $id;
    public string $nom;
    public string $email;
    public string $password;
    public string $role;

    public function __construct(array $row) {
        $this->id = (int) $row['id']  ?? null; 
        $this->nom = $row['nom'];
        $this->email = $row['email'];
        $this->password = $row['password'];
        $this->role = $row['role'];
    }
}
?>
