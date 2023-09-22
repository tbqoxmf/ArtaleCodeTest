const redis = require('../redis')
const UserTable = require('../../../table/userTabel');

const prefixKey = "user"

module.exports = {

    get: async function (userID) {
        const key = prefixKey + ':' + userID
        const row = JSON.parse(await redis.GET(key))
        if (row === null) {
            return null
        }
        return new UserTable(row.UserID, row.Nickname, row.Job, row.LV, row.Meso, row.JobCode)
    },

    set: async function (userID, data) {
        const key = prefixKey + ':' + userID
        await redis.SET(key, JSON.stringify(data))
    },

    mget: async function (userIDs) {
        let keys = []
        userIDs.forEach(id => {
            keys.push(prefixKey + ':' + id)
        });
        rows = await redis.MGET(keys)
        let userTables = []
        if (rows !== null) {
            rows.forEach(row => {
                if (row !== null) {
                    const json = JSON.parse(row)
                    userTables.push(new UserTable(json.UserID, json.Nickname, json.Job, json.LV, json.Meso, json.JobCode))
                }
                else
                    return []
            });
        }
        return userTables
    },

    mset: async function (userTables) {
        let records = {}
        userTables.forEach(usertable => {
            records[prefixKey + ':' + usertable.UserID] = JSON.stringify(usertable)
        });
        await redis.MSET(records)
    },

    del: async function (userID) {
        const key = prefixKey + ':' + userID
        await redis.DEL(key)

    }

}