const log = require('../../../helper/logger');
const UserTable = require('../../../table/userTabel');
const db = require('../db')
const ErrorDef = require('../../../Exception/ErrorDef')
const ATException = require('../../../Exception/ATException')

module.exports = {
    SelectUserList: async function (userIDList) {
        var tables = []
        var [rows, fields] = await db.query('SELECT * FROM user WHERE UserID IN (?)', [userIDList])
        rows.forEach(row => {
            tables.push(new UserTable(row.UserID, row.Nickname, row.Job, row.LV, row.Meso, row.JobCode))
        });
        if (tables.length === 0) {
            throw new ATException(ErrorDef.NOT_EXISTS_USER, `UserIDList =${userIDList}`)
        }
        return tables
    },

    SelectUser: async function (userID) {
        var tables = []
        var [rows, fields] = await db.query('SELECT * FROM user WHERE UserID=?', [userID])
        rows.forEach(row => {
            tables.push(new UserTable(row.UserID, row.Nickname, row.Job, row.LV, row.Meso, row.JobCode))
        });
        if (tables.length === 0) {
            throw new ATException(ErrorDef.NOT_EXISTS_USER, `UserID =${userID}`)
        }
        return tables[0]
    },

    SelectUserNickname: async function (Nickname) {
        var tables = []
        var [rows, fields] = await db.query('SELECT * FROM user WHERE Nickname=?', [Nickname])
        rows.forEach(row => {
            tables.push(new UserTable(row.UserID, row.Nickname, row.Job, row.LV, row.Meso, row.JobCode))
        });
        if (tables.length === 0) {
            throw new ATException(ErrorDef.NOT_EXISTS_USER, `Nickname =${Nickname}`)
        }
        return tables[0]
    },

    SelectUserAll: async function () {
        var tables = []
        var [rows, fields] = await db.query('SELECT * FROM user')
        rows.forEach(row => {
            tables.push(new UserTable(row.UserID, row.Nickname, row.Job, row.LV, row.Meso, row.JobCode))
        });
        return tables
    },

    DeleteUser: async function (userID) {
        const ret = await db.query('DELETE FROM user WHERE UserID=?', [userID])
        if (ret[0].affectedRows === 0) {
            throw new ATException(ErrorDef.NOT_EXISTS_USER, `UserID =${userID}`)
        }
    }
}
