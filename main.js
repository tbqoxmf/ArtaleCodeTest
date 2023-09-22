require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('./Exception/ATExceptionHandler')

const log = require('./helper/logger')
const Services = require('./helper/services')
require('./db/redis/redis')
require('./db/sql/db')

const app = express()

async function StartServer() {
     const services = new Services()
     app.use(bodyParser.json())
     app.use(bodyParser.urlencoded({ extended: false }))
     app.post('/:serviceName', async (req, res, next) => { services.RunServices(req, res, next) })
     app.use(errorHandler)
     app.listen(process.env.SERVER_PORT, () => { log.info('Start Listen') })
}


StartServer()