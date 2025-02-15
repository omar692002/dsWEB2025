<?php
require_once __DIR__ . '/../service/utilisateurService.php';

header("Access-Control-Allow-Origin: http://localhost:3000");  // This is your frontend's URL
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Disable error display in production for security purposes
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/php_errors.log');  // Ensure proper logging of errors

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class UtilisateurController {
    public UtilisateurService $service;
    
    public function __construct(UtilisateurService $service) {
        $this->service = $service;
    }

    public function checkSession(): void {
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
            $this->sendResponse(400, ["message" => "Invalid request"]);
        }
    }

    public function login(): void {
        // Start the session at the top of your method
        session_start();
    
        // Get input data
        $data = json_decode(file_get_contents("php://input"), true);
    
        if (!isset($data['email'], $data['password'])) {
            $this->sendResponse(400, ["message" => "Missing fields"]);
            return;
        }
    
        // Authenticate the user
        $user = $this->service->login($data['email'], $data['password']);
    
        if ($user) {
            $_SESSION['user'] = [
                'id' => $user->id,
                'nom' => $user->nom,
                'email' => $user->email,
                'role' => $user->role
            ];
            $this->sendResponse(200, ["message" => "Login successful", "user" => $_SESSION['user']]);
        } else {
            $this->sendResponse(401, ["message" => "Invalid credentials"]);
        }
    }
    

    public function register(): void {
        $data = json_decode(file_get_contents("php://input"), true);
    
        if (!isset($data['nom'], $data['email'], $data['password'])) {
            $this->sendResponse(400, ["message" => "Missing fields"]);
            return;
        }
    
        try {
            // Attempt to register the user using the service
            if ($this->service->register($data['nom'], $data['email'], $data['password'])) {
                session_start();
    
                // Fetch user ID after successful registration
                $userId = $this->service->getUserIdByEmail($data['email']);
                if ($userId) {
                    // Create the user session data
                    $_SESSION['user'] = [
                        'id' => $userId,
                        'nom' => $data['nom'],
                        'email' => $data['email'],
                        'role' => 'user'  // Default to user role
                    ];
                    $this->sendResponse(201, ["message" => "User registered successfully"]);
                } else {
                    $this->sendResponse(500, ["message" => "Failed to retrieve user ID"]);
                }
            } else {
                $this->sendResponse(409, ["message" => "Email already exists"]);
            }
        } catch (Exception $e) {
            // Catch any exceptions and return a clean error message
            $this->sendResponse(500, ["message" => "Internal server error: " . $e->getMessage()]);
        }
    }
    
    private function logout(): void {
        session_start();
        $_SESSION = []; 
        session_destroy(); 
        setcookie(session_name(), '', time() - 3600, '/'); 
        $this->sendResponse(200, ["message" => "Logout successful"]);
    }

    public function sendResponse(int $status, array $data): void {
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
