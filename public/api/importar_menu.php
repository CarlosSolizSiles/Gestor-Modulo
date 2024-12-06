<?php
require_once __DIR__ . '/../lib/cors.php'; // habilitar CORS al puerto 5173
require_once __DIR__ . '/../lib/logCreator.php'; // Importar la función createLog

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['archivo_json']) && $_FILES['archivo_json']['error'] == 0) {
        // Verificamos que el archivo sea un JSON
        $fileExtension = pathinfo($_FILES['archivo_json']['name'], PATHINFO_EXTENSION);

        if (strtolower($fileExtension) !== 'json') {
            createLog('UPLOAD', 'El archivo no es un JSON. Extensión proporcionada: ' . $fileExtension);
            echo json_encode(["status" => "error", "message" => "El archivo debe ser un JSON."]);
            exit;
        }

        // Leemos el contenido del archivo subido
        $contenidoJSON = file_get_contents($_FILES['archivo_json']['tmp_name']);
        $datos = json_decode($contenidoJSON, true);

        // Verificamos si el contenido es un arreglo válido
        if (json_last_error() !== JSON_ERROR_NONE || !is_array($datos)) {
            createLog('UPLOAD', 'El contenido del archivo no es un arreglo JSON válido.');
            echo json_encode(["status" => "error", "message" => "El contenido del archivo no es un arreglo JSON válido."]);
            exit;
        }

        // Definimos la carpeta y el nombre del archivo PHP
        $directorioDestino = '../lib/';
        if (!is_dir($directorioDestino)) {
            mkdir($directorioDestino, 0777, true);
        }

        $nombreArchivoPHP = 'menu.php';
        $rutaDestino = $directorioDestino . $nombreArchivoPHP;

        // Convertimos el arreglo a formato JSON y luego generamos el script
        $contenidoJS = "<script>\nvar menu = " . json_encode($datos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . ";\n</script>";

        // Guardamos el contenido en el archivo PHP
        if (file_put_contents($rutaDestino, $contenidoJS) !== false) {
            createLog('UPLOAD', "El archivo PHP se ha guardado correctamente como 'menu.php'.");
            echo json_encode(["status" => "success", "message" => "El archivo PHP se ha guardado correctamente como 'menu.php'."]);
        } else {
            createLog('UPLOAD', 'Error al guardar el archivo PHP.');
            echo json_encode(["status" => "error", "message" => "Error al guardar el archivo PHP."]);
        }
    } else {
        createLog('UPLOAD', 'Hubo un error al subir el archivo.');
        echo json_encode(["status" => "error", "message" => "Hubo un error al subir el archivo."]);
    }
    exit;
} else {
    createLog('UPLOAD', 'Método no permitido.');
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}
