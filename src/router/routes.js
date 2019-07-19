import KbnBoardView from '@/components/templates/KbnBoardView.vue'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'
import KbnTaskDetailModal from '@/components/templates/KbnTaskDetailModal.vue'
import KbnCreateUserView from '@/components/templates/KbnCreateUserView.vue'
import KbnEditUserView from '@/components/templates/KbnEditUserView.vue'
import KbnSideMenu from '@/components/molecules/KbnSideMenu.vue'
import KbnHomeView from '@/components/templates/KbnHomeView.vue'
import KbnSettingForm from '@/components/molecules/KbnSettingForm.vue'
import KbnTaskSearchView from '@/components/templates/KbnTaskSearchView.vue'

export default [{
  path: '/',
  component: KbnHomeView,
  meta: { requiresAuth: true },
  children: [{
    path: '',
    component: KbnBoardView,
    meta: { requiresAuth: true }
  }, {
    path: 'tasks/:id',
    component: KbnTaskDetailModal,
    name: 'taskDetailModal',
    meta: { requiresAuth: true }
  }, {
    path: 'search',
    component: KbnTaskSearchView,
    meta: { requiresAuth: true }
  }, {
    path: 'setting',
    component: KbnSettingForm,
    meta: { requiresAuth: true }
  }]
}, {
  path: '/login',
  component: KbnLoginView
}, {
  path: '/createUser',
  component: KbnCreateUserView
}, {
  path: '*',
  redirect: '/'
}]
