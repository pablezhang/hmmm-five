<template>
  <div>
    <el-dialog
      title="新增学科"
      :visible.sync="visible"
      width="25%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="学科名称" prop="subjectName">
          <el-input v-model="form.subjectName" placeholder="请输入学科内容" style="width:300px" size="small" />
        </el-form-item>
        <el-form-item label="是否显示" label-width="75px ">
          <el-switch
            v-model="form.isFrontDisplay"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-button size="small" @click="$emit('update:visible',false)">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmit">确定</el-button>
      </el-row>

    </el-dialog>
  </div>
</template>
<script>
import { addSubjectsAPI } from '@/api/list'
export default {
  props: {
    visible: {
      type: Boolean,
      default: null
    }

  },
  data() {
    return {
      form: {
        subjectName: '',
        isFrontDisplay: null
      },
      rules: {
        subjectName: [{ required: true, message: '请输入学科名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    async onSubmit() {
      await addSubjectsAPI(this.form)
      this.$message.success('添加学科成功')
      this.$emit('add')
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped>
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
