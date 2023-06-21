<?php
include("user-details.php");
// Connect to database
  $db = new PDO('mysql:host=localhost;dbname=chat', 'root', 'Password34');

  // Retrieve message from client
  $message = $_POST['message'];
  
  // Insert message into database
  $stmt = $db->prepare("INSERT INTO messages (message) VALUES (:message)");
  $stmt->execute(array(':message' => $message));

  // Retrieve latest messages from database
  $stmt = $db->prepare("SELECT message FROM messages ORDER BY id DESC");
  $stmt->execute();
  $messages = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

  // Return latest messages
  echo json_encode($messages);

  $userDetails = getUserById();
  $username = $userDetails['username'];
  $password = $userDetails['password'];

  
?>