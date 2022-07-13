<script setup lang="ts">
import { ElTable, ElTableColumn, ElButton, ElCard, ElInput, ElMessageBox, ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { studentList } from '@/api'
import selector from '@/components/student/selector.vue'
import { userOptions } from '@/utils/student/tableOptions'
import filterTable from '@/utils/student/filterTable'


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
        </div>
      </el-card>
      <!-- 表格 -->
      <el-table :data="filterTableData" height="50vh" stripe border style="width: 100%" empty-text="没有数据">
        <el-table-column v-for="(item, index) in userOptions" :prop="item.prop" :label="item.label" align="center">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="less">
#option-container {
  position: relative;
}

.el-select {
  margin-left: 20px;
  width: 100px;
}

.el-input {
  width: 200px;
}
</style>