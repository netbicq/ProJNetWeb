<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style scoped>
#app {
  font-family: "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background: #ffffff; */
  background: #F5F6FA;
  width: 100%;
  min-height: 100%;
}
.areas{
	width: calc(100% - 8.3rem);
	font-size: 1.25rem;
	font-family: "微软雅黑";
}
.areas .el-input__inner{
	border: none;
	font-family: "微软雅黑";
}
.areas1 .el-input__inner{
	border: none;
	font-family: "微软雅黑";
}
.adss.el-textarea{
	width: calc(100% - 8.3rem);
	font-size: 1.25rem;
	font-family: "微软雅黑";
}
.adss .el-textarea__inner{
	border: none;
	font-family: "微软雅黑";
}
.el-message.el-message--error{
	min-width: 300px !important;
}
.el-message.el-message--success{
	min-width: 300px !important;
}
</style>
