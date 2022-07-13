<script setup lang="ts">
import { ElTable, ElTableColumn, ElButton, ElCard, ElInput, ElMessageBox, ElMessage } from 'element-plus'
import { ref } from 'vue'
import { studentList, delStudentData } from '@/api'
import selector from '@/components/student/selector.vue'
import { options } from '@/utils/student/tableOptions'
import filterTable from '@/utils/student/filterTable'
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import dialogForm from '@/components/student/dialogForm.vue'


// 表单数据
const tableData = ref<Array<any>>([])

// 获取后端数据
const getData = async () => {
  const res = await studentList()
  tableData.value = res.data.data
}
getData()

// 搜索框
const search = ref("")

// 选择器组件传递的数据
const value = ref()

// 对话框开关
const dialogVisible = ref(false)
// 对话框表单数据
const dialogTableValue = ref({})

// 对话框标题
const dialogTitle = ref('')

// 开启对话框
const handleDialogValue = (row: any) => {
  if (JSON.stringify(row) === '{"isTrusted":true}') {
    dialogTitle.value = "添加学生信息"
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = "编辑学生信息"
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
  }
  dialogVisible.value = true
}

// 删除学生信息
const delStudent = (row: any) => {
  ElMessageBox.confirm(
    '是否删除？',
    '删除学生信息',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    delStudentData(row.id).then(res => {
      if (res.data.code === 0) {
        ElMessage({ message: res.data.message, type: 'success', center: true })
        getData()
      } else {
        ElMessage({ message: res.data.message, type: 'error', center: true })
      }
    })
  })
}

// 表格渲染
const filterTableData = filterTable(tableData, value, search)

</script>

<template>
  <div>
    <el-card shadow="always">
      <el-card shadow="hover">
        <div id="option-container" style="display: inline-flex; width: 100%;">
          <!-- 搜索框 -->
          <el-input v-model="search" size="small" placeholder="搜索一下" :prefix-icon="Search" clearable />
          <!-- 选择器 -->
          <selector ref="value" />
          <!-- 添加按钮 -->
          <el-button id="edit" size="small" :icon="Edit" @click="handleDialogValue" circle />
        </div>
      </el-card>
      <!-- 表格 -->
      <el-table :data="filterTableData" height="50vh" stripe border style="width: 100%" empty-text="没有数据">
        <el-table-column v-for="(item, index) in options" :prop="item.prop" :label="item.label" align="center">
          <!-- 修改和删除 -->
          <template v-slot="{ row }" v-if="item.prop === 'action'">
            <el-button type="danger" :icon="Delete" @click="delStudent(row)" />
            <el-button type="primary" :icon="Edit" @click="handleDialogValue(row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <!-- 对话框 -->
  <dialog-form v-model="dialogVisible" :dialogTitle="dialogTitle" :dialogTableValue="dialogTableValue"
    v-if="dialogVisible" @initList="getData" />
</template>

<style scoped lang="less">
#option-container {
  position: relative;
}

#edit {
  position: absolute;
  right: 0;
}

.el-select {
  margin-left: 20px;
  width: 100px;
}

.el-input {
  width: 200px;
}
</style>