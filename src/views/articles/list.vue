<template>
  <div>
    <el-card>
      <el-row>
        <el-col class="search" :span="6">关键字 <el-input v-model="title" placeholder="根据文章标题搜索" /></el-col>
        <el-col class="search" :span="6">状态
          <el-select v-model="select" style="margin-left: 10px;" placeholder="请选择">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button>清除</el-button>
          <el-button type="primary">搜索</el-button>
        </el-col>
        <el-col :span="6" style=" display: flex; justify-content:end">
          <el-button style="margin-left:200px" type="success">
            <i class="el-icon-edit" />新增技巧</el-button>
        </el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-alert title="数据一共有几条" type="info" show-icon />
      </el-row>
      <el-table>
        <el-table-column label="序号" :data="tableList">
          <template #default="{$index}"> {{ $index+1 }} </template>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: '',
      title: '',
      tableList: [{ string: '11' }]
    }
  }
}
</script>

<style lang='scss' scoped>
.el-card{
  margin: 20px;
  height: 800px;
  .search{
    display: flex;
    justify-content: center;
    line-height: 38px;
    .el-input{
      margin-left: 10px;
      width: 70%;
    }
  }
}
</style>
