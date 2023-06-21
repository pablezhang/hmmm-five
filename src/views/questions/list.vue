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
              <el-input
                v-model="questionSearchData.keyword"
                placeholder="根据题干搜索"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="32">
          <el-col :span="8">
            <el-form-item label="试题类型">
              <el-select v-model="questionSearchData.questionType">
                <el-option value="1" label="单选" />
                <el-option value="2" label="多选" />
                <el-option value="3" label="简答" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="难度">
              <el-select v-model="questionSearchData.difficulty">
                <el-option value="1" label="简单" />
                <el-option value="2" label="一般" />
                <el-option value="3" label="困难" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="方向">
              <el-select v-model="questionSearchData.direction">
                <el-option value="o2o" label="o2o" />
                <el-option value="外包服务" label="外包服务" />
                <el-option value="企业服务" label="企业服务" />
                <el-option value="互联网金融" label="互联网金融" />
                <el-option value="企业咨询" label="企业咨询" />
                <el-option value="互联网" label="互联网" />
                <el-option value="电子商务" label="电子商务" />
                <el-option value="其他" label="其他" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
              <el-select v-model="questionSearchData.creatorID">
                <el-option
                  v-for="item in creatorList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.username"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="32">
          <el-col :span="8">
            <el-form-item label="题目备注">
              <el-input v-model="questionSearchData.remarks" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业简称">
              <el-input v-model="questionSearchData.shortName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <el-select
                v-model="questionSearchData.province"
                style="width: 100px"
                @change="getCity"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item"
                  :value="item"
                  :label="item"
                />
              </el-select>
              <el-select v-model="questionSearchData.city" style="width: 100px">
                <el-option
                  v-for="item in cityList"
                  :key="item"
                  :value="item"
                  :label="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item style="display: flex; justify-content: end">
              <el-button @click="onReset">清除</el-button>
              <el-button type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-alert
        style="margin-bottom: 15px"
        type="info"
        show-icon
        :closable="false"
      >
        <div slot="title">
          {{ `数据一共${total}条` }}
        </div>
      </el-alert>
      <el-table
        :data="tableList"
        :header-cell-style="{ background: '#fafafa' }"
      >
        <el-table-column prop="number" label="试题编号" width="200px" />
        <el-table-column prop="subject" label="学科"  />
        <el-table-column prop="catalog" label="目录"  />
        <el-table-column prop="questionType" label="题型" >
          <template #default="{ row }">
            {{ ["单选", "多选", "简答"][row.questionType - 1] }}
          </template>
        </el-table-column>
        <el-table-column prop="question" label="题干" >
          <template #default="{ row }">
            <div v-html="row.question" />
          </template>
        </el-table-column>
        <el-table-column prop="addDate" label="录入时间">
          <template #default="{ row }">
            {{
              new Date(row.addDate)
                .toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
                .replace(/\//g, "-")
            }}
          </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="难度">
          <template #default="{ row }">
            {{ ["简单", "一般", "困难"][row.difficulty - 1] }}
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="录入人" />
        <el-table-column label="操作" width="200px">
          <template #default="{ row }">
            <el-row type="flex">
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
                @click="$router.push(`/questions/new/${row.id}`)"
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
                @click="onAddChoice(row)"
              />
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px; text-align: right"
        background
        :current-page="questionSearchData.page"
        :page-size="questionSearchData.pagesize"
        :page-sizes="[5, 10, 20, 50]"
        layout=" sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog :visible.sync="visible" title="题目预览" width="60%">
      <el-row :gutter="32" type="flex" style="margin-bottom: 20px">
        <el-col
          :span="8"
        >【题型】：{{
          ["单选", "多选", "简答"][viewData.questionType - 1]
        }}</el-col>
        <el-col :span="8">【编号】：{{ viewData.id }}</el-col>
        <el-col
          :span="8"
        >【难度】：{{
          ["简单", "一般", "困难"][viewData.difficulty - 1]
        }}</el-col>
        <el-col :span="8">【标签】：{{ viewData.tags }}</el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="6">【学科】：{{ viewData.subjectName }}</el-col>
        <el-col :span="6">【目录】：{{ viewData.directoryName }}</el-col>
        <el-col :span="8">【方向】：{{ viewData.direction }}</el-col>
      </el-row>
      <el-divider />
      <el-row style="margin-bottom: 15px">【题干】：</el-row>

      <div style="margin-bottom: 15px;color:blue" v-html="viewData.question" />

      <el-row>
        <el-col
          v-if="viewData.questionType === '1'"
          style="margin-bottom: 15px"
        >
          单选题 选项：（以下选中的选项为正确答案）
        </el-col>
        <el-col v-if="viewData.questionType === '1'">
          <el-radio-group
            :value="1"
            style="
              display: flex;
              flex-flow: column nowrap;
              align-items: flex-start;
            "
          >
            <el-radio
              v-for="item in options"
              :key="item.id"
              :label="item.isRight"
            >{{ item.title }}</el-radio>
          </el-radio-group>
        </el-col>
        <el-col
          v-if="viewData.questionType === '2'"
          style="margin-bottom: 15px"
        >
          多选题 选项：（以下选中的选项为正确答案）
        </el-col>
        <el-col v-if="viewData.questionType === '2'">
          <el-checkbox-group
            :value="[1]"
            style="
              display: flex;
              flex-flow: column nowrap;
              align-items: flex-start;
            "
          >
            <el-checkbox
              v-for="item in options"
              :key="item.id"
              :label="item.isRight"
            >
              {{ item.title }}</el-checkbox>
          </el-checkbox-group>
        </el-col>
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
        <el-col :span="4">【答案解析】：</el-col>
        <el-col><span v-html="viewData.answer" /></el-col>
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
  addChoiceAPI,
  deleteQuestionsAPI,
  gerQuestionsAPI,
  gerQuestionsViewAPI,
  getCityAPI,
  getCreatorAPI,
  getProvinceAPI,
  getSubjectsAPI
} from '@/api/questions'
export default {
  data() {
    return {
      questionSearchData: {
        page: 1, // 当前页数
        pagesize: 10, // 页尺寸
        subjectID: null, // 学科
        difficulty: null, // 难度
        questionType: null, // 试题类型
        tags: null, // 标签名称
        province: null, // 企业所在地省份
        city: null, // 企业所在城市
        keyword: null, // 关键字
        remarks: null, // 题目备注
        shortName: null, // 企业简称
        direction: null, // 方向
        creatorID: null, // 录入人
        catalogID: null // 目录
      },
      total: 0,
      tableList: [],
      isShowVideo: false,
      visible: false,
      viewData: {},
      subjectName: null,
      subjectList: [],
      creatorList: [],
      provinceList: [],
      cityList: [],
      options: []
    }
  },
  watch: {
    visible(newValue) {
      if (!newValue) {
        this.isShowVideo = false
      }
    }
  },
  created() {
    this.getQuestions()
    this.getSubjects()
    this.getCreator()
    this.getProvince()
  },
  methods: {
    async getProvince() {
      const res = await getProvinceAPI()
      this.provinceList = res.data.list
    },
    async getCity(value) {
      const res = await getCityAPI({ pname: value })
      this.cityList = res.data.list
    },
    async getQuestions() {
      const res = await gerQuestionsAPI(this.questionSearchData)
      this.tableList = res.items
      this.total = res.counts
    },
    async getSubjects() {
      const res = await getSubjectsAPI(this.subjectName)
      this.subjectList = res
    },
    async getCreator() {
      const res = await getCreatorAPI(this.questionSearchData)
      this.creatorList = res
    },
    async onView(row) {
      this.visible = true
      const res = await gerQuestionsViewAPI(row.id)
      this.viewData = res
      this.options = res.options
    },
    async onDelete(row) {
      this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteQuestionsAPI(row.id)
          this.getQuestions()
          this.$message.success('删除部门成功')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async onAddChoice(row) {
      this.$confirm('此操作将该题目加入精选, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(async() => {
          await addChoiceAPI({ id: row.id, choiceState: 1 })
          this.getQuestions()
          this.$message.success('加入精选成功')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消加入精选'
          })
        })
    },
    onReset() {
      this.questionSearchData = {
        page: 1, // 当前页数
        pagesize: 10, // 页尺寸
        subjectID: null, // 学科
        difficulty: null, // 难度
        questionType: null, // 试题类型
        tags: null, // 标签名称
        province: null, // 企业所在地省份
        city: null, // 企业所在城市
        keyword: null, // 关键字
        remarks: null, // 题目备注
        shortName: null, // 企业简称
        direction: null, // 方向
        creatorID: null, // 录入人
        catalogID: null // 目录
      }
      this.getQuestions()
    },
    onSearch() {
      this.questionSearchData = {
        ...this.questionSearchData
      }
      this.questionSearchData.page = 1
      this.getQuestions()
    },
    handleSizeChange(value) {
      this.questionSearchData.pagesize = value
      this.getQuestions()
    },
    handleCurrentChange(value) {
      this.questionSearchData.page = value
      this.getQuestions()
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
