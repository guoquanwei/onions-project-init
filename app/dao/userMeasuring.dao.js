const pg = require('../models')
const Op = require('../models').sequelize.Op
const _ = require('lodash')

exports.createUserMeasuring = async (data, transaction) => {
  const isSelfTransaction = !transaction
  transaction = transaction || await pg.sequelize.transaction()
  try {
    const result = await pg.UserMeasuring.create(data, { transaction })
    if (isSelfTransaction) await transaction.commit()
    return result.toJSON()
  } catch (e) {
    if (isSelfTransaction) await transaction.rollback()
    throw e
  }
}

exports.getMeasuringRecords = async measuringId => {
  const results = await pg.UserMeasuring.findAll({
    where: {
      measuringId
    }
  })
  return _.map(results, r => r.toJSON())
}

exports.getUserMeasuringByUId = async (measuringId, userId) => {
  const result = await pg.UserMeasuring.findOne({
    where: {
      measuringId,
      userId
    }
  })
  return result ? result.toJSON() : null
}

exports.getUserMeasuringById = async id => {
  const result = await pg.UserMeasuring.findByPk(id)
  return result ? result.toJSON() : null
}

exports.getUserRecordsByMeasuringIds = async (measuringIds, userId) => {
  const results = await pg.UserMeasuring.findAll({
    where: {
      measuringId: { [Op.in]: measuringIds },
      userId
    }
  })
  return _.map(results, r => r.toJSON())
}

exports.finishUserMeasuring = async id => {
  await pg.UserMeasuring.update({
    state: 'finished',
    finishedTime: new Date()
  }, {
    where: {
      id
    }
  })
  return {}
}
