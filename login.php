<?php

$UsrBD = ($_GET["usuario"]);
$CodigoBD = ($_GET["codigo"]);

$servername = "192.168.0.35";
$username = "root";
$password = "root";
$dbname = "ResidencialBD";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id FROM Usuarios WHERE (Usuario ='$UsrBD' AND Codigo='$CodigoBD')";

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    echo "Existe";
}

else {
    echo "No existe";
}

$conn->close();

?>
