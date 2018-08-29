<template>
	<div class="content-wrapper" v-loading='loading'>
		<div class="title">
			节点管理
		</div>
		<div class="content">
			<div class="panel">
				<div class="panel-heading clearfix">
					<button class="btn fl Green mini" @click="fnAddTip">新建节点</button>
					<div class="search clearfix fr">
						<el-input v-model="search" placeholder="请输入节点名称"></el-input>
						<button class="btn Info mini" @click='filter'>查询</button>
					</div>
				</div>
			</div>
			<div class="panel">
				<div class="panel-body">
					<el-table :data="tableData" stripe style="width: 100%" align="center">
						<el-table-column type="index" width="50">
						</el-table-column>
						<el-table-column label="名称" prop="Basic_Point.PointName">
						</el-table-column>
						<el-table-column label="列名" prop="Basic_Point.ColName">
						</el-table-column>
						<el-table-column label="排序" prop="Basic_Point.PointOrderIndex">
						</el-table-column>
						<el-table-column label="创建人" prop="Basic_Point.CreateMan">
						</el-table-column>
						<el-table-column label="创建时间" prop="">
							<template slot-scope="scope">
								{{scope.row.Basic_Point.CreateDate | yy}}
							</template>
						</el-table-column>
						<el-table-column prop='StateStr' label="状态" align='center'>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-dropdown size="small" trigger="click" type="primary">
									<el-button type="primary" size="small" class="Info">
										操作<i class="el-icon-arrow-down el-icon--right"></i>
									</el-button>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item>
											<button class="btn Success mini" @click="fnEditUserTip(scope.row.Basic_Point.ID,scope.row.Basic_Point.PointName,scope.row.Basic_Point.ColName,scope.row.Basic_Point.PointOrderIndex)">修改</button>
										</el-dropdown-item>
										<el-dropdown-item>
											<button class="btn Danger mini" @click="deluser(scope.row.Basic_Point.ID)">删除</button>
										</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</template>
						</el-table-column>
					</el-table>
					<div class="pages">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pages" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="10" layout="sizes, prev, pager, next" :total="total" background>
						</el-pagination>
						<!-- <el-pagination small :current-page="pages" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" background>
                    </el-pagination> -->
					</div>
				</div>
			</div>
			<div class="prop">
				<el-dialog title="新建节点" :visible.sync="userTip" width="384px">
					<div>
						<el-form ref="basic" :model="basic" label-width="60px" class='Owners'>
							<el-form-item label="标题：">
								<el-input v-model="basic.PointName" placeholder="请输入名称" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="列名：">
								<el-input v-model="basic.ColName" placeholder="请输入列名" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="排序：">
								<el-input v-model="basic.PointOrderIndex" placeholder="请输入排序" style="width:275px;"></el-input>
							</el-form-item>
							
						</el-form>
					</div>
					<span slot="footer" class="dialog-footer">
                    <el-button   @click="userTip = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd()" size="small">确 定</el-button>
                </span>
				</el-dialog>
				<el-dialog title="修改节点" :visible.sync="editTip" width="384px">
					<div>
						<el-form ref="basic" :model="basic" label-width="60px" class='Owners'>
							<el-form-item label="名称：">
								<el-input v-model="basic.PointName" placeholder="请输入名称" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="列名：">
								<el-input v-model="basic.ColName" placeholder="请输入列名" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="排序：">
								<el-input v-model="basic.PointOrderIndex" placeholder="请输入排序" style="width:275px;"></el-input>
							</el-form-item>
						</el-form>
					</div>
					<span slot="footer" class="dialog-footer">
                    <el-button   @click="editTip = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="confirmEdit()" size="small">确 定</el-button>
                </span>
				</el-dialog>
			</div>
		</div>
	</div>
