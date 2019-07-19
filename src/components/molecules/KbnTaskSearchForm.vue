<template>
  <div>
    <div class="form-item">
      <div class="label-item">
        <label for="name">担当者</label>
      </div>
      <el-autocomplete
        v-model="name"
        :fetch-suggestions="querySearchAsync"
        placeholder="Please input"
        @select="handleSelect"
      ></el-autocomplete>
    </div>

    <div class="block">
      <span class="demonstration">作成日</span>
      <el-date-picker
        v-model="createDate"
        type="daterange"
        range-separator="～"
        start-placeholder="Start date"
        end-placeholder="End date">
      </el-date-picker>
    </div>

    <div class="form-item">
      <div class="label-item">
        <label for="name">キーワード</label>
      </div>
      <div class="input-item">
        <el-input placeholder="Please input" v-model="keyword"></el-input>
      </div>
    </div>

    <div class="form-item">
      <div class="label-item">
        <label for="name">ステータス</label>
      </div>
      <div class="input-item">
        <el-checkbox-group v-model="checkList">
            <el-checkbox
              v-for="status in statusList"
              :key="status.taskListId"
              :label="status.name">
            </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

     <div class="form-actions">
      <KbnButton
        @click="handleClick"
        buttonstyle="primary"
        iconType="el-icon-search">
        <slot name="actionName">検索</slot>
      </KbnButton>
      <KbnButton
        @click="clearClick">
        <slot name="actionName">クリア</slot>
      </KbnButton>
    </div>
  </div>
</template>

<script>
// KbnButtonをインポート
import KbnButton from '@/components/atoms/KbnButton.vue'

export default {
  name: 'KbnTaskSearchForm',

  components: {
    KbnButton
  },

  props: {
    onaction: {
      type: Function,
      required: true
    },
  },

  data () {
    return {
      style: 'primary',
      name: '',
      createDate: '',
      keyword: '',
      statusList: Array,
      checkList: [],
      pickerOptions: {
        shortcuts: [{
          text: 'Last week',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last month',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last 3 months',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      links: [],
      timeout:  null
    }
  },

  // computed: {

  // },

  methods: {
    clearClick () {
      this.name=''
      this.createDate=''
      this.keyword=''
      this.checkList=[]
    },

    handleClick (ev) {
      let dateFrom = '1900-01-01'
      let dateTo = '9999-12-31'
      let checkVal = Array

      if (this.createDate && this.createDate[0]) {
        dateFrom = this.createDate[0]
      }
      if (this.createDate && this.createDate[1]) {
        dateTo = this.createDate[1]
      }
      if (this.checkList.length == 0) {
        checkVal = Array(1,2,3)
      } else {
        checkVal = this.checkList.map(val => {
          const id = this.statusList.find(status => status.name === val)
          return id.taskListId
        })
      }
      this.$nextTick(() => {
        this.onaction({
            sname: this.name,
            dateFrom: dateFrom,
            dateTo: dateTo,
            keyword: this.keyword,
            taskListIds: checkVal
          })
          .catch(err => {
            this.error = err.message
          })
          .then(() => {
            this.progress = false
          })
      })
    },

    getUserName() {
      this.$store.dispatch('getUserLike', this.name)
        .then((res) => {
          console.log(res)
          this.links = res
        })
        .catch(err => this.throwReject(err))
    },

    getStatusList() {
      this.$store.dispatch('fetchTaskLists')
        .then((res) => {
          console.log(res)
          this.statusList = res
        })
        .catch(err => this.throwReject(err))
    },

    querySearchAsync(queryString, cb) {
      var links = this.links;
      var results = queryString ? links.filter(this.createFilter(queryString)) : links;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createFilter(queryString) {
      console.log(queryString)
      return (key) => {
        console.log('key:',key)
        return (key.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },

  mounted() {
    this.getUserName()
    this.getStatusList()
  }
}
</script>

<style scoped>
form {
  display: block;
  margin: 0 auto;
  text-align: left;
}
input {
  padding: .5em;
  font: inherit;
}
ul {
  list-style-type: none;
  padding: 0;
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
/* .form-item {
  display: -webkit-flex;
  display: flex;
  line-height: 0px;
}
.label-item {
  width: 150px;
} */
/* label {
  display: block;
} */
</style>
