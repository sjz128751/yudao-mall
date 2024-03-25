import request from '@/config/axios'

// 聊天API 访问日志 VO
export interface ApiAccessLogVO {
  id: number // 日志主键
  traceId: string // 链路追踪编号
  userId: number // 用户编号
  userType: number // 用户类型
  applicationName: string // 应用名
  requestMethod: string // 请求方法名
  requestUrl: string // 请求地址
  requestParams: string // 请求参数
  userIp: string // 用户 IP
  userAgent: string // 浏览器 UA
  beginTime: Date // 开始请求时间
  endTime: Date // 结束请求时间
  duration: number // 执行时长
  resultCode: number // 结果码
  resultMsg: string // 结果提示
}

// 聊天API 访问日志 API
export const ApiAccessLogApi = {
  // 查询聊天API 访问日志分页
  getApiAccessLogPage: async (params: any) => {
    return await request.get({ url: `/demo/api-access-log/page`, params })
  },

  // 查询聊天API 访问日志详情
  getApiAccessLog: async (id: number) => {
    return await request.get({ url: `/demo/api-access-log/get?id=` + id })
  },

  // 新增聊天API 访问日志
  createApiAccessLog: async (data: ApiAccessLogVO) => {
    return await request.post({ url: `/demo/api-access-log/create`, data })
  },

  // 修改聊天API 访问日志
  updateApiAccessLog: async (data: ApiAccessLogVO) => {
    return await request.put({ url: `/demo/api-access-log/update`, data })
  },

  // 删除聊天API 访问日志
  deleteApiAccessLog: async (id: number) => {
    return await request.delete({ url: `/demo/api-access-log/delete?id=` + id })
  },

  // 导出聊天API 访问日志 Excel
  exportApiAccessLog: async (params) => {
    return await request.download({ url: `/demo/api-access-log/export-excel`, params })
  }
}