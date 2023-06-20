<template>
  <div>
    <el-card>
      <template #header>
        试题录入
      </template>
      <template #default>
        <el-form ref="questionData" label-width="120px" :model="questionData" :rules="rules">
          <el-form-item label="学科:" prop="subjectID">
            <el-select v-model="questionData.subjectID" style="width:400px">
              <el-option v-for="(item,index) in subjectList" :key="index" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="目录:" prop="catalogID">
            <el-select v-model="questionData.catalogID" style="width:400px" />
          </el-form-item>
          <el-form-item label="企业:" prop="enterpriseID">
            <el-select v-model="questionData.enterpriseID" style="width:400px">
              <el-option v-for="item in companyList" :key="item.id" :value="item.id" :label="item.company" />
            </el-select>
          </el-form-item>
          <el-form-item label="城市:" prop="city">
            <el-select v-model="questionData.province" style="width:198px;margin-right:5px" />
            <el-select v-model="questionData.city" style="width:198px" />
          </el-form-item>
          <el-form-item label="方向:" prop="direction">
            <el-select v-model="questionData.direction" style="width:400px" />
          </el-form-item>
          <el-form-item label="题型:" prop="questionType">
            <el-radio-group v-model="questionData.questionType">
              <el-radio :label="3">单选</el-radio>
              <el-radio :label="6">多选</el-radio>
              <el-radio :label="9">简答</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="难度:" prop="difficulty">
            <el-radio-group v-model="questionData.difficulty">
              <el-radio :label="3">简单</el-radio>
              <el-radio :label="6">一般</el-radio>
              <el-radio :label="9">困难</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题干:" class="textEdit" prop="question">
            <quillEditor v-model="questionData.question" :options="editorOption" style="width:800px;height:200px" />
          </el-form-item>
          <el-form-item label="选项:">
            <div v-for="item in listData.length" :key="item" class="option">
              <el-row type="flex" align="middle">
                <el-radio v-model="questionData.code" value="item" label="item">{{ item }}:</el-radio>
                <el-input v-model="questionData.title" style="width:240px" />
                <el-upload
                  v-model="questionData.img"
                  action=""
                  list-type="picture-card"
                >
                  <span>上传图片</span>
                  <i class="el-icon-circle-close" />
                </el-upload>
              </el-row>
            </div>
            <el-button class="addOption">+增加选项与答案</el-button>
          </el-form-item>
          <el-form-item label="解析视频:">
            <el-input v-model="questionData.videoURL" style="width:400px" />
          </el-form-item>
          <el-form-item label="答案解析:" class="textEdit" prop="answerID">
            <quillEditor v-model="questionData.answerID" :options="editorOption" style="width:800px;height:200px" />
          </el-form-item>
          <el-form-item label="题目备注:">
            <el-input v-model="questionData.remarks" type="textarea" rows="4" style="width:400px" />
          </el-form-item>
          <el-form-item label="试题标签:">
            <el-select v-model="questionData.tags" placeholder="请选择试题标签" style="width:400px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { getCompanyListAPI, getSimpleSubjectListAPI } from '@/api/question-new'
export default {
  components: { quillEditor },
  data() {
    return {
      listData: ['A', 'B', 'C', 'D'],
      subjectList: [],
      companyList: [],
      questionData: {
        subjectID: '',
        catalogID: '',
        enterpriseID: '',
        province: '',
        city: '',
        direction: '',
        questionType: '',
        difficulty: '',
        question: '',
        videoURL: '',
        answerID: '',
        remarks: '',
        tags: '',
        option: {
          title: '',
          code: '',
          img: '',
          isRight: null
        }

      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image']
          ]
        },
        theme: 'snow'
      },
      rules: {
        subjectID: [
          { required: true, message: '请选择学科', trigger: ['blur', 'change'] }
        ],
        catalogID: [
          { required: true, message: '请选择目录', trigger: ['blur', 'change'] }
        ],
        enterpriseID: [
          { required: true, message: '请选择企业', trigger: ['blur', 'change'] }
        ],
        city: [
          { required: true, message: '请选择城市', trigger: ['blur', 'change'] }
        ],
        direction: [
          { required: true, message: '请选择方向', trigger: ['blur', 'change'] }
        ],
        questionType: [
          { required: true, message: '请选择题型', trigger: ['blur', 'change'] }
        ],
        difficulty: [
          { required: true, message: '请选择难度', trigger: ['blur', 'change'] }
        ],
        question: [
          { required: true, message: '请输入题干', trigger: 'blur' }
        ],
        answerID: [
          { required: true, message: '请输入答案解析', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const res = await getSimpleSubjectListAPI()
      this.subjectList = res
      const { items } = await getCompanyListAPI()
      this.companyList = items
    },
    onSubmit() {
      this.$refs.questionData.validate()
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    width: 100px;
    height: 60px;
    line-height: 60px;
    margin-left: 5px;
    span{
      font-size: 14px;
      color: #000;
    }
    .el-icon-circle-close:before{
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 18px;

    }
  }

  .el-radio{
    margin-right: 15px;
  }

 ::v-deep .el-input{
    .el-input__inner{
      height: 36px;
    }
  }

  .textEdit{
    height: 270px;
  }

  .el-row{
    margin: 15px 0;
  }

  ::v-deep .addOption{
    width: 130px;
    height: 35px;
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
    padding: 9px 15px;

    span{
      font-size: 12px;
    }
  }
</style>
