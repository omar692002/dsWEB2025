<?php
class Categorie {
    public int $id;
    public int $idParent;
    public string $nom;

    public function __construct(array $row) {
        $this->id = $row["id"];
        $this->idParent = (int) $row['parent_id']; 
        $this->nom = (string) $row['nom'];  
    }
}
?>
