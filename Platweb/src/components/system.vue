<template>
	<div class="content-wrapper" v-loading='loading'>
		<div class="title">
			用户管理
		</div>
		<div class="content">
			<div class="panel">
				<div class="panel-heading clearfix">
					<button class="btn fl Green mini" @click="fnAddTip">新建用户</button>
					<button class="btn fl Green mini" style="margin-left:20px;" @click="fnAddAuthTip">新建角色</button>
					<div class="search clearfix fr">
						<el-input v-model="search" placeholder="请输入用户名"></el-input>
						<button class="btn Info mini" @click='filter'>查询</button>
						<!-- <button class="btn Primary mini">导出Execl</button> -->
					</div>
				</div>
			</div>
			<div class="panel">
				<div class="panel-body">
					<el-table :data="tableData" stripe style="width: 100%" align="center">
						<el-table-column type="index" width="50">
						</el-table-column>
						<el-table-column label="用户名" prop="UserInfo.Login">
						</el-table-column>
						<el-table-column label="姓名" prop="UserProfile.CNName">
						</el-table-column>
						<el-table-column label="电话" prop="UserProfile.Tel">
						</el-table-column>
						<el-table-column label="创建人" prop="UserInfo.CreateMan">
						</el-table-column>
						<el-table-column label="创建时间" prop="">
							<template slot-scope="scope">
								{{scope.row.UserInfo.CreateDate | yy}}
							</template>
						</el-table-column>
						<el-table-column prop='StateStr' label="状态" align='center'>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-dropdown size="small" trigger="click" type="primary">
									<el-button type="primary" size="small" class="Info">
										操作<i class="el-icon-arrow-down el-icon--right"></i>
									</el-button>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item>
											<button class="btn Success mini" @click="fnEditUserTip(scope.row.UserInfo.ID,scope.row.UserInfo.OtherView,scope.row.UserInfo.OtherEdit)">修改</button>
										</el-dropdown-item>
										<el-dropdown-item>
											<button class="btn Danger mini" @click="deluser(scope.row.UserInfo.ID)">删除</button>
										</el-dropdown-item>
										<el-dropdown-item>
											<button class="btn Info mini" @click="fnResetPwdTip(scope.row.UserInfo.ID)">重置</button>
										</el-dropdown-item>
										<el-dropdown-item>
											<button class="btn Purple mini" @click="fnAddUserRole(scope.row.UserInfo.Login)">角色</button>
										</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</template>
						</el-table-column>
					</el-table>
					<div class="pages">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pages" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="10" layout="sizes, prev, pager, next" :total="total" background>
						</el-pagination>
						<!-- <el-pagination small :current-page="pages" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" background>
                    </el-pagination> -->
					</div>
				</div>
			</div>
			<div class="prop">
				<el-dialog title="新建用户" :visible.sync="userTip" width="450px">
					<div>
						<el-form ref="user" :model="user" label-width="120px" class='Owners'>
							<el-form-item label="用户名：">
								<el-input v-model="user.Login" placeholder="请输入用户名" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="姓名：">
								<el-input v-model="user.CNName" placeholder="请输入姓名" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="电话：">
								<el-input v-model="user.Tel" placeholder="请输入电话" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="密码：">
								<el-input v-model="user.Pwd" type="password" placeholder="请输入密码" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="验证密码：">
								<el-input v-model="user.Pwds" type="password" placeholder="请确认密码" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="查看他人数据：">
								<el-checkbox v-model="user.checked"></el-checkbox>
							</el-form-item>
							<el-form-item label="修改他人数据：">
								<el-checkbox v-model="user.checked1"></el-checkbox>
							</el-form-item>
						</el-form>
					</div>
					<span slot="footer" class="dialog-footer">
                    <el-button   @click="userTip = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd()" size="small">确 定</el-button>
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
				<el-dialog title="修改用户" :visible.sync="editUserTip" width="450px">
					<div>
						<el-form ref="user" :model="user" label-width="120px" class='Owners'>
							<!--<el-form-item label="用户名：">
								<el-input v-model="user.Login" placeholder="请输入单位名称" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="姓名：">
								<el-input v-model="user.CNName" placeholder="请输入操作员账号" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="电话：">
								<el-input v-model="user.Tel" placeholder="请输入单位负责人" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="密码：">
								<el-input v-model="user.Pwd" placeholder="请输入负责人电话" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="验证密码：">
								<el-input v-model="user.Pwds" placeholder="请输入联系人" style="width:275px;"></el-input>
							</el-form-item>-->
							<el-form-item label="查看他人数据：">
								<el-checkbox v-model="user.checked"></el-checkbox>
							</el-form-item>
							<el-form-item label="修改他人数据：">
								<el-checkbox v-model="user.checked1"></el-checkbox>
							</el-form-item>
						</el-form>
					</div>
					<span slot="footer" class="dialog-footer">
                    <el-button   @click="editUserTip = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="conEditUser()" size="small">确 定</el-button>
                </span>
				</el-dialog>
				<el-dialog title="新建角色" :visible.sync="authTip" width="600px">
					<el-row :gutter="20">
						<el-col :span="4" style="text-align: center; line-height: 36px;"><span>角色名：</span></el-col>
						<el-col :span="16">
							<el-input v-model="role" placeholder="请输入角色名"></el-input>
						</el-col>
						<el-col :span="4">
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
						<el-col :span="17">
							<div class="panel" style="overflow: auto; height: 341px;">
								<div class="qxtop">
									<h3 style="float: left;">权限配置</h3>
									<button class="btn Danger mini" style="float: right;" @click="delRole()">删除</button>
								</div>
								<div class="">
									<el-collapse v-model="activeName" accordion>
										<el-collapse-item v-for="(item,index) in authlist" :key="index" :title="item.ModuleName" :name="index">
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
            <el-button   @click="authTip = false" size="small">取 消</el-button>
            <el-button type="primary" @click="ConfAuth()" size="small">确 定</el-button>
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
              <el-button   @click="mark4 = false" size="small">取 消</el-button>
              <el-button type="primary" @click="fnSubRole()" size="small">确 定</el-button>
            </span>
				</el-dialog>
			</div>
		</div>
	</div>
