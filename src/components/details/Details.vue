<template>
    <div class="container" v-loading="loading">
        <div class="statusbar clearfix">
            <div class="w25 back" @click="fnBack()">
                <img src="../../assets/icon/back@2x.png" alt="">
                <span>返回</span>
            </div>
            <div class="w50 topcenter">
                <span>详情</span>
            </div>
            <div class="w25">
                <!--<img src="../../assets/icon/share@2x.png" alt="">-->
            </div>
        </div>
        <div class="wrap" style="margin-top: 3.3rem;">
            <div class="content">
                <div class="title">
                <h1>{{artic.title}}</h1>
                <span>{{artic.creationTime | datas}}</span>
            </div>
            <div class="banner">
                <!-- <img src="../../assets/banner3.png" alt=""> -->
                <!--<video controls="controls" preload="auto" poster="../../assets/banner3.png">
                    <source src="../../assets/nigg2.mp4" type="video/mp4">
                </video>-->
                <img :src="artic.cover" alt="" />
            </div>
            
            <div class="con">
            	<p v-html='artic.content'></p>
                <!--<p>
                    新华社北京5月7日电，近日，中共中央印发《社会主义核心价值观融入法治建设立法修法规划》（以下简称《规划》），并发出通知，要求各地区各部门结合实际认证贯彻落实。
                </p>
                <p>
                    《规划》强调，要以习近平新时代中国特色社会主义思想为指导，坚持全面依法治国，坚持社会主义核心价值体系，着力把社会主义核心价值观融入法律法规的立改废释全过程，确保各项立法导向更加鲜明、要求更加明确、措施更加有力，
                    力争经过5到10年时间，推动社会主义核心价值观全面融入中国特色社会主义法律体系，
                </p>-->
            </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import Api from "../../kites/api";
export default {
  name: "Detail",
  data() {
    return {
    	id:'',
    	loading:true,
    	artic:{},
    };
  },
  beforeCreate() {
	this.openIds()
  },
  mounted() {},
  created(){
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
  padding-bottom: 0 !important;
}
.wrap .content {
  padding-bottom: 0 !important;
}
.wrap .title {
  width: 100%;
  box-sizing: border-box;
  padding: 0 1.25rem;
  text-align: left;
}

.wrap .title span {
  display: inline-block;
  color: #b0b1b1;
  font-size: 1.25rem;
  margin-top: 1.25rem;
}
.wrap .banner {
  width: 100%;
  margin-top: 1.6rem;
}
.wrap .banner img {
  width: 100%;
}
.wrap .con {
  width: 100%;
  padding: 1.25rem .4rem;
  text-align: left;
  padding-top: 0;
}
.wrap .con p {
  width: 100%;
  text-align: left;
  font-size: 1.5rem;
  color: #646161;
  text-indent: 2em;
}
.wrap video {
  width: 100%;
  height: 16rem;
}
</style>


