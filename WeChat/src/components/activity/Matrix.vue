<template>
    <div class="container">
        <div class="statusbar clearfix">
            <div class="w25 back" @click="fnBack()">
                <img src="../../assets/icon/back@2x.png" alt="">
                <span>返回</span>
            </div>
            <div class="w50 topcenter">
                <span>微信矩阵</span>
            </div>
            <div class="w25">
                <!-- <img src="../../assets/icon/back@2x.png" alt=""> -->
            </div>
        </div>
        <div class="wrap" style="margin-top: 3.3rem;">
           <ul class="matrix">
           		<li>
               	   <a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwNTMwNzA0OA==&scene=126#wechat_redirect">
	                   <img src="../../assets/pufa.jpg" alt="">
	                   <span>中国普法</span>
                   </a>
               </li>
               <li>
               		<a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3ODI1NTMxMA==&scene=123#wechat_redirect">
	                   <img src="../../assets/js.jpg" alt="">
	                   <span>江苏司法行政在线</span>
                   </a>
               </li>
               <li>
               		<a href="http://wechat.jsnotary.org/sft/">
	                   <img src="../../assets/zg.jpg" alt="">
	                   <span>掌上江苏12348</span>
                   </a>
               </li>
               <li>
               		<a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3NzU2MDYzMA==&scene=126#wechat_redirect">
	                   <img src="../../assets/wuxi.jpg" alt="">
	                   <span>无锡智慧普法</span>
                   </a>
               </li>
               
               <li>
               	   <a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3NDU2NDk5NA==&scene=126#wechat_redirect">
	                   <img src="../../assets/xingfu.jpg" alt="">
	                   <span>幸福东亭</span>
                   </a>
               </li>
               <li>
               		<a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI5NzM4NjQ1Nw==&scene=126#wechat_redirect">
	                   <img src="../../assets/zg.jpg" alt="">
	                   <span>羊尖服务中心</span>
                   	</a>
               </li>
               <li>
               		<a href="http://share.chinawaytek.com/homepage/falvfuwu.html">
	                   <img src="../../assets/zg.jpg" alt="" alt="">
	                   <span>品质东港</span>
                   </a>
               </li>
               <li>
               		<a href="http://share.chinawaytek.com/homepage/farunxibei.html">
	                   <img src="../../assets/fa.jpg" alt="">
	                   <span>法润锡北</span>
                   	</a>
               </li>
               <li>
               	<a href="http://houqiao.iis1.cn/html/legalservices/">
                   <img src="../../assets/zg.jpg" alt="" alt="">
                   <span>水美厚桥</span>
                   </a>
               </li>
               <li>
               		<a href="http://yunling.iis1.cn/index.php?m=content&c=index&a=lists&catid=51&from=singlemessage">
	                   <img src="../../assets/zg.jpg" alt="" alt="">
	                   <span>云林新韵</span>
                   </a>
               </li>
               
               <li>
               		<a href="http://dongbeitang.iis1.cn/index.php?m=content&c=index&a=lists&catid=70">
	                   <img src="../../assets/zg.jpg" alt="" alt="">
	                   <span>东北塘街道</span>
                   </a>
               </li>
           </ul>
        </div>
    </div>
</template>
<script>
import Api from "../../kites/api";
export default {
  name: "Matrix",
  data() {
    return {};
  },
  beforeCreate() {
	this.openIds()
  },
  mounted() {},
  methods: {
    //返回上一页
    fnBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.wrap {
  padding-bottom: 0;
}
.matrix {
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  justify-content:initial
}
.matrix li {
  padding: .8rem;
  box-sizing: border-box;
  width: 33%;
}
.matrix li img {
  width: 80%;
}
.matrix li a{
	color: #3c3c3c;
}
.matrix li span{
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    margin-top: .8rem;
}
</style>


