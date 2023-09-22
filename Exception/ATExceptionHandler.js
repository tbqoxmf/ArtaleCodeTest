const log = require('../helper/logger')
const ATException = require('./ATException')

module.exports = (err, req, res, next) => {
  if (err instanceof ATException) {
    let ret = {}
    ret['result'] = err.code
    ret['data'] = null
    log.error(err.code + ' : ' + err.message)
    return res.status(404).json(ret)
  }
  log.error(err)
  return res.status(403)
}