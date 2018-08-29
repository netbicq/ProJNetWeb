<template>
	<div class="container" v-loading='loading'>
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>接受走访</span>
			</div>
		</div>
		<div class="wrap" style="margin-top: 3.3rem;">
			<div class="content">
				<div class="row clearfix">
					<label for="" class="label">走访人</label>
					<input type="text" v-model="result.visitPerson" disabled="">
				</div>
				<div class="row clearfix" style="text-align: left;">
					<label for="" class="label">时间</label>
					<span>{{result.visitTime | $toMoment}}</span>
				</div>
				<div class="row clearfix">
					<label for="" class="label">地点</label>
					<input type="text" v-model="result.visitAddress" disabled="" >
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "Visit",
		data() {
			return {
				persons: '', //走访人
				dates: '', //时间
				adds: '', //地址
				id: '',
				result:{
					visitTime:new Date()
				},
				loading:false,
			};
		},
		beforeCreate() {
			this.openIds()
		},
		created() {
			this.id = this.$route.params.id
			this.GetVisitRecord()
		},
		filters:{
			$toMoment:function (fmt) {
			  let date=new Date(fmt);
			  let y=date.getFullYear()
			  let m=date.getMonth()+1;
			  let d=date.getDate();
			  return y+'-'+m+'-'+d;
			}
		},
		methods: {
			//返回上一页
			fnBack() {
				this.$router.go(-1);
			},
			GetVisitRecord() {
				this.loading = true
				this.$post(Api.GetVisitRecord, {
					"id": this.id
				}).then(res => {
					console.log(res)
					if(res.status == 200) {
						this.loading = false
						this.result = res.data.result
					} else {
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
		border-bottom: 1px solid #c9c9ca;
	}
	
	.wrap .row:last-child {
		border-bottom: none;
	}
	
	.wrap .row .label {
		display: inline-block;
		width: 10rem;
		float: left;
		text-align: left;
		font-size: 16px;
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
	
	.wrap .row select {
		box-sizing: border-box;
		width: calc(100% - 10.1rem);
		height: 2.5rem;
		border-radius: .4rem;
		outline: none;
		border: none;
		font-size: 1.25rem;
	}
</style>