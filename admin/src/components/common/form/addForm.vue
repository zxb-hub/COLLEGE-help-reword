<template>
  <el-form label-width="80px" class="addForm">
    <selectData
      v-if="showList"
      :showMajor="showMajor"
      @collegeData="collegeData"
      @majorData="majorData"
      @classData="classData"
      :showClass="showClass"
    ></selectData>
    <el-form-item label="用户名称">
      <el-input style="width: 217px" v-model="name"></el-input>
    </el-form-item>
    <el-form-item label="性别" v-if="showAch">
      <el-radio v-model="sex" :label="true">男</el-radio>
      <el-radio v-model="sex" :label="false">女</el-radio>
    </el-form-item>
    <el-form-item label="专业成绩" v-if="showAch">
      <el-input style="width: 217px" v-model="achM" type="number"></el-input>
    </el-form-item>
    <el-form-item label="英语成绩" v-if="showAch">
      <el-input style="width: 217px" v-model="achE" type="number"></el-input>
    </el-form-item>
    <el-form-item label="登陆账号">
      <el-input style="width: 217px" v-model="username"></el-input>
    </el-form-item>
    <el-form-item label="初始密码">
      <el-input style="width: 217px" v-model="psw" type="password"></el-input>
    </el-form-item>
    <el-form-item style="margin-top: 40px">
      <el-button type="primary" @click="post">立即创建</el-button>
      <el-button type="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import selectData from "../select/selectData";
export default {
  data() {
    return {
      name: "",
      username: "",
      psw: "",
      college: "",
      major: "",
      Class: "",
      achM: "",
      achE: "",
      sex:true
    };
  },
  components: {
    selectData,
  },
  props: ["showAch", "showMajor", "showList","showClass"],
  methods: {
    post: function () {
      if(this.showAch){
        this.$emit("post", {
        studentName: this.name,
        userId: this.username,
        psw: this.psw,
        college_id: this.college,
        major_id: this.major,
        class_id:this.Class,
        english:this.achE,
        sex:this.sex,
        profession:this.achM
      });
      }else {
        this.$emit("post", {
        name: this.name,
        username: this.username,
        psw: this.psw,
        college: this.college,
        major: this.major,
        class:this.Class
      });
      }
      
    },
    majorData: function (msg) {
        this.college = msg.college;
        this.major = msg.major;
    },
    collegeData: function (e) {
      this.college = e.college;
    },
    classData: function (e) {
      this.college = e.college;
      this.major = e.major;
      this.Class = e.class;
    }
  },
};
</script>

<style>
.addForm {
  width: 300px;
  position: relative;
  top: 70px;
  margin: 0 auto 0;
}
</style>