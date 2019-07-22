<template>
  <el-table
    v-loading="loadingFlg"
    :data="tableData"
    border
    header-row-class-name="header-style"
    style="width: 100%">
    <el-table-column
      prop="no"
      label="No"
      width="180">
    </el-table-column>
    <el-table-column
      prop="taskName"
      label="タスク名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="担当者">
    </el-table-column>
    <el-table-column
      prop="status"
      label="ステータス">
    </el-table-column>
    <el-table-column
      prop="createDate"
      label="作成日">
    </el-table-column>
  </el-table>
</template>

<script>
// KbnButtonをインポート
import KbnButton from '@/components/atoms/KbnButton.vue'

export default {
  name: 'KbnTaskResult',

  components: {
    KbnButton
  },

  props: {
    loadingFlg: {
      type: Boolean,
      required: true
    },

    tableData: Array
  },
}
</script>

<style scoped>
form {
  display: block;
  margin: 0 auto;
  text-align: left;
}
input {
  padding: .5em;
  font: inherit;
}
ul {
  list-style-type: none;
  padding: 0;
}
ul li {
  font-size: 0.5em;
}
.validation-errors {
  height: 32px;
}
.form-actions p {
  font-size: 0.5em;
}
.header-style{
  background-color: royalblue
}
</style>
