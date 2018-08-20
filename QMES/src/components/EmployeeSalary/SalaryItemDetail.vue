<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">人事薪资</span>
			<span class="h2">职员工资计量明细</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<!--<span>工资数据:</span>-->
				<div class="inBook1">
				<span class="span2">月度</span>
					<el-date-picker class='months months1' format="yyyy 年 MM 月" value-format="yyyy-MM" v-model="value1" type="month" placeholder="选择日期">
					</el-date-picker>
				</div>
				<div class="inBook1">
				<span class="span2">职员</span>
				<el-select v-model="value" clearable filterable placeholder="请选择" clearable filterable>
					<el-option v-for="item in staffs" :key="item.ID" :label="item.CNName" :value="item.ID">
					</el-option>
				</el-select>
				</div>
				<div class="inBook1">
				<span class="span2">工艺</span>
				<el-select v-model="technics" clearable filterable placeholder="请选择">
					<el-option v-for="item in options" :key="item.ID" :label="item.ProceName" :value="item.ID">
					</el-option>
				</el-select>
				</div>
				<div class="inBook1">
				<span class="span2">规格</span>
				<el-select v-model="norms" clearable filterable placeholder="请选择">
					<el-option v-for="item in format" :key="item.ID" :label="item.SpecName" :value="item.ID">
					</el-option>
				</el-select>
				</div>
				<div class="fr">
					<el-input v-model="inputs" placeholder="请输入关键词" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success">导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="EmployeeInfo.CNName" label="职员">
				</el-table-column>
				<el-table-column prop="RuleInfo.DateInt" label="月度">
				</el-table-column>
				<el-table-column prop="ShiftInfo.ShiftName" label="班次">
				</el-table-column>
				<el-table-column prop="ProceInfo.ProceName" label="工艺">
				</el-table-column>
				<el-table-column prop="SpecInfo.SpecName" label="规格型号">
				</el-table-column>
				<el-table-column prop="RuleInfo.Amount" label="数量">
				</el-table-column>
				<el-table-column prop="RuleInfo.Times" label="时长">
				</el-table-column>
				<!--<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<el-button size="small" type="success">明&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;细</el-button>
								</el-dropdown-item>-->
								<!--<el-dropdown-item>
									<el-button type="primary" size="small" @click='edit()'>审&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;核</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="danger" size="small" @click='allots()'>取消审核</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="info">发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;放</el-button>
								</el-dropdown-item>-->
							<!--</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>-->
			</el-table>
			<div class="pages">
				<el-pagination @size-change="handleSizeChange" :page-sizes="[10,20,30,40,50]" :page-size="pagesizs" :current-page="pages" @current-change="handleCurrentChange" layout="sizes,prev, pager, next" :total="total" background>
				</el-pagination>
			</div>
		</div>
		<el-dialog title="核算" :visible.sync="adds1" width="20%">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="核算月度：">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="组织架构">
					<el-select class='se' v-model="staffNum" placeholder="请选择">
						<el-option v-for="item in staffs" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="职员">
					<el-select class='se' v-model="staffNum" placeholder="请选择">
						<el-option v-for="item in staffs" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="">
					<el-checkbox v-model="formLabelAlign.checked">覆盖已有数据</el-checkbox>
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
		name: 'SalaryItemDetail',
		data() {
			return {
				loading:false,
				adds1:false,
				staffs: [], //电子卡号
				staffNum: '',
				options: [],
				value: '',
				pages: 1, //页码
				total: 1, //页数
				pagesizs:10,
				tableData: [], //卡片列表
				inputs: '', //搜索
				formLabelAlign:{
					name:'',
					checked:false
				},
				value1:'',//月度
				technics:'',//工艺
				norms:'',//规格
				format:[]
			}
		},
		watch: {
		    $route(to, from) {
		      if (to.fullPath !== from.fullPath) {
		      	this.value=''
		        this.getsalaryrulelist(this.pages,this.inputs,this.value1,this.value,this.technics,this.norms,this.pagesizs)
		      }
		    }
		  },
		created(){
			let MenuList=JSON.parse(sessionStorage.menuList)
		    let RoutUrl=window.location.hash.substring(1,window.location.hash.length)
		    console.log(RoutUrl.indexOf('SalaryItemDetail'))
		    let state=false;
		    let rou = RoutUrl.split("/")
		    console.log(rou[1])
		    if(RoutUrl.indexOf('SalaryItemDetail')=== 1){
		      for(let i=0;i<MenuList.length;i++){
	            for(let j=0;j<MenuList[i].Menu.length;j++){
	              if(('/'+rou[1]) == MenuList[i].Menu[j].RoutUrl){
	                 state=true;
	              }
	            }
	          }
		    }else{
		        state=true;
		    }
		    if(!state){
	          this.$router.push({
	            path: '/404'
	          })
	        }
			this.value = this.$route.params.id
			this.getsalaryrulelist(this.pages,this.inputs,this.value1,this.value,this.technics,this.norms,this.pagesizs)
			this.empctorselector()
			this.proceselector()
			this.sepcselector()
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
			//工艺选择器
			proceselector(){
				this.$get(api.proceselector).then(res => {
					if(res.data.state == 200) {
						this.options = res.data.data
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
			//规格选择器
			sepcselector(){
				this.$get(api.sepcselector).then(res => {
					if(res.data.state == 200) {
						this.format = res.data.data
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
			handleSizeChange(val){
				this.pagesizs = val
				this.getsalaryrulelist(this.pages,this.inputs,this.value1,this.value,this.technics,this.norms,this.pagesizs)
			},
			handleCurrentChange(val) {
				this.pages = val
				this.getsalaryrulelist(this.pages,this.inputs,this.value1,this.value,this.technics,this.norms,this.pagesizs)
			},
			filter(){
				this.pages = 1
				this.getsalaryrulelist(this.pages,this.inputs,this.value1,this.value,this.technics,this.norms,this.pagesizs)
			},
			getsalaryrulelist(page,inp,mon,eId,pId,sId,pagesizes){
				this.loading=true
				this.$post(api.getsalaryrulelist,{
				  "PageSize": pagesizes,
				  "PageIndex": page-1,
				  "KeyWord": inp,
				  "Query": {
				    "Month": mon,
				    "EmployeeID": eId,
				    "ProceID": pId,
				    "SpecID": sId
				  },
				  "OrderString": "",
				  "ToExcel": false
				}).then(res=>{
					if(res.state==200){
			        	this.loading = false;
			        	this.total = res.data.Items ? res.data.Items : 1;
			        	this.tableData = res.data.Data;
			        }else {
				        this.loading = false;
				        this.$message.error(res.msg);
				    }
				})
			}
		}
	}
</script>
<style scoped="">
	.fldivs {
		width: calc(100% - 200px);
	}
</style>