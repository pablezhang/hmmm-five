
<template>
  <div>
    <el-card class="box-card" style="margin: 20px">
      <el-row type="flex">
        <el-col>
          <span
            data-v-48e452ac=""
            style="font-size: 12px; color: pink"
          >说明：目前支持学科和关键字条件筛选</span>
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="small"
            @click="$router.push('/questions/new')"
          >
            <i class="el-icon-edit" />新增试题</el-button>
        </el-col>
      </el-row>
      <div class="item">
        <el-form label-width="80px" :model="params">
          <el-row>
            <el-col :span="6">
              <el-form-item label="学科">
                <el-select v-model="params.subjectID" @change="changeSubjectID">
                  <el-option
                    v-for="item in selectList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="二级目录">
                <el-select v-model="params.catalogID">
                  <el-option
                    v-for="item in directoryList"
                    :key="item.id"
                    :label="item.directoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标签">
                <el-select v-model="params.tags">
                  <el-option
                    v-for="item in tagsList"
                    :key="item.id"
                    :label="item.tagName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="关键字">
                <el-input v-model="params.keyword" placeholder="根据题干搜素" style="width: 202px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="试题类型">
                <el-select v-model="params.questionType">
                  <el-option
                    v-for="item in questionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="难度">
                <el-select v-model="params.difficulty">
                  <el-option
                    v-for="item in difficultyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="方向">
                <el-select v-model="params.direction">
                  <el-option
                    v-for="item in directionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="录入人">
                <el-select v-model="params.creatorID">
                  <el-option
                    v-for="item in userList"
                    :key="item.id"
                    :label="item.username"
                    value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="题目备注">
                <el-input v-model="params.remarks" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="企业简称">
                <el-input v-model="params.shortName" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="城市">
                <el-row type="flex">
                  <el-select v-model="params.province" placeholder="请选择省份" @change="getCity">
                    <el-option
                      v-for="item in provinceList"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                  <el-select v-model="params.citycity" placeholder="请选择市区">
                    <el-option
                      v-for="item in cityList"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-row type="flex" justify="end">
                <el-button size="small">清除</el-button>
                <el-button size="small" type="primary" @click="onSearch">搜素</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
        <el-tabs type="border-card" @tab-click="onTab">
          <el-tab-pane v-for="item in changeList" :key="item" :label="item">
            <div class="light">
              <i class="el-icon-info" />
              <span style="margin-left: 8px">数据一共{{ total }}条</span>
            </div>
            <el-table style="margin-top: 20px" :data="tableData">
              <el-table-column prop="number" label="试题编号" />
              <el-table-column prop="subjectID" label="学科" />
              <el-table-column prop="catalogID" label="目录" />
              <el-table-column prop="questionType" label="题型">
                <template #default="{ row }">
                  <span>{{ row.questionType === "1" ? "单选" : "多选" }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="question" label="题干" width="500px">
                <template #default="{ row }">
                  <span v-html="row.question" />
                </template>
              </el-table-column>
              <el-table-column prop="addDate" label="录入时间" width="160px">
                <template #default="{ row }">
                  <span>{{
                    new Date(row.addDate)
                      .toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
                      .replace(/\//g, "-")
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="difficulty" label="难度">
                <template #default="{ row }">
                  <span v-if="row.difficulty === '1'">简单</span>
                  <span v-else-if="row.difficulty === '2'">一般</span>
                  <span v-else>困难</span>
                </template>
              </el-table-column>
              <el-table-column prop="creator" label="录入人" />
              <el-table-column prop="chkState" label="审核状态">
                <template #default="{ row }">
                  <span v-if="row.chkState === 0">待审核</span>
                  <span v-else-if="row.chkState === 1">通过</span>
                  <span v-else>拒绝</span>
                </template>
              </el-table-column>
              <el-table-column prop="chkRemarks" label="审核意见" />
              <el-table-column prop="chkUser" label="审核人" />
              <el-table-column prop="chkState" label="发布状态" />
              <el-table-column
                label="操作"
                prop="operate"
                width="200px"
                fixed="right"
                align="center"
              >
                <template #default="{ row }">
                  <el-button
                    type="text"
                    style="font-size: 12px"
                    @click="getQuestionsId(row.id)"
                  >预览</el-button>
                  <el-button
                    type="text"
                    :disabled="row.chkState === 1"
                    style="font-size: 12px"
                    @click="getTwoDia(row.id)"
                  >审核</el-button>
                  <el-button
                    type="text"
                    style="font-size: 12px"
                    @click="$router.push('/questions/new')"
                  >修改</el-button>
                  <el-button
                    type="text"
                    style="font-size: 12px"
                    @click="onPublishState(row.id)"
                  >下架</el-button>
                  <el-button
                    type="text"
                    style="font-size: 12px"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center">
              <el-pagination
                background
                :current-page="params.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="params.pagesize"
                layout=" sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <el-dialog title="题目预览" :visible.sync="oneDia" style="font-size: 14px">
      <el-row type="flex">
        <el-col :span="6">
          <span>【题型】：{{
            oneDiaList.questionType === "1" ? "单选" : "多选"
          }}</span>
        </el-col>
        <el-col :span="6">
          <span>【题号】：{{ oneDiaList.options?.questionsID }}</span>
        </el-col>
        <el-col :span="6">
          <span v-if="oneDiaList.difficulty === '1'">【难度】：简单</span>
          <span v-else-if="oneDiaList.difficulty === '2'">【难度】：一般</span>
          <span v-else>【难度】：困难</span>
        </el-col>
        <el-col :span="6">
          <span>【标签】：</span>
        </el-col>
      </el-row>
      <el-row type="flex" style="margin-top: 20px">
        <el-col :span="6">
          <span>【学科】：{{ oneDiaList.subjectName }}</span>
        </el-col>
        <el-col :span="6">
          <span>【目录】：{{ oneDiaList.directoryName }}</span>
        </el-col>
        <el-col :span="6">
          <span>【方向】：{{ oneDiaList.direction }}</span>
        </el-col>
      </el-row>
      <hr>
      <el-row>
        <span>【题干】：</span>
      </el-row>
      <el-row>
        <span v-html="oneDiaList.question" />
      </el-row>
      <el-row style="margin-top: 20px">
        <span>单选题 选项：（以下选中的选项为正确答案）</span>
      </el-row>
      <el-radio-group :value="isRight">
        <el-row
          v-for="item in oneDiaList.options"
          :key="item.id"
          style="margin-top: 20px"
        >
          <el-radio :label="item.isRight">{{ item.title }}</el-radio>
        </el-row>
      </el-radio-group>
      <hr>
      <el-row>
        <span>【参考答案】：<el-button
          type="danger"
          size="small"
        >视频答案预览</el-button></span>
      </el-row>
      <hr>
      <span>【答案解析】：<span v-html="oneDiaList.answer" /></span>
      <hr>
      <el-row style="margin-top: 20px">
        <span>【题目备注】：{{ oneDiaList.remarks }}</span>
      </el-row>
      <el-row type="flex" style="margin-top: 20px" justify="end">
        <el-col :span="2">
          <el-button
            type="primary"
            size="small"
            @click="oneDiaList = false"
          >关闭</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="题目审核" :visible.sync="twoDia" width="25%">
      <el-row>
        <el-radio v-model="CheckData.chkState" label="1">通过</el-radio>
        <el-radio v-model="CheckData.chkState" label="2">拒绝</el-radio>
      </el-row>
      <el-form :model="CheckData" :rules="rules">
        <el-form-item prop="chkRemarks">
          <el-row style="margin-top: 20px">
            <el-input
              v-model="CheckData.chkRemarks"
              type="textarea"
              placeholder="请输入审核意见"
            />
          </el-row>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end" style="margin-top: 40px">
        <el-button size="small">取消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="getQuestionsCheck"
        >确认</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getChoicePublishStateAPI,
  getDirectorysAPI,
  getQuestionsCheckAPI,
  getQuestionsChoiceAPI,
  getQuestionsIdAPI,
  getSubjectsSimpleAPI,
  getTagsAPI,
  getUsersSimpleAPI
} from '@/api/choice'
import { Message } from 'element-ui'
import { getCityAPI, getProvinceAPI } from '@/api/questions'
export default {
  data() {
    return {
      key: '',
      changeList: ['全部', '待审核', '已审核', '已拒绝'],
      total: 1,
      params: {
        page: 1,
        pagesize: 10,
        subjectID: null,
        catalogID: null,
        tags: null,
        keyword: null,
        questionType: null,
        difficulty: null,
        direction: null,
        creatorID: null,
        remarks: null,
        shortName: null,
        province: null,
        city: null
      },
      tableData: [],
      selectList: [],
      directoryList: [],
      tagsList: [],
      questionList: [
        { label: '单选', value: 1 },
        { label: '多选', value: 2 },
        { label: '简答', value: 3 }
      ],
      difficultyList: [
        { label: '简单', value: 1 },
        { label: '一般', value: 2 },
        { label: '困难', value: 3 }
      ],
      directionList: [
        { label: '外包服务', value: 1 },
        { label: '企业服务', value: 2 },
        { label: '互联网金融', value: 3 },
        { label: '企业咨询', value: 4 },
        { label: '互联网', value: 5 },
        { label: '电子商务', value: 6 },
        { label: '其他', value: 7 }
      ],
      userList: [],
      provinceList: [],
      cityList: [],
      oneDia: false,
      isRight: 1,
      oneDiaList: {},
      twoDia: false,
      CheckData: { chkState: '', chkRemarks: '', id: '' },
      publishStateData: { id: '', publishState: 0 },
      rules: {
        chkRemarks: [
          { required: true, message: '意见不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getQuestionsChoice()
    this.getUsersSimple()
    this.getProvince()
  },
  methods: {
    async getQuestionsChoice() {
      console.log(await getQuestionsChoiceAPI(this.params))
      const { items, counts } = await getQuestionsChoiceAPI(this.params)
      this.selectList = await getSubjectsSimpleAPI()
      this.tableData = items
      this.total = +counts
    },
    async getUsersSimple() {
      this.userList = await getUsersSimpleAPI()
    },
    // 获取省市
    async getProvince() {
      const res = await getProvinceAPI()
      this.provinceList = res.data.list
    },
    async getCity(xxx) {
      const res = await getCityAPI({ pname: xxx })
      this.cityList = res.data.list
    },
    handleCurrentChange(xxx) {
      this.params.page = xxx
      this.getQuestionsChoice()
    },
    handleSizeChange(xxx) {
      this.params.pagesize = xxx
      this.getQuestionsChoice()
    },
    // 标签页切换
    onTab(xxx) {
      console.log(xxx.label)
    },
    // 学科选中值变化
    async changeSubjectID(xxx) {
      const { items } = await getDirectorysAPI({ subjectID: xxx })
      const res = await getTagsAPI({ subjectID: xxx })
      this.tagsList = res.items
      this.directoryList = items
      console.log(items)
    },
    async getQuestionsId(xxx) {
      console.log(xxx)
      const res = await getQuestionsIdAPI(xxx)
      this.oneDiaList = res
      console.log(res)
      this.oneDia = true
    },
    // 审核模态框
    async getTwoDia(xxx) {
      this.twoDia = true
      this.CheckData.id = xxx
    },
    async getQuestionsCheck() {
      this.CheckData.chkState = +this.CheckData.chkState
      await getQuestionsCheckAPI(this.CheckData)
      Message.success('审核成功')
      this.getQuestionsChoice()
      this.twoDia = false
    },
    // 下架
    onPublishState(xxx) {
      this.publishStateData.id = xxx
      this.$confirm('您确定下架这道题目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await getChoicePublishStateAPI(this.publishStateData)
          this.$message({
            type: 'success',
            message: '下架成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下架'
          })
        })
      this.getQuestionsChoice()
    },
    // 搜素
    onSearch() {
      this.getQuestionsChoice()
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 18px 0;
}
.box-card {
  width: 1290px;
}
.widthBtn {
  width: 240px !important;
}
.light {
  height: 40px;
  color: #909399;
  line-height: 40px;
  font-size: 13px;
  background-color: #f4f4f5;
  padding-left: 20px;
}
.el-icon-info {
  font-size: 16px;
}
.item {
  padding: 18px 0;
}

.dia-card {
  width: 100%;
}
::v-deep .el-dialog {
  border-radius: 10px;
}
::v-deep .el-dialog__header {
  padding: 20px 20px 10px;
  background: #409eff;
  border-radius: 9px 9px 0 0;
}
::v-deep .el-dialog__header .el-dialog__title {
  color: #fff;
}
::v-deep .el-icon-close:before {
  content: "\e6db";
  color: #fff;
}
</style>
