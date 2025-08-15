const { createClient } = require('redis');

let redisClient;
async function redicConnection() {
    try {
        redisClient = createClient({
            username: 'default',
            password: process.env.REDIS_PASS,
            socket: {
                host: 'redis-14887.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
                port: 14887
            }
        });
        redisClient.on('error', (err) => {
            console.error('Redis Client Error', err);
        });

        await redisClient.connect();
        console.log("Redis connected");

        return redisClient;

    } catch (err) {
        console.error(" Failed to connect Redis:", err.message);
        process.exit(1);
    }

}


module.exports = redicConnection;