<template>
	<div class="container" v-loading="loading">
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>法律咨询</span>
			</div>
			<div class="w25">
				<!-- <img src="../../assets/icon/back@2x.png" alt=""> -->
			</div>
		</div>
		<div class="swiper" style="margin-top: 3.3rem;">
			<img src="../../assets/cc_03.png" alt="">
		</div>
		<div class="menu2">
			<ul>
				<a href="https://h5.law.push.aegis-info.com/html/index?id=5529&shareUid=oCmhhxMPkdP2CMSw1_kYYx5l2FCQ">
					<li>
						<img src="../../assets/icon/message@2x.png" alt="">
						<span>智能法律咨询</span>
					</li>
				</a>
				<router-link to="/Problem">
					<li>
						<img src="../../assets/icon/say.png" alt="">
						<span>常见法律问题</span>
					</li>
				</router-link>
			</ul>
		</div>
		<div class="wrap">
			<div class="content">
				<div class="title">
					<span class="title-dy">在线法律咨询</span>
				</div>
				<div class="search clearfix">
					<div class="row">
						<span>标题</span>
						<div class="sear_input">
							<el-input size="small" clearable placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="searchs">
							</el-input>
						</div>
					</div>
					<div class="row">
						<span>日期</span>
						<div class="sear_date">
							<input type="date" v-model="staDate">
							<!-- <i class="el-icon-date"></i> -->
						</div>
						<span style="float:right;width:5%;text-align: center;">至</span>
						<div class="sear_date">
							<input type="date" v-model="endDate">
							<!-- <i class="el-icon-date"></i> -->
						</div>
					</div>
					<div class="row">
	                        <button @click='sea()'>搜索</button>
	                        <button @click="consult">我要咨询</button>
						<!--<button style="background: #34ab95;" >搜索</button>
						<button >我要咨询</button>-->
					</div>
				</div>
				<!---->
				<div class="switch_title">
					<p style="color: #39589e;text-indent: 0.3rem; font-weight: 600;font-size: 1.5rem; text-align: left;">咨询回复</p>
				</div>
				<div class="dynamic">
					<pull-to-refresh @on-pullup='onPullup' @on-pulldown='onPulldown' class="page">
					<div class="list">
						
						<router-link v-bind="{to:'/NotarDetails/'+(item.id)}" v-for='item in actireList' :key='item.id'>
							<div class="guide_item clearfix">
								<p class="fl">
									{{item.title}}
								</p>
								<span class="fr">
                                {{item.creationTime|yy}}
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
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	import PullToRefresh from '../pull-to-refresh'
	export default {
		name: "Consultation",
		components: {
			PullToRefresh
		},
		
		data() {
			return {
				datalist:false,
				loading:false,
				isActive: 1,
				searchs: "",//搜索
				staDate: "",//开始时间
				endDate: "",//结束时间
				
				actireList:[],//文章列表
				totalCount:0,//总条数
				tip: false,
				pages: 6,
				pageindex: 1,
				totalCount: '',
				parentId:'',
				id:''
			};
		},
		beforeRouteEnter (to, from, next) {
	       console.log(to)
	       console.log(from)
	       localStorage.consuUrl = to.path
	       next();
    	},
		beforeCreate() {
			this.openIds()
		},
		mounted() {
			this.id = this.$route.params.id
			this.GetOnlineQuestions()
			this.GetMenuDetail()
		},
		methods: {
			//切换动态
			fnSwitch(type) {
				this.isActive = type;
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
			GetOnlineQuestions() {

			},
			consult(){
				this.$router.push({
					 path: '/leAdvi',
					 query:{
					 	id:this.id
					 }
				})
			},
			
			//获取列表
			GetOnlineQuestions() {
				this.loading = true
				this.$post(Api.GetOnlineQuestions, {
					"startDate": this.staDate,
					"endDate": this.endDate,
					"filter": this.searchs,
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1),
				}).then(res => {
					console.log(res)
					if(res.data.success == true){
						this.loading = false
						this.actireList = res.data.result.items
						this.totalCount = res.data.result.totalCount
						if(this.totalCount==0){
							this.datalist=true
						}
					}else{
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
			//搜索
			sea(){
				this.loading = true
				this.pages=6
				this.pageindex=1
				this.$post(Api.GetOnlineQuestions, {
					"startDate": this.staDate,
					"endDate": this.endDate,
					"filter": this.searchs,
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1),
				}).then(res => {
					console.log(res)
					if(res.data.success == true){
						this.loading = false
						this.actireList = res.data.result.items
						this.totalCount = res.data.result.totalCount
						if(this.totalCount==0){
							this.datalist=true
						}
					}else{
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
				if(this.actireList.length == this.totalCount) {
					this.tip = true
					finshCallback();
					return false
				} else {
					this.loading = true
					this.pageindex++
					this.$post(Api.GetOnlineQuestions, {
						"startDate": this.staDate,
						"endDate": this.endDate,
						"filter": this.searchs,
						"sorting": "",
						"maxResultCount": this.pages,
						"skipCount": this.pages * (this.pageindex - 1),
					}).then(res => {
						console.log(res)
						if(res.data.success == true){
							this.loading = false
							this.actireList = this.actireList.concat(res.data.result.items)
							this.totalCount = res.data.result.totalCount
							if(this.totalCount==0){
								this.datalist=true
							}
							finshCallback()
						}else{
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
				this.pages = 6
				this.tip = false
				this.pageindex = 1
				this.$post(Api.GetOnlineQuestions, {
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
						this.actireList = res.data.result.items
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
	.menu2 {
		width: 100%;
		padding: 0.8rem 0;
		background-color: #ffffff;
		margin-bottom: 0.4rem;
	}
	
	.menu2 ul {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
	
	.menu2 ul a {
		width: 45%;
	}
	
	.menu2 ul li {
		width: 100%;
		height: 3.75rem;
		float: left;
		line-height: 3.75rem;
		border-radius: 0.4rem;
	}
	
	.menu2 ul a:nth-child(1) li {
		background-color: rgba(85, 149, 195, 1);
	}
	
	.menu2 ul a:nth-child(2) li {
		background-color: rgba(111, 127, 183, 1);
	}
	
	.menu2 ul li img {
		width: 2rem;
		vertical-align: middle;
	}
	
	.menu2 ul li span {
		color: #ffffff;
		font-size: 1.25rem;
	}
	
	.title-dy {
		width: 100%;
		font-size: 1.3rem;
		font-weight: 600;
		display: inline-block;
		text-align: left;
		color: #38589f;
		padding: 0.8rem 0;
	}
	
	.search {
		padding: 0;
	}
	
	.search .row {
		margin: 0.8rem 0;
	}
	
	.search .row span {
		display: inline-block;
		width: 10%;
		color: #666666;
		font-size: 1.25rem;
		text-align: left;
		line-height: 2.6rem;
	}
	
	.row .sear_input {
		width: 85%;
		float: right;
	}
	
	.row .sear_date {
		width: 40% !important;
		float: right;
		position: relative;
	}
	
	.row .sear_date i {
		font-style: normal;
		position: absolute;
		right: 2px;
		top: 6px;
		font-size: 21px;
		color: #666666;
	}
	
	.row .sear_date input {
		width: 100%;
		border: 1px solid #dcdfe6;
		border-radius: .3rem;
		height: 2.5rem;
		line-height: 2.5rem;
		outline: none;
		background: #fff;
	}
	
	.row:last-child {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
	
	.row button {
		border-radius: .8rem;
		width: 45%;
		outline: none;
		border: none;
		color: #ffffff;
		font-size: 1.25rem;
		padding: .4rem 0;
	}
	
	.row button:nth-child(1) {
		background-color: #38589e;
		/* border: 1px solid #39589e; */
	}
	
	.row button:nth-child(2) {
		background-color: #34ab95;
		/* border: 1px solid #34ab95; */
	}
	
	.wrap .content ul li {
		border: none;
	}
	
	.dynamic {
		width: 100%;
		padding: .8rem 0.6rem;
		box-sizing: border-box;
	}
	
	.dynamic .title {
		padding: .4rem 0;
	}
	
	.dynamic .title span {
		font-weight: 600;
		color: #38589f;
		font-size: 1.25rem;
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
		color: #726f6f;
		font-size: 1.3rem;
		text-align: left;
		 overflow: hidden;
		  text-overflow: ellipsis;
		  display: -webkit-box;
		  -webkit-line-clamp: 1;
		  -webkit-box-orient: vertical;
	}
	
	.list .guide_item span {
		display: inline-block;
		width: 30%;
		color: #b0b1b1;
		font-size: 1.1rem;
		text-align: right;
	}
	
	.page {
		height: 20rem;
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