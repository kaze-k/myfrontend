<script setup lang="ts">
import { ElCard } from 'element-plus'
import loginSignInform from '@/components/login/form.vue'
</script>

<template>
  <div class="login">
    <!-- 表单容器 -->
    <el-card shadow="always" class="box-card">
      <template #header>
        <div class="card-header">
          <span><i class="fa fa-user" aria-hidden="true"></i>学生管理系统</span>
        </div>
      </template>
      <!-- 登录表单 -->
      <loginSignInform />
    </el-card>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/style/login.less';
</style>