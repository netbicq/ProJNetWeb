<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
  watch: {
    $route(to, from) {
      if (to.fullPath !== from.fullPath) {
        let RoutUrl=window.location.hash.substring(1,window.location.hash.length)
        let MenuList=JSON.parse(sessionStorage.MenuList)
        let state=false;
        if(RoutUrl.indexOf('AccountInfo')=== -1){
          for(let i=0;i<MenuList.length;i++){
            for(let j=0;j<MenuList[i].Menu.length;j++){
              if(RoutUrl==MenuList[i].Menu[j].RoutUrl){
                state=true;
              }
            }
          }
        }else{
          state=true;
        }
        
        if(!state){
          this.$router.push({
            path: '/404'
          })
        }
      }
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f7fa;
  min-width: 1200px;
}
</style>
