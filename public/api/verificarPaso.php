<?php
require_once __DIR__ . '/../lib/cors.php'; // habilitar cors al puerto 5173
include "../lib/checkFileExists.php";
require_once __DIR__ . '/../lib/logCreator.php'; // Importar la función createLog

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
            // Registrar el archivo encontrado
            createLog('CHECK', "El archivo '{$file}' existe y es válido.");
            return $i;
        } else {
            // Registrar el archivo no encontrado
            createLog('CHECK', "El archivo '{$file}' no se encontró.");
        }
    }

    // Registrar que no se encontró ningún archivo
    createLog('CHECK', 'No se encontró ningún módulo válido.');
    return -1;
}

// Prepare JSON response
$response = [
    "status" => "success",
    "step" => verificarPaso(),
];

// Registrar la respuesta JSON
createLog('RESPONSE', 'Respuesta enviada: ' . json_encode($response));

// Output JSON response
header('Content-Type: application/json');
echo json_encode($response);
