<script setup lang="ts">
import { ElDialog, ElForm, ElFormItem, ElInput, ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { ref } from 'vue'
import { validateUsername } from '@/utils/validate'
import { changeUsername } from '@/api'
import { getToken } from '@/utils/token'
import router from '@/router'

// 关闭对话框
const handleClose = () => {
  emits('update:modelValue', false)
}

// 确定提交表单
const handleConfirm = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.validate((valid: any) => {
    if (valid) {
      const username = getToken("username")
      if (form.value.username === username)
        ElNotification({ message: "你已使用该用户名", type: 'info', position: 'bottom-right' })
      else {
        changeUsername(form.value.username, username).then(res => {
          if (res.data.code === 0) {
            ElNotification({ message: res.data.message + '，请重新登录', type: 'success', position: 'bottom-right' })
            router.replace('/login')
          } else ElNotification({ message: res.data.message, type: 'error', position: 'bottom-right' })
        })
      }
      handleClose()
    }
  })
}

// 表单
const formRef = ref<FormInstance>()

const form = ref({
  username: "",
})

// 用户名验证
const validatedUsername = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("用户名不能为空!"))
  } else if (/\s/.test(value)) {
    callback(new Error("用户名不能含有空格!"))
  } else if (validateUsername(value)) {
    callback(new Error("请输入1-8位字符的用户名!"))
  } else {
    callback()
  }
}

// 表单规则
const rules = ref<FormRules>({
  username: { validator: validatedUsername, trigger: 'change' },
})

// 从父组件获取值
const emits = defineEmits(["update:modelValue"])

defineProps({
  usernameDialogVisible: {
    type: Boolean
  }
})
</script>

<template>
  <el-dialog :model-value="usernameDialogVisible" title="修改用户名" top="30vh" width="30%" @close="handleClose" center>
    <el-form label-width="80px" :model="form" :rules="rules" ref="formRef" status-icon>
      <el-form-item label="新用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入新用户名" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm(formRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>