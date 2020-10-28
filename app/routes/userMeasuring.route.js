const router = require('koa-router')()
const userMeasuringCtrl = require('../controller/userMeasuring.ctrl')

router.prefix('/user-measuring')

router.post('/', userMeasuringCtrl.createUserMeasuring)
router.get('/:id', userMeasuringCtrl.getUserMeasuring)
router.put('/:id', userMeasuringCtrl.finishUserMeasuring)
router.get('/measuring/:measuringId/records', userMeasuringCtrl.getMeasuringRecords)
router.get('/measuring/:measuringId/users/:userId', userMeasuringCtrl.getUserMeasuringByUId)
router.post('/users/:userId/records', userMeasuringCtrl.getUserRecordsByMeasuringIds)

module.exports = router
