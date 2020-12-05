import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import createRouter from './base/router';


Vue.config.productionTip = false;
// 不需要每次都 import一下 axios了，直接使用 $axios 即可
Vue.prototype.$axios = axios;   //全局注册，使用方法为:this.$axios
// step3：使每次请求都会带一个 /api 前缀
axios.defaults.baseURL = '/api';
Vue.use(ElementUI);


let router = createRouter();
new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
