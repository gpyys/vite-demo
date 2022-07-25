<template>
  <ul>
    <li v-for="item in list" :key="item.index">{{item.name}}</li>
  </ul>
</template>

<script>
import ShardRender from 'shard-render'
export default {
  data() {
    return {
      list: [],
      allList: [],
    }
  },
  created() {
    // setTimeout(() => {

    // })
    for (let index = 0; index < 5000; index++) {
      let json = {
        name: `第${index}条数据`,
      }
      this.allList.push(json)
    }
    new ShardRender({ data: this.allList, once: 20 }).loop((res) => {
      console.log(res)
      this.list = res
    })
  },
}
</script>

<style>
</style>