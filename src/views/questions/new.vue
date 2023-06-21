<template>
  <div>
    <el-card>
      <template #header>
        试题录入
      </template>
      <template #default>
        <el-form ref="questionData" label-width="120px" :model="questionData" :rules="rules">
          <el-form-item label="学科:" prop="subjectID">
            <el-select v-model="questionData.subjectID" style="width:400px" @change="onChange">
              <el-option v-for="(item,index) in subjectList" :key="index" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="目录:" prop="catalogID">
            <el-select v-model="questionData.catalogID" style="width:400px">
              <el-option v-for="item in catalogList" :key="item.id" :value="item.id" :label="item.directoryName" />
            </el-select>
          </el-form-item>
          <el-form-item label="企业:" prop="enterpriseID">
            <el-select v-model="questionData.enterpriseID" style="width:400px">
              <el-option v-for="item in companyList" :key="item.id" :value="item.id" :label="item.company" />
            </el-select>
          </el-form-item>
          <el-form-item label="城市:" prop="city">
            <el-select v-model="questionData.province" style="width:198px;margin-right:5px" @change="onProvince">
              <el-option v-for="(item,index) in provinceList" :key="index" :value="item" :label="item" />
            </el-select>
            <el-select v-model="questionData.city" style="width:198px">
              <el-option v-for="(item,index) in cityList" :key="index" :value="item" :label="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="方向:" prop="direction">
            <el-select v-model="questionData.direction" style="width:400px">
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
          <el-form-item label="题型:" prop="questionType">
            <el-radio-group v-model="questionData.questionType">
              <el-radio label="1">单选</el-radio>
              <el-radio label="2">多选</el-radio>
              <el-radio label="3">简答</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="难度:" prop="difficulty">
            <el-radio-group v-model="questionData.difficulty">
              <el-radio label="1">简单</el-radio>
              <el-radio label="2">一般</el-radio>
              <el-radio label="3">困难</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题干:" class="textEdit" prop="question">
            <quillEditor v-model="questionData.question" :options="editorOption" style="width:800px;height:200px" />
          </el-form-item>
          <el-form-item v-show="questionData.questionType!=='3'" label="选项:" prop="options">
            <div v-for="(item, index) in questionDataList" :key="index" class="option">
              <el-radio v-show="questionData.questionType ==='1'" v-model="item.isRight" :label="true" @click.native="radioChange(item.num)">{{ item.code }}</el-radio>
              <el-checkbox v-show="questionData.questionType!=='1'" v-model="item.isRight" style="margin-right:15px">{{ item.code }}</el-checkbox>
              <el-input v-model="item.title" style="width:240px" />
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadImage"
                @click.native="onPic(item.code)"
              >
                <img v-if="questionDataList[item.num].img" :src="questionDataList[item.num].img" class="avatar">
                <span v-else>上传图片</span>
                <i class="el-icon-circle-close" />
              </el-upload>
            </div>
            <el-button v-if="questionData.questionType ==='1'" class="disableOption" disabled>+增加选项与答案</el-button>
            <el-button v-else class="addOption" @click="onAddOption">+增加选项与答案</el-button>
          </el-form-item>
          <el-form-item label="解析视频:">
            <el-input v-model="questionData.videoURL" style="width:400px" />
          </el-form-item>
          <el-form-item label="答案解析:" class="textEdit" prop="answer">
            <quillEditor v-model="questionData.answer" :options="editorOption" style="width:800px;height:200px" />
          </el-form-item>
          <el-form-item label="题目备注:">
            <el-input v-model="questionData.remarks" type="textarea" rows="4" style="width:400px" />
          </el-form-item>
          <el-form-item label="试题标签:">
            <el-select v-model="questionData.tags" placeholder="请选择试题标签" style="width:400px">
              <el-option v-for="item in tagsList" :key="item.id" :value="item.id" :label="item.tagName" />
            </el-select>
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
import { addOptionAPI, detailQuestionsAPI, editQuestionAPI, getCompanyListAPI, getSimpleSubjectListAPI } from '@/api/question-new'
import { getCatalogListAPI } from '@/api/directorys'
import { getTagsListAPI } from '@/api/tags'
import { getCityAPI, getProvinceAPI } from '@/api/questions'
import COS from 'cos-js-sdk-v5'
import { Message } from 'element-ui'
export default {
  components: { quillEditor },
  data() {
    return {
      i: -1,
      index1: 3,
      currentPic: null,
      subjectList: [], // 学科
      catalogList: [], // 目录列表
      companyList: [], // 企业
      tagsList: [], // 标签
      provinceList: [],
      cityList: [],
      imageUrl: null,
      checkOption: [],
      questionData: {
        options: {
          code: null,
          title: null,
          img: null,
          isRight: null
        },
        subjectID: null,
        catalogID: null,
        enterpriseID: null,
        province: null,
        city: null,
        direction: null,
        questionType: '1',
        difficulty: '1',
        question: null,
        answer: null,
        remarks: null,
        tags: null,
        videoURL: null
      },
      alphabet: ['E:', 'F:', 'G:', 'H:', 'I:', 'J:', 'K:', 'L:', 'M:', 'N:', 'O:', 'P:', 'Q:', 'R:', 'S:', 'T:', 'U:', 'V:', 'W:', 'X:', 'Y:', 'Z:'],

      questionDataList: [
        { code: 'A:', title: '', img: null, num: 0, isRight: false },
        { code: 'B:', title: '', img: null, num: 1, isRight: false },
        { code: 'C:', title: '', img: null, num: 2, isRight: false },
        { code: 'D:', title: '', img: null, num: 3, isRight: false }
      ],
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
        answer: [
          { required: true, message: '请输入答案解析', trigger: 'blur' }
        ],
        options: [
          { required: true, message: '请输入选项', trigger: 'blur' }
        ]
      }
    }
  },

  async created() {
    this.loadData()
    if (+this.$route.params.id) {
      const res = await detailQuestionsAPI({ id: this.$route.params.id, isNext: true })
      this.questionData = res
    }
  },

  methods: {
    async loadData() {
      const res = await getSimpleSubjectListAPI()
      this.subjectList = res
      const { items } = await getCompanyListAPI()
      this.companyList = items
      const { data } = await getProvinceAPI()
      this.provinceList = data.list
    },
    // 学科联动
    async  onChange(currentVal) {
      const { items } = await getCatalogListAPI({ subjectID: currentVal })
      this.catalogList = items
      const res = await getTagsListAPI({ subjectID: currentVal })
      this.tagsList = res.items
    },
    async onProvince(currentVal) {
      const { data } = await getCityAPI({ pname: currentVal })
      this.cityList = data.list
    },
    // 增加选项
    onAddOption() {
      this.i++
      this.index1++
      this.questionDataList.push({ code: this.alphabet[this.i], title: '', img: '', num: this.index1 })
    },
    // 单选框只选中一个
    radioChange(num) {
      this.questionDataList.forEach(item => { item.isRight = false })
      this.questionDataList[num].isRight = true
    },
    onPic(code) {
      this.currentPic = code
    },
    // 新增
    async onSubmit() {
      await this.$refs.questionData.validate()
      this.questionData.options = [...this.questionDataList]
      this.questionData.options = this.questionData.options.map(item => {
        delete item.num
        return item
      })
      Number(this.$route.params.id) ? await editQuestionAPI(this.questionData) : await addOptionAPI(this.questionData)
      Number(this.$route.params.id) ? Message.success('试题修改成功') : Message.success('试题添加成功')
      this.$router.push('/questions/list')
    },
    // COS上传
    beforeAvatarUpload(file) {
      const isJPG = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG PNG GIF BMP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    uploadImage(params) {
      const cos = new COS({
        SecretId: 'AKIDxRtLk6kMuOoDawFTkwcFoKl950pfeadg',
        SecretKey: 'AZwyyvsn0ACB76RjjgZk3FMNJBwaIztv'
      }) // 完成cos实例化
      cos.putObject({
        Bucket: 'kuaile-1318626737', // 存储桶名称
        Region: 'ap-nanjing', // 存储桶地域名称
        Key: params.file.name, // 文件名称(自定义上传的参数)
        StorageClass: 'STANDARD', // 固定值
        Body: params.file // 文件对象(自定义上传的文件对象)
      }, (err, data) => {
        if (data.statusCode === 200 && data.Location) {
          this.index1++
          const num = this.questionDataList.findIndex(item => item.code === this.currentPic)
          this.questionDataList[num].img = 'http://' + data.Location
        } else {
          this.$message.error(err.message)
        }
      })
    }
  }

}

</script>

<style lang="scss" scoped>
  ::v-deep .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    width: 100px;
    height: 60px;
    line-height: 60px;
    margin-left: 5px;
    display: flex;
    justify-content: center;
    .avatar{
      width: 100px;
      height: 60px;
    }
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
    ::v-deep .disableOption{
    width: 130px;
    height: 35px;
    color: #fff;
    background-color: #fab6b6;
    border-color: #fab6b6;
    padding: 9px 15px;

    span{
      font-size: 12px;
    }
  }

  .option{
    display: flex;
    align-items: center;
    margin: 15px 0;
  }

</style>
