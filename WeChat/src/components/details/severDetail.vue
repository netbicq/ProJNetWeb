<template>
	<div class="container" v-loading='loading'>
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>社区服务</span>
			</div>
		</div>
		<div class="wrap" style="margin-top: 3.3rem;">
			<div class="content">
				<div class="row clearfix">
					<label for="" class="label">类型</label>
					<input type="text" v-model="result.type" disabled="">
				</div>
				<div class="row clearfix" v-show="value1=='1'">
					<label for="" class="label">组织者</label>
					<input type="text" v-model="result.orgization" disabled="">
				</div>
				<div class="row clearfix" v-show="value1=='2'">
					<label for="" class="label">见证者</label>
					<input type="text" v-model="result.orgization" disabled="">
				</div>
				<div class="row clearfix">
					<label for="" class="label" style="width:100%;">劳动内容</label>
					<textarea name="" id="" v-model="result.content" rows="3" disabled=""></textarea>
				</div>
				<div class="row clearfix">
					<label for="" class="label">劳动时长</label>
					<input type="number" v-model="result.studyTime" disabled="">
				</div>
				<div class="row clearfix">
						<img width="100%" :src="result.photo" alt="">
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "Study",
		data() {
			return {
				options:[{
		          value: '1',
		          label: '集中教育'
				},{
		          value: '2',
		          label: '自行学习'
				}],
				value:'',//学习方式
				options1:[{
		          value: '1',
		          label: '集中劳动'
				},{
		          value: '2',
		          label: '公益服务'
				}],
				value1:'1',//工艺类型
				id:"",
				HeadIMG: "",
				dialogImageUrl: "",
				dialogVisible: false,
				host:Api.files,
				numbers:'',
				textares:'',
				persons:'',
				photoTile:'',
				result:{},
				loading:false
			};
		},
		beforeCreate() {
			this.openIds()
		},
		created() {
			this.id = this.$route.params.id
			this.GetServiceRecord()
		},
		methods: {
			//返回上一页
			fnBack() {
				this.$router.go(-1);
			},
			GetServiceRecord(){
				this.loading = true
				this.$post(Api.GetServiceRecord,{
					"id":this.id
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
	
	.wrap .row select {
		box-sizing: border-box;
		width: calc(100% - 10.1rem);
		height: 2.5rem;
		border-radius: .4rem;
		outline: none;
		border: none;
		font-size: 1.25rem;
	}
	
	.wrap .row textarea {
		outline: none;
		border: none;
		width: 100%;
		font-size: 1.25rem;
	}
	
	.areas1 {
		width: calc(100% - 10rem);
		font-size: 1.25rem;
		font-family: "微软雅黑";
	}
	
	
</style>