<template>
<div class="login">
  <loginForm class="loginform"></loginForm>
</div>
</template>

<script>
import loginForm from '../components/login/login-form'
export default {
  components:{
    loginForm,
  }
}
</script>

<style lang="less">
.login{
  height: 89vh;
  width: 100%;
  background-image: url(../assets/bg.jpg);
  .loginform{
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    margin-left: 250px;
  }
}
</style>