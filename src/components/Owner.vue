<template>
	<div v-loading='loadings'>

		<div class="title">
			业主管理
		</div>
		<div>
			<div class="panel">
				<div class="panel-heading clearfix">
					<button class="btn fl Green mini" @click="adds">新建用户</button>
					<button style="margin-left: 15px;" class="btn fl Warning mini" v-if='Messagew' @click="meggse">群发按钮</button>
					<div class="search clearfix fr">
						<el-input v-model="search" placeholder="请输入单位名称"></el-input>
						<button class="btn Info mini" @click='filter' style="margin-bottom: 2px;">查询</button>
					</div>
				</div>
			</div>
		</div>
		<div class="panel">
			<el-table :data="tableData5" style="width: 100%">
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column label="单位名称" prop="OwnerInfo.OwnerName">
				</el-table-column>
				<el-table-column label="申请日期" prop="">
					<template slot-scope="scope">
						{{scope.row.OwnerInfo.RegDate | yy}}
					</template>
				</el-table-column>
				<el-table-column label="操作员账号" prop="OwnerInfo.Login">
				</el-table-column>
				<el-table-column label="项目负责人" prop="OwnerInfo.Principal">
				</el-table-column>
				<el-table-column label="项目负责人电话" prop="OwnerInfo.PrincipalTEL">
				</el-table-column>
				<el-table-column label="具体责任人" prop="OwnerInfo.Handler">
				</el-table-column>
				<el-table-column label="具体责任人电话" prop="OwnerInfo.HandlerTEL">
				</el-table-column>
				<el-table-column label="状态" prop="StateStr">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown size="small" trigger="click" type="primary">
							<el-button type="primary" size="small" class="Info">
								操&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 作<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<button class="btn Success mini" @click="fnEditUserTip(scope.row.OwnerInfo.OwnerName,scope.row.OwnerInfo.Handler,scope.row.OwnerInfo.HandlerTEL,scope.row.OwnerInfo.Principal,scope.row.OwnerInfo.PrincipalTEL,scope.row.OwnerInfo.ID)">修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 改</button>
								</el-dropdown-item>
								<el-dropdown-item>
									<button class="btn Danger mini" @click="fnDelUser(scope.row.OwnerInfo.ID)">删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 除</button>
								</el-dropdown-item>
								<el-dropdown-item>
									<button class="btn Purple mini" @click="fnAddUserRole(scope.row.OwnerInfo.ID)">审核通过</button>
								</el-dropdown-item>
								<!--<el-dropdown-item>
									<button class="btn Info mini" @click="fnResetPwdTip(scope.row.OwnerInfo.ID)">重置密码</button>
								</el-dropdown-item>-->
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>
			<div class="pages">
				<el-pagination @size-change="handleSizeChange" :page-sizes="[10,20,30,40,50]" :page-size="pagesizs" :current-page="pages" @current-change="handleCurrentChange" layout="sizes,prev, pager, next" :total="total" background>
				</el-pagination>
			</div>
		</div>
		<el-dialog title="账号新建" :visible.sync="add" width="454px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="130px" class='Owners'>
				<el-form-item label="单位名称：">
					<el-input v-model="formLabelAlign.operato" placeholder="请输入单位名称" style="width:275px;"></el-input>
				</el-form-item>
				<el-form-item label="操作员账号：">
					<el-input v-model="formLabelAlign.UnitName" placeholder="请输入操作员账号" style="width:275px;"></el-input>
				</el-form-item>
				<el-form-item label="操作员密码：">
					<el-input v-model="formLabelAlign.passwords" placeholder="请输入操作员密码" type='password' style="width:275px;"></el-input>
				</el-form-item>
				<el-form-item label="项目负责人：">
					<el-input v-model="formLabelAlign.UnitHead" placeholder="项目负责人" style="width:275px;"></el-input>
				</el-form-item>
				<el-form-item label="项目负责人电话：">
					<el-input v-model="formLabelAlign.UnitTel" placeholder="项目负责人电话" style="width:275px;"></el-input>
				</el-form-item>
				<el-form-item label="具体责任人：">
					<el-input v-model="formLabelAlign.contacts" placeholder="具体责任人" style="width:275px;"></el-input>
				</el-form-item>
				<el-form-item label="具体责任人电话：">
					<el-input v-model="formLabelAlign.contacTel" placeholder="具体责任人电话" style="width:275px;"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="add = false">取 消</el-button>
			<el-button size="small" type="primary" @click="confirm()">确 定</el-button>
		</span>
		</el-dialog>
		<el-dialog title="账号修改" :visible.sync="edits" width="454px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="130px" class='Owners'>
				<el-form-item label="单位名称：">
					<el-input v-model="formLabelAlign.UnitName" placeholder="请输入单位名称" style="width:275px;"></el-input>
				</el-form-item>
				<el-form-item label="项目负责人：">
					<el-input v-model="formLabelAlign.UnitHead" placeholder="项目负责人" style="width:275px;"></el-input>
				</el-form-item>
				<el-form-item label="项目负责人电话：">
					<el-input v-model="formLabelAlign.UnitTel" placeholder="项目负责人电话" style="width:275px;"></el-input>
				</el-form-item>
				<el-form-item label="具体责任人：">
					<el-input v-model="formLabelAlign.contacts" placeholder="具体责任人" style="width:275px;"></el-input>
				</el-form-item>
				<el-form-item label="具体责任人电话：">
					<el-input v-model="formLabelAlign.contacTel" placeholder="具体责任人电话" style="width:275px;"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="edits = false">取 消</el-button>
			<el-button size="small" type="primary" @click="modify()">确 定</el-button>
		</span>
		</el-dialog>
		<el-dialog title="密码重置" :visible.sync="pass" width="424px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px" class='Owners'>
				<el-form-item label="设置密码：">
					<el-input v-model="passwords" placeholder="请输入密码" style="width:275px;"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="pass = false">取 消</el-button>
			<el-button size="small" type="primary" @click="reset()">确 定</el-button>
		</span>
		</el-dialog>
		<el-dialog title="群发短信" :visible.sync="masStext" width="424px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="60px" class='Owners'>
				<el-form-item label="月度：">
					<el-date-picker v-model="montes" type="month" placeholder="选择月" style="width:315px;" format="yyyy 年 MM 月 " value-format="yyyy-MM">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="masStext = false">取 消</el-button>
			<el-button size="small" type="primary" @click="GroupSMS()">确 定</el-button>
		</span>
		</el-dialog>
	</div>

