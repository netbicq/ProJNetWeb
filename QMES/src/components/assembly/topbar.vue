<template>
	<header class="topnavbar-wrapper clearfix">
		<nav class="navbar topnavbar clearfix">
			<div v-bind:class="{'navbar-header': $store.state.isCollapse, 'navbar-header1': !$store.state.isCollapse}">
				<router-link to="/casket" class='navbar-brand'>
					<div class="brand-logo" v-if="$store.state.isCollapse">
						<img src="../../../static/img/logo.png" class="img-responsive" />
					</div>
					<div class="brand-logo-collapsed" v-else>
						<img src="../../../static/img/logo-single.png" class="img-responsive" />
					</div>
				</router-link>
			</div>
			<div class="nav-wrapper">
				<ul class="menus">
					<li>
						<span @click="$store.commit('toggle')"><i class="icon iconfont icon-webicon03"></i></span>
					</li>
				</ul>
			</div>
			<div class="info">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link">
	                <i class="icon iconfont icon-touxiang"></i>
	              </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>
							<span @click="SetUpTip()">个人设置</span>
						</el-dropdown-item>
						<el-dropdown-item>
							<span @click="LogOff()">注销</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</nav>
		<el-dialog title="个人信息" :visible.sync="userTip" width="400px">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="用户管理" name="first">
					<div class="tip ">
						<el-form :label-position="labelPosition" label-width="100px">
							<el-form-item label="用户名：">
								<el-input placeholder="请输入用户名" v-model="user.Login" disabled></el-input>
							</el-form-item>
							<el-form-item label="姓名：">
								<el-input placeholder="请输入姓名" v-model="user.CNName"></el-input>
							</el-form-item>
							<el-form-item label="电话：">
								<el-input placeholder="请输入电话" v-model="user.Tel"></el-input>
							</el-form-item>
							<el-form-item label="头像上传：">
								<div class="uploads">
									<el-upload class="avatar-uploader avstars" :action="actionUrl" :show-file-list="false" :headers="myHeaders" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="user.HeadIMG" :src="Host+user.HeadIMG" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 178px;"></i>
									</el-upload>
								</div>
							</el-form-item>
						</el-form>
					</div>
				</el-tab-pane>
				<el-tab-pane label="密码修改" name="second">
					<el-form :label-position="labelPosition" label-width="100px">
						<el-form-item label="旧密码：">
							<el-input placeholder="请输入旧密码" type='password' v-model="form.oldpass"></el-input>
						</el-form-item>
						<el-form-item label="新密码：">
							<el-input placeholder="请输入新密码" type='password' v-model="form.newpass"></el-input>
						</el-form-item>
						<el-form-item label="确认新密码：">
							<el-input placeholder="请确认新密码"  type='password' v-model="form.truepass"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="账套信息" name="third">
					<el-form :label-position="labelPosition" label-width="100px">
						<el-form-item label="账套号：">
							<el-input    v-model="setOfBooks.AccountCode" disabled></el-input>
						</el-form-item>
						<el-form-item label="账套名称：">
							<el-input    v-model="setOfBooks.AccountName" disabled></el-input>
						</el-form-item>
						<el-form-item label="账套简称：">
							<el-input    v-model="setOfBooks.ShortName" disabled></el-input>
						</el-form-item>
						<el-form-item label="负责人：">
							<el-input   v-model="setOfBooks.Principal" disabled></el-input>
						</el-form-item>
						<el-form-item label="联系电话：">
							<el-input   v-model="setOfBooks.Tel" disabled></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<span slot="footer" class="dialog-footer">
                <el-button @click="userTip = false" size="small">取 消</el-button>
                <el-button type="primary" @click="SetUp()" size="small">确 定</el-button>
            </span>
		</el-dialog>
		<div style="background: rgba(0,0,0,0.5);position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index:2000;" v-if='adds1'>
		<el-dialog title="密码修改" :modal=false :visible.sync="adds1" :show-close=false :close-on-click-modal=false width="20%">
			<el-form :label-position="labelPosition" label-width="100px">
				<el-form-item label="旧密码：">
					<el-input placeholder="请输入旧密码" type='password' v-model="form.oldpass"></el-input>
				</el-form-item>
				<el-form-item label="新密码：">
					<el-input placeholder="请输入新密码" type='password' v-model="form.newpass"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码：">
					<el-input placeholder="请确认新密码"  type='password' v-model="form.truepass"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" type="primary" @click="update()">确 定</el-button>
			</span>
		</el-dialog>
		</div>
	</header>
