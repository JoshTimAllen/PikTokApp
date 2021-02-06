var socket = new WebSocket("ws://localhost:1000/chat");

socket.onopen = function (e) {
    // alert("[open] Connection established");
    // alert("Sending to server");
};

socket.onmessage = function (event) {
    console.log(event.data);
    var messageData = JSON.parse(event.data);
    if (messageData.externalUserId == MyExternalId) {
        var myMessage = '<div class="clearfix">' +
            '                <div class="bg-yellow-400 float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">' + messageData.message + '</div>' +
            '            </div>';
        $("#messages-container").append(myMessage);
    }
    else {
        var recipientMessage = '<div class="clearfix">' +
            '                <div class="bg-gray-400 w-3/4 mx-4 my-2 p-2 rounded-lg">' + messageData.message + '</div>' +
            '            </div>';
        $("#messages-container").append(recipientMessage);
    }
};

socket.onclose = function (event) {
    if (event.wasClean) {
        //alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
    }
};

socket.onerror = function (error) {
    //alert(`[error] ${error.message}`);
};

var messageType = {

}