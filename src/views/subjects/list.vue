<template>
  <div>
    <el-card class="box-card" style="margin: 10px">
      <div class="header">
        <el-form :inline="true" label-width="80px" :model="form">
          <el-form-item label="学科名称">
            <el-input
              v-model="form.subjectName"
              size="small"
              autocomplete="off"
              style="width: 220px"
            />
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="search()">搜索</el-button>
            <el-button size="small" @click="clear">清除</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button icon="el-icon-edit" type="success" size="small" @click="visible=true">新增学科</el-button>

        </div>
      </div>

      <el-alert title="数据一共 241 条" type="info" :closable="false" show-icon style="margin-bottom:15px" />
      <el-table :data="tableData" style="width: 100% " :header-cell-style="{background:'#fafafa' }">
        <el-table-column prop="id" label="序号" width="80">
          <template #default="{$index}">{{ $index }}</template>

        </el-table-column>
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
            <el-button type="text" @click="edit(row.id)">修改</el-button>
            <el-button type="text" @click="del(row.id)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <el-pagination
        style="float:right ;margin:20px 0px "
        background
        :current-page="pageList.page"
        :page-size.sync="pageList.pageSize"
        layout=" prev, pager, next, sizes,jumper"
        :page-sizes="[10, 20, 30, 50,100]"
        :total="counts"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <dialog-item ref="editDialog" :visible.sync="visible" @add="onLoad()" />
  </div>

</template>
<script>
import { delSubjectsAPI, getSubjectListAPI } from '@/api/list'
import dialogItem from './components/dialog-Item.vue'
export default {
  components: { dialogItem },
  data() {
    return {
      tableData: [],
      pageList: {
        page: 1,
        pages: null,
        pageSize: null
      },
      form: {
        subjectName: ''
      },
      counts: null,
      visible: false,
      id: null
    }
  },
  async created() {
    await this.onLoad()
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange(page) {
      this.pageList.page = page
      this.onLoad({ page })
    },
    async  onLoad(params) {
      const res = await getSubjectListAPI(params)
      this.tableData = res.items
      this.counts = res.counts
      this.pageList.pages = res.pages
      this.pageList.pageSize = res.pageSize
    },
    async edit(id) {
      await this.$refs.editDialog.edit(id)
      this.visible = true
      this.id = id
    },
    del(id) {
      this.$confirm('此操作将永久删除该学科, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delSubjectsAPI(id)
        await this.onLoad()
        this.$message.success('删除成功')
      })
    },
    clear() {
      this.form.subjectName = ''
    },
    async search() {
      await this.onLoad({ subjectName: this.form.subjectName })
    }
  }
}
</script>
<style>
::v-deep .el-button {
  font-size: 12px !important;
  border-radius: 3px !important;
}
.header{
display: flex;
justify-content: space-between;
}

</style>
