const redis = require('../redis')

const prefixKey = 'userranking'

module.exports = {
    zadd: async function (pairs) {
        redis.ZADD(prefixKey, pairs)
    },
    zrevrange: async function (form, to) {
        return await redis.ZRANGE(prefixKey, form, to, { REV: true })
    },
    zrevrangebyscore: async function (form, to) {
        return await redis.ZRANGE(prefixKey, form, to, { BY: 'SCORE', REV: true })
    },
    zrevrank: async function (userID) {
        return await redis.ZREVRANK(prefixKey, '' + userID)
    },
    zrem: async function (userID) {
        return await redis.ZREM(prefixKey, '' + userID)
    }
}