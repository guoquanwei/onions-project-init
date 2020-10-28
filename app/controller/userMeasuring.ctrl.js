// const _ = require('lodash')
const userMeasuringSrv = require('../services/userMeasuring.srv')
const assert = require('http-assert')

exports.createUserMeasuring = async ctx => {
  const { measuringId, packageId, userId } = ctx.request.body
  assert(userId, 400, '缺少参数-userId')
  assert(measuringId, 400, '缺少参数-measuringId')
  assert(packageId, 400, '缺少参数-packageId')
  const result = await userMeasuringSrv.createUserMeasuring({
    measuringId,
    packageId,
    userId,
    startTime: new Date()
  })
  ctx.body = result
}

exports.getUserRecordsByMeasuringIds = async ctx => {
  const { measuringIds } = ctx.request.body
  const { userId } = ctx.params
  const records = await userMeasuringSrv.getUserRecordsByMeasuringIds(measuringIds, userId)
  ctx.body = records
}

exports.getUserMeasuring = async ctx => {
  const { id } = ctx.params
  const result = await userMeasuringSrv.getUserMeasuringById(id)
  ctx.body = result
}

exports.getMeasuringRecords = async ctx => {
  const { measuringId } = ctx.params
  const records = await userMeasuringSrv.getMeasuringRecords(measuringId)
  ctx.body = records
}

exports.getUserMeasuringByUId = async ctx => {
  const { measuringId, userId } = ctx.params
  const record = await userMeasuringSrv.getUserMeasuringByUId(measuringId, userId)
  ctx.body = record || {}
}

exports.finishUserMeasuring = async ctx => {
  const { id } = ctx.params
  await userMeasuringSrv.finishUserMeasuring(id)
  ctx.body = {}
}
