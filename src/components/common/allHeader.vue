<script setup lang="ts">
import { ElHeader, ElAvatar, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus'
import { FullScreen } from '@element-plus/icons-vue'
import { getToken, removeToken } from '@/utils/token'
import { ref } from 'vue'
import router from '@/router'
import screenfull from 'screenfull'

const name = ref<string>(getToken('username'))

const switchUser = () => {
  router.push('/login')
}

const logout = () => {
  removeToken()
  router.replace('/login')
}

const user = () => {
  router.push('/user/')
}

const home = () => {
  router.push('/home/')
}
</script>

<template>
  <el-header>
    <div id="title" @click="home"><i class="fa fa-address-card" aria-hidden="true"></i><span>学生管理系统</span></div>
    <div id="screenfull" @click="screenfull.toggle()">
      <el-tooltip class="box-item" effect="dark" content="点击全屏缩放" placement="bottom">
        <el-icon>
          <FullScreen />
        </el-icon>
      </el-tooltip>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar shape="square" @click="user">{{ name }}</el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="switchUser"><i class="fa fa-refresh" aria-hidden="true"></i>切换用户</el-dropdown-item>
          <el-dropdown-item @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style scoped lang="less">
.el-header {
  box-shadow: 10px 0 10px #888;
  width: 100%;
  height: 6vh;
  background: rgba(113, 190, 243, .8);
  backdrop-filter: blur(3px);
  align-items: center;
  color: #fff;
  display: flex;
  position: relative;

  .el-dropdown-link {
    cursor: pointer;
  }

  #screenfull {
    display: flex;
    flex: 1;
    align-items: center;
    box-sizing: border-box;
    justify-content: flex-end;
    margin-right: 20px;
    cursor: pointer;
  }

  #title {
    font-size: 24px;
    cursor: pointer;

    .fa {
      margin-right: 5px
    }
  }
}
</style>