<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="链路追踪编号" prop="traceId">
        <el-input v-model="formData.traceId" placeholder="请输入链路追踪编号" />
      </el-form-item>
      <el-form-item label="用户编号" prop="userId">
        <el-input v-model="formData.userId" placeholder="请输入用户编号" />
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-input v-model="formData.userType" placeholder="用户类型" />
      </el-form-item>
      <el-form-item label="应用名" prop="applicationName">
        <el-input v-model="formData.applicationName" placeholder="请输入应用名" />
      </el-form-item>
      <el-form-item label="请求方法名" prop="requestMethod">
        <el-input v-model="formData.requestMethod" placeholder="请输入请求方法名" />
      </el-form-item>
      <el-form-item label="请求地址" prop="requestUrl">
        <el-input v-model="formData.requestUrl" placeholder="请输入请求地址" />
      </el-form-item>
      <el-form-item label="请求参数" prop="requestParams">
        <el-input v-model="formData.requestParams" placeholder="请输入请求参数" />
      </el-form-item>
      <el-form-item label="用户 IP" prop="userIp">
        <el-input v-model="formData.userIp" placeholder="请输入用户 IP" />
      </el-form-item>
      <el-form-item label="浏览器 UA" prop="userAgent">
        <el-input v-model="formData.userAgent" placeholder="请输入浏览器 UA" />
      </el-form-item>
      <el-form-item label="开始请求时间" prop="beginTime">
        <el-date-picker
          v-model="formData.beginTime"
          type="date"
          value-format="x"
          placeholder="选择开始请求时间"
        />
      </el-form-item>
      <el-form-item label="结束请求时间" prop="endTime">
        <el-date-picker
          v-model="formData.endTime"
          type="date"
          value-format="x"
          placeholder="选择结束请求时间"
        />
      </el-form-item>
      <el-form-item label="执行时长" prop="duration">
        <el-input v-model="formData.duration" placeholder="请输入执行时长" />
      </el-form-item>
      <el-form-item label="结果码" prop="resultCode">
        <el-input v-model="formData.resultCode" placeholder="请输入结果码" />
      </el-form-item>
      <el-form-item label="结果提示" prop="resultMsg">
        <el-input v-model="formData.resultMsg" placeholder="请输入结果提示" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { ApiAccessLogApi, ApiAccessLogVO } from '@/api/demo/apiaccesslog'

/** 聊天API 访问日志 表单 */
defineOptions({ name: 'ApiAccessLogForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  traceId: undefined,
  userId: undefined,
  userType: undefined,
  applicationName: undefined,
  requestMethod: undefined,
  requestUrl: undefined,
  requestParams: undefined,
  userIp: undefined,
  userAgent: undefined,
  beginTime: undefined,
  endTime: undefined,
  duration: undefined,
  resultCode: undefined,
  resultMsg: undefined
})
const formRules = reactive({
  traceId: [{ required: true, message: '链路追踪编号不能为空', trigger: 'blur' }],
  userId: [{ required: true, message: '用户编号不能为空', trigger: 'blur' }],
  userType: [{ required: true, message: '用户类型不能为空', trigger: 'change' }],
  applicationName: [{ required: true, message: '应用名不能为空', trigger: 'blur' }],
  requestMethod: [{ required: true, message: '请求方法名不能为空', trigger: 'blur' }],
  requestUrl: [{ required: true, message: '请求地址不能为空', trigger: 'blur' }],
  requestParams: [{ required: true, message: '请求参数不能为空', trigger: 'blur' }],
  userIp: [{ required: true, message: '用户 IP不能为空', trigger: 'blur' }],
  userAgent: [{ required: true, message: '浏览器 UA不能为空', trigger: 'blur' }],
  beginTime: [{ required: true, message: '开始请求时间不能为空', trigger: 'blur' }],
  endTime: [{ required: true, message: '结束请求时间不能为空', trigger: 'blur' }],
  duration: [{ required: true, message: '执行时长不能为空', trigger: 'blur' }],
  resultCode: [{ required: true, message: '结果码不能为空', trigger: 'blur' }]
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
      formData.value = await ApiAccessLogApi.getApiAccessLog(id)
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
    const data = formData.value as unknown as ApiAccessLogVO
    if (formType.value === 'create') {
      await ApiAccessLogApi.createApiAccessLog(data)
      message.success(t('common.createSuccess'))
    } else {
      await ApiAccessLogApi.updateApiAccessLog(data)
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
    traceId: undefined,
    userId: undefined,
    userType: undefined,
    applicationName: undefined,
    requestMethod: undefined,
    requestUrl: undefined,
    requestParams: undefined,
    userIp: undefined,
    userAgent: undefined,
    beginTime: undefined,
    endTime: undefined,
    duration: undefined,
    resultCode: undefined,
    resultMsg: undefined
  }
  formRef.value?.resetFields()
}
</script>
