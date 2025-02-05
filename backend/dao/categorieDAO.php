<?php
class Categorie {
    public int $id;
    public int $idParent;
    public string $nom;

    public function __construct(array $row) {
        $this->id = $row["id"];
        $this->idParent = (int) $row['ididParent']; 
        $this->nom = (string) $row['nom'];  
    }
}
?>
