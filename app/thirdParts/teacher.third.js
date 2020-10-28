const httpService = require('../utils/serviceAgent')

exports.getUser = async (id) => {
  const { data: { user } } = await httpService.teacher.get(`/teachers/${id}/basic`)
  return user
}
exports.getMyTenant = async (userId) => {
  // const { data: tenant } = await httpService.teacher.get(`/teachers/${userId}/tenant`)
  const { data: tenant } = await httpService.teacher.get(`/user-auths/${userId}`)
  return tenant
}
