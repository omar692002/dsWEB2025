<?php
class Utilisateur {
    public int $id;
    public string $nom;
    public string $email;
    public string $mot_de_passe;
    public string $role;

    public function __construct(int $id, string $nom, string $email, string $mot_de_passe, string $role) {
        $this->id = $id;
        $this->nom = $nom;
        $this->email = $email;
        $this->mot_de_passe = $mot_de_passe;
        $this->role = $role;  
    }
}
?>
