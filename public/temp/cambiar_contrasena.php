<?php
// Configuración de la base de datos
include "../lib/conn.php"; // Asegúrate de que esta conexión usa mysqli

// Encabezados CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Manejo de la solicitud preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['nueva_email']) && isset($data['nueva_password']) && isset($data['confirmar_password']) && isset($data['user_id'])) {
    $nuevaEmail = $data['nueva_email'];
    $nuevaPassword = $data['nueva_password'];
    $confirmarPassword = $data['confirmar_password'];
    $id_user = $data['user_id'];

    if ($nuevaPassword === $confirmarPassword) {
        $nuevaPasswordHashed = password_hash($nuevaPassword, PASSWORD_BCRYPT);

        // Preparar la declaración SQL
        $stmt = $conn->prepare("UPDATE usuarios SET email = ?, password = ? WHERE id = ?");
        $stmt->bind_param("sss", $nuevaEmail, $nuevaPasswordHashed, $id_user);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Usuario actualizado correctamente"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error al actualizar el usuario"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Las contraseñas no coinciden"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Faltan datos en la solicitud"]);
}

$conn->close();
