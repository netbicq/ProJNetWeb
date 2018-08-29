<template>
	<div class="container online" v-loading="loading">
		<div class="marks">
		<div class="head-img">
			<img src="../../assets/online_03.png" />
		</div>
		<div class="wrap1">
			<ul class="clearfix">
				<li v-for='item in infoMenu'>
					<router-link v-if='item.type==2' v-bind="{to:item.url}"  :key='item.id'>
						<div class="img">
							<img :src="item.icon" alt="">
						</div>
						<div class="words">
							<p>{{item.displayName}}</p>
							<span>{{item.subTitle}}</span>
						</div>
						
					</router-link>
					<a v-else :href='item.url'  :key='item.id'>
						<div class="img">
							<img :src="item.icon" alt="">
						</div>
						<div class="words">
							<p>{{item.displayName}}</p>
							<span>{{item.subTitle}}</span>
						</div>
						
					</a>
				</li>
				<!--<router-link to="Survey">
					<li class="fl clearfix">
						<div class="fl words">
							<p>需求调研</p>
							<span>法律问题调研</span>
						</div>
						<div class="fr img">
							<img src="../../assets/icon/o1.png" alt="">
						</div>
					</li>
				</router-link>
				<router-link to="OnlineActivity">
					<li class="fr clearfix">
						<div class="fl words">
							<p>普法活动</p>
							<span>普及法律知识</span>
						</div>
						<div class="fr img">
							<img src="../../assets/icon/o2.png" alt="">
						</div>
					</li>
				</router-link>
				<router-link to="OnlineActivity">
					<li class="fl clearfix">
						<div class="fl words">
							<p>在线学习</p>
							<span>学习法律知识</span>
						</div>
						<div class="fr img">
							<img src="../../assets/icon/o3.png" alt="">
						</div>
					</li>
				</router-link>
				<router-link to="Matrix">
					<li class="fr clearfix">
						<div class="fl words">
							<p>微信矩阵</p>
							<span>网罗法律焦点</span>
						</div>
						<div class="fr img">
							<img src="../../assets/icon/o4.png" alt="">
						</div>
					</li>
				</router-link>
				<router-link to="Complaint">
					<li class="fl clearfix">
						<div class="fl words">
							<p>投诉建议</p>
							<span>如有问题及时反馈</span>
						</div>
						<div class="fr img">
							<img src="../../assets/icon/o5.png" alt="">
						</div>
					</li>
				</router-link>-->
			</ul>
		</div>
		<div class="nav">
			<navs></navs>
		</div>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	import navs from '../nav'
	export default {
		name: "OnlineActivity",
		components: {
			navs
		},
		data() {
			return {
				infoMenu:[],
				loading:false,
				id:'',
			};
		},
		beforeCreate() {
			this.openIds()
		},
		created() {
			this.id = this.$route.params.id
			this.infoSubnav()
		},
		methods: {
			//跳转到首页
			fnHome() {
				this.$router.push({
					path: "/"
				});
			},
			//跳转到向阳之旅
			fnSunTour() {
				this.$router.push({
					path: "/SunTour"
				});
			},
			//跳转到社群管理
			fnComM() {
				this.$router.push({
					path: "/Community"
				});
			},
			//信息查询
			fnInfoQuery() {
				this.$router.push({
					path: "/InfoQuery"
				});
			},
			//法律服务
			fnLegalService() {
				this.$router.push({
					path: "/LegalService"
				});
			},
			//在线活动
			fnOnlineActivity() {
				this.$router.push({
					path: "/OnlineActivity"
				});
			},
			//获取信息查询下的子菜单
			infoSubnav() {
				this.loading = true
				this.$post(Api.GetTopMenu, {
					'parentId': this.id
				}).then(res => {
					if(res.status == 200) {
						this.loading = false
						this.infoMenu = res.data.result
					} else {
						this.loading = false
						this.$message.error(res.msg);
					}
				})
			},
		}
	};
</script>
<style scoped>
	.wrap1 ul {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.wrap1 ul li {
		display: inline-block;
		width: 47%;
		margin-top: 0.8rem;
		padding: 1.2rem;
		box-sizing: border-box;
		background-color: #ffffff;
		box-shadow: 0px 0px 7px #c5cad3;
		border-radius: 5px;
		margin-left: 2%;
	}
	.wrap1 ul li:nth-of-type(2n){
		margin-left: 0;
		margin-right: 2%;
	}
	.wrap1 ul li .words {
		width: 100%;
		margin-top: 1.2rem;
	}
	
	.wrap1 ul li .words p {
		width: 100%;
		color: #333333;
		font-size: 1.3rem;
	}
	
	.wrap1 ul li .words span {
		display: inline-block;
		width: 100%;
		font-size: 1rem;
		color: #808080;
		margin-top: 0.3rem;
	}
	
	.wrap1 ul li .img {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.wrap1 ul li .img img {
		width: 40%;
		vertical-align: middle;
	}
	
	.wrap1 a {
		color: #808080;
		/*display: inline-block;
		width: 49%;
		margin-top: 0.4rem;*/
	}
	.online{
		position: fixed;
	    height: 100%;
	    width: 100%;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    background: url(/static/img/bj3_03.3dc39e6.png) no-repeat left center;
	    background-size: 100% 100%;
    /* background-position: 0 -19.8rem; */
	}
	.marks{
	    position: absolute;
	    left: 0;
	    right: 0;
	    top: 0;
	    bottom: 0;
	    height: 100%;
		width: 100%;
	    text-align: center;
	    background:rgba(255,255,255,0.3);
	}
</style>