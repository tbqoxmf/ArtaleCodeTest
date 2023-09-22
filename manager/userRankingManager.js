const userDBDAO = require('../db/sql/dao/userDBDAO')
const userRankingRedisDAO = require('../db/redis/dao/userRankingRedisDAO')
const log = require('../helper/logger')
const UserRankingTable = require('../table/userRankingTable')


module.exports = {

    InitRanking: async function () {
        userTables = await userDBDAO.SelectUserAll()

        const prom = userTables.map(async user => {
            let pair = []
            pair.push({ score: '' + user.LV, value: '' + user.UserID })
            await userRankingRedisDAO.zadd(pair)
        })
        await Promise.all(prom);
    },

    zrevrange: async function (from, to) {
        return await userRankingRedisDAO.zrevrange(from, to)
    },

    zrevrank: async function (userID) {
        return await userRankingRedisDAO.zrevrank(userID)
    },

    zrem: async function (userID) {
        return await userRankingRedisDAO.zrem(userID)
    },

    GetSameScoreRankList: async function (score) {
        return await userRankingRedisDAO.zrevrangebyscore(score, score)
    }



}