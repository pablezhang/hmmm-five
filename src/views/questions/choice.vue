
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
          <el-tab-pane v-for="item in changeList" :key="item" :label="item">
            <div class="light">
              <i class="el-icon-info" />
              <span style="margin-left:8px">数据一共?条</span>
            </div>
            <el-table style="margin-top:20px">
              <el-table-column label="试题编号" />
              <el-table-column label="学科" />
              <el-table-column label="目录" />
              <el-table-column label="题型" />
              <el-table-column label="题干" />
              <el-table-column label="录入时间" />
              <el-table-column label="难度" />
              <el-table-column label="录入人" />
              <el-table-column label="审核状态" />
              <el-table-column label="审核意见" />
              <el-table-column label="审核人" />
              <el-table-column label="发布状态" />
              <el-table-column label="操作" />
            </el-table>
            <el-row type="flex" justify="center">
              <el-pagination
                background
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getQuestionsChoiceAPI } from '@/api/choice'
export default {
  data() {
    return {
      key: '',
      changeList: ['全部', '待审核', '已审核', '已拒绝']
    }
  },
  created() {
    this.getQuestionsChoice()
  },
  methods: {
    async getQuestionsChoice() {
      const res = await getQuestionsChoiceAPI()
      console.log(res)
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
.light{
  height: 40px;
  color: #909399;
  line-height: 40px;
  font-size: 13px;
  background-color: #f4f4f5;
  padding-left: 20px;
}
.el-icon-info{
  font-size: 16px;
}
</style>
