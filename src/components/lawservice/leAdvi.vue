<template>
	<div class="container">
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>法律咨询</span>
			</div>
			<!--<div class="w25">
				<span class="topsub" @click="consult">提交</span>
			</div>-->
		</div>
		<div class="wrap" style="margin-top: 3.3rem;">
			<div class="search clearfix">
				<div class="row clearfix">
					<span>咨询分类</span>
					<div class="sear_input">
						<el-select v-model="value" clearable placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="row clearfix">
					<span>指定律师</span>
					<div class="sear_input">
						<el-select v-model="value1" clearable placeholder="请选择">
							<el-option v-for="item in options1" :key="item.id" :label="item.lawyerName" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="row clearfix">
					<span>标题</span>
					<div class="sear_input">
						<el-input size="small" clearable placeholder="请输入需要标题" v-model="titles">
						</el-input>
					</div>
				</div>
				<div class="row clearfix">
					<span>内容</span>
					<div class="sear_input">
						<el-input size="small" type="textarea" clearable placeholder="请输入内容" v-model="question">
						</el-input>
					</div>
				</div>
				<div class="row clearfix">
					<span>姓名</span>
					<div class="sear_input">
						<el-input size="small" clearable placeholder="请输入姓名" v-model="names">
						</el-input>
					</div>
				</div>
				<div class="row" style="padding-bottom: 2rem;">
					<button @click="consult">提交</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "leAdvi",
		data() {
			return {
				names: '', //姓名
				question: '', //内容
				titles: '', //标题
				id: '',
				options:[],
				value:'',//分类
				options1:[],
				value1:'',//律师
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {
			this.id = this.$route.query.id
			this.GetSelectionDatasByType()
			this.GetAllLawyers()
		},
		methods: {
			//获取分类
			GetSelectionDatasByType() {
				this.$post(Api.GetSelectionDatasByType, {
					"type": 6
				}).then(res => {
					console.log(res)
					if(res.data.success==true){
						this.options = res.data.result
					}else{
						this.$message.error(res.data.error);
					}
				})
			},
			//获取律师列表
			GetAllLawyers() {
				this.$post(Api.GetAllLawyers).then(res => {
					if(res.data.success==true){
						this.options1 = res.data.result
					}else{
						this.$message.error(res.data.error);
					}
				})
			},
			//返回上一页
			fnBack() {
				this.$router.go(-1);
			},

			//咨询
			consult() {
				if(this.value == '') {
					this.$message.error('咨询不能为空');
					return false;
				}
				if(this.titles == '') {
					this.$message.error('标题不能为空');
					return false;
				}
				if(this.question == '') {
					this.$message.error('内容不能为空');
					return false;
				}
				if(this.names == '') {
					this.$message.error('姓名不能为空');
					return false;
				}
				this.$post(Api.AddOnlineQuestion, {
					"title": this.titles,
					"question": this.question,
					"userName": this.names,
					"openId": localStorage.openID,
					"lawyerId": this.value1,
  					"consultType": this.value
				}).then(res => {
					if(res.data.success == true) {
						this.names = ''
						this.question = ''
						this.titles = ''
						this.$message({
							message: '提交成功',
							type: 'success'
						});
						this.$router.push({
							path: '/Consultation/' + this.id
						})
					} else {
						this.$message.error(res.data.error);
					}
				})
			},
		}
	};
</script>
<style scoped>
	.wrap {
		padding-bottom: 0;
	}
	
	.search {
		padding: .8rem 1.25rem;
	}
	
	.search .row {
		margin: 0.8rem 0;
	}
	
	.search .row span {
		display: inline-block;
		width: 22%;
		color: #666666;
		font-size: 1.25rem;
		text-align: left;
		/*line-height: 2.6rem;*/
	}
	
	.row .sear_input {
		width: 76%;
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
</style>