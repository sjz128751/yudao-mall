import request from '@/config/axios'

// 我的聊天室 VO
export interface SjzChatRoomVO {
  id: number // 主键id
  chatName: string // 房间名
  leftImg: string // 左边的图片
  rightImg: string // 右边的图片
  leftName: string // 左边的名称
  rightName: string // 右边的名称
  backgroundImg: string // 背景图片
}

// 我的聊天室 API
export const SjzChatRoomApi = {
  // 查询我的聊天室分页
  getSjzChatRoomPage: async (params: any) => {
    return await request.get({ url: `/demo/sjz-chat-room/page`, params })
  },

  // 查询我的聊天室详情
  getSjzChatRoom: async (id: number) => {
    return await request.get({ url: `/demo/sjz-chat-room/get?id=` + id })
  },

  // 新增我的聊天室
  createSjzChatRoom: async (data: SjzChatRoomVO) => {
    return await request.post({ url: `/demo/sjz-chat-room/create`, data })
  },

  // 修改我的聊天室
  updateSjzChatRoom: async (data: SjzChatRoomVO) => {
    return await request.put({ url: `/demo/sjz-chat-room/update`, data })
  },

  // 删除我的聊天室
  deleteSjzChatRoom: async (id: number) => {
    return await request.delete({ url: `/demo/sjz-chat-room/delete?id=` + id })
  },

  // 导出我的聊天室 Excel
  exportSjzChatRoom: async (params) => {
    return await request.download({ url: `/demo/sjz-chat-room/export-excel`, params })
  }
}