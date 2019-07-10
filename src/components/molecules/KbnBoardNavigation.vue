<template>
  <nav class="board-navigation">
    <div class="title">
      <h1>Kanban App</h1>
    </div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">メニュー</template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
        <el-submenu index="2-3">
          <template slot="title">item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-submenu>
        <el-menu-item
          index="1-4"
          @click="$emit('logout')">
          ログオフ
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </nav>
</template>

<script>
import KbnButton from '@/components/atoms/KbnButton.vue'

export default {
  name: 'KbnBoardNavigation',

  data: {
    activeIndex: '1',
    activeIndex2: '1'
  },

  components: {
    KbnButton
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.board-navigation {
  display: flex;
  border-bottom: medium solid black;
}
.title {
  flex: 1;
}
h1 {
  margin: 0px;
}
.actions {
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  cursor: pointer;
}
</style>
