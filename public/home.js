$(function () {
    let roomId;

    $.get('/api/rooms', data => {
        let roomNames = `<ul class="list-group">`;
        data.forEach(room => {
            roomNames += `<li class="list-group-item" data-room-id="${room.id}"><a href="#">${room.name}</a></li>`;
        });
        roomNames += `</ul>`;
        $('#rooms').append(roomNames);
        roomId = $('.list-group-item')[0].getAttribute("data-room-id");
        getMessages();
        $('#roomName').html(`Messages for ${$('.list-group-item')[0].innerText}`);
    });

    function getMessages () {
        $('#messages').empty();
        $.get(`/api/rooms/${roomId}/messages`, data => {
            data.forEach(message => $('#messages').append(message.text + '\n'));
        });
    }

    $('#rooms').on("click", 'li', function (evt) {
        $('#messages').empty();
        roomId = $(this).data('roomId');
        $.get(`/api/rooms/${roomId}/messages`, data => {
            data.forEach(message => $('#messages').append(message.text + '\n'));
        });
        $('#roomName').html(`Messages for ${evt.target.innerHTML}`);
    });

    $('#delete').click(function () {
        console.log(this);
        $.ajax({
            url: `/api/rooms/${roomId}/messages`,
            type: "DELETE",
            success: function(result) {
                $('#messages').empty();
            }
        });
    });

    $('#post').click(function () {
        $.ajax({
            type: "POST",
            url: `/api/rooms/${roomId}/messages`,
            contentType: "application/json",
            data: JSON.stringify({text: $('#postMessages').val()})
        });
        getMessages();
        $('#postMessages').val("");
    });

});