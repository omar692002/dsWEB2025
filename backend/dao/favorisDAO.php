<?php
class Favori {
    public int $id;
    public int $utilisateur_id;
    public int $article_id;

    public function __construct(int $id, int $utilisateur_id, int $article_id) {
        $this->id = $id;
        $this->utilisateur_id = $utilisateur_id;
        $this->article_id = $article_id;
    }
}
?>
