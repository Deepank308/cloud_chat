import axios from "axios"

/**
 * Join Server  
 */
document.getElementById('join_server').addEventListener('click', function (event) {
    console.log('Clicked join server');

    var loginForm = document.getElementById('login_form');
    var username = loginForm.elements['username'].value;
    var password = loginForm.elements['password'].value;
    var serverId = '1010';

    // To Do :  Check if the fields are empty

    /*
        This will take the user to the chatroom for which the serverId will be provided by the user
        Currently serverId has been set to default as '1010'

        To Do : Authentication of username and password
        To Do : Authorization of serverId
    */
    loginForm.action = `/chatroom/${serverId}`;
    console.log(serverId);
    loginForm.submit();

});

/**
 * Create Server
 */
document.getElementById('create_server').addEventListener('click', function (event) {
    console.log('Clicked Create server');

    var loginForm = document.getElementById('login_form');
    var username = loginForm.elements['username'].value;
    var password = loginForm.elements['password'].value;
    var serverId = '1010';

    // To Do :  Check if the fields are empty

    /*
        This will take the user to the chatroom for which the serverId will be provided by the user
        Currently serverId has been set to default as '1010'

        To Do : Authentication of username and password
        To Do : Authorization of serverId
    */
    loginForm.action = `/chatroom/${serverId}`;
    console.log(serverId);
    loginForm.submit();

});
