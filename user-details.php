<?php 

session_start();

$userId = $_SESSION['user_id'];
include_once("index.php");

define('tableName', "users");

if(!$userId) {
    header("Location: index.php");
}

function getUserById() {
    global $db;
    $userId = $_SESSION["user_id"];
    $data = [];

    $query = "SELECT username FROM".tableName;
    $query .= "WHERE username = '$userId'";

    $res = $db->query($query);

    if($res-> num_rows > 0) {
        $data = $res->fetch_assoc();
    } else {
        header("location:index.php");
    }
    return $data;
}
?>