<?php
require_once __DIR__ . '/../lib/cors.php'; // habilitar cors al puerto 5173
require_once __DIR__ . '/../lib/conn.php'; // Incluye la conexión
require_once __DIR__ . '/../JWT/JWT.php'; // Ajusta si es necesario
use Firebase\JWT\JWT;

header("Content-Type: application/json");

// Clave secreta para firmar el token
$secretKey = "your_secret_key";

// Decodifica la solicitud JSON
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    // Consulta a la base de datos para validar credenciales
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ? LIMIT 1");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    // Verifica la contraseña
    if ($user && password_verify($password, $user['password'])) { // Cambiar a password_verify si usas hash
        // Genera el token JWT
        $payload = [
            "iss" => "http://tudominio.com",  // Emisor
            "iat" => time(),                  // Hora en la que se generó el token
            "exp" => time() + 3600,           // Expiración del token (1 hora)
            "data" => [
                "id" => $user['id'],
                "name" => $user['nombre'],
                "email" => $user['email'],
                "rol" => $user['rol']
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