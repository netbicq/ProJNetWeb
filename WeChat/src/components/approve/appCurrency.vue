<template>
	<div class="container" v-loading='loading'>
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>人民调解审批</span>
			</div>
		</div>
		<div class="wrap" style="margin-top: 3.3rem;">
			<div class="content">
				<div class="row1 clearfix" style="margin-bottom: 10px;">
					<label for="" class="label">案件编号</label>
					<span>{{artic.code}}</span>
				</div>
				<div class="row1 clearfix" style="margin-bottom: 10px;">
					<label for="" class="label">处理人</label>
					<span>{{artic.assignToUser}}</span>
				</div>
				<p style="color: #39589e;font-weight: 600;font-size: 1.5rem; text-align: left;">申请人信息</p>
				<div class="row1 clearfix">
					<label for="" class="label">姓名</label>
					<span>{{artic.name}}</span>
				</div>
				<div class="row1 clearfix">
					<label for="" class="label">姓名</label>
					<span>{{artic.name}}</span>
				</div>
				<div class="row1 clearfix">
					<label for="" class="label">身份证号</label>
					<span>{{artic.identityNo}}</span>
				</div>
				<div class="row1 clearfix">
					<label for="" class="label">联系电话</label>
					<span>{{artic.mobilePhone}}</span>
				</div>
				<div class="row1 clearfix">
					<label for="" class="label">所属区域</label>
					<span>{{artic.district}}</span>
				</div>
				<div class="row1 clearfix">
					<label for="" class="label">联系地址</label>
					<span>{{artic.address}}</span>
				</div>
				<div class="row1 clearfix">
					<label for="" class="label">申请时间</label>
					<span>{{artic.creationTime |datas}}</span>
				</div>
				<div class="row1 clearfix">
					<label for="" class="label">申请事项</label>
					<span>{{artic.reason}}</span>
				</div>
				<div class="row1 clearfix">
					<label for="" class="label">事项描述</label>
					<span class="describe">{{artic.content}}</span>
				</div>
				<p style="color: #39589e;font-weight: 600;font-size: 1.5rem; text-align: left; margin-top: 15px;">对方信息</p>
				<div class="row1 clearfix">
					<label for="" class="label">对方姓名</label>
					<span class="describe">{{artic.otherPartyName}}</span>
				</div>
				<div class="row1 clearfix">
					<label for="" class="label">对方电话</label>
					<span class="describe">{{artic.otherPartyTelephone}}</span>
				</div>
				<div class="row1 clearfix">
					<label for="" class="label">对方地址</label>
					<span class="describe">{{artic.otherPartyAddress}}</span>
				</div>
				<div class="row1 clearfix">
					<label for="" class="label">是否同意调解</label>
					<span class="describe">{{artic.isOtherPartyAgree?'同意':'拒绝'}}</span>
				</div>
				<div v-if='artic.mediationType'>
					<div class="row1 clearfix">
						<label for="" class="label">调解方式</label>
						<span class="describe">{{(artic.mediationType==1)?((artic.mediationType==2)?'现场调解':'电话调解'):'视频调解'}}</span>
					</div>
					<div class="row1 clearfix">
						<label for="" class="label">调解时间</label>
						<span class="describe">{{artic.mediationTime|yy}}</span>
					</div>
					<div class="row1 clearfix">
						<label for="" class="label">调解信息</label>
						<span class="describe">{{artic.mediationMessage}}</span>
					</div>
				</div>
				<div class="row1 clearfix">
					<label for="" class="label" style="width: 3rem;">评价</label>
					<el-rate disabled :texts=texts v-if='pingjia!=0' disabled style='display: inline-block;margin-left: -84px;' v-model="pingjia" show-text>
					</el-rate>
					<span v-else="" style="width: auto;font-size: 14px;">未评价</span>
					<span @click='ping' style="width: auto;font-size: 14px;float: right;" v-if='artic.status==3'>我要评分<img style="transform:scale(.5) rotate(180deg);vertical-align: middle;" src="../../assets/icon/back@2x.png" alt=""></span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "appCurrency",
		data() {
			return {
				pingjia: 1,
				results: '',
				texts: [
					'极差', '差', '一般', '满意', '非常满意'
				],
				persons: '',
				dialogVisible1: false,
				dialogVisible: false,
				loading: '',
				name: '李四',
				d: '',
				artic: {},
				options1: [{
					value: '2',
					label: '指派'
				}, {
					value: '4',
					label: '安排调解'
				}],
				value1: '',
				options2: [{
					value: 1,
					label: '现场调解'
				}, {
					value: 2,
					label: '电话调解'
				}, {
					value: 3,
					label: '视频调解'
				}],
				value2: '',
				options3: [],
				value3: '',
				staDate: '',
				state: 5,
				textareas: '',
				tjxx: ''
			};
		},
		beforeCreate() {
			this.openIds()
		},
		created() {
			this.id = this.$route.params.id
			this.ViewPeopleMediation()
		},
		methods: {
			ping(){
				this.$router.push({
					name: 'evaluate',
					params: {
			            id: this.id
			        }
				})
			},
			
			//返回上一页
			fnBack() {
				this.$router.go(-1);
			},
			ViewPeopleMediation() {
				this.loading = true
				this.$post(Api.ViewPeopleMediation, {
					"id": this.id
				}).then(res => {
					console.log(res)
					if(res.status == 200) {
						this.loading = false
						this.artic = res.data.result
						this.state = this.artic.status
						this.pingjia = this.artic.evaluate
					} else {
						this.loading = false
						this.$message.error(res.data.error.message);
					}
				})
			},
		}
	};
