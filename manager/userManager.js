const userDBDAO = require('../db/sql/dao/userDBDAO')
const userRedisDAO = require('../db/redis/dao/userRedisDAO')
const log = require('../helper/logger')

module.exports = {

    SelectUserList: async function (userIDList) {
        let userTables = await userRedisDAO.mget(userIDList)
        if (userTables.length !== userIDList.length) {
            console.log(userIDList.length)
            console.log(userTables.length)
            userTables = await userDBDAO.SelectUserList(userIDList)
            await userRedisDAO.mset(userTables)
            log.info('SelectUserList Redis Set')
        }
        return userTables
    },

    SelectUser: async function (userID) {
        let userTable = await userRedisDAO.get(userID)
        if (userTable === null) {
            userTable = await userDBDAO.SelectUser(userID)
            userRedisDAO.set(userID, userTable)
            log.info('Redis Set')
        }
        return userTable

    },

    SelectUserNickname: async function (Nickname) {
        userTable = await userDBDAO.SelectUserNickname(Nickname)
        return userTable
    },

    DeleteUser: async function (userID) {

        await Promise.all([
            userDBDAO.DeleteUser(userID),
            userRedisDAO.del(userID)
        ])

    }


}

