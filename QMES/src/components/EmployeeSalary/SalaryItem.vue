<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">人事薪资</span>
			<span class="h2">工资项目</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<span>工资项目:</span>
				<el-button type="primary" size="small" @click='add()'>添加</el-button>
				<div class="fr">
					<el-input v-model="inputs" placeholder="请输入工资项名称" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="iteminfo.ItemName" label="工资项名称">
				</el-table-column>
				<el-table-column prop="RuleStr" label="是否计量">
				</el-table-column>
				<el-table-column prop="iteminfo.CreateMan" label="创建人">
				</el-table-column>
				<el-table-column label="创建时间">
					<template slot-scope='scope'>
						{{scope.row.iteminfo.CreateDate | $toMoment}}
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
									<el-button size="small" type="success" @click='allots(scope.row.iteminfo.ID,scope.row.iteminfo.ItemName,scope.row.iteminfo.IsRule)'>修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
								</el-dropdown-item>
								<el-dropdown-item v-if='scope.row.iteminfo.State==1'>
									<el-button size="small" type="warning" @click='Quit(scope.row.iteminfo.ID)'>作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;废</el-button>
								</el-dropdown-item>
								<el-dropdown-item v-if='scope.row.iteminfo.State==2'>
									<el-button size="small" type="warning" @click='Quit(scope.row.iteminfo.ID)'>正&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;常</el-button>
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
		
		<el-dialog title="添加工资项目" :visible.sync="adds" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="120px">
				<el-form-item label="工资项名称">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-checkbox v-model="formLabelAlign.checked">是否源数据</el-checkbox>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="adds = false">取 消</el-button>
				<el-button size="small" type="primary" @click="addTrue()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改工资项目" :visible.sync="adds1" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="120px">
				<el-form-item label="工资项名称">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-checkbox v-model="formLabelAlign.checked">是否源数据</el-checkbox>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="adds1 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="updateuser()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import api from '../../axios/api.js'
	export default {
		name: 'SalaryItem',
		data() {
			return {
				loading:false,
				id:'',
				adds1:false,//修改 弹框
				adds:false,
				pages: 1, //页码
				total: 1, //页数
				pagesizs:10,
				tableData: [], //卡片列表
				inputs: '', //搜索
				formLabelAlign:{
					name:'',
					checked:true
				},
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
			this.Itemgetlist(this.pages,this.inputs,this.pagesizs)
		},
		methods: {
			excel(){
				this.loading = true
				this.$post(api.Itemgetlist,{
				  "PageSize":this.pagesizs,
				  "PageIndex":this.pages-1,
				  "KeyWord": this.inputs,
				  "Query": {
				    "KeyWord":this.inputs
				  },
				  "OrderString": "",
				  "ToExcel": true
				}).then(res=>{
					if(res.state==200){
						this.loading = false
						if (res.data.ExcelResult && res.data.ExcelResult.length!=0) {
							var urls = res.data.ExcelResult
							window.location.href = api.hostname+urls
			            }
					}else{
						this.loading = false
						this.$message.error(res.msg);
					}
					
				})
			},
			//获取工资项目列表
			Itemgetlist(page,val,pagesizes){
				this.loading = true
				this.$post(api.Itemgetlist,{
				  "PageSize":pagesizes,
				  "PageIndex":page-1,
				  "KeyWord": val,
				  "Query": {
				    "KeyWord": val
				  },
				  "OrderString": "",
				  "ToExcel": false
				}).then(res=>{
					if(res.state==200){
						this.loading = false
						this.tableData = res.data.Data
						this.total = res.data.Items ? res.data.Items : 1;
					}else{
						this.loading = false
						this.$message.error(res.msg);
					}
					
				})
			},
			handleSizeChange(val){
				this.pagesizs=val
				this.Itemgetlist(this.pages,this.inputs,this.pagesizs)
			},
			//分页
			handleCurrentChange(val) {
				this.pages=val
				this.Itemgetlist(this.pages,this.inputs,this.pagesizs)
			},
			//搜索
			filter(){
				this.pages=1
				this.Itemgetlist(this.pages,this.inputs,this.pagesizs)
			},
			//添加工资项目弹框
			add(){
				this.formLabelAlign.name=''
				this.formLabelAlign.checked=true
				this.adds = true
			},
			//确认添加
			addTrue(){
				if(this.formLabelAlign.name==''){
					this.$message({
			          message: "参数不能为空",
			          type: "warning"
			        });
			        return;
				}
				this.loading=true
				this.$post(api.Itemaddnew,{
				  "ItemName": this.formLabelAlign.name,
				  "IsRule": this.formLabelAlign.checked
				}).then(res=>{
					console.log(res)
					if(res.state==200){
						this.loading = false;
						this.adds = false
						
						this.Itemgetlist(this.pages,this.inputs,this.pagesizs)
					}else{
						this.loading = false;
						this.adds = false
						this.$message.error(res.msg);
					}
				})

			},
			//修改弹框
			allots(id,name,ste){
				this.id=id
				this.formLabelAlign.name=name
				this.formLabelAlign.checked=ste
				this.adds1 = true
			},
			//确认修改
			updateuser(){
				if(this.formLabelAlign.name==''){
					this.$message({
			          message: "参数不能为空",
			          type: "warning"
			        });
			        return;
				}
				this.loading = true;
				this.$post(api.Itemedititem,{
				  "ID": this.id,
				  "ItemName": this.formLabelAlign.name,
				  "IsRule": this.formLabelAlign.checked
				}).then(res=>{
					if(res.state==200){
						this.loading = false;
						this.adds1 = false
						
						this.Itemgetlist(this.pages,this.inputs,this.pagesizs)
					}else{
						this.loading = false;
						this.adds1 = false
						this.$message.error(res.msg);
					}
				})
			},
			Quit(id){
				this.$confirm("状态将要改变, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.Itemdelitem + "/" + id)
							.then(res => {
								console.log(res)
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "修改成功",
										type: "success"
									});
									
									this.Itemgetlist(this.pages,this.inputs,this.pagesizs)
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
<style scoped="">
</style>