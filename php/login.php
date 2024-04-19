<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");

$data = json_decode(file_get_contents("php://input"));

date_default_timezone_set('Asia/Manila');
$date = date("Y-m-d H:i:s");

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
        $checkQuery = "SELECT Checkout FROM userattendance WHERE userID = '$idnumber' AND Checkout IS NULL";
        $result = mysqli_query($connect, $checkQuery);
        if (mysqli_num_rows($result) == 1) {
            $send = "UPDATE userattendance SET Checkout ='$date' WHERE userID = '$idnumber' AND Checkout IS NULL";

            if (!mysqli_query($connect, $send)) {
                echo mysqli_error($connect);
            } else {
                echo "Data inserted successfully";
            }
        } else {
            $send = "INSERT INTO userattendance (userID, Checkin) 
                VALUES ('$idnumber', '$date')";
            if (!mysqli_query($connect, $send)) {
                echo mysqli_error($connect);
            } else {
                echo "Data inserted successfully";
            }
        }
    } else {
        echo "Not Registered!";
    }
    mysqli_close($connect);
} else {
    echo "No data received";
}
