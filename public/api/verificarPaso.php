<?php
include "../lib/checkFileExists.php";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Function to verify the step
function verificarPaso()
{
    // List of modules (PHP files)
    $modulos = [
        "./cambiar_contrasena.php",
        "./importar_base_datos.php",
        "./importar_menu.php",
    ];
    for ($i = 0; $i < count($modulos); $i++) {
        $file = $modulos[$i];

        // Use checkFileExists to verify if the module file exists
        if (checkFileExists($file)) {
            return $i;
        }
    }

    return -1;
}

// Prepare JSON response
$response = [
    "status" => "success",
    "step" => verificarPaso(),
];

// Output JSON response
header('Content-Type: application/json');
echo json_encode($response);
