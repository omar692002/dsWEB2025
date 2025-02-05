<?php
require_once __DIR__ . '/../service/utilisateurService.php';
require_once __DIR__ . '/../dao/utilisateurDAO.php';

class UtilisateurController {
    private $utilisateurService;

    public function __construct() {
        $this->utilisateurService = new UtilisateurService();
    }

    public function inscrire() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $nom = $_POST['nom'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $role = 'user';  // Par défaut, l'utilisateur est un 'user'
            $tab=["nom"=>$nom,"email"=> $email,"password"=> $password, "role"=>$role];
            $utilisateur = new Utilisateur($tab) ;
            if ($this->utilisateurService->create($utilisateur)) {
                echo "Utilisateur créé avec succès";
            } else {
                echo "Erreur lors de la création de l'utilisateur";
            }
        }
    }

    public function connexion() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $email = $_POST['email'];
            $password = $_POST['password'];

            $utilisateur = $this->utilisateurService->getByEmail($email);

            if ($utilisateur && password_verify($password, $utilisateur->password)) {
                echo "Connexion réussie";
            } else {
                echo "Email ou mot de passe incorrect";
            }
        }
    }

    // Mettre à jour un utilisateur
    public function update() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id = $_POST['id'];
            $nom = $_POST['nom'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $role = $_POST['role'];
            $tab=["nom"=>$nom,"email"=> $email,"password"=> $password, "role"=>$role];

            $utilisateur = new Utilisateur($tab);
            if ($this->utilisateurService->update($utilisateur)) {
                echo "Utilisateur mis à jour avec succès";
            } else {
                echo "Erreur lors de la mise à jour de l'utilisateur";
            }
        }
    }

    // Supprimer un utilisateur
    public function delete() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id = $_POST['id'];
            if ($this->utilisateurService->delete($id)) {
                echo "Utilisateur supprimé avec succès";
            } else {
                echo "Erreur lors de la suppression de l'utilisateur";
            }
        }
    }
}
?>
