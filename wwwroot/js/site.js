// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
// Write your Javascript code.
//GetPost();

var ProfileUserName;
var MyExternalId;
GetId();
function GetId() {
    $.ajax({
        type: "GET",
        url: "GetExternalId",
        data: "",
        dataType: "Text",
        success: function (msg) {
            console.log(msg);
            MyExternalId = msg;
        },
        error: function (req, status, error) {
            console.log(error);
        }
    });
}
function GetHomePosts() {
    $.ajax({
        type: "GET",
        url: "Post/GetHomePosts",
        data: "",
        dataType: "JSON",
        success: function (msg) {
            console.log(msg);
            var posts = msg;
            for (var c = posts.length - 1; c >= 0; c--) {
                LoadCard(posts[c]);
            }
        },
        error: function (req, status, error) {
            console.log(error);
        }
    });
}
function GetProfilePost(UserName, CurrentIndex) {
    $.ajax({
        type: "GET",
        url: "/Post/GetPost",
        data: {
            'UserName': UserName,
            'CurrentIndex': CurrentIndex,
        },
        dataType:"JSON",
        success: function (msg) {
            console.log(msg);
            var posts = msg;
            for (var c = posts.length-1; c >=0 ; c--) {
                LoadCard(posts[c]);
            }
        },
        error: function (req, status, error) {
            console.log(error);
        }
    });
}
function FollowUser(UserName) {
    $.ajax({
        type: "POST",
        url: "Follow",
        data: {
            'UserName': UserName
        },
        dataType:"JSON",
        success: function (msg) {
            
        },
        error: function (req, status, error) {
            console.log(error);
        }
    });
}

function LoadCard(post) {
    var cardString = '<div class="bg-gray-100 p-4"> ' +
        '                <div class="bg-white border flex justify-center rounded-sm w-full"> ' +
        '                    <div class="max-w-md"> ' +
        '                        <div class="flex items-center px-4 py-3"> ' +
        '                            <img class="h-8 w-8 rounded-full" src="' + post.profilePictureUrl + '"/> ' +
        '                            <div class="ml-3 "> ' +
        '                                <span class="text-sm font-semibold antialiased block leading-tight">' + ProfileUserName + '</span> ' +
        '                                <span class="text-gray-600 text-xs block">Asheville, North Carolina</span> ' +
        '                            </div>                             ' +
        '                        </div>                         ' +
        '                        <div class="img-carousel"> ';

    for (var c = 0; c < post.medias.length; c++) {
            if (post.medias[c].mediaType == 0) {
                cardString += '<img class="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700" src="' + post.medias[c].url + '"/> ';
            }
            else if (post.medias[c].mediaType == 1) {
                cardString += '<video class="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700" controls > <source src="' + post.medias[c].url + '" type="video/mp4"><source src="' + post.medias[c].url + '" type="video/ogg"></video>';
            }
        }
    cardString += '                        </div>                         ' +
        '                        <div class="flex items-center justify-between mx-4 mt-3 mb-2"> ' +
        '                            <div class="flex gap-5"> ' +
        '                                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"> ' +
        '                                    <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>                                     ' +
        '                                </svg>                                 ' +
        '                                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"> ' +
        '                                    <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path>                                     ' +
        '                                </svg>                                 ' +
        '                            </div>                             ' +
        '                        </div>                         ' +
        '                        <p style="word-wrap: break-word" class="font-semibold text-sm">' + post.description + '</p>                         ' +
        '                        <div class="font-semibold text-sm mx-4 mt-2 mb-4">92,372 likes</div>                         ' +
        '                    </div>                     ' +
        '                </div>                 ' +
        '            </div>';
    $(".CardsContainer").append(cardString);
    $(document).ready(function () {
        $('.img-carousel').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: false,
            nextArrow: false
        });
    });
$('video').each(function () {
    if ($(this).is(":in-viewport")) {
        $(this)[0].play();
    } else {
        $(this)[0].pause();
    }
})
}

