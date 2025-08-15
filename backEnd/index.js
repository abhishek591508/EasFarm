const express = require('express');
require('dotenv').config();

const dbConnect = require('./src/config/db');
const redisClient = require('./src/config/redis');


// https://chat.deepseek.com/a/chat/s/4b529dc7-8a93-4a2e-830d-835bf0acf909 steps to build this project
const app = express();
app.use(express.json());













const Initialisation = async() => {
    try {
        await Promise.all([dbConnect(), redisClient()]);

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