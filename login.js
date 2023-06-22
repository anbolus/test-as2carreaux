$(document).on('submit', '#login-form', function(e) {
    e.preventDefault();

    $.ajax({
        method: 'POST',
        url: 'login.php',
        data: $(this).serialize(),
        success: function(response) {
            var res = JSON.parse(response);
            console.log(res[0]);
            if (res[0] == "success") {
                localStorage.setItem('user', res[1]);
                window.location.href="app.html";
            } else {
           
                $('#login-form').find('input').val('');
            }
        }
    });
});