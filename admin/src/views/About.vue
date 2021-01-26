<template>
<div>
  <loginAvator ></loginAvator>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>各学院班级添加</template
          >
          <el-menu-item index="/addDB/addCollege">
            <i class="el-icon-menu"></i>
            <span slot="title">学院添加</span>
          </el-menu-item>
          <el-menu-item index="/addDB/addMajor" >
            <i class="el-icon-document"></i>
            <span slot="title">专业添加</span>
          </el-menu-item>
          <el-menu-item index="/addDB/addClass">
            <i class="el-icon-setting"></i>
            <span slot="title">班级添加</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px"> </el-header>

      <el-main>
        <router-view></router-view>
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