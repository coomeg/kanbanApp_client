<template>
  <form novalidate>
    <div class="form-item">
      <div v-for="(item, index) in list" v-bind:key="item.taskListId">
        <label for="taskListName1">タスクリスト名{{++index}}</label>
        <input
          v-model="item.name"
          type="text"
          autocomplete="off"
          placeholder="例: タスク"
          @focus="resetError">
        <ul class="validation-errors">
          <li v-if="!validation.taskListName1.required">タスクリスト名{{index}}が入力されていません。</li>
        </ul>
      </div>
    </div>
    <div class="form-actions">
      <KbnButton
        buttonstyle="primary"
        :disabled="disableAction"
        :type="style"
        @click="handleClick"
      >
        更新
      </KbnButton>
      <p
        v-if="progress"
        class="login-progress"
      >
        更新中...
      </p>
      <p
        v-if="error"
        class="login-error"
      >
        {{ error }}
      </p>
    </div>
  </form>
</template>

<script>
// KbnButtonをインポート
import KbnButton from '@/components/atoms/KbnButton.vue'
const required = val => val ? !!val.name.trim() : false

export default {
  name: 'KbnSettingForm',

  components: {
    KbnButton
  },

  data () {
    return {
      progress: false,
      message: '',
      list: Array,
      style: 'primary'
    }
  },

  computed: {
    validation () {
      return {
        taskListName1: {
          required: required(this.list[0]),
        },
        taskListName2: {
          required: required(this.list[1])
        },
        taskListName3: {
          required: required(this.list[2])
        }
      }
    },

    valid () {
      const validation = this.validation // 先に定義したvalidationを用いて可否を返す
      const fields = Object.keys(validation)
      let valid = true
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        valid = Object.keys(validation[field])
          .every(key => validation[field][key])
        if (!valid) { break }
      }
      return valid
    },

    disableAction () { // validを使ってログイン処理の可否、progressは後述
      return !this.valid || this.progress
    }
  },

  created () {
    this.loadLists()
  },

  methods: {
    complete() {
        this.$message({
          message: '更新しました',
          type: 'success'
        });
    },

    resetError () {
      this.error = ''
    },

    handleClick (ev) {
      if (this.disableAction) { return } // 不備があればログイン処理が実行されないようガード

      this.progress = true // ログイン処理実行中をあらわす
      this.error = ''
      console.log(this.list)
      return this.$store.dispatch('updateTaskLists', this.list)
        .then((res) => {
          console.log(res)
          this.resetProgress()
          this.complete()
        })
        .catch(err => this.throwReject(err))
    },

    setProgress (message) {
      this.progress = true
      this.message = message
    },

    resetProgress () {
      this.progress = false
      this.message = ''
    },

    loadLists () {
      this.setProgress('読み込み中...')

      this.$store.dispatch('fetchTaskLists')
        .catch(err => Promise.reject(err))
        .then((data) => {
          this.list = data
          console.log('コンポーネント', this.list)
          this.resetProgress()
        })
    },
  }
}
</script>

<style scoped>
  form {
    display: block;
    margin: 0 auto;
    text-align: left;
  }
  label {
    display: block;
  }
  input {
    width: 98%;
    padding: .5em;
    font: inherit;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0.25em 0;
  }
  ul li {
    font-size: 0.5em;
  }
  .validation-errors {
    height: 32px;
  }

  .form-actions {
    padding: 0px 10px 0px 0px;
  }

  .form-actions p {
    font-size: 0.5em;
  }
  .create-link {
    color: blue;
  }
</style>
