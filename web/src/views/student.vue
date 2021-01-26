<template>
<div class="FORM">
  <loginAvator @out="signOut"></loginAvator>
  <postForm></postForm>
  
</div>
  
</template>

<script>
import postForm from '../components/student/post-form'
import loginAvator from "../components/login/login-avator"



export default {
  components:{
    postForm,
    loginAvator
  },
  data(){
    return {
      showAvator:localStorage.getItem("username"),
    }
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

<style>
.FORM{
  width: 360px;
  height: 500px;
  position: relative;
  margin: 120px auto 0;
}
</style>