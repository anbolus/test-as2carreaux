$(docuement).on('submit', '#login-form', function(e) {
    e.preventDefault();

    $.ajax({
        method: 'POST',
        url: 'login.php',
        data: $(this).serialize(),
        success: function(response) {
            if (response == "success") {
                window.location.href="app.html";
            } else {
                console.log(response);
                $('#login-form').find('input').val('');
            }
        }
    });
});