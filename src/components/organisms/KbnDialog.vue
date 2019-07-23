<template>
  <div class="dialog-style">
    <el-dialog
      width="500px"
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

<style>
  .dialog-style {
    text-align: left;
    line-height: 20px;
  }

  input {
    width: 95%;
  }

  .form-actions {
    text-align: right;
  }

</style>
