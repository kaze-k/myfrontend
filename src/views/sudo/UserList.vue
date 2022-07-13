<script setup lang="ts">
import { ElCard, ElRow, ElCol, ElInput, ElTable, ElTableColumn, ElSwitch, ElPagination } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { options } from '@/utils/sudo/tableOptions'
import { getUsersList } from '@/api'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'


// TODO:添加类型接口

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
  const res = await getUsersList()
  tableData.value = res.data.data
  total.value = res.data.data.length
}
initGetList()

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
      </el-row>
    </el-card>
    <!-- 表格 -->
    <el-table :data="filterTableData" empty-text="暂无数据" border stripe style="width: 100%">
      <el-table-column v-for="(item, index) in options" :key="index" :prop="item.prop" :label="item.label"
        align="center">
        <!-- 管理员开关 -->
        <template v-slot="{ row }" v-if="item.prop === 'isroot'">
          <el-switch v-model="row.isroot" disabled />
        </template>
        <!-- 登录开关 -->
        <template v-slot="{row}" v-else-if="item.prop === 'islogin'">
          <el-switch v-model="row.islogin" disabled />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-config-provider :locale="zhCn">
      <el-pagination v-model:current-page="pageNum" :pager-count="11" :page-size="pageSize"
        layout="total, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" />
    </el-config-provider>
  </el-card>
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