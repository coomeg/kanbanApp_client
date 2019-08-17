<template>
  <div class="flex-box">
    <div class="title">
      <span>{{this.$route.name}}</span>
    </div>
    <div class="setting">
      <span>{{userName}}</span>
      <el-dropdown
        hide-timeout="600"
        @command="handleSetting">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="editUser">
            ユーザー情報編集 テスト
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            ログオフ
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <KbnDialog
        title="ユーザー情報編集"
        :dialogFormVisible="dialogFormVisible"
        @close="closeDialog">
        <KbnEditUserForm
          :onaction="updateUser"
          :back="backAction"
          :name.sync="name"
          :email.sync="email">
          <template slot="actionName">編集</template>
          <template slot="actionProgress">
            編集中...
          </template>
        </KbnEditUserForm>
      </KbnDialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import KbnEditUserForm from '@/components/molecules/KbnEditUserForm.vue'
import KbnDialog from '@/components/organisms/KbnDialog.vue'

export default {
  name: 'KbnBoardMenu',
  components: {
    KbnEditUserForm,
    KbnDialog
  },

  data () {
    return {
      dialogFormVisible: false,
      name: '',
      email: ''
    }
  },

  computed: mapState({
    userName: state => state.auth.name
  }),

  methods: {
    complete() {
      this.$message({
        message: '更新しました',
        type: 'success'
      });
    },

    selectMenu (key, keyPath) {
      this.$emit('select-menu', key, keyPath)
    },

    setProgress (message) {
      this.progress = true
      this.message = message
    },

    resetProgress () {
      this.progress = false
      this.message = ''
    },

    handleSetting (command) {
      if (command === 'top') {
        this.$router.push({ path: '/' })
      } else if (command === 'editUser') {
        this.$store.dispatch('getUser')
          .then((data) => {
            console.log(data)
            this.name = data.name
            this.email = data.email
        })
        .catch(err => this.throwReject(err))
        this.dialogFormVisible = true
      } else if (command === 'logout') {
        this.handleLogout()
      }
    },

    // ログオフ
    handleLogout () {
      this.setProgress('ログオフ中...')

      return this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch(err => Promise.reject(err))
        .then(() => {
          this.resetProgress()
        })
    },

    backAction() {
      this.closeDialog()
    },

    updateUser (authInfo) {
      console.log('ユーザー情報編集ダイアログクローズ処理')
      return this.$store.dispatch('editUser', authInfo)
        .then(() => {
          this.dialogFormVisible = false
          this.complete()
        })
        .catch(err => this.throwReject(err))
    },

    closeDialog () {
      this.dialogFormVisible = false
    },

    throwReject (err) { return Promise.reject(err) }
  }
}
</script>

<style scoped>

  .flex-box{
    display:flex;
  }

  .title {
    width: 80%;
    text-align: left;
    font-size: 20px;
  }

  .setting{
    width: 20%;
    text-align: right;
  }
</style>
