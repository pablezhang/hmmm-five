<template>
  <div />
</template>

<script>
import { getMockDataAPI } from '@/api/cheshi'
export default {
  async created() {
    const res = await getMockDataAPI()
    console.log('res  ----->  ', res)
  }
}
</script>

<style>

</style>
