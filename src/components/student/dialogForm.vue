<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElDialog, ElForm, ElFormItem, ElRadioGroup, ElRadio, ElButton, ElInput, ElMessage } from 'element-plus'
import { newStudentData, updateStudentData } from '@/api'

// 表单
const form = ref<any>({
  num: "",
  Sclass: "",
  Sname: "",
  sex: "男",
  age: 1,
  address: "",
  phone: ""
})

const formRef = ref<FormInstance>()

// 表单规则
const rules = ref<FormRules>({
  num: { required: true, message: '不能为空', trigger: 'blur' },
  Sclass: { required: true, message: '不能为空', trigger: 'blur' },
  Sname: { required: true, message: '不能为空', trigger: 'blur' },
  sex: { required: true, message: '不能为空', trigger: 'blur' },
  age: { required: true, message: '不能为空', trigger: 'blur' },
  address: { required: true, message: '不能为空', trigger: 'blur' },
  phone: [
    { required: true, message: '不能为空', trigger: 'blur'},
    { pattern: /^\d{11}$/, message: '请输入正确的手机号码', trigger: 'blur'}
  ]
})

// 关闭对话框
const handleClose = () => {
  emits('update:modelValue', false)
}

// 确定提交表单
const handleConfirm = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.validate((valid: any) => {
    if (valid) {
      if (props.dialogTitle === "添加学生信息") {
        newStudentData(form.value).then(res => {
          if (res.data.code === 0) {
            ElMessage({ message: res.data.message, type: 'success', center: true })
            emits('initList')
            handleClose()
          } else ElMessage({ message: res.data.message, type: 'error', center: true })
        })
      } else {
        updateStudentData(form.value).then(res => {
          if (res.data.code === 0) {
            ElMessage({ message: res.data.message, type: 'success', center: true })
            emits('initList')
            handleClose()
          } else ElMessage({ message: res.data.message, type: 'error', center: true })
        })
      }
    }
  })
}

// 从父组件获取数据
const emits = defineEmits(["update:modelValue", "initList"])

const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
    required: true
  },
  dialogTableValue: {
    type: Object,
    default: () => { },
    required: true
  },
  dialogVisible: {
    type: Boolean
  }
})

watch(() => props.dialogTableValue, () => {
  form.value = props.dialogTableValue
}, { deep: true, immediate: true })

</script>

<template>
  <el-dialog :model-value="dialogVisible" :title="dialogTitle" @close="handleClose" center>
    <el-form status-icon label-width="120px" :model="form" class="login-form" :rules="rules" ref="formRef">
      <el-form-item label="学号：" prop="num">
        <el-input v-model="form.num" placeholder="请输入学生学号" />
      </el-form-item>
      <el-form-item label="班级：" prop="Sclass">
        <el-input v-model="form.Sclass" placeholder="请输入学生班级" />
      </el-form-item>
      <el-form-item label="姓名：" prop="Sname">
        <el-input v-model="form.Sname" placeholder="请输入学生姓名" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex" class="ml-4">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="form.age" :step="1" :min="1" :max="100" />
      </el-form-item>
      <el-form-item label="电话：" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入学生电话" />
      </el-form-item>
      <el-form-item label="地址：" prop="address">
        <el-input v-model="form.address" autosize type="textarea" placeholder="请输入学生地址" />
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