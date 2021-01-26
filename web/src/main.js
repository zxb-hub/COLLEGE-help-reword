import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import elementui from "element-ui";
import less from "less";
import "element-ui/lib/theme-chalk/index.css";
import http from "./http";
import store from "./store";

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.use(elementui);
Vue.use(less);

router.beforeEach((to, from, next) => {
  if (to.matched.some((res) => res.meta.islogin)) {
    if (sessionStorage.getItem("userId") === null) {
      alert("登录信息失效，请重新登录")
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
