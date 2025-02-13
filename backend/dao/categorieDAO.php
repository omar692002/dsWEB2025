<?php
class Categorie {
    public int $id;
    public string $nom;

    public function __construct(array $row) {
        $this->id = $row["id"];
        $this->nom = (string) $row['nom'];  
    }
}
?>
