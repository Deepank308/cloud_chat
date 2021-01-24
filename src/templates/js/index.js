import axios from "axios"


// POST Test
axios.post('http://127.0.0.1:5000/test', {
    test: "test"
})
.then((res) => {
    console.log(res.data)
})
.catch((err) => {
    console.log(err)
})


// GET Test
axios.get('http://127.0.0.1:5000/test')
.then((res) => {
    console.log(res.data)
})
.catch((err) => {
    console.log(err)
})

// POST Login
axios.post('http://127.0.0.1:5000/login', {
    test: "login"
})
.then((res) => {
    console.log(res.data)
})
.catch((err) => {
    console.log(err)
})


// GET Login
axios.get('http://127.0.0.1:5000/login')
.then((res) =>{
    console.log(res.data)
})
.catch((err) => {
    console.log(err)
})


// POST Chat Room
axios.post('http://127.0.0.1:5000/chatroom', {
    test: "login"
})
.then((res) => {
    console.log(res.data)
})
.catch((err) => {
    console.log(err)
})

// GET Chat Room
axios.get('http://127.0.0.1:5000/chatroom')
.then((res) =>{
    console.log(res.data)
})
.catch((err) => {
    console.log(err)
})
