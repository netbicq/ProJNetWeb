<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">系统管理</span>
			<span class="h2">日志管理</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<div class="fl">
					<label for="">用户选择：</label>
					<el-select v-model="value" clearable filterable placeholder="请选择">
						<el-option v-for="item in options" :key="item.ID" :label="item.Login" :value="item.Login">
						</el-option>
					</el-select>
					<el-button size="mini" class='Purple' @click="delSb()">删除指定管理员日志</el-button>
				</div>
				<div class="fl times">
					<span class="span1">开始时间</span>
					<el-date-picker class='tied' v-model="starTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
					</el-date-picker>
					<span class="span1">结束时间</span>
					<el-date-picker class='tied' v-model="endTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
					</el-date-picker>
					<el-button size="mini" class='Danger' @click="delDate()">删除范围时间内</el-button>
				</div>
				<div class='fr sosuo'>
					<el-input v-model="search" placeholder="请输入……" style="width:217px;"></el-input>
					<el-button size="mini" type="primary" @click="filter()">查询</el-button>
					<el-button size="mini" type="success" @click='excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
				<el-table :data="tableData" stripe style="width: 100%" align="center">
					<el-table-column type="index" width="50">
					</el-table-column>
					<el-table-column prop='Sys_Log.IP' label="IP">
					</el-table-column>
					<el-table-column prop='Sys_Log.LogUser' label="用户"  width='100'>
					</el-table-column>
					<el-table-column prop='Sys_Log.LogTime' :formatter="formatter" label="时间">
					</el-table-column>
					<el-table-column label="内容">
						<template slot-scope="scope">
							<span class='span' @click='qs(scope.row.Sys_Log.LogContent)'>{{scope.row.Sys_Log.LogContent}}</span>
						</template>
					</el-table-column>
					<el-table-column prop='Sys_Log.OperateResult' label="操作结果">
						<template slot-scope="scope">
							<span>{{scope.row.Sys_Log.OperateResult?'成功':'失败'}}</span>
						</template>
					</el-table-column>
					<el-table-column prop='Sys_Log.MSG' label="失败消息">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" class='Danger' @click="del(scope.row.Sys_Log.ID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pages">

					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pages" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="PageSize" layout="sizes, prev, pager, next" :total="total" background>
					</el-pagination>
					<!-- <el-pagination small :current-page="pages" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" background>
                    </el-pagination> -->
				</div>
		</div>
	<el-dialog title="日志内容" :visible.sync="dialogVisible" width="384px">
		<div class="words">{{texts}}</div>
		<span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
		    <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
	</el-dialog>
	</div>
</template>
<script>
	import api from "../../axios/api";
	export default {
		name: "logs",
		data() {
			return {
				loading: false,
				options: [],
				value: '',
				tableData: [],
				dialogVisible: false,
				texts: '',
				total: 1,
				PageSize: 10,
				pages: 1,
				search: '',
				starTime: '',
				endTime: ''
			};
		},
		mounted() {
			this.getbin()
			this.getlistlog(this.PageSize, this.pages, this.value, this.search)
		},
		methods: {
			formatter(row, column) {
				return this.$toMoment1(row.Sys_Log.LogTime);
			},
			qs(tex) {
				this.texts = tex
				this.dialogVisible = true
			},
			handleSizeChange(val) {
				this.PageSize = val
				this.getlistlog(this.PageSize, this.pages, this.value, this.search)
			},
			handleCurrentChange(val) {
				this.pages = val
				this.getlistlog(this.PageSize, this.pages, this.value, this.search)
			},
			filter() {
				this.pages = 1
				this.getlistlog(this.PageSize, this.pages, this.value, this.search)
			},
			excel() {
				this.loading = true
				this.$post(api.getlistlog, {
					"PageSize": this.PageSize,
					"PageIndex": this.pages - 1,
					"KeyWord": this.search,
					"Query": {
						"logContent": this.search
					},
					"OrderString": "",
					"ToExcel": true
				}).then(res => {
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
			},
			//获取日志列表
			getlistlog(PageSize, pages, value, vld) {
				this.loading = true
				this.$post(api.getlistlog, {
					"PageSize": PageSize,
					"PageIndex": pages - 1,
					"KeyWord": vld,
					"Query": {
						"logContent": vld
					},
					"OrderString": "",
					"ToExcel": false
				}).then(res => {
					console.log(res)
					if(res.state == 200) {
						this.loading = false
						this.tableData = res.data.Data
						this.total = res.data.Items ? res.data.Items : 1;
					} else {
						this.loading = false
						this.$message({
							message: res.data.msg,
							type: "error",
							duration: 1000
						});
					}
				})
			},
			//获取日志列表
			getbin() {
				this.$get(api.getbin).then(res => {
					if(res.data.state == 200) {
						this.options = res.data.data
					} else {
						this.$message({
							message: res.data.msg,
							type: "error",
							duration: 1000
						});
					}
				})
			},
			//删除指定管理员日志
			delSb() {
				if(this.value == '') {
					this.$message({
						message: "管理员不能为空",
						type: "warning"
					});
					return false
				}
				this.$confirm("将永久删除该管理员日志, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.delbylog1 + "/" + this.value)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});
									this.value = ''
									this.getlistlog(this.PageSize, this.pages, this.value, this.search)
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
			//删除指定id的日志
			del(id) {
				this.$confirm("将永久删除该日志, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.dellog1 + "/" + id)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});

									this.getlistlog(this.PageSize, this.pages, this.value, this.search)
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
			delDate() {
				if(this.starTime == '' || this.endTime == '') {
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
						this.$post(api.dellsog1, {
								"SDate": this.starTime,
								"EDate": this.endTime
							}).then(res => {
								console.log(res)
								if(res.state == 200) {
									this.loading = false;
									this.$message({
										message: "删除成功",
										type: "success"
									});
									this.getlistlog(this.PageSize, this.pages, this.value, this.search)
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
		}
	};
</script>
<style scoped>

</style>