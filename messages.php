<?php
  // Connect to database
  $db = new PDO('mysql:host=localhost;dbname=chat', 'root', 'Password34');
  // Retrieve latest messages from database
  $stmt = $db->prepare("SELECT message FROM messages ORDER BY id DESC LIMIT 10");
  $stmt->execute();
  $messages = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

  // Return latest messages
  echo json_encode($messages);
?>