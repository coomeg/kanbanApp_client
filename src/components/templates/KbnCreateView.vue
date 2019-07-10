<template>
  <div class="login-view">
    <h1>Kanban 新規登録</h1>
    <KbnCreateForm :oncreate="handleCreate"/>
  </div>
</template>

<script>
import KbnCreateForm from '@/components/molecules/KbnCreateForm.vue'

export default {
  name: 'KbnCreateView',

  components: {
    KbnCreateForm
  },

  methods: {
    handleCreate (authInfo) {
      return this.$store.dispatch('createUser', authInfo)
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch(err => this.throwReject(err))
    },

    throwReject (err) { return Promise.reject(err) }
  }
}
</script>

<style scoped>
.login-view {
  width: 320px;
  margin: auto;
}
</style>
