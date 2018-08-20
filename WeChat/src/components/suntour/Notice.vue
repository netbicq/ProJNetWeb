<template>
	<div class="container" v-loading='loading'>
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
		<div class="switch_title1" style="margin-top: 3.3rem;">
			<ul>
				<li v-bind:class="{ active: isActive==1 }" @click="fnSwitch(1)">
					<span>司法局公告</span>
					<div v-bind:class="{ line: isActive==1 }"></div>
				</li>
				<li v-bind:class="{ active: isActive==2 }" @click="fnSwitch(2)">
					<span>司法所公告</span>
					<div v-bind:class="{ line: isActive==2 }"></div>
				</li>
			</ul>
		</div>
		<div class="wrap">
			<div class="content">
				<pull-to-refresh @on-pullup='onPullup' @on-pulldown='onPulldown' class="page">
					<div>
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
					<p class="tip" v-if="tip">到底了</p>
					<p class="tip" v-if="datalist">暂无数据</p>
				</pull-to-refresh>
			</div>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	import PullToRefresh from '../pull-to-refresh'
	export default {
		name: "Notice",
		components: {
			PullToRefresh
		},
		data() {
			return {
				datalist:false,
				isActive: 1,
				news: [], //文章列表
				pages: 10,
				pageindex: 1,
				id: '',
				totalCount: 0,
				tip: false,
				loading:false
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {
			this.GetXyNotices()
		},
		methods: {
			//切换
			fnSwitch(type) {
				this.isActive = type;
				this.datalist=false
				this.tip = false
				switch(this.isActive) {
					case 1:
						this.GetXyNotices()
						break;
					case 2:
						this.GetAreaXyNotices()
						break;
					default:
				}
			},
			//返回上一页
			fnBack() {
				this.$router.go(-1);
			},
			//下拉加载
			onPullup(finshCallback) {
				switch(this.isActive) {
					case 1:
						if(this.news.length == this.totalCount) {
							this.tip = true
							finshCallback();
							return false
						} else {
							this.loading = true
							this.pageindex++
								this.$post(Api.GetXyNotices, {
									"filter": "",
									"sorting": "",
									"maxResultCount": this.pages,
									"skipCount": this.pages * (this.pageindex - 1)
								}).then(res => {
									console.log(res)
									if(res.data.success == true) {
										this.loading = false
										this.totalCount = res.data.result.totalCount
										this.news = this.news.concat(res.data.result.items)
										if(this.totalCount==0){
											this.datalist=true
										}
										finshCallback(); //finish refreshing state
									} else {
										this.loading = false
										this.$message.error(res.data.error.message);
									}
								})
							console.log('finshCallback');
						}
						break;
					case 2:
						if(this.news.length == this.totalCount) {
							this.tip = true
							finshCallback();
							return false
						} else {
							this.loading = true
							this.pageindex++
								this.$post(Api.GetAreaXyNotices, {
									"filter": "",
									"sorting": "",
									"maxResultCount": this.pages,
									"skipCount": this.pages * (this.pageindex - 1)
								}).then(res => {
									console.log(res)
									if(res.data.success == true) {
										this.loading = false
										this.totalCount = res.data.result.totalCount
										this.news = this.news.concat(res.data.result.items)
										if(this.totalCount==0){
											this.datalist=true
										}
										finshCallback(); //finish refreshing state
									} else {
										this.loading = false
										this.$message.error(res.data.error.message);
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
						this.loading = true
						this.pages = 10
						this.tip = false
						this.pageindex = 1
						this.totalCount = 0
						this.$post(Api.GetXyNotices, {
							"filter": "",
							"sorting": "",
							"maxResultCount": this.pages,
							"skipCount": this.pages * (this.pageindex - 1)
						}).then(res => {
							console.log(res)
							if(res.data.success == true) {
								this.loading = false
								this.news = res.data.result.items
								this.totalCount = res.data.result.totalCount
								if(this.totalCount==0){
									this.datalist=true
								}
								finshCallback(); //finish refreshing state
							} else {
								this.loading = false
								this.$message.error(res.data.error.message);
							}
						})

						break;
					case 2:
						this.loading = true
						this.pages = 10
						this.pageindex = 1
						this.totalCount = 0
						this.tip = false
						this.$post(Api.GetAreaXyNotices, {
							"filter": "",
							"sorting": "",
							"maxResultCount": this.pages,
							"skipCount": this.pages * (this.pageindex - 1)
						}).then(res => {
							console.log(res)
							if(res.data.success == true) {
								this.loading = false
								this.news = res.data.result.items
								this.totalCount = res.data.result.totalCount
								if(this.totalCount==0){
									this.datalist=true
								}
								finshCallback(); //finish refreshing state
							} else {
								this.loading = false
								this.$message.error(res.data.error.message);
							}
						})
						break;
					default:
				}
			},
			testClick(event) {
				//				window.alert('click ' + event.target.innerHTML)
			},
			//获取司法所列表
			GetAreaXyNotices() {
				this.loading = true
				this.pages = 10
				this.pageindex = 1
				this.totalCount = 0
				this.news = []
				this.$post(Api.GetAreaXyNotices, {
					"filter": "",
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1)
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.loading = false
						this.news = res.data.result.items
						this.totalCount = res.data.result.totalCount
						if(this.totalCount==0){
							this.datalist=true
						}
					} else if(res.data.success == false){
						this.loading = false
						this.$message.error(res.data.error.message);
					}
				})
			},
			//获取司法局列表
			GetXyNotices() {
				this.loading = true
				this.pages = 10
				this.pageindex = 1
				this.totalCount = 0
				this.news = []
				this.$post(Api.GetXyNotices, {
					"filter": "",
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1)
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.loading = false
						this.news = res.data.result.items
						this.totalCount = res.data.result.totalCount
						if(this.totalCount==0){
							this.datalist=true
						}
					} else {
						this.loading = false
						this.$message.error(res.data.error.message);
					}
				})
			}
		}
	};
</script>
<style scoped>
	.wrap {
		padding-bottom: .8rem !important;
	}
	
	.content .guide_item {
		width: 100%;
		box-sizing: border-box;
		padding: 0 .4rem;
		line-height: 3.3rem;
	}
	
	.content .guide_item p {
		display: inline-block;
		width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #726f6f;
		font-size: 1.3rem;
		text-align: left;
	}
	
	.content .guide_item span {
		display: inline-block;
		width: 30%;
		color: #b0b1b1;
		font-size: 1.2rem;
		text-align: right;
	}
	
	.page {
		height: 32rem;
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