<template>
  <el-select
    v-model="value"
    filterable
    remote
    reserve-keyword
    @change="changeValue"
    placeholder="担当者名を入力して下さい"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'KbnUserSelect',

  props: {
    selectedUserId: Number,
    changeValue: {
      type: Function
    },
    task: {
      type: Object,
      required: false,
      default: () => {}
    },
  },

  data() {
    return {
      options: [],
      value: [],
      list: [],
      loading: false
    }
  },

  mounted() {
    // this.getUserName()
    this.$store.dispatch('getUserLike', '')
      .then((res) => {
        this.list = res.map(item => {
          return {value: item.key, label: item.value}
        })

        let selectData = this.list.filter(item => {
          return item.value === this.selectedUserId
        })
        if (selectData && selectData.length > 0) {
          this.value = selectData[0].value
          this.remoteMethod(selectData[0].label)
        }
      })
  },

  methods: {
    getUserName() {
    this.$store.dispatch('getUserLike', '')
      .then((res) => {
        this.list = res.map(item => {
          return {value: item.key, label: item.value}
        })
      })
    },

    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },

    // changeValue (value) {
    //   this.changeValue(value)
    // }
  }
}
</script>

<style scoped>
.kbn-button {
  padding: .6em 1.3em;
}
.kbn-button-text {
  border: none;
  padding-right: 0;
  padding-left: 0;
}
</style>
