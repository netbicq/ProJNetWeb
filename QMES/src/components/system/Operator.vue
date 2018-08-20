<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">系统管理</span>
			<span class="h2">操作员管理</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<span>操作员管理:</span>
				<el-button type="primary" size="small" @click="add()">添加用户</el-button>
				<el-button type="primary" size="small" @click="addrole()">添加角色</el-button>
				<div class="fr">
					<el-input v-model="inputs" placeholder="请输入用户名" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="userData" style="width: 100%">
				<el-table-column type="index" width="60" align='center'>
				</el-table-column>
				<el-table-column label="用户名" align='center'>
					<template slot-scope='scope'>
						{{scope.row.UserProfile?scope.row.UserProfile.Login:''}}
					</template>
				</el-table-column>
				<el-table-column label="姓名" align='center'>
					<template slot-scope='scope'>
						{{scope.row.UserProfile?scope.row.UserProfile.CNName:''}}
					</template>
				</el-table-column>
				<el-table-column label="电话" align='center'>
					<template slot-scope='scope'>
						{{scope.row.UserProfile?scope.row.UserProfile.Tel:''}}
					</template>
				</el-table-column>
				<el-table-column prop='StateStr' label="状态" align='center'>
				</el-table-column>
				<el-table-column label="操作" align='center' s>
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<el-button size="small" type="success" @click="edit(scope.row.UserInfo.ID,scope.row.UserInfo.OtherView,scope.row.UserInfo.OtherEdit)">修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="danger" @click="del(scope.row.UserInfo.ID)">删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</el-button>
								</el-dropdown-item>
								<el-dropdown-item v-if="scope.row.State==2">
									<el-button type="primary" size="small" @click="">关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;闭</el-button>
								</el-dropdown-item>
								<el-dropdown-item v-if="scope.row.State==3">
									<el-button type="primary" size="small" @click="">开&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;启</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="info" @click="fnResetPwdTip(scope.row.UserInfo.ID)">重置密码</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="warning" @click.native.prevent="authority(scope.row.UserInfo.Login)">权&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;限</el-button>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>
			<div class="pages">
				<el-pagination small :current-page="pages" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" background>
				</el-pagination>
			</div>
		</div>
		<el-dialog title="添加用户" :visible.sync="adduse" width="500px">
			<div>
				<el-form :label-position="labelPosition" label-width="110px" :model="formLabelAlign">
					<el-form-item label="用户名">
						<el-input v-model="formLabelAlign.login"></el-input>
					</el-form-item>
					<el-form-item label="姓名">
						<el-input v-model="formLabelAlign.cName"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="formLabelAlign.pass" type='password'></el-input>
					</el-form-item>
					<el-form-item label="验证密码">
						<el-input v-model="formLabelAlign.rpass" type='password'></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input v-model="formLabelAlign.tel"></el-input>
					</el-form-item>
					<el-form-item label="查看他人数据：">
						<el-checkbox v-model="formLabelAlign.checked"></el-checkbox>
					</el-form-item>
					<el-form-item label="修改他人数据：">
						<el-checkbox v-model="formLabelAlign.checked1"></el-checkbox>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="adduse = false" size="small">取 消</el-button>
		    <el-button type="primary" @click="addUser()" size="small">确 定</el-button>
		  </span>
		</el-dialog>

		<el-dialog title="修改用户" :visible.sync="editUserTip" width="400px">
			<div>
				<el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
					<el-form-item label="查看他人数据：">
						<el-checkbox v-model="formLabelAlign.checked"></el-checkbox>
					</el-form-item>
					<el-form-item label="修改他人数据：">
						<el-checkbox v-model="formLabelAlign.checked1"></el-checkbox>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
                    <el-button   @click="editUserTip = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="conEditUser()" size="small">确 定</el-button>
                </span>
		</el-dialog>
		<el-dialog title="重置密码" :visible.sync="passTip" width="400px">
			<div>
				<el-form :label-position="labelPosition" label-width="100px" :model="reset">
					<el-form-item label="新密码：">
						<el-input v-model="reset.Pwd" type="password" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item label="验证密码：">
						<el-input v-model="reset.Pwds" type="password" placeholder="请重新输入密码"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
                    <el-button   @click="passTip = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="conResetPwd()" size="small">确 定</el-button>
                </span>
		</el-dialog>
		
		
		<el-dialog title="新建角色" :visible.sync="Mark2" width="800px">
			<el-row :gutter="20">
				<el-col :span="6" style="text-align: center; line-height: 36px;"><span>角色名：</span></el-col>
				<el-col :span="15">
					<el-input v-model="role" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="3">
					<el-button type="primary" @click="addRole()">添加</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="20" style="margin-top: 20px;">
				<el-col :span="7">
					<div class="qxleft">
						<h3 class="rowl">角色</h3>
						<div style="height: 300px;overflow:auto;" id="jiaose">
							<button type="button" class="list-group-item" :value="item.Role.ID" ref="name" v-for="(item,index) in roleList" @click="fnJur(item.Role.ID)">{{item.Role.RoleName}}</button>
						</div>
					</div>
				</el-col>
				<el-col :span="17" style="height: 341px;">
					<div class="panel"  style="overflow: auto; height: 341px;">
                <div class="qxtop">
                  <h3 style="float: left;">权限配置</h3>
                  <el-button type="danger"  size="mini" style="float: right;margin-top: 5px;" @click="delUse()">删除</el-button>
                </div>
                <div class="">
                  <el-collapse v-model="activeName" accordion>
                    <el-collapse-item  v-for="(item,index) in authlist" :key="index" :title="item.ModuleName" :name="index">
                        <div v-for="(items,index) in item.AuthMenus" :key="index" class="panel">
                          <div class="qxtype-title">{{items.MenuName}}</div>
                          <div>
                              <div class="checkbox c-checkbox needsclick">
                                <el-checkbox-group v-model="itemm.Checked" v-for="(itemm,index) in items.AuthFuncS" :key="index" class="divlist">
                                  <el-checkbox :label="itemm.AuthFunc.AuthKey" name="check" :value="itemm.AuthFunc.AuthKey" :checked="itemm.Checked">{{itemm.AuthFunc.FunctionName}}</el-checkbox>
                                </el-checkbox-group>
                              </div>
                          </div>
                        </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>
				</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="Mark2 = false">取 消</el-button>
				<el-button type="primary" @click="autl()">确 定</el-button>
			</span>
		</el-dialog>
		
		<el-dialog title="权限配置" :visible.sync="mark4" width="500px">
			<el-form ref="qxpz" :model="qxpz" label-width="100px">
				<el-form-item label="操作员：">
					<el-input v-model="qxpz.login" placeholder="" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<div class="qxpzbox">
				<p class="qx-title">角色</p>
				<div>
					<p class="qx-title" v-for="item in roleList">
						<el-checkbox-group v-model="item.Checked">
							<el-checkbox :label="item.Role.ID" name="row" :value="item.Role.ID" :checked="item.Checked">{{item.Role.RoleName}}</el-checkbox>
						</el-checkbox-group>
					</p>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="mark4 = false">取 消</el-button>
				<el-button type="primary" @click="fnSubRole()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import api from '../../axios/api'
	export default {
		name: 'operator',
		data() {
			return {
				activeName:'',
				mark4:false,
				Mark2:false,
				authlist:[],
				roleList:[],
				role:'',
				reset: {
					Pwd: "",
					Pwds: ""
				},
				passTip: false,
				editUserTip: false,
				loading: false,
				labelPosition: 'left',
				adduse: false,
				inputs: '',
				pages: 1,
				total: 1,
				userData: [{
					Login: 'admin',
					CNName: 'admin',
					Tel: 132984365,
					UserTypeStr: '管理员',
					StateStr: '正常'
				}, ],
				formLabelAlign: {
					login: '',
					cName: '',
					pass: '',
					rpass: '',
					tel: '',
					checked: true,
					checked1: false,
				},
				ID: '',
				id:'',
				qxpz: {
					login: ""
				},
			}
		},
		created() {
			this.userlist(this.pages, this.inputs)
		},
		updated: function() {
			this.$nextTick(function() {
				//点击添加样式
				var list = document.getElementsByClassName("list-group-item");
				for(var i = 0; i < list.length; i++) {
					list[i].onclick = function() {
						for(var j = 0; j < list.length; j++) {
							list[j].className = "list-group-item"
						}
						this.className = "list-group-item act"
					}
				};
			});
		},
		methods: {
			//获取用户列表
			userlist(pages, ints) {
				this.loading = true
				this.$post(api.userlist, {
					"PageSize": 10,
					"PageIndex": pages - 1,
					"KeyWord": ints,
					"Query": {
						"QueryKeyWord": ints
					},
					"OrderString": "",
					"ToExcel": false
				}).then((res) => {
					console.log(res)
					if(res.state == 200) {
						this.loading = false
						this.userData = res.data.Data
						this.total = res.data.Items ? res.data.Items : 1;
					} else {
						this.loading = false
						this.$message.error(res.msg);
					}
				})
			},
			//搜索
			filter() {
				this.pages = 1
				this.userlist(this.pages, this.inputs)
			},
			//分页
			handleCurrentChange(val) {
				this.pages = val
				this.userlist(this.pages, this.inputs)
			},
			//添加用户
			add() {
				this.formLabelAlign.login = ''
				this.formLabelAlign.cName = ''
				this.formLabelAlign.pass = ''
				this.formLabelAlign.rpass = ''
				this.formLabelAlign.tel = ''
				this.formLabelAlign.checked = true
				this.formLabelAlign.checked1 = false
				this.adduse = true
			},
			//确认添加用户
			addUser() {
				if(this.formLabelAlign.login == '' || this.formLabelAlign.pass == '' || this.formLabelAlign.cName == '' || this.formLabelAlign.tel == '') {
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				if(this.formLabelAlign.pass !== this.formLabelAlign.rpass) {
					this.$message({
						message: "两次输入的密码不同",
						type: "warning"
					});
					return;
				}
				if(!this.$isTel(this.formLabelAlign.tel)){
			        this.$message.error('联系电话格式不正确，请输入正确的手机号或带区号的固定电话！');
			        this.formLabelAlign.tel='';
			        return false;
			    }
				this.$post(api.newuser, {
					"Login": this.formLabelAlign.login,
					"Pwd": this.formLabelAlign.pass,
					"OtherView": this.formLabelAlign.checked,
					"OtherEdit": this.formLabelAlign.checked1,
					"CNName": this.formLabelAlign.cName,
					"Tel": this.formLabelAlign.tel
				}).then((res) => {
					if(res.state == 200) {
						this.pages = 1
						this.inputs == ''
						this.adduse = false
						this.$message({
								message: "添加成功",
								type: "success"
						});
						this.userlist(this.pages, this.inputs)
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			//修改弹框
			edit(id, OtherView, OtherEdit) {
				this.editUserTip = true
				this.ID = id;
				this.formLabelAlign.checked = OtherView;
				this.formLabelAlign.checked1 = OtherEdit;
			},
			//确认修改用户
			conEditUser() {
				this.editUserTip = false;
				this.$post(api.edituser, {
						ID: this.ID,
						OtherView: this.formLabelAlign.checked,
						OtherEdit: this.formLabelAlign.checked1
					})
					.then(res => {
						if(res.state == 200) {
							this.$message({
								message: "修改成功",
								type: "success"
							});
							this.userlist(this.pages, this.inputs)
						} else {
							this.$message.error(res.msg);
						}
					})
					.catch(function(error) {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//删除
			del(id) {
				this.$confirm("将永久删除, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.deluser + "/" + id)
							.then(response => {
								if(response.data.state == 200) {
									this.loading = false
									this.userlist(this.pages, this.inputs)
									this.$message({
										message: "删除成功",
										type: "success"
									});
								} else {
									this.loading = false;
									this.$message.error(response.data.msg);
								}
							})
							.catch(err => {
								this.loading = false;
							});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},
			//重置
			//重置密码弹窗
			fnResetPwdTip(id) {
				this.passTip = true;
				this.ID = id;
			},
			//确认重置密码
			conResetPwd() {
				if(this.reset.Pwd != this.reset.Pwds) {
					this.$message.error("两次输入密码不一样");
					return false;
				}
				this.loading = true;
				this.$post(api.resetpwd, {
						ID: this.ID,
						Pwd: this.reset.Pwd
					})
					.then(res => {
						if(res.state == 200) {
							this.$message({
								message: "重置密码成功",
								type: "success"
							});
							this.loading = false
							this.passTip = false
							this.userlist(this.pages, this.inputs)
						} else {
							this.$message.error(res.msg);
						}
					})
					.catch(function(error) {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//获取角色列表
			getrole(){
				var me = this
				this.loading = true
				this.$get(api.getrole+'/'+sessionStorage.login)
					.then((res)=>{
						console.log(res)
						if(res.data.state==200) {
						this.loading = false
						res.data.data.RoleList = res.data.data.Roles ? res.data.data.Roles : [{}]
						this.roleList = res.data.data.RoleList
						console.log(this.roleList)
						setTimeout(function() {
							$("#jiaose button").eq(0).addClass("act").siblings().removeClass("act")
							this.id = $("#jiaose button").eq(0).val()
							if(this.id){
								me.fnJur(this.id)
							}
							}, 0)
						} else {
							this.loading = false
							this.$message.error(res.data.msg);
						}
					})
			},
			//添加角色弹框
			addrole(){
				this.Mark2 = true
				this.getrole()
			},
			//添加角色
			addRole(){
				if(this.role==''){
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading = true
				this.$post(api.addrole,{
				  "RoleName": this.role
				}).then(res=>{
					console.log(res)
					if(res.state==200){
						this.loading = false
						this.$message({
							message: '新建成功',
							type: 'success'
						});
						this.getrole()
						this.role = ""
					}else{
						this.loading = false
						this.$message.error(res.msg);
					}	
				})
			},
			//为角色设置权限
			autl(){
		    	this.loading = true
				var id = this.id
				var me = this
				var RoleIDList = new Array();
				$('input[name="check"]:checked').each(function() {
					RoleIDList.push($(this).val()); //向数组中添加元素  
				});
				this.$post(api.setauth, {
					"RoleID": id,
					"AuthKeys": RoleIDList
				}).then((res) => {
					console.log(res)
					if(res.state==200) {
						this.loading = false
						this.Mark2 = false;
					} else {
						this.loading = false
						this.$message.error(res.msg);
					}
				});
		    },
			
			//权限弹框
			authority(nanm){
				this.qxpz.login = nanm;
				this.userrolesass();
				this.mark4 = true
			},
			//获取角色列表2
			userrolesass() {
				this.loading = true
				var me = this
				var login = this.qxpz.login
				this.$get(api.getrole + "/" + login).then((res) => {
					console.log(res)
					if(res.data.state==200) {
						this.loading = false
						this.roleList = res.data.data.Roles ? res.data.data.Roles : [{}]
					} else {
						this.loading = false
						this.$message.error(res.data.msg);
					}
				});
			},
			//提交权限配置
		    fnSubRole(){
				this.loading = true
				var RoleIDList = new Array();
				$('input[name="row"]:checked').each(function() {
					RoleIDList.push($(this).val()); //向数组中添加元素  
				});
				this.$post(api.setrole, {
					"Login": this.qxpz.login,
					"RoleID": RoleIDList
				}).then((res) => {
					console.log(res)
					if(res.state==200) {
						this.loading = false
						this.$message({
							message: '提交成功',
							type: 'success'
						});
						this.userrolesass();
						this.mark4 = false
					} else {
						this.loading = false
						this.$message.error(res.msg);
					}
				});
		    },
			//点击角色显示权限列表
			fnJur(id) {
				this.loading = true
				var me = this
				this.id = id
				this.$get(api.getauth + '/' + id).then((res) => {
					console.log(res)
					if(res.data.state==200) {
						this.loading = false
						res.data.data = res.data.data ? res.data.data : [{}]
						me.authlist = res.data.data
					} else {
						this.loading = false
						this.$message.error(res.data.msg);
					}
				});
			},
			//删除角色
			delUse() {
				if(this.roleList.length>0){
					this.loading = true
					this.$get(api.delrole + '/' + this.id).then((res) => {
						console.log(res)
						if(res.data.state==200) {
							this.loading = false
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getrole()
							if(this.roleList.length==1){
								this.authlist=[]
							}
						} else {
							this.loading = false
							this.$message.error(res.data.msg);
						}
					});
				}
			},
		}
	}
</script>
<style scoped="">
.rowl {
		color: #fff;
		background-color: #5d9cec;
		border-color: #cfdbe2;
		padding: 10px 0;
		text-indent: 15px;
	}
	
	.list-group-item {
		position: relative;
		display: block;
		padding: 10px 0px;
		text-align: left;
		text-indent: 15px;
		margin-bottom: -1px;
		background-color: #fff;
		border: 1px solid #e4eaec;
		width: 100%;
		cursor: pointer;
	}
	
	.qxleft {
		border: 1px solid #cfdbe2;
	}
	
	.panel {
		border: 1px solid #cfdbe2;
		padding: 10px;
		box-sizing: border-box;
		border: 1px solid #cfdbe2;
  border-radius: 4px;
  background-color: #fff;
  border-top-width: 3px;
  margin-bottom: 21px;
  margin-left: 15px;
  margin-right: 15px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
	}
	
	.qxtop {
		height: 36px;
		line-height: 36px;
		margin-bottom: 15px;
	}
	
	.qxtype {
		border: 1px solid #cfdbe2;
		border-color: #cfdbe2;
		border-top-width: 3px;
		margin-bottom: 21px;
		background-color: #fff;
		border-radius: 4px;
		-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		padding: 10px;
	}
	
	.qxtype-title {
		color: #444;
		background-color: #fff;
		border-color: #cfdbe2;
		border-bottom: 0;
		font-size: 14px;
		padding: 10px 15px;
		border-bottom: 1px solid transparent;
		border-top-right-radius: 3px;
		border-top-left-radius: 3px;
	}
	
	.qxtype>div {
		padding: 15px;
		margin-bottom: 21px;
		background-color: #fff;
		border: 1px solid transparent;
		border-radius: 4px;
		-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		border-top-width: 3px;
		border-color: #cfdbe2;
	}
	.act {
		background-color: #B9C4D1!important;
	}
	
	.qxpzbox {
		max-height: 240px;
		overflow: auto;
		border: 1px solid #cfdbe2;
		border-top-width: 3px;
		border-color: #cfdbe2;
		margin-bottom: 21px;
		background-color: #fff;
		border-radius: 4px;
		-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		padding: 15px;
	}
	
	.qx-title {
		margin-bottom: 15px;
	}
	
	.check {
		vertical-align: middle;
		margin-right: 5px;
		width: 15px;
		height: 15px;
	}
</style>