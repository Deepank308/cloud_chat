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
