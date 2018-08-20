<template>
	<div class="container" v-loading="loading">
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>机构详情</span>
			</div>
		</div>
		<div class="lvtop">
			<div class="clearfix ">
				<img src="../../assets/qwe.png"  style="float: left; width: 22%;margin-right: 10px;"/>
				<div class="fl">
					<h3 class="namsd">名称：{{result.name}}</h3>
					<p class="time">成立时间：{{result.creationTime|yy}}</p>
					<p class="time">团队规模：{{result.memberCount}}</p>
					<p class="time">地址：{{result.address}}</p>
					<p class="time">电话：{{result.tel}}</p>
				</div>
			</div>
		</div>
		<div class="topRe" style="margin-bottom: 20px;">
			<p style="color: rgb(57, 88, 158); font-weight: 600;font-size: 1.5rem;text-align: left;">机构成员</p>
			<div>
				<pull-to-refresh @on-pullup='onPullup' @on-pulldown='onPulldown' class="page">
					<ul>
						<li v-for="item in result.membsers">
							<router-link v-bind="{to:'/AgenMyDetail/'+(item.id)}" class="clearfix">
								<img src="../../assets/qwe1.png" class="imgLs">
								<div class="fl lvList">
									<p>{{item.userName}}</p>
									<p>{{item.serviceAgencyName}}</p>
								</div>
								<div class="fr lvyear">
									<span>{{item.year}}</span>年从业
								</div>
							</router-link>
						</li>
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
		name: "AgencyDetails",
		components: {
			PullToRefresh
		},
		data() {
			return {
				datalist:false,
				tip: false,
				searchs: "",
				id: '',
				loading: false,
				pages: 8,
				pageindex: 1,
				totalCount: '',
				Articles: [],
				result: {}
			};
		},
		beforeCreate() {
			this.openIds()

		},
		mounted() {},
		created() {
			this.id = this.$route.params.id
			this.GetServiceAgencyMembers()
		},
		methods: {
			//返回上一页
			fnBack() {
				this.$router.go(-1);
			},
			//获取列表
			GetServiceAgencyMembers() {
				this.tip = false
				this.pages = 8
				this.pageindex = 1
				this.totalCount = 0
				this.loading = true
				this.$post(Api.GetServiceAgency, {
					"id": this.id,
					"filter": "",
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1),
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.loading = false
						this.result = res.data.result
						this.totalCount = res.data.result.memberCount
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
				if(this.result.membsers.length == this.totalCount) {
					this.tip = true
					finshCallback();
					return false
				} else {
					this.loading = true
					this.pageindex++
						this.$post(Api.GetServiceAgency, {
							"id": this.id,
							"filter": "",
							"sorting": "",
							"maxResultCount": this.pages,
							"skipCount": this.pages * (this.pageindex - 1),
						}).then(res => {
							console.log(res)
							if(res.data.success == true) {
								this.loading = false
								this.result = res.data.result
								this.totalCount = res.data.result.memberCount
								if(this.totalCount==0){
									this.datalist=true
								}
								finshCallback();
							} else {
								this.loading = false
								this.$message.error(res.data.error);
							}
						})
					console.log('finshCallback');
				}
			},
			onPulldown(finshCallback) {
				this.loading = true
				this.pages = 4
				this.tip = false
				this.pageindex = 1
				this.$post(Api.GetServiceAgency, {
					"id": this.id,
					"filter": "",
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1),
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.loading = false
						this.result = res.data.result
						this.totalCount = res.data.result.memberCount
						if(this.totalCount==0){
							this.datalist=true
						}
						finshCallback();
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
	.lvtop {
		text-align: left;
		padding-left: 15px;
		background: #fff;
		width: 100%;
		margin-top: 3.5rem;
		padding-top: 10px;
		line-height: 2.6rem;
		margin-bottom: 15px;
		box-sizing: border-box;
	}
	
	.lvtop h3 {
		font-size: 16px;
		color: #333333;
	}
	
	.lvtop p {
		color: #808080;
	}
	
	.topRe {
		width: 100%;
		background: #fff;
		padding-left: 15px;
		box-sizing: border-box;
		padding-right: 15px;
	}
	
	.topRe>p {
		line-height: 3.6rem;
	}
	
	.topRe li {
		padding: 15px;
		border-bottom: 1px solid #cdd5e7;
	}
	
	.topRe li:last-child {
		border: none;
	}
	
	.lvList {
		text-align: left;
	}
	.imgLs{
		float: left;
		height: 40px;
		margin-right: 5%;
	}
	
	.lvList p:nth-of-type(1) {
		color: #333333;
		font-size: 1.5rem;
		margin-bottom: 3px;
	}
	
	.lvList p:nth-of-type(2) {
		color: #808080;
		font-size: 1rem;
	}
	
	.lvyear {
		color: #808080;
	}
	
	.lvyear span {
		font-size: 2.2rem;
		font-weight: 500;
		color: #808080;
	}
	
	.tip {
		line-height: 30px;
		background: #f1f1f1;
		text-align: center;
		margin-top: 15px;
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
</style>