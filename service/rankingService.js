const ATException = require('../Exception/ATException')
const ErrorDef = require('../Exception/ErrorDef')
const userManager = require('../manager/userManager')
const userRankingManager = require('../manager/userRankingManager')
const UserRankingTable = require('../table/userRankingTable')


const Service = require('./service')


class RankingService extends Service {
    constructor(req, res) {
        super(req, res)
        this.StartVal
        this.EndVal

        this.userRankingTable = []
        this.rankingIDs
        this.userTables
    }

    async Parse() {
        super.Parse()
        await userRankingManager.InitRanking()
        this.StartVal = this.req.body.StartVal
        this.EndVal = this.req.body.EndVal
        if (!(isNaN(this.StartVal) && isNaN(this.EndVal))) {
            if ((this.StartVal >= this.EndVal)) {
                throw new ATException(ErrorDef.WRONG_PARAM, 'RankingService Parse()')

            }
            else if (!(this.StartVal > 0 && this.EndVal > 0)) {
                throw new ATException(ErrorDef.WRONG_PARAM, 'RankingService Parse()')
            }

        }

    }

    async Start() {
        super.Start()
        this.rankingIDs = await userRankingManager.zrevrange(this.StartVal - 1, this.EndVal - 1)
        this.userTables = await userManager.SelectUserList(this.rankingIDs)

        return true;
    }
    async Update() {
        super.Update()

        const prom = this.userTables.map(async u => {
            let user = u
            const sameScoreList = await userRankingManager.GetSameScoreRankList(user.LV)
            const rank = await userRankingManager.zrevrank(sameScoreList[0])
            this.userRankingTable.push(new UserRankingTable(rank + 1, user.UserID, user.LV, user.Job))

        })
        await Promise.all(prom);

        return true;
    }
    async End() {
        super.End()
        this.dataJson = JSON.stringify(this.userRankingTable)
        return true;
    }
}
module.exports = RankingService