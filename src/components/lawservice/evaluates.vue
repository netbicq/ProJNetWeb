<template>
	<div class="container">
		<div class="statusbar clearfix">
			<div class="w25 back"  @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>我要评价</span>
			</div>
		</div>
		<div class="wrap" style="margin-top: 3.3rem;">
			<div class="content">
				<div class="row1 clearfix">
					<p>您好！评价一下满意程度~</p>
					<el-rate  style='display: inline-block;' v-model="pingjia">
					</el-rate>
				</div>
			</div>
			<el-button type="primary" @click="resul()" style='margin-top: 15px;background: #39589e;width: 80%;'>确 定</el-button>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "evaluates",
		data() {
			return {
				pingjia: 1,
				results: '',
				id:'',
				ids:""
			};
		},
		beforeRouteEnter (to, from, next) {
	       console.log(to)
	       console.log(from)
	       localStorage.fromUrl = from.path
	       next();
    	},
		beforeCreate() {
			this.openIds()
		},
		created() {
			this.id = this.$route.params.id
			this.ids = this.$route.query.id
		},
		methods: {
			//返回上一页
		    fnBack() {
		      	this.$router.go(-1);
		    },
			resul(){
				this.$post(Api.OnlineQuestionAnswerEvaluate,{
				  "answerId": this.id,
				  "evaluate": this.pingjia
				}).then(res=>{
					if(res.data.success == true) {
						this.$message({
							message: "评价成功",
							type: "success"
						});
						this.$router.push({
							path: localStorage.fromUrl
						})
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