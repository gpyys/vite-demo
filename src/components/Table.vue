<template>
  <a-button @click="submite">提交</a-button>
  <a-table :columns="columns" :data-source="dataSource" bordered :pagination="false">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'unit'">
        <a-select
          ref="select"
          v-model:value="dataSource[record.key][column.dataIndex]"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="1">数量</a-select-option>
          <a-select-option value="2">重量</a-select-option>
        </a-select>
      </template>
      <template v-if="column.dataIndex === 'kzynum'">
        <div>
          <a-input
            v-model:value="dataSource[record.key][column.dataIndex]"
            style="margin: -5px 0"
            @change="kzynumChange(dataSource[record.key])"
            :disabled="dataSource[record.key].unit === '1'"
          />
        </div>
      </template>
      <template v-if="column.dataIndex === 'kzyeng'">
        <div>
          <a-input
            v-model:value="dataSource[record.key][column.dataIndex]"
            style="margin: -5px 0"
            @change="kzyengChange(dataSource[record.key])"
            :disabled="dataSource[record.key].unit === '2'"
          />
        </div>
      </template>
    </template>
  </a-table>
</template>
<script>
// import { cloneDeep } from 'lodash-es'
import { message } from 'ant-design-vue'
import { defineComponent, reactive, ref } from 'vue'

const columns = [
  {
    title: '单价',
    dataIndex: 'price',
    width: '10%',
  },
  {
    title: '可质押数量',
    dataIndex: 'num',
    width: '20%',
  },
  {
    title: '单位',
    dataIndex: 'unit',
    width: '20%',
  },
  {
    title: '质押数量',
    dataIndex: 'kzynum',
    width: '20%',
  },
  {
    title: '质押重量',
    dataIndex: 'kzyeng',
    width: '20%',
  },
  {
    title: '质押总价值',
    dataIndex: 'allprice',
    width: '20%',
  },
]
const data = []

for (let i = 0; i < 200; i++) {
  data.push({
    key: i.toString(),
    price: '10.00',
    num: 200,
    unit: '1',
    kzynum: null,
    kzyeng:null,
    allprice: null,
  })
}

export default defineComponent({
  setup() {
    const dataSource = ref(data)

    const kzynumChange = (row) => {
      if (Number(row.kzynum) > Number(row.num)) {
        message.info('质押数量不能大于可质押数量')
        row.kzynum = null
        row.allprice = null
        return
      }
      row.allprice = Number(row.price) * Number(row.kzynum)
    }
    const kzyengChange = (row) => {
      if (Number(row.kzyeng) > Number(row.num)) {
        message.info('质押重量不能大于可质押数量')
        row.kzynum = null
        row.allprice = null
        return
      }
      row.allprice = Number(row.price) * Number(row.kzyeng)
    }
    

    const handleChange = (row) => {
      row.kzynum = null
      row.kzyeng = null
      row.allprice = null
    }

    const submite = () =>{
      console.log(dataSource)
    }

    return {
      dataSource,
      columns,
      kzynumChange,
      handleChange,
      kzyengChange,
      submite
    }
  },
})
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>