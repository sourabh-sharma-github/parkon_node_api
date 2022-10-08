const { env } = require('process')
const enviroment = env.NODE_ENV || "development";
const { warn, error } = require('console')
warn(`Enviroment:: ${enviroment}🟢`)
const export_config_obj = require('./config.json')[enviroment]
module.exports = { ...export_config_obj }