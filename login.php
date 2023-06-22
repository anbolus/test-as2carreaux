<?php
$db = new PDO('mysql:host=localhost;dbname=chat', 'root', 'Password34');

define('tableName', 'users');
$userData = $_POST;

loginUser($db, $userData);

function loginUser($db, $userData) {
    $username = $userData['username'];
    $password = $userData['password'];

    if(!empty($username) && !empty($password)) {
        $req = "SELECT username, password FROM ".tableName;
        $req .= " WHERE username = '$username' AND password = '$password'";
        $stmt = $db->prepare($req);
        $stmt->execute();
        $res = $stmt->fetchAll();
        if( sizeof($res) > 0) {
            session_start();
            $_SESSION['userId'] = $username;
            //header("Location: app.html");
            
        } else {
            echo json_encode(["error", "wrong username or password"]);
        }
    } else {
        echo json_encode(["error", "All fields are required"]);
    }
    echo json_encode(["success",$username]);
}
?>