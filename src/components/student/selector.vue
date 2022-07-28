<script setup lang="ts">
import { ref } from 'vue'


const options = [
  {
    value: "num",
    label: "学号",
  },
  {
    value: "Sclass",
    label: "班级"
  },
  {
    value: "Sname",
    label: "姓名"
  },
  {
    value: "sex",
    label: "性别"
  },
  {
    value: "age",
    label: "年龄"
  },
  {
    value: "address",
    label: "地址"
  },
  {
    value: "phone",
    label: "手机号码"
  }
]

const value = ref('')

// 传递变量给父组件
defineExpose({ value })
</script>

<template>
  <el-select v-model="value" placeholder="筛选全部" size="small" clearable>
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      <span>{{ item.label }}</span>
    </el-option>
  </el-select>
</template>
