<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">人事薪资</span>
			<span class="h2">工资方案定义</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<div class="fl gnag clearfix">
					<div class="fl">
					<span>工资方案：</span>
		            <el-select v-model="project" filterable clearable placeholder="请选择" filterable>
		                <el-option
		                v-for="item in projectList"
		                :key="item.ID"
		                :label="item.SolutionName"
		                :value="item.ID">
		                </el-option>
		            </el-select>	            
		            <div class="" style="margin-top: 5px;margin-left: 10px;margin-right:10px;display: inline-block;">
		              <i class="icons el-icon-circle-plus-outline" @click='pushGz()' title="添加方案"></i>
		              <!--<i class="icons el-icon-delete" title="删除方案"></i>-->
		              <i class="icons el-icon-edit" @click='editGz()' title="修改方案"></i>
		            </div>
		            </div>
		            <div class="fl">
		            <span>工资项目：</span>
		            <el-select v-model="wageOption" filterable clearable placeholder="请选择" filterable>
		                <el-option
		                v-for="item in wageList"
		                :key="item.ID"
		                :label="item.ItemName"
		                :value="item.ID">
		                </el-option>
		            </el-select>
		            <div class="" style="margin-top: 5px;margin-left: 10px;margin-right:10px;display: inline-block;">
		              <i class="icons el-icon-circle-plus-outline" @click='addgzx()' title="添加工资项"></i>
		              <i class="icons el-icon-edit" @click='editgzx()' title="修改工资项"></i>
		              <i class="icons el-icon-share" @click='join()' title="加入"></i>
		            </div>
		            </div>
	            </div>
	            <div class="fr">
					<el-input v-model="inputs" placeholder="请输入工资方案" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="SolutionStr" label="工资方案">
				</el-table-column>
				<el-table-column prop="ItemStr" label="工资项目">
				</el-table-column>
				<el-table-column label="计算顺序">
					<template slot-scope="scope">
						<el-input v-model="scope.row.SolutionIteminfo.CalcIndex"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="显示顺序">
					<template slot-scope="scope">
						<el-input v-model="scope.row.SolutionIteminfo.VisiableIndex"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="是否显示">
					<template slot-scope="scope">
						<el-switch
						  v-model="scope.row.SolutionIteminfo.IsVisiable"
						  active-color="#13ce66"
						  inactive-color="#ff4949">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="SolutionIteminfo.ItemExpress" label="计算公式">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<el-button size="small" type="success" @click='conserve(scope.row.SolutionIteminfo.ID,scope.row.SolutionIteminfo.SolutionID,scope.row.SolutionIteminfo.ItemID,scope.row.SolutionIteminfo.ItemExpress,scope.row.SolutionIteminfo.CalcIndex,scope.row.SolutionIteminfo.VisiableIndex,scope.row.SolutionIteminfo.IsVisiable)'>保存</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="primary" size="small" @click='edit(scope.row.SolutionIteminfo.ID,scope.row.SolutionIteminfo.SolutionID,scope.row.SolutionIteminfo.ItemID)'>编辑</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="danger" @click="del(scope.row.SolutionIteminfo.SolutionID,scope.row.SolutionIteminfo.ItemID)">删除</el-button>
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
		
		<el-dialog title="公式编辑" :visible.sync="adds" width="380px">
			<div class="reveal">
				<span>{{fordisplay.join('')}}</span>
			</div>
			<div style="margin-top: 10px;" class="buttons">
				<el-button size="small" @click="nubs()">常数</el-button>
				<el-button size="small" @click="wages()">工资项</el-button>
				<el-button size="small" @click="backs()">退格</el-button>
				<el-button size="small" @click="source()">源数据</el-button>
				<el-button size="small" @click="comput()">计量</el-button>
				<p style="margin-top: 15px;">
					<el-button size="small" @click="tianjia($event)">+</el-button>
					<el-button size="small" @click="tianjia($event)">-</el-button>
					<el-button size="small" @click="tianjia($event)">*</el-button>
					<el-button size="small" @click="tianjia($event)">/</el-button>
					<el-button size="small" @click="tianjia($event)">(</el-button>
					<el-button size="small" @click="tianjia($event)">)</el-button>
				</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="adds = false">取 消</el-button>
				<el-button size="small" type="primary" @click="allAdd()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="常数" :visible.sync="num" width="384px">
			<el-input v-model="numbers"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="num = false">取 消</el-button>
				<el-button size="small" type="primary" @click="numAdd()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="工资项目" :visible.sync="gz" width="384px">
			<el-select v-model="Pay" style='width: 100%;' placeholder="请选择" filterable>
                 <el-option
			      v-for="item in wageList1"
			      :key="item.ID"
                  :label="item.ItemName"
                  :value="item.ID">
			    </el-option>
            </el-select>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="gz = false">取 消</el-button>
				<el-button size="small" type="primary" @click="wagesAdd()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="添加工资项目" :visible.sync="gzx" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="120px">
				<el-form-item label="工资项目名称">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="gzx = false">取 消</el-button>
				<el-button size="small" type="primary" @click="gzxAdd()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改工资项目" :visible.sync="gzx1" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="120px">
				<el-form-item label="工资项目名称">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-checkbox v-model="formLabelAlign.checked">是否计量工资</el-checkbox>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="gzx1 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="gzxEdit()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="添加工资方案" :visible.sync="gzfa" width="384px">
			<el-input v-model="numbers"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="gzfa = false">取 消</el-button>
				<el-button size="small" type="primary" @click="gzfaAdd()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改工资方案" :visible.sync="gzfa1" width="384px">
			<el-input v-model="numbers"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="gzfa1 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="gzfaEdit()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import api from '../../axios/api.js'
	export default {
		name: 'SoulutionRule',
		data() {
			return {
				loading:false,
				gzfa1:false,//修改工资方案
				gzfa:false,//添加工资方案
				gzx1:false,//修改工资项
				gzx:false,//添加工资项
				gz:false,//工资弹框
				num:false,//常数弹框
				adds:false,//添加弹框变量
				pages: 1, //页码
				total: 1, //页数
				pagesizs:10,
				tableData: [], //卡片列表
				inputs: '', //搜索
				formLabelAlign:{
					name:'',
					checked:false
				},
				wageList:[],
				wageOption:'',
				projectList:[],
				project:'',
				wageList1:[],
				value2: true,
				formula:[],
				numbers:'',//常量
				Payroll:[
					{
			          value: '选项1',
			          label: '基本工资'
			        }, 
			        {
			          value: '选项2',
			          label: '奖金'
			        }, 
				],
				Pay:'',
				wage:'',
				id:'',
				SoID:'',
				ItID:'',
				fordisplay:[],
				ids:'',
			}
		},
		created(){
			this.Itemgetlistsousitem(this.pages,this.inputs,this.pagesizs)
			this.itemser()
			this.solutionctor()
		},
		methods: {
			excel(){
				this.loading= true
				this.$post(api.Itemgetlistsousitem,{
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
						this.loading= false
						if (res.data.ExcelResult && res.data.ExcelResult.length!=0) {
							var urls = res.data.ExcelResult
							window.location.href = api.hostname+urls
			            }
					}else{
						this.loading= false
						this.$message.error(res.msg)
					}
					
				})
			},
			//通过方案id获取项目
			itemsers(ids){
				this.$get(api.itemsers+'/'+ids).then(res=>{
					if(res.data.state==200){
						this.wageList1 = res.data.data
					}else{
						this.$message.error(res.data.msg)
					}
				})
			},
			Itemgetlistsousitem(page,val,pagesizes){
				this.loading= true
				this.$post(api.Itemgetlistsousitem,{
				  "PageSize": pagesizes,
				  "PageIndex": page-1,
				  "KeyWord": val,
				  "Query": {
				    "KeyWord": val
				  },
				  "OrderString": "",
				  "ToExcel": false
				}).then(res=>{
					console.log(res)
					if(res.state==200){
						this.loading= false
						this.tableData = res.data.Data
						this.total = res.data.Items ? res.data.Items : 1;
					}else{
						this.loading= false
						this.$message.error(res.msg)
					}
					
				})
			},
			handleSizeChange(val){
				this.pagesizs = val
				this.Itemgetlistsousitem(this.pages,this.inputs,this.pagesizs)
			},
			//分页
			handleCurrentChange(val) {
				this.pages=val
				this.Itemgetlistsousitem(this.pages,this.inputs,this.pagesizs)
			},
			filter(){
				this.pages=1
				this.Itemgetlistsousitem(this.pages,this.inputs,this.pagesizs)
			},
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
//			solut(){
//				this.$get(api.solut).then(res=>{
//					if(res.data.state==200){
//						this.wageList1 = res.data.data
//					}else{
//						this.$message.error(res.data.msg)
//					}
//				})
//			},
			//获取工资方案
			solutionctor(){
				this.$get(api.solutionctor).then(res=>{
					if(res.data.state==200){
						this.projectList = res.data.data
					}else{
						this.$message.error(res.data.msg)
					}
				})
			},
			//加入
			join(){
				if(this.project==''||this.wageOption==''){
					this.$message({
						message: "添加参数不能为空",
						type: "warning"
					});
					return;
				}
				this.$post(api.addsolutionitem,{
				  "SolutionID": this.project,
				  "ItemID": this.wageOption
				}).then(res=>{
					if(res.state==200){
						this.pages=1
						this.inputs=''
						this.Itemgetlistsousitem(this.pages,this.inputs,this.pagesizs)
					}else{
						this.$message.error(res.msg)
					}
				})
//				let projectStr=''
//				let wageOptionstr =''
//				for(let i = 0;i<this.projectList.length;i++){
//					if(this.projectList[i].ID==this.project){
//						projectStr = this.projectList[i].SolutionName
//					}
//				}
//				for(let i = 0;i<this.wageList.length;i++){
//					if(this.wageList[i].ID==this.wageOption){
//						wageOptionstr = this.wageList[i].ItemName
//					}
//				}
//				this.tableData.push({
//					ItemStr:wageOptionstr,
//					SolutionIteminfo:{
//						SolutionID: this.project, 
//						ItemID: this.wageOption,
//						CalcIndex:'',
//						ID:"",
//						IsVisiable:true,
//						ItemExpress:"",
//						ItemID:"",
//						SolutionID:"",
//						VisiableIndex:''
//					},
//					SolutionStr:projectStr,
//				})
			},
			//添加工资方案
			pushGz(){
				this.numbers=''
				this.gzfa = true
			},
			//确定添加工资方案
			gzfaAdd(){
				if( this.numbers==''){
					this.$message({
						message: "添加参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading=true
				this.$post(api.Itemaddsolution,{
				  "SolutionName": this.numbers
				}).then(res=>{
					if(res.state==200){
						this.$message({
							message: "添加成功",
							type: "success"
						});
						this.loading=false
						this.gzfa = false
						this.solutionctor()
					}else{
						this.loading=false
						this.gzfa = false
						this.$message.error(res.msg)
					}
				})
				
			},
			//修改工资方案
			editGz(){
				if(this.project ==''){
					return
				}else{
					for(var i = 0; i<this.projectList.length;i++){
						if(this.projectList[i].ID==this.project){
							this.numbers = this.projectList[i].SolutionName
						}
					}
					this.gzfa1 = true
				}
				
			},
			//修改工资方案
			gzfaEdit(){
				if( this.numbers==''){
					this.$message({
						message: "添加参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading=true
				this.$post(api.Itemeditsolution,{
				  "ID":this.project,
				  "SolutionName": this.numbers
				}).then(res=>{
					if(res.state==200){
						this.$message({
							message: "修改成功",
							type: "success"
						});
						this.loading=false
						this.gzfa1 = false
						this.solutionctor()
					}else{
						this.loading=false
						this.gzfa1 = false
						this.$message.error(res.msg)
					}
				})
			},
			//添加工资项
			addgzx(){
				this.formLabelAlign.name=''
				this.formLabelAlign.checked=false
				this.gzx = true
			},
			//确定添加工资项
			gzxAdd(){
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
						this.gzx = false
						this.itemser()
					}else{
						this.loading = false;
						this.gzx = false
						this.$message.error(res.msg);
					}
				})
				
			},
			//修改工资项
			editgzx(){
				if(this.wageOption ==''){
					return
				}else{
					for(let i = 0;i<this.wageList.length;i++){
					if(this.wageList[i].ID==this.wageOption){
						this.formLabelAlign.name = this.wageList[i].ItemName
						this.formLabelAlign.checked = this.wageList[i].IsRule
					}
				}
					this.gzx1 = true
				}
				
				
			},
			//确定修改工资项
			gzxEdit(){
				if(this.formLabelAlign.name==''){
					this.$message({
			          message: "参数不能为空",
			          type: "warning"
			        });
			        return;
				}
				this.loading = true;
				this.$post(api.Itemedititem,{
				  "ID": this.wageOption,
				  "ItemName": this.formLabelAlign.name,
				  "IsRule": this.formLabelAlign.checked
				}).then(res=>{
					if(res.state==200){
						this.loading = false;
						this.gzx1 = false
						this.itemser()
					}else{
						this.loading = false;
						this.gzx1 = false
						this.$message.error(res.msg);
					}
				})
			},
			//编辑
			edit(id,sId,iId){
				this.id = id
				this.SoID = sId
				this.itemsers(this.SoID)
				this.ItID = iId
				this.fordisplay=[]
				this.formula=[]
				this.$get(api.solutitemlist+'/'+iId+'/'+sId).then(res=>{
					console.log(res)
					if(res.data.state == 200){
						this.formula = res.data.data.reverse()
						console.log(this.formula)
						for(var i = 0;i<this.formula.length;i++){
							if(this.formula[i].ExpressType==2){
								this.fordisplay.push(this.formula[i].ExpressCaption)
							}else{
								this.fordisplay.push(this.formula[i].ExpressValue)
							}
							
						}
						console.log(this.fordisplay)
					}
				})
				
//				this.solut()
				this.adds = true
			},
			//保存
			allAdd(){
				if(this.formula.length==0){
					this.$message({
			          message: "公式不能为空",
			          type: "warning"
			        });
			        return;
				}
				this.$post(api.Itemeditsolutionitem,this.formula).then(res=>{
					if(res.state==200){
						
						this.adds = false
						this.Itemgetlistsousitem(this.pages,this.inputs,this.pagesizs)
					}else{
						this.adds = false
						this.$message.error(res.msg);
					}
				})
				
			},
			//确认编辑保存
//			update(){
//				this.adds = false
//			},
			//点击源数据
			source(){
				this.formula=[]
				this.fordisplay=[]
				this.formula.push({
					    "SolutionID":this.SoID,
					    "ItemID": this.ItID,
					    "ExpressType": 4,
					    "ExpressValue": '源数据',
				})
				this.fordisplay.push('源数据')
			},
			//计量
			comput(){
				this.formula=[]
				this.fordisplay=[]
				this.formula.push({
					    "SolutionID":this.SoID,
					    "ItemID": this.ItID,
					    "ExpressType": 5,
					    "ExpressValue": '计量工资',
				})
				this.fordisplay.push('计量工资')
			},
			//常数弹框
			nubs(){
				this.numbers=''
				this.num = true
			},
			numAdd(){
				if(!this.numbers==''){
					for(let i=0; i< this.formula.length;i++){
						if(this.formula[i].ExpressType==4||this.formula[i].ExpressType==5){
							this.formula=[]
							this.fordisplay=[]
						}
					}
					this.formula.push({
					    "SolutionID":this.SoID,
					    "ItemID": this.ItID,
					    "ExpressType": 1,
					    "ExpressValue": this.numbers,
					})
					this.fordisplay.push(this.numbers)
				}
				this.num = false
			},
			//工资项弹框
			wages(){
				this.Pay = ''
				this.wage = ''
				this.gz = true
			},
			wagesAdd(){
				if(!this.Pay==''){
					for(var i = 0;i<this.wageList.length;i++){
						if(this.wageList[i].ID == this.Pay){
							this.wage = this.wageList[i].ItemName
						}
					}
					for(let i=0; i< this.formula.length;i++){
						if(this.formula[i].ExpressType==4||this.formula[i].ExpressType==5){
							this.formula=[]
							this.fordisplay=[]
						}
					}
					this.formula.push({
					    "SolutionID":this.SoID,
					    "ItemID": this.ItID,
					    "ExpressType": 2,
					    "ExpressValue": this.Pay,
					})
					this.fordisplay.push(this.wage)
				}
				this.gz = false
			},
			//退格
			backs(){
				this.formula.pop()
				this.fordisplay.pop()
				console.log(this.formula)
			},
			tianjia(event){
				for(let i=0; i< this.formula.length;i++){
					if(this.formula[i].ExpressType==4||this.formula[i].ExpressType==5){
						this.formula=[]
						this.fordisplay=[]
					}
				}
				this.formula.push({
				    "SolutionID":this.SoID,
				    "ItemID": this.ItID,
				    "ExpressType": 3,
				    "ExpressValue": event.target.innerText,
				})
				this.fordisplay.push(event.target.innerText)
			},
			//保存
			conserve(id,sID,tID,iex,cInd,vIn,ivs){
				this.$post(api.upsolutionitem,{
				  "ID": id,
				  "SolutionID": sID,
				  "ItemID": tID,
				  "ItemExpress": iex,
				  "CalcIndex": cInd,
				  "VisiableIndex": vIn,
				  "IsVisiable": ivs
				}).then(res=>{
					if(res.state==200){
						
						this.Itemgetlistsousitem(this.pages,this.inputs,this.pagesizs)
					}else{
						this.$message.error(res.msg);
					}
				})
			},
			//删除工资定义
			del(ids,id){
				this.$confirm("将永久删除, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.delsouslt + "/" + ids+'/'+id)
							.then(response => {
								console.log(response)
								if(response.data.state == 200) {
									
									this.Itemgetlistsousitem(this.pages,this.inputs,this.pagesizs)
									this.$message({
										message: "删除成功",
										type: "success"
									});
								} else {
									this.loading = false;
									this.$message.error(response.data.msg);
								}
							})
							.catch(err => {
								this.loading = false;
							});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},
		}
	}
</script>
<style scoped="">
	.reveal{
		width: 340px;
		height: 150px;
		margin: auto;
		background: #f5f5f5;
		box-sizing: border-box;
		padding: 15px;
	}
</style>