<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">人事薪资</span>
			<span class="h2">日工资源数据</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<div class="inBook1">
					 <el-radio-group v-model="radio2" style='margin-top: 8px;'> 
					    <el-radio :label="2">日期</el-radio>
					    <el-radio :label="1">月份</el-radio>
					 </el-radio-group>
				</div>
				<div class="inBook1">
					<span class="span2">日期</span>
					<el-date-picker class='months1 yuefen' v-model="value1" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</div>
				<div class="inBook1">
					<span class="span2">职员</span>
					<el-select v-model="value" placeholder="请选择" clearable filterable>
						<el-option v-for="item in staffs" :key="item.ID" :label="item.CNName" :value="item.ID">
						</el-option>
					</el-select>
				</div>
				<div class="inBook1">
					<span class="span2">组织架构</span>
					<el-cascader class='cascader' change-on-select :options="zzjg" clearable filterable :props="cascaderConfig" v-model="zj" separator='-' @change="handleChange">
					</el-cascader>
				</div>
				<div class="fr">
					<el-input v-model="inputs" placeholder="请输入关键词" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
					<el-button type="success" @click='imports()'>导入</el-button>
					<el-button type="success" @click='addSource()'>新建</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="SourceInfo.DataMonth" label="日期">
					<template slot-scope='scope'>
						{{scope.row.SourceInfo.SalaryDate | dates}}
					</template>
				</el-table-column>
				<el-table-column prop="EmployeeInfo.Code" label="工号">
				</el-table-column>
				<el-table-column prop="EmployeeInfo.CNName" label="姓名">
				</el-table-column>
				<el-table-column prop="SourceInfo.AmountTimes" label="计件工时">
				</el-table-column>
				<el-table-column prop="SourceInfo.HourTimes" label="点工工时">
				</el-table-column>
				<el-table-column prop="SourceInfo.DaySalary" label="日工值">
				</el-table-column>
				<el-table-column prop="SourceInfo.Overtimes" label="加班工时">
				</el-table-column>
				<el-table-column prop="SourceInfo.Subsidy" label="补贴">
				</el-table-column>
				<el-table-column prop="SourceInfo.Other" label="调整项">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<el-button type="primary" size="small" @click='edit(scope.row.SourceInfo.ID,scope.row.SourceInfo.AmountTimes,scope.row.SourceInfo.HourTimes,scope.row.SourceInfo.DaySalary,scope.row.SourceInfo.Overtimes,scope.row.SourceInfo.Subsidy,scope.row.SourceInfo.Other)'>修改</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="danger" size="small" @click='dels(scope.row.SourceInfo.ID)'>删除</el-button>
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
			<el-dialog title="添加源数据" :visible.sync="adds1" width="384px">
				<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
					<el-form-item label="数据日期：">
						<el-date-picker class='months hsyd' format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="value2" type="date" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="职员：">
						<el-select class='se' filterable v-model="staffNum" placeholder="请选择" clearable filterable>
							<el-option v-for="item in staffs" :key="item.ID" :label="item.CNName" :value="item.ID">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="计件工时：">
						<el-input v-model="jsgs" placeholder="请输入计件工时" style="width:243px;"></el-input>
					</el-form-item>
					<el-form-item label="点工工时：">
						<el-input v-model="dggs" placeholder="请输入点工工时" style="width:243px;"></el-input>
					</el-form-item>
					<el-form-item label="日工值：">
						<el-input v-model="rgz" placeholder="请输入日工值" style="width:243px;"></el-input>
					</el-form-item>
					<el-form-item label="加班工时：">
						<el-input v-model="jbgs" placeholder="请输入加班工时" style="width:243px;"></el-input>
					</el-form-item>
					<el-form-item label="补贴：">
						<el-input v-model="bt" placeholder="请输入补贴" style="width:243px;"></el-input>
					</el-form-item>
					<el-form-item label="调整项：">
						<el-input v-model="Other" placeholder="请输入调整项" style="width:243px;"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="adds1 = false">取 消</el-button>
					<el-button size="small" type="primary" @click="update()">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog title="修改源数据" :visible.sync="adds2" width="384px">
				<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
					<el-form-item label="计件工时：">
						<el-input v-model="jsgs" placeholder="请输入计件工时" style="width:243px;"></el-input>
					</el-form-item>
					<el-form-item label="点工工时：">
						<el-input v-model="dggs" placeholder="请输入点工工时" style="width:243px;"></el-input>
					</el-form-item>
					<el-form-item label="日工值：">
						<el-input v-model="rgz" placeholder="请输入日工值" style="width:243px;"></el-input>
					</el-form-item>
					<el-form-item label="加班工时：">
						<el-input v-model="jbgs" placeholder="请输入加班工时" style="width:243px;"></el-input>
					</el-form-item>
					<el-form-item label="补贴：">
						<el-input v-model="bt" placeholder="请输入补贴" style="width:243px;"></el-input>
					</el-form-item>
					<el-form-item label="调整项：">
						<el-input v-model="Other" placeholder="请输入调整项" style="width:243px;"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="adds2 = false">取 消</el-button>
					<el-button size="small" type="primary" @click="eidts()">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog title="数据导入" :visible.sync="adds3" width="384px">
				<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
					<el-form-item label="上传文件">
						<div class="uploads wenjian">
							<el-upload class="upload-demo" :headers="myHeaders" :file-list="fileList" drag :action="importFileUrl" :on-exceed="handleExceed" :on-error="uploadError" :on-success="uploadSuccess" :before-upload="beforeAvatarUpload">
								<i class="el-icon-plus">点击上传</i>
								<div class="el-upload__tip" slot="tip">只能上传xls、xlsx文件，且不超过10MB</div>
							</el-upload>
							<a :href="Host+'Template/日工资源数据导入模板.xlsx'" class="mbxz" target="_blank">模板下载</a>
						</div>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="adds3 = false">取 消</el-button>
					<el-button size="small" type="primary" @click="confirm()">确 定</el-button>
				</span>
			</el-dialog>

		</div>
	</div>
