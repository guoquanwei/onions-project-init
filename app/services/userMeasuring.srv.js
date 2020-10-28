const userMeasuringDao = require('../dao/userMeasuring.dao')

exports.createUserMeasuring = async data => {
  return userMeasuringDao.createUserMeasuring(data)
}

exports.getUserMeasuringById = async id => {
  return userMeasuringDao.getUserMeasuringById(id)
}

exports.getMeasuringRecords = async measuringId => {
  return userMeasuringDao.getMeasuringRecords(measuringId)
}

exports.getUserMeasuringByUId = async (measuringId, userId) => {
  return userMeasuringDao.getUserMeasuringByUId(measuringId, userId)
}

exports.finishUserMeasuring = async id => {
  return userMeasuringDao.finishUserMeasuring(id)
}

exports.getUserRecordsByMeasuringIds = async (measuringIds, userId) => {
  return userMeasuringDao.getUserRecordsByMeasuringIds(measuringIds, userId)
}
