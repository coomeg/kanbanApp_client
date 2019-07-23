<template>
  <div class="task-list">
    <KbnTaskListHeader
      :name="name"
      @add="shown = true"
    />
    <ul class="task-list-items">
      <draggable
        v-model="draggableItems"
        :options="{ group: 'items' }"
        @change="handleChange"
        @end="handleEnd"
      >
        <li
          v-for="item in draggableItems"
          :key="item.id"
        >
          <KbnTaskCard
            v-bind="item"
            @remove="handleRemove"
          />
        </li>
      </draggable>
    </ul>
    <KbnTaskForm
      v-if="shown"
      :list-id="id"
      @close="shown = false"
    />
  </div>
</template>

<script>
import KbnTaskListHeader from '@/components/molecules/KbnTaskListHeader.vue'
import KbnTaskCard from '@/components/molecules/KbnTaskCard.vue'
import KbnTaskForm from '@/components/molecules/KbnTaskForm.vue'
import { mapState } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'KbnTaskList',

  components: {
    KbnTaskListHeader,
    KbnTaskCard,
    KbnTaskForm,
    draggable
  },

  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      shown: false
    }
  },

  computed: {
    draggableItems: {
      get () { return this.items },
      set (value) {
        console.log("draggableItems:setter::", value)
        // NOTE:
        //  本来なら、Vue.Draggrableから処理されたデータをitemsに反映すれば可能だが、
        //  フロントエンドとバックエンドの状態を整合とるために、ここでは何もしない。
      }
    },
    ...mapState({
      canMove: state => state.dragging.target !== null &&
        state.dragging.from !== null &&
        state.dragging.to !== null
    })
  },

  methods: {
    complete(name) {
      this.$message({
        message: `${name}を削除しました`,
        type: 'success'
      });
    },
    handleRemove ({ taskId, taskListId }) {
      const removeTask = this.$store.getters.getTaskById(taskId)
      return this.$store.dispatch('removeTask', { taskId, taskListId })
        .then(() => {
          console.log('削除')
          this.$store.dispatch('fetchLists')
            .catch(err => Promise.reject(err))
            .then(() => {
              this.complete(removeTask.name)
            })
        })
        .catch(err => Promise.reject(err))
    },

    handleChange ({ added, removed, moved }) {
      console.log('added:', added, 'removed:', removed)
      if (added) {
        console.log('added:', added.newIndex, 'removed:', removed)
        return this.$store.dispatch('moveToTask', {
          id: added.element.taskId,
          listId: this.id,
          sortNoTo: added.newIndex
        }).catch(err => Promise.reject(err))
      } else if (removed) {
        console.log('added:', added, 'removed:', removed.oldIndex)
        return this.$store.dispatch('moveTaskFrom', {
          id: removed.element.taskId,
          listId: this.id,
          sortNoFrom: removed.oldIndex
        }).catch(err => Promise.reject(err))
      } else if (moved) {
        // 同じタスクリスト内の移動
        // 順番の変更のみの場合
        console.log('moved:', moved)
        return this.$store.dispatch('moveTask', {
          id: moved.element.taskId,
          listId: this.id,
          sortNoFrom: moved.oldIndex,
          sortNoTo: moved.newIndex
        }).catch(err => Promise.reject(err))
      }
    },

    handleEnd () {
      if (this.canMove) {
        console.log('handleEnd')
        return this.$store.dispatch('performTaskMoving')
          .catch(err => Promise.reject(err))
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul li {
  margin: 8px;
  padding: 4px;
  border: thin solid black;
  border-radius: 0.5em;
}
</style>
