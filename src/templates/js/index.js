import axios from "axios";

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

    /**started here */
    var params = { username: username, password: password };

    axios.get(`${_baseUrl}joinServer`, {
            params: params
        })
        .then((res) => {
            console.log(`Status :${res.data.status}`);
            document.getElementById('join_server_invite_container').style.display = 'block';
            document.getElementById('join_server_invite').value = "";
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
    // loginForm.action = `/chatroom/${serverId}`;
    // console.log(serverId);
    // loginForm.submit();
});

/**
 * Create Server
 */
document.getElementById('create_server').addEventListener('click', function(event) {
    console.log('Clicked Create server');

    var loginForm = document.getElementById('login_form');
    var username = loginForm.elements['username'].value;
    var password = loginForm.elements['password'].value;

    if (username === '' || password === '') {
        console.log('Error: Username or password empty!');
        return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    var params = { username: username, password: password };

    axios.get(`${_baseUrl}createServer`, {
            params: params
        })
        .then((res) => {
            let serverId = res.data.serverId;
            localStorage.setItem('serverId', serverId);

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
 * Chat Button For Create Server
 */
document.getElementById('gotoChatroomButton').addEventListener('click', () => {
    console.log('Create Server Chat clicked');  
    
    var inviteForm = document.getElementById('invite-input');
    var inviteDiv = document.getElementById('invite');
    let chatroomURL = inviteDiv.value;
    inviteForm.action = chatroomURL;
    inviteForm.submit();
});

/**
 * Chat Button For Join Server
 */
document.getElementById('join_server_gotoChatroomButton').addEventListener('click', () => {
    console.log('Join Server chat clicked');

    var inviteForm = document.getElementById('join_server_invite_input');
    let chatroomURL = document.getElementById('join_server_invite').value;
    inviteForm.action = chatroomURL;
    inviteForm.submit();
});