<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");

$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $idnumber = $data->idnumber;
    $cname = $data->cname;
    $address = $data->address;
    $number = $data->number;
    $email = $data->email;

    $host = "";
    $username = "";
    $password = "";
    $dbase = "";

    $connect = mysqli_connect($host, $username, $password, $dbase);

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $checkQuery = "SELECT userID FROM userinfo WHERE userID = '$idnumber'";
    $result = mysqli_query($connect, $checkQuery);

    if (mysqli_num_rows($result) == 1) {
        echo json_encode("ID number already exists in the database");
    } else {
        $send = "INSERT INTO userinfo (userID, cName, address, number, email) 
                VALUES ('$idnumber', '$cname', '$address', '$number', '$email')";

        if (!mysqli_query($connect, $send)) {
            echo mysqli_error($connect);
        } else {
            echo "Data inserted successfully";
        }
    }

    mysqli_close($connect);
} else {
    echo "No data received";
}
