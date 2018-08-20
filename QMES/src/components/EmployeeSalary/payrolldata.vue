<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">人事薪资</span>
			<span class="h2">月工资源数据</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<!--<span>工资数据:</span>-->
				<div class="inBook1">
					<span class="span2">组织架构</span>
					<el-cascader class='cascader' change-on-select :options="options" clearable filterable :props="cascaderConfig" v-model="values" separator='-' @change="handleChange">
					</el-cascader>
				</div>
				<div class="inBook1">
					<span class="span2">职员</span>
					<el-select v-model="value" placeholder="请选择" clearable filterable>
						<el-option v-for="item in staffs" :key="item.ID" :label="item.CNName" :value="item.ID">
						</el-option>
					</el-select>
				</div>
				<div class="inBook1">
					<span class="span2">月度</span>
					<el-date-picker class='months' format="yyyy 年 MM 月" value-format="yyyy-MM" v-model="value1" type="month" placeholder="选择日期">
					</el-date-picker>
				</div>
				<div class="inBook1">
					<span class="span2">工资项</span>
					<el-select v-model="wagepay" placeholder="请选择" clearable filterable>
						<el-option v-for="item in wageList" :key="item.ID" :label="item.ItemName" :value="item.ID">
						</el-option>
					</el-select>
				</div>
				<div class="fr">
					<el-input v-model="inputs" placeholder="请输入关键词" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>

			</div>
			<div class="clearfix">
				<div style="margin-top: 20px; float: right;">
					<el-button type="success" @click='imports()'>导入</el-button>
					<el-button type="success" @click='addSource()'>新建</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="SourceInfo.DataMonth" label="月度">
					<template slot-scope='scope'>
						{{scope.row.SourceInfo.DataMonth | dates}}
					</template>
				</el-table-column>
				<el-table-column prop="EmployeeInfo.CNName" label="姓名">
				</el-table-column>
				<el-table-column prop="EmployeeInfo.Code" label="工号">
				</el-table-column>
				<el-table-column prop="ItemInfo.ItemName" label="工资项">
				</el-table-column>
				<el-table-column prop="SourceInfo.ItemMoney" label="金额">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<el-button type="primary" size="small" @click='edit(scope.row.SourceInfo.ID,scope.row.SourceInfo.DataMonth,scope.row.ItemInfo.ID,scope.row.EmployeeInfo.ID,scope.row.SourceInfo.ItemMoney)'>修改</el-button>
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
					<el-form-item label="数据月度：">
						<el-date-picker class='months hsyd' format="yyyy 年 MM 月" value-format="yyyy-MM" v-model="value2" type="month" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="工资项：">
						<el-select class='se' v-model="wagepay1" placeholder="请选择" clearable filterable>
							<el-option v-for="item in wageList" :key="item.ID" :label="item.ItemName" :value="item.ID">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="职员：">
						<el-select class='se' v-model="staffNum" placeholder="请选择" clearable filterable>
							<el-option v-for="item in staffs" :key="item.ID" :label="item.CNName" :value="item.ID">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="工资金额：">
						<el-input v-model="moneys" placeholder="请输入金额" style="width:243px;"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="adds1 = false">取 消</el-button>
					<el-button size="small" type="primary" @click="update()">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog title="修改源数据" :visible.sync="adds2" width="384px">
				<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
					<el-form-item label="数据月度：">
						<el-date-picker class='months hsyd' format="yyyy 年 MM 月" value-format="yyyy-MM" v-model="value2" type="month" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="工资项：">
						<el-select class='se' v-model="wagepay1" placeholder="请选择" clearable filterable>
							<el-option v-for="item in wageList" :key="item.ID" :label="item.ItemName" :value="item.ID">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="职员：">
						<el-select class='se' v-model="staffNum" placeholder="请选择" clearable filterable>
							<el-option v-for="item in staffs" :key="item.ID" :label="item.CNName" :value="item.ID">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="工资金额：">
						<el-input v-model="moneys" placeholder="请输入金额" style="width:243px;"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="adds2 = false">取 消</el-button>
					<el-button size="small" type="primary" @click="eidts()">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog title="数据导入" :visible.sync="adds3" width="384px">
				<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
					<el-form-item label="数据月度：">
						<el-date-picker class='months hsyd' format="yyyy 年 MM 月" value-format="yyyy-MM" v-model="drvalue2" type="month" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="上传文件">
						<div class="uploads wenjian">
							<el-upload class="upload-demo" :headers="myHeaders" :file-list="fileList" drag :action="importFileUrl" :on-exceed="handleExceed" :on-error="uploadError" :on-success="uploadSuccess" :before-upload="beforeAvatarUpload">
								<i class="el-icon-plus">点击上传</i>
								<div class="el-upload__tip" slot="tip">只能上传xls、xlsx文件，且不超过10MB</div>
							</el-upload>
							<a :href="Host+'Template/工资源数据模板.xlsx'" class="mbxz" target="_blank">模板下载</a>
						</div>
					</el-form-item>
					<el-form-item label="">
						<el-checkbox v-model="formLabelAlign.checked">是否覆盖已有数据</el-checkbox>
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
				loading: false,
				cascaderConfig: {
					label: 'OrgName',
				},
				myHeaders: {
					token: sessionStorage.Token,
					accountid: sessionStorage.AccountID
				},
				adds1: false,
				adds2: false,
				staffs: [], //电子卡号
				staffNum: '',
				options: [],
				value: '',
				pages: 1, //页码
				total: 1, //页数
				pagesizs: 10,
				tableData: [], //卡片列表
				inputs: '', //搜索
				formLabelAlign: {
					name: '',
					checked: false
				},
				values: [], //组织架构
				value1: new Date(), //月份
				wageList: [], //工资项目
				wagepay: '',
				wagepay1: '',
				moneys: '',
				value2: '',
				id: '',
				drvalue2: '', //导入
				adds3: false,
				fileList: [],
				importFileUrl: "",
				adds4: false,
				datas: '',
				Host: api.template,
			}
		},
		filters: {
			dates(values) {
				var dates = new Date(values)
				var monthn = dates.getMonth() + 1;
				var yearn = dates.getFullYear();
				var d = yearn + "-" + monthn;
				return d

			}
		},
		created() {
			this.importFileUrl = api.files;
			this.empctorselector()
			this.getlist()
			this.itemser()
			this.getsource(this.pagesizs, this.pages, this.inputs, this.value1, this.wagepay, this.value, this.values[this.values.length - 1])
		},
		methods: {
			//获取工资项目
			itemser() {
				this.$get(api.itemser).then(res => {
					if(res.data.state == 200) {
						this.wageList = res.data.data
					} else {
						this.$message.error(res.data.msg)
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
				this.$post(api.getsource, {
					"PageSize": this.pagesizs,
					"PageIndex": this.pages-1,
					"KeyWord": this.inputs,
					"Query": {
						"DataMonth": this.value1,
						"ItemID": this.wagepay,
						"EmployeeID": this.value,
						"OrganizeID": this.values[this.values.length - 1]
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
			//获取工资源数据
			getsource(pagesizs, pages, inputs, value1s, wagepays, value, values) {
				this.loading = true
				this.$post(api.getsource, {
					"PageSize": pagesizs,
					"PageIndex": pages-1,
					"KeyWord": inputs,
					"Query": {
						"DataMonth": value1s,
						"ItemID": wagepays,
						"EmployeeID": value,
						"OrganizeID": values
					},
					"OrderString": "",
					"ToExcel": false
				}).then(res => {
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
				this.value2 = ''
				this.wagepay1 = ''
				this.staffNum = ''
				this.moneys = ''
				this.adds1 = true
			},
			//确定添加
			update() {
				if(this.value2 == '' || this.wagepay1 == '' || this.staffNum == '' || this.moneys == '') {
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.$post(api.sourceadd, {
					"DataMonth": this.value2,
					"ItemID": this.wagepay1,
					"EmployeeID": this.staffNum,
					"ItemMoney": this.moneys
				}).then(res => {
					if(res.state == 200) {
						this.pages = 1
						this.inputs = ''
						this.wagepay = ''
						this.value = ''
						this.values = []
						this.getsource(this.pagesizs, this.pages, this.inputs, this.value1, this.wagepay, this.value, this.values[this.values.length - 1])
						this.adds1 = false
					} else {
						this.adds1 = false
						this.$message.error(res.msg);
					}
				})
			},
			//修改弹框
			edit(id, DataMonth, ItemID, EmployeeID, ItemMoney) {
				console.log(ItemID)
				console.log(EmployeeID)
				this.id = id
				this.value2 = DataMonth
				this.wagepay1 = ItemID
				this.staffNum = EmployeeID
				this.moneys = ItemMoney
				this.adds2 = true
			},
			eidts() {
				if(this.value2 == '' || this.wagepay1 == '' || this.staffNum == '' || this.moneys == '') {
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.$post(api.sourceedit, {
					"ID": this.id,
					"DataMonth": this.value2,
					"ItemID": this.wagepay1,
					"EmployeeID": this.staffNum,
					"ItemMoney": this.moneys
				}).then(res => {
					if(res.state == 200) {
						this.pages = 1
						
						this.getsource(this.pagesizs, this.pages, this.inputs, this.value1, this.wagepay, this.value, this.values[this.values.length - 1])
						this.adds2 = false
					} else {
						this.adds2 = false
						this.$message.error(res.msg);
					}
				})
			},
			//删除
			dels(id) {
				this.$confirm("将永久删除, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.sourcedelitem + "/" + id)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});
									
									this.getsource(this.pagesizs, this.pages, this.inputs, this.value1, this.wagepay, this.value, this.values[this.values.length - 1])
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
				this.formLabelAlign.checked = true
				this.drvalue2 = ''
				this.adds3 = true
			},
			confirm() {
				this.$post(api.sourceimport, {
					"FilePath": this.imageUrl,
					"DataMonth": this.drvalue2,
					"IsOverride": this.formLabelAlign.checked
				}).then(res => {
					if(res.state == 200) {
						
						this.getsource(this.pagesizs, this.pages, this.inputs, this.value1, this.wagepay, this.value, this.values[this.values.length - 1])
						this.adds3 = false
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
				this.getsource(this.pagesizs, this.pages, this.inputs, this.value1, this.wagepay, this.value, this.values[this.values.length - 1])
			},
			handleCurrentChange(val) {
				this.pages = val
				this.getsource(this.pagesizs, this.pages, this.inputs, this.value1, this.wagepay, this.value, this.values[this.values.length - 1])
			},
			filter() {
				this.pages = 1
				this.getsource(this.pagesizs, this.pages, this.inputs, this.value1, this.wagepay, this.value, this.values[this.values.length - 1])
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
				if(response.state!=200){
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