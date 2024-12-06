<?php
require_once __DIR__ . '/../lib/cors.php'; // habilitar cors al puerto 5173

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit; // Stop processing for preflight request
}

// Function to move a module to a temp folder based on step
function eliminarPaso($pasoAEliminar)
{
    // List of modules (PHP files)
    $modulos = [
        "./cambiar_contrasena.php",
        "./importar_base_datos.php",
        "./importar_menu.php",
        // Add more modules as needed
    ];

    if (isset($modulos[$pasoAEliminar])) {
        $fileToMove = $modulos[$pasoAEliminar];
        $tempDir = "../temp/";

        // Check if the temp directory exists, if not, create it
        if (!is_dir($tempDir)) {
            mkdir($tempDir, 0777, true);
        }

        // Define the target path in the temp folder
        $newPath = $tempDir . basename($fileToMove);

        // Attempt to move the file
        if (file_exists($fileToMove) && rename($fileToMove, $newPath)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// Handling POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve step to delete from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['step'])) {
        $pasoAEliminar = (int)$data['step']; // Ensure it's an integer

        if (eliminarPaso($pasoAEliminar)) {
            echo json_encode(["status" => "success", "message" => "El paso ha sido eliminado correctamente."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error al eliminar el paso o el paso no existe."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "El paso a eliminar no fue especificado."]);
    }
} else {
    // Return error for unsupported request methods
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    http_response_code(405); // Method Not Allowed
}
