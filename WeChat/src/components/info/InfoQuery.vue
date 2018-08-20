<template>
	<div class="container infoBox" v-loading="loading">
		<div class="marks">
		<div class="head-img">
			<img src="../../assets/xinxi_03.png" alt=""/>
		</div>
		<!--<div class="swiper">
			<img src="../../assets/banner1.png" alt="">
		</div>-->
		<div class="wrap1" style="margin-bottom: 5.6rem;">
			
			<ul class="clearfix">
				<li v-for='item in infoMenu'>
					<router-link v-bind="{to:item.url+'/'+(item.id)}"  :key='item.id'>
						<div class="img">
							<img :src="item.icon" alt="">
						</div>
						<div class="words">
							<p>{{item.displayName}}</p>
							<span>{{item.subTitle}}</span>
						</div>
						
					</router-link>
					<!--<router-link v-else v-bind="{to:'/Notarization/'+(item.id)}"  :key='item.id'>
						<div class="fl words">
							<p>{{item.displayName}}</p>
							<span>{{item.subTitle}}</span>
						</div>
						<div class="fr img">
							<img :src="item.icon" alt="">
						</div>
					</router-link>-->
				</li>
			</ul>
			
			
			<!--<ul>
				<li v-for='item in infoMenu' @click='lutou(item.displayName)' :key='item.id' >
					<router-link v-bind="{to:item.url+'/'+(item.id)}"  >
						<img :src="item.icon" alt="">
						<span>{{item.displayName}}</span>
					</router-link>
				</li>
			</ul>-->
			
		</div>
		<!--<div class="search clearfix">
			<div class="sear_input">
				<el-input size="small" clearable placeholder="请输入需要搜索的内容" prefix-icon="el-icon-search" v-model="searchs">
				</el-input>
			</div>
			<div class="btn">
				<button @click="fnSearch">搜索</button>
			</div>

		</div>
		<div class="wrap">
			<div class="content homes">
				<div class="title">
					<span class="title-dy">最新动态</span>
				</div>
				<ul>
					<router-link v-bind="{to:'/Details/'+(item.id)}" v-for='item in Articles' :key='item.id'>
							<li class="clearfix">
								<img :src="item.cover" alt="">
								<p class="text">{{item.title}}</p>
								<p class="time">{{item.creationTime | datas}}</p>
							</li>
					</router-link>
				</ul>
			</div>
		</div>-->
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
		name: "InfoQuery",
		components: {
			navs
		},
		data() {
			return {
				loading: true,
				searchs: "",
				id: '', //接收id
				infoMenu: [], //信息查询子菜单
				Articles:[]
			};
		},
		mounted() {},
		beforeCreate() {
			this.openIds()
		},
		created() {
			this.id = this.$route.params.id
			this.infoSubnav()
			
		},
		methods: {
			lutou(names){
				localStorage.names = names
//				console.log(names)
			},
			//搜索
			fnSearch() {
				this.loading = true
				this.$post(Api.GetTopMostArticles, {
				    "title": this.searchs,
				    "author": "",
				    "categoryId": 0,
				    "categoryName": "",
				    "description": "",
				    "friendlyUrl": "",
				    "readCount": 0,
				    "creationTime": "",
				    "id": 0
				}).then(res => {
					console.log(res)
					if(res.status == 200) {
						this.loading = false
						this.Articles = res.data.result
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
			//返回上一页
			fnBack() {
				this.$router.go(-1);
			},
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
						this.infoMenu = res.data.result
						this.GetTopMostArticles()
					} else {
						this.loading = false
						this.$message.error(res.msg);
					}
				})
			},
			//获取信息查询的文章列表
			GetTopMostArticles(){
				this.$post(Api.GetTopMostArticles, {
				    "title": "",
				    "author": "",
				    "categoryId": 0,
				    "categoryName": "",
				    "description": "",
				    "friendlyUrl": "",
				    "readCount": 0,
				    "creationTime": "",
				    "id": 0
				}).then(res => {
					console.log(res)
					if(res.status == 200) {
						this.loading = false
						this.Articles = res.data.result
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
	.title-dy {
		width: 100%;
		font-size: 1.3rem;
		font-weight: 600;
		display: inline-block;
		text-align: left;
		color: #38589f;
		padding: .8rem 0;
	}
	
	.wrap1 ul {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.wrap1 ul li {
		display: inline-block;
		width: 43%;
		margin-top: 0.8rem;
		padding: 1rem;
		box-sizing: border-box;
		background-color: #ffffff;
		box-shadow: 0px 0px 7px #c5cad3;
		border-radius: 5px;
		margin-left: 4.5%;
		/*padding-bottom: 0.2rem;*/
	}
	.wrap1 ul li:nth-of-type(2n){
		margin-left: 0;
		margin-right: 4.5%;
	}
	.wrap1 ul li .words {
		width: 100%;
		display: inline-block;
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
		font-size: 1.25rem;
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
	.infoBox{
		position: fixed;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		background: url(../../assets/bj1_03.png) no-repeat left center;
		background-size: 100% 100%;
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
	    background:rgba(255,255,255,0.5);
	}
</style>