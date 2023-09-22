const Service = require('./service')

class temService extends Service {
    constructor(req, res) {
        super(req, res)
    }

    async Parse() {
        super.Parse()
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
module.exports = temService