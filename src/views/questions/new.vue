<template>
  <div>
    <el-card>
      <template #header>
        试题录入
      </template>
      <template #default>
        <el-form label-width="120px">
          <el-form-item label="学科:">
            <el-select style="width:400px" />
          </el-form-item>
          <el-form-item label="目录:">
            <el-select style="width:400px" />
          </el-form-item>
          <el-form-item label="企业:">
            <el-select style="width:400px" />
          </el-form-item>
          <el-form-item label="城市:">
            <el-select style="width:198px;margin-right:5px" />
            <el-select style="width:198px" />
          </el-form-item>
          <el-form-item label="方向:">
            <el-select style="width:400px" />
          </el-form-item>
          <el-form-item label="题型:">
            <el-radio-group v-model="questionData.questionType">
              <el-radio :label="3">单选</el-radio>
              <el-radio :label="6">多选</el-radio>
              <el-radio :label="9">简答</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="难度:">
            <el-radio-group v-model="questionData.questionType">
              <el-radio :label="3">简单</el-radio>
              <el-radio :label="6">一般</el-radio>
              <el-radio :label="9">困难</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题干:" class="textEdit">
            <quillEditor v-model="questionData.stem" :options="editorOption" style="width:800px;height:200px" />
          </el-form-item>
          <el-form-item label="选项:">
            <el-row type="flex" align="middle">
              <el-radio :label="1">A:</el-radio>
              <el-input style="width:240px" />
              <el-upload
                action=""
                list-type="picture-card"
              >
                <span>上传图片</span>
                <i class="el-icon-circle-close" />
              </el-upload>
            </el-row>
            <el-row type="flex" align="middle">
              <el-radio :label="2">B:</el-radio>
              <el-input style="width:240px" />
              <el-upload
                action=""
                list-type="picture-card"
              >
                <span>上传图片</span>
                <i class="el-icon-circle-close" />
              </el-upload>
            </el-row>
            <el-row type="flex" align="middle">
              <el-radio :label="3">C:</el-radio>
              <el-input style="width:240px" />
              <el-upload
                action=""
                list-type="picture-card"
              >
                <span>上传图片</span>
                <i class="el-icon-circle-close" />
              </el-upload>
            </el-row>
            <el-row type="flex" align="middle">
              <el-radio :label="4">D:</el-radio>
              <el-input style="width:240px" />
              <el-upload
                action=""
                list-type="picture-card"
              >
                <span>上传图片</span>
                <i class="el-icon-circle-close" />
              </el-upload>
            </el-row>
            <el-button class="addOption">+增加选项与答案</el-button>
          </el-form-item>
          <el-form-item label="解析视频:">
            <el-input style="width:400px" />
          </el-form-item>
          <el-form-item label="答案解析:" class="textEdit">
            <quillEditor v-model="questionData.stem" :options="editorOption" style="width:800px;height:200px" />
          </el-form-item>
          <el-form-item label="题目备注:">
            <el-input type="textarea" rows="4" style="width:400px" />
          </el-form-item>
          <el-form-item label="试题标签:">
            <el-select placeholder="请选择试题标签" style="width:400px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确认提交</el-button>
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
export default {
  components: { quillEditor },
  data() {
    return {
      questionData: {
        questionType: 3,
        stem: ''
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
      }

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
    margin-bottom: 80px;
  }

  .el-row{
    margin: 15px 0;
  }

  ::v-deep .addOption{
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
</style>
