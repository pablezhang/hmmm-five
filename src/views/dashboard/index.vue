<template>
  <div>
    <div class="header">
      <el-card class="head">
        <div slot="header" class="clearfix">
          <span>总答题数量</span><i class="el-tooltip el-icon-warning item" />
        </div>
        <p class="p_num">260,560</p>
        <div class="one">
          <span>周同比 12%<i class="el-icon-caret-top" style="color:red" /> </span>
          <span>日环比 11%<i class="el-icon-caret-bottom" style="color:green" /> </span>
        </div>
        <p style="font-size: 14px;">日答题数量 12.423</p>
      </el-card>
      <el-card class="head card_two">
        <div slot="header" class="clearfix">
          <span>试题方向</span><i class="el-tooltip el-icon-warning item" />
        </div>
        <div ref="radar" class="two" />
        <p style="font-size: 14px;margin-top:6px;margin-left:20px">试题库数量 10.234</p>
      </el-card>
      <el-card class="head">
        <div slot="header" class="clearfix">
          <span>试题学科分布</span><i class="el-tooltip el-icon-warning item" />
        </div>
      </el-card>
      <el-card class="head">
        <div slot="header" class="clearfix">
          <span>上周试题新增</span><i class="el-tooltip el-icon-warning item" />
        </div>
      </el-card>
    </div>
    <div class="footer">
      <el-card class="foot" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      key: ''
    }
  },
  mounted() {
    const radar = echarts.init(this.$refs.radar)
    radar.setOption({
      radar: {
        radius: '50%',
        indicator: [
          { name: '逻辑思维', max: 10 },
          { name: '项目相关', max: 10 },
          { name: '基础知识', max: 10 },
          { name: '理论基础', max: 10 },
          { name: '高阶技术', max: 10 }
        ]
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [10, 10, 10, 10, 10],
              name: '外部',
              symbolSize: 1,
              itemStyle: {
                normal: {
                  color: '#c9c0cb'
                }
              },
              areaStyle: {
                normal: {
                  color: '#c9c0cb'
                }
              }
            },
            {
              value: [8, 9, 7, 6, 7],
              name: '内部',
              symbolSize: 1,
              itemStyle: {
                normal: {
                  color: '#32dadd'
                }
              },
              areaStyle: {
                normal: {
                  color: '#32dadd'
                }
              }
            }
          ]
        }
      ]
    })
  }
}
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  .head {
    margin: 20px 10px;
    padding: 0 10px;
    width: 25%;
    height: 240px;
    .clearfix{
      display: flex;
      justify-content: space-between;
      color: #97a8be;
      .el-tooltip {
        margin-left: 100px;
      }
    }
    .p_num{
      margin: 9px 0 52px;
      height: 30px;
      font-size: 32px;
      text-align: center;
    }
    .one{
      display: flex;
      justify-content: space-between;
      margin: 5px 0 20px;
      font-size: 14px;
    }
    .two{
      margin: 0 auto;
      width: 200px;
      height: 160px;
    }
  }
}
::v-deep .card_two{
    .el-card__header{
      padding: 18px 20px 0;
    }
    .el-card__body{
      padding: 0;
    }
    }
.foot {
  margin:0 10px 10px 10px;
  height: 300px;
}
</style>
