<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">基础管理</span>
			<span class="h2">电子卡</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<span>电子卡:</span>
				<el-button type="primary" size="small" @click='tongbu()'>同步</el-button>
				<label for="" style="margin: 0 15px;">卡类：</label>
				<el-select v-model="value" placeholder="请选择" filterable>
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<div class="fr">
					<el-input v-model="inputs" placeholder="请输入电子卡号" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='execl()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column label="ID" sortable>
					<template slot-scope='scope'>
						{{scope.row.CardInfo?scope.row.CardInfo.CardCode:''}}
					</template>
				</el-table-column>
				<el-table-column prop="CardTypeStr" label="卡类型">
				</el-table-column>
				<el-table-column sortable prop='CardInfo.BusinessCode' show-overflow-tooltip label="卡号">
				</el-table-column>
				<el-table-column prop="BusinessStr" label="业务名称">
				</el-table-column>
				<el-table-column label="创建人">
					<template slot-scope='scope'>
						{{scope.row.CardInfo?scope.row.CardInfo.CreateMan:''}}
					</template>
				</el-table-column>
				<el-table-column label="创建时间">
					<template slot-scope='scope'>
						{{scope.row.CardInfo?$toMoment(scope.row.CardInfo.CreateDate):''}}
					</template>
				</el-table-column>
				<el-table-column prop='StateStr' label="状态">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<el-button size="small" class='Primary' @click='allots(scope.row.CardInfo.ID,scope.row.CardInfo.CardType,scope.row.CardInfo.CardCode,scope.row.CardInfo.BusinessCode)'>配&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" class='Success' @click='states(scope.row.CardInfo.ID,1)'>正&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;常</el-button>
								</el-dropdown-item>
								<!--<el-dropdown-item>
									<el-button size="small" class='Danger' @click="states(scope.row.CardInfo.ID,2)">损&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;坏</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" class='Warning' @click="states(scope.row.CardInfo.ID,3)">挂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;失</el-button>
								</el-dropdown-item>-->
								<el-dropdown-item>
									<el-button size="small" class='Inverse' @click='edits(scope.row.CardInfo.ID,scope.row.CardInfo.BusinessCode)'>修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" class='Warning' @click="states(scope.row.CardInfo.ID,5)">作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;废</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" class='Info' @click='clearSet(scope.row.CardInfo.ID)'>清除配置</el-button>
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
		<el-dialog title="配置" :visible.sync="deploy" width="480px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="卡号：">
					<el-input v-model="num" disabled></el-input>
				</el-form-item>
				<el-form-item label="卡类型：">
					<el-select filterable v-model="caidNum" placeholder="请选择" style='width: 100%;'>
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="员工：" v-if="caidNum==1">
					<el-select v-model="BusinessID" filterable placeholder="请选择" style='width: 100%;'>
						<el-option v-for="item in staffs" :key="item.ID" :label="item.CNName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="工艺：" v-if="caidNum==2">
					<el-select v-model="BusinessID" placeholder="请选择" style='width: 100%;'>
						<el-option v-for="item in artsList" :key="item.ID" :label="item.ProceName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="规格：" v-if="caidNum==3">
					<el-select v-model="BusinessID" placeholder="请选择" style='width: 100%;'>
						<el-option v-for="item in typeList" :key="item.ID" :label="item.SpecName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="桌台：" v-if="caidNum==6">
					<el-select v-model="BusinessID" placeholder="请选择" style='width: 100%;'>
						<el-option v-for="item in tableList" :key="item.ID" :label="item.GroupName" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<!--<el-form-item class='nums'>
					<span>卡号：</span><i>1001211 </i>
					<span>卡类型：</span><i>员工卡</i>
				</el-form-item>-->
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="deploy = false">取 消</el-button>
				<el-button size="small" type="primary" @click="allotds()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改" :visible.sync="modiys" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="卡号：">
					<el-input v-model="cards" placeholder="请输入班次名称"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="modiys = false">取 消</el-button>
				<el-button size="small" type="primary" @click="modys()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import api from "../../axios/api";
	export default {
		name: "ElectronCard",
		data() {
			return {
				modiys:false,
				cards:'',//卡号
				loading: false,
				value: 0,
				options: [{
						value: 10,
						label: "全部"
					},
					{
						value: 1,
						label: "员工卡"
					},
					{
						value: 2,
						label: "工艺卡"
					},
					{
						value: 3,
						label: "规格卡"
					},
					{
						value: 4,
						label: "收料卡"
					},
					{
						value: 5,
						label: "发料卡"
					},
					{
						value: 6,
						label: "桌台卡"
					},
					{
						value: 0,
						label: "未分配"
					},
				],
				id: "",
				deploy: false, //配置弹框
				pages: 1, //页码
				total: 1, //页数
				pagesizs: 10,
				tableData: [], //卡片列表
				inputs: "", //搜索
				formLabelAlign: {},
				numbers: [], //卡号列表
				num: "", //卡号
				caidType: [], //卡类型列表
				caidNum: "", //卡类型
				staffs: [], //员工列表
				staffNum: "", //员工
				artsList: [], //工艺列表
				artsNum: "", //工艺
				tableList: [], //桌子列表
				tableNum: "", //桌号
				typeList: [], //规格类型列表
				typeNum: "", //规格类型
				BusinessID: '', //业务ID
				id:'',
				codes:''
			};
		},
		created() {
			this.cardList(this.pages, this.inputs, this.value, this.pagesizs);
			//获取员工列表
			this.fnStaffList();
			//获取工艺列表
			this.fnTechList();
			//获取规格列表
			this.fnSpeciList();
			//获取桌台列表
			this.fnDeskList();
		},
		methods: {
			//修改电子卡号
			edits(id,code){
				this.modiys=true
				this.id = id
				this.cards = code//卡号
			},
			//确认修改
			modys(){
				this.loading = true;
				this.$post(api.cardedit,{
				  "ID": this.id,
				  "BusinessCode": this.cards
				}).then(res=>{
					console.log(res)
					if(res.state==200){
						this.modiys=false
						this.loading = false;
						this.cardList(this.pages, this.inputs, this.value, this.pagesizs);
					}else{
						this.loading = false;
						this.$message.error(res.msg);
					}
				})
			},
			execl() {
				this.loading = true;
				this.$post(api.cardList, {
					PageSize: this.pagesizs,
					PageIndex: this.pages - 1,
					KeyWord: this.inputs,
					Query: {
						CardType: this.value
					},
					OrderString: "",
					ToExcel: true
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
				}).catch(error => {
					this.loading = false;
					this.$message.error(error);
				});
			},
			//获取电子卡列表
			cardList(pages, inpu, values, pagesize) {
				this.loading = true;
				this.$post(api.cardList, {
						PageSize: pagesize,
						PageIndex: pages - 1,
						KeyWord: inpu,
						Query: {
							CardType: values
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
			//同步
			tongbu() {
				this.loading = true;
				this.$get(api.syncard)
					.then(res => {
						if(res.data.state == 200) {
							this.loading = false;
							this.pages = 1;
							this.inputs = "";
							this.cardList(this.pages, this.inputs, this.value, this.pagesizs);
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
			handleSizeChange(val) {
				this.pagesizs = val;
				this.cardList(this.pages, this.inputs, this.value, this.pagesizs);
			},
			//分页
			handleCurrentChange(val) {
				this.pages = val;
				this.cardList(this.pages, this.inputs, this.value, this.pagesizs);
			},
			//查询
			filter() {
				this.pages = 1;
				this.cardList(this.pages, this.inputs, this.value, this.pagesizs);
			},
			//配置弹框
			allots(id, codetype, code,BusinessCode) {
				this.id = id;
				this.codes = code
				this.caidNum = codetype;
				this.num = BusinessCode;
				this.deploy = true;
				this.BusinessID = '';
			},
			allotds() {
				this.loading = true;
				this.$post(api.cardset, {
						CardCode: this.codes,
						CardType: this.caidNum,
						BusinessID: this.BusinessID
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.deploy = false;
							this.cardList(this.pages, this.inputs, this.value, this.pagesizs);
						} else {
							this.deploy = false;
							this.loading = false;
							this.$message.error(res.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//改变状态
			states(id, str) {
				this.loading = true;
				this.$get(api.stateset + "/" + str + "/" + id)
					.then(res => {
						if(res.data.state == 200) {
							this.loading = false;
							this.cardList(this.pages, this.inputs, this.value, this.pagesizs);
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
			//清楚配置
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
									this.cardList(this.pages, this.inputs, this.value, this.pagesizs);
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
			//获取员工列表
			fnStaffList() {
				this.$get(api.empctorselector)
					.then(res => {
						if(res.data.state == 200) {
							this.staffs = res.data.data;
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
			//获取工艺列表
			fnTechList() {
				this.$get(api.proceselector)
					.then(res => {
						if(res.data.state == 200) {
							this.artsList = res.data.data;
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
			//获取规格列表
			fnSpeciList() {
				this.$get(api.sepcselector)
					.then(res => {
						if(res.data.state == 200) {
							this.typeList = res.data.data;
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
			//获取桌台列表
			fnDeskList() {
				this.$get(api.empgselector)
					.then(res => {
						if(res.data.state == 200) {
							this.tableList = res.data.data;
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
<style scoped="">
	.nums {
		font-size: 14px;
		color: #606266;
	}
	
	.nums i {
		font-style: normal;
	}
</style>