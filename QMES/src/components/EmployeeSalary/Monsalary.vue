<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">人事薪资</span>
			<span class="h2">月工资</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<div class="inBook1">
					<span class="span2">月份</span>
					 <el-date-picker class='months1 yuefen' v-model="datas" type="month" placeholder="选择月" format="yyyy 年 MM 月" value-format="yyyy-MM">
    				</el-date-picker>
				</div>
				
				<div class="inBook1">
				<span class="span2">职员</span>
				<el-select v-model="employee" clearable filterable placeholder="请选择">
					<el-option v-for="item in emplo" :key="item.ID" :label="item.CNName" :value="item.ID">
					</el-option>
				</el-select>
				</div>
				<div class="inBook1">
					<span class="span2">组织架构</span>
					<el-cascader class='cascader' change-on-select :options="options" clearable filterable :props="cascaderConfig" v-model="organiz" separator='-' @change="handleChange">
					</el-cascader>
				</div>
				<div class="inBook1" style="line-height: 30px;height:30px">
					<span class="span2">包含离职</span>
					<el-checkbox v-model="checked"></el-checkbox>
				</div>
				<!--<div class="inBook4">
					<el-button type="success" @click='culate()'>计算日工资</el-button>
				</div>-->
				<div class="fr">
					<el-input v-model="inputs" placeholder="请输入关键词" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>

			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" :expand-row-keys="expands" :row-key="getRowKeys" @expand-change='expand' stripe style="width: 100%" >
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-table
						border
						:data="props.row.SalaryRules"
						style="width: 100%">
						<el-table-column
						type="index"
						width="50">
						</el-table-column>
						<el-table-column
							prop="ProceInfo.ProceName"
							label="工艺"
							width="180">
						</el-table-column>
						<el-table-column
							prop="SpecInfo.SpecName"
							label="规格"
							width="180">
						</el-table-column>
						<el-table-column
							prop="Amount"
							label="数量">
						</el-table-column>
						<el-table-column
							prop="RuleMoney"
							label="金额">
						</el-table-column>
						<el-table-column
							prop="AmountGroup"
							label="平摊数量">
						</el-table-column>
						<el-table-column
							prop="RuleMoneyGroup"
							label="平摊金额">
						</el-table-column>
						<el-table-column
							prop="SendAmount"
							label="发料">
						</el-table-column>
						</el-table>
					</template>
					</el-table-column>
				<el-table-column type="index" label="序号">
				</el-table-column>
				<el-table-column prop="EmployeeInfo.Code" label="工号">
				</el-table-column>
				<el-table-column prop="EmployeeInfo.CNName" label="姓名">
				</el-table-column>
				
				<el-table-column prop="MonthInt" label="月度">
					<!--<template slot-scope='scope'>
						{{scope.row.DayDate ? $toMoment(scope.row.DayDate):''}}
					</template>-->
				</el-table-column>
				<el-table-column prop="TotalAmount" label="总工时">
				</el-table-column>
				<el-table-column prop="AmountTimes" label="计件工时">
				</el-table-column>
				<el-table-column prop="HourTimes" label="点工工时">
				</el-table-column>
				<el-table-column prop="OverTimes" label="加班工时">
				</el-table-column>
				<el-table-column prop="Subsidy" label="补贴">
				</el-table-column>
				<el-table-column prop="Other" label="调整项">
				</el-table-column>
				<el-table-column prop="AmountMoney" label="计件工资">
				</el-table-column>
				<el-table-column prop="TotalMoney" label="合计工资">
				</el-table-column>
				
				<!--<el-table-column prop="AmountAvgSalary" label="计件平均工值">
				</el-table-column>
				<el-table-column prop="TotalAvgSalary" label="合计平均工值">
				</el-table-column>-->
				
				
			</el-table>
			<div class="pages">
				<el-pagination @size-change="handleSizeChange" :page-sizes="[10,20,30,40,50]" :page-size="pagesizs" :current-page="pages" @current-change="handleCurrentChange" layout="sizes,prev, pager, next" :total="total" background>
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '../../axios/api.js'
	export default {
		name: 'Monsalary',
		data() {
			return {
				xinashi:true,
				radio2:1,
				formLabelAlign:{},
				adds4:false,
				tableData:[],
				pagesizs:10,
				pages:1,
				total:1,
				inputs:'',
				loading:'',
				staffs:[],
				value:'',
				wageList:[],
				wagepay:'',
				value1:'',
				datas:new Date(),
				datas1:'',
				expands:[],
				getRowKeys(row) {
			            return row.EmployeeInfo.ID;
			    },
			    emplo:[],
			    employee:'',
			    cascaderConfig: {
					label: 'OrgName',
				},
			    options: [],//组织架构
			    organiz:[],
			    checked:false,
			    
			}
		},
		filters: {
		},
		watch: {
		    $route(to, from) {
		      if (to.fullPath !== from.fullPath) {
		      	this.inputs = ''
				this.pages=1
				this.employee =''
				this.value =''
				this.wagepay =''
				this.radio2=2
				this.organiz=[]
				this.checked=false
				this.getdaydatas(this.pagesizs,this.pages,this.inputs,this.datas,this.radio2,this.employee,this.organiz[this.organiz.length-1],this.checked)
		      }
		    }
		  },
		created() {
			this.datas=this.$toMoment(this.datas)
			let MenuList=JSON.parse(sessionStorage.menuList)
		    let RoutUrl=window.location.hash.substring(1,window.location.hash.length)
		    console.log(RoutUrl)
		    let state=false;
		    let rou = RoutUrl.split("/")
		    if(RoutUrl.indexOf('Monsalary')=== 1){
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
		    this.employee = this.$route.params.id
			this.sepcselector()
			this.proceselector()
			this.empctorselector()
			this.getlist()
			this.getdaydatas(this.pagesizs,this.pages,this.inputs,this.datas,this.radio2,this.employee,this.organiz[this.organiz.length-1],this.checked)
		},
		computed:{
		    totalPrice(){
			    let date = new Date(this.datas);
				let y = date.getFullYear()
				let m = date.getMonth() + 1;
				return y + '-' + m;
		    }
		},
		methods: {
			handleChange() {

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
			expand(row){
				if(row.EmployeeInfo.ID==this.expands[0]){
					this.expands =[]
					return
				}
				this.expands = [];
        		this.expands.push(row.EmployeeInfo.ID);
			},
			//获取职员
			empctorselector() {
				this.$get(api.empctorselector).then(res => {
					if(res.data.state == 200) {
						this.emplo = res.data.data
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
			//获取规格列表
			sepcselector(){
				this.$get(api.sepcselector).then(res=>{
					if(res.data.state==200){
						this.staffs = res.data.data
					}else{
						this.$message.error(res.data.msg)
					}
				})
			},
			//获取工艺
			proceselector(){
				this.$get(api.proceselector).then(res=>{
					if(res.data.state==200){
						this.wageList = res.data.data
					}else{
						this.$message.error(res.data.msg)
					}
				})
			},
			handleSizeChange(val){
				this.pagesizs=val
				this.getdaydatas(this.pagesizs,this.pages,this.inputs,this.datas,this.radio2,this.employee,this.organiz[this.organiz.length-1],this.checked)
			},
			handleCurrentChange(val){
				this.pages=val
				this.getdaydatas(this.pagesizs,this.pages,this.inputs,this.datas,this.radio2,this.employee,this.organiz[this.organiz.length-1],this.checked)
			},
			filter(){
				this.pages=1
				this.getdaydatas(this.pagesizs,this.pages,this.inputs,this.datas,this.radio2,this.employee,this.organiz[this.organiz.length-1],this.checked)
			},
			excel(){
				this.loading = true
				this.$post(api.getmonthsalary,{
				  "PageSize": this.pagesizs,
				  "PageIndex": this.pages-1,
				  "KeyWord": this.inputs,
				  "Query": {
				    "Day": this.totalPrice,
				    "QueryType": this.radio2,
				    "EmployeeID":this.employee,
				    "OrganID": this.organiz[this.organiz.length-1],
				    "Empbool":this.checked
				  },
				  "OrderString": "",
				  "ToExcel": true
				}).then(res=>{
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
			getdaydatas(page,total,inp,days,raios,eId,organID,checked){
				this.loading = true
				this.$post(api.getmonthsalary,{
				  "PageSize": page,
				  "PageIndex": total-1,
				  "KeyWord": inp,
				  "Query": {
				    "Day": days,
				    "QueryType": raios,
				    "EmployeeID":eId,
				    "OrganID": organID,
				    "Empbool":checked
				  },
				  "OrderString": "",
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
		}
	}
</script>
<style scoped="">
</style>