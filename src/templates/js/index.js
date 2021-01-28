import axios from "axios"

const _baseUrl = 'http://localhost:1234/';
const PORT = process.env.PORT;

/**
 * Join Server  
 */
document.getElementById('join_server').addEventListener('click', function(event) {
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
document.getElementById('create_server').addEventListener('click', function(event) {
    console.log('Clicked Create server');

    var loginForm = document.getElementById('login_form');
    var username = loginForm.elements['username'].value;
    var password = loginForm.elements['password'].value;

    var params = { username: username, password: password };

    axios.get(`${_baseUrl}createServer`, {
            params: params
        })
        .then((res) => {
            let serverId = res.data.serverId;
            let status = res.data.status;
            console.log(`Status: ${status}`);

            document.getElementById('invite-container').style.display = 'block';
            let inviteInput = document.getElementById('invite');
            inviteInput.value = `${_baseUrl}chatroom/${serverId}`;
        })
        .catch((err) => {
            console.log(err);
        });

    // To Do :  Check if the fields are empty

    /*
        This will take the user to the chatroom for which the serverId will be provided by the user
        Currently serverId has been set to default as '1010'

        To Do : Authentication of username and password
        To Do : Authorization of serverId
    */
});

/**
 * Chat Button
 */
document.getElementById('gotoChatroomButton').addEventListener('click', () => {
    console.log('Chat clicked')

    var inviteForm = document.getElementById('invite-input');
    let chatroomURL = inviteForm.elements['invite'].value;
    inviteForm.action = chatroomURL;
    inviteForm.submit();
});