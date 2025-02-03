<?php
class Utilisateur {
    public int $id;
    public string $nom;
    public string $email;
    public string $mot_de_passe;
    public string $role;

    // Constructor now accepts an associative array ($row)
    public function __construct(array $row) {
        $this->id = (int) $row['id'];  // Ensure correct type casting
        $this->nom = $row['nom'];
        $this->email = $row['email'];
        $this->mot_de_passe = $row['mot_de_passe'];
        $this->role = $row['role'];
    }
}
?>
