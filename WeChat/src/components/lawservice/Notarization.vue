<template>
	<div class="container" v-loading="loading">
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>{{titles}}</span>
			</div>
			<div class="w25">
				<!-- <img src="../../assets/icon/back@2x.png" alt=""> -->
			</div>
		</div>
		<div class="switch_title" style="margin-top: 3.3rem;">
			<ul class="btns">
				<li v-bind:class="{ active: isActive==index }" @click="fnSwitch(index,item.id,item.type)" v-for="(item,index) in threeNav">
					<div v-if='item.type==2'>
						<a :href=item.url>
							<span>{{item.displayName}}</span>
							<div v-bind:class="{ line: isActive==index }"></div>
						</a>
					</div>
					<div v-else>
						<span>{{item.displayName}}</span>
						<div v-bind:class="{ line: isActive==index }"></div>
					</div>
				</li>
			</ul>
		</div>
		<div class="wrap">
			<div class="content">
				<pull-to-refresh @on-pullup='onPullup' @on-pulldown='onPulldown' class="page">
					<ul>
						<router-link v-bind="{to:'/Details/'+(item.id)}" v-for='item in Articles' :key='item.id'>
							<li class="clearfix">
								<img src="../../assets/img.png" alt="">
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
	</div>
</template>
<script>
	import Api from "../../kites/api";
	import PullToRefresh from '../pull-to-refresh'
	export default {
		name: "Notarization",
		components: {
			PullToRefresh
		},
		data() {
			return {
				datalist:false,
				tip:false,
				isActive: "0",
				activeNames: "",
				id: '',
				loading: false,
				threeNav: [],
				pages: 4,
				pageindex: 1,
				totalCount: '',
				Articles: [],
				titles:''
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {
			this.id = this.$route.params.id
			this.infothrnav()
			this.GetMenuDetail()
		},

		methods: {
			//获取上级
			GetMenuDetail(){
				this.$post(Api.GetMenuDetail, {
					'id': this.id
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.titles = res.data.result.displayName
						this.parentId = res.data.result.parentId
					
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
			//切换动态
			fnSwitch(type,id) {
				this.datalist=false
				this.isActive = type;
				this.GetMenuArticles(id)
			},
			//返回上一页
			fnBack() {
				this.$router.push({
		          name: 'LegalService',
		          params: {
		            id: this.parentId
		          }
		        })
			},
			handleChange(val) {
				console.log(val);
			},
			//获取信息查询下的子菜单
			infothrnav() {
				this.loading = true
				this.$post(Api.GetTopMenu, {
					'parentId': this.id
				}).then(res => {
					console.log(res)
					if(res.status == 200) {
						this.loading = false
						this.threeNav = res.data.result
						console.log(this.threeNav)
						if(this.threeNav.length==0){
							return false
						}
						this.GetMenuArticles(this.threeNav[0].id)
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
			//获取文章列表
			GetMenuArticles(id) {
				//		this.tip = false
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
					console.log(res)
					if(res.status == 200) {
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
							console.log(res)
							if(res.status == 200) {
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
					if(res.status == 200) {
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
	.wrap {
		padding-bottom: 0;
	}
	
	.switch_title {
		margin-top: .4rem;
	}
	
	.wrap .content {
		padding: .8rem 1.6rem;
	}
	
	.btns a {
		color: #000000;
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