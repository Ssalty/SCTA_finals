<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");

$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $idnumber = $data->idnumber;

    $host = "";
    $username = "";
    $password = "";
    $dbase = "";

    $connect = mysqli_connect($host, $username, $password, $dbase);

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $checkQuery = "SELECT * FROM userinfo WHERE userID = '$idnumber'";
    $result = mysqli_query($connect, $checkQuery);
    $info = $result;

    if (mysqli_num_rows($result) == 1) {
        $response = mysqli_fetch_row($result);
        echo json_encode($response);
    } else {
        echo "Not Registered!";
    }
    mysqli_close($connect);
} else {
    echo "No data received";
}