</template>
<script>
	import Api from "../axios/api";
	export default {
		name: "system",
		data() {
			return {
				loading: false,
				userTip: false, //添加弹窗
				passTip: false, //重置密码弹窗
				editUserTip: false, //修改用户弹窗
				authTip: false, //角色弹窗
				mark4: false,
				activeName: '',
				labelPosition: "right",
				pages: 1,
				total: 1,
				PageSize: 10,
				search: "",
				tableData: [],
				user: {
					Login: "",
					Pwd: "",
					Pwds: '',
					CNName: "",
					Tel: "",
					checked: false,
					checked1: false
				},
				reset: {
					Pwd: "",
					Pwds: ""
				},
				ID: "",
				id: "",
				rolename: "", //角色名
				roleList: [], //角色列表
				authlist: [], //权限列表
				role:'',
				qxpz: {
					login: ""
				}
			};
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
		mounted() {
			this.userlist(this.pages, this.search, this.PageSize)
		},
		methods: {
			//获取管理员列表
			userlist(page, inp, PageSize) {
				this.loading = true
				this.$post(Api.userlist, {
					"PageSize": PageSize,
					"PageIndex": page - 1,
					"KeyWord": inp,
					"Query": {
						"QueryKeyWord": inp
					},
					"OrderString": "",
					"ToExcel": false
				}).then(res => {
					if(res.state == 200) {
						this.loading = false
						this.tableData = res.data.Data
						this.total = res.data.Items ? res.data.Items : 1;
					} else {
						this.loading = false
						this.$message.error(res.errmsg);
					}
				})
			},
			//格式化时间
			formatter(row, column) {
				return this.$toMoment(row.UserInfo.CreateDate);
			},
			//改变显示条数
			handleSizeChange(val) {
				this.PageSize = val
				this.userlist(this.pages, this.search, this.PageSize)
			},
			//翻页
			handleCurrentChange(val) {
				this.pages = val
				this.userlist(this.pages, this.search, this.PageSize)
			},
			filter() {
				this.pages = 1
				this.userlist(this.pages, this.search, this.PageSize)
			},
			//新建弹窗
			fnAddTip() {
				this.userTip = true;
				this.user.Login = "";
				this.user.Pwd = "";
				this.user.Pwds = "";
				this.user.CNName = "";
				this.user.Tel = "";
				this.user.checked = false;
				this.user.checked1 = false;
			},
			//确认添加
			confirmAdd() {
				if(this.user.Login == '' || this.user.Pwd == '' || this.user.CNName == '' || this.user.Tel == '') {
					this.$message({
						message: '参数不能为空',
						type: 'warning'
					});
					return
				}
				if(!this.$isTel(this.user.Tel)) {
					this.$message({
						message: '请输入正确的电话',
						type: 'warning'
					});
					return
				}
				if(this.user.Pwd != this.user.Pwds) {
					this.$message({
						message: '两次密码不同，请重新输入',
						type: 'warning'
					});
					return
				}
				this.loading = true
				this.$post(Api.newuser, {
					"Login": this.user.Login,
					"Pwd": this.user.Pwd,
					"OtherView": this.user.checked,
					"OtherEdit": this.user.checked1,
					"CNName": this.user.CNName,
					"Tel": this.user.Tel
				}).then(res => {
					if(res.state == 200) {
						this.userTip = false
						this.loading = false
						this.pages = 1
						this.search = ''
						this.userlist(this.pages, this.search, this.PageSize)
					} else {
						this.loading = false
						this.$message.error(res.errmsg);
					}
				})

			},
			//添加角色弹窗
			fnAddAuthTip() {
				this.authTip = true;
				this.getrole()
			},
			//添加角色
			addRole(){
				if(this.role == ''){
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				console.log(this.role)
				this.loading = true
				this.$post(Api.addrole,{
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
						this.$message.error(res.errmsg);
					}	
				})
			},
			//为角色设置权限
			ConfAuth(){
		    	this.loading = true
				var id = this.id
				var me = this
				var RoleIDList = new Array();
				$('input[name="check"]:checked').each(function() {
					RoleIDList.push($(this).val()); //向数组中添加元素  
				});
				this.$post(Api.setauth, {
					"RoleID": id,
					"AuthKeys": RoleIDList
				}).then((res) => {
					console.log(res)
					if(res.state==200) {
						this.loading = false
						this.authTip = false;
					} else {
						this.loading = false
						this.$message.error(res.msg);
					}
				});
		   },
			fnAddUserRole(nanm) {
				this.qxpz.login = nanm;
				this.userrolesass();
				this.mark4 = true;
			},
			fnSubRole() {
				this.loading = true
				var RoleIDList = new Array();
				$('input[name="row"]:checked').each(function() {
					RoleIDList.push($(this).val()); //向数组中添加元素  
				});
				this.$post(Api.setrole, {
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
			delRole(){
				if(this.roleList.length>0){
					this.loading = true
					this.$get(Api.delrole + '/' + this.id).then((res) => {
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
			//获取角色列表2
			userrolesass() {
				this.loading = true
				var me = this
				var login = this.qxpz.login
				this.$get(Api.getrole + "/" + login).then((res) => {
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
			//获取角色列表
			getrole(){
				var me = this
				this.loading = true
				this.$get(Api.getrole+'/'+sessionStorage.login)
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
							this.$message.error(res.data.errmsg);
						}
					})
			},
			//点击角色显示权限列表
			fnJur(id) {
				this.loading = true
				var me = this
				this.id = id
				this.$get(Api.getauth + '/' + id).then((res) => {
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
			//修改
			fnEditUserTip(id, OtherView, OtherEdit) {
				this.editUserTip = true;
				this.ID = id;
				this.user.checked = OtherView;
				this.user.checked1 = OtherEdit;
			},
			//确认修改
			conEditUser() {
				this.loading = true
				this.$post(Api.edituser, {
						ID: this.ID,
						OtherView: this.user.checked,
						OtherEdit: this.user.checked1
					})
					.then(res => {
						if(res.state == 200) {
							this.$message({
								message: "修改成功",
								type: "success"
							});
							this.loading = false
							this.pages = 1
							this.search = ''
							this.userlist(this.pages, this.search, this.PageSize)
						} else {
							this.loading = false
							this.$message.error(res.errmsg);
						}
					})
				this.editUserTip = false
			},
			//重置密码弹窗
			fnResetPwdTip(id) {
				this.reset.Pwd=''
				this.reset.Pwds=''
				this.passTip = true;
				this.ID = id;
			},
			//确认重置密码
			conResetPwd() {
				if(this.reset.Pwd==''|| this.reset.Pwds=='') {
					this.$message.error("密码不能为空");
					return false;
				}
				if(this.reset.Pwd != this.reset.Pwds) {
					this.$message.error("两次输入密码不一样");
					return false;
				}
				this.loading = true;
				this.$post(Api.resetpwd, {
						ID: this.ID,
						Pwd: this.reset.Pwd
					})
					.then(res => {
						if(res.state == 200) {
							this.$message({
								message: "重置密码成功",
								type: "success"
							});
							this.pages = 1
							this.loading = false
							this.passTip = false
							this.search = ''
							this.userlist(this.pages, this.search, this.PageSize)
						} else {
							this.$message.error(res.errmsg);
						}
					})
					.catch(function(error) {
						this.loading = false;
						this.$message.error(error);
					});
				this.passTip = false;
			},
			//删除管理员
			deluser(id) {
				this.$confirm("将永久删除, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(Api.deluser + "/" + id)
							.then(response => {
								console.log(response)
								if(response.data.state == 200) {
									this.pages = 1
									this.loading = false
									this.pages = 1
									this.search = ''
									this.userlist(this.pages, this.search, this.PageSize)
									this.$message({
										message: "删除成功",
										type: "success"
									});
								} else {
									this.loading = false;
									this.$message.error(response.data.errmsg);
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
		}
	};
</script>
<style scoped>
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
		font-weight: 600;
		background-color: #fff;
		border-color: #cfdbe2;
		border-bottom: 0;
		font-size: 14px;
		/* padding: 10px 15px; */
		border-bottom: 1px solid transparent;
		border-top-right-radius: 3px;
		border-top-left-radius: 3px;
	}
	
	.qxtype>div {
		padding: 5px 15px;
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
		background-color: #b9c4d1 !important;
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