import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from './modules/AuthModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    mobileMode: window.innerWidth < 600
  },
  getters: {
    isLoading: state => state.loading,
    mobileMode: state => state.mobileMode
  },
  mutations: {
    SHOW_PRELOADER: state => state.loading = true,
    HIDE_PRELOADER: state => state.loading = false,
    HANDLE_RESIZE: state => state.mobileMode = window.innerWidth < 768
  },
  actions: {
  },
  modules: {
    AuthModule
  }
})
