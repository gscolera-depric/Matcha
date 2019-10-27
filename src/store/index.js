import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from './modules/AuthModule';
import UserModule from './modules/UserModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    mobileMode: window.innerWidth < 600,
    profile: window.innerWidth > 600
  },
  getters: {
    isLoading: state => state.loading,
    mobileMode: state => state.mobileMode,
    profile: state => state.profile
  },
  mutations: {
    SHOW_PRELOADER: state => state.loading = true,
    HIDE_PRELOADER: state => state.loading = false,
    TOGGLE_PROFILE: state => state.profile = !state.profile,
    HANDLE_RESIZE: state => state.mobileMode = window.innerWidth < 768
  },
  actions: {
  },
  modules: {
    AuthModule,
    UserModule
  }
})
