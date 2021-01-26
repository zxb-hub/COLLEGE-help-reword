<template>
  <div>
    <header >
      <img src="./assets/logo.png" alt="" />
      <h2>皖西学院-奖学金-助学金 申请</h2>
    </header>
    <router-view />
  </div>
</template>

<script>


export default {
  name: "App",
  components: {
  }
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
header {
  text-align: left;
  height: 0;
  position: relative;
  img{
    display: inline-block;
    margin-left: 150px;
    vertical-align: middle;
  }
  h2{
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 30px;
    padding: 0;
    font-size: 28px;
    display: inline-block;
    height: 100px;
    line-height: 100px;
}
}

</style>
