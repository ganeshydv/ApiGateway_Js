
const redis = require('ioredis');
const {promisify} = require('util');

let redisClient = redis.createClient({
    host: 'redis',
    port: 6379,
    password: "secret"
})

redisClient.on('connect', () => console.log("connected to redis")); // connect to redis
redisClient.on('error', err => console.log(err)); // connect to redis

redisClient.incrAsync = promisify(redisClient.incr).bind(redisClient);
redisClient.expireAsync = promisify(redisClient.expire).bind(redisClient);

module.exports = redisClient;
