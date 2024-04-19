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

$sql = "SELECT * FROM userinfo";
$result = $connect->query($sql);

$data = [];

if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        // Add row data to the $data array
        $data[] = $row;
    }
} else {
    echo "0 results";
}

mysqli_close($connect);
echo json_encode($data);
