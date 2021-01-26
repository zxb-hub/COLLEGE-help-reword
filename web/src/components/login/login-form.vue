<template>
  <el-form :inline="true" :model="user" class="demo-form-inline">
    <el-form-item label="学工号">
      <el-input v-model="user.userId" placeholder="请输入学号"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        v-model="user.psw"
        placeholder="请输入密码"
        type="password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-radio v-model="user.radio" label="teacher">教师账号</el-radio>
      <el-radio v-model="user.radio" label="student">学生账号</el-radio>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userId: "",
        psw: "",
        radio: "student",
      },
    };
  },
  methods: {
    onSubmit() {
      if (!(this.user.userId && this.user.psw)) {
        return alert("请输入用户名和密码");
      } else {
        if (this.user.radio === "student") {
          this.$http.http
            .post("/student/api/loginStu", {
              username: this.user.userId,
              psw: this.user.psw,
            })
            .then((res) => {
              if (res.data.success === true) {
                console.log(res.data.data)
                let stu = res.data.data[0]
                let stuList = {};
                stuList.username = stu.studentName;
                stuList.userId = stu.userId;
                stuList.sex = stu.sex ? "男":"女";
                stuList.class = stu.class_id;
                stuList.major = stu.major_id;
                stuList.college = stu.college_id;
                if(stu.help.length === 0){
                  stuList.help = stu.help[0]
                  stuList.helpState = stu.help[0]
                  stuList.helpOver = stu.help[0]
                }else{
                  stuList.help = stu.help[0].desc
                  stuList.helpStateClass = stu.help[0].stateClass
                  stuList.helpStateMajor = stu.help[0].stateMajor
                  stuList.helpStateCollege = stu.help[0].stateCollege
                }
                if(stu.reward.length === 0){
                  stuList.reward = stu.reward[0]
                  stuList.rewardState = stu.reward[0]
                  stuList.rewardOver = stu.reward[0]
                }else{
                  stuList.reward = stu.reward[0].desc
                  stuList.rewardStateClass = stu.reward[0].stateClass
                  stuList.rewardStateMajor = stu.reward[0].stateMajor
                  stuList.rewardStateCollege = stu.reward[0].stateCollege
                }
                stuList.status = this.user.radio
                this.$store.commit('set',stuList)
                this.$router.push(
                  `./main/${this.user.radio}/${this.user.userId}`
                );
              } else {
                alert("请检查用户名及密码是否正确");
              }
            });
        } else {
          this.$http.http
            .post("/teacher/api/loginTea", {
              userId: this.user.userId,
              psw: this.user.psw,
            })
            .then((res) => {
              if (res.data.success === true) {
                let Tea = res.data.doc[0]
                Tea.status = this.user.radio
                this.$store.commit('set',Tea)
                this.$router.push(
                  `./main/${this.user.radio}/${this.user.userId}`
                );
              } else {
                alert("请检查用户名及密码是否正确");
              }
            });
        }
      }
    },
  },
};
</script>

<style>
</style>