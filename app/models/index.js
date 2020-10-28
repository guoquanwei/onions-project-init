const _ = require('lodash')
const Sequelize = require('sequelize')
const dbConfig = require('config').get('pg')
const requireDirectory = require('require-directory')
const logger = require('../helper/log.helper').getLogger('pg')

const models = requireDirectory(module)

const db = {}
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'postgres',
  logging: msg => logger.silly(msg),
  // logging: false,
  pool: {
    max: dbConfig.max || 100,
    min: dbConfig.min || 10,
    idle: 10000,
    acquire: 10000,
    evict: 60000,
    handleDisconnects: true
  }
})

_.forEach(models, modelCreator => {
  const model = modelCreator(sequelize, Sequelize)
  if (model && model.name) db[model.name] = model
})

Object.keys(db).forEach(modelName => {
  if (Object.prototype.hasOwnProperty.call(db[modelName].options, 'associate')) {
    db[modelName].options.associate(db)
    return
  }
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

sequelize.authenticate().then(() => {
  logger.info(`sequelize connect success, host: ${dbConfig.host}, port: ${dbConfig.port}, database: ${dbConfig.database}`)
}).catch(err => {
  logger.error(`sequelize connect error: ${err}`)
})

module.exports = _.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)
