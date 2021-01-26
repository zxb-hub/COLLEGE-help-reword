<template>
<div class="login">
   <el-form :inline="true" :model="user" class="demo-form-inline loginform" >
    <el-form-item label="管理员账号">
      <el-input v-model="user.userId" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        v-model="user.psw"
        placeholder="请输入密码"
        type="password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</div>
 
</template>

<script>
export default {
  data() {
    return {
      user: {
        userId: "",
        psw: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$http.http
        .post("/login", {
          userId: this.user.userId,
          psw: this.user.psw,
        })
        .then((res) => {
          if (res.data.success === true) {
            console.log(res.data.data)
            let Tea = res.data.data[0];
            for(let x in Tea){
              sessionStorage.setItem(x,Tea[x])
            }
            this.$router.push(`./main`);
          } else {
            alert("请检查用户名及密码是否正确");
          }
        });
    },
  },
};
</script>

<style lang="less">
.login{
  height: 89vh;
  margin-top: -100px;
  width: 100%;
  background-image: url(../assets/bg.jpg);
  .loginform{
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    margin-left: 45px;
  }
}
</style>