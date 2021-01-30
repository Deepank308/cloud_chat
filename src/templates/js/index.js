import axios from "axios";

/* Export to a new constants.js file */
const PORT = process.env.PORT || '5000';
const _baseUrl = `http://localhost:${PORT}`;
const _chatroomUrl = `${_baseUrl}/chatroom`;
const _apiBase = `${_baseUrl}/api`;


/**
 * Join Server Event Listnser
 * 
 */
document.getElementById('join_server').addEventListener('click', function (event) {
	console.log('Clicked Join server');

	var loginForm = document.getElementById('login_form');
	var username = loginForm.elements['username'].value;
	var password = loginForm.elements['password'].value;

	if (username === '' || password === '') {
		console.log('Error: Username or password empty!');
		return;
	}

	/**started here */
	var params = { username: username, password: password };
	axios.post(`${_apiBase}/joinServer`, params)
		.then((res) => {
			let status = res.data.status;
			console.log(`Status :${status}`);
			if (!status) {
				return;
			}

			/* If server ID in the URL, redirect to the chat page */
			if (/[0-9]+/.test(location.search)) {
				let serverId = /[0-9]+/.exec(location.search);
				location.href = `${_chatroomUrl}/${serverId}`;
			} else {
				document.getElementById('join_server_invite_container').style.display = 'block';
				document.getElementById('join_server_invite').value = "";
			}
		})
		.catch((err) => {
			console.log(err);
		});
});


/**
 * Create Server Event Listener
 * 
 */
document.getElementById('create_server').addEventListener('click', function (event) {
	console.log('Clicked Create server');

	var loginForm = document.getElementById('login_form');
	var username = loginForm.elements['username'].value;
	var password = loginForm.elements['password'].value;

	if (username === '' || password === '') {
		console.log('Error: Username or password empty!');
		return;
	}

	var params = { username: username, password: password };
	axios.post(`${_apiBase}/createServer`, params)
		.then((res) => {
			let status = res.data.status;
			console.log(`Status: ${status}`);
			if (!status) {
				return;
			}

			let serverId = res.data.serverId;
			document.getElementById('invite-container').style.display = 'block';
			document.getElementById('invite').value = `${_chatroomUrl}/${serverId}`;
		})
		.catch((err) => {
			console.log(err);
		});
});


/**
 * Chat Button For Create Server
 * 
 */
document.getElementById('gotoChatroomButton').addEventListener('click', () => {
	console.log('Enter Chat clicked');
	location.href = document.getElementById('invite').value;
});


/**
 * Chat Button For Join Server
 * 
 */
document.getElementById('join_server_gotoChatroomButton').addEventListener('click', () => {
	console.log('Enter Chat clicked');

	let serverId = document.getElementById('join_server_invite').value;
	if (serverId !== '') {
		location.href = `${_chatroomUrl}/${serverId}`;
	}
});
