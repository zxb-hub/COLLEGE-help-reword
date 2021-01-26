import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import studentSeek from "../components/students/studentSeek.vue";
import studentAdd from "../components/students/studentAdd.vue";
import teacherSeek from "../components/major/teacherSeek.vue";
import teacherAdd from "../components/major/teacherAdd.vue";
import collegeSeek from "../components/colleges/collegeSeek.vue";
import collegeAdd from "../components/colleges/collegeAdd.vue";
import schoolSeek from "../components/school/schoolSeek.vue";
import schoolAdd from "../components/school/schoolAdd.vue";

import addDB from "../views/About.vue";
import addClass from "../components/addDB/addClass";
import addCollege from "../components/addDB/addCollege";

import addMajor from "../components/addDB/addMajor";
import changePsw from "../views/changePsw";

import Login from "../views/Login";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    meta: { islogin: true },
    children: [
      {
        path: "",
        redirect: "/student/studentSeek",
        meta: { islogin: true },
      },
      {
        path: "/student/studentSeek",
        component: studentSeek,
        meta: { islogin: true },
      },
      {
        path: "/student/studentAdd",
        component: studentAdd,
        meta: { islogin: true },
      },
      {
        path: "/teacher/teacherSeek",
        component: teacherSeek,
        meta: { islogin: true },
      },
      {
        path: "/teacher/teacherAdd",
        component: teacherAdd,
        meta: { islogin: true },
      },
      {
        path: "/college/collegeSeek",
        component: collegeSeek,
        meta: { islogin: true },
      },
      {
        path: "/college/collegeAdd",
        component: collegeAdd,
        meta: { islogin: true },
      },
      {
        path: "/school/schoolSeek",
        component: schoolSeek,
        meta: { islogin: true },
      },
      {
        path: "/school/schoolAdd",
        component: schoolAdd,
        meta: { islogin: true },
      },
    ],
  },
  {
    path: "/addDB",
    name: "addDB",
    component: addDB,
    meta: { islogin: true },
    children: [
      {
        path: "/addDB/addClass",
        component: addClass,
        meta: { islogin: true },
      },
      {
        path: "/addDB/addCollege",
        component: addCollege,
        meta: { islogin: true },
      },
      {
        path: "/addDB/addMajor",
        component: addMajor,
        meta: { islogin: true },
      },
    ],
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
