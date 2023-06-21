<template>
  <div>
    <div class="container">
      <el-row type="flex" justify="space-between">
        <el-form label-width="80px">
          <el-row type="flex">
            <el-form-item label="目录名称">
              <el-input v-model.trim="reqParameter.directoryName" size="small" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="reqParameter.state" size="small">
                <el-option label="启用" value="1" />
                <el-option label="禁用" value="0" />
              </el-select>
            </el-form-item>
            <el-button size="small" style="margin-left:10px" class="btn" @click="eliminate">清除</el-button>
            <el-button size="small" class="btn" type="primary" @click="goSearch">搜索</el-button>
          </el-row>
        </el-form>
        <el-col :span="8" :push="5">
          <span v-show="$route.query.id" style="color:#409eff;cursor:pointer;margin-right:10px; font-size: 15px" @click="$router.go(-1)"><i class="el-icon-back">返回学科</i></span>
          <el-button class="btn" type="success" size="small" @click="visible=true"><i class="el-icon-edit" /> 新增目录</el-button>
        </el-col>
      </el-row>
      <div class="total"><i class="el-icon-info" /> 数据一共 {{ counts }} 条</div>
      <el-table :data="tableList" class="table" :header-cell-style="{background:'#fafafa'}">
        <el-table-column align="center" type="index" label="序号" />
        <el-table-column align="center" prop="subjectName" label="所属学科" />
        <el-table-column align="center" prop="directoryName" label="目录名称" />
        <el-table-column align="center" prop="username" label="创建者" />
        <el-table-column align="center" prop="addDate" label="创建日期">
          <template #default="{row}">
            <span>
              {{ new Date(row.addDate).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }).replace(/\//g, '-') }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="totals" label="面试题数量" />
        <el-table-column align="center" prop="state" label="状态">
          <template #default="{row}">
            <span>{{ row.state===1?'已启用':'已禁用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{row}">
            <el-row>
              <el-button type="text" @click="updateStatus(row)">{{ row.state===1?'禁用':'启用' }}</el-button>
              <el-button type="text" :disabled="row.state===0" @click="editData(row.id)">修改</el-button>
              <el-button type="text" :disabled="row.state===0" @click="delData(row.id)">删除</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" style="margin-top:10px">
        <el-pagination
          :page-sizes="[5, 10]"
          :page-size="reqParameter.pagesize"
          layout="prev, pager, next, sizes, jumper"
          :total="counts"
          :current-page="reqParameter.page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </div>
    <dire-dialog ref="dialog" :visible.sync="visible" @updateTable="renderTable()" />
  </div>
</template>

<script>
import { delCatalogAPI, getCatalogDetailAPI, getCatalogListAPI, updateStatusAPI } from '@/api/directorys'
import DireDialog from './components/DireDialog.vue'
export default {
  components: { DireDialog },
  data() {
    return {
      tableList: [], // 表格渲染数组
      reqParameter: {
        page: 1, // 当前页
        pagesize: 10, // 页尺寸
        subjectID: null, // 学科ID
        directoryName: null, // 目录名称
        state: null // 状态
      }, // 请求参数
      counts: null, // 总条目数
      pages: null, // 总页数
      visible: false // 新增修改弹出层开关
    }
  },
  created() {
    this.renderTable(this.reqParameter)
  },
  methods: {
    async renderTable(params) {
      const res = await getCatalogListAPI(params)
      this.tableList = res.items
      this.counts = res.counts
      this.pages = res.pages
    },
    handleSizeChange(val) {
      this.reqParameter.pagesize = val
      this.renderTable(this.reqParameter)
    },
    handleCurrentChange(val) {
      this.reqParameter.page = val
      this.renderTable(this.reqParameter)
    },
    // 搜索功能
    goSearch() {
      this.reqParameter.page = 1
      this.renderTable(this.reqParameter)
      this.$message.success('搜索成功')
    },
    // 清除搜索内容
    eliminate() {
      this.reqParameter = {
        page: 1,
        pagesize: 10,
        subjectID: null,
        directoryName: null,
        state: null
      }
      this.renderTable(this.reqParameter)
      this.$message.success('已重置表格数据')
    },
    // 修改目录
    async editData(id) {
      const res = await getCatalogDetailAPI(id)
      this.$refs.dialog.formData = res
      this.visible = true
    },
    // 更新状态
    async updateStatus(row) {
      await updateStatusAPI(row.id, row.state === 1 ? 0 : 1)
      this.$message.success('状态已更换')
      this.renderTable(this.reqParameter)
    },
    // 删除目录
    async delData(id) {
      await this.$confirm('即将永久删除该目录,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await delCatalogAPI(id)
      this.$message.success('已删除该目录')
      this.renderTable(this.reqParameter)
    }
  }
}

</script>

<style lang="scss" scoped>
.container{
  border-radius: 5px;
  margin: 10px;
  padding: 20px;
  background-color: #fff;
  .btn{
    margin-top: 4px;
    height: 32px;
  }
  .total{
    padding-left: 15px;
    width: 100%;
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    border-radius: 5px;
    color: #909399;
    background-color: #f4f4f5;
  }
  .table{
    margin-top: 20px;
  }
}

</style>
