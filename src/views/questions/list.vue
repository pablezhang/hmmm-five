<template>
  <div style="padding:10px;background:#eceef1">
    <el-card>
      <div class="header">
        <div style="font-size: 12px; color: pink;">说明：目前支持学科和关键字条件筛选</div>
        <el-button type="success"><i class="el-icon-edit" />新增试题</el-button>
      </div>
      <el-form label-width="80px">
        <el-row type="flex" :gutter="32">
          <el-col :span="8">
            <el-form-item label="学科">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="二级目录">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关键字">
              <el-input />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="32">
          <el-col :span="8">
            <el-form-item label="试题类型">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="难度">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="方向">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
              <el-input />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="32">
          <el-col :span="8">
            <el-form-item label="题目备注">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业简称">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <el-input style="width:103px" />
              <el-input style="width:103px;margin-left:5px" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item style="display: flex;justify-content: end;">
              <el-button>清除</el-button>
              <el-button type="primary">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-alert
        style="margin-bottom: 15px;"
        title="数据一共X条"
        type="info"
        show-icon
      />
      <el-table :header-cell-style="{ background: '#fafafa' }">
        <el-table-column label="试题编号" width="120px" />
        <el-table-column label="学科" width="105px" />
        <el-table-column label="目录" width="100px" />
        <el-table-column label="题型" width="100px" />
        <el-table-column label="题干" width="280px" />
        <el-table-column label="录入时间" width="180px" />
        <el-table-column label="难度" width="100px" />
        <el-table-column label="录入人" width="100px" />
        <el-table-column label="操作" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header {
  display: flex;

  justify-content: space-between;
  margin-bottom: 15px;
}
</style>
