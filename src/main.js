import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

// 引入自定义element.css
import 'element-ui/lib/theme-chalk/index.css';
// 引入自定义css
import '@/assets/css/normalize.css'
import element from './element/index'
Vue.use(element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
