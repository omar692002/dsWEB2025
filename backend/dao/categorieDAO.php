<?php
class Categorie {
    public int $id;
    public string $nom;
    
    public function __construct(int $id, string $nom) {
        $this->id = $id;
        $this->nom = $nom;
    }
}
?>
