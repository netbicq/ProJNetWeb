<template>
	<div v-loading="loading">
		<div class="title">
			<span class="h1">基础管理</span>
			<span class="h2">工艺</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<span>工艺:</span>
				<el-button type="primary" size="small" @click='add()'>添加</el-button>
				<div class="fr">
					<el-input v-model="search" placeholder="请输入工艺名称" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='Excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="ProceInfo.ProceName" label="工艺名称" sortable>
				</el-table-column>
				<el-table-column prop="ProceInfo.ElecCardCode" label="ID" sortable>
				</el-table-column>
				<el-table-column  sortable prop='CardInfo.BusinessCode' show-overflow-tooltip label="卡号">
				</el-table-column>
				<el-table-column prop="ProceInfo.AmountPrice" label="计量单价" sortable>
				</el-table-column>
				<el-table-column prop="ProceInfo.TimesPrice" label="计时单价" sortable>
				</el-table-column>
				<el-table-column prop="ProceInfo.AmountUnit" label="计量换算因子" sortable>
				</el-table-column>
				<el-table-column prop="ProceInfo.TimesUnit" label="计时换算因子" sortable>
				</el-table-column>
				<el-table-column prop="ProceInfo.CreateMan" label="创建人">
				</el-table-column>
				<el-table-column prop="CreateDate" label="创建时间">
					<template slot-scope='scope'>
						{{scope.row.ProceInfo.CreateDate?$toMoment(scope.row.ProceInfo.CreateDate):''}}
					</template>
				</el-table-column>
				<el-table-column prop="StateStr" label="状态">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<el-button size="small" type="success" @click='allots(scope.row.ProceInfo.ID, scope.row.ProceInfo.ProceName, scope.row.ProceInfo.ElecCardCode, scope.row.ProceInfo.AmountPrice, scope.row.ProceInfo.TimesPrice, scope.row.ProceInfo.AmountUnit, scope.row.ProceInfo.TimesUnit)'>修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="primary" size="small" @click="fnDel(scope.row.ProceInfo.ID)">删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="warning" @click="fnToVoid(scope.row.ProceInfo.ID)">作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;废</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" class='Purple' @click='allotsd(scope.row.ProceInfo.ID,scope.row.ProceInfo.ElecCardCode)'>配&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button  size="small" class='Inverse' @click='clearSet(scope.row.CardInfo.ID)'>清除配置</el-button>
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
		<el-dialog title="添加工艺" :visible.sync="procs" width="570px">
			<el-form ref="proce" :model="proce" label-width="120px">
				<el-form-item label="工艺名称：">
					<el-input v-model="proce.name" placeholder="请输入工艺名称"></el-input>
				</el-form-item>
				<el-form-item label="卡号：">
					<el-select class='se' v-model="proce.code" filterable placeholder="请选择电子卡号">
						<el-option v-for="item in CardCodeOption" :key="item.CardCode" :label="item.BusinessCode" :value="item.CardCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="计量单价：">
					<el-input v-model="proce.jlPrice" placeholder="请输入计量单价"></el-input>
				</el-form-item>
				<el-form-item label="计时单价：">
					<el-input v-model="proce.jsPrice" placeholder="请输入计时单价"></el-input>
				</el-form-item>
				<el-form-item label="计量换算因子：">
					<el-input v-model="proce.jlhsyz" placeholder="请输入计量换算因子"></el-input>
				</el-form-item>
				<el-form-item label="计时换算因子：">
					<el-input v-model="proce.jshsyz" placeholder="请输入计时换算因子"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="procs = false">取 消</el-button>
				<el-button size="small" type="primary" @click="allotds()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改工艺" :visible.sync="procs1" width="570px">
			<el-form ref="proce" :model="proce" label-width="120px">
				<el-form-item label="工艺名称：">
					<el-input v-model="proce.name" placeholder="请输入工艺名称"></el-input>
				</el-form-item>
				<!--<el-form-item label="卡号：">
					<el-select class='se' v-model="proce.code" filterable placeholder="请选择电子卡号">
						<el-option v-for="item in CardCodeOption" :key="item.CardCode" :label="item.BusinessCode" :value="item.CardCode">
						</el-option>
					</el-select>
				</el-form-item>-->
				<el-form-item label="计量单价：">
					<el-input v-model="proce.jlPrice" placeholder="请输入计量单价"></el-input>
				</el-form-item>
				<el-form-item label="计时单价：">
					<el-input v-model="proce.jsPrice" placeholder="请输入计时单价"></el-input>
				</el-form-item>
				<el-form-item label="计量换算因子：">
					<el-input v-model="proce.jlhsyz" placeholder="请输入计量换算因子"></el-input>
				</el-form-item>
				<el-form-item label="计时换算因子：">
					<el-input v-model="proce.jshsyz" placeholder="请输入计时换算因子"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="procs1 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="ediTure()">确 定</el-button>
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
	</div>
