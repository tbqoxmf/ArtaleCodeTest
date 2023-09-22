const redis = require('redis')
const log = require('../../helper/logger')

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PW}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
    legacyMode: true
 });
redisClient.on('connect', ()=>{
    log.info(`Redis Connected ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`)
})

redisClient.on('error', (err) => {
    log.error('Redis Client Error', err);
 });
 redisClient.connect();
 const redisCli = redisClient.v4;

 module.exports=redisCli