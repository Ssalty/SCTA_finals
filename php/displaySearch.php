<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");

$host = "";
$username = "";
$password = "";
$dbase = "";

$connect = mysqli_connect($host, $username, $password, $dbase);

if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $jsonData = json_decode(file_get_contents('php://input'), true); // Parse JSON data

    if (isset($jsonData["search"])) {
        $search = $jsonData["search"];
        $sql = "SELECT * FROM userinfo WHERE CONCAT(userID, ' ',cName, ' ', address, ' ', number, ' ', email) LIKE ?";
        $stmt = $connect->prepare($sql);
        $searchParam = "%{$search}%";
        $stmt->bind_param("s", $searchParam);
        $stmt->execute();
        $result = $stmt->get_result();

        $data = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data);
    } else {
        echo "Missing search parameter"; // Handle missing data if needed
    }
} else {
    echo "Invalid request method"; // Handle non-POST requests if needed
}

mysqli_close($connect);
