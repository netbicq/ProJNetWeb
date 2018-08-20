<template>
	<div class="container" v-loading="loading">
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>人民调解</span>
			</div>
			<div v-if="unbind" class="w25" @click="AddLegalAid">
				<span class="topsub">提交</span>
			</div>
			<div v-else="" class="w25">
				<span class="topsub">提交</span>
			</div>
		</div>
		<div class="swiper" style="margin-top: 3.3rem;">
			<img src="../../assets/3333_03.png" alt="">
		</div>
		<div class="wrap">
			<div class="content">
				<p style="color: #39589e;font-weight: 600;font-size: 1.5rem; text-align: left;">申请人信息</p>
				<div class="row clearfix">
					<label for="" class="label">姓名<span class="red">*</span></label>
					<input type="text" v-model="name" placeholder="请输入您的姓名">
				</div>
				<div class="row clearfix">
					<label for="" class="label">身份证号码<span class="red">*</span></label>
					<input type="text" v-model="card" placeholder="请输入您的身份证号码">
				</div>
				<div class="row clearfix">
					<label for="" class="label">手机号<span class="red">*</span></label>
					<input type="number" v-model="tel" placeholder="请输入您的电话">
				</div>
				<div class="row clearfix">
					<label for="" class="label">区域<span class="red">*</span></label>
					<el-select v-model="value" placeholder="请选择" class='areas'>
						<el-option v-for="item in areas" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<div class="row clearfix">
					<label for="" class="label">地址<span class="red">*</span></label>
					<el-input type="textarea" :rows="2" class='adss' placeholder="请输入地址" v-model="adds">
					</el-input>
				</div>
				<div class="row clearfix">
					<label for="" class="label">申请事由<span class="red">*</span></label>
					<el-select v-model="liy" placeholder="请选择" class='areas'>
						<el-option v-for="item in areas1" :key="item.value" :label="item.name" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="row clearfix">
					<label for="" class="label" style="width:100%;">申请事项（不超过300字）<span class="red">*</span></label>
					<textarea name="" v-model="conten" id="" rows="3" placeholder="请输入申请事项"></textarea>
				</div>
			</div>
			<div class="content" style="margin-top: 1rem;">
				<p style="color: #39589e;font-weight: 600;font-size: 1.5rem; text-align: left;">调解对象信息</p>
				<div class="row clearfix">
					<label for="" class="label">对方姓名</label>
					<input type="text" v-model="oName" placeholder="请输入您的姓名">
				</div>
				<div class="row clearfix">
					<label for="" class="label">对方电话</label>
					<input type="number" v-model="oTel" placeholder="请输入您的电话">
				</div>
				<div class="row clearfix">
					<label for="" class="label">对方地址</label>
					<el-input type="textarea" :rows="2" class='adss' placeholder="请输入地址" v-model="oAdds">
					</el-input>
				</div>
				<div class="row clearfix">
					<label for="" class="label">同意调解</label>
					<div class="radio clearfix">
						<el-checkbox v-model="checked"></el-checkbox>
					</div>
				</div>
				
			</div>
		</div>
		<div class="mask" v-show="Notes">
			<div class="contain">
			<div class="model" >
				<h4>调解工作原则</h4>　　　  　　　
<p>1、在当事人自愿、平等的基础上进行调解；</p>
<p>2、不违背法律、法规和国家政策；</p>
<p>3、尊重当事人的权利，不得因调解而阻止当事人依法通过仲裁、行政、司法等途径维护自己的权利。</p>
<h4>调解工作纪律</h4>　　　　  　　　
<p>人民调解员在调解工作中应遵守下列工作纪律：</p>
<p>1、不得偏袒一方当事人；</p>
<p>2、不得侮辱当事人；</p>
<p>3、不得索取、收受财物或者牟取其他不正当利益；</p>
<p>4、不得泄露当事人的个人隐私、商业秘密。</p>
<h4>当事人权利</h4>
<p>1、选择或者接受人民调解员；</p>
<p>2、接受调解、拒绝调解或者要求终止调解；</p>
<p>3、要求调解公开进行或者不公开进行；</p>
<p>4、自主表达意愿、自愿达成调解协议。</p>
<h4>当事人义务</h4>
<p>1、如实陈述纠纷事实；</p>
<p>2、遵守调解现场秩序，尊重人民调解员；</p>
<p>3、尊重对方当事人行使权利。</p>

