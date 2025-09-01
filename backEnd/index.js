const express = require('express');
require('dotenv').config();
const auth_user = require('./src/routes/userAuth');
const homepage = require('./src/routes/homeRoute');
const service = require('./src/routes/serviceProvider');
const queryChat = require('./src/routes/aiChat');
const dbConnect = require('./src/config/db');
const cookieParser = require('cookie-parser');
const redisClient = require("./src/config/redis");
const cors = require('cors');


const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

// https://chat.deepseek.com/a/chat/s/4b529dc7-8a93-4a2e-830d-835bf0acf909 steps to build this project


app.use(express.json());
app.use(cookieParser());
// 

console.log(process.env.MONGODB_URI);
app.use('/user', auth_user);
app.use('/home', homepage);
app.use('/service',service);


app.use('/query',queryChat);








const Initialisation = async() => {
    try {
        await Promise.all([dbConnect(), redisClient.connect()]);

        app.listen(process.env.PORT, () => {
            console.log(`Server is running at post ${process.env.port}`);
        })
    } catch (err) {
        console.error('Failed to start server: ', err);
        process.exit(1);
    }
}

Initialisation();

// console.log("This is normal output"); // stdout
// console.error("Something went wrong!"); // stderr
// read again difference between console.log and console.error


/*

    /src
        /config       # DB, env, cloud setup
        /controllers # Business logic
        /routes      # API endpoints
        /middlewares # Auth, validation, etc.
        /models      # DB schemas
        /services    # Reusable logic
        /utils       # Helpers, constants
        /tests       # Unit & integration tests

*/


// we need to add rate limiting , referesh token,