<template>
  <div class="login-view">
    <h1>登録</h1>
    <KbnEditUserForm
      :onaction="handleCreate"
      :name.sync="name"
      :email.sync="email"
      :back="backAction"
      />
  </div>
</template>

<script>
import KbnEditUserForm from '@/components/molecules/KbnEditUserForm.vue'

export default {
  name: 'KbnCreateUserView',

  data () {
    return {
      name: '',
      email: '',
      password:''
    }
  },

  components: {
    KbnEditUserForm
  },

  methods: {
    handleCreate (authInfo) {
      return this.$store.dispatch('createUser', authInfo)
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch(err => this.throwReject(err))
    },

    backAction () {
      this.$router.push({ path: '/login' })
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
