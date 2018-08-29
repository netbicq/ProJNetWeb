<template>
	<div class="container" v-loading = 'loading'>
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>周月汇报</span>
			</div>
			<div v-if="unbind" class="w25" @click="CreateReporting">
				<span class="topsub">提交</span>
			</div>
			<div v-else="" class="w25">
				<span class="topsub">提交</span>
			</div>
		</div>
		<div class="wrap" style="margin-top: 3.3rem;">
			<div class="content">
				<div class="row clearfix">
					<label for="" class="label">报告类型</label>
					<el-select v-model="value" placeholder="请选择" class='areas1'>
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="row clearfix" v-if="value==1">
					<label for="" class="label">周汇报</label>
					<input type="date" v-model="dates" placeholder="请选择时间">
				</div>
				<div class="row clearfix" v-else="">
					<label for="" class="label">月汇报</label>
					<input type="date" v-model="dates" placeholder="请选择时间">
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "Report",
		data() {
			return {
				options: [{
					value: '1',
					label: '周报'
				}, {
					value: '2',
					label: '月报'
				}],
				value:'1',//
				dates:'',
				unbind:true,
				loading:false,
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {},
		methods: {
			//返回上一页
			fnBack() {
				this.$router.go(-1);
			},
			CreateReporting() {
				if(this.dates==''|| this.value==''){
					this.$message.error('提交参数不能为空');
					return false
				}
				this.unbind = false
    			this.loading = true
				this.$post(Api.CreateReporting, {
					"reportingDate": this.dates,
					"type": this.value
				}).then(res=>{
					if(res.data.success == true){
						this.fnBack()
					}else{
						this.unbind = true
    					this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
		}
	};
</script>
<style scoped>
	.topsub {
		color: #000;
		font-size: 1.25rem;
		display: inline-block;
	}
	
	.wrap {
		padding-bottom: 0;
	}
	
	.wrap .row {
		width: 100%;
		line-height: 3.3rem;
	}
	
	.wrap .row .label {
		display: inline-block;
		width: 10rem;
		float: left;
		text-align: left;
		font-size: 1.3rem;
		color: #5a5959;
	}
	
	.wrap .row input {
		box-sizing: border-box;
		width: calc(100% - 10.1rem);
		height: 2.5rem;
		border-radius: .4rem;
		outline: none;
		border: none;
		font-size: 1.25rem;
	}
	.areas1 {
		width: calc(100% - 10rem);
		font-size: 1.25rem;
		font-family: "微软雅黑";
	}
</style>