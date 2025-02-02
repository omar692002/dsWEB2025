<?php
class Article {
    public ?int $id;
    public string $titre;
    public string $description;
    public float $prix;
    public ?string $image;
    public int $categorie_id;
    public string $date_ajout;

    public function __construct(
        ?int $id = null,
        string $titre = "",
        string $description = "",
        float $prix = 0.0,
        ?string $image = null,
        int $categorie_id = 0,
        string $date_ajout = ""
    ) {
        $this->id = $id;
        $this->titre = $titre;
        $this->description = $description;
        $this->prix = $prix;
        $this->image = $image;
        $this->categorie_id = $categorie_id;
        $this->date_ajout = $date_ajout;
    }
}
?>
