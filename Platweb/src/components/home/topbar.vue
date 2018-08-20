<template>
	<div class="topBar clearfix">
		<div v-bind:class="{'logo': $store.state.isCollapse, 'logo1': !$store.state.isCollapse}">
			<img v-if="$store.state.isCollapse" src="../../../static/img/logo.png" alt="">
			<img v-if="!$store.state.isCollapse" src="../../../static/img/logo-single.png" alt="">
		</div>
		<div class="menus">
			<span @click="$store.commit('toggle')"></span>
		</div>
		<div class="info">
			<el-dropdown trigger="click">
				<span class="el-dropdown-link">
                <span class="icon icon-user"><i class="icon iconfont icon-touxiang"></i></span>
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
		<el-dialog title="个人管理" :visible.sync="userTip" :show-close="false" :close-on-click-modal="false" :modal="false" width="400px">
			<el-tabs v-model="activeName"  @tab-click="handleClick">
				<el-tab-pane label="信息管理" name="info">
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
                        <div class="uploads" style="width:178px">
                            <el-upload
                              class="avatar-uploader"
                              :action="actionUrl"
                              :show-file-list="false"
                              :headers="myHeaders"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload">
                              <img v-if="user.HeadIMG" :src="Host+user.HeadIMG" class="avatar">
                              <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 178px;"></i>
                            </el-upload>
                        </div>
                    	</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="密码修改" name="pass">
					<el-form :label-position="labelPosition" label-width="100px">
						<el-form-item label="用户名：">
							<el-input placeholder="请输入用户名" v-model="user.Login" disabled></el-input>
						</el-form-item>
						<el-form-item label="旧密码：">
							<el-input placeholder="请输入旧密码" v-model="user.OldPwd" type="password"></el-input>
						</el-form-item>
						<el-form-item label="新密码：">
							<el-input placeholder="请输入新密码" v-model="user.NPwd" type="password"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<span slot="footer" class="dialog-footer">
                <el-button @click="fnCancel()" size="small">取 消</el-button>
                <el-button type="primary" @click="SetUp()" size="small">确 定</el-button>
            </span>
		</el-dialog>
		<el-dialog title="修改密码" :visible.sync="editPass" :show-close="false" :close-on-click-modal="false" :modal="false" width="400px">
			<el-form :label-position="labelPosition" label-width="100px">
				<el-form-item label="用户名：">
					<el-input placeholder="请输入用户名" v-model="user.Login" disabled></el-input>
				</el-form-item>
				<el-form-item label="旧密码：">
					<el-input placeholder="请输入旧密码" v-model="user.OldPwd" type="password"></el-input>
				</el-form-item>
				<el-form-item label="新密码：">
					<el-input placeholder="请输入新密码" v-model="user.NPwd" type="password"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
                <!-- <el-button @click="userTip = false" size="small">取 消</el-button> -->
                <el-button type="primary" @click="ConEditPass()" size="small">确 定</el-button>
            </span>
		</el-dialog>
		<div class="mod" v-show="model">
		</div>
	</div>
</template>

<script>
	import store from "@/vuex/store";
	import Api from "../../axios/api";
	export default {
		name: "topBar",
		data() {
			return {
				Host: "Api.Hostname",
				userTip: false,
				editPass: false,
				actionUrl: "Api.files",
				imageUrl: "",
				labelPosition: "right",
				index:0,
				activeName: "info",
				model: false,
				myHeaders: {
					token: sessionStorage.token
				},
				form:{
					oldpass:'',
					newpass:'',
					truepass:''
				},
				user: {
					ID: "",
					Login: "",
					CNName: "",
					Tel: "",
					HeadIMG: "",
					OldPwd: "",
					NPwd: ""
				},
				UserProfile: "",
				userInfo: ""
			};
		},
		store,
		mounted() {

		},
		created() {
			this.UserProfile = JSON.parse(sessionStorage.UserProfile);
			this.UserInfo = JSON.parse(sessionStorage.UserInfo);
			this.user.Login = this.UserProfile.Login;
			this.user.CNName = this.UserProfile.CNName;
			this.user.Tel = this.UserProfile.Tel;
			this.user.HeadIMG = this.UserProfile.HeadIMG;
			this.user.ID = this.UserInfo.ID;
		},
		methods: {
			handleAvatarSuccess() {

			},
			beforeAvatarUpload() {

			},
			handleClick(tab,event) {
				console.log(tab.index)
				if(tab.index==1){
					this.index=2
				}else if(tab.index==0){
					this.index=1
				}
			},
			//个人设置弹框
			SetUpTip(){
				this.activeName='info'
				this.form.oldpass=''
				this.form.newpass=''
				this.userTip = true;
			},
			//个人设置
			SetUp() {
				if(this.index==0){
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
				}else if(this.index==1){
					//密码修改
					this.$post(Api.resetpwd, {
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
							this.$message.error(res.errmsg);
						}
					})
				}
				
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
						this.$message.error(res.errmsg);
					}
				})
			},
		}
	};
</script>

<style scoped>
	.topBar {
		height: 55px;
		background-color: #23b7e5;
		background-image: linear-gradient(90deg, #23b7e5 0, #51c6ea);
		background-repeat: repeat-x;
		border: 0;
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 1999;
		box-sizing: border-box;
		box-shadow: 0px -13px 71px #888888;
	}
	
	.menus {
		float: left;
		width: 55px;
		height: 55px;
	}
	
	.menus span {
		display: inline-block;
		width: 20px;
		height: 3px;
		border-top: 9px double #ffffff;
		border-bottom: 3px solid #ffffff;
		margin-top: 19px;
	}
	
	.logo {
		width: 200px;
		height: 100%;
		text-align: center;
		float: left;
		position: relative;
		box-sizing: border-box;
		padding: 10px 15px;
		transition: all 0.2s ease;
	}
	
	.logo1 {
		width: 70px;
		text-align: center;
		float: left;
		/*margin-right: 60px;*/
		margin-top: 7px;
		position: relative;
		transition: all 0.2s ease;
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
	
	.drop {
		position: absolute;
		width: 80px;
		height: 80px;
		border: 1px solid #000;
	}
	
	.mod {
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.5;
		position: fixed;
		z-index: 1;
	}
	
	.editpass {
		position: fixed;
		width: 400px;
		height: 325px;
		margin: auto;
		background: #fff;
		border-radius: 2px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		box-sizing: border-box;
		z-index: 2;
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