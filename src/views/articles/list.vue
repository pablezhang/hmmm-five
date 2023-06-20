<template>
  <div>
    <el-card class="card">
      <el-row>
        <el-col class="search" :span="6">关键字
          <el-input v-model="title" placeholder="根据文章标题搜索" /></el-col>
        <el-col class="search" :span="6">状态
          <el-select v-model="select" style="margin-left: 10px" placeholder="请选择">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button>清除</el-button>
          <el-button type="primary">搜索</el-button>
        </el-col>
        <el-col :span="6" style="display: flex; justify-content: end">
          <el-button style="margin-left: 200px" type="success" @click="visible=true">
            <i class="el-icon-edit" />新增技巧</el-button>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-alert :title="'数据一共有' + pageParams.total + '条'" type="info" show-icon />
      </el-row>
      <el-table :data="tableList">
        <el-table-column align="center" label="序号" width="80px">
          <template #default="{ $index }"> {{ $index + 1 }} </template>
        </el-table-column>
        <el-table-column prop="title" label="文章标题" width="400px">
          <template #default="{ row }">
            <span v-if="row.videoURL">{{ row.title }}<i class="el-icon-video-camera-solid" /> </span>
            <span v-else>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="visits" label="阅读数" width="80px" />
        <el-table-column prop="username" label="录入人" width="100px" />
        <el-table-column prop="createTime" label="录入时间" />
        <el-table-column prop="state" label="状态" width="100px">
          <template #default="{ row }">
            {{ row.state ===1?'已启用':'已禁用' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button type="text">预览</el-button>
            <el-button v-if="row.state===1" type="text" @click="onClose(row.id,0)">禁用</el-button>
            <el-button v-else type="text" @click="onOpen(row.id,1)">启用</el-button>
            <el-button type="text" :disabled="row.state!==1?false:disabled">修改</el-button>
            <el-button type="text" :disabled="row.state!==1?false:disabled" @click="onDel(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <el-pagination
          background
          :page-sizes="[10, 20, 40, 50]"
          :page-size="pageParams.pagesize"
          layout="prev, pager, next, jumper"
          :total="pageParams.total"
          @current-change="onChange"
        />
      </el-row>
    </el-card>
    <el-dialog :visible.sync="visible" title="新增文章">
      <el-form ref="form" label-width="100px" :model="formData" :rules="rules">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="文章内容" prop="articleBody" style="height:300px">
          <quill-editor
            v-model="formData.articleBody"
            style="width:90%;height:240px;"
            :options="editorOption"
            @blur="$refs.form.validateField('articleBody')"
          />
        </el-form-item>
        <el-form-item label="视频地址">
          <el-input v-model="formData.videoURL" placeholder="请输入视频地址" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="end" style="margin-right:64px">
            <el-button @click="visible=false">取消</el-button>
            <el-button type="primary" @click="addSubmit">确认</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { addArticlesAPI, delArticlesAPI, getArticlesAPI, stateArticlesAPI } from '@/api/articles'
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      visible: false,
      disabled: true,
      select: '',
      title: '',
      tableList: [],
      pageParams: {
        page: 1,
        pagesize: 10,
        total: 100
      },
      formData: {
        title: '',
        articleBody: '',
        videoURL: ''
      },
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        articleBody: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }],
            ['image', 'link']
          ]
        }
      }
    }
  },
  watch: {
    visible(newValue) {
      if (!newValue) {
        this.$refs.form.resetFields(0)
      }
    }
  },
  created() {
    this.getArticles()
  },

  methods: {
    async  getArticles() {
      const res = await getArticlesAPI(this.pageParams)
      this.tableList = res.items
      this.pageParams.total = res.counts
    },
    onChange(page) {
      this.pageParams.page = page
      this.getArticles(this.pageParams)
    },
    async onOpen(id, state) {
      await stateArticlesAPI({ id, state })
      this.$message.success('操作成功')
      this.getArticles()
    },
    async onClose(id, state) {
      console.log(id, state)
      await stateArticlesAPI({ id, state })
      this.$message.success('操作成功')
      this.getArticles()
    },
    async addSubmit() {
      await this.$refs.form.validate()
      await addArticlesAPI(this.formData)
      this.$message.success('添加成功')
      this.visible = false
      this.getArticles()
    },
    async onDel(id) {
      await delArticlesAPI(id)
      this.$message.success('删除成功')
      this.getArticles()
    }
  }
}
</script>

<style lang='scss' scoped>
.card {
  margin: 20px;
  .search {
    display: flex;
    justify-content: center;
    line-height: 38px;
    .el-input {
      margin-left: 10px;
      width: 70%;
    }
  }
}
::v-deep .el-dialog__body{
  padding-bottom: 10px;
}
.el-form{
  .el-input{
    width: 90%;
  }
}
::v-deep .el-dialog__header {
  background: #409eff;
  .el-dialog__title {
    color: #fff;
  }
 .el-dialog__headerbtn .el-dialog__close  {
    color: #fff;
  }
}
</style>
