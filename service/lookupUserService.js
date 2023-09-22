const userManager = require('../manager/userManager')
const Service = require('./service')
const rankingManger = require('../manager/userRankingManager')
const ErrorDef = require('../Exception/ErrorDef')
const ATException = require('../Exception/ATException')

class LookupUserService extends Service {
    constructor(req, res) {
        super(req, res)
        this.reqUserID
        this.reqNickname
        this.userTables
    }

    async Parse() {
        super.Parse()
        this.reqUserID = this.req.body.UserID
        this.reqNickname = this.req.body.Nickname
        if (typeof this.reqUserID == 'undefined' || typeof this.reqNickname == 'undefined') {
            throw new ATException(ErrorDef.WRONG_PARAM, 'LookupUserService Parse()')
        }
    }

    async Start() {
        super.Start()
        if (this.reqUserID !== '') {
            this.userTables = await userManager.SelectUser(this.reqUserID)
        }
        else {
            this.userTables = await userManager.SelectUserNickname(this.reqNickname)
        }
        return true;

    }
    async Update() {
        super.Update()
        return true;
    }
    async End() {
        super.End()
        this.dataJson = JSON.stringify(this.userTables)
        return true;

    }
}
module.exports = LookupUserService