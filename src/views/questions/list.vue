<template>
  <div style="padding: 10px; background: #eceef1">
    <el-card>
      <div class="header">
        <div style="font-size: 12px; color: pink">
          说明：目前支持学科和关键字条件筛选
        </div>
        <el-button
          type="success"
          @click="$router.push('/questions/new')"
        ><i class="el-icon-edit" />新增试题</el-button>
      </div>
      <el-form label-width="80px">
        <el-row type="flex" :gutter="32">
          <el-col :span="8">
            <el-form-item label="学科">
              <el-select v-model="questionSearchData.subjectID">
                <el-option
                  v-for="item in subjectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="二级目录">
              <el-select v-model="questionSearchData.catalogID" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签">
              <el-select v-model="questionSearchData.tags" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关键字">
              <el-input v-model="questionSearchData.keyword" placeholder="根据题干搜索" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="32">
          <el-col :span="8">
            <el-form-item label="试题类型">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="难度">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="方向">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
              <el-input />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="32">
          <el-col :span="8">
            <el-form-item label="题目备注">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业简称">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <el-input style="width: 100px" />
              <el-input style="width: 100px; margin-left: 5px" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item style="display: flex; justify-content: end">
              <el-button>清除</el-button>
              <el-button type="primary">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-alert
        style="margin-bottom: 15px"
        title="数据一共X条"
        type="info"
        show-icon
      />
      <el-table
        :data="tableList"
        :header-cell-style="{ background: '#fafafa' }"
      >
        <el-table-column prop="number" label="试题编号" width="120px" />
        <el-table-column prop="subject" label="学科" width="105px" />
        <el-table-column prop="catalog" label="目录" width="100px" />
        <el-table-column prop="questionType" label="题型" width="100px">
          <template #default="{ row }">
            {{ ["多选", "单选"][row.questionType] }}
          </template>
        </el-table-column>
        <el-table-column prop="question" label="题干" width="280px">
          <template #default="{ row }">
            <div v-html="row.question" />
          </template>
        </el-table-column>
        <el-table-column prop="addDate" label="录入时间" width="180px" />
        <el-table-column prop="difficulty" label="难度" width="100px">
          <template #default="{ row }">
            {{ ["困难", "简单"][row.difficulty] }}
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="录入人" width="100px" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-view"
              circle
              plain
              @click="onView(row)"
            />
            <el-button
              size="mini"
              type="success"
              icon="el-icon-edit"
              circle
              plain
            />
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="onDelete(row)"
            />
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-check"
              circle
              plain
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px; text-align: right"
        background
        :page-sizes="[5, 10, 20, 50]"
        layout="prev, pager, next,sizes,jumper"
        :total="total"
      />
    </el-card>
    <el-dialog :visible.sync="visible" title="题目预览" width="60%">
      <el-row :gutter="32" type="flex" style="margin-bottom: 20px">
        <el-col
          :span="8"
        >【题型】：{{ ["多选", "单选"][viewData.questionType] }}</el-col>
        <el-col :span="8">【编号】：{{ viewData.id }}</el-col>
        <el-col
          :span="8"
        >【难度】：{{ ["困难", "简单"][viewData.difficulty] }}</el-col>
        <el-col :span="8">【标签】：{{ viewData.tags }}</el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="6">【学科】：{{ viewData.subjectName }}</el-col>
        <el-col :span="6">【目录】：{{ viewData.directoryName }}</el-col>
        <el-col :span="8">【方向】：{{ viewData.direction }}</el-col>
      </el-row>
      <el-divider />
      <el-row>【题干】：</el-row>
      <el-row>
        <el-col> 单选题 选项：（以下选中的选项为正确答案） </el-col>
        <el-col />
      </el-row>
      <el-divider />
      <el-row>
        【参考答案】：<el-button
          type="danger"
          @click="isShowVideo = true"
        >视频答案预览</el-button>
        <el-col v-if="isShowVideo">
          <video :src="viewData.videoURL" controls />
        </el-col>
      </el-row>
      <el-divider />
      <el-row type="flex">
        【答案解析】：
        <div v-html="viewData.answer" />
      </el-row>
      <el-divider />
      <el-row> 【题目备注】：{{ viewData.remarks }} </el-row>
      <div slot="footer">
        <el-button type="primary" @click="visible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  deleteQuestionsAPI,
  gerQuestionsAPI,
  gerQuestionsViewAPI,
  getSubjectsAPI
} from '@/api/questions'
export default {
  data() {
    return {
      questionSearchData: {
        page: 1, // 当前页数
        pagesize: 10, // 页尺寸
        subjectID: '', // 学科
        difficulty: '', // 难度
        questionType: '', // 试题类型
        tags: '', // 标签名称
        province: '', // 企业所在地省份
        city: '', // 企业所在城市
        keyword: '', // 关键字
        remarks: '', // 题目备注
        shortName: '', // 企业简称
        direction: '', // 方向
        creatorID: '', // 录入人
        catalogID: '' // 目录
      },
      total: 0,
      tableList: [],
      isShowVideo: false,
      visible: false,
      viewData: {},
      subjectName: '',
      subjectList: []
    }
  },
  created() {
    this.getQuestions()
    this.getSubjects()
  },
  methods: {
    async getQuestions() {
      const res = await gerQuestionsAPI(this.questionSearchData)
      console.log(res)
      this.tableList = res.items
      this.total = res.counts
    },
    async getSubjects() {
      const res = await getSubjectsAPI(this.subjectName)
      // console.log(res)
      this.subjectList = res
    },
    async onView(row) {
      this.visible = true
      const res = await gerQuestionsViewAPI(row.id)
      console.log(res)
      this.viewData = res
    },
    async onDelete(row) {
      this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteQuestionsAPI(row.id)
        this.getQuestions()
        this.$message.success('删除部门成功')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;

  justify-content: space-between;
  margin-bottom: 15px;
}

::v-deep .el-dialog {
  border-radius: 9px 9px 0 0;
}
::v-deep .el-dialog__header {
  background: #409eff;
  border-radius: 9px 9px 0 0;

  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__close {
    color: #fff;
  }
}
</style>