</template>
<script>
	import api from '../../axios/api.js'
	export default {
		name: 'payrolldata',
		data() {
			return {
				cascaderConfig: {
					label: 'OrgName',
				},
				loading: false,
				myHeaders: {
					token: sessionStorage.Token,
					accountid: sessionStorage.AccountID
				},
				adds1: false,
				adds2: false,
				staffs: [], //职员列表
				staffNum: '', //职员
				value: '', //职员
				options: [], //工艺列表
				wagepay: '', //工艺
				SpecID: '', //规格
				Speclist: [], //规格列表
				pages: 1, //页码
				total: 1, //页数
				pagesizs: 10,
				tableData: [], //日数据列表
				inputs: '', //搜索
				formLabelAlign: {
					name: '',
					checked: false
				},
				value1: new Date(), //日期
				value2: '', //新建数据日期
				id: '',
				adds3: false,
				fileList: [],
				importFileUrl: "",
				adds4: false,
				datas: '',
				Host: api.template,
				jsgs: '', //计件工时
				dggs: '', //点工工时
				rgz: '', //日工值
				jbgs: '', //加班工时
				bt: '', //补贴
				Other:'',//调整项
				radio2:2,
				zzjg:[],
				zj:[]
			}
		},
		filters: {
			dates(values) {
				var dates = new Date(values)
				var monthn = dates.getMonth() + 1;
				var yearn = dates.getFullYear();
				var day = dates.getDate();
				var d = yearn + "-" + monthn + '-' + day;
				return d

			}
		},
		created() {
			this.importFileUrl = api.files;
			this.empctorselector()
			this.proceselector()
			this.sepcselector()
			this.getlist()
			this.getdaysource(this.pagesizs,this.pages,this.inputs,this.value1,this.radio2,this.value,this.zj[this.zj.length - 1])
		},
		methods: {
			//获取组织架构
			getlist() {
				this.$get(api.orgetlist).then(res => {
					console.log(res)
					if(res.data.state == 200) {
						for(var i = 0; i < res.data.data.length; i++) {
							this.zzjg.push({
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
						this.zzjg = this.$toTree(this.zzjg)
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
			//获取工艺选择器
			proceselector() {
				this.$get(api.proceselector).then(res => {
					if(res.data.state == 200) {
						this.options = res.data.data
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			//获取规格选择器
			sepcselector() {
				this.$get(api.sepcselector).then(res => {
					if(res.data.state == 200) {
						this.Speclist = res.data.data
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
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
			dates(val){
				var dates = new Date(val)
				var monthn = dates.getMonth() + 1;
				var yearn = dates.getFullYear();
				var day = dates.getDate();
				var d = yearn + "-" + monthn + '-' + day;
				return d
			},
			//导出
			excel(){
				this.value1 = this.dates(this.value1)
				this.loading = true
				this.$post(api.getdaysource, {
					  "PageSize":this.pagesizs,
					  "PageIndex": this.pages-1,
					  "KeyWord": this.inputs,
					  "Query": {
					    "Day": this.value1,
					    "QueryType": this.radio2,
					    "EmployeeID":this.value,
					    "OrganID":this.zj[this.zj.length - 1]
					  },
					  "OrderString": "",
					  "ToExcel": true
				}).then(res => {
					if(res.state == 200) {
						this.loading = false;
						if (res.data.ExcelResult && res.data.ExcelResult.length!=0) {
							var urls = res.data.ExcelResult
							window.location.href = api.hostname+urls
			            }
					} else {
						this.loading = false;
						this.$message.error(res.msg);
					}
				})
			},
			//获取日工资列表
			getdaysource(pagesizs,pages,inputs,day,type,eId,oId){
				day = this.dates(this.value1)
				this.loading = true
				this.$post(api.getdaysource,{
				  "PageSize": pagesizs,
				  "PageIndex": pages-1,
				  "KeyWord": inputs,
				  "Query": {
				    "Day": day,
				    "QueryType": type,
				    "EmployeeID": eId,
				    'OrganID':oId
				  },
				  "OrderString": "sample string 4",
				  "ToExcel": false
				}).then(res=>{
					if(res.state == 200) {
						this.loading = false;
						this.total = res.data.Items ? res.data.Items : 1;
						this.tableData = res.data.Data;
					} else {
						this.loading = false;
						this.$message.error(res.msg);
					}
				})
			},
			//新建工资源数据
			addSource() {
				this.jsgs='' //计件工时
				this.dggs='' //点工工时
				this.rgz='' //日工值
				this.jbgs = '' //加班工时
				this.bt = '' //补贴
				this.Other = ''//调整项
				this.value2=''
				this.staffNum=''
				this.adds1 = true
			},
			//确定添加
			update() {
				if(this.jsgs == '' || this.dggs == '' || this.rgz == '' || this.jbgs == ''||this.bt == ''||this.value2==''||this.staffNum=='') {
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading = true
				this.$post(api.daysourceadd, {
				  "MonthInt": '',
				  "EmployeeID": this.staffNum,
				  "SalaryDate": this.value2,
				  "AmountTimes":this.jsgs,
				  "HourTimes": this.dggs,
				  "DaySalary": this.rgz,
				  "Overtimes": this.jbgs,
				  "Subsidy": this.bt,
				  "Other":this.Other
				}).then(res => {
					if(res.state == 200) {
						this.loading = false;
						this.pages=1
						this.inputs=''
						this.radio2=2
						this.value=''
						this.getdaysource(this.pagesizs,this.pages,this.inputs,this.value1,this.radio2,this.value,this.zj[this.zj.length - 1])
						this.adds1 = false
					} else {
						this.adds1 = false
						this.$message.error(res.msg);
					}
				})
			},
			//修改弹框
			edit(id, AmountTimes, HourTimes, DaySalary, Overtimes,Subsidy,Other) {
				this.adds2 = true
				this.id = id
				this.jsgs=AmountTimes //计件工时
				this.dggs=HourTimes //点工工时
				this.rgz=DaySalary //日工值
				this.jbgs = Overtimes //加班工时
				this.bt = Subsidy //补贴
				this.Other = Other //补贴
			},
			eidts() {
				if(this.jsgs == '' || this.dggs == '' || this.rgz == '' || this.jbgs == ''||this.bt == '') {
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading = true
				this.$post(api.daysourceedit, {
				  "ID": this.id,
				  "AmountTimes": this.jsgs,
				  "HourTimes": this.dggs,
				  "DaySalary": this.rgz,
				  "Overtimes": this.jbgs,
				  "Subsidy": this.bt,
				  "Other":this.Other
				}).then(res => {
					if(res.state == 200) {
						this.loading = false;
						
						this.getdaysource(this.pagesizs,this.pages,this.inputs,this.value1,this.radio2,this.value,this.zj[this.zj.length - 1])
						this.adds2 = false
					} else {
						this.adds2 = false
						this.$message.error(res.msg);
					}
				})
			},
			dels(id) {
				this.$confirm("将永久删除, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.daysourcedelitem + "/" + id)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});
									
									this.getdaysource(this.pagesizs,this.pages,this.inputs,this.value1,this.radio2,this.value,this.zj[this.zj.length - 1])
								} else {
									this.loading = false;
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
			//导入
			imports() {
				this.fileList = [];
				this.imageUrl = "";
				this.adds3 = true
			},
			confirm() {
				this.$post(api.daysourceimport, {
					"File": this.imageUrl,
				}).then(res => {
					if(res.state == 200) {
						this.adds3 = false
						this.pages=1
						this.inputs=''
						this.radio2=2
						this.value=''
						this.getdaysource(this.pagesizs,this.pages,this.inputs,this.value1,this.value)
					} else {
						this.adds3 = false
						this.$message.error(res.msg);
					}
				})
			},

			handleChange() {

			},
			handleSizeChange(val) {
				this.pagesizs = val
				this.getdaysource(this.pagesizs,this.pages,this.inputs,this.value1,this.radio2,this.value,this.zj[this.zj.length - 1])
			},
			handleCurrentChange(val) {
				this.pages = val
				this.getdaysource(this.pagesizs,this.pages,this.inputs,this.value1,this.radio2,this.value,this.zj[this.zj.length - 1])
			},
			filter() {
				this.pages = 1
				this.getdaysource(this.pagesizs,this.pages,this.inputs,this.value1,this.radio2,this.value,this.zj[this.zj.length - 1])
			},
			handleExceed(files, fileList) {
				console.log(files);
				console.log(fileList);
			},
			beforeAvatarUpload(file) {
				this.loading = true;
				const extension = file.name.split(".")[1] === "xls";
				const extension2 = file.name.split(".")[1] === "xlsx";
				const isLt2M = file.size / 1024 / 1024 < 10;
				if(!extension && !extension2) {
					this.$message.error("上传模板只能是 xls、xlsx格式!");
				}
				if(!isLt2M) {
					this.$message.error("上传模板大小不能超过 10MB!");
				}
				return extension || extension2 || extension3 || (extension4 && isLt2M);
			},
			uploadSuccess(response) {
				this.loading = false;
				if(response.state != 200) {
					this.$message.error(response.msg);
					// this.drvalue2 = ''
					this.fileList = [];
					this.imageUrl = "";
					return false;
				}
				console.log(response)
				this.imageUrl = response.data.substring(
					10,
					response.data.length
				);
				this.$message({
					message: "上传成功",
					type: "success"
				});
			},
			// 上传错误
			uploadError(response) {
				this.loading = false;
				this.$message.error("上传失败！");
			},
		}
	}
</script>
<style scoped="">
	.fldivs {
		width: calc(100% - 200px);
	}
	
	.uploads .el-upload-dragger {
		width: 204px;
		height: 43px;
	}
</style>