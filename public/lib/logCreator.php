<?php

/**
 * Crea un registro en el archivo `logs.txt`.
 *
 * @param string $action La acción realizada (por ejemplo, 'CREATE', 'UPDATE', 'DELETE').
 * @param string $message Un mensaje descriptivo de la acción.
 */
function createLog(string $action, string $message): void {
    $logFilePath = __DIR__ . '/logs.txt'; // Ruta del archivo de logs

    // Formato del log
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[{$timestamp}] [{$action}] {$message}" . PHP_EOL;

    // Escribir o añadir al archivo
    file_put_contents($logFilePath, $logEntry, FILE_APPEND | LOCK_EX);
}

?>
