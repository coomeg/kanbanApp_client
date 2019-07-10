<template>
  <div class="board-view">
    <nav class="board-navigation">
      <div class="title">
        <h1>{{this.pageName}}</h1>
        ログインユーザー：{{userName}}
      </div>
      <KbnBoardMenu
        @logout="handleLogout"
        @edituser="handleEditUser"
        @top="handleTop">
      </KbnBoardMenu>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import KbnBoardMenu from '@/components/molecules/KbnBoardMenu.vue'

export default {
  name: 'KbnBoardNavigation',

  data () {
    return {
      pageName: 'Kanban App',
      progress: false,
      message: ''
    }
  },

  components: {
    KbnBoardMenu
  },

  props: {
    pageName: {
      type: String,
      required: true
    }
  },

  computed: mapState({
    userName: state => state.auth.name
  }),

  methods: {
    // selectMenu (key, keyPath) {
    //   console.log('key:', key, 'pass:', keyPath)
    //   this.pageName = key === 'トップ' ? 'Kanban App' : key
    // },

    setProgress (message) {
      this.progress = true
      this.message = message
    },

    resetProgress () {
      this.progress = false
      this.message = ''
    },

    handleTop () {
      this.$router.push({ path: '/' })
    },

    handleEditUser () {
      this.$router.push({ path: '/editUser' })
    },

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
    }
  }
}
</script>

<style scoped>
.board-view {
  border: medium solid black;
}
.board-navigation {
  display: flex;
  border-bottom: medium solid black;
}
.title {
  flex: 1;
}
h1 {
  margin: 0px;
}
.actions {
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  cursor: pointer;
}
</style>
