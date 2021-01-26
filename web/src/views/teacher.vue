<template>
  <div class="teacher">
    <loginAvator @out="signOut" class="logo"></loginAvator>
    <navMenu class="nav"></navMenu>
    
  </div>
</template>

<script>
import navMenu from "../components/teacher/NavMenu"
import loginAvator from "../components/login/login-avator"
export default {
  components:{
    navMenu,
    loginAvator
  },
  methods:{
    signOut(){
      sessionStorage.clear()
      this.$store.dispatch("delete")
      this.$router.push("/")
    }
  }
}
</script>

<style lang="less">
  .teacher{
    margin-top: 100px;
    .nav{
      margin-left: 150px;
      width: 80%;
    }
    .logo{
      margin-top: -61px;
      margin-right: 50px;
    }
  }
</style>