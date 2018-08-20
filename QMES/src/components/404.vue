<template>
    <div class="error">
        <div>
            <h1>404</h1>
            <h1>抱歉，找不到您要的页面……</h1>
            <p>5秒钟后返回登入页</p>
        </div>
    </div>
</template>
<script>
export default {
  name: "error",
  data() {
    return {};
  },
  mounted() {
    let me = this;
    setTimeout(function() {
//    this.$router.push({
//		 path: '/'
//	 })
    }, 5000);
  },
  methods: {
  }
};
</script>
<style scoped>
.error {
  width: 500px;
  height: 300px;
  border: 2px dashed #999;
  margin: 3.125em auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.error h1,
.error p {
  text-align: center;
  font-family: "微软雅黑";
}
.error li{
  list-style:disc!important;
}
.error li a{
  color: blue;
  text-decoration:underline;
}
</style>


