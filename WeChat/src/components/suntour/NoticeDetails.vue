<template>
    <div class="container" v-loading = 'loading'>
        <div class="statusbar clearfix">
            <div class="w25 back" @click="fnBack()">
                <img src="../../assets/icon/back@2x.png" alt="">
                <span>返回</span>
            </div>
            <div class="w50 topcenter">
                <span>最新公告</span>
            </div>
            <div class="w25">
            </div>
        </div>
        <div class="wrap">
            <div class="content">
                <div class="title">
                    <h1>{{ntails.title}}</h1>
                    <span>{{ntails.creationTime | yy}}</span>
                </div>
                <div class="banner">
                    <!-- <img src="../../assets/banner3.png" alt=""> -->
                </div>
                <div class="con">
                    <p>{{ntails.content}}</p>
                </div>
            </div>
        </div>
        <div class="con1" v-for="item in ntails.answers">
        	<div class="clearfix tops">
        		<span class="fl">{{item.name}}</span>
        		<span class="fr">{{item.creationTime | yy}}</span>
        	</div>
        	<div class="comment">
        		{{item.answer}}
        	</div>
        </div>
    </div>
</template>
<script>
import Api from "../../kites/api";
export default {
  name: "NoticeDetails",
  data() {
    return {
    	loading:true,
    	id:'',
    	ntails:{},
    };
  },
  beforeCreate() {
			this.openIds()
		},
  mounted() {},
  created(){
  	this.id = this.$route.params.id
  	this.GetOnlineQuestion()
  },
  methods: {
    //返回上一页
    fnBack() {
      this.$router.go(-1);
    },
    //获取详情
    GetOnlineQuestion(){
    	this.loading = true
    	this.$post(Api.GetXyNotice,{
		  "id": this.id
		}).then(res=>{
			if(res.data.success== true){
				this.loading = false
				this.ntails = res.data.result
			}else{
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
.wrap .title {
  width: 100%;
  box-sizing: border-box;
  padding: 0 1.25rem;
  text-align: left;
  
}
.wrap .title h1{
	font-weight: 400;
}
.wrap .title span {
  display: inline-block;
  color: #b0b1b1;
  font-size: 1rem;
  margin-top: 0.5rem;
}
.wrap .title span em{
	font-size: 1.25rem;
	color: #3c5a9f;
	font-style: normal;
}
.wrap .title span:nth-of-type(2){
	margin:  0 1rem;
}
.wrap .banner {
  width: 100%;
  /* margin-top: 1.6rem; */
}
.wrap .banner img {
  width: 100%;
}
.wrap .con {
  width: 100%;
  padding: 1.25rem .4rem;
}
.wrap .con p {
  width: 100%;
  text-align: left;
  font-size: 1.25rem;
  color: #646161;
  text-indent: 2em;
}
.con1{
	background: #fff;
	padding: 0 2.05rem;
	box-sizing: border-box;
}
.con1 .tops{
	line-height: 3.5rem;
	color: #b0b1b1;
}
.con1 .tops span:nth-of-type(1){
	font-size: 1.5rem;
	color: #b0b1b1;
	font-family: "微软雅黑";
}
.con1 .comment{
	text-align: left;
	padding-bottom: 0.8rem;
	color: #b0b1b1;
	text-indent: 2rem;
	line-height: 1.5rem;
}
</style>


