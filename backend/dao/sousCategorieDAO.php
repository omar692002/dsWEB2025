<?php
class SousCategorie {
    public int $id;
    public string $nom;
    public string $categorie_id;
    

    public function __construct(array $row) {
        $this->id = $row["id"];
        $this->nom = (string) $row['nom'];  
        $this->categorie_id = (string) $row['categorie_id'];  
    }
}
?>
