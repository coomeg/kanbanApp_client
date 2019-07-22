<template>
  <span :class="classes">
    <i style="font-size:20px;" v-show="name === 'add'" class="el-icon-circle-plus-outline"></i>
    <i style="font-size:20px;" v-show="name === 'close' || name === 'remove'" class="el-icon-error"></i>
  </span>
</template>

<script>
export default {
  name: 'KbnIcon',

  props: {
    name: {
      type: String,
      required: true,
      validator: value => {
        return ['close', 'remove', 'add'].indexOf(value) !== -1
      }
    }
  },

  computed: {
    classes () {
      return ['kbn-icon', this.name]
    },

    icon () {
      const name = this.name
      if (name === 'close' || name === 'remove') {
        return 'x'
      } else if (name === 'add') {
        return '+'
      }
    }
  }
}
</script>
