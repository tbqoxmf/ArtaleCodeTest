const ini = require('ini')
const objectPath = require('object-path')
const fs = require('fs')
const log = require('./logger')

class Config{
    constructor(filePath){
        this.data = {};
        this.filePath = filePath
    }

    get(key){
        return objectPath.get(this.data, key)
    }

    load(){
        this.data = ini.decode(fs.readFileSync(this.filePath, "utf8"))
        log.info(`Load Config File : ${this.filePath}`)
    }
}

function loadConfig(){
    config.load()
}

const config = new Config('c:/ArtaleTest/config/config.ini')
loadConfig()
module.exports = config
