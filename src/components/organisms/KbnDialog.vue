<template>
  <div class="dialog-style">
    <el-dialog
      :title="title"
      :visible="dialogFormVisible"
      @close="$emit('close')">
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "KbnDialog",
  props: {
    title: {
      type: String
    },

    dialogFormVisible: {
      type: Boolean
    },

    close: {
      type: Function,
    }
  }
}
</script>

<style scoped>
  .dialog-style {
    text-align: left;
  }
</style>
