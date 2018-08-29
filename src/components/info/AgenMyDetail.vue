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
				<img src="../../assets/qwe2.png"  style="float: left; width: 22%;margin-right: 10px;"/>
				<div class="fl">
					<h3 class="namsd">姓名：{{result.userName}}</h3>
					<p class="time">所属单位：{{result.serviceAgencyName}}</p>
					<p class="time">从业时间：{{result.year}}</p>
					<p class="time">执业编号：{{result.address}}</p>
				</div>
			</div>
		</div>
		<div class="topRe">
			<p style="color: rgb(57, 88, 158); font-weight: 600;font-size: 1.5rem;text-align: left;">个人介绍</p>
			<div class="miaos">
				{{result.interduce}}
			</div>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "AgenMyDetail",
		data() {
			return {
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
				this.loading = true
				this.$post(Api.GetServiceAgencyMember, {
					"id": this.id,
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.loading = false
						this.result = res.data.result
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
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
	.topRe>p{
		line-height: 3.6rem;
	}
	.topRe li{
		padding: 15px;
		border-bottom: 1px solid #cdd5e7;
	}
	.topRe li:last-child{
		border: none;
	}
	.lvList{
		text-align: left;
	}
	.lvList p:nth-of-type(1){
		color: #333333;
		font-size: 1.5rem;	
		margin-bottom: 3px;
	}
	.lvList p:nth-of-type(2){
		color: #808080;
		font-size: 1rem;	
	}
	.lvyear{
		color: #808080;
	}
	.lvyear span{
		font-size: 2.2rem;
		font-weight: 500;
		color: #808080;
	}
	.miaos{
		text-indent: 28px;
		font-size: 14px;
		color: #333333;
		line-height: 24px;
		text-align: left;
		padding-bottom: 50px;
	}
</style>