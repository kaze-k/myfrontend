<script setup lang="ts">
import { ElCard, ElIcon, ElDivider, ElLink } from 'element-plus'
import { StarFilled } from '@element-plus/icons-vue'
</script>

<template>
  <div class="container">
    <el-card class="item-container" shadow="hover">
      <el-link type="success" href="http://github.com/kaze-k/web-nodejs"><img class="repo-card"
          src="https://github-readme-stats.vercel.app/api/pin/?username=kaze-k&repo=web-nodejs" alt="项目仓库卡片"></el-link>
      <el-link type="success" href="http://github.com/kaze-k/script"><img class="repo-card"
          src="https://github-readme-stats.vercel.app/api/pin/?username=kaze-k&repo=script" alt="项目仓库卡片"></el-link>
    </el-card>
    <el-card id="banner-container" shadow="hover">
      <span id="title">
        <el-link href="https://github.com/kaze-k" target="_blank">kaze</el-link>
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