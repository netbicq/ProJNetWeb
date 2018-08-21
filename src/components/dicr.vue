<template>
	<div class="content-wrapper" v-loading='loading'>
		<div class="title">
			关键字管理
		</div>
		<div class="content">
			<div class="panel">
				<div class="panel-heading clearfix">
					<button class="btn fl Green mini" @click='newDic'>添加关键字</button>
					<div class="clearfix fl" style="margin-left: 15px;margin-bottom: 1px;">
						<span>关键字类型:</span>
						<el-select v-model="dicType" class='selects' clearable filterable placeholder="请选择关键字类型">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
					<div class="search clearfix fr">
						<el-input v-model="search" placeholder="请输入关键字名"></el-input>
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
						<el-table-column label="关键字名称" prop="DictInfo.DictName">
						</el-table-column>
						<el-table-column label="关键字值" prop="DictInfo.DictValue">
						</el-table-column>
						<el-table-column label="创建人" prop="DictInfo.CreateMan">
						</el-table-column>
						<el-table-column label="创建时间" prop="">
							<template slot-scope='scope'>
								{{scope.row.DictInfo.CreateDate|yy}}
							</template>
						</el-table-column>
						<el-table-column label="关键字状态" prop="StateStr">
						</el-table-column>
						<!--<el-table-column label="状态" prop="state">
						</el-table-column>-->
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-dropdown size="small" trigger="click" type="primary">
									<el-button type="primary" size="small" class="Info">
										操作<i class="el-icon-arrow-down el-icon--right"></i>
									</el-button>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item>
											<button class="btn Success mini" @click="fnEditUserTip(scope.row.DictInfo.ID,scope.row.DictInfo.DictType,scope.row.DictInfo.DictName,scope.row.DictInfo.DictValue)">修改</button>
										</el-dropdown-item>
										<el-dropdown-item>
											<button class="btn Danger mini" @click="fnDelUser(scope.row.DictInfo.ID)">删除</button>
										</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</template>
						</el-table-column>
					</el-table>
					<div class="pages">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pages" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="10" layout="sizes, prev, pager, next" :total="total" background>
						</el-pagination>
					</div>
				</div>
			</div>
			<el-dialog title="新建关键字" :visible.sync="pass" width="424px">
				<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px" class='Owners'>
					<el-form-item label="关键字类型：">
						<el-select v-model="dicType1" style="width:275px;" class='selects' clearable filterable placeholder="请选择关键字类型">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="关键字名称：">
						<el-input v-model="dicName" placeholder="请输入关键字名称" style="width:275px;"></el-input>
					</el-form-item>
					<el-form-item label="关键字值：">
						<el-input v-model="dicValue" placeholder="请输入关键字名称" style="width:275px;"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="pass = false">取 消</el-button>
				<el-button size="small" type="primary" @click="trueDic()">确 定</el-button>
			</span>
			</el-dialog>
			<el-dialog title="修改关键字" :visible.sync="pass1" width="424px">
				<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px" class='Owners'>
					<el-form-item label="关键字类型：">
						<el-select v-model="dicType1" style="width:275px;" class='selects' clearable filterable placeholder="请选择关键字类型">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="关键字名称：">
						<el-input v-model="dicName" placeholder="请输入关键字名称" style="width:275px;"></el-input>
					</el-form-item>
					<el-form-item label="关键字值：">
						<el-input v-model="dicValue" placeholder="请输入关键字名称" style="width:275px;"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="pass1 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="trueDic1()">确 定</el-button>
			</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import Api from "../axios/api";
	export default {
		name: "dicr",
		data() {
			return {
				pass1:false,
				pass: false,
				tableData: [],
				pages: 1,
				total: 1,
				PageSize: 10,
				search: "",
				dicName: "", //词典名称
				dicValue: '', //词典值
				dicType1: '', //词典类型
				dicType: '',
				options: [{
					value: 1,
					label: '项目级别'
				}, {
					value: 2,
					label: '项目行业'
				}],
				loading: false,
				formLabelAlign: {},
				id:'',
			}
		},
		mounted() {
			this.getlist(this.PageSize, this.pages, this.search, this.dicType)
		},
		methods: {
			//修改词典
			fnEditUserTip(id,type,name,value){
				this.id = id
				this.dicName = name //词典名称
				this.dicValue = value //词典值
				this.dicType1 = type
				this.pass1 = true
			},
			//确认修改
			trueDic1(){
				if(this.dicType1==''||this.dicName==''||this.dicValue==''){
					this.$message({
						message: '参数不能为空',
						type: 'warning'
					});
					return
				}
				this.loading = true
				this.$post(Api.editdict, {
					"ID": this.id,
					"DictType": this.dicType1,
					"DictName": this.dicName,
					"DictValue": this.dicValue
				}).then(res => {
					if(res.state == 200) {
						this.pass1 = false
						this.loading = false
						this.pages = 1
						this.search == ''
						this.dicType = ''
						this.getlist(this.PageSize, this.pages, this.search, this.dicType)
						this.$message({
							message: "添加成功",
							type: "success"
						});
					} else {
						this.loadings = false
						this.pass = false
						this.$message.error(res.errmsg);
					}
				})
			},
			//新建词典
			newDic() {
				this.dicName = "" //词典名称
				this.dicValue = '' //词典值
				this.dicType1 = ''
				this.pass = true
			},
			trueDic() {
				if(this.dicType1==''||this.dicName==''||this.dicValue==''){
					this.$message({
						message: '参数不能为空',
						type: 'warning'
					});
					return
				}
				this.loading = true
				this.$post(Api.addnew, {
					"DictType": this.dicType1,
					"DictName": this.dicName,
					"DictValue": this.dicValue
				}).then(res => {
					if(res.state == 200) {
						this.pass = false
						this.loading = false
						this.pages = 1
						this.search == ''
						this.dicType = ''
						this.getlist(this.PageSize, this.pages, this.search, this.dicType)
						this.$message({
							message: "添加成功",
							type: "success"
						});
					} else {
						this.loadings = false
						this.pass = false
						this.$message.error(res.errmsg);
					}
				})
			},
			//改变显示条数
			handleSizeChange(val) {
				this.PageSize = val
				this.getlist(this.PageSize, this.pages, this.search, this.dicType)
			},
			//翻页
			handleCurrentChange(val) {
				this.pages = val
				this.getlist(this.PageSize, this.pages, this.search, this.dicType)
			},
			filter(){
				this.pages = 1
				this.getlist(this.PageSize, this.pages, this.search, this.dicType)
			},
			//获取词典列表
			getlist(PageSize, pages, search, dicType) {
				this.loading = true
				this.$post(Api.dicgetlist,{
					"PageSize": PageSize,
					"PageIndex": pages-1,
					"KeyWord": search,
					"Query": {
						"DictType": dicType
					},
					"OrderString": "",
					"ToExcel": false
				}).then(res => {
					console.log(res)
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
			//删除
			fnDelUser(id) {
				this.$confirm("将永久删除, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(Api.deldict + "/" + id)
							.then(response => {
								if(response.data.state == 200) {
									this.loading = false;
									this.pages = 1
									this.search == ''
									this.dicType = ''
									this.getlist(this.PageSize, this.pages, this.search, this.dicType)
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
			}
		}
	};
</script>
<style scoped>

</style>