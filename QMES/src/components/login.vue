<template>
  <div class="login">
  	<a href="javascript:;" class="logo">
  		<img src="../assets/logos.png"/>
  	</a>
  	<div class="newSrc-pages-account-login-index_login-container-3oQnH">
  		<div class="newSrc-pages-account-login-index_login-left-box-248OU">
  			<h3 class="newSrc-pages-account-login-index_title-2GZid">
  				<span>丙台物联车间管理信息系统</span>
  			</h3>
  			<div class="ant-form ant-form-horizontal newSrc-pages-account-login-index_login-form-1_zAC">
  				<div class="ant-row ant-form-item">
  					<div class="ant-form-item-control-wrapper">
  						<div class="ant-form-item-control ">
  							<input type="text" class="ant-input ant-input-lg newSrc-pages-account-login-index_ant-input-2X54K" placeholder="请输入账套号" v-model="setOfBooks" id="username_or_email">
  						</div>
  					</div>
  				</div>
  				<div class="ant-row ant-form-item">
  					<div class="ant-form-item-control-wrapper">
  						<div class="ant-form-item-control ">
  							<input type="text" class="ant-input ant-input-lg newSrc-pages-account-login-index_ant-input-2X54K" placeholder="请输入登录名" v-model="loginName"  id="username_or_pass">
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
  							<el-button  @click='login()' :loading="loding" class="ant-btn newSrc-pages-account-login-index_ant-btn-1sUHl ant-btn-primary ant-btn-lg"><span>登录</span></el-button>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>
  		<div class="newSrc-pages-account-login-index_login-right-box-eUfYK">
  			<img src="../../static/img/login_compute.png"/>
  		</div>
  		
  	</div>
  	<p class="copy"><span>© 2018 上海丙台物联网科技发展有限公司  
</span></p>
  </div>
</template>

<script>
import api from '../axios/api'
import store from '@/vuex/store'
export default {
  name: 'login',
  data () {
    return {
    	loding:false,
    	setOfBooks:'',
    	loginName:'',
    	passwords:'',
    	
    }
  },
  store,
  created(){
  	this.setOfBooks=localStorage.setOfBooks
  },
  methods:{
  	//获取用户菜单
		getmenu() {
				this.$get(api.getmenu + '/' + sessionStorage.login).then((res) => {
					if(res.data.state==200){
						sessionStorage.menuList =  JSON.stringify(res.data.data)
						store.menuList =	 JSON.parse(sessionStorage.menuList) 
						this.$router.push({
							 path: '/index'
						})
					}else{
						this.$message.error(res.data.msg);
					}
				})
			},
  	login(){
  		if(this.setOfBooks==''||this.loginName==''||this.passwords==''){
					this.$message({
						message: '参数不能为空',
						type: 'warning'
					});
					return
			}
  		this.loding = true
  		this.$post(api.signin,{
			  "AccountCode":this.setOfBooks,
			  "Login": this.loginName,
			  "Pwd": this.passwords
			}).then((res)=>{
				if(res.state==200) {
					console.log(res)
					   sessionStorage.AccountID = res.data.AccountID
					   sessionStorage.Token = res.data.UserInfo.Token
					   sessionStorage.login = res.data.UserInfo.Login
					   sessionStorage.UserInfo = JSON.stringify(res.data.UserInfo);
					   sessionStorage.UserProfile = JSON.stringify(res.data.UserProfile);
						 sessionStorage.AccountCode = res.data.AccountCode
						 sessionStorage.AccountName = res.data.AccountName
						 sessionStorage.Principal = res.data.Principal
						 sessionStorage.ShortName = res.data.ShortName
						 sessionStorage.Tel = res.data.Tel
						 localStorage.setOfBooks = this.setOfBooks
						 this.getmenu()
						 
					} else {
						this.loding = false
						this.$message.error(res.msg);
					}
			})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login{
		position: absolute;
    min-width: 1140px;
    width: 100%;
    height: 100%;
    background: #fff url(../../static/img/login_bg.png) no-repeat bottom;
    background-size: cover;
	}
	.logo{
		color: #fff;
    text-decoration: none;
    font-size: 30px;
    font-weight: bold;
    display: inline-block;
    margin-left: 20px;
    margin-top: 20px;
	}
	.logo img{
		width: 120px;
    position: absolute;
    top: 30px;
    left: 30px;
	}
	.newSrc-pages-account-login-index_login-container-3oQnH{
		width: 685px;
    height: 313px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 10px 0 rgba(0,44,95,.3);
    margin: 146px auto 0;
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
	    margin-bottom: 18px;
	    color: rgba(0,0,0,.65);
	    vertical-align: top;
	}
	.ant-row:after, .ant-row:before {
    content: " ";
    display: table;
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
}
*, :after, :before {
    box-sizing: border-box;
}
.ant-row:after {
    clear: both;
    visibility: hidden;
    font-size: 0;
    height: 0;
}
.ant-row:after, .ant-row:before {
    content: " ";
    display: table;
}
.ant-form-item-control {
    line-height: 32px;
    position: relative;
    zoom: 1;
}
.ant-form-item-control:after, .ant-form-item-control:before {
    content: " ";
    display: table;
}
.ant-form-item-control:after {
    clear: both;
    visibility: hidden;
    font-size: 0;
    height: 0;
}
.ant-form-item-control:after, .ant-form-item-control:before {
    content: " ";
    display: table;
}
.ant-input {
    position: relative;
    display: inline-block;
    cursor: text;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(0,0,0,.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all .3s;
    padding: 6px 7px;
    height: 32px;
    width: 260px;
}
.ant-input:focus, .ant-input:hover {
    border-color: #49a9ee;
}
.newSrc-pages-account-login-index_login-right-box-eUfYK{
    float: right;
    width: 256px;
    margin: 33px 40px 0 0;
}
.newSrc-pages-account-login-index_login-right-box-eUfYK img{
	width: 256px;
}

.newSrc-pages-account-login-index_login-form-1_zAC .newSrc-pages-account-login-index_ant-btn-1sUHl {
    width: 260px;
    background-color: #00b2e3;
    border-color: #00b2e3;
    outline: none;
    border:none
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
