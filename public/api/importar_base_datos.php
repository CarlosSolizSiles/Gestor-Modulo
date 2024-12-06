<?php
require_once __DIR__ . '/../lib/cors.php'; // habilitar cors al puerto 5173

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['dbfiles']) && $_FILES['dbfiles']['error'] == UPLOAD_ERR_OK) {
        // Ruta temporal del archivo subido
        $tmpFile = $_FILES['dbfiles']['tmp_name'];

        include "../lib/conn.php";
        
        // Leer el contenido del archivo SQL
        $sqlContent = file_get_contents($tmpFile);

        // Ejecutar el contenido SQL
        if ($conn->multi_query($sqlContent)) {
            // Esperar a que se ejecuten todas las consultas
            do {
                if ($result = $conn->store_result()) {
                    $result->free();
                }
            } while ($conn->more_results() && $conn->next_result());

            // Respuesta exitosa
            echo json_encode(["status" => "success", "message" => "Base de datos importada exitosamente"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error al importar la base de datos: " . $conn->error]);
        }

        // Cerrar la conexión
        $conn->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Error al cargar el archivo. Verifique e intente nuevamente."]);
    }
    exit;
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}
