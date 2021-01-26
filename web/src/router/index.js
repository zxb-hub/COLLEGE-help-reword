import VueRouter from "vue-router";
import Vue from "vue";
import login from "../views/Login.vue";
import student from "../views/student";
import teacher from "../views/teacher";
import changePsw from "../views/changePsw";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: login,
  },
  {
    path: "/main/student/:id",
    component: student,
    meta: { islogin: true },
  },
  {
    path: "/main/teacher/:id",
    component: teacher,
    meta: { islogin: true },
  },
  {
    path: "/changePsw",
    component: changePsw,
    meta: { islogin: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
