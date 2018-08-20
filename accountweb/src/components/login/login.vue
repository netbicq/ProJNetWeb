<template>
	<div class="login">
		<a href="javascript:;" class="logo"><img src="../../assets/logos.png"/></a>
		<div class="newSrc-pages-account-login-index_login-container-3oQnH">
			<div class="newSrc-pages-account-login-index_login-left-box-248OU">
				<h3 class="newSrc-pages-account-login-index_title-2GZid">
  				<span>车间计件系统管理平台</span>
  			</h3>
				<div class="ant-form ant-form-horizontal newSrc-pages-account-login-index_login-form-1_zAC">
					<!-- <div class="ant-row ant-form-item">
						<div class="ant-form-item-control-wrapper">
							<div class="ant-form-item-control ">
								<input type="text" class="ant-input ant-input-lg newSrc-pages-account-login-index_ant-input-2X54K" placeholder="请输入编号" v-model="AccountCode" id="username_or_num">
							</div>
						</div>
					</div> -->
					<div class="ant-row ant-form-item">
						<div class="ant-form-item-control-wrapper">
							<div class="ant-form-item-control ">
								<input type="text" class="ant-input ant-input-lg newSrc-pages-account-login-index_ant-input-2X54K" placeholder="请输入用户名" v-model="Login" id="username_or_email">
							</div>
						</div>
					</div>
					<div class="ant-row ant-form-item">
						<div class="ant-form-item-control-wrapper">
							<div class="ant-form-item-control ">
								<input type="password" class="ant-input ant-input-lg newSrc-pages-account-login-index_ant-input-2X54K" placeholder="请输入密码" v-model="Pwd" id="username_or_pass">
							</div>
						</div>
					</div>
					<div class="ant-row ant-form-item">
						<div class="ant-form-item-control-wrapper">
							<div class="ant-form-item-control ">
								<el-button @click='signin()' :loading="loading" class="ant-btn newSrc-pages-account-login-index_ant-btn-1sUHl ant-btn-primary ant-btn-lg"><span>登录</span></el-button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="newSrc-pages-account-login-index_login-right-box-eUfYK">
				<img src="../../../static/img/login_compute.png" />
			</div>

		</div>
		<p class="copy"><span>© 2018 上海丙台物联网科技发展有限公司  
</span></p>
	</div>
</template>

<script>
	import Api from "../../axios/api";
	export default {
		name: "login",
		data() {
			return {
				loading: false,
				Login: "",
				Pwd: "",
				state: 0,
				MenuList: []
			};
		},
		mounted() {
			let me = this;
			document.onkeydown = function(event) {
				var e = event || window.event;
				if(e && e.keyCode == 13) { //回车键的键值为13
					me.signin()
				}
			};
		},
		methods: {
			signin() {
				if(this.Login == "" || this.Pwd == "") {
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return false;
				}
				this.loading = true;
				this.$post(Api.signin, {
						Login: this.Login,
						Pwd: this.Pwd
					})
					.then(res => {
						if(res.data.state == 200) {
							sessionStorage.token = res.data.data.UserInfo.Token;
							sessionStorage.login = res.data.data.UserInfo.Login;
							sessionStorage.UserProfile = JSON.stringify(
								res.data.data.UserProfile
							);
							sessionStorage.UserInfo = JSON.stringify(res.data.data.UserInfo);
							// sessionStorage.HeadImg = res.data.data.UserProfile.HeadIMG;
							this.fnGetMenu();

						} else {
							this.loading = false;
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			fnGetMenu() {
				this.state = 0;
				this.$get(Api.getmenu + "/" + sessionStorage.login)
					.then(res => {
						if(res.data.state == 200) {
							this.MenuList = res.data.data;
							sessionStorage.MenuList = JSON.stringify(res.data.data);
							if(this.MenuList.length != 0) {
								for(let i = 0; i < this.MenuList.length; i++) {
									if(this.MenuList[i].Menu.length != 0) {
										for(let j = 0; j < this.MenuList[i].Menu.length; j++) {
											if(this.MenuList[i].Menu[j].RoutUrl != '') {
												this.$router.push({
													path: this.MenuList[i].Menu[j].RoutUrl
												});
												return false;
											} else {
												this.loading = false;
												this.$message.error('路由表中无此' + this.MenuList[i].Menu[j].RoutUrl + '地址,请检查');
											}
										}
									} else {
										this.state++
									}
								}
								if(this.state == this.MenuList.length) {
									this.loading = false;
									this.$message.error('你无权使用此系统，请联系管理员配置！');
								}
							} else {
								this.loading = false;
								this.$message.error('你无权使用此系统，请联系管理员配置！');
							}

						} else {
							this.loading = false;
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			}
		}
	};
</script>
<style scoped>
	.login {
		position: absolute;
		min-width: 1140px;
		width: 100%;
		height: 100%;
		background: #fff url(../../assets/login_bg.png) no-repeat bottom;
		background-size: cover;
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
		box-shadow: 0 4px 10px 0 rgba(0, 44, 95, 0.3);
		margin: 165px auto 0;
	}
	
	.newSrc-pages-account-login-index_login-container-3oQnH .newSrc-pages-account-login-index_login-left-box-248OU {
		float: left;
		width: 340px;
		padding: 36px 0 0 50px;
		position: relative;
	}
	
	.newSrc-pages-account-login-index_title-2GZid {
		padding-bottom: 20px;
		font-size: 18px;
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
		color: rgba(0, 0, 0, 0.65);
		vertical-align: top;
	}
	
	.ant-row:after,
	.ant-row:before {
		content: " ";
		display: table;
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
		color: rgba(0, 0, 0, 0.65);
		background-color: #fff;
		background-image: none;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		transition: all 0.3s;
		padding: 6px 7px;
		height: 32px;
		width: 260px;
	}
	
	.ant-input:hover {
		border-color: #49a9ee;
	}
	
	.ant-input:focus {
		border-color: #49a9ee;
		box-shadow: 0 0 0 2px rgb(73, 169, 238, 0.3);
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
		border: none;
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
	
	.copy {
		font-size: 12px;
		color: #fff;
		text-align: center;
		position: absolute;
		bottom: 12px;
		width: 100%;
	}
	
	.copy span {
		display: block;
		margin: 0 auto;
	}
</style>