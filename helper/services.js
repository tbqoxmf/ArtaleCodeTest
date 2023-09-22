const log = require('../helper/logger')
const ATException = require('../Exception/ATException')
const ErrorDef = require('../Exception/ErrorDef')
const rankingService = require('../service/rankingService')
const lookupUserService = require('../service/lookupUserService')
const deleteUserService = require('../service/deleteUserService')
const InitRankingService = require('../service/InitRankingService')

class Services {
    constructor() {
        this.services = {}
        this.services['ranking'] = rankingService
        this.services['lookUpUser'] = lookupUserService
        this.services['deleteUser'] = deleteUserService
        this.services['initRanking'] = InitRankingService
    }

    async RunServices(req, res, next) {
        try {
            const serviceName = req.params.serviceName
            if (!(serviceName in this.services)) {
                throw new ATException(ErrorDef.IS_NOT_SERVICE, `!(serviceName in this.services) : ${req.ip} : ${serviceName}`)
            }
            const service = new this.services[serviceName](req, res)

            await service.Run()
        }
        catch (e) {

            next(e)
        }
    }
}

module.exports = Services

