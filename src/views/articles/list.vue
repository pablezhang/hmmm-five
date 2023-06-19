<template>
  <div>
    <el-card class="card">
      <el-row>
        <el-col
          class="search"
          :span="6"
        >关键字 <el-input
          v-model="title"
          placeholder="根据文章标题搜索"
        /></el-col>
        <el-col
          class="search"
          :span="6"
        >状态
          <el-select
            v-model="select"
            style="margin-left: 10px"
            placeholder="请选择"
          >
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
        <el-alert title="数据一共有几条" type="info" show-icon />
      </el-row>
      <el-table>
        <el-table-column label="序号" :data="tableList">
          <template #default="{ $index }"> {{ $index + 1 }} </template>
        </el-table-column>
        <el-table-column prop="string" label="文章标题" />
        <el-table-column prop="string" label="阅读数" />
        <el-table-column prop="string" label="录入人" />
        <el-table-column prop="string" label="录入时间" />
        <el-table-column prop="string" label="状态" />
        <el-table-column prop="string" label="操作">
          <el-button type="text">预览</el-button>
          <el-button type="text">启用</el-button>
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <el-pagination
          background
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="100"
        />
      </el-row>
    </el-card>
    <el-dialog :visible.sync="visible" title="新增文章">
      <el-form label-width="100px">
        <el-form-item label="文章标题">
          <el-input placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="文章内容" style="margin-bottom:0px">
          <quill-editor style="width:90%;height:180px;margin-bottom:70px" :options="editorOption" />
        </el-form-item>
        <el-form-item label="视频地址">
          <el-input placeholder="请输入视频地址" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="end" style="margin-right:64px">
            <el-button @click="visible=false">取消</el-button>
            <el-button type="primary">确认</el-button>
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
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      visible: false,
      select: '',
      title: '',
      tableList: [{ string: '11' }],
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
  }
}
</script>

<style lang='scss' scoped>
.card {
  margin: 20px;
  height: 800px;
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
