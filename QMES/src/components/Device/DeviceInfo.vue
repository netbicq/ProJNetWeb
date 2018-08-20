<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">设备管理</span>
			<span class="h2">设备信息</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<el-button type="primary" size="small" @click='synchro()' class='fl'>同步</el-button>
				<div class="inBook1">
					<span class="span2">放置地点</span>
					<el-cascader class='cascader' change-on-select :options="structure" clearable filterable :props="cascaderConfig" v-model="organiz" separator='-' @change="handleChange">
					</el-cascader>
				</div>
				<div class="fr">
					<el-input v-model="inputs" placeholder="请输入设备名称" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="DevInfo.DeviceID" label="设备ID">
				</el-table-column>
				<el-table-column prop="DevInfo.LocalName" label="设备名称">
				</el-table-column>
				<el-table-column prop="DevInfo.LocalCode" label="设备编号">
				</el-table-column>
				<el-table-column prop="OrganStr" label="放置地点">
				</el-table-column>
				<el-table-column prop="DevInfo.CreateMan" label="创建人">
				</el-table-column>
				<el-table-column prop="" label="创建时间">
					<template slot-scope='scope'>
						{{$toMoment(scope.row.DevInfo.CreateDate)}}
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
									<el-button class='Purple' size="small" @click='statesets(1,scope.row.DevInfo.ID)'>正&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;常</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="warning" @click='statesets(5,scope.row.DevInfo.ID)'>停&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="primary" size="small" @click='statesets(3,scope.row.DevInfo.ID)' >损&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;坏</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="danger" size="small" @click='statesets(2,scope.row.DevInfo.ID)'>维&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="success" @click='edit(scope.row.DevInfo.ID,scope.row.DevInfo.LocalName,scope.row.DevInfo.LocalCode,scope.row.DevInfo.OragnizeID)'>修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="info" @click='hesuan(scope.row.DevInfo.DeviceID)'>业务规则</el-button>
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
		<el-dialog title="业务规则" :visible.sync="adds1" width="584px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="业务规则">
					<el-select class='se ywgzSelect' multiple filterable v-model="staffNum" placeholder="请选择">
						<el-option v-for="item in staffs" :key="item.CardType" :label="item.label" :value="item.CardType">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="adds1 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="update()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改设备" :visible.sync="edits" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="80px">
				<el-form-item label="本地名称">
					<el-input v-model="formLabelAlign.LocalName"></el-input>
				</el-form-item>
				<el-form-item label="本地编号">
					<el-input v-model="formLabelAlign.LocalCode"></el-input>
				</el-form-item>
				<el-form-item label="组织架构">
					<el-cascader filterable change-on-select style='width: 100%;' :options="structure" :props="cascaderConfig" v-model="formLabelAlign.OragnizeID" separator='-' @change="handleChange">
					</el-cascader>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="edits = false">取 消</el-button>
				<el-button size="small" type="primary" @click="modify()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import api from "../../axios/api.js";
	export default {
		name: "DeviceInfo",
		data() {
			return {
				cascaderConfig: {
					label: 'OrgName',
				},
			    options: [],//组织架构
			    organiz:[],
				edits: false,
				loading: false,
				adds1: false,
				staffs: [
					{
						CardType: 2,
						label: "工艺卡"
					},
					{
						CardType: 3,
						label: "规格卡"
					},
					{
						CardType: 4,
						label: "收料卡"
					},
					{
						CardType: 5,
						label: "发料卡"
					},
				], //电子卡号
				staffNum: [],
				value: "",
				pages: 1, //页码
				total: 1, //页数
				tableData: [], //卡片列表
				inputs: "", //搜索
				formLabelAlign: {
					name: "",
					checked: false,
					LocalName: '',
					LocalCode: '',
					OragnizeID: [],
				},
				structure:[],
				id: '',
				ztee:[],
				pagesizs:10
			};
		},
		created() {
			this.setgetlist(this.pages, this.inputs,this.pagesizs,this.organiz[this.organiz.length - 1]);
			this.orgetlist()
		},
		methods: {
			handleChange() {

			},
			//组织架构
			orgetlist() {
				this.$get(api.orgetlist).then(res => {
					console.log(res)
					if(res.data.state == 200) {
						for(var i = 0; i < res.data.data.length; i++) {
							this.structure.push({
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
						this.ztee=res.data.data
						this.structure = this.$toTree(this.structure)
						console.log(this.structure)
					} else {
						this.$message.error(res.data.msg)
					}

				})
			},
			//获取卡类型
			//同步
			synchro() {
				this.loading = true;
				this.$get(api.syndev)
					.then(res => {
						if(res.data.state == 200) {
							this.loading = false;
							this.pagees = 1;
							this.inputs = "";
							this.organiz=[]
							this.setgetlist(this.pages, this.inputs,this.pagesizs,this.organiz[this.organiz.length - 1]);
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
			//
			setgetlist(page, inputs,pagesize,organID) {
				this.loading = true;
				this.$post(api.setgetlist, {
						PageSize: pagesize,
						PageIndex: page - 1,
						KeyWord: inputs,
						Query: {
						    "OrganID":organID
						},
						OrderString: "",
						ToExcel: false
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.total = res.data.Items ? res.data.Items : 1;
							this.tableData = res.data.Data;
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
			handleSizeChange(val){
				this.pagesizs = val;
				this.setgetlist(this.pages, this.inputs,this.pagesizs,this.organiz[this.organiz.length - 1]);
			},
			handleCurrentChange(val) {
				this.pages = val;
				this.setgetlist(this.pages, this.inputs,this.pagesizs,this.organiz[this.organiz.length - 1]);
			},
			filter() {
				this.pages = 1;
				this.setgetlist(this.pages, this.inputs,this.pagesizs,this.organiz[this.organiz.length - 1]);
			},
			excel(){
				this.loading = true;
				this.$post(api.setgetlist, {
						PageSize: this.pagesizs,
						PageIndex: this.pages - 1,
						KeyWord: this.inputs,
						Query: {
						    "OrganID":this.organiz[this.organiz.length - 1]
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
			//规则弹框
			hesuan(id) {
				this.id = id
				this.adds1 = true
				this.staffNum = []
				this.$get(api.getdevicerule + '/' + this.id).then(res => {
					console.log(res)
					if(res.data.state == 200) {
						for(let i = 0; i < res.data.data.length; i++) {
							this.staffNum.push(res.data.data[i].CardType)
						}
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			//确认规则
			update() {
				this.$post(api.devicesetrule, {
					"DeviceID": this.id,
					"Rules": this.staffNum
				}).then(res => {
					console.log(res)
					if(res.state == 200) {
						this.adds1 = false;
					} else {
						this.adds1 = false;
						this.$message.error(res.msg);
					}
				})

			},
			//修改弹框
			edit(id,LocalName,LocalCode,OragnizeID) {
				this.id = id
				this.formLabelAlign.OragnizeID=[]
				this.formLabelAlign.LocalName = LocalName
				this.formLabelAlign.LocalCode = LocalCode
				if(OragnizeID==='00000000-0000-0000-0000-000000000000'){
					this.formLabelAlign.OragnizeID.push(OragnizeID)
					this.edits = true
					return false
				}else{
					var arr = this.fnDemo(this.ztee,OragnizeID)
					var set = new Set(arr)
					var newArr = Array.from(set)
					console.log(newArr)
					if(newArr.length<=1){
						this.formLabelAlign.OragnizeID.push(newArr[0].ID)
					}else{
						for(var i = newArr.length-1;i >= 0;i--){
							this.formLabelAlign.OragnizeID.push(newArr[i].ID)
						}
						this.formLabelAlign.OragnizeID.push(newArr[newArr.length-1].ID)
					}
					console.log(this.formLabelAlign.OragnizeID)
					this.edits = true
				}	
			},
			//确认修改
			modify() {
				if(this.id == '' || this.formLabelAlign.LocalName == '' || this.formLabelAlign.LocalCode == ''|| this.formLabelAlign.OragnizeID == '') {
					this.$message({
						message: "参数不能为空",
						type: "warning"
					});
					return;
				}
				this.loading=true
				this.$post(api.editdevi,{
				  "ID": this.id,
				  "LocalName": this.formLabelAlign.LocalName,
				  "LocalCode": this.formLabelAlign.LocalCode,
				  "OragnizeID": this.formLabelAlign.OragnizeID[this.formLabelAlign.OragnizeID.length - 1]
				}).then(res=>{
					if(res.state==200){
						this.loading=false
						this.edits = false
						
						
						this.setgetlist(this.pages, this.inputs,this.pagesizs,this.organiz[this.organiz.length - 1]);
					}else{
						this.loading=false
						this.edits = false
						this.$message.error(res.msg);
					}
				})
			},
			fnDemo(datas,ids) {
		      let obj;
		      for(let j=0;j<datas.length;j++){
		        if(ids==datas[j].ID){
		          obj=datas[j];
		        }
		      }
		      function findP(zNodes, obj) {
		        let ans = [];
		       	if(obj.ParentID=='00000000-0000-0000-0000-000000000000'){
		       		let arr = []
		       		arr.push(obj)
		       		return arr;
		       	}
		        for (let i = 0; i < zNodes.length; i++) {
		          if (obj.ParentID == zNodes[i].ID) {
		            if (zNodes[i].ID == "00000000-0000-0000-0000-000000000000") {
		              return zNodes[i];
		            }
		            ans.push(zNodes[i]);
		            return ans.concat(findP(zNodes, zNodes[i]));  
		          }
		        }
		      }
		      let arr=[];
		      arr=findP(datas, obj)
		      arr.push(obj)
		      return arr;
		    },
		    statesets(type,id){
		    	this.loading = true;
				this.$get(api.statesets + "/" + type + "/" + id)
					.then(res => {
						if(res.data.state == 200) {
							this.loading = false;
							
							this.setgetlist(this.pages, this.inputs,this.pagesizs,this.organiz[this.organiz.length - 1]);
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

</style>