<template>
  <div>
    <el-card class="card">
      <el-row>
        <el-col class="search" :span="6">关键字
          <el-input v-model="pageParams.keyword" placeholder="根据文章标题搜索" /></el-col>
        <el-col class="search" :span="6">状态
          <el-select v-model="pageParams.state" style="margin-left: 10px" placeholder="请选择">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button @click="onClear">清除</el-button>
          <el-button type="primary" @click="onSearch">搜索</el-button>
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
        <el-table-column prop="createTime" label="录入时间">
          <template #default="{row}">
            {{ new Date(row.createTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }).replace(/\//g, '-') }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="100px">
          <template #default="{ row }">
            {{ row.state ===1?'已启用':'已禁用' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button type="text" @click="onPreview(row.id)">预览</el-button>
            <el-button v-if="row.state===1" type="text" @click="onClose(row.id,0)">禁用</el-button>
            <el-button v-else type="text" @click="onOpen(row.id,1)">启用</el-button>
            <el-button type="text" :disabled="row.state!==1?false:disabled" @click="onEdit(row.id)">修改</el-button>
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
    <!-- 编辑 -->
    <el-dialog class="el_add" :visible.sync="visible" title="新增文章">
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
    <!-- 预览 -->
    <el-dialog class="el_look" :visible.sync="previewVisible" title="预览文章">
      <h3>{{ detail.title }}</h3>
      <el-row type="flex">
        <span>{{ detail.createTime }}</span>
        <span>{{ detail.username }}</span>
        <span><i class="el-icon-view" style="margin:0 10px" /> {{ detail.visits }}</span>
      </el-row>
      <p class="p_text" v-html="detail.articleBody" />
    </el-dialog>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { addArticlesAPI, delArticlesAPI, detailsArticlesAPI, editArticlesAPI, getArticlesAPI, stateArticlesAPI } from '@/api/articles'
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      visible: false,
      disabled: true,
      previewVisible: false,
      tableList: [],
      detail: {
        title: '',
        createTime: '',
        articleBody: '',
        username: '',
        visits: ''
      },
      pageParams: {
        page: 1,
        pagesize: 10,
        total: 100,
        state: '',
        keyword: ''
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
        this.$refs.form.resetFields()
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
      await stateArticlesAPI({ id, state })
      this.$message.success('操作成功')
      this.getArticles()
    },
    async addSubmit() {
      await this.$refs.form.validate()
      if (this.formData.id) {
        await editArticlesAPI(this.formData)
      } else {
        await addArticlesAPI(this.formData)
      }
      this.$message.success(this.formData.id ? '编辑成功' : '添加成功')
      this.visible = false
      this.getArticles()
    },
    async onDel(id) {
      await delArticlesAPI(id)
      this.$message.success('删除成功')
      this.getArticles()
    },
    async onPreview(id) {
      this.previewVisible = true
      const res = await detailsArticlesAPI(id)
      this.detail = res
      this.detail.createTime = new Date(res.createTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }).replace(/\//g, '-')
    },
    async onEdit(id) {
      this.visible = true
      const res = await detailsArticlesAPI(id)
      this.formData = res
    },
    onSearch() {
      this.getArticles()
    },
    onClear() {
      this.pageParams.keyword = ''
      this.pageParams.state = ''
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

::v-deep .el_add{
  height: 100%;
  .el-dialog__body{
  padding-bottom: 10px;
}
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

::v-deep .el_look{
  height: 360px;
  .p_text{
    padding: 10px;
    width: 520px;
    background: #f5f5f5;
  }
}
</style>
