<template>
	<div v-loading="loading">
		<div class="title">
			<span class="h1">设备管理</span>
			<span class="h2">设备日志</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<div class="inBook">
					<span class="span1">设备</span>
					<el-select v-model="value" filterable clearable placeholder="请选择">
						<el-option v-for="item in options" :key="item.DeviceID" :label="item.LocalName" :value="item.DeviceID">
						</el-option>
					</el-select>
				</div>
				<div class="inBook zy">
					<span class="span1">开始时间</span>
					<el-date-picker class='tied' v-model="formInline.starTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
					</el-date-picker>
				</div>
				<div class="inBook">
					<span class="span1">结束时间</span>
					<el-date-picker class='tied' v-model="formInline.endTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
					</el-date-picker>
				</div>
				<div class="fr">
					<el-button size="mini" class='Purple' @click="delSb()">删除设备内</el-button>
					<el-button size="mini" class='Danger' @click="delDate()">删除时间内</el-button>
					<el-button size="mini" class='Warning' @click="delAll()">删除全部</el-button>
					<el-input v-model="inputs" placeholder="请输入设备名称" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%" >
				<el-table-column prop="Devlog.DeviceID" label="设备ID">
				</el-table-column>
				<el-table-column prop="Dev.LocalName" label="设备名称" show-overflow-tooltip >
				</el-table-column>
				<el-table-column prop="Dev.LocalCode" label="设备编号">
				</el-table-column>
				<el-table-column prop="Devlog.LogDate" label="日志时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="" label="日志内容" >
					<template slot-scope="scope">
						<span class="spans" @click='LogContent(scope.row.Devlog.LogContent)'>
							{{scope.row.Devlog.LogContent}}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="LogTypeStr" label="状态">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" class='Danger' @click="del(scope.row.Devlog.ID)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pages">
				<el-pagination @size-change="handleSizeChange" :page-sizes="[10,20,30,40,50]" :page-size="pagesizs" :current-page="pages" @current-change="handleCurrentChange" layout="sizes,prev, pager, next" :total="total" background>
				</el-pagination>
			</div>
		</div>

		<el-dialog title="日志内容" :visible.sync="contens" width="384px">
			<div>
				{{words}}
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="contens = false">取 消</el-button>
				<el-button size="small" type="primary" @click="cont()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import api from "../../axios/api.js";
	export default {
		name: "DeviceLog",
		data() {
			return {
				words:'',
				contens:false,
				loading: false,
				adds1: false,
				staffs: [], //电子卡号
				staffNum: "",
				options: [],
				value: "",
				pages: 1, //页码
				total: 1, //页数
				pagesizs: 10,
				tableData: [], //卡片列表
				inputs: "", //搜索
				formLabelAlign: {
					name: "",
					checked: false
				},
				formInline: {
					starTime: "",
					endTime: ""
				}
			};
		},
		created() {
			this.getDevlist()
			this.getlistlog(
				this.pages,
				this.inputs,
				this.value,
				this.formInline.starTime,
				this.formInline.endTime,
				this.pagesizs
			);
		},
		methods: {
			//获取设备
			getDevlist() {
				this.$get(api.selectDev)
					.then(res => {
						if(res.data.state == 200) {
							this.options = res.data.data
						} else {
							this.$message.error(res.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//	点击弹框
			LogContent(row){
				this.words = row
				this.contens=true
			},
			cont(){
				this.contens=false
			},
			//获取日志
			getlistlog(page, inpu, value, tarTime, dTime, pagesize) {
				this.loading = true;
				this.$post(api.getlistlog1, {
						PageSize: pagesize,
						PageIndex: page - 1,
						KeyWord: inpu,
						Query: {
							DeviceID: value,
							Startime: tarTime,
							Endtime: dTime,
							"LogType": 0
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
			handleSizeChange(val) {
				this.pagesizs = val;
				this.getlistlog(
					this.pages,
					this.inputs,
					this.value,
					this.formInline.starTime,
					this.formInline.endTime,
					this.pagesizs
				);
			},
			excel() {
				this.loading = true;
				this.$post(api.getlistlog1, {
						PageSize: this.pagesizs,
						PageIndex: this.pages - 1,
						KeyWord: this.inputs,
						Query: {
							DeviceID: this.value,
							Startime: this.formInline.starTime,
							Endtime: this.formInline.endTime
						},
						OrderString: "",
						ToExcel: true
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							if(res.data.ExcelResult && res.data.ExcelResult.length != 0) {
								var urls = res.data.ExcelResult
								window.location.href = api.hostname + urls
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
			handleCurrentChange(val) {
				this.pages = val;
				this.getlistlog(
					this.pages,
					this.inputs,
					this.value,
					this.formInline.starTime,
					this.formInline.endTime,
					this.pagesizs
				);
			},
			//
			filter() {
				this.pages = 1;
				this.getlistlog(
					this.pages,
					this.inputs,
					this.value,
					this.formInline.starTime,
					this.formInline.endTime,
					this.pagesizs
				);
			},
			//删除指定id的设备日志
			del(id) {
				this.$confirm("将永久删除该日志, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.dellogs + "/" + id)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});
									
									this.getlistlog(
										this.pages,
										this.inputs,
										this.value,
										this.formInline.starTime,
										this.formInline.endTime,
										this.pagesizs
									);
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
							message: "已取消删除"
						});
					});
			},
			//删除指定设备的日志
			delSb(){
				if(this.value==''){
					this.$message({
						message: "设备不能为空",
						type: "warning"
					});
					return false
				}
				this.$confirm("将永久删除该设备日志, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.delbylog + "/" + this.value)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});
									
									this.getlistlog(
										this.pages,
										this.inputs,
										this.value,
										this.formInline.starTime,
										this.formInline.endTime,
										this.pagesizs
									);
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
							message: "已取消删除"
						});
					});
			},
			//删除指定时间内
			delDate(){
				if(this.formInline.starTime==''|| this.formInline.endTime==''){
					this.$message({
						message: "时间不能为空",
						type: "warning"
					});
					return false
				}
				this.$confirm("将永久删除该时间范围内日志, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$post(api.dellog,{
						  "SDate": this.formInline.starTime,
						  "EDate": this.formInline.endTime
						}).then(res => {
							console.log(res)
								if(res.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});
									
									this.formInline.starTime=''
									this.formInline.endTime=''
									this.getlistlog(
										this.pages,
										this.inputs,
										this.value,
										this.formInline.starTime,
										this.formInline.endTime,
										this.pagesizs
									);
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
							message: "已取消删除"
						});
					});
			},
			//删除全部
			delAll(){
				this.$confirm("将永久删除全部日志, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.dellogall).then(res => {
							console.log(res)
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});
									
									this.formInline.starTime=''
									this.formInline.endTime=''
									this.getlistlog(
										this.pages,
										this.inputs,
										this.value,
										this.formInline.starTime,
										this.formInline.endTime,
										this.pagesizs
									);
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
							message: "已取消删除"
						});
					});
			}
		}
	};
</script>
<style scoped="">
	.cell .spans{
		box-sizing: border-box;
	    white-space: normal;
	    word-break: break-all;
	    white-space:nowrap;
	    line-height: 23px;
	    overflow: hidden;
	    height: 23px;
	}
</style>