const { createClient } = require('redis');



// const redisClient = createClient({
//     username: 'default',
//     password: process.env.REDIS_PASS,
//     socket: {
//         host: 'redis-14887.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
//         port: 14887
//     }
// });

const redisClient = createClient({
    url: process.env.REDIS_URL, // REDIS_URL set in Render environment variables
});


redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

module.exports = redisClient;