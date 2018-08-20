<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">基础管理</span>
			<span class="h2">工作桌台</span>
		</div>
		<div class="tables">
			<div class="tables">
				<div class="clearfix">
					<span>工作桌台:</span>
					<el-button type="primary" size="small" @click='add()'>添加</el-button>
					<div class="fr">
						<el-input v-model="inputs" placeholder="请输入桌台名称" style="width:217px;"></el-input>
						<el-button type="primary" @click="filter()">查询</el-button>
						<el-button type="success" @click='execl()'>导出Excel</el-button>
					</div>
				</div>
			</div>
			<div class="tables">
				<el-table :data="tableData" @row-click="handdle" stripe style="width: 100%">
					<el-table-column sortable prop='EmployeeGInfo.GroupName' label="桌台名称">
					</el-table-column>
					<el-table-column sortable prop='EmployeeGInfo.ElecCardCode' label="ID">
					</el-table-column>
					<el-table-column sortable prop='CardInfo.BusinessCode' show-overflow-tooltip label="卡号">
					</el-table-column>
					<el-table-column prop="cName" label="创建人">
						<template slot-scope='scope'>
							{{scope.row.EmployeeGInfo?scope.row.EmployeeGInfo.CreateMan:''}}
						</template>
					</el-table-column>
					<el-table-column prop="State" label="创建时间">
						<template slot-scope='scope'>
							{{scope.row.EmployeeGInfo?$toMoment(scope.row.EmployeeGInfo.CreateDate):''}}
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
										<el-button size="small" type="success" @click='edit(scope.row.EmployeeGInfo.ID,scope.row.EmployeeGInfo.GroupName,scope.row.EmployeeGInfo.ElecCardCode)'>修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button size="small" type="danger" @click='del(scope.row.EmployeeGInfo.ID)'>删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button class='Purple' size="small" @click='allotsd(scope.row.EmployeeGInfo.ID,scope.row.EmployeeGInfo.ElecCardCode)'>配&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button type="warning" size="small" @click='clearSet(scope.row.CardInfo.ID)'>清除配置</el-button>
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
		</div>
		<div class="tables">
			<div class="tables">
				<div class="clearfix">
					<span>员工列表:</span>
					<el-button type="primary" size="small" @click='addetiles()'>添加</el-button>
					<!--<label for="" style="margin: 0 15px;">员工选择：</label>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>-->
					<div class="fr">
						<el-input v-model="inputs1" placeholder="请输入员工编号" style="width:217px;"></el-input>
						<el-button type="primary" @click="filter1()">查询</el-button>
						<el-button type="success" @click='excels()'>导出Excel</el-button>
					</div>
				</div>
			</div>
			<div class="tables">
				<el-table :data="tableData1" stripe style="width: 100%" :summary-method="getSummaries"
    show-summary>
					<el-table-column prop="EmployeeInfo.Code" label="员工编号">
					</el-table-column>
					<el-table-column prop="EmployeeInfo.CNName" label="姓名">
					</el-table-column>
					<el-table-column prop="EmployeeTypeStr" label="员工类型">
					</el-table-column>
					<el-table-column prop="Ratio" label="占比">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="small" type="success" @click='proEdit(scope.row.EmployeeInfo.ID,scope.row.Ratio)'>修改</el-button>
							<el-button size="small" type="danger" @click='deldetais(scope.row.EmployeeInfo.ID)'>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pages">
					<el-pagination @size-change="handleSizeChange1" :page-sizes="[10,20,30,40,50]" :page-size="pagesizs1" :current-page="pages1" @current-change="handleCurrentChange1" layout="sizes,prev, pager, next" :total="total1" background>
					</el-pagination>
				</div>
			</div>
		</div>
		<el-dialog title="添加桌台" :visible.sync="table" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="桌台名称：">
					<el-input v-model="formLabelAlign.name" placeholder="请输入桌台名称"></el-input>
				</el-form-item>
				<el-form-item label="卡号：">
					<el-select class='se' v-model="staffNum" placeholder="请选择电子卡号" filterable>
						<el-option v-for="item in staffs" :key="item.CardCode" :label="item.BusinessCode" :value="item.CardCode">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="table = false">取 消</el-button>
				<el-button size="small" type="primary" @click="allAdd()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改桌台" :visible.sync="edits" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="桌台名称：">
					<el-input v-model="formLabelAlign.name" placeholder="请输入桌台名称"></el-input>
				</el-form-item>
				<!--<el-form-item label="卡号：">
					<el-select class='se' v-model="staffNum" placeholder="请选择电子卡号" filterable>
						<el-option v-for="item in staffs" :key="item.CardCode" :label="item.BusinessCode" :value="item.CardCode">
						</el-option>
					</el-select>
				</el-form-item>-->
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="edits = false">取 消</el-button>
				<el-button size="small" type="primary" @click="ediTure()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="配置桌台" :visible.sync="allot" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="80px">
				<el-form-item label="工作桌台">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="员工">
					<el-select class='se' v-model="staffNum" placeholder="请选择员工" filterable>
						<el-option v-for="item in staffs" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="allot = false">取 消</el-button>
				<el-button size="small" type="primary" @click="alloTure()">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="添加桌台明细" :visible.sync="allot1" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="80px">
				<el-form-item label="员工">
					<el-select class='se' v-model="person" placeholder="请选择员工" filterable>
						<el-option v-for="item in personList" :key="item.ID" :label="item.CNName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分配占比">
					<el-input v-model="proportion"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="allot1 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="alloTure1()">确 定</el-button>
			</span>
		</el-dialog>
		
		<el-dialog title="配置" :visible.sync="format2" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="卡号：">
					<el-select filterable class='se' v-model="staffNum" placeholder="请选择电子卡号">
						<el-option v-for="item in staffs" :key="item.CardCode" :label="item.BusinessCode" :value="item.CardCode">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="format2 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="allBcs2()">确 定</el-button>
			</span>
		</el-dialog>
		
		<el-dialog title="修改占比" :visible.sync="propo" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="分配占比">
					<el-input v-model="proportion"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="propo = false">取 消</el-button>
				<el-button size="small" type="primary" @click="proTrue()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import api from "../../axios/api";
	export default {
		name: "EmployeeGroup",
		data() {
			return {
				propo:false,
				format2:false,
				loading: false,
				inputs1: "",
				personList: [], //员工
				person: "",
				allot1: false,
				options: [],
				value: "",
				options: [],
				allot: false, //配置弹框
				edits: false, //修改桌台弹框
				table: false, //添加桌台弹框
				pages: 1, //页码
				total: 1, //页数
				pagesizs: 10,
				pagesizs1: 10,
				pages1: 1, //页码
				total1: 1, //页数
				tableData: [], //卡片列表
				tableData1: [],
				inputs: "", //搜索
				formLabelAlign: {
					name: ""
				},
				staffs: [], //电子卡号
				staffNum: "",

				id: "",
				tableId: "",
				proportion: '', //占比
				eyid:'',
			};
		},
		created() {
			this.getempglist(this.pages, this.inputs, this.pagesizs);
			this.cardselector();
			//获取员工列表
			this.fnGetStaffList();
		},
		methods: {
			getSummaries(param) {
		        const { columns, data } = param;
		        const sums = [];
		        columns.forEach((column, index) => {
		          if (index === 0) {
		            sums[index] = '占比合计';
		            return;
		          }
		          const values = data.map(item => Number(item[column.property]));
		          if (!values.every(value => isNaN(value))) {
		            sums[index] = values.reduce((prev, curr) => {
		              const value = Number(curr);
		              if (!isNaN(value)) {
		                return prev + curr;
		              } else {
		                return prev;
		              }
		            }, 0);
		            sums[index];
		          } 
		        });
		        return sums;
		      },
			//修改占比
			proEdit(id,proportion){
				this.propo = true
				this.eyid = id
				this.proportion = proportion
			},
			//确认修改
			proTrue(){
				this.$post(api.editempgde,{
				  "ID": this.eyid,
				  "Ratio": this.proportion,
				  "GroupID":this.tableId
				}).then(res=>{
					console.log(res)
					if(res.state==200){
						this.propo = false
						this.getdetails(this.tableId, this.pages1, this.inputs1, this.pagesizs1);
					}else{
						this.propo = false
						this.$message.error(res.msg);
					}
					
				})
			},
			//点击行获取id
			handdle(row) {
				console.log(row);
				this.tableId = row.EmployeeGInfo.ID;
				this.pages1 = 1;
				this.inputs1 = "";
				this.getdetails(this.tableId, this.pages1, this.inputs1, this.pagesizs1);
			},
			execl() {
				this.loading = true;
				this.$post(api.getempglist, {
						PageSize: this.pagesizs,
						PageIndex: this.pages - 1,
						KeyWord: this.inputs,
						Query: this.inputs,
						OrderString: "",
						ToExcel: true
					})
					.then(res => {
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
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//获取桌台列列表
			getempglist(page, val, pagesize) {
				this.loading = true;
				this.$post(api.getempglist, {
						PageSize: pagesize,
						PageIndex: page - 1,
						KeyWord: val,
						Query: val,
						OrderString: "",
						ToExcel: false
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.tableData = res.data.Data;
							this.tableId = this.tableData[0] ? this.tableData[0].EmployeeGInfo.ID : '';
							this.total = res.data.Items ? res.data.Items : 1;
							this.getdetails(this.tableId, this.pages1, this.inputs1, this.pagesizs1);
						} else {
							this.loading = false;
							this.$message.error(res.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//查询
			filter() {
				this.pages = 1;
				this.getempglist(this.pages, this.inputs, this.pagesizs);
			},
			filter1() {
				this.pages1 = 1;
				this.getdetails(this.tableId, this.pages1, this.inputs1, this.pagesizs1);
			},
			handleSizeChange(val) {
				this.pagesizs = val;
				this.getempglist(this.pages, this.inputs, this.pagesizs);
			},
			handleSizeChange1(val) {
				this.pagesizs1 = val;
				this.getdetails(this.tableId, this.pages1, this.inputs1, this.pagesizs1);
			},
			//分页
			handleCurrentChange(val) {
				this.pages = val;
				this.getempglist(this.pages, this.inputs, this.pagesizs);
			},
			handleCurrentChange1(val) {
				this.pages1 = val;
				this.getdetails(this.tableId, this.pages1, this.inputs1, this.pagesizs1);
			},
			excels() {
				this.loading = true;
				this.$post(api.getdetails, {
						PageSize: this.pagesizs1,
						PageIndex: this.pages1 - 1,
						KeyWord: this.inputs1,
						Query: this.tableId,
						OrderString: "",
						ToExcel: true
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							if(res.data.ExcelResult != "") {
								this.$message.error(res.data.ExcelResult);
							}
						} else {
							this.loading = false;
							this.$message.error(res.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//获取桌台详情
			getdetails(id, pges, inp, pagesize) {
				this.loading = true;
				this.$post(api.getdetails, {
						PageSize: pagesize,
						PageIndex: pges - 1,
						KeyWord: inp,
						Query: id,
						OrderString: "",
						ToExcel: false
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.tableData1 = res.data.Data;
							this.total1 = res.data.Items ? res.data.Items : 1;
						} else {
							this.loading = false;
							this.$message.error(res.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//添加明细
			addetiles() {
				this.proportion = ''
				this.person = "";
				this.allot1 = true;
			},
			//确认添加
			alloTure1() {
				if(this.tableId == "" || this.person == "" || this.proportion == '') {
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading = true;
				this.$post(api.adddetail, {
						GroupID: this.tableId,
						EmployeeID: this.person,
						Ratio: this.proportion
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.allot1 = false;
							this.$message({
								message: "添加成功",
								type: "success"
							});
							this.pages1 = 1;
							this.inputs1 = "";
							this.getdetails(this.tableId, this.pages1, this.inputs1, this.pagesizs1);
						} else {
							this.loading = false;
							this.table = false;
							this.$message.error(res.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},

			//获取卡列表
			cardselector() {
				this.$get(api.cardselector + "/" + 0).then(res => {
					if(res.data.state == 200) {
						this.staffs = res.data.data;
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},
			//改变
			changes() {
				this.cardselector();
			},
			//添加
			add() {
				this.cardselector();
				this.formLabelAlign.name = "";
				this.staffNum = "";
				this.table = true;
			},
			//确定添加
			allAdd() {
				if(this.formLabelAlign.name == "" || this.staffNum == "") {
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading = true;
				this.$post(api.addnew, {
						GroupName: this.formLabelAlign.name,
						ElecCardCode: this.staffNum
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.table = false;
							this.$message({
								message: "添加成功",
								type: "success"
							});
							this.inputs = "";
							this.pages = 1;
							this.getempglist(this.pages, this.inputs, this.pagesizs);
						} else {
							this.loading = false;
							this.table = false;
							this.$message.error(res.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//删除
			del(id) {
				this.$confirm("将删除该数据, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.delempg + "/" + id)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});
									this.getempglist(this.pages, this.inputs, this.pagesizs);
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
							message: "已取消清除"
						});
					});
			},
			//删除明细
			deldetais(id) {
				this.$confirm("将删除该数据, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.deldetail + "/" + id)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});
									this.getdetails(this.tableId, this.pages1, this.inputs1, this.pagesizs1);
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
							message: "已取消清除"
						});
					});
			},
			//修改弹框
			edit(id, name, code) {
				this.id = id;
				this.staffNum = code;
				this.cardselector();
				this.formLabelAlign.name = name;
				this.edits = true;
			},
			//确认修改
			ediTure() {
				if(this.formLabelAlign.name == "" || this.staffNum == "") {
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading = true;
				this.$post(api.editempg, {
						ID: this.id,
						GroupName: this.formLabelAlign.name,
						ElecCardCode: this.staffNum
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.edits = false;
							this.$message({
								message: "修改成功",
								type: "success"
							});
							this.getempglist(this.pages, this.inputs, this.pagesizs);
						} else {
							this.loading = false;
							this.edits = false;
							this.$message.error(res.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//配置
			allots() {
				this.allot = true;
			},
			alloTure() {
				this.allot = false;
			},
			//获取员工列表
			fnGetStaffList() {
				this.$get(api.empctorselector).then(res => {
					if(res.data.state == 200) {
						this.personList = res.data.data;
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},
			//配置
			allotsd(id, num) {
				this.staffNum=''
				this.id = id,
//				this.staffNum = num;
				this.cardselector();
				this.format2 = true;
			},
			//确认配置
			allBcs2() {
				this.loading = true;
				this.$post(api.cardset, {
				  "CardCode": this.staffNum,
				  "CardType": 6,
				  "BusinessID": this.id
				})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.format2 = false;
							this.$message({
								message: "配置成功",
								type: "success"
							});
							this.getempglist(this.pages, this.inputs, this.pagesizs);
						} else {
							this.loading = false;
							this.format2 = false;
							this.$message.error(res.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//清除配置
			clearSet(id) {
				this.$confirm("将清除配置, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.clearset + "/" + id)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "清除成功",
										type: "success"
									});
									this.getempglist(this.pages, this.inputs, this.pagesizs);
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
							message: "已取消清除"
						});
					});
			},
		}
	};
</script>
<style scoped="">
	.se.el-select {
		width: 100% !important;
	}
</style>