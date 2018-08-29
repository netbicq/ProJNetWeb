<template>
	<div class="login">
		<div class="demo2">
			<a href="javascript:;" class="logo">
				<!--QMES-->
			</a>
			<div class="newSrc-pages-account-login-index_login-container-3oQnH" v-if='islogin'>
				<div class="newSrc-pages-account-login-index_login-left-box-248OU">
					<h3 class="newSrc-pages-account-login-index_title-2GZid">
  				<span>欢迎使用金井片区前期项目协调推进管理系统</span>
  			</h3>
					<div class="ant-form ant-form-horizontal newSrc-pages-account-login-index_login-form-1_zAC">
						<div class="ant-row ant-form-item">
							<div class="ant-form-item-control-wrapper">
								<div class="ant-form-item-control ">
									<input type="text" class="ant-input ant-input-lg newSrc-pages-account-login-index_ant-input-2X54K" placeholder="请输入登录名" v-model="loginName" id="username_or_pass">
								</div>
							</div>
						</div>
						<div class="ant-row ant-form-item">
							<div class="ant-form-item-control-wrapper">
								<div class="ant-form-item-control ">
									<input type="password" class="ant-input ant-input-lg newSrc-pages-account-login-index_ant-input-2X54K" placeholder="请输入密码" v-model="passwords" id="username_or_num">
								</div>
							</div>
						</div>
						<div class="ant-row ant-form-item">
							<div class="ant-form-item-control-wrapper">
								<div class="ant-form-item-control ">
									<el-button @click='login()' :loading="loding" class="ant-btn newSrc-pages-account-login-index_ant-btn-1sUHl ant-btn-primary ant-btn-lg"><span>登录</span></el-button>
								</div>
								<p class="ps">还没有账号？
									<a class="hovde" @click="regist()">注册</a>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="newSrc-pages-account-login-index_login-right-box-eUfYK">
					<img src="../../static/img/login_compute.png" />
				</div>
			</div>
			<div v-else="" class="zhuce">
				<h3>注册</h3>
				<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px" class='Owners'>
					<el-form-item label="单位名称：">
						<el-input v-model="formLabelAlign.operato" placeholder="请输入单位名称" style="width:275px;"></el-input>
					</el-form-item>
					<el-form-item label="操作员账号：">
						<el-input v-model="formLabelAlign.UnitName" placeholder="请输入操作员账号" style="width:275px;"></el-input>
					</el-form-item>
					<el-form-item label="操作员密码：">
						<el-input v-model="formLabelAlign.passwords" placeholder="请输入操作员密码" type='password' style="width:275px;"></el-input>
					</el-form-item>
					<el-form-item label="单位负责人：">
						<el-input v-model="formLabelAlign.UnitHead" placeholder="请输入单位负责人" style="width:275px;"></el-input>
					</el-form-item>
					<el-form-item label="负责人电话：">
						<el-input v-model="formLabelAlign.UnitTel" placeholder="请输入负责人电话" style="width:275px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人：">
						<el-input v-model="formLabelAlign.contacts" placeholder="请输入联系人" style="width:275px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人电话：">
						<el-input v-model="formLabelAlign.contacTel" placeholder="请输入联系人电话" style="width:275px;"></el-input>
					</el-form-item>
					<el-form-item style="">
						<el-button type="primary" @click="register()" style="width: 100%;height: 41px;">注册</el-button>
					</el-form-item>
				</el-form>
				<p class="ps">已有账号？
					<a class="hovde" @click="Login()">登陆</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Api from "../axios/api";
	import store from '@/vuex/store'
	export default {
		name: 'login',
		data() {
			return {
				loding: false,
				setOfBooks: '',
				loginName: '',
				passwords: '',
				islogin: true,
				formLabelAlign: {
					UnitName: '', //单位名称
					operato: '', //操作员账号
					UnitHead: '', //单位负责人
					UnitTel: '', //负责人电话
					contacts: '', //联系人
					contacTel: '', //联系人电话
					passwords: '', //密码
				}, //添加表单
			}
		},
		store,
		created() {

		},
		methods: {
			//获取用户菜单
			getmenu() {
				this.$get(Api.getmenu + '/' + sessionStorage.login).then((res) => {
					if(res.data.state == 200) {
						sessionStorage.menuList = JSON.stringify(res.data.data)
						store.menuList = JSON.parse(sessionStorage.menuList)
						this.$router.push({
							path: '/Dashboard'
						})
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			//清空登录
			regist() {
				this.loginName = ''
				this.passwords = ''
				this.islogin = false;
			},
			//清空注册
			Login() {
				this.formLabelAlign.UnitName = '' //单位名称
				this.formLabelAlign.operato = '' //操作员账号
				this.formLabelAlign.UnitHead = '' //单位负责人
				this.formLabelAlign.UnitTel = '' //负责人电话
				this.formLabelAlign.contacts = '' //联系人
				this.formLabelAlign.contacTel = '' //联系人电话
				this.formLabelAlign.passwords = '' //密码
				this.islogin = true;
			},
			register() {
				if(this.formLabelAlign.UnitName == '' || this.formLabelAlign.passwords == '' || this.formLabelAlign.operato == '' || this.formLabelAlign.contacts == '' || this.formLabelAlign.contacTel == '' || this.formLabelAlign.UnitHead == '' || this.formLabelAlign.UnitTel == '') {
					this.$message({
						message: '参数不能为空',
						type: 'warning'
					});
					return
				}
				if(!this.$isTel(this.formLabelAlign.contacTel)) {
					this.$message({
						message: '请输入正确的联系人电话',
						type: 'warning'
					});
					return
				}
				if(!this.$isTel(this.formLabelAlign.UnitTel)) {
					this.$message({
						message: '请输入正确的负责人电话',
						type: 'warning'
					});
					return
				}
				this.loadings = true
				this.$post(Api.reguser, {
					"Login": this.formLabelAlign.UnitName,
					"Pwd": this.formLabelAlign.passwords,
					"OwnerName": this.formLabelAlign.operato,
					"SitePrincipal": "",
					"SitePrincipalTEL": "",
					"SiteLink": "",
					"SiteLinkTEL": "",
					"Handler": this.formLabelAlign.contacts,
					"HandlerTEL": this.formLabelAlign.contacTel,
					"Principal": this.formLabelAlign.UnitHead,
					"PrincipalTEL": this.formLabelAlign.UnitTel,
					"Leader": "",
					"LeaderTEL": ""
				}).then(res => {
					if(res.state == 200) {
						this.$message({
							message: '注册成功',
							type: 'success'
						});
						window.location.reload()
					} else {
						this.loading = false
						this.$message.error(res.errmsg);
					}
				})
			},
			//用户登入
			login() {
				if(this.loginName == '' || this.passwords == '') {
					this.$message({
						message: '参数不能为空',
						type: 'warning'
					});
					return
				}
				this.loding = true
				this.$post(Api.signin, {
					"Login": this.loginName,
					"Pwd": this.passwords
				}).then(res => {
					console.log(res)
					if(res.state == 200) {
						sessionStorage.Token = res.data.UserInfo.Token
						sessionStorage.login = res.data.UserInfo.Login
						sessionStorage.UserInfo = JSON.stringify(res.data.UserInfo);
						sessionStorage.UserProfile = JSON.stringify(res.data.UserProfile);
						sessionStorage.Check = res.data.Check
						sessionStorage.Start = res.data.Start
						this.getmenu()
					} else {
						this.loding = false
						this.$message.error(res.errmsg);
					}
				})

			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login {
		position: absolute;
		min-width: 1140px;
		width: 100%;
		height: 100%;
		background: #fff url(../../static/img/11.jpg) no-repeat bottom;
		background-size: cover;
	}
	
	.demo2 {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%; 
		background:rgba(255, 255, 255, 0.7);
	}
	
	.logo {
		color: #fff;
		text-decoration: none;
		font-size: 30px;
		font-weight: bold;
		display: inline-block;
		margin-left: 20px;
		margin-top: 20px;
	}
	
	.logo img {
		width: 120px;
		position: absolute;
		top: 30px;
		left: 30px;
	}
	
	.newSrc-pages-account-login-index_login-container-3oQnH {
		width: 685px;
		height: 313px;
		border-radius: 8px;
		background-color: #fff;
		box-shadow: 0 4px 10px 0 rgba(0, 44, 95, .3);
		margin: 146px auto 0;
	}
	
	.newSrc-pages-account-login-index_login-container-3oQnH .newSrc-pages-account-login-index_login-left-box-248OU {
		float: left;
		width: 360px;
		padding: 36px 0 0 50px;
		position: relative;
	}
	
	.newSrc-pages-account-login-index_title-2GZid {
		padding-bottom: 24px;
		font-size: 15px;
		color: #515666;
		font-weight: 400;
	}
	
	.ant-row {
		position: relative;
		margin-left: 0;
		margin-right: 0;
		height: auto;
		zoom: 1;
		display: block;
	}
	
	.ant-form-item {
		font-size: 12px;
		margin-bottom: 20px;
		color: rgba(0, 0, 0, .65);
		vertical-align: top;
	}
	
	.ant-row:after,
	.ant-row:before {
		content: " ";
		display: table;
	}
	
	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 1000px white inset !important;
	}
	
	*,
	 :after,
	 :before {
		box-sizing: border-box;
	}
	
	.ant-row:after {
		clear: both;
		visibility: hidden;
		font-size: 0;
		height: 0;
	}
	
	.ant-row:after,
	.ant-row:before {
		content: " ";
		display: table;
	}
	
	.ant-form-item-control {
		line-height: 32px;
		position: relative;
		zoom: 1;
	}
	
	.ant-form-item-control:after,
	.ant-form-item-control:before {
		content: " ";
		display: table;
	}
	
	.ant-form-item-control:after {
		clear: both;
		visibility: hidden;
		font-size: 0;
		height: 0;
	}
	
	.ant-form-item-control:after,
	.ant-form-item-control:before {
		content: " ";
		display: table;
	}
	
	.ant-input {
		position: relative;
		display: inline-block;
		cursor: text;
		font-size: 12px;
		line-height: 1.5;
		color: rgba(0, 0, 0, .65);
		background-color: #fff;
		background-image: none;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		transition: all .3s;
		padding: 6px 7px;
		height: 32px;
		width: 260px;
	}
	
	.ant-input:focus,
	.ant-input:hover {
		border-color: #49a9ee;
	}
	
	.newSrc-pages-account-login-index_login-right-box-eUfYK {
		float: right;
		width: 256px;
		margin: 33px 40px 0 0;
	}
	
	.newSrc-pages-account-login-index_login-right-box-eUfYK img {
		width: 256px;
	}
	
	.newSrc-pages-account-login-index_login-form-1_zAC .newSrc-pages-account-login-index_ant-btn-1sUHl {
		width: 260px;
		background-color: #00b2e3;
		border-color: #00b2e3;
		outline: none;
		border: none
	}
	
	.ant-btn-primary {
		color: #fff;
		background-color: #108ee9;
		border-color: #108ee9;
	}
	
	.ant-btn-lg {
		padding: 0 15px;
		font-size: 14px;
		border-radius: 4px;
		height: 32px;
	}
	
	.hovde {
		text-decoration: underline;
		cursor: pointer;
	}
	
	.zhuce {
		background: #fff;
		width: 420px;
		margin: auto;
		padding: 15px;
		padding-left: 25px;
		transform: translateY(30%);
		box-shadow: 0 4px 10px 0 rgba(0, 44, 95, .3);
		border-radius: 8px;
	}
	
	.zhuce h3 {
		text-align: center;
		font-size: 30px;
		margin-bottom: 10px;
	}
</style>