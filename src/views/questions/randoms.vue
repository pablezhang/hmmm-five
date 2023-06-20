<template>
  <div>
    <el-card class="box-card" style="margin: 10px">
      <el-row
        type="flex"
        justify="end"
        style="width: 100%"
        class="row-bg"
        :gutter="24"
      >
        <el-col :span="13">
          <el-form label-width="80px">
            <el-form-item label="关键字">
              <el-input
                size="small"
                placeholder="根据编号搜索"
                style="width: 300px"
              />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" style="float: right" :offset="14">
          <el-button size="small" type="primary">搜索</el-button>
          <el-button size="small">清除</el-button>
        </el-col>
      </el-row>
      <el-alert title="数据一共178条" type="info" :closable="false" show-icon />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="编号" width="180" />
        <el-table-column prop="questionType" label="题型" width="180" />
        <el-table-column prop="questionIDs" label="题目编号" />
        <el-table-column prop="addTime" label="录入时间" /><el-table-column
          prop="totalSeconds"
          label="答题时间(s)"
        /><el-table-column prop="accuracyRate" label="正确率" />
        <el-table-column
          prop="userName"
          label="录取人"
        />
        <el-table-column label="操作">
          <div class="icon">
            <i class="el-icon-delete" />
          </div>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        style="float:right; margin:20px 0"
        background
        :current-page="pageList.page"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      /> -->
    </el-card>
  </div>
</template>
<script>
import { getQuestionListAPI } from '@/api/randoms'
export default {
  data() {
    return {
      tableData: []
    }
  },
  async created() {
    await this.onLoad()
  },
  methods: {
    async onLoad() {
      const res = await getQuestionListAPI()
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
</style>
