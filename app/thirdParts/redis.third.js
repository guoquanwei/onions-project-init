const _ = require('lodash')
const moment = require('moment')
const client = require('../lib/redis')
const logger = require('../helper/log.helper').getLogger('redis')

class Cache {
  static async set (key, value, type, time) {
    if (type && time) {
      await client.set(key, JSON.stringify(value), type, time)
    } else {
      await client.set(key, JSON.stringify(value))
    }
  }

  static async selectDB (db) {
    await client.select(db)
  }

  static async get (key) {
    const value = await client.get(key)
    return value ? JSON.parse(value) : value
  }

  static async delete (key) {
    try {
      await client.del(key)
    } catch (e) {
      logger.error(e)
    }
  }

  static async multiDel (pattern) {
    try {
      let keys
      if (typeof pattern === 'string') {
        keys = await client.keys(pattern)
      } else if (Array.isArray(pattern)) {
        keys = pattern
      }
      if (keys) {
        const pipe = client.pipeline()
        keys.forEach(key => pipe.del(key))
        await pipe.exec()
      }
    } catch (e) {
      logger.error(e)
    }
  }

  static async flushDB () {
    // 过滤掉排行榜缓存
    const ignore = /^billboard:/
    try {
      let keys = await client.keys('*')
      keys = _.reject(keys, key => ignore.test(key))
      await Cache.multiDel(keys)
    } catch (err) {
      logger.error(err)
    }
  }

  static expireAtMidnight (key) {
    moment.locale('zh-cn')
    client.expireat(key, moment().endOf('day').unix())
  }

  static async expire (key, unix) {
    moment.locale('zh-cn')
    await client.expireat(key, unix)
  }

  static async incr (key) {
    return client.incr(key)
  }
}

module.exports = Cache
