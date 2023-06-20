
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
                <el-button size="small" @click="onClean">清除</el-button>
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
              <el-table-column prop="number" label="试题编号" width="220px" />
              <el-table-column prop="subjectID" label="学科" />
              <el-table-column prop="catalogID" label="目录" />
              <el-table-column prop="questionType" label="题型">
                <template #default="{ row }">
                  <span>{{ row.questionType === "1" ? "单选" : "多选" }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="question" label="题干" width="260px">
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
                  <span v-else-if="row.chkState === 1">已审核</span>
                  <span v-else>已拒绝</span>
                </template>
              </el-table-column>
              <el-table-column prop="chkRemarks" label="审核意见" />
              <el-table-column prop="chkUser" label="审核人" />
              <el-table-column prop="chkState" label="发布状态">
                <template #default="{row}">
                  <span v-if="row.chkState === 0">待发布</span>
                  <span v-else-if="row.chkState === 1">已发布</span>
                  <span v-else>已下架</span>
                </template>
              </el-table-column>
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
                    :disabled="row.publishState === 1"
                    @click="$router.push(`/questions/new/${row.id}`)"
                  >修改</el-button>
                  <el-button
                    type="text"
                    style="font-size: 12px"
                    @click="onPublishState(row.id,row.publishState)"
                  >{{ row.publishState===1?'下架':'上架' }}</el-button>
                  <el-button
                    type="text"
                    style="font-size: 12px"
                    :disabled="row.publishState === 1"
                    @click="getDelete(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center">
              <el-pagination
                background
                :current-page="params.page"
                :page-sizes="[5, 10, 15, 20]"
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
          <span>【题号】：{{ oneDiaList.id }}</span>
        </el-col>
        <el-col :span="6">
          <span v-if="oneDiaList.difficulty === '1'">【难度】：简单</span>
          <span v-else-if="oneDiaList.difficulty === '2'">【难度】：一般</span>
          <span v-else>【难度】：困难</span>
        </el-col>
        <el-col :span="6">
          <span>【标签】：{{ oneDiaList.tags }}</span>
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
      <el-divider />
      <el-row>
        <span>【题干】：</span>
      </el-row>
      <el-row>
        <span v-html="oneDiaList.question" />
      </el-row>
      <el-row>
        <span>{{ oneDiaList.questionType==='1'?'单选':'多选' }}题 选项：（以下选中的选项为正确答案）</span>
      </el-row>
      <el-radio-group v-if="oneDiaList.questionType==='1'" :value="isRight">
        <el-row
          v-for="item in oneDiaList.options"
          :key="item.id"
          style="margin-top: 20px"
        >
          <el-radio :label="item.isRight">{{ item.title }}</el-radio>
        </el-row>
      </el-radio-group>
      <el-checkbox-group v-else :value="isRightTwo">
        <el-row
          v-for="item in oneDiaList.options"
          :key="item.id"
          style="margin-top: 20px"
        >
          <el-checkbox :label="item.isRight">{{ item.title }}</el-checkbox>
        </el-row>
      </el-checkbox-group>
      <el-divider />
      <el-row>
        <span>【参考答案】：<el-button
          type="danger"
          size="small"
          @click="showVideo=true"
        >视频答案预览</el-button></span>
        <el-col v-if="showVideo">
          <video :src="oneDiaList.videoURL" controls />
        </el-col>
      </el-row>
      <el-divider />
      <el-row type="flex" style="height:20px">
        【答案解析】：
        <div style="display:flex" v-html="oneDiaList.answer" />
      </el-row>
      <el-divider />
      <el-row>
        <span>【题目备注】：{{ oneDiaList.remarks }}</span>
      </el-row>
      <el-row type="flex" style="margin-top: 20px" justify="end">
        <el-col :span="2">
          <el-button
            type="primary"
            size="small"
            @click="oneDia = false"
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
        <el-button size="small" @click="twoDia=false">取消</el-button>
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
  getQuestionsDeleteAPI,
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
        pagesize: 5,
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
        city: null,
        chkState: null
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
      isRightTwo: [1],
      oneDiaList: {},
      twoDia: false,
      showVideo: false,
      CheckData: { chkState: '', chkRemarks: '', id: '' },
      publishStateData: { id: '', publishState: '' },
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
      if (xxx.label === '全部') {
        this.params.chkState = null
      } else if (xxx.label === '待审核') {
        this.params.chkState = 0
      } else if (xxx.label === '已审核') {
        this.params.chkState = 1
      } else {
        this.params.chkState = 2
      }
      this.params.page = 1
      this.getQuestionsChoice()
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
    // 下架和删除
    onPublishState(a, b) {
      this.publishStateData = { id: a, publishState: b === 1 ? '0' : '1' }
      this.$confirm(b === 1 ? '您确定下架这道题目吗?' : '您确定上架这道题目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await getChoicePublishStateAPI(this.publishStateData)
          this.$message({
            type: 'success',
            message: b === 0 ? '下架成功!' : '上架成功'
          })
          this.getQuestionsChoice()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: b === 0 ? '已取消下架' : '已取消上架'
          })
        })
    },
    // 删除
    getDelete(xxx) {
      this.publishStateData = { id: xxx }
      this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await getQuestionsDeleteAPI(this.publishStateData)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getQuestionsChoice()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 搜素
    onSearch() {
      this.getQuestionsChoice()
    },
    // 重置
    onClean() {
      this.params = {
        page: 1,
        pagesize: 5,
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
        city: null,
        chkState: null
      }
      this.getQuestionsChoice()
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 10px 0;
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
  padding: 10px 0;
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
