<?php
require_once __DIR__ . '/../service/utilisateurService.php';
require_once __DIR__ . '/../dao/utilisateurDAO.php';

class UtilisateurController {
    private $utilisateurService;

    public function __construct() {
        $this->utilisateurService = new UtilisateurService();
    }

    // Inscription d'un utilisateur
    public function inscrire() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $nom = $_POST['nom'];
            $email = $_POST['email'];
            $mot_de_passe = $_POST['mot_de_passe'];
            $role = 'user';  // Par défaut, l'utilisateur est un 'user'

            $utilisateur = new Utilisateur(0, $nom, $email, $mot_de_passe, $role);
            if ($this->utilisateurService->create($utilisateur)) {
                echo "Utilisateur créé avec succès";
            } else {
                echo "Erreur lors de la création de l'utilisateur";
            }
        }
    }

    // Connexion d'un utilisateur
    public function connexion() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $email = $_POST['email'];
            $mot_de_passe = $_POST['mot_de_passe'];

            $utilisateur = $this->utilisateurService->getByEmail($email);

            if ($utilisateur && password_verify($mot_de_passe, $utilisateur->mot_de_passe)) {
                echo "Connexion réussie";
                // Ici, tu pourrais créer une session pour l'utilisateur
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
            $mot_de_passe = $_POST['mot_de_passe'];
            $role = $_POST['role'];

            $utilisateur = new Utilisateur($id, $nom, $email, $mot_de_passe, $role);
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
