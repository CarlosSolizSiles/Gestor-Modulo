<?php
require_once __DIR__ . '/../lib/cors.php'; // habilitar CORS al puerto 5173
require_once __DIR__ . '/../lib/logCreator.php'; // Importar la función createLog

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
            createLog('MODULE', "El módulo '$fileToMove' ha sido movido a la carpeta temporal.");
            return true;
        } else {
            createLog('MODULE', "Error al mover el módulo '$fileToMove' a la carpeta temporal.");
            return false;
        }
    } else {
        createLog('MODULE', "Intento de eliminar un paso no existente: paso '$pasoAEliminar'.");
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
            createLog('MODULE', "El paso '$pasoAEliminar' ha sido eliminado correctamente.");
            echo json_encode(["status" => "success", "message" => "El paso ha sido eliminado correctamente."]);
        } else {
            createLog('MODULE', "Error al eliminar el paso '$pasoAEliminar' o el paso no existe.");
            echo json_encode(["status" => "error", "message" => "Error al eliminar el paso o el paso no existe."]);
        }
    } else {
        createLog('MODULE', "El paso a eliminar no fue especificado.");
        echo json_encode(["status" => "error", "message" => "El paso a eliminar no fue especificado."]);
    }
} else {
    createLog('MODULE', "Método no permitido para la eliminación de pasos.");
    // Return error for unsupported request methods
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    http_response_code(405); // Method Not Allowed
}
