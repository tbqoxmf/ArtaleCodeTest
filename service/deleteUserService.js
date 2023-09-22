const userManager = require('../manager/userManager')
const Service = require('./service')
const ATException = require('../Exception/ATException')
const ErrorDef = require('../Exception/ErrorDef')
const userRankingManager = require('../manager/userRankingManager')

class DeleteUserService extends Service {
    constructor(req, res) {
        super(req, res)
        this.UserID
    }

    async Parse() {
        super.Parse()
        this.UserID = this.req.body.UserID
        if (isNaN(this.UserID)) {
            throw new ATException(ErrorDef.WRONG_PARAM, 'DeleteUserService Parse()')
        }
    }

    async Start() {
        super.Start()
        return true;
    }
    async Update() {
        super.Update()
        await userManager.DeleteUser(this.UserID)
        await userRankingManager.zrem(this.UserID)
        return true;
    }

    async End() {
        super.End()
        this.dataJson = {}
        return true;
    }
}
module.exports = DeleteUserService