const log = require('../helper/logger')
class Service {
    constructor(req, res) {
        this.req = req
        this.res = res
        this.serviceName = req.params.serviceName
        this.dataJson
        this.resJson = {}
    }

    async Run() {
        await this.Parse()
        if (await this.Start() && await this.Update() && await this.End()) {
            this.WriteOK()
            this.WriteData(this.dataJson)
            this.res.json(this.resJson)
            log.info('OK')
        }
        else {

        }
    }

    async Parse() { }
    async Start() { }
    async Update() { }
    async End() { }

    WriteResult(result) {
        this.resJson['result'] = result
    }
    WriteOK() {
        this.WriteResult('SUCCESE')
    }
    WriteData(json) {
        this.resJson['data'] = json
    }

}

module.exports = Service