</template>
<script>
	import api from "../../axios/api";
	export default {
		name: "Proce",
		data() {
			return {
				loading: false,
				procs1: false, //修改工艺弹框
				procs: false, //添加工艺弹框
				pages: 1, //页码
				total: 1, //页数
				tableData: [], //卡片列表
				search: "", //搜索
				proce: {
					id: "",
					name: "",
					type: 0,
					code: "",
					jlPrice: "",
					jsPrice: "",
					jlhsyz: "",
					jshsyz: ""
				},
				staffs:[],
				formLabelAlign:{},
				format2:false,
				staffNum:'',
				pagesizs: 10,
				CardCodeOption: [] //电子卡号
			};
		},
		created() {
			this.getData(this.pages, this.search, this.pagesizs);
		},
		methods: {
			//获取电子卡
			getCard() {
				this.$get(api.cardselector + "/" + 0)
					.then(res => {
						if(res.data.state == 200) {
							this.CardCodeOption = res.data.data;
							this.staffs = res.data.data;
						} else {
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			handleSizeChange(val) {
				this.pagesizs = val;
				this.getData(this.pages, this.search, this.pagesizs);
			},
			//分页
			handleCurrentChange(val) {
				this.pages = val;
				this.getData(this.pages, this.search, this.pagesizs);
			},
			//搜索
			filter() {
				this.pages = 1;
				this.getData(this.pages, this.search, this.pagesizs);
			},
			Excel(){
				this.loading = true;
				this.$post(api.procelist, {
						PageSize: this.pagesizs,
						PageIndex: this.pages - 1,
						KeyWord: this.search,
						Query: this.search,
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
			getData(pages, val, pagesize) {
				this.loading = true;
				this.$post(api.procelist, {
						PageSize: pagesize,
						PageIndex: pages - 1,
						KeyWord: val,
						Query: val,
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
			//添加工艺
			add() {
				this.proce.name = ""; //工艺名称
				this.proce.type = 0;
				this.proce.code = ""; //电子卡号
				this.proce.jlPrice = ""; //计量单价
				this.proce.jsPrice = ""; //计时单价
				this.proce.jlhsyz = ""; //计量换算因子
				this.proce.jshsyz = ""; //计时换算因子
				this.getCard();
				this.procs = true;
			},
			//确定添加
			allotds() {
				if(this.proce.name == "") {
					this.$message({
						message: "工艺名称不能为空",
						type: "warning"
					});
					return;
				} else if(this.proce.code == "") {
					this.$message({
						message: "电子卡号不能为空",
						type: "warning"
					});
					return;
				} else if(this.proce.jlPrice == "") {
					this.$message({
						message: "计量单价不能为空",
						type: "warning"
					});
					return;
				} else if(this.proce.jsPrice == "") {
					this.$message({
						message: "计时单价不能为空",
						type: "warning"
					});
					return;
				} else if(this.proce.jlhsyz == "") {
					this.$message({
						message: "计量换算因子不能为空",
						type: "warning"
					});
					return;
				} else if(this.proce.jshsyz == "") {
					this.$message({
						message: "计时换算因子不能为空",
						type: "warning"
					});
					return;
				} else {

					this.procs = false;
					this.loading = true;
					this.$post(api.addproce, {
							ProceName: this.proce.name,
							ElecCardCode: this.proce.code,
							AmountPrice: this.proce.jlPrice,
							TimesPrice: this.proce.jsPrice,
							AmountUnit: this.proce.jlhsyz,
							TimesUnit: this.proce.jshsyz
						})
						.then(res => {
							if(res.state == 200) {
								this.loading = false;
								this.$message({
									message: "添加成功",
									type: "success"
								});
								this.pages = 1
								this.search = ''
								this.getData(this.pages, this.search, this.pagesizs);
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
			//修改工艺弹框
			allots(id, name, code, jlPrice, jsPrice, jlhsyz, jshsyz) {
				this.proce.id = id;
				this.proce.name = name;
				this.proce.type = 0;
				this.proce.code = code;
				this.proce.jlPrice = jlPrice;
				this.proce.jsPrice = jsPrice;
				this.proce.jlhsyz = jlhsyz;
				this.proce.jshsyz = jshsyz;
				this.getCard();
				this.procs1 = true;
			},
			//确定修改工艺弹框
			ediTure() {
				if(this.proce.name == "") {
					this.$message({
						message: "工艺名称不能为空",
						type: "warning"
					});
					return;
				} else if(this.proce.code == "") {
					this.$message({
						message: "电子卡号不能为空",
						type: "warning"
					});
					return;
				} else if(this.proce.jlPrice == "") {
					this.$message({
						message: "计量单价不能为空",
						type: "warning"
					});
					return;
				} else if(this.proce.jsPrice == "") {
					this.$message({
						message: "计时单价不能为空",
						type: "warning"
					});
					return;
				} else if(this.proce.jlhsyz == "") {
					this.$message({
						message: "计量换算因子不能为空",
						type: "warning"
					});
					return;
				} else if(this.proce.jshsyz == "") {
					this.$message({
						message: "计时换算因子不能为空",
						type: "warning"
					});
					return;
				} else {
					this.procs1 = false;
					this.loading = true;
					this.$post(api.editproce, {
							ID: this.proce.id,
							ProceName: this.proce.name,
							ElecCardCode: this.proce.code,
							AmountPrice: this.proce.jlPrice,
							TimesPrice: this.proce.jsPrice,
							AmountUnit: this.proce.jlhsyz,
							TimesUnit: this.proce.jshsyz
						})
						.then(res => {
							if(res.state == 200) {
								this.loading = false;
								this.$message({
									message: "修改成功",
									type: "success"
								});
								this.getData(this.pages, this.search, this.pagesizs);
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
				this.loading = true;
				this.$get(api.delproce + "/" + id)
					.then(res => {
						if(res.data.state == 200) {
							this.loading = false;
							this.$message({
								message: "删除成功",
								type: "success"
							});
							this.getData(this.pages, this.search, this.pagesizs);
						} else {
							this.loading = false;
							this.$message.error(res.data.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//作废
			fnToVoid(id) {
				this.loading = true;
				this.$post(api.procesetstate, {
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
							this.getData(this.pages, this.search, this.pagesizs);
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
			//配置
			allotsd(id, num) {
				console.log(num)
				this.staffNum = ''
				this.id = id,
				this.getCard();
//				this.staffNum = num;
				this.format2 = true;
			},
			//确认配置
			allBcs2() {
				this.loading = true;
				this.$post(api.cardset, {
				  "CardCode": this.staffNum,
				  "CardType": 2,
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
							this.getData(this.pages, this.search, this.pagesizs);
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
									this.getData(this.pages, this.search, this.pagesizs);
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

</style>