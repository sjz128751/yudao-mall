<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="房间名" prop="chatName">
        <el-input v-model="formData.chatName" placeholder="请输入房间名" />
      </el-form-item>
      <el-form-item label="左边的图片" prop="leftImg">
        <el-input v-model="formData.leftImg" placeholder="请输入左边的图片" />
      </el-form-item>
      <el-form-item label="右边的图片" prop="rightImg">
        <el-input v-model="formData.rightImg" placeholder="请输入右边的图片" />
      </el-form-item>
      <el-form-item label="左边的名称" prop="leftName">
        <el-input v-model="formData.leftName" placeholder="请输入左边的名称" />
      </el-form-item>
      <el-form-item label="右边的名称" prop="rightName">
        <el-input v-model="formData.rightName" placeholder="请输入右边的名称" />
      </el-form-item>
      <el-form-item label="背景图片" prop="backgroundImg">
        <el-input v-model="formData.backgroundImg" placeholder="请输入背景图片" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { SjzChatRoomApi, SjzChatRoomVO } from '@/api/demo/sjzchatroom'

/** 我的聊天室 表单 */
defineOptions({ name: 'SjzChatRoomForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  chatName: undefined,
  leftImg: undefined,
  rightImg: undefined,
  leftName: undefined,
  rightName: undefined,
  backgroundImg: undefined
})
const formRules = reactive({
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await SjzChatRoomApi.getSjzChatRoom(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as SjzChatRoomVO
    if (formType.value === 'create') {
      await SjzChatRoomApi.createSjzChatRoom(data)
      message.success(t('common.createSuccess'))
    } else {
      await SjzChatRoomApi.updateSjzChatRoom(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    chatName: undefined,
    leftImg: undefined,
    rightImg: undefined,
    leftName: undefined,
    rightName: undefined,
    backgroundImg: undefined
  }
  formRef.value?.resetFields()
}
</script>