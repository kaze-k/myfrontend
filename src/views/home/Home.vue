<script setup lang="ts">
import { ElCard, ElIcon, ElDivider, ElLink, ElTooltip } from 'element-plus'
import { StarFilled } from '@element-plus/icons-vue'
</script>

<template>
  <div class="container">
    <el-card class="item-container" shadow="hover">
      <a href="http://github.com/kaze-k/myfrontend" target="_blank">
        <el-tooltip content="该项目的前端源码仓库" placement="left">
          <img class="repo-card" src="https://github-readme-stats.vercel.app/api/pin/?username=kaze-k&repo=myfrontend"
            alt="项目仓库卡片">
        </el-tooltip>
      </a>
      <a href="http://github.com/kaze-k/mybackend" target="_blank">
        <el-tooltip content="该项目的后端源码仓库" placement="right">
          <img class="repo-card" src="https://github-readme-stats.vercel.app/api/pin/?username=kaze-k&repo=mybackend"
            alt="项目仓库卡片">
        </el-tooltip>
      </a>
    </el-card>
    <el-card id="banner-container" shadow="hover">
      <span id="title">
        <el-tooltip content="我的github地址" placement="top">
          <el-link href="https://github.com/kaze-k" target="_blank">kaze</el-link>
        </el-tooltip>
      </span>
      <el-divider>
        <el-icon>
          <star-filled />
        </el-icon>
      </el-divider>
      <img src="@/assets/image/banner.gif" alt="banner">
    </el-card>
    <el-card class="item-container" shadow="hover">
      <img id="top-langs-card"
        src="https://github-readme-stats.vercel.app/api/top-langs/?username=kaze-k&layout=compact" alt="热门语言卡片">
    </el-card>
  </div>

  <div class="container">
    <el-card class="item-container" shadow="hover">
      <img id="graph-card" src="https://activity-graph.herokuapp.com/graph?username=kaze-k&theme=dracula&radius=9&"
        alt="github贡献图">
    </el-card>
    <el-card class="item-container" shadow="hover">
      <img id="stats-card" src="https://github-readme-stats.vercel.app/api?username=kaze-k&show_icons=true&theme=vue"
        alt="github信息卡片">
    </el-card>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/style/home.less';
</style>