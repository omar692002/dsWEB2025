<?php
class Favori {
    public int $id;
    public int $utilisateur_id;
    public int $article_id;

    public function __construct(array $row) {
        $this->id = (int) $row['id'];  
        $this->utilisateur_id = (int) $row['utilisateur_id'];
        $this->article_id = (int) $row['article_id'];
    }
}
?>
