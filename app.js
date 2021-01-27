const express = require('express');
const cors = require('cors');

const db = require('./src/db/db');
const config = require('./src/config/config');
const routes = require('./src/routes/route');

const app = express();

// Middlewares

app.use(cors());
app.use(express.json());


// DB Connection
const dbCon = db.connectDB();
if(dbCon.status === 0) {
    console.log('Server is not running due to DB Connection Error: ', dbCon.error);
}

// Routes
app.use('/api/v1/', routes);


app.listen(config.port, ()=>{
    console.log(`Server is Listening in ${config.port}`)
})