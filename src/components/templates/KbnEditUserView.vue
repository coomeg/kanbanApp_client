<template>
  <div class="board-view">
    <KbnBoardNavigation pageName="ユーザー情報編集" />
    <KbnEditUserForm :onaction="handleEdit">
      <template slot="actionName">編集</template>
      <template slot="actionProgress">
        編集中...
      </template>
    </KbnEditUserForm>
  </div>
</template>

<script>
import KbnBoardNavigation from '@/components/molecules/KbnBoardNavigation.vue'
import KbnEditUserForm from '@/components/molecules/KbnEditUserForm.vue'

export default {
  name: 'KbnCreateView',

  components: {
    KbnEditUserForm,
    KbnBoardNavigation
  },

  methods: {
    handleEdit (authInfo) {
      return this.$store.dispatch('editUser', authInfo)
        .then(() => {
          // this.$router.push({ path: '/login' })
        })
        .catch(err => this.throwReject(err))
    },

    throwReject (err) { return Promise.reject(err) }
  }
}
</script>

<style scoped>
.board-view {
  border: medium solid black;
}
.progress {
  margin: auto;
}
</style>
