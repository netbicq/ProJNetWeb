<template>
	<div class="container" v-loading="loading">
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>常见法律问题</span>
			</div>
			<div class="w25">
				<!-- <img src="../../assets/icon/back@2x.png" alt=""> -->
			</div>
		</div>
		<div class="wrap">
			<div class="content">
				<div class="title">
					<span class="title-dy">常见法律问题</span>
				</div>
				<div>
					<pull-to-refresh @on-pullup='onPullup' @on-pulldown='onPulldown' class="page">
						<el-collapse v-model="activeNames" @change="handleChange" accordion>
							<el-collapse-item :title="item.question" :name="index" v-for='(item,index) in qus' :key='index'>
								<div>{{item.answer}}</div>
							</el-collapse-item>
						</el-collapse>
					</pull-to-refresh>
					<p class="tip" v-if="tip">到底了</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	import PullToRefresh from '../pull-to-refresh'
	export default {
		name: "Problem",
		components: {
			PullToRefresh
		},
		data() {
			return {
				tip:false,
				loading: false,
				activeNames: "",
				qus: [], //问题
				pages: 10,
				pageindex: 1,
				id: '',
				totalCount: 0,
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {},
		created() {
			this.GetCommonFaqs()
		},
		methods: {
			//返回上一页
			fnBack() {
				this.$router.go(-1);
			},
			handleChange(val) {
				console.log(val);
			},
			GetCommonFaqs() {
				this.loading = true
				this.pages = 10
				this.pageindex = 1
				this.totalCount = 0
				this.$post(Api.GetCommonFaqs, {
					"filter": "",
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1),
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.loading = false
						this.qus = res.data.result.items
						this.totalCount = res.data.result.totalCount
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
			//下拉加载
			onPullup(finshCallback) {
				if(this.qus.length == this.totalCount) {
					this.tip = true
					finshCallback();
					return false
				} else {
					this.loading = true
					this.pageindex++
						this.$post(Api.GetCommonFaqs, {
							"filter": "",
							"sorting": "",
							"maxResultCount": this.pages,
							"skipCount": this.pages * (this.pageindex - 1),
						}).then(res => {
							console.log(res)
							if(res.status == 200) {
								this.loading = false
								this.qus = res.data.result.items
								this.totalCount = res.data.result.totalCount
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
				this.pages=4
				this.pageindex=1
				this.$post(Api.GetCommonFaqs, {
					"filter": "",
					"sorting": "",
					"maxResultCount": this.pages,
					"skipCount": this.pages * (this.pageindex - 1),
				}).then(res => {
					console.log(res)
					if(res.status == 200) {
						this.loading = false
						this.qus = res.data.result.items
						this.totalCount = res.data.result.totalCount
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
	.wrap .content {
		padding: .8rem 1.6rem;
	}
	
	.content .title {
		border-bottom: none;
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
	.tip{
		line-height: 30px;
		background: #f1f1f1;
		text-align: center;
		margin-top: 15px;
	}
</style>