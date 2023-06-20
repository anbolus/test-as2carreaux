<?php
  // Connect to database
  $db = new PDO('mysql:host=localhost;dbname=chat', 'root', 'Password34');

  // Retrieve latest messages from database
  $stmt = $db->prepare("SELECT * FROM messages ORDER BY id DESC");
  $stmt->execute();
  $messages = $stmt->fetchAll();

  // Return latest messages
  echo json_encode($messages);
?>