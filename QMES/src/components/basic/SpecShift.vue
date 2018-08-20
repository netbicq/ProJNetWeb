<template>
	<div v-loading="loading">
		<div class="title">
			<span class="h1">基础管理</span>
			<span class="h2">规格</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<span>规格:</span>
				<el-button type="primary" size="small" @click='addBc()'>添加</el-button>
				<div class="fr">
					<el-input v-model="inputs1" placeholder="请输入规格名称" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter1()">查询</el-button>
					<el-button type="success" @click='execls()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData1" stripe style="width: 100%">
				<el-table-column prop="SpecInfo.SpecName" label="规格名称" sortable>
				</el-table-column>
				<el-table-column prop="SpecInfo.ElecCardCode" label="ID" sortable>
				</el-table-column>
				<el-table-column sortable prop='CardInfo.BusinessCode' show-overflow-tooltip label="卡号">
				</el-table-column>
				<el-table-column prop="SpecInfo.CreateMan" label="创建人">
				</el-table-column>
				<el-table-column label="创建时间">
					<template slot-scope='scope'>
						{{scope.row.SpecInfo?$toMoment(scope.row.SpecInfo.CreateDate):''}}
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
									<el-button size="small" type="success" @click='allotsd(scope.row.SpecInfo.ID,scope.row.SpecInfo.ElecCardCode)'>配&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="warning" size="small" @click='clearSet(scope.row.CardInfo.ID)'>清除配置</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="primary" size="small" @click='states1(scope.row.SpecInfo.ID,1)'>正&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;常</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="warning" size="small" @click='states1(scope.row.SpecInfo.ID,2)'>作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;废</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="primary" size="small" @click='editBc(scope.row.SpecInfo.ID,scope.row.SpecInfo.SpecName,scope.row.SpecInfo.ElecCardCode)'>修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="danger" size="small" @click='dels(scope.row.SpecInfo.ID)'>删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</el-button>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>
			<div class="pages">
				<el-pagination @size-change="handleSizeChange" :page-sizes="[10,20,30,40,50]" :page-size="pagesizs" :current-page="pages1" @current-change="handleCurrentChange1" layout="sizes,prev, pager, next" :total="total1" background>
				</el-pagination>
			</div>
		</div>
		<el-dialog title="添加规格" :visible.sync="format" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="规格名称：">
					<el-input v-model="formLabelAlign.name" placeholder="请输入规格名称"></el-input>
				</el-form-item>
				<el-form-item label="卡号：">
					<el-select filterable class='se' v-model="staffNum" placeholder="请选择电子卡号">
						<el-option v-for="item in staffs" :key="item.CardCode" :label="item.BusinessCode" :value="item.CardCode">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="format = false">取 消</el-button>
				<el-button size="small" type="primary" @click="allBcs()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改规格" :visible.sync="format1" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="规格名称：">
					<el-input v-model="formLabelAlign.name" placeholder="请输入规格名称"></el-input>
				</el-form-item>
				<!--<el-form-item label="卡号：">
					<el-select filterable class='se' v-model="staffNum" placeholder="请选择电子卡号">
						<el-option v-for="item in staffs" :key="item.CardCode" :label="item.BusinessCode" :value="item.CardCode">
						</el-option>
					</el-select>
				</el-form-item>-->
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="format1 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="allBcs1()">确 定</el-button>
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
		name: "SpecShift",
		data() {
			return {
				pagesizs: 10,
				loading: false,
				inputs1: "",
				staffs: [], //电子卡号
				staffNum: "",
				format2: false, //配置规格弹框
				format1: false, //修改规格弹框
				format: false, //规格弹框
				edits: false, //修改班次弹框
				table: false, //添加班次弹框
				pages: 1, //页码
				total: 1, //页数
				pages1: 1, //页码
				total1: 1, //页数
				tableData: [], //卡片列表
				inputs: "", //搜索
				tableData1: [],
				formLabelAlign: {
					name: "",
					stime: "",
					etime: ""
				},
				staffNum: "",
				id: ""
			};
		},
		created() {
			this.getsepclist(this.pages1, this.inputs1, this.pagesizs);
			this.cardselector();
		},
		methods: {
			execls() {
				this.loading = true;
				this.$post(api.getsepclist, {
						PageSize: this.pagesizs,
						PageIndex: this.pages1 - 1,
						KeyWord: this.inputs1,
						Query: this.inputs1,
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
			//获取规格列表
			getsepclist(pages, val, pagesize) {
				this.loading = true;
				this.$post(api.getsepclist, {
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
			//获取卡列表
			cardselector() {
				this.$get(api.cardselector + "/" + 0)
					.then(res => {
						if(res.data.state == 200) {
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
				this.getsepclist(this.pages1, this.inputs1, this.pagesizs);
			},
			filter1() {
				this.pages1 = 1;
				this.getsepclist(this.pages1, this.inputs1, this.pagesizs);
			},
			//分页
			handleCurrentChange1(val) {
				this.pages1 = val;
				this.getsepclist(this.pages1, this.inputs1, this.pagesizs);
			},
			//添加班次
			addBc() {
				this.formLabelAlign.name = "";
				this.staff = 0;
				this.staffNum = "";
				this.cardselector();
				this.format = true;
			},
			//确定添加
			allBcs() {
				if(this.formLabelAlign.name == "" || this.staffNum == "") {
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading = true;
				this.$post(api.addspec, {
						SpecName: this.formLabelAlign.name,
						ElecCardCode: this.staffNum
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.format = false;
							this.$message({
								message: "添加成功",
								type: "success"
							});
							this.pages1 = 1;
							this.inputs1 = "";
							this.getsepclist(this.pages1, this.inputs1, this.pagesizs);
						} else {
							this.loading = false;
							this.format = false;
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
									this.getsepclist(this.pages1, this.inputs1, this.pagesizs);
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
			//删除规格
			dels(id) {
				this.$confirm("将删除规格, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.delsepc + "/" + id)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});
									this.getsepclist(this.pages1, this.inputs1, this.pagesizs);
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
			//修改班次
			editBc(id, name, num) {
				this.id = id,
				this.formLabelAlign.name = name;
				console.log(num)
				this.cardselector();
				this.staffNum = num;
				this.format1 = true;
			},
			//确定修改
			allBcs1() {
				if(this.formLabelAlign.name == "" || this.staffNum == "") {
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading = true;
				this.$post(api.editsepc, {
						ID: this.id,
						SpecName: this.formLabelAlign.name,
						ElecCardCode: this.staffNum
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.format1 = false;
							this.$message({
								message: "修改成功",
								type: "success"
							});
							this.getsepclist(this.pages1, this.inputs1, this.pagesizs);
						} else {
							this.loading = false;
							this.format = false;
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
				this.staffNum=''
				this.id = id,
				this.cardselector();
//				this.staffNum = num;
				
				this.format2 = true;
			},
			//确认配置
			allBcs2() {
				this.loading = true;
				this.$post(api.cardset, {
				  "CardCode": this.staffNum,
				  "CardType": 3,
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
							this.getsepclist(this.pages1, this.inputs1, this.pagesizs);
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
			//修改状态
			states1(id, sta) {
				this.loading = true;
				this.$post(api.sepcsetstate, {
						ID: id,
						State: sta
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.$message({
								message: "修改成功",
								type: "success"
							});
							this.getsepclist(this.pages1, this.inputs1, this.pagesizs);
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
		}
	};
</script>
<style scoped="">

</style>