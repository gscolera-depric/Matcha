import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  { path: '/', alias: '/home', component: Home, meta: { requiresAuth: true }, children: [
      { path: '', component: () => import('../components/HomeComponents/AppSearch') },
      { path: 'edit-profile', component: () => import('../components/HomeComponents/EditProfile') },
    ]
  },
  { path: '/auth', component: () => import('../views/Auth.vue'), meta: { requiresGuest: true }, children: [
      { path: '', component: () => import('../components/AuthComponents/Home') },
      { path: 'login', component: () => import('../components/AuthComponents/Login') },
      { path: 'register', component: () => import('../components/AuthComponents/Register') },
      { path: 'activate', component: () => import('../components/AuthComponents/AccountActivation') },
      { path: 'password-reset', component: () => import('../components/AuthComponents/PasswordReset') },
      { path: 'success-registration', name: 'success-registration', component: () => import('../components/AuthComponents/SuccessRegistration'), props: true },
      { path: 'account-activation/:login/:token', component: () => import('../components/AuthComponents/AccountActivation') }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(path => path.meta.requiresAuth))
    store.getters.loggedIn ? next() : next('/auth');
  else if (to. matched.some(path => path.meta.requiresGuest))
    store.getters.loggedIn ? next('/home') : next();
  else
    next();
});

router.afterEach(() => {
  if (store.getters.loggedIn && store.getters.mobileMode && store.getters.profile)
    store.commit('TOGGLE_PROFILE');
});

export default router
