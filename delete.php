<?php
include("messages.php");

$id = $_POST['id'];

  $req = $db->prepare("DELETE FROM messages WHERE id = $id");
  $req->execute(); 
?>