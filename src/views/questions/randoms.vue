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
                v-model="id"
                size="small"
                placeholder="根据编号搜索"
                style="width: 300px"
              />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="float: right" :offset="14">
          <el-button
            size="small"
            type="primary"
            @click="search()"
          >搜索</el-button>
          <el-button size="small">清除</el-button>
        </el-col>
      </el-row>
      <el-alert :title="'数据一共'+pageList.pages+'条'" type="info" :closable="false" show-icon />
      <el-table :data="tableData" style="width: 100% ;margin-top:10px" :header-cell-style="{background:'#fafafa'}">
        <el-table-column prop="id" label="编号" width="200" />
        <el-table-column prop="questionType" label="题型" width="90" />
        <el-table-column prop="questionIDs" label="题目编号">
          <template #default="{ row }">
            <span style="color:#409EFF" @click="edit(row)">{{ row.questionIDs }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="录入时间" /><el-table-column
          prop="totalSeconds"
          label="答题时间(s)"
        /><el-table-column prop="accuracyRate" label="正确率" />
        <el-table-column prop="userName" label="录取人" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <div class="icon">
              <i class="el-icon-delete" @click="del(row.id)" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="float: right; margin: 20px 0"
        background
        :current-page="pageList.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="pageList.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageList.pages"
        @current-change="currentChange"
      />
    </el-card>

    <el-dialog title="题目概览" :visible.sync="dialogVisible" width="50%">
      <div>
        <el-row type="flex" justify="start" style="margin-bottom=20px">
          <el-col :span="6">[题型]:</el-col>
          <el-col :span="6">[编号]:</el-col>
          <el-col :span="6">[难度]:</el-col>
          <el-col :span="6">[标签]:</el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="6">[学科]:</el-col>
          <el-col :span="6">[目录]:</el-col>
          <el-col :span="6">[方向]:</el-col>
        </el-row>
        <hr>
        <div>[参考答案 ]</div>
        <div>选项 :(以下选中的 选项为正确答案)</div>
        <hr>
        <div>
          [题干]
          <el-button type="danger">视频答案预选</el-button>
          <hr>
          <div>[答案解析]</div>
          <hr>
          <div>[题目备注]</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import '@/mock/index'
import { delRandomAPI, getRandomAPI, searchRandomAPI } from '@/api/randoms'

export default {
  data() {
    return {
      tableData: [],
      pageList: {
        page: 1,
        pagesize: null,
        pages: null
      },
      id: null,
      dialogVisible: false
    }
  },
  async created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      const res = await getRandomAPI({
        page: this.pageList.page,
        pagesize: 10
      })
      this.tableData = res.users
      this.pageList.pagesize = res.pagesize
      this.pageList.pages = res.pages
    },

    currentChange(page) {
      console.log(page)
      this.pageList.page = page
      this.onLoad()
    },
    async del(id) {
      this.$confirm('此操作将永久删除该学科, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await delRandomAPI({ id })
        this.$message('删除成功')
        console.log(res)
      })
    },
    async search() {
      await searchRandomAPI({ id: this.id })
      this.$message.success('搜索成功')
    },
    edit() {
      this.dialogVisible = true
      console.log(1)
    }
  }
}
</script>
<style scope>
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
.el-icon-delete {
  margin: -5px;
}
.el-dialog {
    border-radius: 10px;
}
 .el-dialog__header {
    padding: 20px 20px 10px;
    background: #409eff;
    border-radius: 9px 9px 0 0;
}
.el-dialog__header .el-dialog__title {
    color: #fff;
}
.el-icon-close:before {
    content: "\e6db";
    color: #fff;
}
.el-row {
    box-sizing: border-box;
    margin-bottom: 20px;
}

</style>
