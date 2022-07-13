<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { login, loginForm, dologin, LoginRules } from '@/utils/login/login&signIn'
import { signIn, signInForm, dosignIn, SignInRules } from '@/utils/login/login&signIn'
import { ref } from 'vue'
const show = ref<boolean>(true)
</script>

<template>
  <template v-if="show">
    <el-form status-icon label-width="70px" :model="loginForm" class="login-form" :rules="LoginRules" ref="dologin">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码：" prop="passwd">
        <el-input v-model="loginForm.passwd" type="password" placeholder="请输入密码" />
      </el-form-item>
      <div style="display: table; margin: 0 auto">
        <el-button type="primary" @click="login(dologin)">登录</el-button>
        <el-button @click="show = false">注册</el-button>
      </div>
    </el-form>
  </template>

  <template v-else>
    <el-form status-icon label-width="85px" :model="signInForm" class="singIn-form" :rules="SignInRules" ref="dosignIn">
      <el-form-item label="注册用户：" prop="username">
        <el-input v-model="signInForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="设置密码：" prop="passwd">
        <el-input v-model="signInForm.passwd" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="确定密码：" prop="checkPassword">
        <el-input v-model="signInForm.checkPassword" type="password" placeholder="请再次输入密码" />
      </el-form-item>
      <div style="display: table; margin: 0 auto">
        <el-button type="primary" class="left-button" @click="signIn(dosignIn)">确定</el-button>
        <el-button class="right-button" @click="show = true">返回</el-button>
      </div>
    </el-form>
  </template>
</template>
