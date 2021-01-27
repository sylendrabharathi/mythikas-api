const express = require('express');
const cors = require('cors');


let app = express();


// Middlewares

app.use(cors());
app.use(express.json());


app.use('/api/student', require('./routes/students.route'));


app.listen(3000, ()=>{
    console.log("Server up")
})