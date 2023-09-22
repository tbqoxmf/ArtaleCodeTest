const userRankingManager = require('../manager/userRankingManager')
const Service = require('./service')

class InitRankingService extends Service {
    constructor(req, res) {
        super(req, res)
    }

    async Parse() {
        super.Parse()
        await userRankingManager.InitRanking()
    }

    async Start() {
        super.Start()
        return true;
    }
    async Update() {
        super.Update()
        return true;
    }
    async End() {
        super.End()
        return true;
    }
}
module.exports = InitRankingService