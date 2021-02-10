import axios from "axios"

/* Export to a new constants.js file */
const PORT = '5000';
const HOST = '127.0.0.1';
const _baseUrl = `http://${HOST}:${PORT}`;
const _chatroomUrl = `${_baseUrl}/chatroom`;
const _apiBase = `${_baseUrl}/api`;


/**
 * Join Server Event Listener
 * 
 */
document.getElementById('join_server').addEventListener('click', function (event) {
	console.log('Clicked Join server');

	/**started here */
	axios.post(`${_apiBase}/joinServer`)
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

	axios.post(`${_apiBase}/createServer`)
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


/**
 * Logout Event Listener
 * 
 */
document.getElementById('logout').addEventListener('click', function (event) {
	console.log('Clicked Logout');

	axios.post(`${_apiBase}/logout`)
		.then((res) => {
			let status = res.data.status;
			console.log(`Status :${status}`);
			if (!status) {
				return;
			}

			location.href = _baseUrl;
		})
});
