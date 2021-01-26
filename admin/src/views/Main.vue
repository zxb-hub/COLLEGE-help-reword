<template>
<div>
  <loginAvator></loginAvator>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="opens">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>学生信息管理</template
          >
          <el-menu-item index="/student/studentSeek">学生信息查看</el-menu-item>
          <el-menu-item index="/student/studentAdd">学生信息添加</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-menu"></i>专业审核员信息管理</template
          >
          <el-menu-item index="/teacher/teacherSeek"
            >专业审核员信息查看</el-menu-item
          >
          <el-menu-item index="/teacher/teacherAdd">专业审核员添加</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-setting"></i>学院审核员信息管理</template
          >
          <el-menu-item index="/college/collegeSeek"
            >学院审核员信息查看</el-menu-item
          >
          <el-menu-item index="/college/collegeAdd"
            >学院审核员添加</el-menu-item
          >
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">学生处审核员信息管理</template>
          <el-menu-item index="/school/schoolSeek"
            >学生处审核员信息查看</el-menu-item
          >
          <el-menu-item index="/school/schoolAdd"
            >学生处审核员添加</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view v-if="isRouterAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import loginAvator from "../components/common/login/login-avator"
export default {
   components:{
    loginAvator
  },
  data() {
    return {
      opens: ["1"],
      isRouterAlive:true
    };
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>