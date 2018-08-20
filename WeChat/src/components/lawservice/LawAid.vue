<template>
	<div class="container" v-loading=loading>
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>法律援助</span>
			</div>
			<div v-if='unbind' class="w25" @click="AddLegalAid">
				<span class="topsub">提交</span>
			</div>
			<div v-else="" class="w25">
				<span class="topsub">提交</span>
			</div>
		</div>
		<div class="swiper" style="margin-top: 3.3rem;">
			<img src="../../assets/yzhu_03.png" />
		</div>
		<div class="wrap">
			<div class="content">
				<div class="row clearfix">
					<label for="" class="label">姓名<span class="red">*</span></label>
					<input type="text" v-model="name" placeholder="请输入您的姓名">
				</div>
				<div class="row clearfix">
					<label for="" class="label">姓别<span class="red">*</span></label>
					<div class="radio clearfix">
						<el-radio v-model="sex" label="1">男</el-radio>
						<el-radio v-model="sex" label="0">女</el-radio>
					</div>
				</div>
				<div class="row clearfix">
					<label for="" class="label">区域<span class="red">*</span></label>
					<el-select v-model="value" placeholder="请选择" class='areas'>
						<el-option v-for="item in areas" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<div class="row clearfix">
					<label for="" class="label">身份证号码<span class="red">*</span></label>
					<input type="text" v-model="card" placeholder="请输入您的身份证号码">
				</div>
				<div class="row clearfix">
					<label for="" class="label">居住地<span class="red">*</span></label>
					<el-input type="textarea" :rows="2" class='adss' placeholder="请输入地址" v-model="adds">
					</el-input>
					<!--<div class="btn clearfix">
						<button v-bind:class="{ active: isActive==1 }" @click="fnSwitch(1)">东亭街道</button>
						<button v-bind:class="{ active: isActive==2 }" @click="fnSwitch(2)">东北塘街道</button>
						<button v-bind:class="{ active: isActive==3 }" @click="fnSwitch(3)">安镇街道</button>
						<button v-bind:class="{ active: isActive==4 }" @click="fnSwitch(4)">后桥街道</button>
						<button v-bind:class="{ active: isActive==5 }" @click="fnSwitch(5)">云林街道</button>
						<button v-bind:class="{ active: isActive==6 }" @click="fnSwitch(6)">锡北镇</button>
						<button v-bind:class="{ active: isActive==7 }" @click="fnSwitch(7)">东港镇</button>
						<button v-bind:class="{ active: isActive==8 }" @click="fnSwitch(8)">鹅湖镇</button>
						<button v-bind:class="{ active: isActive==9 }" @click="fnSwitch(9)">羊尖镇</button>
					</div>-->
				</div>
				<div class="row clearfix">
					<label for="" class="label">电话<span class="red">*</span></label>
					<input type="number" v-model="tel" placeholder="请输入您的电话">
				</div>
				<div class="row clearfix">
					<label for="" class="label">人群类别<span class="red">*</span></label>
					<el-select v-model="cate" placeholder="请选择" class='areas'>
						<el-option v-for="item in category" :key="item.value" :label="item.name" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="row clearfix">
					<label for="" class="label">身份类别<span class="red">*</span></label>
					<el-select v-model="cate1" placeholder="请选择" class='areas'>
						<el-option v-for="item in category1" :key="item.value" :label="item.name" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="row clearfix">
					<label for="" class="label">家庭收入<span class="red">*</span></label>
					<el-select v-model="money" placeholder="请选择" class='areas'>
						<el-option v-for="item in moneys" :key="item.value" :label="item.name" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="row clearfix">
					<label for="" class="label">申请事由<span class="red">*</span></label>
					<el-select v-model="liy" placeholder="请选择" class='areas'>
						<el-option v-for="item in reasons" :key="item.value" :label="item.name" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="row clearfix">
					<label for="" class="label" style="width:100%;">申请事项（不超过300字）<span class="red">*</span></label>
					<textarea name="" v-model="conten" id="" rows="3" placeholder="请输入申请事项"></textarea>
				</div>
			</div>
		</div>
		<div class="mask" v-show="Notes">
			<div class="contain">
			<div class="model">
				<p class="h1">法律援助范围</p>
				<p class="h3">1、依法请求国家赔偿的；</p>
				<p class="h3">2、请求给予社会保险待遇或者最低生活保障待遇的；</p>
				<p class="h3">3、请求发给抚恤金、救济金的；</p>
				<p class="h3">4、请求给付赡养费、抚养费、扶养费的；</p>
				<p class="h3">5、请求支付劳动报酬或者因劳动关系请求经济补偿、赔偿的；</p>
				<p class="h3">6、因身体遭受严重损害请求赔偿的；</p>
				<p class="h3">7、因遭受家庭暴力、虐待或者遗弃要求变更或者解除收养、监护关系的；</p>
				<p class="h3">8、因遭受家庭暴力、虐待或者遗弃、对方重婚或者配偶与他人同居的受害方要求离婚的；</p>
				<p class="h3">9、因被刑事立案侦查、提起公诉而请求法律咨询、代理、辩护的</p>
				<p class="h3">10、国家和省规定的其他事项</p>
				<p class="h1">获得法律援助需要具备的条件</p>
				<p class="h3">1、有合理的请求及事实依据；</p>
				<p class="h3">2、请求事项属于法律援助范围；</p>
				<p class="h3">3、因经济困难无能力承担法律服务费用。</p>
				<p class="h1">申请法律援助需要提供的材料</p>
				<p class="h3">1、身份证或者其他有效的身份证明，代理申请人还应当提交有代理权的证明；</p>
				<p class="h3">2、乡镇人民政府、街道办事处和县以上民政部门出具的申请人经济状况证明；</p>
				<p class="h3">3、与申请法律援助事项有关的案件材料。</p>
				<p class="h1">受援人在法律援助的过程中的权利义务</p>
				<p class="h3">1、了解法律援助活动的进展情况；</p>
				<p class="h3">2、有事实证明法律援助人员不依法履行职责时，可以要求法律援助机构予以更换；</p>
				<p class="h3"> 3、如实陈述案件事实与相关情况，提供有关证明和证据材料，配合法律援助人员开展法律援助；</p>
				<p class="h3">4、经济状况和案件情况发生变化时，应及时告知法律援助机构。</p>
				<p class="h1">法律援助的经济困难标准</p>
				<p class="h3">法律援助的经济困难标准按照当地人民政府规定的最低生活保障标准执行。</p>
				<p class="h3">下列人员应当被认定为经济困难无能力承担法律服务费用：</p>
				<p class="h3">(一)城市居民最低生活保障证或者农村居民最低生活保障证；</p>
				<p class="h3">(二)农村特困户救助证；</p>
				<p class="h3">(三)农村“五保”供养证；</p>
				<p class="h3">(四)人民法院给予申请人司法救助的决定；</p>
				<p class="h3">(五)在社会福利机构中由政府出资供养或者由慈善机构出资供养的证明材料；</p>
				<p class="h3">(六)残疾证及申请人住所地或者经常居住地的村民委员会、居民委员会出具的无固定生活来源的证明材料；</p>
				<p class="h3">(七)依靠政府或者单位给付抚恤金生活的证明材料；</p>
				<p class="h3">(八)因自然灾害等原因导致生活出现暂时困难，正在接受政府临时救济的证明材料；</p>
				<p class="h3">(九) 总工会核定的特困职工；</p>
				<p class="h3">(十)法律、法规及省、自治区、直辖市人民政府规定的能够证明法律援助申请人经济困难的其他证件、证明材料。</p>
				
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
		name: "LawAid",
		data() {
			return {
				loading:false,
				areas: [], //区域
				Notes: true,
				isActive: 1,
				sex: "1",
				name: '', //姓名
				card: '', //身份证号
				tel: '', //手机号
				value: '', //区域
				adds: '', //详情地址
				category: [], //类型
				category1: [], //类型
				moneys:[],//收入
				reasons:[],//申请事由
				cate:'',//选中的类型
				cate1:'',//选中的类型
				money:'',//家庭收入
				liy:'',//理由
				conten:'',//申请事项内容
				parentId:'',
				id:'',
				types:'',
				unbind:true
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {
			this.id = this.$route.params.id
			this.types = this.$route.query.type
			if(this.types){
				this.Notes = false;
			}else{
				this.Notes = true;
			}
			if(localStorage.Notes){
				this.Notes = false
			}
			this.GetAreasList()
			this.GetType()
			this.GetType1()
			this.GetType2()
			this.GetType3()
			this.GetMenuDetail()
		},
		methods: {
			//关闭遮罩
			fnCloseMask() {
				this.Notes = false;
				localStorage.Notes = false
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
			//提交
			fnSubmit() {
				this.$router.push({
					path: "/SubResult"
				});
			},
			fnSwitch(type) {
				this.isActive = type;
			},
			//法律援助
			AddLegalAid() {
				if(this.name==''){
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
				if(this.value==''){
					this.$message.error('区域不能为空');
					return false;
				}
				if(this.adds==''){
					this.$message.error('地址不能为空');
					return false;
				}
				if(this.cate==''){
					this.$message.error('人群类别不能为空');
					return false;
				}
				if(this.cate1==''){
					this.$message.error('身份类别不能为空');
					return false;
				}
				if(this.money==''){
					this.$message.error('收入不能为空');
					return false;
				}
				if(this.liy==''){
					this.$message.error('申请事由不能为空');
					return false;
				}
				if(this.conten==''){
					this.$message.error('申请事项内容不能为空');
					return false;
				}
				this.loading=true
				this.unbind = false
				this.$post(Api.AddLegalAid, {
					"name": this.name,
					"identityNo": this.card,
					"mobilePhone": this.tel,
					"district": this.value,
					"address": this.adds,
					"category": this.cate,
					'identityCategory':this.cate1,
					"familyIncome":this.money,
					"reason": this.liy,
					"content": this.conten,
					"tag": "",
					"gender": this.sex,
					"openId": localStorage.openID
				}).then(res => {
					if(res.data.success==true){
						this.loading=false
						this.$router.push({
							path: "/SubResult"
						});
					}else{
						this.loading=false
						this.unbind = true
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
			//获取类型
			GetType(){
				this.$post(Api.GetSelectionDatasByType,{
				  "type": 0
				}).then(res=>{
					if(res.status == 200) {
						this.category = res.data.result
					} else {
						this.$message.error(res.data.error);
					}
				})
			},
			//获取身份类别
			GetType3(){
				this.$post(Api.GetSelectionDatasByType,{
				  "type": 3
				}).then(res=>{
					if(res.status == 200) {
						this.category1 = res.data.result
					} else {
						this.$message.error(res.data.error);
					}
				})
			},
			GetType1(){
				this.$post(Api.GetSelectionDatasByType,{
				  "type": 1
				}).then(res=>{
					if(res.status == 200) {
						this.moneys = res.data.result
					} else {
						this.$message.error(res.data.error);
					}
				})
			},
			GetType2(){
				this.$post(Api.GetSelectionDatasByType,{
				  "type": 2
				}).then(res=>{
					if(res.status == 200) {
						this.reasons = res.data.result
					} else {
						this.$message.error(res.data.error);
					}
				})
			}
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
		font-size: 1.2rem;
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
</style>