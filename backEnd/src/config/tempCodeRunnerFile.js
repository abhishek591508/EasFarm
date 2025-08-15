const mongoose = require('mongoose');

let isConnected = false;// to track the connection status


async function dbConnect() { // to put here export in function , this is not syntax of common Js;
    if(isConnected){
        console.log("Already Connected to DB");
        return;
    }


    try{
        const touch = await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'EasFarm',
            // useNewUrlParser : true, it is default now
            // useUnifiedTopology : true,
        });
        isConnected = touch.connections[0].readyState === 1;
        console.log(`MongoDB connected: ${touch.connection.host}`);
    }
    catch(error){
        console.error("Mongodb Connection Error", error.message);
        process.exit(1);
    }
}

// export {dbConnect};
module.exports = dbConnect;
// https://chatgpt.com/c/689db865-54fc-832c-9b86-0953abae2bd6 
// https://chatgpt.com/c/689b853e-03d4-8324-bf37-23a075f639ed


dbConnect();