</template>

<script>
	import store from "@/vuex/store";
	import Api from "../../axios/api";
	export default {
		name: "topBar",
		store,
		data() {
			return {
				adds1:false,
				setOfBooks:{
					'AccountCode':sessionStorage.AccountCode,
					'AccountName':sessionStorage.AccountName,
					'ShortName':sessionStorage.ShortName,
					'Principal':sessionStorage.Principal,
					'Tel':sessionStorage.Tel,
				},
				form:{
					oldpass:'',
					newpass:'',
					truepass:''
				},
				index:1,
				activeName: 'first',
				Host: Api.hostname,
				userTip: false,
				actionUrl: Api.files,
				imageUrl: "",
				labelPosition: "right",
				myHeaders: {
					token: sessionStorage.Token,
					accountid :sessionStorage.AccountID
				},
				user: {
					ID: "",
					Login: "",
					CNName: "",
					Tel: "",
					HeadIMG: ""
				},
				UserProfile: "",
				UserInfo:''
			}

		},
		created() {
			this.checkuser()
			this.UserProfile = JSON.parse(sessionStorage.UserProfile);
			this.UserInfo = JSON.parse(sessionStorage.UserInfo);
			this.user.Login = this.UserProfile.Login;
			this.user.CNName = this.UserProfile.CNName;
			this.user.Tel = this.UserProfile.Tel;
			this.user.HeadIMG = this.UserProfile.HeadIMG;
			this.user.ID = this.UserInfo.ID;
		},
		methods: {
			checkuser(){
				this.$post(Api.checkuser).then(res=>{
					if(res.state==200){
						if(res.data){
							this.$message({
			                    message: '首次登陆，请先修改密码！',
			                    type: 'warning'
			                });
						}
						this.adds1 = res.data
					}else{
						this.$message.error(res.msg);
					}
				})
			},
			handleClick(tab,event) {
				if(tab.index==1){
					this.index=2
				}else if(tab.index==2){
					this.index=3
				}else if(tab.index==0){
					this.index=1
				}
			},
			handleAvatarSuccess(res, file) {
				console.log(res);
				this.user.HeadIMG = res.data.substring(
					2,
					res.data.length
				);
				console.log(this.user.HeadIMG);
				this.$message({
					message: "上传成功",
					type: "success"
				});
			},
			beforeAvatarUpload(file) {
				this.loading = true
			    const isJPG = file.type === 'image/jpeg';
		        const isGIF = file.type === 'image/gif';
		        const isPNG = file.type === 'image/png';
		        const isBMP = file.type === 'image/bmp';
			    const isLt2M = file.size / 1024 / 1024 < 2;
			    if (!isJPG && !isGIF && !isPNG && !isBMP) {
		            this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
		        }
			    if (!isLt2M) {
			      this.$message.error('上传头像图片大小不能超过 2MB!');
			    }
		        return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
			},
			// 上传错误
			uploadError(response) {
				this.$message.error("上传头像失败！");
			},
			SetUpTip() {
				this.activeName='first'
				this.form.oldpass=''
				this.form.newpass=''
				this.userTip = true;
			},
			//个人设置
			SetUp() {
				if(this.index==1){
					if(!this.$isTel(this.user.Tel)){
				        this.$message.error('联系电话格式不正确，请输入正确的手机号或带区号的固定电话！');
				        this.user.Tel='';
				        return false;
				    }
					this.$post(Api.setprofile, {
						Login: this.user.Login,
						CNName: this.user.CNName,
						Tel: this.user.Tel,
						HeadIMG: this.user.HeadIMG
					})
					.then(res => {
						console.log(res);
						if(res.state == 200) {
							this.$message({
								message: "修改成功",
								type: "success"
							});
							sessionStorage.UserProfile = JSON.stringify(this.user);
							this.userTip = false;
						} else {
							this.userTip = false;
							this.$message.error(res.msg);
						}
					})
					.catch(function(error) {
						this.$message.error(error);
					});
				}else if(this.index==2){
					//密码修改
					this.$post(Api.changepwd, {
						"ID": this.user.ID,
						"OldPwd": this.form.oldpass,
						"Pwd": this.form.newpass
					})
					.then(res => {
						console.log(res);
						if(res.state == 200) {
							this.$message({
								message: "修改成功",
								type: "success"
							});
							this.userTip = false;
						} else {
							this.userTip = false;
							this.$message.error(res.msg);
						}
					})
				}else{
					this.userTip = false;
				}
				
			},
			//切换
			toggle() {

			},
			//注销
			LogOff(){
				this.$post(Api.exituser).then(res=>{
					if(res.state==200){
						sessionStorage.clear()
						this.$router.push({
							 path: '/'
						})
					}else{
						this.$message.error(res.msg);
					}
				})
			},
			//第一次登陆
			update(){
				//密码修改
				this.$post(Api.changepwd, {
					"ID": this.user.ID,
					"OldPwd": this.form.oldpass,
					"Pwd": this.form.newpass
				})
				.then(res => {
					if(res.state == 200) {
						this.$message({
							message: "修改成功",
							type: "success"
						});
						this.adds1 = false;
					} else {
						this.adds1 = false;
						this.$message.error(res.msg);
					}
				})
			},
		}
	};
