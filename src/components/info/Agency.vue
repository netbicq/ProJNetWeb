<template>
	<div class="container" v-loading="loading">
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>服务机构</span>
			</div>
			<div class="w25">
				<!-- <img src="../../assets/icon/back@2x.png" alt=""> -->
			</div>
		</div>
		<div class="search clearfix" style="margin-top: 3.3rem;">
            <div class="sear_input">
                <el-input
                    size="small"
                    clearable
                    placeholder="请输入需要搜索的内容"
                    prefix-icon="el-icon-search"
                    v-model="searchs">
                </el-input>
            </div>
            <div class="btn">
                <button @click="fnSearch">搜索</button>
            </div>
        </div> 
		<div class="switch_title switch_title2">
			<ul class="btns">
				<li v-bind:class="{ active: isActive==index }" @click="fnSwitch(index,item.url,item.id)" v-for="(item,index) in threeNav">
					<!--<div>
						<a :href=item.url>
							<span>{{item.displayName}}</span>
							<div v-bind:class="{ line: isActive==index }"></div>
						</a>
					</div>-->
					<div>
						<span>{{item.displayName}}</span>
						<div v-bind:class="{ line: isActive==index }"></div>
					</div>
				</li>
			</ul>
		</div>
		<div class="wrap">
			<div class="agency">
				<pull-to-refresh @on-pullup='onPullup' @on-pulldown='onPulldown' class="page">
					<ul>
						<!--<router-link v-bind="{to:'/Details/'+(item.id)}" >-->
						<li class="clearfix contens" v-for='item in Articles' :key='item.id'>
							<router-link v-if='isActive!=1' v-bind="{to:'/AgencyDetails/'+(item.id)}">
								<h3 class="namsd">名称：{{item.name}}</h3>
								<p class="time">地址：{{item.address}}</p>
								<p class="time">电话：{{item.tel}}</p>
							</router-link>
							<router-link v-else v-bind="{to:'/AgencyDetails/'+(item.id)}">
								<img src="../../assets/qwe.png"  style="float: left; width: 22%;margin-right: 10px;"/>
								<div class="fl">
									<h3 class="namsd">名称：{{item.name}}</h3>
									<p class="time">成立时间：{{item.creationTime|yy}}</p>
									<p class="time">团队规模：{{item.memberCount}}</p>
									<p class="time">地址：{{item.address}}</p>
									<p class="time">电话：{{item.tel}}</p>
								</div>
							</router-link>
						</li>
						
						<!--</router-link>-->

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
		name: "Agency",
		components: {
			PullToRefresh
		},
		data() {
			return {
				datalist:false,
				tip:false,
				loading: true,
				isActive: 0, //1.法律援助  2.人民调解  3.特殊人群服务  4.公证服务
				searchs: "",
				id: '',
				threeNav: [],
				pages: 8,
				pageindex: 1,
				totalCount: '',
				Articles: []
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {},
		created() {
			this.id = this.$route.params.id
			this.GetServiceAgencies()
			this.GetMenuDetail()
		},
		methods: {
			//切换动态
			fnSwitch(indexs,type, id) {
				let tye = type.charAt(type.length -1)
//				let tye = type.charAt(type.length – 1)
				this.datalist=false
				this.isActive = indexs;
				this.GetMenuArticles(tye)
			},
			//搜索
			fnSearch() {
				this.pages = 10
				this.pageindex = 1
				this.totalCount = 0
				this.loading = true
				this.$post(Api.GetServiceAgencies, {
				  "type": this.id,
				  "filter":this.searchs,
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
			GetServiceAgencies() {
				this.loading = true
				this.$post(Api.GetTopMenu,{
					'parentId': this.id
				}).then(res => {
					console.log(res)
					if(res.status == 200) {
						this.loading = false
						this.threeNav = res.data.result
						let tye = this.threeNav[0].url.charAt(this.threeNav[0].url.length -1)

						this.GetMenuArticles(0)
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
			//获取文章列表
			GetMenuArticles(id) {
				this.tip = false
				this.pages = 4
				this.pageindex = 1
				this.totalCount = 0
				this.loading = true
				this.id = id
				this.$post(Api.GetServiceAgencies, {
				  "type": this.id,
				  "filter": this.searchs,
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
						this.$post(Api.GetServiceAgencies, {
						  "type": this.id,
						  "filter": this.searchs,
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
				this.$post(Api.GetServiceAgencies, {
				  "type": this.id,
				  "filter": this.searchs,
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
	.wrap .content ul li {
		border-bottom: none;
	}
	
	.btns a {
		color: #000000;
	}
	
	.page {
		height: 50rem;
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
	.namsd{
		font-size: 16px;
		color: #333333;
		font-weight: 400;
	}
	.contens .time{
		color: #919191;
	}
	.contens{
		background: #fff;
		margin-bottom: 5px;
		padding: 10px;
		border-radius: 10px;
	}
</style>