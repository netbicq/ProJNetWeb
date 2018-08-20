<template>
	<div class="content-wrapper" v-loading="loading">
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
						<button class="btn Info mini" @click="fnSearch">查询</button>
						<!-- <button class="btn Primary mini">导出Execl</button> -->
					</div>
				</div>
			</div>
			<div class="panel">
				<div class="panel-body">
					<el-table :data="tableData" stripe style="width: 100%" align="center">
						<el-table-column type="index" width="50">
						</el-table-column>
						<el-table-column prop="UserProfile.Login" label="用户名" sortable>
						</el-table-column>
						<el-table-column prop="UserProfile.CNName" label="姓名">
						</el-table-column>
						<el-table-column prop="UserProfile.Tel" label="电话" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="UserInfo.CreateMan" label="创建人">
						</el-table-column>
						<el-table-column prop="UserInfo.CreateDate" label="创建时间" :formatter="formatter" sortable show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="StateStr" label="状态">
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
											<button class="btn Danger mini" @click="fnDelUser(scope.row.UserInfo.ID)">删除</button>
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
				<el-dialog title="新建用户" :visible.sync="userTip" width="400px">
					<div>
						<el-form :label-position="labelPosition" label-width="120px" :model="user">
							<el-form-item label="用户名：">
								<el-input v-model="user.Login" placeholder="请输入用户名"></el-input>
							</el-form-item>
							<el-form-item label="密码：">
								<el-input v-model="user.Pwd" type="password" placeholder="请输入密码"></el-input>
							</el-form-item>
							<el-form-item label="验证密码：">
								<el-input v-model="user.Pwds" type="password" placeholder="请再次输入密码"></el-input>
							</el-form-item>
							<el-form-item label="姓名：">
								<el-input v-model="user.CNName" placeholder="请输入姓名"></el-input>
							</el-form-item>
							<el-form-item label="电话：">
								<el-input v-model="user.Tel" placeholder="请输入电话"></el-input>
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
				<el-dialog title="修改用户" :visible.sync="editUserTip" width="400px">
					<div>
						<el-form :label-position="labelPosition" label-width="120px" :model="user">
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
				<el-dialog title="新建角色" :visible.sync="authTip" width="600px" v-loading="loading1">
					<el-row :gutter="20">
						<el-col :span="4" style="text-align: center; line-height: 36px;"><span>角色名：</span></el-col>
						<el-col :span="16">
							<el-input v-model="rolename" placeholder="请输入角色名"></el-input>
						</el-col>
						<el-col :span="4">
							<button class="btn Primary mini" @click="addRole()">添加</button>
						</el-col>
					</el-row>
					<el-row :gutter="20" style="margin-top: 20px;">
						<el-col :span="7">
							<div class="qxleft">
								<h3 class="rowl">角色</h3>
								<div style="height: 300px;overflow:auto;" id="jiaose">
									<button type="button" class="list-group-item" :value="item.Role.ID" ref="name" v-for="(item,index) in roleList.Roles" :key="index" @click="fnJur(item.Role.ID)">{{item.Role.RoleName}}</button>
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
							<p class="qx-title" v-for="(item,index) in roleList.Roles" :key="index">
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
	import Api from "../../axios/api";
	export default {
		name: "system",
		data() {
			return {
				loading1: false,
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
				qxpz: {
					login: ""
				}
			};
		},
		mounted() {
			this.getData(this.pages, this.search);
		},
		updated: function() {
			this.$nextTick(function() {
				//点击添加样式
				var list = document.getElementsByClassName("list-group-item");
				for(var i = 0; i < list.length; i++) {
					list[i].onclick = function() {
						for(var j = 0; j < list.length; j++) {
							list[j].className = "list-group-item";
						}
						this.className = "list-group-item act";
					};
				}
			});
		},
		methods: {
			//格式化时间
			formatter(row, column) {
				return this.$toMoment(row.UserInfo.CreateDate);
			},
			//每页显示的条数
			handleSizeChange(val) {
				this.PageSize = val;
				this.getData(this.pages, this.search);
			},
			//查询
			fnSearch() {
				this.pages = 1;
				this.getData(this.pages, this.search);
			},
			//分页
			handleCurrentChange(val) {
				this.pages = val;
				this.getData(this.pages, this.search);
			},
			getData(page, val) {
				this.loading = true;
				this.$post(Api.getuserlist, {
						PageSize: this.PageSize,
						PageIndex: page - 1,
						KeyWord: val,
						Query: {
							QueryKeyWord: val
						},
						OrderString: "",
						ToExcel: false
					})
					.then(res => {
						this.loading = false;
						if(res.data.state == 200) {
							this.tableData = res.data.data.Data;
							this.total = res.data.data.Items ? res.data.data.Items : 1;
						} else {
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
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
				switch(this.$isNull(this.user)) {
					case 'Login':
						this.$message.error('用户名不能为空');
						return;
					case 'Pwd':
						this.$message.error('密码不能为空');
						return;
					case 'Pwds':
						this.$message.error('验证密码不能为空');
						return;
					case 'CNName':
						this.$message.error('姓名不能为空');
						return;
					case 'Tel':
						this.$message.error('电话号码不能为空');
						return;
					default:
						// console.log(this.$isNull(this.user))
				}

				if(this.user.Pwd != this.user.Pwds) {
					this.$message.error('两次输入密码不一样');
					return false;
				}
				if(!this.$isTel(this.user.Tel)) {
					this.$message.error('联系电话格式不正确，请输入正确的手机号或带区号的固定电话！');
					this.user.Tel = '';
					return false;
				}
				this.userTip = false;
				this.loading = true;
				this.$post(Api.addnew, {
						Login: this.user.Login,
						Pwd: this.user.Pwd,
						OtherView: this.user.checked,
						OtherEdit: this.user.checked1,
						CNName: this.user.CNName,
						Tel: this.user.Tel
					})
					.then(res => {
						this.loading = false;
						if(res.data.state == 200) {
							this.$message({
								message: "添加成功",
								type: "success"
							});
							this.getData(this.pages, this.search);
						} else {
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//重置密码弹窗
			fnResetPwdTip(id) {
				this.passTip = true;
				this.ID = id;
			},
			//确认重置密码
			conResetPwd() {
				if(this.reset.Pwd == "" || this.reset.Pwds == "") {
					this.$message({
						message: "密码不能为空",
						type: "warning"
					});
					return false;
				}
				if(this.reset.Pwd != this.reset.Pwds) {
					this.$message.error("两次输入密码不一样");
					return false;
				}
				this.passTip = false;
				this.loading = true;
				this.$post(Api.resetpwd, {
						ID: this.ID,
						Pwd: this.reset.Pwd
					})
					.then(res => {
						this.loading = false;
						if(res.data.state == 200) {
							this.$message({
								message: "重置密码成功",
								type: "success"
							});

							this.getData(this.pages, this.search);
						} else {
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//删除用户
			fnDelUser(id) {
				this.$confirm("将执行删除操作, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(Api.deluser + "/" + id)
							.then(res => {
								this.loading = false;
								if(res.data.state == 200) {
									this.$message({
										message: "删除成功",
										type: "success"
									});
									this.getData(this.pages, this.search);
								} else {
									this.$message.error(res.data.msg);
								}
							})
							.catch(error => {
								this.loading = false;
								this.$message.error(error);
							});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},
			//修改用户弹窗
			fnEditUserTip(id, OtherView, OtherEdit) {
				this.editUserTip = true;
				this.ID = id;
				this.user.checked = OtherView;
				this.user.checked1 = OtherEdit;
			},
			//确认修改用户
			conEditUser() {
				this.loading = true;
				this.editUserTip = false;
				this.$post(Api.edituser, {
						ID: this.ID,
						OtherView: this.user.checked,
						OtherEdit: this.user.checke1
					})
					.then(res => {
						this.loading = false;
						if(res.data.state == 200) {
							this.$message({
								message: "修改成功",
								type: "success"
							});
							this.getData(this.pages, this.search);
						} else {
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//添加角色弹窗
			fnAddAuthTip() {
				this.authTip = true;
				this.fnGetRole();
			},
			//添加角色
			addRole() {
				if(this.rolename == '') {
					this.$message.error('角色名不能为空');
					return false;
				}
				this.loading1 = true;
				this.$post(Api.addrole, {
						RoleName: this.rolename
					})
					.then(res => {
						this.loading1 = false;
						if(res.data.state == 200) {
							this.$message({
								message: "添加成功",
								type: "success"
							});
							this.rolename == ''
							this.fnGetRole();
						} else {
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading1 = false;
						this.$message.error(error);
					});
			},
			//获取角色
			fnGetRole() {
				this.loading1 = true;
				let me = this;
				this.$get(Api.getrole + "/" + sessionStorage.login)
					.then(res => {
						this.loading1 = false;
						if(res.data.state == 200) {
							this.roleList = res.data.data;
							setTimeout(function() {
								$("#jiaose button")
									.eq(0)
									.addClass("act")
									.siblings()
									.removeClass("act");
								me.id = $("#jiaose button")
									.eq(0)
									.val();
								if(me.id) {
									me.fnJur(me.id);
								}
							}, 0);
						} else {
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading1 = false;
						this.$message.error(error);
					});
			},
			//点击角色显示权限列表
			fnJur(id) {
				this.loading1 = true;
				let me = this;
				this.id = id;
				this.$get(Api.getauth + "/" + this.id)
					.then(res => {
						if(res.data.state == 200) {
							this.loading1 = false;
							me.authlist = res.data.data;
							this.activeName = ''
						} else {
							this.loading1 = false;
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.loading1 = false;
						this.$message.error(error);
					});
			},
			//删除角色
			delRole() {
				this.loading1 = true;
				let me = this;
				this.$get(Api.delrole + "/" + this.id)
					.then(res => {
						if(res.data.state == 200) {
							this.loading1 = false;
							this.fnGetRole();
							me.authlist = res.data.data;
						} else {
							this.loading1 = false;
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.loading1 = false;
						this.$message.error(error);
					});
			},
			//设置角色权限
			ConfAuth() {
				let me = this;
				let RoleIDList = new Array();
				$('input[name="check"]:checked').each(function() {
					RoleIDList.push($(this).val()); //向数组中添加元素
				});

				this.loading1 = true;
				this.$post(Api.setrauth, {
						RoleID: this.id,
						AuthKeys: RoleIDList
					})
					.then(res => {
						this.authTip = false;
						if(res.data.state == 200) {
							this.loading1 = false;
							this.$message({
								message: "设置成功",
								type: "success"
							});
							// location.reload() 
						} else {
							this.loading1 = false;
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading1 = false;
						this.loading = false;
						this.$message.error(error);
					});
			},
			//打开用户角色弹窗
			fnAddUserRole(name) {
				this.qxpz.login = name;
				this.mark4 = true;
				this.$get(Api.getrole + "/" + name)
					.then(res => {
						if(res.data.state == 200) {
							this.roleList = res.data.data;
						} else {
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//为用户设置角色
			fnSubRole() {
				let RoleIDList = new Array();
				$('input[name="row"]:checked').each(function() {
					RoleIDList.push($(this).val()); //向数组中添加元素
				});
				this.mark4 = false;
				this.loading = true;
				this.$post(Api.seturole, {
						Login: this.qxpz.login,
						RoleID: RoleIDList
					})
					.then(res => {
						if(res.data.state == 200) {
							this.loading = false;
							this.$message({
								message: "设置成功",
								type: "success"
							});
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