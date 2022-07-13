<script setup lang="ts">
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { updateUser, addUser } from '@/api'
import { getToken } from '@/utils/token'
import { ref, watch } from 'vue'
import { validateUsername, validatePassword } from '@/utils/validate'
import router from '@/router'


// 关闭对话框
const handleClose = () => {
  emits('update:modelValue', false)
}

// 确定并提交表单
const handleConfirm = (formRef: FormInstance | undefined) => {
  // 统一表单校验
  if (!formRef) return
  formRef.validate((valid: any) => {
    if (valid) {
      // 提交表单内容 form.value
      if (props.dialogTitle === "编辑用户") {
        updateUser(form.value).then(res => {
          if (res.data.code === 0) {
            ElMessage({ message: res.data.message, type: 'success', center: true })
            const username = getToken("username")
            if (form.value.username === username) {
              router.replace('/login')
            }
            emits('initList')
            handleClose()
          } else ElMessage({ message: res.data.message, type: 'error', center: true })
        })
      } else {
        addUser(form.value).then(res => {
          if (res.data.code === 0) {
            ElMessage({ message: res.data.message, type: 'success', center: true })
            emits('initList')
            handleClose()
          } else {
            ElMessage({ message: res.data.message, type: 'error', center: true })
          }
        })
      }
    }
  })
}

/* 表单 */
const formRef = ref<FormInstance>()

// 表单数据绑定
const form = ref<any>({
  username: "",
  passwd: "",
  isroot: false,
  islogin: true
})

// 表单规则
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

const rules = ref<FormRules>({
  username: { validator: validatedUsername, trigger: 'change' },
  passwd: { validator: validatedPassword, trigger: 'change' },
})

/* 从父组件获取值 */
const emits = defineEmits(["update:modelValue", "initList"])

const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
    required: true
  },
  dialogTableValue: {
    type: Object,
    default: () => { }
  },
  dialogVisible: {
    type: Boolean
  }
})

// 监听从父组件获取的值的变化
watch(() => props.dialogTableValue, () => {
  form.value = props.dialogTableValue
}, { deep: true, immediate: true })

</script>

<template>
  <el-dialog :model-value="dialogVisible" :title="dialogTitle" top="30vh" width="40%" @close="handleClose" center>
    <el-form label-width="80px" :model="form" :rules="rules" ref="formRef" status-icon>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码：" prop="passwd">
        <el-input v-model="form.passwd" type="password" placeholder="请输入密码" />
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
