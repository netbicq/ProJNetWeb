<template>
	<div class="container" v-loading="loading">
		<div class="head-img">
			<img src="../../assets/zaixian_03.png" />
		</div>
		<div class="swiper">
			<img src="../../assets/bans_03.png" alt="">
		</div>
		<div class="selects">
			<el-radio-group v-model="radio2" @change='chang'>
				<el-radio :label="1">人民调解</el-radio>
				<el-radio :label="2">法律援助</el-radio>
			</el-radio-group>
		</div>
		<div class="switch_title">
			<ul class='onapp'>
				<li v-bind:class="{ active: isActive==1 }" @click="fnSwitch(1)">
					<span>全部</span>
					<div v-bind:class="{ line: isActive==1}"></div>
				</li>
				<li v-bind:class="{ active: isActive==2 }" @click="fnSwitch(2)">
					<span>我的任务</span>
					<div v-bind:class="{ line: isActive==2 }"></div>
				</li>
			</ul>
		</div>
		<div class="listSp" style="padding-bottom: 1rem;">
			<div>
				<pull-to-refresh @on-pullup='onPullup' @on-pulldown='onPulldown' class="page">
					<ul>
						<li v-for="item in Articles" :key='item.id'>
							<router-link v-bind="{to:'/appdetails/'+(item.id)}" v-if='radio2==1'>
								<div class="clearfix"><span class="tiemes fl">{{item.creationTime | datas}}</span>
								<span class="tiemes fr" v-if='item.assignToUser'>指派给：{{item.assignToUser}}</span>
								</div>
								<div class="clearfix fivs">
									<div class="fl tips">
										<span class="ff" v-if='item.status==2'>拒绝</span>
										<span class="ll" v-if='item.status==0'>提交</span>
										<span class="ll" v-if='item.status==3'>完成</span>
										<span class="zz" v-if='item.status==1'>受理</span>
									</div>
									<div class="fl sqr">
										<p>申请人</p>
										<p>{{item.name}}</p>
									</div>
									<div class="fl sqr">
										<p>事由</p>
										<p>{{item.reason}}</p>
									</div>
								</div>
							</router-link>
							<router-link v-bind="{to:'/leAidetails/'+(item.id)}" v-else=''>
								<span class="tiemes">{{item.creationTime | datas}}</span>
								<div class="clearfix fivs">
									<div class="fl tips">
										<span class="ff" v-if='item.status==2'>拒绝</span>
										<span class="ll" v-if='item.status==0'>提交</span>
										<span class="ll" v-if='item.status==3'>完成</span>
										<span class="zz" v-if='item.status==1'>受理</span>
									</div>
									<div class="fl sqr">
										<p>申请人</p>
										<p>{{item.name}}</p>
									</div>
									<div class="fl sqr">
										<p>事由</p>
										<p>{{item.reason}}</p>
									</div>
								</div>
							</router-link>
						</li>
					</ul>
					<p class="tip" v-if="tip">到底了</p>
				</pull-to-refresh>
			</div>
		</div>
		<div class="nav">
			<ul>
				<li @click="fnHome">
					<img src="../../assets/icon/tab_home_n@2x.png" alt="">
					<span>首页</span>
				</li>
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
				<li class="active" @click="fnSunTour">
					<img src="../../assets/icon/222.png" alt="">
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
		name: 'Onapprove',
		components: {
			PullToRefresh
		},
		data() {
			return {
				tip: false,
				loading: '',
				isActive: 1,
				category: [],
				radio2: 1,
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
				isture: false,
			}
		},
		beforeCreate() {
//			this.openIds()
		},
		created() {
			this.menu = JSON.parse(localStorage.meun)
			this.authenticate()
			

		},
		methods: {
			chang() {
				this.Articles=[]
				this.totalCount = 0
				$('.scroller').css("transform","translate("+0+"px,"+0+"px)")
				if(this.radio2 == 1) {
					this.isActive = 1
					this.isture = false
					this.GetPeopleMediations()
				} else {
					this.isture = false
					this.isActive = 1
					this.GetLegalAids()
				}
			},
			//获取token
			authenticate() {
				this.loading = true
				this.$post(Api.acctoken, {
					"openId": localStorage.openID,
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						localStorage.token = res.data.result.token
						this.GetPeopleMediations()
					} else {
						console.log(1)
						this.$message.error(res.data.error.message);
					}
				})
			},
			//切换动态
			fnSwitch(type) {
				this.isActive = type;
				this.datalist=false
				$('.scroller').css("transform","translate("+0+"px,"+0+"px)")
				if(this.radio2 == 1) {
					switch(type) {
						case 1:
							this.isture = false
							this.GetPeopleMediations()
							break;
						case 2:
							this.isture = true
							this.GetPeopleMediations()
							break;
						default:
					}
				} else {
					switch(type) {
						case 1:
							this.isture = false
							this.GetLegalAids()
							break;
						case 2:
							this.isture = true
							this.GetLegalAids()
							break;
						default:
					}
				}

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
			//获取人民调解列表
			GetPeopleMediations() {
				this.tip = false
				this.pages = 4
				this.pageindex = 1
				this.totalCount = 0
				this.loading = true
				this.$post(Api.GetPeopleMediations, {
					"isMy": this.isture,
					"startDate": "",
					"endDate": "",
					"mediationType": 0,
					"status": null,
					"evaluate": 0,
					"filter": "",
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
			//获取人民援助列表
			GetLegalAids() {
				this.tip = false
				this.pages = 4
				this.pageindex = 1
				this.totalCount = 0
				this.loading = true
				this.$post(Api.GetLegalAids, {
					"isMy": this.isture,
					"startDate": "",
					"endDate": "",
					"status": null,
					"evaluate": 0,
					"filter": "",
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
			//下拉加载
			onPullup(finshCallback) {
				if(this.radio2 == 1) {
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
								this.isture = false
								this.loading = true
								this.pageindex++
									this.$post(Api.GetPeopleMediations, {
										"isMy": this.isture,
										"startDate": "",
										"endDate": "",
										"mediationType": 0,
										"status": null,
										"evaluate": 0,
										"filter": "",
										"sorting": "",
										"maxResultCount": this.pages,
										"skipCount": this.pages * (this.pageindex - 1)
									}).then(res => {
										console.log(res)
										if(res.data.success == true) {
											this.loading = false
											this.Articles = this.Articles.concat(res.data.result.items)
											this.totalCount = res.data.result.totalCount
											if(this.totalCount==0){
												this.datalist=true
											}
											finshCallback();
										} else {
											this.loading = false
											this.$message.error(res.data.error.message);
										}
									})
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
								this.isture = true
								this.loading = true
								this.pageindex++
									this.$post(Api.GetPeopleMediations, {
										"isMy": this.isture,
										"startDate": "",
										"endDate": "",
										"mediationType": 0,
										"status": null,
										"evaluate": 0,
										"filter": "",
										"sorting": "",
										"maxResultCount": this.pages,
										"skipCount": this.pages * (this.pageindex - 1)
									}).then(res => {
										console.log(res)
										if(res.data.success == true) {
											this.loading = false
											this.Articles = this.Articles.concat(res.data.result.items)
											this.totalCount = res.data.result.totalCount
											if(this.totalCount==0){
												this.datalist=true
											}
											finshCallback();
										} else {
											this.loading = false
											this.$message.error(res.data.error.message);
										}
									})
							}
							break;
						default:
					}
				} else {
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
								this.isture = false
								this.loading = true
								this.pageindex++
									this.$post(Api.GetLegalAids, {
										"isMy": this.isture,
										"startDate": "",
										"endDate": "",
										"status": null,
										"evaluate": 0,
										"filter": "",
										"sorting": "",
										"maxResultCount": this.pages,
										"skipCount": this.pages * (this.pageindex - 1)
									}).then(res => {
										console.log(res)
										if(res.data.success == true) {
											this.loading = false
											this.Articles = this.Articles.concat(res.data.result.items)
											this.totalCount = res.data.result.totalCount
											if(this.totalCount==0){
												this.datalist=true
											}
											finshCallback();
										} else {
											this.loading = false
											this.$message.error(res.data.error.message);
										}
									})
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
								this.isture = false
								this.loading = true
								this.pageindex++
									this.$post(Api.GetLegalAids, {
										"isMy": this.isture,
										"startDate": "",
										"endDate": "",
										"status": null,
										"evaluate": 0,
										"filter": "",
										"sorting": "",
										"maxResultCount": this.pages,
										"skipCount": this.pages * (this.pageindex - 1)
									}).then(res => {
										console.log(res)
										if(res.data.success == true) {
											this.loading = false
											this.Articles = this.Articles.concat(res.data.result.items)
											this.totalCount = res.data.result.totalCount
											if(this.totalCount==0){
												this.datalist=true
											}
											finshCallback();
										} else {
											this.loading = false
											this.$message.error(res.data.error.message);
										}
									})
							}
							break;
						default:
					}
				}
			},
			onPulldown(finshCallback) {
				if(this.radio2 == 1) {
					switch(this.isActive) {
						case 1:
							this.isture = false
							this.GetPeopleMediations()
							finshCallback();
							break;
						case 2:
							this.isture = true
							this.GetPeopleMediations()
							finshCallback();
							break;
						default:
					}
				} else {
					switch(this.isActive) {
						case 1:
							this.isture = false
							this.GetLegalAids()
							finshCallback();
							break;
						case 2:
							this.isture = true
							this.GetLegalAids()
							finshCallback();
							break;
						default:
					}
				}
			},
			testClick(event) {
				//				window.alert('click ' + event.target.innerHTML)
			},
		}
	}
</script>

<style>
	.listSp {
		text-align: left;
		width: 100%;
		background-color: #ffffff;
		box-sizing: border-box;
		padding-top: 0.6rem;
	}
	
	.listSp .tiemes {
		font-size: 1.1rem;
		color: #6f6d6d;
		margin-bottom: 1rem;
		display: block;
	}
	
	.listSp ul li div.fl {
		border-right: 1px solid #ececed;
		padding: 0.3rem 0.3rem;
	}
	.fivs{
		display: flex;
	}
	.listSp ul li div.fl:nth-of-type(3) {
		border-right: 0px solid #ececed;
	}
	
	.listSp .tips {
		width: 9rem;
	}
	
	.listSp .tips span {
		display: block;
		width: 5rem;
		height: 2.4rem;
		line-height: 2.4rem;
		text-align: center;
		border-radius: 2.4rem;
		color: #fff;
	}
	
	.ff {
		background: #ff4473;
	}
	
	.ll {
		background: #5495c3;
	}
	
	.zz {
		background: #34ab95;
	}
	
	.listSp ul li {
		padding: 0.9rem 2rem;
	}
	
	.listSp ul li {
		background: #f5f6fa;
		margin-bottom: 0.6rem;
	}
	
	.listSp ul li:nth-of-type(1) {
		background: #fff;
	}
	
	.listSp ul li div.fl.sqr {
		width: 8.4rem;
		text-align: center;
	}
	
	.listSp ul li div.fl.sqr p:nth-of-type(1) {
		color: #b8b8b8;
		font-size: 1rem;
	}
	
	.listSp ul li div.fl.sqr p:nth-of-type(2) {
		color: #000000;
		font-size: 1.2rem;
	}
	
	.page {
		height: 38rem;
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
	
	.selects {
		background: #fff;
		margin-top: 15px;
		padding-top: 10px;
		margin-bottom: 15px;
		padding-bottom: 10px;
	}
</style>