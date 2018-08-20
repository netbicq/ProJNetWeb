<template>
	<div v-loading="loading">
		<div class="title">
			<span class="h1">基础管理</span>
			<span class="h2">工艺规则</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<span>工艺:</span>
				<el-select v-model="TechnologyValue" clearable filterable placeholder="请选择工艺">
					<el-option v-for="item in TechOptions" :key="item.ID" :label="item.ProceName" :value="item.ID">
					</el-option>
				</el-select>
				<el-button type="primary" size="small" @click="add()">添加</el-button>
				<div class="fr">
					<el-input v-model="search" placeholder="请输入规则名称" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="ProceRuleInfo.RuleName" label="规则名称">
				</el-table-column>
				<el-table-column prop="SpecStr" label="规格型号">
				</el-table-column>
				<el-table-column prop="EmployeeTypeStr" label="员工类型">
				</el-table-column>
				<el-table-column prop="ShiftStr" label="班次">
				</el-table-column>
				<el-table-column prop="RuleTypeStr" label="规则类型">
				</el-table-column>
				<el-table-column prop="ProceRuleInfo.AmountPrice" label="计量单价">
				</el-table-column>
				<el-table-column prop="ProceRuleInfo.TimesPrice" label="计时单价">
				</el-table-column>
				<el-table-column prop="ProceRuleInfo.AmountUnit" label="计量换算因子">
				</el-table-column>
				<el-table-column prop="ProceRuleInfo.TimesUnit" label="计时换算因子">
				</el-table-column>
				<el-table-column prop="StateStr" label="状态">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<el-button size="small" type="success" @click='edit(scope.row.ProceRuleInfo.ID,scope.row.ProceRuleInfo.ProceID,scope.row.ProceRuleInfo.RuleName,scope.row.ProceRuleInfo.EmployeeType,scope.row.ProceRuleInfo.ShiftID,scope.row.ProceRuleInfo.RuleType,scope.row.ProceRuleInfo.AmountPrice,scope.row.ProceRuleInfo.TimesPrice,scope.row.ProceRuleInfo.AmountUnit,scope.row.ProceRuleInfo.TimesUnit,scope.row.ProceRuleInfo.SpecID)'>修改</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="danger" @click="fnDel(scope.row.ProceRuleInfo.ID)">删除</el-button>
								</el-dropdown-item>
								<el-dropdown-item v-if='scope.row.ProceRuleInfo.State == 1'>
									<el-button type="primary" size="small" @click="fnToVoid(scope.row.ProceRuleInfo.ID)">作废</el-button>
								</el-dropdown-item>
								<el-dropdown-item v-else>
									<el-button type="primary" size="small" @click="normal(scope.row.ProceRuleInfo.ID)">正常</el-button>
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
		<el-dialog title="添加工艺规则" :visible.sync="addBox" width="570px">
			<el-form ref="RuleS" :model="RuleS" label-width="110px">
				<el-form-item label="规格型号：">
					<el-select class='se' v-model="RuleS.Speci" filterable placeholder="请选择规格型号" @change='changes'>
						<el-option v-for="item in RuleTypeOptions" :key="item.ID" :label="item.SpecName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="工艺：">
					<el-select class='se' v-model="RuleS.Tech" filterable placeholder="请选择工艺"  @change='changes1'>
						<el-option v-for="item in TechOptions" :key="item.ID" :label="item.ProceName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="规则名称：">
					<el-input v-model="RuleS.name" placeholder="请输入规则名称"></el-input>
				</el-form-item>
				<el-form-item label="员工类型：">
					<el-select class='se' v-model="RuleS.StaffType" filterable placeholder="请选择员工类型">
						<el-option v-for="item in StaffTypeOptions" :key="item.ID" :label="item.DictName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="班次：">
					<el-select class='se' v-model="RuleS.Shift" filterable placeholder="请选择班次">
						<el-option v-for="item in ShiftOptions" :key="item.ID" :label="item.ShiftName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="规则类型:">
					<el-select class='se' v-model="RuleS.StandardType" filterable placeholder="请选择规则类型">
						<el-option v-for="item in RuleStandard" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="计量单价：">
					<el-input v-model="RuleS.jlPrice" placeholder="请输入计量单价"></el-input>
				</el-form-item>
				<el-form-item label="计时单价：">
					<el-input v-model="RuleS.jsPrice" placeholder="请输入计时单价"></el-input>
				</el-form-item>
				<el-form-item label="计量换算因子：">
					<el-input v-model="RuleS.jlhsyz" placeholder="请输入计量换算因子"></el-input>
				</el-form-item>
				<el-form-item label="计时换算因子：">
					<el-input v-model="RuleS.jshsyz" placeholder="请输入计时换算因子"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="addBox = false">取 消</el-button>
				<el-button size="small" type="primary" @click="append()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改工艺规则" :visible.sync="modiy" width="570px">
			<el-form ref="RuleS" :model="RuleS" label-width="110px">
				<el-form-item label="规格型号：">
					<el-select class='se' v-model="RuleS.Speci" filterable placeholder="请选择规格型号" @change='changes'>
						<el-option v-for="item in RuleTypeOptions" :key="item.ID" :label="item.SpecName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="工艺：">
					<el-select class='se' v-model="RuleS.Tech" filterable placeholder="请选择工艺" @change='changes1'>
						<el-option v-for="item in TechOptions" :key="item.ID" :label="item.ProceName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="规则名称：">
					<el-input v-model="RuleS.name" placeholder="请输入规则名称"></el-input>
				</el-form-item>
				<el-form-item label="员工类型：">
					<el-select class='se' v-model="RuleS.StaffType" filterable placeholder="请选择员工类型">
						<el-option v-for="item in StaffTypeOptions" :key="item.ID" :label="item.DictName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="班次：">
					<el-select class='se' v-model="RuleS.Shift" filterable placeholder="请选择班次">
						<el-option v-for="item in ShiftOptions" :key="item.ID" :label="item.ShiftName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="规则类型：">
					<el-select class='se' v-model="RuleS.StandardType" filterable placeholder="请选择规则类型">
						<el-option v-for="item in RuleStandard" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="计量单价：">
					<el-input v-model="RuleS.jlPrice" placeholder="请输入计量单价"></el-input>
				</el-form-item>
				<el-form-item label="计时单价：">
					<el-input v-model="RuleS.jsPrice" placeholder="请输入计时单价"></el-input>
				</el-form-item>
				<el-form-item label="计量换算因子：">
					<el-input v-model="RuleS.jlhsyz" placeholder="请输入计量换算因子"></el-input>
				</el-form-item>
				<el-form-item label="计时换算因子：">
					<el-input v-model="RuleS.jshsyz" placeholder="请输入计时换算因子"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="modiy = false">取 消</el-button>
				<el-button  size="small" type="primary" @click="updateuser()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import api from "../../axios/api";
	export default {
		name: "ProceRule",
		data() {
			return {
				loading: false,
				addBox: false, //添加弹框
				modiy: false, //修改弹框
				RuleS: {
					ID: "",
					Tech: "",
					name: "",
					StaffType: "",
					Shift: "",
					Speci: "",
					StandardType: "",
					jlPrice: "",
					jsPrice: "",
					jlhsyz: "",
					jshsyz: ""
				},
				pages: 1, //页码
				total: 1, //页数
				pagesizs: 10,
				tableData: [], //词典列表
				search: "", //搜索
				TechnologyValue: "", //工艺选择的值
				TechOptions: [], //工艺选择器
				StaffTypeOptions: [], //员工类型选择器
				ShiftOptions: [], //班次选择器
				RuleTypeOptions: [], //规格型号选择器
				RuleStandard: [{
						value: 1,
						label: "计算数量"
					},
					{
						value: 2,
						label: "计算时长"
					},
					{
						value: 3,
						label: "计量与计时"
					}
				], //规则类型选择器
				ge:'',
				gy:''
			};
		},
		created() {
			//获取列表数据
			//工艺选择器
			this.fnTechSelect();
			//规格型号选择器
			this.fnRuleSelect();
			//班次选择器列表
			this.fnShiftSelect();
			//获取员工类型（来自于词典）
			this.fnGetStaffType(1);
		},
		methods: {
			handleSizeChange(val) {
				this.pagesizs = val
				this.getData(this.pages, this.search, this.TechnologyValue, this.pagesizs);
			},
			//分页
			handleCurrentChange(val) {
				this.pages = val;
				this.getData(this.pages, this.search, this.TechnologyValue, this.pagesizs);
			},
			//搜索
			filter() {
				this.pages = 1;
				this.getData(this.pages, this.search, this.TechnologyValue, this.pagesizs);
			},
			excel() {
				this.loading = true;
				this.$post(api.rulelist, {
						PageSize: this.pagesizs,
						PageIndex: this.pages - 1,
						KeyWord: this.search,
						Query: {
							ProceID: this.TechnologyValue
						},
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
			//获取列表
			getData(pages, val, id, pagesize) {
				this.loading = true;
				this.$post(api.rulelist, {
						PageSize: pagesize,
						PageIndex: pages - 1,
						KeyWord: val,
						Query: {
							ProceID: id
						},
						OrderString: "",
						ToExcel: false
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.tableData = res.data.Data;
							this.total = res.data.Items ? res.data.Items : 1;
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
			//改变
			changes(selVal){
			console.log(this.RuleTypeOptions)
				for(var i = 0;i<this.RuleTypeOptions.length;i++){
					if(selVal==this.RuleTypeOptions[i].ID){
						this.ge = this.RuleTypeOptions[i].SpecName
					}
				}
				this.RuleS.name = this.ge+'-'+this.gy; //规则名称
			},
			//改变
			changes1(selVal){
				console.log(selVal)
				console.log(this.TechOptions)
				for(var i = 0;i<this.TechOptions.length;i++){
					if(selVal==this.TechOptions[i].ID){
						this.gy = this.TechOptions[i].ProceName
					}
					
				}
				this.RuleS.name = this.ge +'-'+ this.gy; //规则名称
			},
			//添加词典弹框
			add() {
				this.ge=''
				this.gy=''
				this.RuleS.name=''
				this.RuleS.Tech = this.TechnologyValue; //工艺
				this.RuleS.StaffType = "" //员工类型;
				this.RuleS.Shift = "" //班次;
				this.RuleS.Speci = ""; //规格型号
				this.RuleS.StandardType = "" //规则类型;
				this.RuleS.jlPrice = "" //计量单价;
				this.RuleS.jsPrice = "" //计时单价;
				this.RuleS.jlhsyz = "" //计量换算因子;
				this.RuleS.jshsyz = "" //计时换算因子;
				this.addBox = true;
			},
			//确认添加
			append() {
				if(this.RuleS.Tech == "") {
					this.$message({
						message: "工艺不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.jlhsyz == "") {
					this.$message({
						message: "计时单价不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.jsPrice == "") {
					this.$message({
						message: "计量换算因子不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.jshsyz == "") {
					this.$message({
						message: "计时换算因子不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.name == "") {
					this.$message({
						message: "规则名称不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.StandardType == "") {
					this.$message({
						message: "规则类型不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.jlPrice == "") {
					this.$message({
						message: "计量单价不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.StaffType == "") {
					this.$message({
						message: "员工类型不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.Shift == "") {
					this.$message({
						message: "班次不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.Speci == "") {
					this.$message({
						message: "规格型号不能为空",
						type: "warning"
					});
					return;
				} else {
					this.loading = true;
					this.addBox = false;
					this.$post(api.addrule, {
							ProceID: this.RuleS.Tech,
							SpecID: this.RuleS.Speci,
							RuleName: this.RuleS.name,
							EmployeeType: this.RuleS.StaffType,
							ShiftID: this.RuleS.Shift,
							RuleType: this.RuleS.StandardType,
							AmountPrice: this.RuleS.jlPrice,
							TimesPrice: this.RuleS.jsPrice,
							AmountUnit: this.RuleS.jlhsyz,
							TimesUnit: this.RuleS.jshsyz
						})
						.then(res => {
							if(res.state == 200) {
								this.loading = false;
								this.$message({
									message: "添加成功",
									type: "success"
								});
								this.search = ''
								this.pages = 1
								this.getData(this.pages, this.search, this.TechnologyValue, this.pagesizs);
							} else {
								this.loading = false;
								this.$message.error(res.msg);
							}
						})
						.catch(error => {
							this.loading = false;
							this.$message.error(error);
						});
				}
			},
			//修改弹框
			edit(
				ID,
				ProceID,
				RuleName,
				EmployeeType,
				ShiftID,
				RuleType,
				AmountPrice,
				TimesPrice,
				AmountUnit,
				TimesUnit,
				SpecID
			) {
				for(var i = 0;i<this.RuleTypeOptions.length;i++){
					if(SpecID==this.RuleTypeOptions[i].ID){
						this.ge = this.RuleTypeOptions[i].SpecName
					}
				}
				for(var i = 0;i<this.TechOptions.length;i++){
					if(ProceID==this.TechOptions[i].ID){
						this.gy = this.TechOptions[i].ProceName
					}
					
				}
				this.RuleS.ID = ID;
				this.RuleS.Tech = ProceID;
				this.RuleS.name = RuleName;
				this.RuleS.StaffType = EmployeeType;
				this.RuleS.Shift = ShiftID;
				this.RuleS.Speci = SpecID;
				this.RuleS.StandardType = RuleType;
				this.RuleS.jlPrice = AmountPrice;
				this.RuleS.jsPrice = TimesPrice;
				this.RuleS.jlhsyz = AmountUnit;
				this.RuleS.jshsyz = TimesUnit;
				this.modiy = true;
			},
			//确认修改
			updateuser() {
				if(this.RuleS.Tech == "") {
					this.$message({
						message: "工艺不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.jlhsyz == "") {
					this.$message({
						message: "计时单价不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.jsPrice == "") {
					this.$message({
						message: "计量换算因子不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.jshsyz == "") {
					this.$message({
						message: "计时换算因子不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.name == "") {
					this.$message({
						message: "规则名称不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.StandardType == "") {
					this.$message({
						message: "规则类型不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.jlPrice == "") {
					this.$message({
						message: "计量单价不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.StaffType == "") {
					this.$message({
						message: "员工类型不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.Shift == "") {
					this.$message({
						message: "班次不能为空",
						type: "warning"
					});
					return;
				} else if(this.RuleS.Speci == "") {
					this.$message({
						message: "规格型号不能为空",
						type: "warning"
					});
					return;
				} else {
					this.modiy = false;
					this.loading = true;
					this.$post(api.editrule, {
							ID: this.RuleS.ID,
							ProceID: this.RuleS.Tech,
							SpecID: this.RuleS.Speci,
							RuleName: this.RuleS.name,
							EmployeeType: this.RuleS.StaffType,
							ShiftID: this.RuleS.Shift,
							RuleType: this.RuleS.StandardType,
							AmountPrice: this.RuleS.jlPrice,
							TimesPrice: this.RuleS.jsPrice,
							AmountUnit: this.RuleS.jlhsyz,
							TimesUnit: this.RuleS.jshsyz
						})
						.then(res => {
							if(res.state == 200) {
								this.loading = false;
								this.$message({
									message: "修改成功",
									type: "success"
								});
								this.getData(this.pages, this.search, this.TechnologyValue, this.pagesizs);
							} else {
								this.loading = false;
								this.$message.error(res.msg);
							}
						})
						.catch(error => {
							this.loading = false;
							this.$message.error(error);
						});
				}
			},
			//删除
			fnDel(id) {
				this.$confirm("将永久删除该规则, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.delrule + "/" + id)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});
									this.getData(this.pages, this.search, this.TechnologyValue, this.pagesizs);
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
			//作废
			fnToVoid(id) {
				this.loading = true;
				this.$post(api.rulesetstate, {
						ID: id,
						State: 2
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.$message({
								message: "作废成功",
								type: "success"
							});
							this.getData(this.pages, this.search, this.TechnologyValue, this.pagesizs);
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
			//正常
			normal(id) {
				this.loading = true;
				this.$post(api.rulesetstate, {
						ID: id,
						State: 1
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.$message({
								message: "状态正常",
								type: "success"
							});
							this.getData(this.pages, this.search, this.TechnologyValue, this.pagesizs);
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
			//工艺选择器列表
			fnTechSelect() {
				this.$get(api.proceselector).then(res => {
					if(res.data.state == 200) {
						this.TechOptions = res.data.data;
						////        this.TechnologyValue = this.TechOptions[0]
						//          ? this.TechOptions[0].ID
						//          : "";
						this.getData(this.pages, this.search, this.TechnologyValue, this.pagesizs);
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},
			//班次选择器列表
			fnShiftSelect() {
				this.$get(api.shiftselector).then(res => {
					if(res.data.state == 200) {
						this.ShiftOptions = res.data.data;
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},
			//规格型号选择器
			fnRuleSelect() {
				this.$get(api.sepcselector).then(res => {
					if(res.data.state == 200) {
						this.RuleTypeOptions = res.data.data;
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},
			//获取员工类型
			fnGetStaffType(type) {
				//来自于词典选择器
				this.$get(api.dictSelector + "/" + type).then(res => {
					if(res.data.state == 200) {
						this.StaffTypeOptions = res.data.data;
					} else {
						this.$message.error(res.data.msg);
					}
				});
			}
		}
	};
</script>
<style scoped="">

</style>