</script>

<style>
	.topnavbar {
		border: 0;
		background-color: #23b7e5;
		background-image: -webkit-linear-gradient(left, #23b7e5 0%, #51c6ea 100%);
		background-image: -o-linear-gradient(left, #23b7e5 0%, #51c6ea 100%);
		background-image: linear-gradient(to right, #23b7e5 0%, #51c6ea 100%);
		background-repeat: repeat-x;
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF23B7E5', endColorstr='#FF51C6EA', GradientType=1);
		height: 55px;
		position: relative;
		z-index: 1050;
		overflow: hidden;
	}
	
	.img-responsive {
		display: block;
		max-width: 100%;
		height: auto;
	}
	
	.navbar-header:before,
	.navbar-header:after {
		content: " ";
		display: table;
	}
	
	.navbar-brand {
		float: left;
		font-size: 18px;
		line-height: 21px;
		height: 55px;
		box-sizing: border-box;
		width: 100%;
	}
	
	.topnavbar .navbar-header .brand-logo {
		display: block;
		padding: 10px 15px;
	}
	
	.topnavbar img {
		margin: 0 auto;
	}
	
	.navbar-header:before,
	.navbar-header:after {
		content: " ";
		display: table;
	}
	
	.navbar-header {
		width: 220px;
		float: left;
	}
	
	.navbar-header1 {
		width: 70px;
		float: left;
	}
	
	.menus {
		float: left;
	}
	
	.menus li {
		float: left;
	}
	
	.menus li span {
		color: #fff;
	}
	
	.menus li span .icon {
		font-weight: 600;
		font-size: 28px;
	}
	
	.menus>li {
		height: 55px;
		width: 42px;
		text-align: center;
	}
	
	.menus>li>span {
		padding-top: 8px;
		display: block;
		padding-bottom: 8px;
	}
	
	.menus>li>span:hover {
		color: #117391;
	}
	
	.menus>li>span:focus {
		color: #117391;
	}
	
	.info {
		float: right;
		width: 80px;
		height: 55px;
	}
	
	.info span {
		position: relative;
		display: inline-block;
		color: #ffffff;
		margin-top: 8px;
		font-size: 16px;
	}
	
	.info span .icon {
		font-size: 24px;
	}
	
	.drop {
		position: absolute;
		width: 80px;
		height: 80px;
		border: 1px solid #000;
	}
	.avstars .el-upload{
		border:1px dashed #d9d9d9;
	}
</style>