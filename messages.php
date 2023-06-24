<?php
  // Connect to database
  $db = new PDO('mysql:host=localhost;dbname=chat', 'root', 'Password34');

  // Retrieve latest messages from database
  $stmt = $db->prepare("SELECT * FROM messages ORDER BY id DESC");
  $stmt->execute();
  $messages = $stmt->fetchAll();
  
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

  // Return latest messages
  echo json_encode($messages);

  
?>