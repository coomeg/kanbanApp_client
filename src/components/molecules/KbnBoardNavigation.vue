<template>
  <el-container>
    <el-header>
      <KbnBoardMenu class="boardMenu" />
    </el-header>

    <el-main class="mainContent">
      <!-- 各画面表示用 -->
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import KbnBoardMenu from '@/components/molecules/KbnBoardMenu.vue'
import KbnEditUserView from '@/components/templates/KbnEditUserView.vue'

export default {
  name: 'KbnBoardNavigation',

  data () {
    return {
      progress: false,
      message: ''
    }
  },

  components: {
    KbnBoardMenu,
    KbnEditUserView
  },

  computed: mapState({
    userName: state => state.auth.name
  })
}
</script>

<style scoped>
  .el-header {
    text-align: right;
    font-size: 12px;
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-container{
    width: 100%;
  }
</style>
