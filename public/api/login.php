<?php
require_once __DIR__ . '/../JWT/JWT.php'; // Ajusta si es necesario
use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Clave secreta para firmar el token
$secretKey = "your_secret_key";

// Conexión a la base de datos
$dsn = 'mysql:host=localhost;dbname=pruebaspiris;charset=utf8';
$username = 'root';
$password = '';

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error de conexión a la base de datos"]);
    exit();
}

// Decodifica la solicitud JSON
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    // Consulta a la base de datos para validar credenciales
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE username = :username LIMIT 1");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verifica la contraseña
    if ($user && password_verify($password, $user['pass'])) {
        // Genera el token JWT
        $payload = [
            "iss" => "http://tudominio.com",  // Emisor
            "iat" => time(),                  // Hora en la que se generó el token
            "exp" => time() + 3600,           // Expiración del token (1 hora)
            "data" => [
                "id" => $user['id'],
                "username" => $user['username']
            ]
        ];
        $jwt = JWT::encode($payload, $secretKey, 'HS256');

        echo json_encode(["success" => true, "token" => $jwt]);
    } else {
        echo json_encode(["success" => false, "message" => "Credenciales incorrectas"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Faltan datos"]);
}
