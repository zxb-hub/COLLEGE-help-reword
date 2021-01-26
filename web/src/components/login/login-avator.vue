<template>
  <div class="login-avator" >
      <el-avatar shape="square" :size="30" :src="squareUrl" class="avator"></el-avatar>
      <el-link @click="change">你好：{{ username }}</el-link>
      <el-link icon="el-icon-unlock" @click="out">退出登录</el-link> 
  </div>
</template>

<script>
export default {
    data () {
      return {
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        username: sessionStorage.getItem("username")||sessionStorage.getItem("teacher"),
      }
    },
    methods:{
        out(){
            this.$emit("out")
        },
        change(){
            this.$router.push('/changePsw')
        }
    },
}
</script>

<style lang="less">
    .login-avator{
        float: right;
        margin-top: -82px;
        margin-right: -414px;
        .avator{
            vertical-align: middle;
        }
        p{
            display: inline-block;
            line-height: 30px;
            padding-left: 5px;
            vertical-align: middle;
            
        }
        a{
            margin-left: 5px;
        }
    }
</style>>

