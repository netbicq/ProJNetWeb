<template>
	<div class="container" v-loading='loading'>
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>以案释法</span>
			</div>
			<div class="w25">
				<!-- <img src="../../assets/icon/back@2x.png" alt=""> -->
			</div>
		</div>
		<div class="swiper" style="margin-top: 3.3rem;">
			<img src="../../assets/aaa_07.png" alt="">
		</div>
		<div class="switch_title1">
			<ul class="btns">
				<li v-bind:class="{ active: isActive==index }" @click="fnSwitch(index,item.id)" v-for="(item,index) in threeNav">
					<div>
						<span>{{item.displayName}}</span>
						<div v-bind:class="{ line: isActive==index }"></div>
					</div>
				</li>
			</ul>
		</div>
		<div class="wrap">

			<div class="content content1">
				<pull-to-refresh @on-pullup='onPullup' @on-pulldown='onPulldown' class="page">
					<ul>
						<router-link v-bind="{to:'/videoDetails/'+(item.id)}" v-for='item in Articles' :key='item.id'>
							<li class="clearfix">
								<img :src="item.cover" alt="">
								<p>{{item.title}}</p>
								<span>{{item.description}}</span>
							</li>
						</router-link>
						<!--<router-link to="videoDetails">
                     <li class="clearfix">
                        <img src="../../assets/img.png" alt="">
                        <p>法治宣传进社区</p>
                        <span>近期，无锡市锡山区司法局举行法治宣传进社区活动</span>
                    </li>
                    </router-link>
                    <router-link to="videoDetails">
                    <li class="clearfix">
                        <img src="../../assets/img.png" alt="">
                        <p>法治宣传进社区</p>
                        <span>近期，无锡市锡山区司法局举行法治宣传进社区活动</span>
                    </li>
                    </router-link>
                    <router-link to="videoDetails">
                    <li class="clearfix">
                        <img src="../../assets/img.png" alt="">
                        <p>法治宣传进社区</p>
                        <span>近期，无锡市锡山区司法局举行法治宣传进社区活动</span>
                    </li>
                    </router-link>-->
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
		name: "Case",
		components: {
			PullToRefresh
		},
		data() {
			return {
				datalist:false,
				isActive: 0, //1.法治微视频  2.法律专题讲座
				searchs: "",
				threeNav: [],
				loading: false,
				tip: false,
				pages: 6,
				pageindex: 1,
				totalCount: '',
				Articles: []
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
			//切换动态
			fnSwitch(type, id) {
				console.log(id)
				this.datalist=false
				this.isActive = type;
				this.GetMenuArticles(id)
			},
			//搜索
			fnSearch() {
				alert(this.searchs);
			},
			//返回上一页
			fnBack() {
				this.$router.push({
		          name: 'InfoQuery',
		          params: {
		            id: this.parentId
		          }
		        })
			},
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
			//获取菜单
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
						this.GetMenuArticles(this.threeNav[0].id)
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
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
				this.tip = false
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
	.page {
		height: 30rem;
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
	
	.wrap {
		padding-bottom: .8rem !important;
	}
	
	.content ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.content ul a {
		width: 45%;
	}
	
	.content ul li {
		width: 100%;
		border-bottom: none;
	}
	
	.content ul li img {
		width: 100%;
		margin-right: 0;
		max-width: 100%;
	}
	
	.content ul li p {
		width: 100%;
		display: inline-block;
		color: #585757;
		text-align: left;
		font-size: 1.25rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.content ul li span {
		width: 100%;
		text-align: left;
		color: #b1afa9;
		font-size: 1.1rem;
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>