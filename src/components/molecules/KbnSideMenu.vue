<template>
  <el-container class="sidber">
    <el-aside width="260px">
      <el-menu :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>メニュー</template>
            <el-menu-item index="1-1" @click="$router.push({ path: '/' })">ボード</el-menu-item>
            <el-menu-item index="1-2" @click="$router.push({ path: 'search' })">タスク</el-menu-item>
            <el-menu-item index="1-3" @click="$router.push({ path: 'setting' })">設定</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: 'KbnSideMenu',
  data() {
    const item = {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    };
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style>
 .el-container {
    border: 1px solid #eee;
    width: 300px;
  }

  .el-aside {
    background-color: rgb(238, 241, 246);
    color: #333;
  }
</style>
