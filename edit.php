<?php

$db = new PDO('mysql:host=localhost;dbname=chat', 'root', 'Password34');
$newMessage = $_POST['newmessage'];
$id = $_POST['id'];

$reqEdit = $db->prepare("UPDATE messages SET message = '$newMessage' WHERE id = $id");
?>