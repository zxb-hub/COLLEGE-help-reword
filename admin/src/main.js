import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import less from "less";
import http from './http'
// import vuex from 'vuex'

router.beforeEach((to, from, next) => {
  if (to.matched.some((res) => res.meta.islogin)) {
    if (sessionStorage.getItem("userId") === null) {
      alert("登录信息失效，请重新登录")
      next({
        path: "/",
      });
    } else {
      console.log(1111)
      next();
    }
  } else {
    console.log(2222)
    next();
  }
});

Vue.use(less)
Vue.prototype.$http = http
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
