<script setup lang="ts">
import allHeader from '@/components/common/allHeader.vue'
import allMenu from '@/components/common/allMenu.vue'
import breadcrumb from '@/components/common/breadcrumb.vue'
import { ElContainer, ElMain } from 'element-plus'

</script>

<template>
  <div id="home">
    <el-container>
      <all-header />
      <el-container id="content">
        <all-menu />
        <el-container>
          <el-main>
            <breadcrumb />
            <div id="view">
              <router-view />
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less">
#home {
  width: 100vw;
  height: 100vh;

  #content {
    position: absolute;
    width: 100%;
    top: 6vh;
    bottom: 0;

    #view {
      margin: 20px;
    }
  }
}
</style>