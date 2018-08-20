<template>
	<div class="container">
		<div class="head-img">
			<img src="../assets/head_03.png" alt=""/>
		</div>
		<div class="login-top">
			<img src="../assets/icon/ico3x-02.png"/>
			<p>锡山区智慧法务系统</p>
		</div>
		<div class="loginBox">
			<input  placeholder="请输入用户名" v-model="names">
			</input>
			<input  placeholder="请输入密码" type="password" v-model="passwords">
			</input>
		</div>
		<div class="loginBtns">
			<el-button @click='authenticate' style='width: 100%;background: #38589f;' type="primary">登陆</el-button>
		</div>
		<router-link to="/" class='backIndex'>返回首页</router-link>
	</div>
</template>
<script>
	import Api from "../kites/api";
	export default {
		name: "login",
		data() {
			return {
				names:'',
				passwords:'',
				fromUrl:''
			};
		},
		mounted() {},
	  	beforeRouteEnter (to, from, next) {
	       console.log(to)
	       console.log(from)
	       localStorage.fromUrl = from.path
	       next();
    	},
		created() {
		},
		methods: {
			//获取token
			authenticate(){
				if(this.names==''||this.passwords==''){
					this.$message({
						message: '用户名或密码不能为空',
						type: 'warning'
					});
					return false;
				}
				this.$post(Api.authenticate,{
				  "openId": localStorage.openID,
				  "username": this.names,
				  "password": this.passwords,
				}).then(res=>{
					console.log(res)
					if(res.data.success==true){
						localStorage.token = res.data.result.token
						localStorage.userName = this.names
						localStorage.userPass = this.passwords
						localStorage.userType = res.data.result.userType
						this.$router.push({
							 path: localStorage.fromUrl
						})
					}else{
						this.$message.error(res.data.error.message);
					}
				})
			},
		}
	};
</script>
<style scoped>
	.login-top{
		margin-top: 3rem;
	}
	.login-top img{
		width: 35%;
	}
	.login-top p{
		text-align: center;
		margin-top: 1.5rem;
		color: #38589f;
		font-size: 1.5rem;
		font-weight: 600;
	}
	.loginBox{
		border: 1px solid #b5b5b7;
		border-left: none;
		border-right: none;
		margin-top: 2rem;
		background: #fff;
	}
	.loginBox input{
		width: 100%;
		display: block;
		border: none;
		outline: none;
		line-height: 4rem;
		height: 4rem;
		display: block;
		text-indent: 4.5rem;
	}
	.loginBox input:nth-of-type(1){
		border-bottom: 1px solid #b5b5b7;
		background: url(../assets/rem_03.png) no-repeat 20px center;
		background-size: 20px 20px;
	}
	.loginBox input:nth-of-type(2){
		border-bottom: 1px solid #b5b5b7;
		background:url(../assets/suo_07.png) no-repeat 20px center;
		background-size: 18px 24px
	}
	.loginBtns{
		margin: auto;
		margin-top: 3rem;
		width: 90%;
		
	}
	.backIndex{
		display: block;
		margin-top: 1rem;
		color: #333;
		font-size: 1rem;
	}
</style>