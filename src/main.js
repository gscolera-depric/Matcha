import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePageTransition from 'vue-page-transition';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import { requestHandler, responseErrorHandler } from "./utils/interceptors";

Vue.config.productionTip = false;
Vue.use(VuePageTransition);
Vue.use(Vuelidate);

axios.interceptors.request.use(requestHandler, error => error);
axios.interceptors.response.use(res => res, responseErrorHandler);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
