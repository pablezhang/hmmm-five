
<template>
  <div>
    <el-card class="box-card" style="margin:20px">
      <el-row type="flex">
        <el-col>
          <span data-v-48e452ac="" style="font-size: 12px; color: pink;">说明：目前支持学科和关键字条件筛选</span>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" size="small">新增试题</el-button>
        </el-col>
      </el-row>
      <div class="item">
        <el-form>
          <el-row>
            <el-col :span="6">
              <el-form-item label="学科">
                <el-select>
                  <el-option class="widthBtn" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="二级目录">
                <el-select>
                  <el-option class="widthBtn" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标签">
                <el-select>
                  <el-option class="widthBtn" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="关键字">
                <el-input placeholder="请输入关键字" style="width:202px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="学科">
                <el-select>
                  <el-option class="widthBtn" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="二级目录">
                <el-select>
                  <el-option class="widthBtn" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标签">
                <el-select>
                  <el-option class="widthBtn" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="关键字">
                <el-select>
                  <el-option class="widthBtn" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="学科">
                <el-select>
                  <el-option class="widthBtn" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="二级目录">
                <el-select>
                  <el-option class="widthBtn" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标签">
                <el-select>
                  <el-option class="widthBtn" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-row type="flex" justify="end">
                <el-button size="small">清除</el-button>
                <el-button size="small" type="primary">搜素</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
        <el-tabs type="border-card">
          <el-tab-pane label="用户管理">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: ''
    }
  }
}
</script>

<style lang="scss" scoped>
 .item {
    padding: 18px 0;
  }
  .box-card {
    width:1290px;
  }
 .widthBtn {
    width: 240px !important
}
</style>
