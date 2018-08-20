<template>
    <div class="container">
        <div class="statusbar clearfix">
            <div class="w25 back" @click="fnBack()">
                <img src="../../assets/icon/back@2x.png" alt="">
                <span>返回</span>
            </div>
            <div class="w50 topcenter">
                <span>政策发布</span>
            </div>
            <div class="w25">
                <!-- <img src="../../assets/icon/back@2x.png" alt=""> -->
            </div>
        </div>
        <div class="search clearfix">
            <div class="sear_input">
                <el-input
                    size="small"
                    clearable
                    placeholder="请输入需要搜索的内容"
                    prefix-icon="el-icon-search"
                    v-model="searchs">
                </el-input>
            </div>
            <div class="btn">
                <button @click="fnSearch">搜索</button>
            </div>
            
        </div>
        <div class="switch_title">
                <ul>
                    <li v-bind:class="{ active: isActive==1 }" @click="fnSwitch(1)">
                        <span>新法速递</span>
                        <div v-bind:class="{ line: isActive==1 }"></div>
                    </li>
                    <li v-bind:class="{ active: isActive==2 }"  @click="fnSwitch(2)">
                        <span>政策发布</span>
                        <div v-bind:class="{ line: isActive==2 }"></div>
                    </li>
                    <li v-bind:class="{ active: isActive==3 }" @click="fnSwitch(3)">
                        <span>普法动态</span>
                        <div v-bind:class="{ line: isActive==3 }"></div>
                    </li>
                </ul>
            </div>
        <div class="wrap">
           
            <div class="content">
                <ul>
                    <router-link to="Details">
                    <li class="clearfix">
                        <img src="../../assets/img.png" alt="">
                        <p class="text">聚焦全国人民调解工作会议聚焦全国人民调解工作会议聚焦全国人民调解工作会议</p>
                        <p class="time">18/03/19 13:04</p>
                    </li>
                    </router-link>
                    <router-link to="Details">
                    <li class="clearfix">
                        <!-- <img src="../../assets/img.png" alt=""> -->
                        <p class="text">司法部负责同志就《全国统一法律职业资格考试实施办法条例》解说</p>
                        <p class="time">18/02/26 10:04</p>
                    </li>
                    </router-link>
                    <router-link to="Details">
                    <li class="clearfix">
                        <!-- <img src="../../assets/img.png" alt=""> -->
                        <p class="text">最高人民法院 司法部关于展开律师调解试点工作的意见</p>
                        <p class="time">18/01/04 08:00</p>
                    </li>
                    </router-link>
                    <router-link to="Details">
                    <li class="clearfix">
                        <img src="../../assets/img.png" alt="">
                        <p class="text">聚焦全国人民调解工作会议聚焦全国人民调解工作会议聚焦全国人民调解工作会议</p>
                        <p class="time">18/03/19 13:04</p>
                    </li>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Api from "../../kites/api";
export default {
  name: "Policy",
  data() {
    return {
      isActive: 1, //1.新法速递  2.政策发布  3.普法动态
      searchs: ""
    };
  },
  beforeCreate() {
			this.openIds()
		},
  mounted() {},
  methods: {
    //切换动态
    fnSwitch(type) {
      this.isActive = type;
    },
    //搜索
    fnSearch() {
      alert(this.searchs);
    },
    //返回上一页
    fnBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.wrap {
  padding-bottom: .8rem !important;
}
</style>


