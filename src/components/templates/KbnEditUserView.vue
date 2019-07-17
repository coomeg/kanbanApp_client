<template>
  <div class="editUser">
    <span>ユーザー情報編集</span>
    <KbnEditUserForm :onaction="handleEdit">
      <template slot="actionName">編集</template>
      <template slot="actionProgress">
        編集中...
      </template>
    </KbnEditUserForm>
  </div>
</template>

<script>
import KbnEditUserForm from '@/components/molecules/KbnEditUserForm.vue'

export default {
  name: 'KbnCreateView',
  props: {
    handleClose: {
      type: Function,
      required: true
    }
  },

  components: {
    KbnEditUserForm
  },

  methods: {
    handleEdit (authInfo) {
      return this.$store.dispatch('editUser', authInfo)
        .then((res) => {
          // this.$router.push({ path: '/login' })
        })
        .catch(err => this.throwReject(err))
    },

    throwReject (err) { return Promise.reject(err) }
  }
}
</script>
