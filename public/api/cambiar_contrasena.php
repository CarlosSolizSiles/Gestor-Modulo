<?php
// Configuración de la base de datos
include "../lib/conn.php"; // Asegúrate de que esta conexión usa mysqli

require_once __DIR__ . '/../lib/cors.php'; // habilitar CORS al puerto 5173
require_once __DIR__ . '/../lib/logCreator.php'; // Importar la función createLog

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
            // Log de éxito
            createLog('USER', "El usuario con ID '$id_user' ha sido actualizado correctamente.");
            echo json_encode(["status" => "success", "message" => "Usuario actualizado correctamente"]);
        } else {
            // Log de error
            createLog('USER', "Error al actualizar el usuario con ID '$id_user'.");
            echo json_encode(["status" => "error", "message" => "Error al actualizar el usuario"]);
        }

        $stmt->close();
    } else {
        // Log de error de contraseñas no coincidentes
        createLog('USER', "Las contraseñas no coinciden para el usuario con ID '$id_user'.");
        echo json_encode(["status" => "error", "message" => "Las contraseñas no coinciden"]);
    }
} else {
    // Log de falta de datos en la solicitud
    createLog('USER', "Faltan datos en la solicitud para actualizar el usuario.");
    echo json_encode(["status" => "error", "message" => "Faltan datos en la solicitud"]);
}

$conn->close();
