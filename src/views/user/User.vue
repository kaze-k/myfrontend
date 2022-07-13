<script setup lang="ts">
import { ref } from 'vue'
import { ElCard } from 'element-plus'
import { getToken } from '@/utils/token'
import passwdDialog from '@/components/user/passwdDialog.vue'
import usernameDialog from '@/components/user/usernameDialog.vue'

const user = getToken("username")
const role = ref("")
if (getToken("token").includes("[sudo]")) {
  role.value = "管理员"
} else if (getToken("token").includes("[root]")) {
  role.value = "超级管理员"
} else {
  role.value = "普通用户"
}

// 密码对话框开关
const passwdDialogVisible = ref(false)

// 开启修改密码对话框
const handlePasswdDialog = () => {
  passwdDialogVisible.value = true
}

// 用户名对话框开关
const usernameDialogVisible = ref(false)

// 开启修改用户名对话框
const handleUsernameDialog = () => {
  usernameDialogVisible.value = true
}

</script>

<template>
  <div>
    <el-card id="card">
      <div id="banner-container"></div>
      <el-avatar style="width: 200px; height: 200px;"><img src="@/assets/image/avatar.jpg" alt="用户头像"
          style="z-index: 2"></el-avatar>
      <div id="container">
        <div id="left-container">
          <span id="user">{{ user }}</span>
          <br />
          <span id="role">{{ role }}</span>
        </div>
        <el-card id="text-card" shadow="hover">
          <div id="right-container">
            <div @click="handlePasswdDialog"><i class="fa fa-pencil-square-o"></i>修改密码</div>
            <br />
            <div @click="handleUsernameDialog"><i class="fa fa-pencil-square-o"></i>修改用户名</div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
  <!-- 修改密码对话框 -->
  <passwd-dialog v-model="passwdDialogVisible" v-if="passwdDialogVisible" />
  <!-- 修改用户名对话框 -->
  <username-dialog v-model="usernameDialogVisible" v-if="usernameDialogVisible" />
</template>

<style scoped lang="less">
#card {
  position: relative;
  --el-card-padding: 0;
  height: 270px;

  #banner-container {
    height: 160px;
    background-image: url('@/assets/image/user-banner.jpg');
    background-size: cover;
    background-position: bottom;
  }

  #container {
    margin-left: 200px;
    width: 100%;
    height: 10rem;
    display: flex;
    justify-self: center;
    align-items: center;
  }

  #text-card {
    margin-top: -50px;
    width: 200px;
  }

  .el-avatar {
    position: absolute;
    top: 70px;
    left: 0;
  }

  .el-divider {
    height: 100px;
    border-width: 2px;
    border-color: #000;
  }

  #left-container {
    margin-top: -50px;
    padding-left: 20px;
    width: 500px;

    #user {
      font-size: 34px;
      font-weight: bolder;
    }

    #role {
      color: #787878;
      font-weight: bold;
    }
  }

  #right-container {
    width: 500px;

    div:hover {
      color: #71bef3;
      cursor: pointer;
    }
  }
}
</style>