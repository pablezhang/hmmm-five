<template>
  <div>
    <el-dialog width="400px" :visible="visible" title="新增目录" @close="$emit('update:visible',false)">
      <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
        <el-form-item label="所属学科" prop="subjectID">
          <el-select v-model="formData.subjectID" size="small" style="width:100%">
            <el-option v-for="item in subject" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签名称" prop="tagName">
          <el-input v-model="formData.tagName" size="small" />
        </el-form-item>
        <el-row type="flex" justify="end">
          <el-button size="small" @click="$emit('update:visible',false)">取消</el-button>
          <el-button size="small" type="primary" @click="goSubmit">确认</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getSubjectListAPI, updateCatalogDetailAPI } from '@/api/directorys'
import { addTagsListAPI } from '@/api/tags'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        subjectID: '', // 学科ID
        tagName: ''// 目录名称
      },
      rules: {
        subjectID: [
          { required: true, message: '所属学科不能为空', trigger: 'blur' }
        ],
        tagName: [
          { required: true, message: '标签名称不能为空', trigger: 'blur' }
        ]
      },
      subject: [] // 学科列表
    }
  },
  watch: {
    visible(newValue) {
      if (!newValue) {
        this.$refs.form.resetFields()
        this.formData = {
          subjectID: '',
          tagName: ''
        }
      }
    }
  },
  async created() {
    const res = await getSubjectListAPI()
    this.subject = res
  },
  methods: {
    async goSubmit() {
      try {
        await this.$refs.form.validate()
        if (!this.formData.id) {
          await addTagsListAPI(this.formData)
        } else {
          await updateCatalogDetailAPI(this.formData)
        }
        this.$message.success(this.formData.id ? '编辑标签成功' : '新增标签成功')
        this.$emit('updateTable')
        this.$emit('update:visible', false)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
