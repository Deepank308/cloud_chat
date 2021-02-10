import axios from "axios";

/* Export to a new constants.js file */
const PORT = '5000';
const HOST = '127.0.0.1';
const _baseUrl = `http://${HOST}:${PORT}`;
const _homeUrl = `${_baseUrl}/home`
const _apiBase = `${_baseUrl}/api`;


/**
 * Login Event Listener
 * 
 */
document.getElementById('login').addEventListener('click', function (event) {
	console.log('Clicked Login');
	var loginForm = document.getElementById('login_form');
	var username = loginForm.elements['username'].value;
	var password = loginForm.elements['password'].value;

	if (username === '' || password === '') {
		console.log('Error: Username or Password empty!');
		return;
	}

	var params = { username: username, password: password };
	axios.post(`${_apiBase}/login`, params)
		.then((res) => {
			let status = res.data.status;
			console.log(`Status : ${status}`);
			if (!status) {
				return;
			}

			location.href = _homeUrl;
		})
		.catch((err)=> {
			console.log(err);
		})
});
