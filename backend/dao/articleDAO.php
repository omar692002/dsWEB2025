<?php

class Article {
    public int $id;
    public string $titre;
    public string $description;
    public float $prix;
    public ?string $image;
    public int $sous_categorie_id;
    public string $date_ajout;

    public function __construct(array $data) {
        $this->id = (int) $data['id'];
        $this->titre = $data['titre'];
        $this->description = $data['description'];
        $this->prix = (float) $data['prix'];
        $this->image = $data['image'] ?? null;
        $this->sous_categorie_id = (int) $data['sous_categorie_id'];
        $this->date_ajout = $data['date_ajout'];
    }
}

?>
