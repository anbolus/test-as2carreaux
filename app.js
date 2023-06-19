$(document).ready(function() {
    $('#chat-form').submit(function(e) {
      e.preventDefault();
      var message = $('#chat-input').val();
      sendMessage(message);
      $('#chat-input').val('');
    });
  
    function sendMessage(message) {
      // Use AJAX to send message to server
      console.log("Sent : "+message);
      sendMessageToServer(message);

    }
  });

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
      success: function(response) {
          // Handle successful message send
          console.log("Success "+response);
      },
      error: function(xhr, status, error) {
          // Handle error
          console.log(status+" : "+error);
      }
    });
  }