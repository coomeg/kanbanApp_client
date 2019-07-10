<template>
  <el-menu
    class="el-menu"
    mode="horizontal"
    @select="selectMenu"
    >
    <el-submenu index="1">
      <template slot="title">メニュー</template>
      <el-menu-item
        index="1-1"
        @click="$emit('top')">
        トップ
      </el-menu-item>
      <el-menu-item
        index="1-2">
        タスク一覧
      </el-menu-item>
      <el-menu-item
        index="1-3"
        @click="$emit('edituser')">
        ユーザー情報編集
      </el-menu-item>
      <el-menu-item
        index="1-4"
        @click="$emit('logout')">
        ログオフ
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'KbnBoardMenu',

  methods: {
    selectMenu (key, keyPath) {
      this.$emit('select-menu', key, keyPath)
    }
  }
}
</script>

