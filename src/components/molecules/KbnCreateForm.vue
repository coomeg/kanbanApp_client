<template>
  <form>
    <div class="form-item">
      <label for="name">名前</label>
      <input
        id="name"
        v-model="name"
        type="text"
        autocomplete="off"
        placeholder="例: 山田 太郎"
        @focus="resetError">
      <ul class="validation-errors">
        <li v-if="!validation.name.required">名前が入力されていません。</li>
      </ul>
    </div>
    <div class="form-item">
      <label for="email">メールアドレス</label>
      <input
        id="email"
        v-model="email"
        type="text"
        autocomplete="off"
        placeholder="例: kanban@domain.com"
        @focus="resetError">
      <ul class="validation-errors">
        <li v-if="!validation.email.format">メールアドレスの形式が不正です。</li>
        <li v-if="!validation.email.required">メールアドレスが入力されていません。</li>
      </ul>
    </div>
    <div class="form-item">
      <label for="passowrd">パスワード</label>
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="off"
        placeholder="例: xxxxxxxx"
        @focus="resetError">
      <ul class="validation-errors">
        <li v-if="!validation.password.required">パスワードが入力されていません。</li>
      </ul>
    </div>
    <div class="form-actions">
      <KbnButton
        @click="handleClick"
      >
        新規登録
      </KbnButton>
      <p
        v-if="progress"
        class="login-progress"
      >
        登録中...
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
// メールアドレスのフォーマットをチェックする正規表現
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const required = val => !!val.trim()

export default {
  name: 'KbnCreateForm',

  components: {
    KbnButton
  },

  props: {
    oncreate: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      name: '',
      email: '',
      password: '',
      progress: false,
      error: ''
    }
  },

  computed: {
    validation () { // nameとemailとpasswordのバリデーション
      return {
        name: {
          required: required(this.name)
        },
        email: {
          required: required(this.email),
          format: REGEX_EMAIL.test(this.email)
        },
        password: {
          required: required(this.password)
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

    disableLoginAction () { // validを使ってログイン処理の可否、progressは後述
      return !this.valid || this.progress
    }
  },

  methods: {
    resetError () {
      this.error = ''
    },

    handleClick (ev) {
      this.progress = true // ログイン処理実行中をあらわす
      this.error = ''

      this.$nextTick(() => {
        this.oncreate({ name: this.name, email: this.email, password: this.password })
          .catch(err => {
            this.error = err.message
          })
          .then(() => {
            this.progress = false
          })
      })
    }
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
  width: 100%;
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
.form-actions p {
  font-size: 0.5em;
}
</style>