</script>
<style scoped>
	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding: 1.6rem;
		box-sizing: border-box;
		z-index: 10;
		background: rgba(0, 0, 0, 0.3);
	}
	
	.mask .model {
		background-color: #ffffff;
		border-radius: .8rem;
		width: 100%;
		height: 100%;
		overflow: auto;
		box-sizing: border-box;
		padding: .8rem;
	}
	
	.mask .model p {
		display: inline-block;
		width: 100%;
	}
	
	.mask .model .h1 {
		font-size: 1.5rem;
		color: #595757;
		text-align: center;
		font-weight: 600;
		line-height: 4rem;
	}
	
	.mask .model .h2 {
		font-size: 1.1rem;
		color: #333;
		text-align: left;
		font-weight: 600;
	}
	
	.mask .model .h3 {
		font-size: 1.1rem;
		color: #333;
		text-align: left;
		text-indent: 2rem;
		line-height: 2rem;
	}
	
	.mask .model .btn {
		width: 100%;
		margin: .8rem 0;
	}
	
	.mask .model .btn button {
		width: 60%;
		font-size: 1.25rem;
		padding: .4rem 0;
		outline: none;
		border: none;
		color: #ffffff;
		border-radius: .8rem;
		background-color: #39589e;
	}
	
	.wrap {
		padding-bottom: 0 !important;
	}
	
	.wrap .content {
		padding: .8rem 1.6rem;
	}
	
	.wrap .row1 {
		width: 100%;
		line-height: 4rem;
		border-bottom: 1px solid #f1f1f2;
		color: #606266;
	}
	
	.wrap .row1 .dates {
		width: calc(100% - 9rem);
		border: none;
		outline: none;
		font-size: 1.25rem;
		color: #606266;
		text-indent: 0.5rem;
	}
	
	.wrap .row1:last-child {
		border-bottom: none;
	}
	
	.wrap .row1 .label {
		display: inline-block;
		width: 8.3rem;
		float: left;
		text-align: left;
		font-size: 1.3rem;
		color: #595757;
	}
	
	.wrap .row1 .radio {
		box-sizing: border-box;
		width: calc(100% - 9rem);
		height: 2.5rem;
		border-radius: .4rem;
		outline: none;
		border: none;
		float: right;
		font-size: 1.3rem;
		text-align: left;
	}
	
	.wrap .row1 span {
		box-sizing: border-box;
		width: calc(100% - 9rem);
		height: 2.5rem;
		border-radius: .4rem;
		font-size: 1.3rem;
		color: #1a1a1a;
		text-align: left;
		display: inline-block;
	}
	
	.wrap .row1 .select {
		box-sizing: border-box;
		width: calc(100% - 9rem);
		height: 2.5rem;
		border-radius: .4rem;
		outline: none;
		border: none;
		font-size: 1.3rem;
	}
	
	.wrap .row1 .btn button {
		float: left;
		outline: none;
		border: none;
		color: #5a5959;
		font-size: 1.25rem;
		border-radius: .4rem;
		padding: .4rem .8rem;
		margin: .4rem;
		background-color: #efefef;
	}
	
	.wrap .row1 .btn button.active {
		color: #fff!important;
		background-color: #39589e!important;
	}
	
	.wrap .row1 .describe {
		line-height: 3rem;
		height: auto;
		word-wrap: break-word;
		word-break: normal;
	}
	
	.wrap .row1 textarea {
		outline: none;
		border: none;
		width: 100%;
		font-size: 1.25rem;
		color: #606266;
		font-family: "微软雅黑";
	}
	
	.red {
		color: red;
	}
	
	.ends {
		background: #E6E6E6;
		margin-top: 15px;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
</style>