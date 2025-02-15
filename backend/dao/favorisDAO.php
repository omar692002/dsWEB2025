<?php
class Favori {
    public int $id;
    public int $user_id;
    public int $article_id;

    public function __construct(array $row) {
        $this->id = (int) $row['id'];  
        $this->user_id = (int) $row['user_id'];
        $this->article_id = (int) $row['article_id'];
    }
}
?>
