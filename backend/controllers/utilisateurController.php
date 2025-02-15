<?php
require_once __DIR__ . '/../service/utilisateurService.php';



header("Access-Control-Allow-Origin: http://localhost:3000");  // This is your frontend's URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
class UtilisateurController {
    private UtilisateurService $service;

    public function __construct(UtilisateurService $service) {
        $this->service = $service;
    }

    private function checkSession(): void {
        session_start();
        if (isset($_SESSION['user'])) {
            $this->sendResponse(200, ["authenticated" => true, "user" => $_SESSION['user']]);
        } else {
            $this->sendResponse(200, ["authenticated" => false]);
        }
    }
    
    public function handleRequest(): void {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = $_SERVER['REQUEST_URI'];

        if ($method === 'POST' && preg_match('/\/api\/login$/', $path)) {
            $this->login();
        } 
        elseif($method === 'GET' && preg_match('/\/api\/check-session$/', $path)){
            $this->checkSession();

        }
        elseif ($method === 'POST' && preg_match('/\/api\/register$/', $path)) {
            $this->register();
        } elseif ($method === 'POST' && preg_match('/\/api\/logout$/', $path)) {
            $this->logout();
        } else {
            $this->sendResponse(400, ["error" => "Invalid request"]);
        }
    }

    private function login(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['email'], $data['password'])) {
            $this->sendResponse(400, ["error" => "Missing fields"]);
            return;
        }

        $user = $this->service->login($data['email'], $data['password']);

        if ($user) {
            session_start();
            $_SESSION['user'] = [
                'id' => $user->id,
                'nom' => $user->nom,
                'email' => $user->email,
                'role' => $user->role
            ];
            $this->sendResponse(200, ["message" => "Login successful", "user" => $_SESSION['user']]);
        } else {
            $this->sendResponse(401, ["error" => "Invalid credentials"]);
        }
    }

    private function register(): void {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['nom'], $data['email'], $data['password'])) {
            $this->sendResponse(400, ["error" => "Missing fields"]);
            return;
        }

        if ($this->service->register($data['nom'], $data['email'], $data['password'])) {
            $this->sendResponse(201, ["message" => "User registered successfully"]);
        } else {
            $this->sendResponse(409, ["error" => "Email already exists"]);
        }
    }

    private function logout(): void {
        session_start();
        session_destroy();
        $this->sendResponse(200, ["message" => "Logout successful"]);
    }

    private function sendResponse(int $status, array $data): void {
        http_response_code($status);
        echo json_encode($data);
        exit();
    }
}

// Get the PDO instance from the Database singleton
$db = Database::getInstance();  

// Instantiate the repository and service
$repository = new UtilisateurRepository($db);
$service = new UtilisateurService($repository);
$controller = new UtilisateurController($service);

// Handle the request
$controller->handleRequest();
?>