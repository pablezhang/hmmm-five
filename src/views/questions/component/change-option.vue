<template>
  <div>
    <el-radio-group v-model="questionData.code" class="stemOption">
      <el-radio v-for="index in 4" :key="index" :value="index" :label="index" class="radioStem">
        {{ index }}:<el-input v-model="questionData[index].title" style="width:240px" class="stemContent" />
        <el-upload
          v-model="questionData[index].img"
          action=""
          list-type="picture-card"
        >
          <span>上传图片</span>
          <i class="el-icon-circle-close" />
        </el-upload>
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
