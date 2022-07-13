<script setup lang="ts">
import { ElAside, ElMenu, ElSubMenu, ElIcon, ElMenuItemGroup, ElMenuItem, ElSwitch } from 'element-plus'
import { reactive, ref } from 'vue'
import router from '@/router'
import { getToken } from '@/utils/token'
const menus: any = reactive([...router.options.routes])
const showRole = () => {
  if (getToken("token").includes("[root]") || getToken("token").includes("[sudo]")) {
    return true
  } else {
    return false
  }
}
// TODO:伸缩
const isCollapse = ref(false)
</script>

<template>
  <div>
    <el-aside width="200px" v-model="isCollapse">
      <el-menu :collapse="isCollapse" active-text-color="#fff" background-color="#86c8f4"
        class="el-menu-vertical-demo" :default-active="menus[4].children[0].path" text-color="#fff" router
        unique-opened>
        <!--  单菜单 -->
        <template v-for="(item, index) in menus">
          <el-menu-item :index="item.children[0].path" :key="index" v-if="!item.meta.hidden && !item.meta.group">
            <el-icon>
              <i :class="item.meta.icon"></i>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
        <!-- 多菜单 -->
        <template v-for="(item, index) in menus">
          <el-sub-menu :index="index + ''" :key="index" v-if="!item.meta.hidden && item.meta.group">
            <template #title>
              <el-icon>
                <i :class="item.meta.icon"></i>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group v-for="(child, index) in item.children">
              <el-menu-item :collapse="isCollapse" :index="child.path" v-if="showRole()">
                <el-icon>
                  <i :class="child.meta.icon"></i>
                </el-icon>
                <span>{{ child.name }}</span>
              </el-menu-item>
              <el-menu-item :collapse="isCollapse" :index="child.path" v-else-if="!child.meta.permissions">
                <el-icon>
                  <i :class="child.meta.icon"></i>
                </el-icon>
                <span>{{ child.name }}</span>
              </el-menu-item>
              <el-menu-item :collapse="isCollapse" :index="child.path" v-else disabled style="color: #000">
                <el-icon>
                  <i :class="child.meta.icon"></i>
                </el-icon>
                <span>{{ child.name }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
        <!-- 切换按钮 -->
      </el-menu>
    </el-aside>
  </div>
</template>

<style scoped lang="less">
.el-aside {
  height: 100%;

  .el-menu {
    height: 100%;

    .el-submenu .el-menu-item {
      min-width: 0;
    }
  }
}
</style>