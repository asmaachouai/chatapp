$(document).ready(function() {
    var currentUser = prompt("Enter your username:");

    // Function to update chat messages
    function updateChat() {
        $.ajax({
            url: 'chatlist.php',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                $('#messages').empty();
                $.each(response, function(index, message) {
                    $('#messages').append('<p class="mb-1">' + message.username + ': ' + message.message + ' - ' + message.date + '</p>');
                });
            }
        });
    }

    // Initial chat update
    updateChat();

    // Form submit event
    $('#message-form').submit(function(event) {
        event.preventDefault();
        var message = $('#message-input').val();
        $.ajax({
            url: 'chatlist.php',
            method: 'POST',
            data: { message: message, username: currentUser },
            success: function() {
                updateChat();
                $('#message-input').val('');
            }
        });
    });

    // Reset chat button click event
    $('#reset-btn').click(function() {
        $.ajax({
            url: 'chatlist.php?reset=true',
            success: function() {
                updateChat();
            }
        });
    });

    // Periodic chat update
    setInterval(updateChat, 4000);
});

