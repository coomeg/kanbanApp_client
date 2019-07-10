import KbnBoardView from '@/components/templates/KbnBoardView.vue'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'
import KbnTaskDetailModal from '@/components/templates/KbnTaskDetailModal.vue'
import KbnCreateUserView from '@/components/templates/KbnCreateUserView.vue'
import KbnEditUserView from '@/components/templates/KbnEditUserView.vue'

export default [{
  path: '/',
  component: KbnBoardView,
  meta: { requiresAuth: true },
  children: [{
    path: 'tasks/:id',
    component: KbnTaskDetailModal,
    name: 'taskDetailModal',
    meta: { requiresAuth: true }
  }]
}, {
  path: '/login',
  component: KbnLoginView
}, {
  path: '/createUser',
  component: KbnCreateUserView
}, {
  path: '/editUser',
  component: KbnEditUserView
}, {
  path: '*',
  redirect: '/'
}]
