<template>
  <div>
    <el-dialog width="400px" :visible="visible" title="新增目录" @close="$emit('update:visible',false)">
      <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
        <el-form-item label="所属学科" prop="subjectID">
          <el-select v-model="formData.subjectID" size="small" style="width:100%">
            <el-option v-for="item in subject" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="目录名称" prop="directoryName">
          <el-input v-model="formData.directoryName" size="small" />
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
import { addCatalogAPI, getSubjectListAPI, updateCatalogDetailAPI } from '@/api/directorys'
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
        subjectID: null, // 学科ID
        directoryName: ''// 目录名称
      },
      rules: {
        subjectID: [
          { required: true, message: '所属学科不能为空', trigger: 'blur' }
        ],
        directoryName: [
          { required: true, message: '目录名称不能为空', trigger: 'blur' }
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
          subjectID: null,
          directoryName: ''
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
          await addCatalogAPI(this.formData)
        } else {
          await updateCatalogDetailAPI(this.formData)
        }
        this.$message.success(this.formData.id ? '编辑目录成功' : '新增目录成功')
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

</style>
