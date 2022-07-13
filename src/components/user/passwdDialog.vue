<script setup lang="ts">
import { ElDialog, ElForm, ElFormItem, ElInput, ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { ref } from 'vue'
import { validatePassword } from '@/utils/validate'
import { changePasswd } from '@/api'
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
      changePasswd(form.value.passwd, username).then(res => {
        if (res.data.code === 0) {
          ElNotification({ message: res.data.message + '，请重新登录', type: 'success', position: 'bottom-right' })
          router.replace('/login')
        } else {
          ElNotification({ message: res.data.message, type: 'error', position: 'bottom-right' })
        }
      })
      handleClose()
    }
  })
}

// 表单
const formRef = ref<FormInstance>()

const form = ref({
  passwd: "",
  checkPasswd: ""
})

// 密码验证
const validatedPassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空!"))
  } else if (validatePassword(value)) {
    callback(new Error("请输入6-12位包含数字、字母的密码!"))
  } else {
    callback()
  }
}

// 二次密码验证
const validatedCheckPassword = (rule: any, value: any, callback: any) => {
  if (value !== form.value.passwd) {
    callback(new Error("两次输入的密码不一致!"))
  }
  if (value === "") {
    callback(new Error("密码不能为空!"))
  } else if (validatePassword(value)) {
    callback(new Error("请输入6-12位包含数字、字母的密码!"))
  } else {
    callback()
  }
}

// 表单规则
const rules = ref<FormRules>({
  passwd: { validator: validatedPassword, trigger: 'change' },
  checkPasswd: { validator: validatedCheckPassword, trigger: 'change' }
})

// 从父组件获取值
const emits = defineEmits(["update:modelValue"])

defineProps({
  passwdDialogVisible: {
    type: Boolean
  }
})
</script>

<template>
  <el-dialog :model-value="passwdDialogVisible" title="修改密码" top="30vh" width="30%" @close="handleClose" center>
    <el-form label-width="80px" :model="form" :rules="rules" ref="formRef" status-icon>
      <el-form-item label="新密码" prop="passwd">
        <el-input v-model="form.passwd" type="password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确定密码" prop="checkPasswd">
        <el-input v-model="form.checkPasswd" type="password" placeholder="请再次输入新密码" />
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