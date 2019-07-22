<template>
  <div class="editUser">
    <KbnTaskSearchForm
      :onaction="searchAction" />
    <hr />
    <KbnTaskResult
      :loadingFlg="loading"
      :tableData="searchResult" />
  </div>
</template>

<script>
import KbnTaskSearchForm from '@/components/molecules/KbnTaskSearchForm.vue'
import KbnTaskResult from '@/components/molecules/KbnTaskResult.vue'

export default {
  name: 'KbnTaskSearchView',

  data () {
    return {
      searchResult: [],
      loading: true,
    }
  },

  components: {
    KbnTaskSearchForm,
    KbnTaskResult
  },

  created () {
    this.searchAction({
      sname: "",
      dateFrom: '1900-01-01',
      dateTo: '9999-12-31',
      keyword: '',
      taskListIds: [1,2,3]
    })
  },

  methods: {
    searchAction (form) {
      this.loading = true
      return this.$store.dispatch('searchTasks', form)
        .then((res) => {
          // 検索結果を初期化
          this.searchResult = []
          res.data.forEach((data, index) => {
            console.log(data)
            // 日付をフォーマット
            const d = new Date(data.createDate)
            const formatted = `
              ${d.getFullYear()} /
              ${d.getMonth()+1} /
              ${d.getDate()}
              `.replace(/\n|\r/g, '')

            this.searchResult.push({
              no: ++index,
              taskId: data.taskId,
              taskName: data.name,
              createDate: formatted,
              name: data.syain ? data.syain.name : '',
              status: data.taskList.name
            })
          })
          this.loading = false
        })
    },
  }
}
</script>
