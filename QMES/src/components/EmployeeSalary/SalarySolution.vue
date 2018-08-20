<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">人事薪资</span>
			<span class="h2">工资方案</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<span>工资方案:</span>
				<el-button type="primary" size="small" @click='add()'>添加</el-button>
				<div class="fr">
					<el-input v-model="inputs" placeholder="请输入方案名称" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excels()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="Solutioninfo.SolutionName" label="方案名称">
				</el-table-column>
				<el-table-column prop="Solutioninfo.CreateMan" label="创建人">
				</el-table-column>
				<el-table-column label="创建时间">
					<template slot-scope='scope'>
						{{scope.row.Solutioninfo ? $toMoment(scope.row.Solutioninfo.CreateDate):''}}
					</template>
				</el-table-column>
				<el-table-column prop="StateStr" label="状态">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<el-button type="primary" size="small" @click='edit(scope.row.Solutioninfo.ID,scope.row.Solutioninfo.SolutionName)'>修改</el-button>
								</el-dropdown-item>
								<el-dropdown-item v-if='scope.row.Solutioninfo!==undefined && scope.row.Solutioninfo.State == 1'>
									<el-button size="small" type="danger" @click='Quit(scope.row.Solutioninfo.ID)'>作废</el-button>
								</el-dropdown-item>
								<el-dropdown-item v-if='scope.row.Solutioninfo!==undefined && scope.row.Solutioninfo.State == 2'>
									<el-button size="small" type="success" @click='Quit(scope.row.Solutioninfo.ID)'>正常</el-button>
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
		
		<el-dialog title="添加方案" :visible.sync="adds" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="方案名称：">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="adds = false">取 消</el-button>
				<el-button size="small" type="primary" @click="allAdd()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改方案" :visible.sync="adds1" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="方案名称：">
					<el-input v-model="formLabelAlign.name"></el-input>
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
		name: 'SalarySolution',
		data() {
			return {
				loading:false,
				adds1:false,//修改弹框
				adds:false,//添加弹框变量
				pages: 1, //页码
				total: 1, //页数
				pagesizs:10,
				tableData: [{
					cNum:10012,
					cardType:'员工卡',
					cName:'张三',
					State:'正常'
				},{
					cNum:10012,
					cardType:'员工卡',
					cName:'张三',
					State:'正常'
				}], //卡片列表
				inputs: '', //搜索
				formLabelAlign:{
					name:'',
				},
				id:'',
			}
		},
		filters:{
			$toMoment:function (fmt) {
			  let date=new Date(fmt);
			  let y=date.getFullYear()
			  let m=date.getMonth()+1;
			  let d=date.getDate();
			  return y+'-'+m+'-'+d;
			}
		},
		created(){
			this.Itemgetlistsous(this.pages,this.inputs,this.pagesizs)
		},
		methods: {
			excels(){
				this.loading=true
				this.$post(api.Itemgetlistsous,{
				  "PageSize": this.pagesizs,
				  "PageIndex": this.pages-1,
				  "KeyWord": this.inputs,
				  "Query": {
				    "KeyWord": this.inputs
				  },
				  "OrderString": "",
				  "ToExcel": true
				}).then(res=>{
					console.log(res)
					if(res.state==200){
						this.loading=false
						if (res.data.ExcelResult && res.data.ExcelResult.length!=0) {
							var urls = res.data.ExcelResult
							window.location.href = api.hostname+urls
			            }
					}else{
						this.loading=false
						this.$message.error(res.msg)
					}
					
				})
			},
			//获取工资方案列表
			Itemgetlistsous(page,vals,pagesizes){
				this.loading=true
				this.$post(api.Itemgetlistsous,{
				  "PageSize": pagesizes,
				  "PageIndex": page-1,
				  "KeyWord": vals,
				  "Query": {
				    "KeyWord": vals
				  },
				  "OrderString": "",
				  "ToExcel": false
				}).then(res=>{
					console.log(res)
					if(res.state==200){
						this.loading=false
						this.tableData = res.data.Data
						this.total = res.data.Items ? res.data.Items : 1;
					}else{
						this.loading=false
						this.$message.error(res.msg)
					}
					
				})
			},
			handleSizeChange(val){
				this.pagesizs = val
				this.Itemgetlistsous(this.pages,this.inputs,this.pagesizs)
			},
			//分页
			handleCurrentChange(val) {
				this.pages = val
				this.Itemgetlistsous(this.pages,this.inputs,this.pagesizs)
			},
			filter(){
				this.pages = 1
				this.Itemgetlistsous(this.pages,this.inputs,this.pagesizs)
			},
			//添加弹框
			add(){
				this.formLabelAlign.name=''
				this.adds = true
			},
			//确认添加
			allAdd(){
				if(this.formLabelAlign.name==''){
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading= true
				this.$post(api.Itemaddsolution,{
				  "SolutionName": this.formLabelAlign.name
				}).then(res=>{
					console.log(res)
					if(res.state==200){
						this.$message({
							message: "添加成功",
							type: "success"
						});
						this.loading= false
						this.pages = 1
						this.inputs=''
						this.adds = false
						this.Itemgetlistsous(this.pages,this.inputs,this.pagesizs)
					}else{
						this.adds = false
						this.loading= false
						this.$message.error(res.msg)
					}
					
				})
				
			},
			//修改弹框
			edit(id,name){
				this.id = id
				this.formLabelAlign.name= name
				this.adds1 = true
			},
			//确认修改
			update(){
				if(this.formLabelAlign.name==''){
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading= true
				this.$post(api.Itemeditsolution,{
				  "ID":this.id,
				  "SolutionName": this.formLabelAlign.name
				}).then(res=>{
					console.log(res)
					if(res.state==200){
						this.$message({
							message: "修改成功",
							type: "success"
						});
						this.loading= false
						
						this.adds1 = false
						this.Itemgetlistsous(this.pages,this.inputs,this.pagesizs)
					}else{
						this.adds1 = false
						this.loading= false
						this.$message.error(res.msg)
					}
				})
			},
			//状态
			Quit(id){
				this.$confirm("状态将要改变, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.Itemdelsolution + "/" + id)
							.then(res => {
								console.log(res)
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "修改成功",
										type: "success"
									});
									
									this.Itemgetlistsous(this.pages,this.inputs,this.pagesizs)
								} else {
									this.loading = false;
									this.$message.error(res.data.msg);
								}
							})
							.catch(function(error) {
								this.loading = false;
								this.$message.error(error);
							});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消修改"
						});
					});
			}
		}
	}
</script>
<style scoped=""
</style>