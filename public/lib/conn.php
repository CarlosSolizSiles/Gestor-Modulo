<?php
$host = 'localhost';
$dbname = 'panol';  // Cambia esto por el nombre de tu base de datos
$user = 'root';             // Cambia esto por tu usuario de MySQL
$password = 'root';     // Cambia esto por tu contraseña de MySQL

// Conexión a MySQL
$conn = new mysqli($host, $user, $password, $dbname);
