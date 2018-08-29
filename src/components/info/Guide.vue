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
		</div>
		<div class="swiper" style="margin-top: 3.3rem;position: relative;">
			<span  style="position: absolute; left: 2.5rem;color: #fff;font-size: 1.6rem;top: 50%;transform:translateY(-50%); opacity: 0.8;">{{titles}}</span>
			<img src="../../assets/vv_02.png" alt="">
		</div>
		<div class="search clearfix">
			<div class="sear_input">
				<el-input size="small" clearable placeholder="请输入需要搜索的内容" prefix-icon="el-icon-search" v-model="searchs">
				</el-input>
			</div>
			<div class="btn">
				<button @click="fnSearch">搜索</button>
			</div>

		</div>
		<div class="switch_title">
			<ul class="btns">
				<li v-bind:class="{ active: isActive==index }" @click="fnSwitch(index,item.id)" v-for="(item,index) in threeNav">
					<div v-if='item.type==2'>
						<router-link :to='item.url'>
							<span>{{item.displayName}}</span>
							<div v-bind:class="{ line: isActive==index }"></div>
						</router-link>
					</div>
					<div v-else>
						<span>{{item.displayName}}</span>
						<div v-bind:class="{ line: isActive==index }"></div>
					</div>
				</li>
			</ul>
		</div>
		<div class="wrap picBoxs">

			<div class="content homes">
				<pull-to-refresh @on-pullup='onPullup' @on-pulldown='onPulldown' class="page">
					<ul>
						<router-link v-bind="{to:'/Details/'+(item.id)}" v-for='item in Articles' :key='item.id'>
							<li class="clearfix">
								<img :src="item.cover?item.cover:''" alt="">
								<p class="text2">{{item.title}}</p>
								<p class="time">{{item.creationTime | yy}}</p>
							</li>
						</router-link>

					</ul>
					<p class="tip" v-if="tip">到底了</p>
					<p class="tip" v-if="datalist">暂无数据</p>
				</pull-to-refresh>
			</div>
		</div>
		<div class="linkbox">
			<router-link v-bind="{to:'/LawAid/26?type=0'}" v-if='isActive==0'><el-button  class='btnLink'>快速<br />办理</el-button></router-link> 
			<router-link v-bind="{to:'/compose/27?type=0'}" v-if='isActive==1'><el-button  class='btnLink'>快速<br />办理</el-button></router-link> 
			<!--<router-link :to="1" v-if='isActive==2'><el-button class='btnLink'>快速<br />办理</el-button></router-link> 
			<router-link :to="1" v-if='isActive==3'><el-button class='btnLink'>快速<br />办理</el-button></router-link> 
			<router-link :to="1" v-if='isActive==4'><el-button class='btnLink'>快速<br />办理</el-button></router-link>-->
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	import PullToRefresh from '../pull-to-refresh'
	export default {
		name: "Guide",
		components: {
			PullToRefresh
		},
		data() {
			return {
				datalist:false,
				tip: false,
				loading: true,
				isActive: 0, //1.法律援助  2.人民调解  3.特殊人群服务  4.公证服务
				searchs: "",
				id: '',
				threeNav: [],
				pages: 10,
				pageindex: 1,
				totalCount: '',
				Articles: [],
				titles:'',
				parentId:'',//父id
				host:Api.hostname
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {},
		created() {
			this.id = this.$route.params.id
			this.GetMenuDetail()
			this.infothrnav()
		},
		methods: {
			//切换动态
			fnSwitch(type, id) {
				console.log(id)
				this.id = id
				this.searchs=''
				this.datalist = false
				this.isActive = type;
				this.GetMenuArticles(id)
			},
			//搜索
			fnSearch() {
				this.pages = 10
				this.pageindex = 1
				this.totalCount = 0
				this.loading = true
				this.$post(Api.GetMenuArticles, {
					"filter": this.searchs,
					"menuId": this.id,
					"sorting": '',
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
			//获取文章列表
			GetMenuArticles(id) {
				//		this.tip = false
				this.pages = 10
				this.pageindex = 1
				this.totalCount = 0
				this.loading = true
				this.id = id
				this.$post(Api.GetMenuArticles, {
					"filter": this.searchs,
					"menuId": id,
					"sorting": '',
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
							"filter": this.searchs,
							"menuId": this.id,
							"sorting": '',
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
				this.pages = 10
				this.tip = false
				this.pageindex = 1
				this.$post(Api.GetMenuArticles, {
					"filter": this.searchs,
					"menuId": this.id,
					"sorting": '',
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
	.wrap .content ul li {
		border-bottom: none;
	}
	
	.btns a {
		color: #000000;
	}
	
	.page {
		height: 29rem;
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
	.linkbox{
		position: fixed;
		bottom: 5rem;
		text-align: center;
		width: 4rem;
		right: 3rem;
		height: 4rem;
	}
	.btnLink{
		color: #fff;
		background: #3e5899;
		font-size: 1.1rem;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		text-align: center;
		padding: 0;
		border: none;
		box-shadow: 0px 0px 4px #000;
	}
</style>