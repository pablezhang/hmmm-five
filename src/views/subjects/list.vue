<template>
  <div>
    <el-card class="box-card" style="margin: 10px">
      <div class="header">
        <el-form :inline="true" label-width="80px">
          <el-form-item label="学科名称">
            <el-input
              size="small"
              autocomplete="off"
              style="width: 220px"
            />
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary">搜索</el-button>
            <el-button size="small">清除</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button icon="el-icon-edit" type="success" size="small">新增学科</el-button>

        </div>
      </div>

      <el-alert title="数据一共 241 条" type="info" :closable="false" show-icon style="margin-bottom:15px" />
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#fafafa'}">
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="subjectName" label="学科名称" width="180" />
        <el-table-column prop="username" label="创建者" width="90" />
        <el-table-column prop="addDate" label="创建日期" width="200" />
        <el-table-column prop="isFrontDisplay" label="前台是否显示" width="150" />
        <el-table-column prop="twoLevelDirectory" label="二级目录" width="150" />
        <el-table-column prop="tags" label="标签" width="150" />
        <el-table-column prop="totals" label="题目数量" width="150" />
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button type="text">学科分类</el-button>
            <el-button type="text">学科标签</el-button>
            <el-button type="text">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <el-pagination
        style="float:right ;margin:30px 0px "
        background
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script>
import { getSubjectListAPI } from '@/api/list'
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage4: 1
    }
  },
  async created() {
    await this.onLoad()
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    async  onLoad() {
      const res = await getSubjectListAPI()
      this.tableData = res.items
      console.log(res)
    }
  }
}
</script>
<style>
::v-deep .el-button {
  font-size: 12px !important;
  border-radius: 3px !important;
}
.icon {
  /* display: block; */
  width: 3px;
  height: 23px;
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
  border-radius: 50%;
  padding: 16px;
  text-align: center;
  font-size: 12px;
  display: flex;
}
.el-icon-delete{
margin: -5px;
}
.header{
display: flex;
justify-content: space-between;
}
</style>
