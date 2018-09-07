<template>
	<div class="content-wrapper" v-loading='loading'>
		<div class="title">
			协调工作纪实
		</div>
		<div class="content">
			<div class="panel">
				<div class="panel-heading clearfix">
					<button class="btn fl Green mini" @click="fnAddTip">新建工作纪实</button>
					<!--<el-date-picker v-model="Start" type="date" placeholder="开始时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
					<el-date-picker v-model="End" type="date" placeholder="结束时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
					<div class="search clearfix fr">
						<el-input v-model="search" placeholder="请输入节点名称"></el-input>
						<button class="btn Info mini" @click='filter'>查询</button>
					</div>-->
				</div>
			</div>
			<div class="panel">
				<div class="panel-body">
					<el-table :data="tableData" stripe style="width: 100%" align="center">
						<el-table-column label="标题" prop="Proiect_Teamwork.Title">
						</el-table-column>
						<el-table-column label="时间" prop="Proiect_Teamwork.Time">
						</el-table-column>
						<el-table-column label="人员" prop="Proiect_Teamwork.Personnel">
						</el-table-column>
						<el-table-column label="内容" prop="Proiect_Teamwork.Contents">
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-dropdown size="small" trigger="click" type="primary">
									<el-button type="primary" size="small" class="Info">
										操作<i class="el-icon-arrow-down el-icon--right"></i>
									</el-button>
									<el-dropdown-menu slot="dropdown">
										<!--<el-dropdown-item>
											<button class="btn Success mini" @click="fnEditUserTip(scope.row.Basic_Point.ID,scope.row.Basic_Point.PointName,scope.row.Basic_Point.ColName,scope.row.Basic_Point.PointOrderIndex)">修改</button>
										</el-dropdown-item>-->
										<el-dropdown-item>
											<button class="btn Danger mini" @click="deluser(scope.row.Proiect_Teamwork.ID)">删除</button>
										</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</template>
						</el-table-column>
					</el-table>
					<div class="pages">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pages" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="10" layout="sizes, prev, pager, next" :total="total" background>
						</el-pagination>
					</div>
				</div>
			</div>
			
			<el-dialog title="新建工作纪实" :visible.sync="userTip" width="384px">
					<div>
						<el-form ref="teamwork" :model="teamwork" label-width="60px" class='Owners'>
							<el-form-item label="标题：">
								<el-input v-model="teamwork.Title" placeholder="请输入标题" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="时间：">
								<el-date-picker v-model="teamwork.Time" type="date" style="width:275px;" placeholder="请输入时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="人员：">
								<el-input v-model="teamwork.Personnel" placeholder="请输入人员" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="内容：">
								<el-input class='neir' v-model="teamwork.Contents" type='textarea' :autosize="{ minRows: 2, maxRows: 10}" placeholder="请输入内容" style="width:275px;"></el-input>
							</el-form-item>
							<el-form-item label="附件：">
								<div id="shangbao">
									<el-upload id='inputs' :headers="myHeaders" multiple accept="image/*"  :action=host  :before-upload="beforeAvatarUpload" :file-list="fileList" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccess" :on-remove="handleRemove">
										<i class="el-icon-plus"></i>
									</el-upload>
									<el-dialog :visible.sync="dialogVisible">
										<img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog>
								</div>
							</el-form-item>
						</el-form>
					</div>
					<span slot="footer" class="dialog-footer">
                    <el-button   @click="userTip = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd()" size="small">确 定</el-button>
                </span>
				</el-dialog>
		</div>
	</div>
</template>

<script>
	import Api from "../axios/api";
	export default {
		name: "teamwork",
		data() {
			return {
				host: Api.files,
				loading: false,
				tableData: [], //列表
				pages: 1, //页码
				total: 1, //条数
				PageSize: 10,
				search: '',
				Start: '',
				End: '',
				userTip:false,
				teamwork:{
					Title:'',
					Time:'',
					Personnel:'',
					Contents:''
				},
				dialogImageUrl:'',
				fileList:[],
				dialogVisible:false,
				myHeaders: {
					token: sessionStorage.Token,
				},
			}
		},
		mounted() {
			this.getlistTeam(this.PageSize, this.pages, this.search, this.Start, this.End)
		},
		methods: {
			//获取列表
			getlistTeam(PageSize, pages, search, Start, End) {
				this.loading = true
				this.$post(Api.getlistTeam, {
					"PageSize": PageSize,
					"PageIndex": pages - 1,
					"KeyWord": search,
					"Query": {
						"Start": Start,
						"End": End
					},
					"OrderString": "",
					"ToExcel": false
				}).then(res => {
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
			handleSizeChange() {

			},
			handleCurrentChange() {

			},
			filter() {

			},
			//新建
			fnAddTip() {
				for(let k in this.teamwork) {
					this.teamwork[k] = ''
				}
				this.fileList=[]
				this.userTip=true
			},
			confirmAdd(){
				if(this.teamwork.Title == '' || this.teamwork.Time == '' || this.teamwork.Personnel == '' || this.teamwork.Contents == '') {
					this.$message.error('参数不能为空');
					return false;
				}
				var arrString = []
				for(var i=0;i<this.fileList.length;i++){
					arrString.push(this.fileList[0].response.data.filePaht)
				}
				
				this.loading = true
				this.$post(Api.addnewTeam, {
				  "Title": this.teamwork.Title,
				  "Time": this.teamwork.Time,
				  "Personnel": this.teamwork.Personnel,
				  "Contents": this.teamwork.Contents,
				  "Teams": arrString
				}).then(res => {
					console.log(res)
					if(res.data == true) {
						this.loading = false
						this.$message({
							message: "新建成功",
							type: "success"
						});
						this.userTip=false
						this.pages = 1
						this.search = ''
						this.Start= ''
						this.End = ''
						this.getlistTeam(this.PageSize, this.pages, this.search, this.Start, this.End)
					} else {
						this.loading = false
						this.$message.error(res.errmsg);
					}
				})
			},
			//上传之前
		    beforeAvatarUpload(file) {
		        const isJPG = file.type === "image/jpeg";
				const isPNG = file.type === "image/png";
				const isLt2M = file.size / 1024 / 1024 < 10;
//				if(!isJPG && !isPNG) {
//					this.$message.error("上传图片必须是JPG/PNG 格式!");
//				}
				if(!isLt2M) {
					this.$message.error("上传图片大小不能超过 10MB!");
				}
				return(isJPG || isPNG) && isLt2M;
		    },
		    //上传成功
		    handleAvatarSuccess(res, file) {
		    	this.fileList.push(file)
		    },
		    //上传移除
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		        this.fileList = fileList
		    },
		    //文件列表中已上传的文件时
		    handlePictureCardPreview(file) {
		    	this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    //删除
			deluser(id) {
				this.$confirm("将永久删除, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(Api.delTeam + "/" + id)
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
									this.getlistTeam(this.PageSize, this.pages, this.search, this.Start, this.End)
									
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
	}
</script>

<style>

</style>