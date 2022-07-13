<script setup lang="ts">
import router from '@/router'
import {ElButton} from 'element-plus'

function returnHome() {
  router.push("/home/")
}
</script>

<template>
  <div id="not-found">
    <el-button type="success" round @click="returnHome()">返回首页</el-button>
  </div>
</template>

<style scoped lang="less">
#not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/image/404.gif');
  background-size: cover;
}
</style>