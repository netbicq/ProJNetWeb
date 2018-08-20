<template>
	<div class="container" v-loading="loading">
		<div class="head-img">
			<img src="../assets/head_03.png" alt="">
		</div>
		<div class="swiper">
			<!--<el-carousel height="125px">
				<el-carousel-item v-for="item in 1" :key="item">-->
					<img src="../assets/he_03.png" alt="">
				<!--</el-carousel-item>
			</el-carousel>-->
		</div>
		<div class="menu">
			<ul>
				<router-link :to="menu[0].url+'/'+menu[0].id">
					<li>
						<img src="../assets/icon/message@2x.png" alt="">
						<span>{{menu[0].displayName}}</span>
					</li>
				</router-link>
				<router-link :to="menu[1].url+'/'+menu[1].id">
					<li>
						<img src="../assets/icon/law@2x.png" alt="">
						<span>{{menu[1].displayName}}</span>
					</li>
				</router-link>
				<router-link :to="menu[2].url+'/'+menu[2].id">
					<li>
						<img src="../assets/icon/active@2x.png" alt="">
						<span>{{menu[2].displayName}}</span>
					</li>
				</router-link>
			</ul>
		</div>
		<div class="switch_title">
			<ul>
				<li v-bind:class="{ active: isActive==index }" @click="fnSwitch(index,item.id)" v-for="(item,index) in topMenu">
					<span>{{item.displayName}}</span>
					<div v-bind:class="{ line: isActive==index }"></div>
				</li>
			</ul>
		</div>
		<div class="wrap">
			<div class="content homes">
				<pull-to-refresh @on-pullup='onPullup' @on-pulldown='onPulldown' class="page">
					<ul @click="testClick($event)">
						<router-link v-bind="{to:'/Details/'+(item.id)}" v-for='item in Articles' :key='item.id'>
							<li class="clearfix">
								<img :src="item.cover?item.cover:''" alt="">
								<p class="text">{{item.title}}</p>
								<p class="time">{{item.creationTime | datas}}</p>
							</li>
						</router-link>
					</ul>
					<p class="tip" v-if="tip">到底了</p>
					<p class="tip" v-if="datalist">暂无数据</p>
				</pull-to-refresh>
			</div>
		</div>
		<div class="nav">
			<ul>
				<li class="active" @click="fnHome">
					<img src="../assets/icon/tab_home_s@2x.png" alt="">
					<span>首页</span>
				</li>
				<li>
					<router-link :to="menu[0].url+'/'+menu[0].id">
						<img src="../assets/icon/tab_message_n@2x.png" alt="">
						<span v-if='menu[0].displayName'>{{menu[0].displayName}}</span>
						<span v-else>信息查询</span>
					</router-link>
				</li>
				<li>
					<router-link :to="menu[1].url+'/'+menu[1].id">
						<img src="../assets/icon/law_n@2x.png" alt="">
						<span v-if='menu[1].displayName'>{{menu[1].displayName}}</span>
						<span v-else="">法律服务</span>
					</router-link>
				</li>
				<li>
					<router-link :to="menu[2].url+'/'+menu[2].id">
						<img src="../assets/icon/ative_n@2x.png" alt="">
						<span v-if='menu[2].displayName'>{{menu[2].displayName}}</span>
						<span v-else="">在线活动</span>
					</router-link>
				</li>
				<li @click="fnSunTour">
					<img src="../assets/icon/111.png" alt="">
					<span>在线审批</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	var qs = require('qs');
	import Api from "../kites/api";
	import PullToRefresh from './pull-to-refresh'
	export default {
		name: "Home",
		components: {
			PullToRefresh
		},
		data() {
			return {
				datalist:false,
				tip: false,
				loading: true, //加载
				isActive: 0, //切换动态样式  1.政策发布   2.服务动态   3.信息公告
				menu: [{
						'type': "",
						'id': "",
						'name': "",
						'displayName': "",
						'icon': '',
						'url': ""
					},
					{
						'type': "",
						'id': "",
						'name': "",
						'displayName': "",
						'icon': '',
						'url': ""
					},
					{
						'type': "",
						'id': "",
						'name': "",
						'displayName': "",
						'icon': '',
						'url': ""
					}
				], //菜单
				topMenu: [], //顶级分类
				Articles: [], //文章列表
				pages: 4,
				pageindex: 1,
				id: '',
				totalCount: 0,
			};
		},
		
		mounted() {},
		beforeCreate() {
			this.openIds()

//			var test = window.location.href
//			var index = test.indexOf('=')
//			var urls = test.substring(index + 1)
//			if(test.indexOf('openID')!=-1) {
//				localStorage.openID = urls.slice(0,urls.length-2)
//				return false;
//			} else {
//				if(localStorage.openID){
//					return false;
//				}else{
//					var name = encodeURIComponent(hostName)
//					window.location.href = Api.auth + name
//				}
//			}
		},
		created() {
//			this.authenticate()
			this.GetTopMenu()
		},
		methods: {
			//获取token
			authenticate(){
				this.$post(Api.acctoken, {
					"openId": localStorage.openID,
				}).then(res => {
					console.log(res)
					if(res.data.success==true){
						localStorage.token = res.data.result.token
					}else{
						this.$message.error(res.data.error.message);
					}
				})
			},
			//获取token
			tokens() {
				var data = qs.stringify({
					'grant_type': 'password',
					'username': userName,
					'password': userPass,
					'client_id': 'app',
					'client_secret': 'app'
				})
				console.log(data)
				$.ajax({
	             type: "POST",
	             url: Api.tokens,
//	             url: "/api/oauth/token",
	             data: data,
	             contentType: "application/x-www-form-urlencoded",
	             dataType: "json",
	             success: function(datas){
	             	console.log(1)
	             	console.log(datas)
	             	localStorage.token = datas.access_token
	                         
	             },
	             error:function(datas){
	             	console.log(2)
	             	console.log(datas)
	             }
	         	});
//				var datas = qs.stringify({
//					'grant_type': 'password',
//					'username': userName,
//					'password': userPass,
//					'client_id': 'app',
//					'client_secret': 'app'
//				})
//				console.log(datas)
//				this.loading = true
//				this.$post("/api/oauth/token",
//					datas
//				).then(res => {
//					console.log(res)
//					if(res.status == 200) {
//
//					} else {
//						this.loading = false
//						this.$message.error(res.data.error);
//					}
//				})
			},
			//切换动态
			fnSwitch(type, id) {
				this.isActive = type;
				this.datalist=false
				this.GetMenuArticles(id)
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
					path: "/Onapprove"
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
			//获取顶级菜单
			GetTopMenu() {
				this.loading = true
				this.$post(Api.GetTopMenu, {
					'parentId': ''
				}).then(res => {
					if(res.data.success == true) {
						this.menu = res.data.result
						localStorage.meun = JSON.stringify(res.data.result)
						this.GetTopMostCategory()
					} else {
						this.$message.error(res.data.error.message);
					}
				})
			},
			//
			GetMenuArticles(id) {
				this.tip = false
				this.pages = 4
				this.pageindex = 1
				this.totalCount = 0
				this.loading = true
				this.id = id
				this.$post(Api.GetMenuArticles, {
					"menuId": id,
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1),
				}).then(res => {
					if(res.data.success == true) {
						this.loading = false
						this.totalCount = res.data.result.totalCount
						this.Articles = res.data.result.items
						if(this.totalCount==0){
							this.datalist=true
						}
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
			//获取首页置顶文章分类
			GetTopMostCategory() {
				this.$post(Api.GetTopMostCategory).then(res => {
					if(res.data.success == true) {
						this.topMenu = res.data.result
						this.GetMenuArticles(this.topMenu[0].id)
					} else {
						this.$message.error(res.data.error);
					}
				})
			},
			//下拉加载
			onPullup(finshCallback) {
				if(this.totalCount==0){
					this.tip = false
					finshCallback();
					return false
				}
				if(this.Articles.length == this.totalCount) {
					this.tip = true
					finshCallback();
					return false
				} else {
					this.loading = true
					this.pageindex++
						this.$post(Api.GetMenuArticles, {
							"menuId": this.id,
							"sorting": "",
							"maxResultCount": this.pages,
							"skipCount": this.pages * (this.pageindex - 1),
						}).then(res => {
							if(res.data.success == true) {
								this.loading = false
								this.totalCount = res.data.result.totalCount
								this.Articles = this.Articles.concat(res.data.result.items)
								if(this.totalCount==0){
									this.datalist=true
								}
								finshCallback(); //finish refreshing state
							} else {
								this.loading = false
								this.$message.error(res.data.error);
							}
						})
					console.log('finshCallback');
				}
			},

			onPulldown(finshCallback) {
				console.log('onPulldown');
				this.tip = false
				this.loading = true
				this.pages = 4
				this.pageindex = 1
				this.$post(Api.GetMenuArticles, {
					"menuId": this.id,
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1),
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.loading = false
						this.totalCount = res.data.result.totalCount
						this.Articles = res.data.result.items
						if(this.totalCount==0){
							this.datalist=true
						}
						finshCallback()
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
			testClick(event) {
//				window.alert('click ' + event.target.innerHTML)
			}
		}
	};
</script>
<style scoped>
	.page {
		height: 28rem;
		position: relative;
		/* Prevent native touch events on Windows */
		-ms-touch-action: none;
		/* Prevent the callout on tap-hold and text selection */
		-webkit-touch-callout: none;
		user-select: none;
		text-size-adjust: none;
	}
	/*scrollbar start*/
	
	.iScrollVerticalScrollbar {
		position: absolute;
		z-index: 9999;
		width: 2px;
		bottom: 2px;
		top: 2px;
		right: 2px;
		overflow: hidden;
	}
	
	.iScrollVerticalScrollbar.iScrollBothScrollbars {
		bottom: 18px;
	}
	
	.iScrollIndicator {
		position: absolute;
		background: #999;
		border-radius: 6px;
		opacity: .8;
	}
	
	.iScrollVerticalScrollbar .iScrollIndicator {
		width: 100%;
		background: #999;
	}
	
	.tip {
		line-height: 30px;
		background: #f1f1f1;
		text-align: center;
		margin-top: 15px;
	}
</style>