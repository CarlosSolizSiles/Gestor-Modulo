<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['archivo_json']) && $_FILES['archivo_json']['error'] == 0) {
        // Verificamos que el archivo sea un JSON
        $fileType = mime_content_type($_FILES['archivo_json']['tmp_name']);
        $fileExtension = pathinfo($_FILES['archivo_json']['name'], PATHINFO_EXTENSION);

        if (strtolower($fileExtension) !== 'json') {
            echo json_encode(["status" => "error", "message" => "El archivo debe ser un JSON."]);
            exit;
        }

        // Definimos la carpeta pública donde se guardará el archivo
        $directorioDestino = '../public/';
        if (!is_dir($directorioDestino)) {
            mkdir($directorioDestino, 0777, true);
        }

        // Guardamos el archivo JSON en la carpeta pública
        $nombreArchivo = 'menu.json';
        $rutaDestino = $directorioDestino . $nombreArchivo;

        if (move_uploaded_file($_FILES['archivo_json']['tmp_name'], $rutaDestino)) {
            echo json_encode(["status" => "success", "message" => "El archivo JSON se ha guardado correctamente en la carpeta pública."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error al mover el archivo a la carpeta pública."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Hubo un error al subir el archivo."]);
    }
    exit;
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}
