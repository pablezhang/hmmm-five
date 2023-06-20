<template>
  <div />
</template>

<script>
import { deleteMockDataAPI, getMockDataAPI } from '@/api/cheshi'
export default {
  async created() {
    const res = await getMockDataAPI()
    console.log('res  ----->  ', res)
    const res1 = await deleteMockDataAPI()
    console.log('res1  ----->  ', res1)
  }
}
</script>

<style>

</style>