function SendMessage(eUserId = "") {
    var message = document.getElementById("typedMessage").value; 
    var messagePacket = new MessagePacket();
    messagePacket.message = message;
    messagePacket.externalUserId = eUserId;
    messagePacket.packetType = 0;
    socket.send(JSON.stringify(messagePacket));
    console.log(JSON.stringify(messagePacket));
}
function GetUsername(id) {
    $.ajax({
        type: "GET",
        url: "Messages/GetUsername",
        data: {
            'externalUserId': id
        },
        dataType: "text",
        success: function (msg) {
            console.log(msg);
            console.log("chat-display-text-" + id);
            document.getElementById("chat-display-text-" + id).innerHTML = msg;
        },
        error: function (req, status, error) {
            console.log(error);
        }
    });
}
var Chats;
function GetChats() {
    $.ajax({
        type: "GET",
        url: "Messages/GetChats",
        data: {},
        dataType: "JSON",
        success: function (msg) {
            console.log(msg);
            Chats = msg;
            DisplayChats(msg);
        },
        error: function (req, status, error) {
            console.log(error);
        }
    });
}
function DisplayChats(chatList) {
    console.log("DISPLYAIG");
    for (var c = 0; c < chatList.length; c++) {
        var chat = chatList[c];
        var onclickString = `onclick = "DisplayChatMessages('` + chat.externalUserId + `')"`;
        var myvar = '<div class="px-3 pt-1 mt-1 flex border-gray-500 border-b">' +
            '        <img src="' + chat.profilePictureUrl + '" class=" w-12 h-12 rounded-full" alt="dp" />' +
            '        <div ' + onclickString + ' class="flex flex-wrap ml-4 pb-4 w-full">' +
            '            <div class="inline-flex justify-between w-full font-bold">' +
            '<p id = "chat-display-text-' + chat.externalUserId + '"> </p>' +
            '                <span class="inline-flex items-center font-normal text-gray-400 text-xs">' +
            '                    today' +
            '                </span>' +
            '            </div>' +
            '            <div class="inline-flex w-full text-sm text-gray-500">lorem ipsum</div>' +
            '        </div>' +
            '    </div>';
        $(".messages_unopen").append(myvar);
        GetUsername(chat.externalUserId);
    }
}

function DisplayChatMessages(id) {
    console.log(id);
    document.getElementById("chats-display").style.display = "none";
    document.getElementById("message-display").style.display = "block";
    document.getElementById("messages-container").innerHTML = "";
    document.getElementById("typedMessageButton").onclick = function () { SendMessage(id) };

    var ChatTempArray = Chats.filter(function (item) { return (item.externalUserId == id); });
    var ChatTemp;
    if (ChatTempArray.length > 0) {
        ChatTemp = ChatTempArray[0];
    }
    else {
        return;
    }
    for (var c = 0; c < ChatTemp.chatMessages.length; c++) {
        console.log(ChatTemp.chatMessages[c].ownerExtrnalId);
        if (ChatTemp.chatMessages[c].ownerExtrnalId == MyExternalId) {
            var myMessage = '<div class="clearfix">' +
                '                <div class="bg-yellow-400 float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">' + ChatTemp.chatMessages[c].message + '</div>' +
                '            </div>';
            $("#messages-container").append(myMessage);
        }
        else {
            var recipientMessage = '<div class="clearfix">' +
                '                <div class="bg-gray-400 w-3/4 mx-4 my-2 p-2 rounded-lg">' + ChatTemp.chatMessages[c].message + '</div>' +
                '            </div>';
            $("#messages-container").append(recipientMessage);
        }
    }
}
function closeMessagesDiasplay() {
    document.getElementById("chats-display").style.display = "block";
    document.getElementById("message-display").style.display = "none";
    document.getElementById("messages-container").innerHTML = "";
    document.getElementById("typedMessage").value = "";
    document.getElementById("typedMessageButton").onclick = "";
}

var ChatModel = {
    "profilePictureUrl": null,
    "externalUserId": null,
    "userName": null,
    "chatMessages": null
}
var ChatMessage = {
    "ownerExtrnalId": null,
    "message": null,
    "timeSent": "0001-01-01T00:00:00"
}
function MessagePacket() {
    this.packetType = 0;
    this.externalUserId = "";
    this.message = "";
}