</template>
<script>
	import Api from "../axios/api";
	export default {
		name: 'Owner',
		data() {
			return {
				montes: '',
				masStext: false,
				loadings: false,
				tableData5: [],
				search: '', //搜索
				add: false, //增加弹框
				edits: false, //修改弹框
				pass: false, //重置密码
				formLabelAlign: {
					UnitName: '', //单位名称
					operato: '', //操作员账号
					UnitHead: '', //单位负责人
					UnitTel: '', //负责人电话
					contacts: '', //联系人
					contacTel: '', //联系人电话
					passwords: '', //密码
				}, //添加表单
				pagesizs: 10, //每页显示多少条
				total: 1, //总条数
				pages: 1, //页码
				passwords: '', //重置密码
				ID: '',
				Messagew:false
			}
		},
		created() {
			this.Messagew = sessionStorage.Messagew === 'true' ? true : false
			this.getlist(this.pagesizs, this.pages, this.search)
		},
		methods: {
			//群发弹框
			meggse() {
				this.montes=''
				this.masStext = true
			},
			//群发短信
			GroupSMS() {
				if(this.montes==''){
					this.$message({
						message: '参数不能为空',
						type: 'warning'
					});
					return
				}
				this.loadings=true
				this.$get(Api.allsend+'/'+this.montes).then(res=>{
					if(res.data.state==200){
						this.$message({
							message: "通知成功",
							type: "success"
						});
						this.loadings=false
					}else{
						this.loadings = false
						this.$message.error(res.data.errmsg);
					}
				})
			},
			//获取业主列表
			getlist(pagesizs, pages, search) {
				this.loadings = true
				this.$post(Api.ownergetlist, {
					"PageSize": pagesizs,
					"PageIndex": pages - 1,
					"KeyWord": search,
					"Query": search,
					"OrderString": "",
					"ToExcel": false
				}).then(res => {
					console.log(res)
					if(res.state == 200) {
						this.loadings = false
						this.tableData5 = res.data.Data
						this.total = res.data.Items ? res.data.Items : 1;
					} else {
						this.loadings = false
						this.$message.error(res.errmsg);
					}
				})
			},
			//添加弹框
			adds() {
				this.formLabelAlign.UnitName = '' //单位名称
				this.formLabelAlign.operato = '' //操作员账号
				this.formLabelAlign.UnitHead = '' //单位负责人
				this.formLabelAlign.UnitTel = '' //负责人电话
				this.formLabelAlign.contacts = '' //联系人
				this.formLabelAlign.contacTel = '' //联系人电话
				this.formLabelAlign.passwords = '' //密码
				this.add = true
			},
			//确定添加
			confirm() {
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
				this.$post(Api.news, {
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
						this.pages = 1
						this.add = false
						this.loadings = false
						this.search == ''
						this.getlist(this.pagesizs, this.pages, this.search)
						this.$message({
							message: "添加成功",
							type: "success"
						});
					} else {
						this.loadings = false
						this.add = false
						this.$message.error(res.errmsg);
					}
				})

			},
			//修改弹框
			fnEditUserTip(oName, Handler, HandlerTEL, Principal, PrincipalTEL, id) {
				this.formLabelAlign.UnitName = oName //单位名称
				this.formLabelAlign.UnitHead = Principal //单位负责人
				this.formLabelAlign.UnitTel = PrincipalTEL //负责人电话
				this.formLabelAlign.contacts = Handler //联系人
				this.formLabelAlign.contacTel = HandlerTEL //联系人电话
				this.id = id
				this.edits = true
			},
			//确定修改
			modify() {
				if(this.formLabelAlign.UnitName == '' || this.formLabelAlign.contacts == '' || this.formLabelAlign.contacTel == '' || this.formLabelAlign.UnitHead == '' || this.formLabelAlign.UnitTel == '') {
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
				this.$post(Api.edit, {
					"ID": this.id,
					"OwnerName": this.formLabelAlign.UnitName,
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
						this.edits = false
						this.loadings = false
						this.getlist(this.pagesizs, this.pages, this.search)
						this.$message({
							message: "修改成功",
							type: "success"
						});
					} else {
						this.loadings = false
						this.edits = false
						this.$message.error(res.errmsg);
					}
				})
				this.edits = false
			},
			//重置密码弹框
			fnResetPwdTip(id) {
				this.ID = id
				this.pass = true
			},
			//确认重置密码
			reset() {
				if(this.passwords == '') {
					this.$message.error("密码不能为空");
					return false;
				}
				this.loading = true
				this.$post(Api.resetpwd, {
						ID: this.ID,
						Pwd: this.passwords
					})
					.then(res => {
						if(res.state == 200) {
							this.$message({
								message: "重置密码成功",
								type: "success"
							});
							this.pages = 1
							this.pass = false
							this.loading = false
							this.search == ''
							this.getlist(this.pagesizs, this.pages, this.search)
						} else {
							this.pass = false
							this.loading = true
							this.$message.error(res.errmsg);
						}
					})
					.catch(function(error) {
						this.loading = false;
						this.$message.error(error);
					});

			},
			fnAddUserRole(id) {
				this.$get(Api.yamm + '/' + id).then(res => {
					console.log(res)
					if(res.data.state == 200) {
						this.loading = false
						this.getlist(this.pagesizs, this.pages, this.search)
					} else {
						this.loading = true
						this.$message.error(res.data.errmsg);
					}
				})
			},
			//删除
			fnDelUser(id) {
				this.$confirm("将永久删除, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(Api.del + "/" + id)
							.then(response => {
								console.log(response)
								if(response.data.state == 200) {
									this.loadings = false
									this.getlist(this.pagesizs, this.pages, this.search)
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
			//改变显示条数
			handleSizeChange(val) {
				this.pagesizs = val
				this.getlist(this.pagesizs, this.pages, this.search)
			},
			//翻页
			handleCurrentChange() {
				this.pages = val
				this.getlist(this.pagesizs, this.pages, this.search)
			},
			filter() {
				this.pages = 1
				this.getlist(this.pagesizs, this.pages, this.search)
			}

		},
	}
</script>

<style scoped="">
	.demo-table-expand {
		font-size: 0;
	}
	
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>