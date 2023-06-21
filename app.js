$(document).ready(function () {
  $('#chat-form').submit(function (e) {
    e.preventDefault();
    var message = $('#chat-input').val();
    sendMessage(message);
    $('#chat-input').val('');
  });

  function sendMessage(message) {
    // Use AJAX to send message to server
    console.log("Sent : " + message);
    sendMessageToServer(message);
  }
});


function getMessageFromServer() {
  $.ajax({
    type: 'POST',
    url: 'messages.php',
    CORS: true,
    cache: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    success: function (response) {
      // Handle successful message send
      var messages = JSON.parse(response);
      
      //Display the messages
      $('#chat-messages').empty();
      messages.reverse();
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].message === '') continue;
        $('#chat-messages').append(messages[i].message + ' <input id="edit-button" type="button" value="Edit" onclick="editMessage('+ messages[i].id+')">     <input id="delete-button" type="button" value="Delete" onclick="deleteMessage('+ messages[i].id+')"><br/>');
      }
    },
    error: function (xhr, status, error) {
      // Handle error
      console.log(status + " : " + error);
    }
  });
}

function getMessages() {
  getMessageFromServer()
  console.log("liste des messages:");
  setTimeout(getMessages, 2000);
}
getMessages();

function sendMessageToServer(message) {
  $.ajax({
    type: 'POST',
    url: 'index.php',
    data: { message: message },
    CORS: true,
    cache: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    success: function (response) {
      // Handle successful message send
      var messages = JSON.parse(response);
      $('#chat-messages').empty();
      messages.reverse();
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].message === '') continue;
        $('#chat-messages').append(messages[i] + '<br/>');
      }
    },
    error: function (xhr, status, error) {
      // Handle error
      console.log(status + " : " + error);
    }
  });
}

//Delete a message
function deleteMessage(id) {
  deleteMessageToServer(id);
  console.log("Deleting message + message id: " + id);
}

function deleteMessageToServer(id) {
  $.ajax({
    type: "POST",
    url: 'delete.php',
    data: {id, id},
    CORS: true,
    cache: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    success: function (response) {
      // Handle successful message deletion
      $('#chat-messages'+id).remove();
      // Handle successful message send
      var messages = JSON.parse(response);
      
      //Display the messages
      $('#chat-messages').empty();
      messages.reverse();
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].message === '') continue;
        $('#chat-messages').append(messages[i].message + ' <input id="edit-button" type="button" value="Edit" onclick="editMessage('+ messages[i].id+')">     <input id="delete-button" type="button" value="Delete" onclick="deleteMessage('+ messages[i].id+')"><br/>');
      }
    },
    error: function (xhr, status, error) {
      // Handle error
      console.log(status + " : " + error);
    }
  })
}

//Edit a message
function editMessage(id) {
  var message = $('#chat-input').val();
  let newMessage = prompt("Edit Message : ", message);
  if(newMessage != null) {
    editMessageToServer(id, newMessage);
  }
console.log("Message edited : ", newMessage + "\n" + id);
}

function editMessageToServer(id, newmessage) {
  console.log(newmessage)
  $.ajax({
    type: "POST",
    url: "edit.php",
    data: {id: id, newmessage: newmessage},
    success: function(response) {
      // console.log(response);
      // if(response.success) {  
      //   var updatedMessage = response.updatedMessage;
      //   var messageElement = $("#chat-messages" + id);
  
      //   messageElement.find("#chat-messages").text(updatedMessage);
      //   alert("Your message has been updated");

      //   $("#chat-messages").find("input[id='edit-message']").val(updatedMessage);
  
      //   $('#chat-messages'+id).remove();
      //   // Handle successful message send
      //   var messages = JSON.parse(response);
        
      //   //Display the messages
      //   $('#chat-messages').empty();
      //   messages.reverse();
      //   for (var i = 0; i < messages.length; i++) {
      //     if (messages[i].message === '') continue;
      //     $('#chat-messages').append(messages[i].message + ' <input id="edit-button" type="button" value="Edit" onclick="editMessage('+ messages[i].id+')">     <input id="delete-button" type="button" value="Delete" onclick="deleteMessage('+ messages[i].id+')"><br/>');
      //   }
      // }

    }, 
    error: function(status, error) {
      console.log(status + ": " + error);
    }
  })

}