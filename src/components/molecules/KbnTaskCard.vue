<template>
  <div class="task-card">
    <div class="name">
      <!--
      <router-link :to="{ name: 'taskDetailModal', params: { taskId } }">
        <h3>{{ name }}</h3>
      </router-link>
      -->
      <el-link :underline="false" @click="linkClick">
        {{ name }}
      </el-link>
      <KbnDialog
        title="タスク詳細"
        :dialogFormVisible="dialogFormVisible"
        @close="closeDialog">
        <KbnTaskDetailForm
          :task="task"
          :onupdate="handleUpdate" />
      </KbnDialog>
    </div>
    <div class="actions">
      <KbnButton
        type="text"
        @click="$emit('remove', { taskId, taskListId })"
      >
        <KbnIcon name="remove" />
      </KbnButton>
    </div>
  </div>
</template>

<script>
import KbnButton from '@/components/atoms/KbnButton.vue'
import KbnIcon from '@/components/atoms/KbnIcon.vue'
import KbnDialog from '@/components/organisms/KbnDialog.vue'
import KbnTaskDetailForm from '@/components/molecules/KbnTaskDetailForm.vue'

export default {
  name: 'KbnTaskCard',

  components: {
    KbnButton,
    KbnDialog,
    KbnIcon,
    KbnTaskDetailForm
  },

  data () {
    return {
      dialogFormVisible: false,
    }
  },

  props: {
    taskId: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    taskListId: {
      type: Number,
      required: true
    }
  },

  computed: {
    task () {
      // const id = parseInt(this.$route.params.id)
      return !Number.isNaN(this.taskId)
        ? {...this.$store.getters.getTaskById(this.taskId)}
        : {}
    }
  },

  methods: {
    closeDialog () {
      this.dialogFormVisible = false
    },

    linkClick () {
      this.dialogFormVisible = true
    },

    handleUpdate (task) {
      console.log('task::::',task)
      return this.$store.dispatch('updateTask', task)
        .then(() => {
           this.closeDialog()
        })
    },

    throwReject (err) { return Promise.reject(err) }
  }
}
</script>

<style scoped>
.task-card {
  display: flex;
}
.name {
  flex: 1;
}
h3 {
  margin: 0px;
  font-size: 0.75em;
  text-align: left;
  padding-left: 8px;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
.actions {
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  cursor: pointer;
}
</style>
