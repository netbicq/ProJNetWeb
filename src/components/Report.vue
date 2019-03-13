<template>
	<div v-loading='loading'>
		<div class="title">
			报表管理
		</div>
		<div>
			<div class="panel">
				<div class="panel-heading clearfix">
					<div class="fl reposts">
						<div class="fl">
							<span>项目级别</span>
							<el-select v-model="grade" clearable filterable multiple placeholder="请选择" class='select'>
								<el-option v-for="item in gradeList" :key="item.ID" :label="item.DictName" :value="item.ID">
								</el-option>
							</el-select>
						</div>
						<div class="fl">
							<span>所属行业</span>
							<el-select v-model="trade" clearable filterable multiple placeholder="请选择" class='select'>
								<el-option v-for="item in tradeList" :key="item.ID" :label="item.DictName" :value="item.ID">
								</el-option>
							</el-select>
						</div>
						<div class="fl">
							<span>业主单位</span>
							<el-select v-model="owner" clearable filterable multiple placeholder="请选择" class='select'>
								<el-option v-for="item in ownerList" :key="item.ID" :label="item.OwnerName" :value="item.ID">
								</el-option>
							</el-select>
						</div>
						<div class="fl">
							<span>项目进度</span>
							<el-select v-model="jindu" clearable filterable placeholder="请选择">
								<el-option v-for="item in jinduList" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
						<div class="fl">
							<span>月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份</span>
							<el-date-picker :clearable=false v-model="months" class='months' type="month" placeholder="选择月" format="yyyy-MM" value-format="yyyy-MM">
							</el-date-picker>
						</div>
					</div>
					<div class="search clearfix fr">
						<el-input v-model="search" class='sousuo' placeholder="请输入项目名称"></el-input>
						<button class="btn1 Info mini" style="margin-bottom: 2px;" @click='searchsf'>查询</button>
						<button class="btn1 Info mini" style="margin-bottom: 2px;" @click='Excel'>导出Excel</button>
						<button class="btn1 Info mini" style="margin-bottom: 2px;" @click='print'>打印</button>
						<button class="btn1 Info mini" style="margin-bottom: 2px;" @click='colTrue'>设置显示列</button>
						<button class="btn1 Info mini" style="margin-bottom: 2px;" @click='rowTrue'>数据筛选</button>
            <button class="btn1 Info mini" style="margin-bottom: 2px;" @click='mesCall'>情况通报</button>
						<button class="btn1 Info mini" style="margin-bottom: 2px;" @click='reportBox = true'>点击放大</button>
					</div>
				</div>
			</div>
		</div>
		<div class="panel">
			<div style="font-size: 30px;text-align: center;margin-bottom: 15px;">{{Pank.Report1}}<el-button size="mini" round type="success" style='margin-left: 15px;' @click='edits(Pank.Report1)'>修改</el-button></div>
			<el-table :data="tableDat" resizable border :row-class-name="tableRowClassName" :cell-class-name="cell" height="550" border style="width: 100%" class='tables' >
				<el-table-column type="index" width="50" fixed>
				</el-table-column>
				<el-table-column :label="item.Caption" :fixed='item.ColumnFixed' v-for='(item,index) in colList' :key='index' v-if='item.IsColumn'>
						<el-table-column :label="items.Caption"   v-for='(items,index) in item.Children' :key='index' v-if="item.MultiColumn" width='90'>
							<template slot-scope='scope'>
								<div style="white-space:pre-line">{{getValue(scope.row,items.ColName)}}</div>
							</template>
						</el-table-column>
					
					<template slot-scope='scope' v-if="!(item.MultiColumn)">
							
							<div v-if='item.IsPoint'>
								<div class="borderBottom  heightd" :class="{red:scope.row.PointData['tot_'+item.ColName]>0?true:false}">{{scope.row.PointData['sch_'+item.ColName]}}</div>
								<div class="heightd" :class="{red:scope.row.PointData['tot_'+item.ColName]>0?true:false}">{{scope.row.PointData['exc_'+item.ColName]}}</div>
							</div>
							<div v-else="">
								<div v-if='item.Caption=="计划/实际"'>
									<div class="borderBottom">计划</div>
									<div>实际</div>
								</div>
								<div v-else="">
									<span v-if='item.ShowModal' class="spans" @click='qs(getValue(scope.row,item.ColName))'>{{getValue(scope.row,item.ColName)}}</span>
									<span v-else="">{{getValue(scope.row,item.ColName)}}</span>
								</div>
							</div>
					</template>
				</el-table-column>
				
			</el-table>
			<div class="pages">
				<el-pagination @size-change="handleSizeChange" :page-sizes="[10,20,30,40,50]" :page-size="pagesizs" :current-page="pages" @current-change="handleCurrentChange" layout="sizes,prev, pager, next" :total="total" background>
				</el-pagination>
			</div>
		</div>
		<el-dialog title="表头修改" :visible.sync="heads" width="384px">
					<div>
						<el-form >
							<el-form-item label="表头:" label-width="60px">
							    <el-input v-model="tableTitle"></el-input>
							</el-form-item>
						</el-form>
					</div>
					<span slot="footer" class="dialog-footer">
                    <el-button   @click="heads = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="editHead()" size="small">确 定</el-button>
                </span>
				</el-dialog>
		<el-dialog title="列设置" :visible.sync="userTip" width="750px" :close-on-click-modal='false'>
					<div>
						<el-form  ref="ReportCols" label-width="180px" class='Owners clearfix'>
							<el-form-item  class='fr w50' :label="item.Caption" v-for='(item,index) in colList' :key='index'>
								<el-checkbox v-model="item.IsColumn" :disabled="item.Caption === '项目名称'">是否显示</el-checkbox>
							</el-form-item>
						</el-form>
					</div>
					<span slot="footer" class="dialog-footer">
                    <el-button   @click="userTip = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd()" size="small">确 定</el-button>
                </span>
				</el-dialog>
		<el-dialog title="行设置" :visible.sync="rowTip" width="750px" :close-on-click-modal='false'>
					<div>
						<el-form ref="tableData5" label-width="180px" class='Owners clearfix'>
							<el-form-item  class='fr w50' :label="item.ProjectInfo.ProjectName" v-for='(item,index) in tableData5' :key='index'>
								<el-checkbox v-model="item.isssum">是否显示</el-checkbox>
							</el-form-item>
						</el-form>
					</div>
					<span slot="footer" class="dialog-footer">
                    <el-button   @click="rowTip = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="rowTip = false" size="small">确 定</el-button>
                </span>
				</el-dialog>
    <el-dialog title="情况通报" :visible.sync="msg" width="750px" :close-on-click-modal='false'>
      <div>
        <p style="text-align: center;font-size: 20px;"><b>{{ monthTitle }} 月份前期项目推进情况通报</b></p>
        <el-form :modal="formMsg">
          <el-form-item label="年度计划开工项目：" label-width="150px">共 {{ formMsg.YearCount }} 个</el-form-item>
          <el-form-item label="正常推进项目：" label-width="150px">共 {{ formMsg.NormalCount }} 个</el-form-item>
          <el-form-item label="推进滞后项目：" label-width="150px">共 {{ formMsg.DelayCount }} 个</el-form-item>
          <el-form-item label="推进滞后项目明细：" label-width="150px">
            <p v-for="item of formMsg.DeylayProje">{{ item }}</p>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
                    <el-button   @click="msg = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="rowTip = false" size="small">确 定</el-button>
                </span>
    </el-dialog>
		<el-dialog title="" resizable border :fullscreen='true' :visible.sync="reportBox" width="100%" heigth='100%'>
			<div style="font-size: 30px;text-align: center;margin-bottom: 15px;">{{Pank.Report1}}<el-button size="mini" round type="success" style='margin-left: 15px;' @click='edits(Pank.Report1)'>修改</el-button></div>
			<el-table :data="tableDat" :row-class-name="tableRowClassName" :cell-class-name="cell" border style="width: 100%" class='tables'>
				<el-table-column type="index" width="50" fixed>
				</el-table-column>
				<el-table-column :label="item.Caption" :fixed='item.ColumnFixed' v-for='(item,index) in colList' :key='index' width='80' v-if='item.IsColumn||itme'>
						
						<el-table-column :label="items.Caption"   v-for='(items,index) in item.Children' :key='index' width='90' v-if="item.MultiColumn">
							<template slot-scope='scope'>
								<div style="white-space:pre-line">{{getValue(scope.row,items.ColName)}}</div>
							</template>
						</el-table-column>
					
					<template slot-scope='scope' v-if="!(item.MultiColumn)">
							
							<div v-if='item.IsPoint'>
								<div class="borderBottom  heightd" :class="{red:scope.row.PointData['tot_'+item.ColName]>0?true:false}">{{scope.row.PointData['sch_'+item.ColName]}}</div>
								<div class="heightd" :class="{red:scope.row.PointData['tot_'+item.ColName]>0?true:false}">{{scope.row.PointData['exc_'+item.ColName]}}</div>
							</div>
							<div v-else="">
								<div v-if='item.Caption=="计划/实际"'>
									<div class="borderBottom">计划</div>
									<div>实际</div>
								</div>
								<div v-else="">
									<span v-if='item.ShowModal' @click='qs(getValue(scope.row,item.ColName))'>{{getValue(scope.row,item.ColName)}}</span>
									<span v-else="">{{getValue(scope.row,item.ColName)}}</span>
								</div>
							</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="pages">
				<el-pagination @size-change="handleSizeChange" :page-sizes="[10,20,30,40,50]" :page-size="pagesizs" :current-page="pages" @current-change="handleCurrentChange" layout="sizes,prev, pager, next" :total="total" background>
				</el-pagination>
			</div>
		</el-dialog>
		
		<el-dialog title="内容" :visible.sync="dialogVisible" width="384px">
			<span style="display: block;
    width: 100%;
    word-wrap: break-word;">{{texts}}</span>
			<span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
		    <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		
		<div id="print" v-show='false'>
			<div style="font-size: 16px; text-align: center;">{{Pank.Report1}}</div>
			<table class="prinTable">
				<thead>
				<tr>
					<td rowspan="2">项目名称</td>
					<td rowspan="2">计划/实际</td>
					<td rowspan="2">年度计划投资</td>
					<td rowspan="2">计划开工月份</td>
					<td rowspan="2" width="80px" v-for='(item,index) in recols' :key='index'>{{item.Caption}}</td>
					<td rowspan="2">当前进展情况及存在问题</td>
					<td rowspan="2">下一周工作计划</td>
					<td colspan="8">后续在建阶段工作计划</td>
					<td colspan="3">责任管理部门</td>
					<td colspan="3">业主单位</td>
				</tr>
				<tr>
					<td>第一季度完成投资</td>
					<td>第一季度期末形象进度</td>
					<td>第二季度完成投资</td>
					<td>第二季度期末形象进度</td>
					<td>第三季度完成投资</td>
					<td>第三季度期末形象进度</td>
					<td>第四季度完成投资</td>
					<td>第四季度期末形象进度</td>
					<td>单位名称</td>
					<td>项目负责人</td>
					<td>具体责任人</td>
					<td>单位名称</td>
					<td>项目负责人</td>
					<td>具体责任人</td>
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
						<td v-for='(items,index) in recols' :key='index'>
							<span class="span">{{item.PointData['sch_'+items.ColName]}}</span>
							<span>{{item.PointData['exc_'+items.ColName]}}</span>
						</td>
						<td>
							<span>{{item.Issues? item.Issues.IssueContent : ''}}</span>
						</td>
						<td>
							<span>{{item.ProjectInfo? item.ProjectInfo.NextPlan : ''}}</span>
						</td>
						<td>
							{{item.ProjectInfo.Q1Invest}}
						</td>
						<td>
							{{item.ProjectInfo.Q1Memo}}
						</td>
						<td>
							{{item.ProjectInfo.Q2Invest}}
						</td>
						<td>
							{{item.ProjectInfo.Q2Memo}}
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
							{{item.ProjectInfo.Department}}
						</td>
						<td>
							{{item.Project_Contacts.SitePrincipal}}
						</td>
						<td>
							{{item.Project_Contacts.SiteLink}}
						</td>
						<td>
							{{item.ProjectOwner.OwnerName}}
						</td>
						<td>
							{{item.Project_Contacts.Handler}}
						</td>
						<td>
							{{item.Project_Contacts.OwnerPrinci}}
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
				heads:false,
				tableTitle:'',
				activeNames: ['1'],
				reportBox:false,
				SchExe:'SchExe',
				dialogVisible: false,
        msg: false,
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
				colList: [],
				months: new Date(),
				Pank:{},
				userTip:false,
				ReportCols:[],//显示列
				rowTip:false,
				recols:[],
        formMsg: {}
			}
		},
		computed : {
		    tableDat() {
		       return this.tableData5.filter(item => item.isssum == true)
		    },
      monthTitle() {
		      console.log("updata", this.months)
		     // let year = this.months.getFullYear();
		     // let month = this.months.getMonth() + 1;
        if(typeof this.months != 'string') {
          console.log('not string');
          let year = this.months.getFullYear();
          let month = this.months.getMonth() + 1;
          return year + '-' + month
        }
        return this.months;

      }
		},
		beforeRouteLeave(to,from,next){
			sessionStorage.removeItem('colList')
		    next();
		},
		created() {
      this.getdata(this.pagesizs, this.pages, this.search, this.grade, this.trade, this.owner, this.jindu,this.months);
			this.Selector()
			this.dicSelector()
			this.dicSelector1()
		},
    mounted() {

    },
		methods: {
		  //打开情况通报
      mesCall() {
        this.msg = true;
        this.getdata(this.pagesizs, this.pages, this.search, this.grade, this.trade, this.owner, this.jindu,this.months);
      },
			edits(title){
				this.tableTitle = title
				this.heads = true
			},
			editHead(){
				if(this.tableTitle ==''){
					this.$message.error('表头名不能为空');
					return false
				}
				this.$get(Api.editweb+'/'+this.tableTitle).then(res=>{
					if(res.data.state==200){
						this.heads = false
						this.getdata(this.pagesizs, this.pages, this.search, this.grade, this.trade, this.owner, this.jindu,this.months)
					}else{
						this.heads = false
						this.$message.error(res.data.msg);
					}
//					console.log(res)
				})
			},
			tofarmt(vaue) {
				if(vaue == '/') {
					return vaue
				} else {
					let dates = new Date(vaue);
					let y = dates.getFullYear()
					let m = dates.getMonth() + 1;
					let d = dates.getDate();
					return y + '.' + (m < 10 ? "0" + m : m) + '.' + (d < 10 ? "0" + d : d)
				}

			},
			getValue(ojb,strkey){
				if(strkey==''){
					return ''
				}else{
					var strkeyArr = strkey.split('.').filter(item=>item!=='');
					var newObj = strkeyArr[0]
					var newObj1 = strkeyArr[1]
					if(ojb[newObj]){
						return ojb[newObj][newObj1]?ojb[newObj][newObj1]:''
					}else{
						return ''
					}
					
				}
			},
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
						"ExeceedType": this.jindu,
						"Month":this.months
					},
					"OrderString": "",
					"ToExcel": true
				}).then(res => {
					console.log(res)
					if(res.state == 200) {
						this.loading = false;
						if(res.data.ReporDynlist.ExcelResult && res.data.ReporDynlist.ExcelResult.length != 0) {
							var urls = res.data.ReporDynlist.ExcelResult
							window.location.href = Api.Hostname + '/' + urls
						}
					} else {
						this.loading = false;
						this.$message.error(res.msg);
					}
				})
			},
			 handleChange(val) {
//      console.log(val);
      },
			//获取列表
			getdata(pagesizs, pages, search, grade, trade, owner, jindu,months) {
				this.loading = true
				this.$post(Api.getdata, {
					"PageSize": pagesizs,
					"PageIndex": pages - 1,
					"KeyWord": search,
					"Query": {
						"ProjectLevel": grade,
						"ProjectIndustry": trade,
						"ProjectOwner": owner,
						"ExeceedType": jindu,
						"Month":months
					},
					"OrderString": "",
					"ToExcel": false
				}).then(res => {
					console.log("data", res)
					if(res.state == 200) {
						this.loading = false
						this.tableData5 = res.data.ReporDynlist.Data
            this.formMsg = res.data.DataInfo;
						this.total = res.data.ReporDynlist.Items ? res.data.ReporDynlist.Items : 1;
						this.Pank = res.data.Pank
						if(sessionStorage.colList){
//							if()
							this.colList = JSON.parse(sessionStorage.colList) 
						}else{
							this.colList = res.data.ReportCols
							sessionStorage.colList=JSON.stringify(this.colList)
						}
						for(var i = 4 ;i<res.data.ReportCols.length-5;i++){
							this.recols.push(res.data.ReportCols[i])
						}
						console.log(this.recols)
						this.ReportCols = res.data.ReportCols
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
				if(row.ProJBool == true && columnIndex == 1) {
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
				this.getdata(this.pagesizs, this.pages, this.search, this.grade, this.trade, this.owner, this.jindu,this.months)
			},
			//翻页
			handleCurrentChange(val) {
				this.pages = val
				this.getdata(this.pagesizs, this.pages, this.search, this.grade, this.trade, this.owner, this.jindu,this.months)
			},
			//收索
			searchsf() {
				this.pages = 1
				this.getdata(this.pagesizs, this.pages, this.search, this.grade, this.trade, this.owner, this.jindu,this.months)
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
			},
			colTrue(){
				this.userTip=true
			},
			confirmAdd(){
				sessionStorage.colList=JSON.stringify(this.colList)
				this.userTip=false
				this.getdata(this.pagesizs, this.pages, this.search, this.grade, this.trade, this.owner, this.jindu,this.months)
			},
			rowTrue(){
				this.rowTip=true
			}
		}
	}
</script>

<style scoped="">
	.borderBottom {
		border-bottom: 1px solid #000;
		/*background: red;*/
	}
	.spans{
		/*height: 60px;*/
		display: block;
		overflow: hidden;
	}
</style>
