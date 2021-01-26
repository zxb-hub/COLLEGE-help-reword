<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png" alt="">
      <h2>奖学金/助学金 申请后台管理系统</h2>
    </header>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
header {
  text-align: left;
  height: 100px;
  position: relative;
}
header img{
  display: inline-block;
  margin-left: 50px;
  vertical-align: middle;
}
header h2{
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 20px;
  padding: 0;
  font-size: 28px;
  display: inline-block;
  height: 100px;
  line-height: 100px;
}

</style>
