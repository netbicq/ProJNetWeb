<template>
	<div class="container" v-loading='loading'>
		<div class="head-img">
			<img src="../../assets/111111.png" />
		</div>
		<div class="dynamic">
			<div class="title clearfix">
				<span class="fl" style="font-weight:600;">最新公告</span>
				<span class="fr" @click="fnMore()">更多<i></i></span>
			</div>
			<div class="list">
				<router-link v-bind="{to:'/NoticeDetails/'+(item.id)}" v-for='item in news' :key='item.id'>
					<div class="guide_item clearfix">
						<p class="fl">
							{{item.title}}
						</p>
						<span class="fr">
                        {{item.creationTime | yy}}
                    </span>
					</div>
				</router-link>
			</div>
		</div>
		<div class="switch_title">
			<ul>
				<li v-bind:class="{ active: isActive==1 }" @click="fnSwitch(1)">
					<span>教育学习</span>
					<div v-bind:class="{ line: isActive==1 }"></div>
				</li>
				<li v-bind:class="{ active: isActive==2 }" @click="fnSwitch(2)">
					<span>社区服务</span>
					<div v-bind:class="{ line: isActive==2 }"></div>
				</li>
				<li v-bind:class="{ active: isActive==3 }" @click="fnSwitch(3)">
					<span>接受走访</span>
					<div v-bind:class="{ line: isActive==3 }"></div>
				</li>
				<li v-bind:class="{ active: isActive==4 }" @click="fnSwitch(4)">
					<span>周月汇报</span>
					<div v-bind:class="{ line: isActive==4 }"></div>
				</li>
			</ul>
		</div>
		<div class="wrap" style="padding-bottom: 1.2rem;">
			<div class="btn">
				<button @click="fnStudy(1)" v-show="isActive==1">汇报 教育学习</button>
				<button @click="fnStudy(2)" v-show="isActive==2">汇报 社区服务</button>
				<button @click="fnStudy(3)" v-show="isActive==3">汇报 接受走访</button>
				<button @click="fnStudy(4)" v-show="isActive==4">汇报 周月汇报</button>
			</div>
		</div>
		<div class="wrap picBoxs">
			
			<div class="content homes">
				<pull-to-refresh @on-pullup='onPullup' @on-pulldown='onPulldown' class="page">
					<ul>
						<li v-for="item in Articles" :key='item.id'>
							<div v-if="isActive==4" class="clearfix">
								<p class="text">{{item.type==1?'周报':'月报'}}</p>
								<p class="text1">{{item.reportingDate | yy}}</p>
							</div>
							<div v-else-if="isActive==3" class="clearfix">
								<!--<img :src="item.photo" alt="">-->
								<router-link v-bind="{to:'/VisitDetail/'+(item.id)}">
									<p class="text">{{item.visitTime | yy}}</p>
									<p class="text1">{{item.visitAddress}}</p>
								</router-link>
							</div>
							<div v-else-if="isActive==2" class="clearfix">
								<router-link v-bind="{to:'/severDetail/'+(item.id)}">
								<img :src="item.photo" alt="">
								<p class="text">{{item.creationTime | yy}}</p>
								<p class="text1">{{item.content}}</p>
								</router-link>
							</div>
							<div v-else="" class="clearfix">
								<router-link v-bind="{to:'/StudyDetail/'+(item.id)}">
								<img :src="item.photo?item.photo:''" alt="">
								<p class="text">{{item.creationTime | yy}}</p>
								<p class="text1">{{item.content}}</p>
								</router-link>
							</div>
						</li>
					</ul>
					<p class="tip" v-if="tip">到底了</p>
					<p class="tip" v-if="datalist">暂无数据</p>
				</pull-to-refresh>
			</div>
			
		</div>
		<div class="nav">
			<ul>
				<li @click="fnHome">
					<img src="../../assets/icon/tab_home_n@2x.png" alt="">
					<span>首页</span>
				</li>
				<!-- <li @click="fnComM">
                    <img src="../assets/icon/tab_message_n@2x.png" alt="">
                    <span>社群管理</span>
                </li> -->
				<li>
					<router-link :to="menu[0].url+'/'+menu[0].id">
						<img src="../../assets/icon/tab_message_n@2x.png" alt="">
						<span>{{menu[0].displayName}}</span>
					</router-link>
				</li>
				<li>
					<router-link :to="menu[1].url+'/'+menu[1].id">
						<img src="../../assets/icon/law_n@2x.png" alt="">
						<span>{{menu[1].displayName}}</span>
					</router-link>
				</li>
				<li>
					<router-link :to="menu[2].url+'/'+menu[2].id">
						<img src="../../assets/icon/ative_n@2x.png" alt="">
						<span>{{menu[2].displayName}}</span>
					</router-link>
				</li>
				<!--<li @click="fnInfoQuery">
					<img src="../assets/icon/tab_message_n@2x.png" alt="">
					<span>信息查询</span>
				</li>
				<li @click="fnLegalService">
					<img src="../assets/icon/law_n@2x.png" alt="">
					<span>法律服务</span>
				</li>
				<li @click="fnOnlineActivity">
					<img src="../assets/icon/ative_n@2x.png" alt="">
					<span>在线活动</span>
				</li>-->
				<li @click="fnSunTour">
					<img src="../../assets/icon/111.png" alt="">
					<span>在线审批</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	import PullToRefresh from '../pull-to-refresh'
	export default {
		name: "SunTour",
		components: {
			PullToRefresh
		},
		data() {
			return {
				datalist:false,
				tip: false,
				loading: false,
				isActive: 1, //切换动态样式  1.教育学习   2.社区服务   3.接受走访 4.周月回报
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
				Articles: [], //文章列表
				pages: 4,
				pageindex: 1,
				id: '',
				totalCount: 0,
				news:[],//最新公告
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {

		},
		created() {
			this.authenticate()
			this.menu = JSON.parse(localStorage.meun)
		},
		methods: {
			//获取token
			authenticate(){
				this.loading = true
				this.$post(Api.acctoken, {
					"openId": localStorage.openID,
				}).then(res => {
					console.log(res)
					if(res.data.success==true){
						localStorage.token = res.data.result.token
						this.GetStudyRecordSimpleList()
						this.GetXyNotices()
					}else{
						console.log(window.location)
						this.$message.error(res.data.error.message);
					}
				})
			},
			//切换动态
			fnSwitch(type) {
				this.isActive = type;
				this.datalist=false
				switch(type) {
					case 1:
						this.GetStudyRecordSimpleList()
						break;
					case 2:
						this.GetServiceRecordSimpleList()
						break;
					case 3:
						this.GetVisitRecordSimpleList()
						break;
					case 4:
						this.GetReportingSimpleList()
						break;
					default:
				}
			},
			//更多
			fnMore() {
				this.$router.push({
					path: "/Notice"
				});
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
			fnStudy(type) {
				switch(type) {
					case 1:
						this.$router.push({
							path: "/Study/" + type
						});
						break;
					case 2:
						this.$router.push({
							path: "/Study/" + type
						});
						break;
					case 3:
						this.$router.push({
							path: "/Visit"
						});
						break;
					case 4:
						this.$router.push({
							path: "/Report"
						});
						break;
					default:
				}
			},
			//查看教育学习记录
			GetStudyRecordSimpleList() {
				this.tip = false
				this.pages = 4
				this.pageindex = 1
				this.totalCount = 0
				this.loading = true
				this.Articles = []
				this.$post(Api.GetStudyRecordSimpleList, {
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1)
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.loading = false
						this.Articles = res.data.result.items
						this.totalCount = res.data.result.totalCount
						if(this.totalCount==0){
							this.datalist=true
						}
					} else {
						this.loading = false
						this.$message.error(res.data.error.message);
					}
				})
			},
			//查看本人提交的社区服务记录
			GetServiceRecordSimpleList() {
				this.tip = false
				this.pages = 4
				this.pageindex = 1
				this.totalCount = 0
				this.loading = true
				this.Articles = []
				this.$post(Api.GetServiceRecordSimpleList, {
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1)
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.loading = false
						this.Articles = res.data.result.items
						this.totalCount = res.data.result.totalCount
						if(this.totalCount==0){
							this.datalist=true
						}
					} else {
						this.loading = false
					}
				})
			},
			//查看本人提交的社区服务记录
			GetVisitRecordSimpleList() {
				this.tip = false
				this.pages = 4
				this.pageindex = 1
				this.totalCount = 0
				this.loading = true
				this.Articles = []
				this.$post(Api.GetVisitRecordSimpleList, {
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1)
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.loading = false
						this.Articles = res.data.result.items
						this.totalCount = res.data.result.totalCount
						if(this.totalCount==0){
							this.datalist=true
						}
					} else {
						this.loading = false
					}
				})
			},
			//查看本人提交的报告记录（向阳之旅）
			GetReportingSimpleList() {
				this.tip = false
				this.pages = 4
				this.pageindex = 1
				this.totalCount = 0
				this.loading = true
				this.Articles = []
				this.$post(Api.GetReportingSimpleList, {
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1)
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.loading = false
						this.Articles = res.data.result.items
						this.totalCount = res.data.result.totalCount
						if(this.totalCount==0){
							this.datalist=true
						}
					} else {
						this.loading = false
					}
				})
			},
			//下拉加载
			onPullup(finshCallback) {
				switch(this.isActive) {
					case 1:
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
								this.$post(Api.GetStudyRecordSimpleList, {
									"sorting": "",
									"maxResultCount": this.pages,
									"skipCount": this.pages * (this.pageindex - 1)
								}).then(res => {
									console.log(res)
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
						break;
					case 2:
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
								this.$post(Api.GetServiceRecordSimpleList, {
									"sorting": "",
									"maxResultCount": this.pages,
									"skipCount": this.pages * (this.pageindex - 1)
								}).then(res => {
									console.log(res)
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
						break;
					case 3:
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
								this.$post(Api.GetVisitRecordSimpleList, {
									"sorting": "",
									"maxResultCount": this.pages,
									"skipCount": this.pages * (this.pageindex - 1)
								}).then(res => {
									console.log(res)
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
						break;
					case 4:
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
								this.$post(Api.GetReportingSimpleList, {
									"sorting": "",
									"maxResultCount": this.pages,
									"skipCount": this.pages * (this.pageindex - 1)
								}).then(res => {
									console.log(res)
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
						break;
					default:
				}
			},

			onPulldown(finshCallback) {
				console.log('onPulldown');
				switch(this.isActive) {
					case 1:
						this.GetStudyRecordSimpleList()
						finshCallback();
						break;
					case 2:
						this.GetServiceRecordSimpleList()
						finshCallback();
						break;
					case 3:
						this.GetVisitRecordSimpleList()
						finshCallback();
						break;
					case 4:
						this.GetReportingSimpleList()
						finshCallback();
						break;
					default:
				}
			},
			testClick(event) {
				//				window.alert('click ' + event.target.innerHTML)
			},
			//获取最新公告
			GetXyNotices(){
				this.loading = true
				this.$post(Api.GetXyNotices,{
				  "filter": "",
				  "sorting": "",
				  "maxResultCount": 5,
				  "skipCount": 0
				}).then(res=>{
					if(res.data.success == true) {
						this.loading = false
						this.news = res.data.result.items
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			}
		}
	};
</script>
<style scoped>
	.dynamic {
		width: 100%;
		padding: .8rem 1.6rem;
		box-sizing: border-box;
		background-color: #fff;
		margin-bottom: .4rem;
	}
	
	.dynamic .title {
		padding: .4rem 0;
	}
	
	.dynamic .title span {
		color: #38589f;
		font-size: 1.3rem;
	}
	
	.dynamic .title span i {
		display: inline-block;
		font-style: normal;
		width: .6rem;
		height: .6rem;
		border-width: 2px;
		border-style: solid;
		border-color: #38589f #38589f transparent transparent;
		transform: rotate(45deg);
	}
	
	.wrap .title ul {
		justify-content: space-between !important;
	}
	
	.list .guide_item {
		width: 100%;
		box-sizing: border-box;
		line-height: 3.3rem;
	}
	
	.list .guide_item p {
		display: inline-block;
		width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #726f6f;
		font-size: 1.3rem;
		text-align: left;
	}
	
	.list .guide_item span {
		display: inline-block;
		width: 30%;
		color: #b0b1b1;
		font-size: 1.2rem;
		text-align: right;
	}
	
	.wrap .btn {
		margin-top: .8rem;
		margin-bottom: .8rem;
	}
	
	.wrap .btn button {
		width: 75%;
		outline: none;
		border: none;
		color: #fff;
		border-radius: .4rem;
		padding: .8rem 0;
		background-color: #38589f;
	}
	
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