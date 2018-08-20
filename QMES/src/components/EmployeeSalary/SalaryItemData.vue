<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">人事薪资</span>
			<span class="h2">工资数据明细</span>
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
					<el-input v-model="inputs" placeholder="请输入工号" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="SalaryItemInfo.DataMonth" label="月度">
					<template slot-scope='scope'>
						{{scope.row.SalaryItemInfo.DataMonth | dates}}
					</template>
				</el-table-column>
				<el-table-column prop="EmployeeInfo.CNName" label="姓名">
				</el-table-column>
				<el-table-column prop="EmployeeInfo.Code" label="工号">
				</el-table-column>
				<el-table-column prop="ItemInfo.ItemName" label="工资项">
				</el-table-column>
				<el-table-column prop="SalaryItemInfo.TotalMoney" label="金额">
				</el-table-column>
				<!--<el-table-column prop="SalaryItemInfo.TimesMoney" label="计时金额">
				</el-table-column>
				<el-table-column prop="SalaryItemInfo.AmountMoney" label="计量金额">
				</el-table-column>
				<el-table-column prop="SalaryItemInfo.Times" label="计时数">
				</el-table-column>
				<el-table-column prop="SalaryItemInfo.Amounts" label="计量数">
				</el-table-column>-->
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<router-link v-bind="{to:'/dayWages/'+(scope.row.EmployeeInfo.ID)}"><el-button size="small" type="success">计量明细</el-button></router-link> 
								</el-dropdown-item>
								<!--<el-dropdown-item>
									<el-button type="primary" size="small" @click='edit()'>审&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;核</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="danger" size="small" @click='allots()'>取消审核</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="info">发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;放</el-button>
								</el-dropdown-item>-->
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
		name: 'SalaryData',
		data() {
			return {
				loading:false,
				cascaderConfig: {
					label: 'OrgName',
				},
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
				values:[],//组织架构
				value1:'',//月份
				wageList:[],//工资项目
				wagepay:'',
			}
		},
		filters:{
			dates(values){
				var dates = new Date(values)
				 var monthn = dates.getMonth()+1;
				 var yearn  = dates.getFullYear();
				 var d = yearn+"-"+monthn;
				return d
				
			}
		},
		watch: {
		    $route(to, from) {
		      if (to.fullPath !== from.fullPath) {
		      	this.value=''
		        this.getsalaryitemlist(this.pages,this.inputs,this.wagepay,this.values[this.values.length-1],this.value,this.value1,this.pagesizs)
		      }
		    }
		  },
		created(){
			let MenuList=JSON.parse(sessionStorage.menuList)
		    let RoutUrl=window.location.hash.substring(1,window.location.hash.length)
		    console.log(RoutUrl)
		    let state=false;
		    let rou = RoutUrl.split("/")
		    if(RoutUrl.indexOf('SalaryItemData')=== 1){
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
			this.getsalaryitemlist(this.pages,this.inputs,this.wagepay,this.values[this.values.length-1],this.value,this.value1,this.pagesizs)
			this.empctorselector()
			this.getlist()
			this.itemser()
		},
		methods: {
			//获取工资项目
			itemser(){
				this.$get(api.itemser).then(res=>{
					if(res.data.state==200){
						this.wageList = res.data.data
					}else{
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
			handleSizeChange(val){
				this.pagesizs=val
				this.getsalaryitemlist(this.pages,this.inputs,this.wagepay,this.values[this.values.length-1],this.value,this.value1,this.pagesizs)
			},
			handleCurrentChange(val) {
				this.pages=val
				this.getsalaryitemlist(this.pages,this.inputs,this.wagepay,this.values[this.values.length-1],this.value,this.value1,this.pagesizs)
			},
			filter(){
				this.pages=1
				this.getsalaryitemlist(this.pages,this.inputs,this.wagepay,this.values[this.values.length-1],this.value,this.value1,this.pagesizs)
			},
			handleChange(){
				
			},
			excel(){
				this.loading=true
				this.$post(api.getsalaryitemlist,{
				  "PageSize": this.pagesizs,
				  "PageIndex": this.pages-1,
				  "KeyWord": this.inputs,
				  "Query": {
				    "SalaryItemID": this.wagepay,
				    "OrganizeID": this.values[this.values.length-1],
				    "EmployeeID":this.value,
				    "Month": this.value1
				  },
				  "OrderString": "",
				  "ToExcel": true
				}).then(res=>{
					if(res.state==200){
			        	this.loading = false;
			        	if (res.data.ExcelResult && res.data.ExcelResult.length!=0) {
							var urls = res.data.ExcelResult
							window.location.href = api.hostname+urls
			            }
			        }else {
				        this.loading = false;
				        this.$message.error(res.msg);
				    }
				})
			},
			//获取明细列表
			getsalaryitemlist(page,inpu,sId,oId,eId,mId,pagesizes){
				this.loading=true
				this.$post(api.getsalaryitemlist,{
				  "PageSize": pagesizes,
				  "PageIndex": page-1,
				  "KeyWord": inpu,
				  "Query": {
				    "SalaryItemID": sId,
				    "OrganizeID": oId,
				    "EmployeeID":eId,
				    "Month": mId
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
			},
		}
	}
</script>
<style scoped="">
	.fldivs {
		width: calc(100% - 200px);
	}
</style>