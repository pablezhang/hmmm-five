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
          <el-form-item label="题干:">
            <quillEditor v-model="questionData.stem" :options="editorOption" style="width:800px;height:200px" />
          </el-form-item>
          <el-form-item label="选项">
            <el-radio-group>
              <el-radio :label="1">A:</el-radio>
              <el-input />
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-form-item>
              <el-radio :label="2">B:</el-radio>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-radio-group>
              <el-radio :label="3">C:</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-radio-group>
              <el-radio :label="4">D:</el-radio>
            </el-radio-group>
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
.el-form-item{
  display: flex;
}

</style>
