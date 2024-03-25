import request from '@/config/axios'

// 聊天消息 VO
export interface SjzChatMsgVO {
  id: number // 主键id
  roomId: number // 类型
  remoteIp: string // 类型
  deviceMsg: string // 类型
  type: string // 类型left/right
  name: string // 名称
  content: string // 内容
}

// 聊天消息 API
export const SjzChatMsgApi = {
  // 查询聊天消息分页
  getSjzChatMsgPage: async (params: any) => {
    return await request.get({ url: `/demo/sjz-chat-msg/page`, params })
  },

  // 查询聊天消息详情
  getSjzChatMsg: async (id: number) => {
    return await request.get({ url: `/demo/sjz-chat-msg/get?id=` + id })
  },

  // 新增聊天消息
  createSjzChatMsg: async (data: SjzChatMsgVO) => {
    return await request.post({ url: `/demo/sjz-chat-msg/create`, data })
  },

  // 修改聊天消息
  updateSjzChatMsg: async (data: SjzChatMsgVO) => {
    return await request.put({ url: `/demo/sjz-chat-msg/update`, data })
  },

  // 删除聊天消息
  deleteSjzChatMsg: async (id: number) => {
    return await request.delete({ url: `/demo/sjz-chat-msg/delete?id=` + id })
  },

  // 导出聊天消息 Excel
  exportSjzChatMsg: async (params) => {
    return await request.download({ url: `/demo/sjz-chat-msg/export-excel`, params })
  }
}