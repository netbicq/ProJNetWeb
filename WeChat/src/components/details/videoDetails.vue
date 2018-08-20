<template>
    <div class="container">
        <div class="statusbar clearfix">
            <div class="w25 back" @click="fnBack()">
                <img src="../../assets/icon/back@2x.png" alt="">
                <span>返回</span>
            </div>
            <div class="w50 topcenter">
                <span>详情</span>
            </div>
            <div class="w25">
                <!-- <img src="../../assets/icon/back@2x.png" alt=""> -->
            </div>
        </div>
        <div class="wrap" style="margin-top: 3.3rem;">
            <div class="banner video"v-html="artic.content">
                <!-- <img src="../../assets/banner3.png" alt=""> -->
                <!--<video controls="controls" preload="auto" poster="../../assets/banner3.png">
                    <source :src="artic.friendlyUrl" type="video/mp4">
                </video>-->
            </div>
            <div class="content">
                <div class="title">
                    <p>{{artic.title}}</p>
                    <span>{{artic.creationTime|datas}}</span>
                </div>
                <div class="con">
                    <p>{{artic.description}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Api from "../../kites/api";
export default {
  name: "videoDetails",
  data() {
    return {
    	artic:{
    		
    	},
    };
  },
  beforeCreate() {
	this.openIds()
},
  mounted() {
  		this.id = this.$route.params.id
  		this.GetArticle()
  },
  methods: {
    //返回上一页
    fnBack() {
      this.$router.go(-1);
    },
    GetArticle(){
    	this.loading = true
		this.$post(Api.GetArticle, {
			"id":this.id
		}).then(res => {
			console.log(res)
			if(res.status == 200) {
				this.loading = false
				this.artic = res.data.result
			} else {
				this.loading = false
				this.$message.error(res.data.error);
			}
		})
    },
  }
};
</script>
<style scoped>
.wrap {
  padding-bottom: .8rem !important;
}
.wrap .content{
  padding: .8rem 1.6rem;
}
.wrap .title {
  width: 100%;
  box-sizing: border-box;
  text-align: left;
}
.wrap .title p {
  width: 100%;
  display: inline-block;
  color: #000;
  font-size: 1.6rem;
  margin-top: .8rem;
}
.wrap .title span {
  display: inline-block;
  color: #b0b1b1;
  font-size: 1.3rem;
  margin-top: .8rem;
}
.wrap .banner {
  width: 100%;
  margin-top: .8rem;
}
.wrap .banner img {
  width: 100%;
}
.wrap .con {
  width: 100%;
  padding: 1.25rem 0;
}
.wrap .con p {
  width: 100%;
  text-align: left;
  font-size: 1.3rem;
  color: #333;
  text-indent: 2em;
}


</style>