<h4>矛盾纠纷受理范围</h4>
<p>人民调解委员会主要受理公民与公民之间、公民与法人或其他组织之间的民事争议纠纷；公民、法人或其他组织与行政机关之间的行政争议纠纷；适用调解方式解决的轻微刑事纠纷。以下调委会不予受理：</p>
<p>1、不宜适用调解方式解决的涉及刑事内容的矛盾纠纷；</p>
<p>2、法律、法规规定只能由专门机关管辖处理或者法律、法规禁止采用调解方式解决的矛盾纠纷；</p>
<p>3、司法机关、行政机关已经受理或者解决的矛盾纠纷；</p>
<p>4、纠纷当事人一方拒绝采用调解方式解决的矛盾纠纷；</p>
<p>5、其他不宜由调委会调处的矛盾纠纷。</p>
<h4 style="margin-bottom: 3rem;">人民调解工作流程</h4>
				<img src="../../assets/222.png" width="100%"/>
				
			</div>
			<div class="btn">
				<button @click="fnCloseMask">我知道了</button>
			</div>
			</div>
		</div>

	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "compose",
		data() {
			return {
				Notes:true,
				loading:false,
				areas: [], //区域
				value: '', //区域
				name: '', //己方姓名
				card: '', //己方身份证号
				tel: '', //己方手机号
				adds: '', //详情地址
				oName: '', //对方姓名
				oTel: '', //对方电话
				oAdds: '', //对方地址
				conten: '',
				liy: '',
				checked: true,
				areas1:[],
				unbind:true
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {
			this.id = this.$route.params.id
			if(this.$route.query.type){
				this.Notes = false;
			}else{
				this.Notes = true;
			}
			if(localStorage.Notes1){
				this.Notes = false
			}
			this.GetAreasList()
			this.GetMenuDetail()
			this.GetSelectionDatasByType()
		},
		methods: {
			//关闭遮罩
			fnCloseMask() {
				this.Notes = false;
				localStorage.Notes1 = false
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
			AddLegalAid() {
				if(this.name == '') {
					this.$message.error('请输入姓名');
					return false;
				}
				if(!this.$isCard(this.card)) {
					this.$message.error('身份证号输入有误，请输入正确的身份证号');
					this.card = '';
					return false;
				}
				if(!this.$isTel(this.tel)) {
					this.$message.error('联系电话格式不正确，请输入正确的手机号!');
					this.tel = '';
					return false;
				}
				if(this.value == '') {
					this.$message.error('区域不能为空');
					return false;
				}
				if(this.adds == '') {
					this.$message.error('地址不能为空');
					return false;
				}
				if(this.liy == '') {
					this.$message.error('申请事由不能为空');
					return false;
				}
				if(this.conten == '') {
					this.$message.error('申请事项内容不能为空');
					return false;
				}
				if(this.oTel!=''){
					if(!this.$isTel(this.oTel)) {
						this.$message.error('对方联系电话格式不正确，请输入正确的手机号!');
						this.oTel = '';
						return false;
					}
				}
				this.loading= true
				this.unbind=false
				this.$post(Api.AddPeopleMediation, {
					"name": this.name,
					"identityNo": this.card,
					"mobilePhone": this.tel,
					"district": this.value,
					"address": this.adds,
					"reason": this.liy,
					"content": this.conten,
					"otherPartyName": this.oName,
					"otherPartyTelephone": this.oTel,
					"otherPartyAddress": this.oAdds,
					"openId": localStorage.openID,
					"isOtherPartyAgree": this.checked
				}).then(res => {
					if(res.data.success == true) {
						this.$router.push({
							path: "/SubResult"
						});
					} else {
						this.unbind=true
						this.loading= false
						this.$message.error(res.data.error);
					}
				})
			},
			//获取区域列表
			GetAreasList() {
				this.$post(Api.GetDistricts).then(res => {
					if(res.status == 200) {
						this.areas = res.data.result.items
					} else {
						this.$message.error(res.data.error);
					}
				})
			},
			//获取申请事由
			GetSelectionDatasByType(){
				this.$post(Api.GetSelectionDatasByType,{
				  "type": 2
				}).then(res => {
					if(res.status == 200) {
						this.areas1 = res.data.result
					} else {
						this.$message.error(res.data.error);
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
	
	.mask .contain {
		background-color: #ffffff;
		border-radius: .8rem;
		width: 100%;
		height: 100%;
		overflow: auto;
		box-sizing: border-box;
		padding: .8rem;
	}
	.mask .contain .model{
		margin-bottom: 30px;
		overflow: auto;
		height: 92%;
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
	
	.mask .btn {
		width: 100%;
		margin: .8rem 0;
		position: fixed;
		bottom: 5%;
		left: 0;
	}
	
	.mask .btn button {
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
	
	.wrap .row {
		width: 100%;
		line-height: 3.3rem;
		border-bottom: 1px solid #c9c9ca;
		color: #606266;
	}
	
	.wrap .row:last-child {
		border-bottom: none;
	}
	
	.wrap .row .label {
		display: inline-block;
		width: 8.3rem;
		float: left;
		text-align: left;
		font-size: 1.3rem;
		color: #5a5959;
	}
	
	.wrap .row .radio {
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
	
	.wrap .row input {
		box-sizing: border-box;
		width: calc(100% - 9rem);
		height: 2.5rem;
		border-radius: .4rem;
		outline: none;
		border: none;
		font-size: 1.25rem;
		color: #606266
	}
	
	.wrap .row select {
		box-sizing: border-box;
		width: calc(100% - 9rem);
		height: 2.5rem;
		border-radius: .4rem;
		outline: none;
		border: none;
		font-size: 1.3rem;
	}
	
	.wrap .row .btn button {
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
	
	.wrap .row .btn button.active {
		color: #fff!important;
		background-color: #39589e!important;
	}
	
	.wrap .row textarea {
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
	.model h4{
		font-size: 1.2rem;
	    color: #595757;
	    text-align: center;
	    font-weight: 600;
	    line-height: 4rem;
	}
	.model p{
		font-size: 1.1rem;
	    color: #333;
	    text-align: left;
	    text-indent: 2rem;
	    line-height: 2rem;
	}
</style>