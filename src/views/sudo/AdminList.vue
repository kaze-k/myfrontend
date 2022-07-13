<script setup lang="ts">
import { ElCard, ElRow, ElCol, ElInput, ElTable, ElTableColumn, ElButton, ElSwitch, ElPagination, ElMessage, ElMessageBox } from 'element-plus'
import { Search, Edit, Delete, Check, Close } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { adminOptions } from '@/utils/sudo/tableOptions'
import dialogForm from '@/components/sudo/dialogForm.vue'
import { postUsersList, updatePermissions, updateLoginState, delUser } from '@/api'
import { getToken } from '@/utils/token'
import router from '@/router'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'


/* 搜索 */
const search = ref('')

/* 分页器 */
// 分页器数据绑定
const total = ref(0)       // 数据总数
const pageNum = ref(1)     // 当前页数
const pageSize = ref(7)    // 每页显示条数

// 跳转到其他页
const handleCurrentChange = (pagenum: number) => {
  pageNum.value = pagenum
  initGetList()
}

/* 表格 */
// 表格数据绑定
const tableData = ref([])

// 表格渲染
const searchTableData = computed(() =>
  tableData.value.filter(
    (data: any) =>
      !search.value ||
      data.username.toLowerCase().includes(search.value.toLowerCase())
  )
)

// 分页设置
const filterTableData = computed(() =>
  searchTableData.value
    .splice((pageNum.value - 1) * pageSize.value, pageNum.value * pageSize.value)
)

// 初始化表格
const initGetList = async () => {
  // 后端请求数据
  const res = await postUsersList()
  tableData.value = res.data.data
  total.value = res.data.data.length
}
initGetList()

/* 开关 */
// 切换用户权限
const changeRootState = (row: any) => {
  const username = getToken("username")
  if (row.username === username) {
    ElMessageBox.confirm(
      '是否取消自己的管理员权限？',
      '管理员设置',
      {
        confirmButtonText: '管理员，狗都不当',
        cancelButtonText: '手滑了',
        type: 'warning',
      }
    )
      .then(async () => {
        await updatePermissions(row.id, row.isroot)
        router.replace('/login')
      })
      .catch(initGetList)
  } else {
    updatePermissions(row.id, row.isroot).then(res => {
      ElMessage({ message: res.data.message, type: 'success', center: true, grouping: true, showClose: true })
    })
  }
}

// 切换用户登录状态
const changeLoginState = (row: any) => {
  const username = getToken("username")
  if (row.username === username) {
    ElMessageBox.confirm(
      '是否取消自己的登录权限？',
      '登录设置',
      {
        confirmButtonText: '自闭了',
        cancelButtonText: '手滑了',
        type: 'warning',
      }
    )
      .then(async () => {
        await updateLoginState(row.id, row.islogin)
        router.replace('/login')
      })
      .catch(initGetList)
  } else {
    updateLoginState(row.id, row.islogin).then(res => {
      ElMessage({ message: res.data.message, type: 'success', center: true, grouping: true, showClose: true })
    })
  }
}

/* 删除用户 */
const deleteUser = (row: any) => {
  const username = getToken("username")
  if (row.username === username) {
    ElMessageBox.confirm(
      '将要删除你自己的账号，是否删除？',
      '删除用户',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      }
    ).then(async () => {
        await delUser(row.id)
        router.replace('/login')
      })
  } else {
    ElMessageBox.confirm(
      '是否删除？',
      '删除用户',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }
    ).then(() => {
      delUser(row.id).then(res => {
        if (res.data.code === 0) {
          ElMessage({ message: res.data.message, type: 'success', center: true })
          const username = getToken("username")
          if (row.username === username) {
            router.replace('/login')
          }
          initGetList()
        } else {
          ElMessage({ message: res.data.message, type: 'error', center: true })
        }
      })
    })
  }
}

/* 添加用户 */
// 对话框数据开关绑定
const dialogVisible = ref(false)
// 对话框表单数据绑定
const dialogTableValue = ref({})

/* 对话框(dialog) */
// 开启对话框
const handleDialogValue = (row: any) => {
  if (JSON.stringify(row) === '{"isTrusted":true}') {
    dialogTitle.value = "添加用户"
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = "编辑用户"
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
  }
  dialogVisible.value = true
}

// 对话框标题
const dialogTitle = ref('')

</script>

<template>
  <el-card>
    <el-card shadow="hover">
      <el-row :gutter="20">
        <el-col :span="5">
          <!-- 搜索框 -->
          <el-input :prefix-icon="Search" placeholder="请输入用户名搜索" v-model="search" clearable>
          </el-input>
        </el-col>
        <!-- 添加用户按钮 -->
        <el-button type="primary" :icon="Edit" @click="handleDialogValue" id="edit-button" />
      </el-row>
    </el-card>
    <!-- 表格 -->
    <el-table :data="filterTableData" empty-text="暂无数据" border stripe style="width: 100%">
      <el-table-column v-for="(item, index) in adminOptions" :key="index" :prop="item.prop" :label="item.label"
        align="center">
        <!-- 管理员开关 -->
        <template v-slot="{ row }" v-if="item.prop === 'isroot'">
          <el-switch :active-icon="Check" :inactive-icon="Close" v-model="row.isroot" inline-prompt
            @change="changeRootState(row)" />
        </template>
        <!-- 登录开关 -->
        <template v-slot="{row}" v-else-if="item.prop === 'islogin'">
          <el-switch :active-icon="Check" :inactive-icon="Close" v-model="row.islogin" inline-prompt
            @change="changeLoginState(row)" />
        </template>
        <!-- 修改和删除 -->
        <template v-slot="{ row }" v-else-if="item.prop === 'action'">
          <el-button type="danger" :icon="Delete" @click="deleteUser(row)" />
          <el-button type="primary" :icon="Edit" @click="handleDialogValue(row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-config-provider :locale="zhCn">
      <el-pagination v-model:current-page="pageNum" :pager-count="11" :page-size="pageSize"
        layout="total, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" />
    </el-config-provider>
  </el-card>
  <!-- 对话框 -->
  <dialog-form v-model="dialogVisible" :dialogTitle="dialogTitle" :dialogTableValue="dialogTableValue"
    v-if="dialogVisible" @initList="initGetList" />
</template>

<style scoped lang="less">
.el-row {
  position: reactive;

  #edit-button {
    position: absolute;
    right: 0;
  }
}

.el-pagination {
  padding-top: 16px;
  padding-bottom: 16px;
  float: right;
}
</style>