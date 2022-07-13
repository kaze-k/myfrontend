<script setup lang="ts">
import { ElCard, ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const route: RouteLocationNormalizedLoaded = useRoute()
</script>

<template>
  <div id="breadcrumb">
    <el-card>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/home/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in route.matched" :key="index" v-if="route.matched[0].name !== '首页'">{{
        item.name
        }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
  </div>

</template>

<style setup lang="less">
</style>