
$(document).ready(function () {
    $('#logout').on('click', function () {
        var token = localStorage.getItem("token");
        console.log('Token = ' + token);
        var data = {
            token: token
        }
        $.ajax({
            url: url.logout,
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (res) {
                var data = JSON.stringify(res);
                console.log('Return = ' + data);

                _working = false;
                localStorage.removeItem('token');
                localStorage.clear();
                window.location.replace('/');
               
                
            },
            error: function (err) {
                console.log('Error:' + JSON.stringify(err));
                _working = false;
            }
        });
    })
});
