<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">人事薪资</span>
			<span class="h2">工资数据</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<!--<span>工资数据:</span>-->
				<div class="inBook2">
					<span class="span3">组织架构</span>
					<el-cascader class='cascader' change-on-select :options="options" clearable filterable :props="cascaderConfig" v-model="values" separator='-' @change="handleChange">
					</el-cascader>
				</div>
				<div class="inBook2 zy">
					<span class="span3">职员</span>
					<el-select v-model="value" placeholder="请选择" clearable filterable>
						<el-option v-for="item in staffs" :key="item.ID" :label="item.CNName" :value="item.ID">
						</el-option>
					</el-select>
				</div>
				<div class="inBook2 yd">
					<span class="span3">月度</span>
					<el-date-picker class='months dataMonth' format="yyyy 年 MM 月" value-format="yyyy-MM" v-model="value1" type="month" placeholder="选择日期">
					</el-date-picker>
					<el-button size="small" @click='hesuan()' type="success">核算</el-button>
				</div>
				<div class="fr">
					<el-input v-model="inputs" placeholder="请输入工号" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column label="月度">
					<template slot-scope='scope'>
						{{scope.row.MasterInfo?scope.row.MasterInfo.DateInt:''}}
					</template>
				</el-table-column>
				<el-table-column label="工号">
					<template slot-scope='scope'>
						{{scope.row.EmployeeInfo?scope.row.EmployeeInfo.Code:''}}
					</template>
				</el-table-column>
				<el-table-column label="员工">
					<template slot-scope='scope'>
						{{scope.row.EmployeeInfo?scope.row.EmployeeInfo.CNName:''}}
					</template>
				</el-table-column>
				<el-table-column label="创建人">
					<template slot-scope='scope'>
						{{scope.row.MasterInfo?scope.row.MasterInfo.CreateMan:''}}
					</template>
				</el-table-column>
				<el-table-column label="创建时间">
					<template slot-scope='scope'>
						{{scope.row.MasterInfo?$toMoment(scope.row.MasterInfo.CreateDate):''}}
					</template>
				</el-table-column>
				<el-table-column prop="StateStr" label="状态">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<router-link v-bind="{to:'/SalaryItemData/'+(scope.row.EmployeeInfo.ID)}"><el-button size="small" type="success">明&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;细</el-button></router-link> 
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="primary" size="small" @click='edit(scope.row.MasterInfo.ID)'>审&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;核</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="danger" size="small" @click='allots(scope.row.MasterInfo.ID)'>取消审核</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="info" @click='fafang(scope.row.MasterInfo.ID)'>发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;放</el-button>
								</el-dropdown-item>
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
		<el-dialog title="核算" :visible.sync="adds1" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="110px">
				<el-form-item label="核算月度：">
					<el-date-picker class='months hsyd' format="yyyy 年 MM 月" value-format="yyyy-MM" v-model="value2" type="month" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="组织架构：">
					<el-cascader class='zzjg' filterable :options="options" clearable  :props="cascaderConfig" v-model="values1" separator='-' @change="handleChange">
					</el-cascader>
				</el-form-item>
				<el-form-item label="职员：">
					<el-select class='zy' v-model="staffNum" placeholder="请选择" clearable filterable>
						<el-option v-for="item in staffs" :key="item.ID" :label="item.CNName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="覆盖已有数据：">
					<el-checkbox v-model="formLabelAlign.checked"></el-checkbox>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="adds1 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="update()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import api from '../../axios/api.js'
	export default {
		name: 'SalaryData',
		data() {
			return {
				cascaderConfig: {
					label: 'OrgName',
				},
				adds1: false,
				staffs: [], //电子卡号
				options: [],
				values: [],
				value: '',
				pages: 1, //页码
				total: 1, //页数
				pagesizs:10,
				tableData: [], //卡片列表
				inputs: '', //搜索
				formLabelAlign: {
					name: '',
					checked: false
				},
				loading: false,
				value1: '',
				value2:'',//弹框
				values1:[],//组织架构
				staffNum:'',
			}
		},
		created() {
			this.getsalarymaster(this.pages, this.inputs, this.values, this.value, this.value1,this.pagesizs)
			this.getlist()
			this.empctorselector()
		},
		methods: {
			//获取职员
			empctorselector() {
				this.$get(api.empctorselector).then(res => {
					if(res.data.state == 200) {
						this.staffs = res.data.data
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
			//获取组织架构
			getlist() {
				this.$get(api.orgetlist).then(res => {
					console.log(res)
					if(res.data.state == 200) {
						for(var i = 0; i < res.data.data.length; i++) {
							this.options.push({
								OrgName: res.data.data[i].OrgName,
								Principal: res.data.data[i].Principal,
								OLevel: res.data.data[i].OLevel,
								CreateMan: res.data.data[i].CreateMan,
								Tel: res.data.data[i].Tel,
								State: res.data.data[i].State,
								value: res.data.data[i].ID,
								ParentID: res.data.data[i].ParentID
							})
						}
						this.options = this.$toTree(this.options)
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
			excel(){
				this.loading = true
				this.$post(api.getsalarymaster, {
					"PageSize": this.pagesizs,
					"PageIndex": this.pages - 1,
					"KeyWord": this.inputs,
					"Query": {
						"OrganizeID": this.values[this.values.length-1],
						"EmployeeID": this.value,
						"Month": this.value1
					},
					"OrderString": '',
					"ToExcel": true
				}).then(res => {
					if(res.state == 200) {
						this.loading = false
						if (res.data.ExcelResult && res.data.ExcelResult.length!=0) {
							var urls = res.data.ExcelResult
							window.location.href = api.hostname+urls
			            }
					} else {
						this.loading = false
						this.$message.error(res.msg)
					}
				})
			},
			//获取列表
			getsalarymaster(page, inpu, oId, eId, valu,pagesizes) {
				this.loading = true
				this.$post(api.getsalarymaster, {
					"PageSize": pagesizes,
					"PageIndex": page - 1,
					"KeyWord": inpu,
					"Query": {
						"OrganizeID": oId[oId.length - 1],
						"EmployeeID": eId,
						"Month": valu
					},
					"OrderString": '',
					"ToExcel": false
				}).then(res => {
					if(res.state == 200) {
						this.loading = false
						this.tableData = res.data.Data
						this.total = res.data.Items ? res.data.Items : 1;
					} else {
						this.loading = false
						this.$message.error(res.msg)
					}
				})
			},
			handleChange() {

			},
			handleSizeChange(val){
				this.pagesizs = val
				this.getsalarymaster(this.pages, this.inputs, this.values, this.value, this.value1,this.pagesizs)
			},
			handleCurrentChange(val) {
				this.pages = val
				this.getsalarymaster(this.pages, this.inputs, this.values, this.value, this.value1,this.pagesizs)
			},
			filter() {
				this.pages = 1
				this.getsalarymaster(this.pages, this.inputs, this.values, this.value, this.value1,this.pagesizs)
			},
			//核算弹框
			hesuan() {
				this.value2=''
				this.values1=[]
				this.staffNum=''
				this.formLabelAlign.checked=false
				this.adds1 = true
			},
			//确认核算
			update() {
				if(this.value2==''){
					this.$message({
						message: "核算参数不能为空",
						type: "warning"
					});
					return;
				}
				this.$post(api.salarycalc,{
				  "OrganizeID": this.values1[this.values1.length-1],
				  "EmployeeID": this.staffNum,
				  "Month": this.value2,
				  "IsOverride": this.formLabelAlign.checked
				}).then(res=>{
					if(res.state==200){
						this.adds1 = false
						
						this.getsalarymaster(this.pages, this.inputs, this.values, this.value, this.value1,this.pagesizs)
					}else{
						this.adds1 = false
						this.$message.error(res.msg)
					}
				})
				
			},
			//审核
			edit(id){
				this.$confirm("确定审核通过, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
				.then(() => {
					this.loading = true;
					this.$get(api.salaryvierfy + "/" + id)
						.then(res => {
							if(res.data.state == 200) {
								this.loading = false;
								this.$message({
									message: "通过审核",
									type: "success"
								});
								
								this.getsalarymaster(this.pages, this.inputs, this.values, this.value, this.value1,this.pagesizs)
							} else {
								this.loading = false;
								this.$message.error(res.data.msg);
							}
						})
						.catch(function(error) {
							this.loading = false;
							this.$message.error(error);
						});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消审核"
					});
				});
			},
			//取消审核
			allots(id){
				this.$confirm("确定取消审核, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
				.then(() => {
					this.loading = true;
					this.$get(api.cancelverify + "/" + id)
						.then(res => {
							if(res.data.state == 200) {
								this.loading = false;
								this.$message({
									message: "取消成功",
									type: "success"
								});
								
								this.getsalarymaster(this.pages, this.inputs, this.values, this.value, this.value1,this.pagesizs)
							} else {
								this.loading = false;
								this.$message.error(res.data.msg);
							}
						})
						.catch(function(error) {
							this.loading = false;
							this.$message.error(error);
						});
				})
				.catch(() => {
//					this.$message({
//						type: "info",
//						message: "已取消审核"
//					});
				});
			},
			//取消审核
			fafang(id){
				this.$confirm("确定发放工资, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
				.then(() => {
					this.loading = true;
					this.$get(api.salaryover + "/" + id)
						.then(res => {
							if(res.data.state == 200) {
								this.loading = false;
								this.$message({
									message: "发放成功",
									type: "success"
								});
								
								this.getsalarymaster(this.pages, this.inputs, this.values, this.value, this.value1,this.pagesizs)
							} else {
								this.loading = false;
								this.$message.error(res.data.msg);
							}
						})
						.catch(function(error) {
							this.loading = false;
							this.$message.error(error);
						});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消发放"
					});
				});
			}
		}
	}
</script>
<style scoped="">
	.fldivs {
		width: calc(100% - 200px);
	}
</style>