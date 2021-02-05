import axios from "axios"

/* Export to a new constants.js file */
const PORT = '5000';
const HOST = '127.0.0.1';
const _baseUrl = `http://${HOST}:${PORT}`;
const _homeUrl = `${_baseUrl}/home`


/**
 * Logout Event Listener
 * 
 */
document.getElementById('logout_btn').addEventListener('click', () => {
    console.log('Logout Clicked');
    location.href = _homeUrl;
});