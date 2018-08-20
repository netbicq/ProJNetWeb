<template>
    <div class="container">
        <div class="head-img">
            <img src="../assets/head.png" alt="">
        </div>
        <div class="swiper">
            <el-carousel height="125px">
                <el-carousel-item v-for="item in 2" :key="item">
                    <img src="../assets/banner.png" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="menu">
        </div>
        <div class="wrap">
            <router-link to="InfoQuery">
                <h2>信息查询</h2>
            </router-link>
            <router-link to="Guide">
                <h2>办事指南</h2>
            </router-link>
            <router-link to="LawAid">
                <h2>法律援助</h2>
            </router-link>
            <router-link to="Study/1">
                <h2>教育学习</h2>
            </router-link>
            <router-link to="Study/2">
                <h2>社区服务</h2>
            </router-link>
            <router-link to="Visit">
                <h2>接受走访</h2>
            </router-link>
            <router-link to="Report">
                <h2>月汇报</h2>
            </router-link>
            <router-link to="Notice">
                <h2>最新公告</h2>
            </router-link>
            
        </div>
        <div class="nav">
            <ul>
                <li @click="fnHome">
                    <img src="../assets/icon/tab_home_n@2x.png" alt="">
                    <span>首页</span>
                </li>
                <li class="active" @click="fnComM">
                    <img src="../assets/icon/tab_message_s@2x.png" alt="">
                    <span>社群管理</span>
                </li>
                <li @click="fnSunTour">
                    <img src="../assets/icon/tan_sun_n@2x.png" alt="">
                    <span>向阳之旅</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Api from "../kites/api";
export default {
  name: "Community",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    //跳转到首页
    fnHome() {
      this.$router.push({ path: "/" });
    },
    //跳转到向阳之旅
    fnSunTour() {
      this.$router.push({ path: "/SunTour" });
    },
    //跳转到社群管理
    fnComM() {
      this.$router.push({ path: "/Community" });
    }
  }
};
</script>
<style scoped>
</style>


