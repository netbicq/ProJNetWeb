<template>
	<div v-loading='loading'>
		<div class="title" >
			报表管理
		</div>
		<div>
			<div class="panel">
				<div class="panel-heading clearfix">
					<div class="fl reposts">
						<div class="fl" style="margin-right: 15px;">
							<span>项目级别</span>
							<el-select v-model="grade" clearable filterable multiple placeholder="请选择" class='select'>
								<el-option v-for="item in gradeList" :key="item.ID" :label="item.DictName" :value="item.ID">
								</el-option>
							</el-select>
						</div>
						<div class="fl" style="margin-right: 15px;">
							<span>所属行业</span>
							<el-select v-model="trade" clearable filterable multiple placeholder="请选择" class='select'>
								<el-option v-for="item in tradeList" :key="item.ID" :label="item.DictName" :value="item.ID">
								</el-option>
							</el-select>
						</div>
						<div class="fl" style="margin-right: 15px;">
							<span>业主单位</span>
							<el-select v-model="owner" clearable filterable multiple placeholder="请选择" class='select'>
								<el-option v-for="item in ownerList" :key="item.ID" :label="item.OwnerName" :value="item.ID">
								</el-option>
							</el-select>
						</div>
						<div class="fl" style="margin-right: 15px;">
							<span>项目进度</span>
							<el-select v-model="jindu" clearable filterable placeholder="请选择">
								<el-option v-for="item in jinduList" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="search clearfix fr">
						<el-input v-model="search" class='sousuo' placeholder="请输入关键词"></el-input>
						<button class="btn1 Info mini" style="margin-bottom: 2px;" @click='searchsf'>查询</button>
						<button class="btn1 Info mini" style="margin-bottom: 2px;" @click='Excel'>导出Excel</button>
						<button class="btn1 Info mini" style="margin-bottom: 2px;" @click='print'>打印</button>
					</div>
				</div>
			</div>
		</div>
		<div class="panel">
			
				<el-table :data="tableData5" :row-class-name="tableRowClassName" :cell-class-name="cell" height="550" border style="width: 100%" class='tables'>
					<el-table-column fixed prop='ProjectInfo.ProjectName' label="项目名称">
					</el-table-column>
					<el-table-column fixed label="计划/实际">
						<template slot-scope='scope'>
							<div class="borderBottom">计划</div>
							<div>实际</div>
						</template>
					</el-table-column>
					<el-table-column label="年度计划投资">
						<template slot-scope='scope'>
							<div>{{scope.row.ProjectInfo.InvestMoney}}</div>
						</template>
					</el-table-column>
					<el-table-column label="计划开工月份">
						<template slot-scope='scope'>
							<div>{{scope.row.ProjectInfo.ComemenceDate|yy}}</div>
						</template>
					</el-table-column>
					<el-table-column label="《规划选址及用地意见书》批复">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_GHXZYDJYJSPF?scope.row.Point_GHXZYDJYJSPF.Plan:''}}</div>
							<div>{{scope.row.Point_GHXZYDJYJSPF.Exec?scope.row.Point_GHXZYDJYJSPF.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="农转用手续及供地批复">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_LZYSXJGDPF?scope.row.Point_LZYSXJGDPF.Plan:''}}</div>
							<div>{{scope.row.Point_LZYSXJGDPF.Exec?scope.row.Point_LZYSXJGDPF.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="土地出让合同（招投标项目填写）">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_TDCRHT?scope.row.Point_TDCRHT.Plan:''}}</div>
							<div>{{scope.row.Point_TDCRHT.Exec?scope.row.Point_TDCRHT.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="土地使用权证">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_TDSYQZ?scope.row.Point_TDSYQZ.Plan:''}}</div>
							<div>{{scope.row.Point_TDSYQZ.Exec?scope.row.Point_TDSYQZ.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="项目总平设计方案批复">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_XMZPSJFAPF?scope.row.Point_XMZPSJFAPF.Plan:''}}</div>
							<div>{{scope.row.Point_XMZPSJFAPF.Exec?scope.row.Point_XMZPSJFAPF.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="《工可+》或《备案+》">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_GCKXXYJBGPF?scope.row.Point_GCKXXYJBGPF.Plan:''}}</div>
							<div>{{scope.row.Point_GCKXXYJBGPF.Exec?scope.row.Point_GCKXXYJBGPF.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="《建设用地规划许可证》批复">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_JSYDGHXKZPF?scope.row.Point_JSYDGHXKZPF.Plan:''}}</div>
							<div>{{scope.row.Point_JSYDGHXKZPF.Exec?scope.row.Point_JSYDGHXKZPF.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="地勘报告完成">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_DKBGWC?scope.row.Point_DKBGWC.Plan:''}}</div>
							<div>{{scope.row.Point_DKBGWC.Exec?scope.row.Point_DKBGWC.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="初步设计及概算批复">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_CBSJJGSPF?scope.row.Point_CBSJJGSPF.Plan:''}}</div>
							<div>{{scope.row.Point_CBSJJGSPF.Exec?scope.row.Point_CBSJJGSPF.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="施工图编制和审查">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_SGTBZHSC?scope.row.Point_SGTBZHSC.Plan:''}}</div>
							<div>{{scope.row.Point_SGTBZHSC.Exec?scope.row.Point_SGTBZHSC.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="预算编制完成">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_YSBZWC?scope.row.Point_YSBZWC.Plan:''}}</div>
							<div>{{scope.row.Point_YSBZWC.Exec?scope.row.Point_YSBZWC.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="《财审控制价》批复">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_CSKZJPF?scope.row.Point_CSKZJPF.Plan:''}}</div>
							<div>{{scope.row.Point_CSKZJPF.Exec?scope.row.Point_CSKZJPF.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="施工监理招投标（含预公告）">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_SGJLZTP?scope.row.Point_SGJLZTP.Plan:""}}</div>
							<div>{{scope.row.Point_SGJLZTP.Exec?scope.row.Point_SGJLZTP.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="项目开工">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_XMKG?scope.row.Point_XMKG.Plan:''}}</div>
							<div>{{scope.row.Point_XMKG.Exec?scope.row.Point_XMKG.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="《建设工程规划许可证》批复">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_JSGCGHXKZPF?scope.row.Point_JSGCGHXKZPF.Plan:''}}</div>
							<div>{{scope.row.Point_JSGCGHXKZPF.Exec?scope.row.Point_JSGCGHXKZPF.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="施工监理人员备案">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_SGJLRYBA?scope.row.Point_SGJLRYBA.Plan:''}}</div>
							<div>{{scope.row.Point_SGJLRYBA.Exec?scope.row.Point_SGJLRYBA.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="《施工许可证》批复">
						<template slot-scope='scope'>
							<div class="borderBottom">{{scope.row.Point_SGXKZPF?scope.row.Point_SGXKZPF.Plan:''}}</div>
							<div>{{scope.row.Point_SGXKZPF.Exec?scope.row.Point_SGXKZPF.Exec:'/'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="当前进展情况及存在问题" width='150'>
						<template slot-scope='scope'>
							<div @click='qs(scope.row.Issues.IssueContent)'>{{scope.row.Issues?scope.row.Issues.IssueContent:''}}</div>
						</template>
					</el-table-column>
					<el-table-column label="后续在建阶段工作计划">
						<el-table-column label="第三季度完成投资">
							<template slot-scope='scope'>
								<div>{{scope.row.ProjectInfo.Q3Invest}}</div>
							</template>
						</el-table-column>
						<el-table-column label="第三季度期末形象进度">
							<template slot-scope='scope'>
								<div>{{scope.row.ProjectInfo.Q3Memo}}</div>
							</template>
						</el-table-column>
						<el-table-column label="第四季度完成投资">
							<template slot-scope='scope'>
								<div>{{scope.row.ProjectInfo.Q4Invest}}</div>
							</template>
						</el-table-column>
						<el-table-column label="第四季度期末形象进度">
							<template slot-scope='scope'>
								<div>{{scope.row.ProjectInfo.Q4Memo}}</div>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column label="责任管理部门">
						<el-table-column label="责任管理部门项目负责人">
							<template slot-scope='scope'>
								<div>{{scope.row.Project_Contacts.SitePrincipal}}</div>
							</template>
						</el-table-column>
						<el-table-column label="责任管理部门具体负责人">
							<template slot-scope='scope'>
								<div>{{scope.row.Project_Contacts.SiteLink}}</div>
							</template>
						</el-table-column>
						<el-table-column label="业主单位项目负责人">
							<template slot-scope='scope'>
								<div>{{scope.row.Project_Contacts.Handler}}</div>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column label="业主单位">
						<el-table-column label="单位名称">
							<template slot-scope='scope'>
								<div>{{scope.row.ProjectOwner.OwnerName}}</div>
							</template>
						</el-table-column>
						<el-table-column label="项目负责人">
							<template slot-scope='scope'>
								<div>{{scope.row.ProjectOwner.Handler}}</div>
							</template>
						</el-table-column>
						<el-table-column label="具体责任人">
							<template slot-scope='scope'>
								<div>{{scope.row.ProjectOwner.Principal}}</div>
							</template>
						</el-table-column>
					</el-table-column>
				</el-table>
			
			<!--<el-table :data="tableData5" :span-method="objectSpanMethod" :row-class-name="tableRowClassName" :cell-class-name="cell" border style="width: 100%; margin-top: 20px">
				
			</el-table>-->
			<div class="pages">
				<el-pagination @size-change="handleSizeChange" :page-sizes="[10,20,30,40,50]" :page-size="pagesizs" :current-page="pages" @current-change="handleCurrentChange" layout="sizes,prev, pager, next" :total="total" background>
				</el-pagination>
			</div>
		</div>
		<el-dialog title="问题" :visible.sync="dialogVisible" width="384px">
			<span>{{texts}}</span>
			<span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
		    <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		<div id="print" v-show='false'>
			<table class="prinTable">
				<thead>
				<tr>
					<td rowspan="2" width="80px">项目名称</td>
					<td rowspan="2">计划/实际</td>
					<td rowspan="2">年度计划投资</td>
					<td rowspan="2" width="80px">计划开工月份</td>
					<td rowspan="2" width="80px">《规划选址及用地意见书》批复</td>
					<td rowspan="2" width="80px">农转用手续及供地批复</td>
					<td rowspan="2" width="80px">土地出让合同（招投标项目填写</td>
					<td rowspan="2" width="80px">土地使用权证</td>
					<td rowspan="2" width="80px">项目总平设计方案批复</td>
					<td rowspan="2" width="80px">《工可+》或《备案+》</td>
					<td rowspan="2" width="80px">《建设用地规划许可证》批复</td>
					<td rowspan="2" width="80px">地勘报告完成</td>
					<td rowspan="2" width="80px">初步设计及概算批复</td>
					<td rowspan="2" width="80px">施工图编制和审查</td>
					<td rowspan="2" width="80px">预算编制完成</td>
					<td rowspan="2" width="80px">《财审控制价》批复</td>
					<td rowspan="2" width="80px">施工监理招投标（含预公告）</td>
					<td rowspan="2" width="80px">项目开工</td>
					<td rowspan="2" width="80px">《建设工程规划许可证》批复</td>
					<td rowspan="2" width="80px">施工监理人员备案</td>
					<td rowspan="2" width="80px">《施工许可证》批复</td>
					<td rowspan="2" width="80px">当前进展情况及存在问题</td>
					<td colspan="4" width="280px">后续在建阶段工作计划</td>
					<td colspan="3" width="180px">责任管理部门</td>
					<td colspan="3" width="180px">业主单位</td>
				</tr>
				<tr>
					<td>第三季度完成投资</td>
					<td>第三季度期末形象进度</td>
					<td>第四季度完成投资</td>
					<td>第四季度期末形象进度</td>
					<td width="60px">责任管理部门项目负责人</td>
					<td width="60px">责任管理具体负责人</td>
					<td width="60px">业主单位项目负责人</td>
					<td width="60px">单位名称</td>
					<td width="60px">项目负责人</td>
					<td width="60px">具体责任人</td>
				</tr>
				</thead>
				<tbody>
					<tr v-for='(item,index) in tableData5' :key='index'>
						<td>{{item.ProjectInfo.ProjectName}}</td>
						<td>
							<span class="span">计划</span>
							<span>实际</span>
						</td>
						<td>
							{{item.ProjectInfo.InvestMoney}}
						</td>
						<td>
							{{item.ProjectInfo.ComemenceDate|yy}}
						</td>
						<td>
							<span class="span">{{item.Point_GHXZYDJYJSPF.Plan}}</span>
							<span>{{item.Point_GHXZYDJYJSPF.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_LZYSXJGDPF.Plan}}</span>
							<span>{{item.Point_LZYSXJGDPF.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_TDCRHT.Plan}}</span>
							<span>{{item.Point_TDCRHT.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_TDSYQZ.Plan}}</span>
							<span>{{item.Point_TDSYQZ.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_XMZPSJFAPF.Plan}}</span>
							<span>{{item.Point_XMZPSJFAPF.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_GCKXXYJBGPF.Plan}}</span>
							<span>{{item.Point_GCKXXYJBGPF.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_JSYDGHXKZPF.Plan}}</span>
							<span>{{item.Point_JSYDGHXKZPF.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_DKBGWC.Plan}}</span>
							<span>{{item.Point_DKBGWC.Exec}}</span>
						</td>
						<td>
							<span>{{item.Point_CBSJJGSPF.Plan}}</span>
							<span>{{item.Point_CBSJJGSPF.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_SGTBZHSC.Plan}}</span>
							<span>{{item.Point_SGTBZHSC.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_YSBZWC.Plan}}</span>
							<span>{{item.Point_YSBZWC.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_CSKZJPF.Plan}}</span>
							<span>{{item.Point_CSKZJPF.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_SGJLZTP.Plan}}</span>
							<span>{{item.Point_SGJLZTP.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_XMKG.Plan}}</span>
							<span>{{item.Point_XMKG.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_JSGCGHXKZPF.Plan}}</span>
							<span>{{item.Point_JSGCGHXKZPF.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_SGJLRYBA.Plan}}</span>
							<span>{{item.Point_SGJLRYBA.Exec}}</span>
						</td>
						<td>
							<span class="span">{{item.Point_SGXKZPF.Plan}}</span>
							<span>{{item.Point_SGXKZPF.Exec}}</span>
						</td>
						<td>
							{{item.Issues? item.Issues.IssueContent : ''}}
						</td>
						<td>
							{{item.ProjectInfo.Q3Invest}}
						</td>
						<td>
							{{item.ProjectInfo.Q3Memo}}
						</td>
						<td>
							{{item.ProjectInfo.Q4Invest}}
						</td>
						<td>
							{{item.ProjectInfo.Q4Memo}}
						</td>
						<td>
							{{item.Project_Contacts.SitePrincipal}}
						</td>
						<td>
							{{item.Project_Contacts.SiteLink}}
						</td>
						<td>
							{{item.Project_Contacts.Handler}}
						</td>
						<td>
							{{item.ProjectOwner.OwnerName}}
						</td>
						<td>
							{{item.ProjectOwner.Handler}}
						</td>
						<td>
							{{item.ProjectOwner.Principal}}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	import Api from "../axios/api";
	export default {
		name: 'Report',
		data() {
			return {
				dialogVisible: false,
				texts: '',
				search: '', //搜索
				gradeList: [],
				grade: [], //项目级别
				tradeList: [], //行业列表
				trade: [], //行业
				ownerList: [], //业主单位列表
				owner: [], //业主单位
				pagesizs: 10, //每页显示多少条
				total: 1, //总条数
				pages: 1, //页码
				tableData5: [],
				jinduList: [{
					value: 1,
					label: '全部'
				}, {
					value: 2,
					label: '逾期'
				}],
				jindu: 1,
				loading: false,
			}
		},
		created() {
			this.Selector()
			this.dicSelector()
			this.dicSelector1()
			this.getdata(this.pagesizs, this.pages, this.search, this.grade, this.trade, this.owner, this.jindu)
		},
		methods: {
			qs(tex) {
				this.texts = tex
				this.dialogVisible = true
			},
			//导出
			Excel() {
				this.loading = true
				this.$post(Api.getdata, {
					"PageSize": this.pagesizs,
					"PageIndex": this.pages - 1,
					"KeyWord": this.search,
					"Query": {
						"ProjectLevel": this.grade,
						"ProjectIndustry": this.trade,
						"ProjectOwner": this.owner,
						"ExeceedType": this.jindu
					},
					"OrderString": "",
					"ToExcel": true
				}).then(res => {
					console.log(res)
					if(res.state == 200) {
						this.loading = false;
						if(res.data.ExcelResult && res.data.ExcelResult.length != 0) {
							var urls = res.data.ExcelResult
							window.location.href = Api.Hostname +'/'+ urls
						}
					} else {
						this.loading = false;
						this.$message.error(res.msg);
					}
				})
			},
			//获取列表
			getdata(pagesizs, pages, search, grade, trade, owner, jindu) {
				this.loading = true
				this.$post(Api.getdata, {
					"PageSize": pagesizs,
					"PageIndex": pages - 1,
					"KeyWord": search,
					"Query": {
						"ProjectLevel": grade,
						"ProjectIndustry": trade,
						"ProjectOwner": owner,
						"ExeceedType": jindu
					},
					"OrderString": "",
					"ToExcel": false
				}).then(res => {
					console.log(res)
					if(res.state == 200) {
						this.loading = false
						this.tableData5 = res.data.Data
						this.total = res.data.Items ? res.data.Items : 1;
					} else {
						this.loading = false
						this.$message.error(res.errmsg);
					}
				})
			},
			//控制行变色
			tableRowClassName({
				row,
				rowIndex
			}) {
				if(row.bianse == true) {
					return 'warning-row';
				}
				return '';
			},
			//控制单元格变色
			cell({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				//				某一行其中的一个变量applies值如果大于0，并且在第六列，即确定一个具体的单元格需要确定行和列
				if(row.ProJBool == true && columnIndex == 0) {
					return 'red'
				}
				if(row.Point_GHXZYDJYJSPF.Execeed == true && columnIndex == 4) {
					return 'red'
				}
				if(row.Point_LZYSXJGDPF.Execeed == true && columnIndex == 5) {
					return 'red'
				}
				if(row.Point_TDCRHT.Execeed == true && columnIndex == 6) {
					return 'red'
				}
				if(row.Point_TDSYQZ.Execeed == true && columnIndex == 7) {
					return 'red'
				}
				if(row.Point_XMZPSJFAPF.Execeed == true && columnIndex == 8) {
					return 'red'
				}
				if(row.Point_GCKXXYJBGPF.Execeed == true && columnIndex == 9) {
					return 'red'
				}
				if(row.Point_JSYDGHXKZPF.Execeed == true && columnIndex == 10) {
					return 'red'
				}
				if(row.Point_DKBGWC.Execeed == true && columnIndex == 11) {
					return 'red'
				}
				if(row.Point_CBSJJGSPF.Execeed == true && columnIndex == 12) {
					return 'red'
				}
				if(row.Point_SGTBZHSC.Execeed == true && columnIndex == 13) {
					return 'red'
				}
				if(row.Point_YSBZWC.Execeed == true && columnIndex == 14) {
					return 'red'
				}
				if(row.Point_CSKZJPF.Execeed == true && columnIndex == 15) {
					return 'red'
				}
				if(row.Point_SGJLZTP.Execeed == true && columnIndex == 16) {
					return 'red'
				}
				if(row.Point_XMKG.Execeed == true && columnIndex == 17) {
					return 'red'
				}
				if(row.Point_JSGCGHXKZPF.Execeed == true && columnIndex == 18) {
					return 'red'
				}
				if(row.Point_SGJLRYBA.Execeed == true && columnIndex == 19) {
					return 'red'
				}
				if(row.Point_SGXKZPF.Execeed == true && columnIndex == 20) {
					return 'red'
				}

			},
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex === 0 || columnIndex == 21 || columnIndex == 22 || columnIndex == 23 || columnIndex == 24 || columnIndex == 25 || columnIndex == 26 || columnIndex == 27 || columnIndex == 28) {
					if(rowIndex % 2 === 0) {
						return {
							rowspan: 2,
							colspan: 1
						};
					} else {
						return {
							rowspan: 0,
							colspan: 0
						};
					}
				}
			},
			//改变显示条数
			handleSizeChange(val) {
				this.pagesizs = val
				this.getdata(this.pagesizs, this.pages, this.search, this.grade, this.trade, this.owner, this.jindu)
			},
			//翻页
			handleCurrentChange(val) {
				this.pages = val
				this.getdata(this.pagesizs, this.pages, this.search, this.grade, this.trade, this.owner, this.jindu)
			},
			//收索
			searchsf() {
				this.pages = 1
				this.getdata(this.pagesizs, this.pages, this.search, this.grade, this.trade, this.owner, this.jindu)
			},
			//获取业主单位
			Selector() {
				this.$get(Api.Selector).then(res => {
					if(res.data.state == 200) {
						this.ownerList = res.data.data
					} else {
						this.$message.error(res.data.errmsg);
					}
				})
			},
			//获取项目级别
			dicSelector() {
				this.$get(Api.dicSelector + '/' + 1).then(res => {
					if(res.data.state == 200) {
						this.gradeList = res.data.data
					} else {
						this.$message.error(res.data.errmsg);
					}
				})
			},
			//获取项目行业
			dicSelector1() {
				this.$get(Api.dicSelector + '/' + 2).then(res => {
					console.log(res)
					if(res.data.state == 200) {
						this.tradeList = res.data.data
					} else {
						this.$message.error(res.data.errmsg);
					}
				})
			},
			//打印
			print() {
				$('#prinTableprint').css('paddingLeft', '90px')
				$('.prinTable').css('paddingLeft', '90px')
				setTimeout(function() {
					let subOutputRankPrint = document.getElementById("print");
					let newContent = subOutputRankPrint.innerHTML;
					let oldContent = document.body.innerHTML;
					document.body.innerHTML = newContent;
					window.print();
					window.location.reload();
					document.body.innerHTML = oldContent;
					return false;
				}, 0)
			}
		}
	}
</script>

<style scoped="">
	.borderBottom {
		border-bottom: 1px solid #ebeef5;
		/*background: red;*/
	}
</style>