</template>
<script>
	import Api from "../axios/api";
	export default {
		name: "Basic",
		data() {
			return {
				loading:false,
				search:'',//搜索
				userTip:false,//新建弹框
				editTip:false,//修改弹框
				tableData:[],//列表
				pages:1,//页码
				total:1,//条数
				PageSize: 10,
				basic:{
					PointName:'',
					PointOrderIndex:'',
					ColName:''
				},
				id:''
			};
		},
		mounted() {
			this.basGetlist(this.PageSize,this.pages,this.search)
		},
		methods: {
			//获取列表
			basGetlist(PageSize,pages,search){
				this.loading = true
				this.$post(Api.basGetlist,{
				  "PageSize": PageSize,
				  "PageIndex": pages-1,
				  "KeyWord": search,
				  "Query": {
				    "Name": search
				  },
				  "OrderString": "",
				  "ToExcel": false
				}).then(res=>{
					if(res.state == 200) {
						this.loading = false
						this.tableData = res.data.Data
						this.total = res.data.Items ? res.data.Items : 1;
					} else {
						this.loading = false
						this.$message.error(res.errmsg);
					}
				})
			},
			//新建弹框
			fnAddTip(){
				this.basic.PointName = ''
				this.basic.PointOrderIndex = ''
				this.basic.ColName=''
				this.userTip = true
			},
			//确认新建
			confirmAdd(){
				if(this.basic.ColName==''||this.basic.PointName == '' || this.basic.PointOrderIndex=='') {
					this.$message({
						message: '参数不能为空',
						type: 'warning'
					});
					return
				}
				this.$post(Api.basAddnew,{
				  "PointName": this.basic.PointName,
				  "ColName": this.basic.ColName,
				  "PointOrderIndex": this.basic.PointOrderIndex
				}).then(res=>{
					if(res.state == 200) {
						this.userTip = false
						this.loading = false
						this.pages = 1
						this.search = ''
						this.basGetlist(this.PageSize,this.pages,this.search)
					} else {
						this.loading = false
						this.userTip = false
						this.$message.error(res.errmsg);
					}
				})
			},
			//修改弹框
			fnEditUserTip(id,pName,ColName,pIndex){
				this.id = id
				this.basic.PointName = pName
				this.basic.ColName = ColName
				this.basic.PointOrderIndex = pIndex
				this.editTip = true
			},
			//确认修改
			confirmEdit(){
				if(this.basic.ColName==''||this.basic.PointName == '' || this.basic.PointOrderIndex.toString()=='') {
					this.$message({
						message: '参数不能为空',
						type: 'warning'
					});
					return
				}
				this.$post(Api.basEditbap,{
				  "ID": this.id,
				  "PointName": this.basic.PointName,
				  "ColName": this.basic.ColName,
				  "PointOrderIndex": this.basic.PointOrderIndex
				}).then(res=>{
					if(res.state == 200) {
						this.editTip = false
						this.loading = false
						this.basGetlist(this.PageSize,this.pages,this.search)
					} else {
						this.loading = false
						this.editTip = false
						this.$message.error(res.errmsg);
					}
				})
			},
			//搜索
			filter(){
				this.pages=1
				this.basGetlist(this.PageSize,this.pages,this.search)
			},
			//改变显示条数
			handleSizeChange(val){
				this.PageSize=val
				this.basGetlist(this.PageSize,this.pages,this.search)
			},
			//翻页
			handleCurrentChange(val){
				this.pages=val
				this.basGetlist(this.PageSize,this.pages,this.search)
			},
			//删除
			deluser(id) {
				this.$confirm("同时删除该节点的所有业务数据，是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(Api.basDelbap + "/" + id)
							.then(response => {
								console.log(response)
								if(response.data.state == 200) {
									this.pages = 1
									this.loading = false
									this.pages = 1
									this.search = ''
									this.$message({
										message: "删除成功",
										type: "success"
									});
									this.basGetlist(this.PageSize,this.pages,this.search)
									
								} else {
									this.loading = false;
									this.$message.error(response.data.errmsg);
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
	};
</script>
<style scoped>
</style>