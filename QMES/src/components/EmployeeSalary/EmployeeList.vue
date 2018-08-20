<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">人事薪资</span>
			<span class="h2">员工档案</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<span>员工档案:</span>
				<el-button type="primary" size="small" @click='add()'>添加</el-button>
				
				
				<div class="fr">
					<!--<span class="span2" style="margin-left: 40px;">组织架构</span>-->
					<el-cascader placeholder='请选择组织架构' change-on-select :options="structure" clearable filterable :props="cascaderConfig" v-model="organiz" separator='-' @change="handleChange">
					</el-cascader>
					<el-input v-model="inputs" placeholder="请输入工号" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="EmployeeInfo.Code" fixed show-overflow-tooltip label="工号" sortable width='80'>
				</el-table-column>
				<el-table-column sortable prop='CardInfo.BusinessCode' show-overflow-tooltip label="卡号">
				</el-table-column>
				<el-table-column prop="EmployeeInfo.CNName" fixed label="姓名" sortable>
				</el-table-column>
				<el-table-column prop="EmployeeInfo.Gender" fixed label="性别" sortable>
				</el-table-column>
				<el-table-column prop="OrganizeStr" show-overflow-tooltip label="组织架构">
				</el-table-column>
				<el-table-column prop="" label="入职日期" show-overflow-tooltip sortable>
					<template slot-scope='scope'>
						{{scope.row.EmployeeInfo.EntryDate | $toMoment}}
					</template>
				</el-table-column>
				<el-table-column prop="EmployeeInfo.LeaveDate" show-overflow-tooltip label="离职日期">
					<template slot-scope='scope'>
						{{scope.row.EmployeeInfo.LeaveDate | $toMoment}}
					</template>
				</el-table-column>
				<!--<el-table-column prop="EmployeeInfo.CardID" show-overflow-tooltip label="身份证号">
				</el-table-column>
				<el-table-column prop="EmployeeInfo.Tel" show-overflow-tooltip label="电话">
				</el-table-column>-->
				<el-table-column label="出生年月" show-overflow-tooltip>
					<template slot-scope='scope'>
						{{scope.row.EmployeeInfo.BirthDay | $toMoment}}
					</template>
				</el-table-column>
				<!--<el-table-column prop="EmployeeInfo.ElecCardCode" show-overflow-tooltip label="ID">
				</el-table-column>-->
				
				<el-table-column prop="EmployeeTypeStr" show-overflow-tooltip label="员工类型">
				</el-table-column>
				<el-table-column prop="SolutionStr" show-overflow-tooltip label="工资方案">
				</el-table-column>
				
				<el-table-column prop="EmployeeInfo.CreateMan" label="创建人">
				</el-table-column>
				<!--<el-table-column label="创建时间">
					<template slot-scope='scope'>
						{{scope.row.EmployeeInfo.CreateDate | $toMoment}}
					</template>
				</el-table-column>-->
				<el-table-column prop="StateStr" label="状态">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<el-button size="small" type="success" @click='allots(scope.row.EmployeeInfo.ID)'>修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
								</el-dropdown-item>
								<el-dropdown-item v-if='scope.row.EmployeeInfo.State==1'>
									<el-button size="small" type="warning" @click='Quit(scope.row.EmployeeInfo.ID)'>离&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;职</el-button>
								</el-dropdown-item>
								<el-dropdown-item v-else=''>
									<el-button size="small" type="warning" @click='Aditem(scope.row.EmployeeInfo.ID)'>复&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;职</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" class='Purple' @click='allotsd(scope.row.EmployeeInfo.ID,scope.row.EmployeeInfo.ElecCardCode)'>配&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" class='Inverse' @click='clearSet(scope.row.CardInfo.ID)'>清除配置</el-button>
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
		<el-dialog title="添加员工档案" :visible.sync="adds1" width="800px">
			<el-form :model="formInline" label-width="80px">
				<div class="clearfix">
					<div class="fl fldivs">
						<el-form-item label="员工工号">
							<el-input v-model="formInline.ID" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="formInline.name" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="性别">
							<el-radio-group v-model="formInline.radio2">
								<el-radio label="男">男</el-radio>
								<el-radio label="女">女</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="身份证号">
							<el-input v-model="formInline.caid" @blur='blur' placeholder=""></el-input>
						</el-form-item>
					</div>
					<div class="fr">
						<el-upload class="avatar-uploader" :action="actionUrl" :show-file-list="false" :headers="myHeaders" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="Host+imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 178px;"></i>
						</el-upload>
					</div>
					
				</div>
				<div class="clearfix">
					<div class="fl" style="width: 49%;">
						<el-form-item label="出生年月">
							<el-date-picker class='tiems' v-model="formInline.time" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
						
					</div>
					<div class="fr" style="width: 49%;">
						<el-form-item label="入职日期">
							<el-date-picker class='tiems' v-model="formInline.starTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
						
					</div>
				</div>
				<div class="clearfix">
					<div class="fl" style="width: 49%;">
						<el-form-item label="电话">
							<el-input type='number' v-model="formInline.tel" placeholder=""></el-input>
						</el-form-item>
					</div>
					<div class="fr" style="width: 49%;">
						<el-form-item label="离职日期">
							<el-date-picker class='tiems' v-model="formInline.endTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="离职时间">
							</el-date-picker>
						</el-form-item>
						
					</div>
				</div>
				<div class="clearfix">
					<div class="fl" style="width:49%">
						<el-form-item label="卡号">
							<el-select class='se' filterable v-model="card" placeholder="请选择">
								<el-option v-for="item in Ecards" :key="item.CardCode" :label="item.BusinessCode" :value="item.CardCode">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="工资方案">
							<el-select class='se' filterable v-model="pay" placeholder="请选择">
								<el-option v-for="item in paylist" :key="item.ID" :label="item.SolutionName" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="fr" style="width:49%">
						<el-form-item label="员工类型">
							<el-select class='se' filterable v-model="staffNum" placeholder="请选择">
								<el-option v-for="item in staffs" :key="item.ID" :label="item.DictName" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="组织架构">
							<el-cascader filterable change-on-select style='width: 100%;' :options="structure" :props="cascaderConfig" v-model="struc" separator='-' @change="handleChange">
							</el-cascader>
						</el-form-item>
					</div>
				</div>
				<el-form-item label="是否同步">
					<el-checkbox v-model="checked"></el-checkbox>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="adds1 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="addTrue()">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="修改员工档案" :visible.sync="adds2" width="800px">
			<el-form :model="formInline" label-width="80px">
				<div class="clearfix">
					<div class="fl fldivs">
						<el-form-item label="员工工号">
							<el-input v-model="formInline.ID" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="formInline.name" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="性别">
							<el-radio-group v-model="formInline.radio2">
								<el-radio label="男">男</el-radio>
								<el-radio label="女">女</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="出生年月">
							<el-date-picker class='tiems' v-model="formInline.time" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</div>
					<div class="fr">
						<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
				</div>
				<div class="clearfix">
					<div class="fl" style="width: 49%;">
						<el-form-item label="入职日期">
							<el-date-picker class='tiems' v-model="formInline.starTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</div>
					<div class="fr" style="width: 49%;">
						<el-form-item label="离职日期">
							<el-date-picker class='tiems' v-model="formInline.endTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="离职时间">
							</el-date-picker>
						</el-form-item>
					</div>
				</div>
				<div class="clearfix">
					<div class="fl" style="width: 49%;">
						<el-form-item label="电话">
							<el-input type='number' v-model="formInline.tel" placeholder=""></el-input>
						</el-form-item>
					</div>
					<div class="fr" style="width: 49%;">
						<el-form-item label="身份证号">
							<el-input v-model="formInline.caid" placeholder=""></el-input>
						</el-form-item>
					</div>
				</div>
				<div class="clearfix">
					<div class="fl" style="width:49%">
						<!--<el-form-item label="卡号">
							<el-input v-model="xskah" disabled></el-input>
						</el-form-item>-->
						<!--<el-form-item label="卡号">
							<el-select filterable class='se' v-model="card" placeholder="请选择">
								<el-option v-for="item in Ecards" :key="item.CardCode" :label="item.BusinessCode" :value="item.CardCode">
								</el-option>
							</el-select>
						</el-form-item>-->
						<el-form-item label="员工类型">
							<el-select filterable class='se' v-model="staffNum" placeholder="请选择">
								<el-option v-for="item in staffs" :key="item.ID" :label="item.DictName" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="组织架构">
							<el-cascader filterable change-on-select style='width: 100%;' :options="structure" :props="cascaderConfig" v-model="struc" separator='-' @change="handleChange">
							</el-cascader>
						</el-form-item>
					</div>
					<div class="fr" style="width:49%">
						<el-form-item label="是否同步">
							<el-checkbox v-model="checked"></el-checkbox>
						</el-form-item>
						<el-form-item label="工资方案">
							<el-select filterable class='se' v-model="pay" placeholder="请选择">
								<el-option v-for="item in paylist" :key="item.ID" :label="item.SolutionName" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
					</div>
				</div>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="adds2 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="updateuser()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="离职" :visible.sync="leavenDate" width="384px">
			<el-form :model="formInline" label-width="80px">
				<el-form-item label="离职日期">
					<el-date-picker class='tiems' v-model="formInline.leaDate" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="离职时间">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="leavenDate = false">取 消</el-button>
				<el-button size="small" type="primary" @click="leaven()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="配置" :visible.sync="format2" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="卡号：">
					<el-select filterable class='se' v-model="dzk" placeholder="请选择电子卡号">
						<el-option v-for="item in Ecards" :key="item.CardCode" :label="item.BusinessCode" :value="item.CardCode">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="format2 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="allBcs2()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import api from '../../axios/api.js'
	export default {
		name: 'EmployeeList',
		data() {
			return {
				checked:true,
				format2: false,
				leavenDate: false, //离职时间
				loading: false,
				actionUrl: api.files,
				cascaderConfig: {
					label: 'OrgName',
				},
				myHeaders: {
					token: sessionStorage.Token,
					accountid: sessionStorage.AccountID
				},
				Host: api.hostname,
				imageUrl: '',
				adds2: false, //修改员工档案
				adds1: false, //添加员工档案
				pages: 1, //页码
				total: 1, //页数
				pagesizs: 10,
				tableData: [], //卡片列表
				inputs: '', //搜索
				formInline: {
					ID: '',
					name: '',
					radio2: "男",
					time: '',
					starTime: '',
					endTime: '',
					caid: '',
					leaDate: '',
				},
				staffs: [], //员工类型
				staffNum: '',
				Ecards: [], //电子卡号
				card: '',
				paylist: [], //工资方案
				pay: '',
				structure: [], //组织架构
				struc: [],
				id: '',
				ztee: [],
				dzk: '',
				formLabelAlign:{},
				xskah:'',
				organiz:[]
			}
		},
		filters: {
			$toMoment: function(fmt) {
				if(fmt) {
					let date = new Date(fmt);
					let y = date.getFullYear()
					let m = date.getMonth() + 1;
					let d = date.getDate();
					return y + '-' + m + '-' + d;
				} else {
					return ''
				}

			}
		},
		created() {
			this.dictSelector()
			this.cardselector()
			this.solutionctor()
			this.orgetlist()
			this.Empgetlist(this.pages, this.inputs, this.pagesizs,this.organiz[this.organiz.length - 1])
		},
		methods: {
			//失去焦点触发
			blur(){
				if(this.formInline.caid != ''){
					if(!this.$isCard(this.formInline.caid)){
						this.$message({
							message: "身份证号格式不正确",
							type: "warning"
						});
					}else{
						this.formInline.time =  this.formInline.caid.substring(6, 10) + "-" + this.formInline.caid.substring(10, 12) + "-" + this.formInline.caid.substring(12, 14);
					}
				}
				
			},
			fnDemo(datas, ids) {
				let obj;
				for(let j = 0; j < datas.length; j++) {
					if(ids == datas[j].ID) {
						obj = datas[j];
					}
				}

				function findP(zNodes, obj) {
					let ans = [];
					if(obj.ParentID == '00000000-0000-0000-0000-000000000000') {
						let arr = []
						arr.push(obj)
						return arr;
					}
					for(let i = 0; i < zNodes.length; i++) {
						if(obj.ParentID == zNodes[i].ID) {
							if(zNodes[i].ID == "00000000-0000-0000-0000-000000000000") {
								return zNodes[i];
							}
							ans.push(zNodes[i]);
							return ans.concat(findP(zNodes, zNodes[i]));
						}
					}
				}
				let arr = [];
				arr = findP(datas, obj)
				arr.push(obj)
				return arr;
			},
			excel() {
				this.loading = true
				this.$post(api.Empgetlist, {
					"PageSize": this.pagesizs,
					"PageIndex": this.pages - 1,
					"KeyWord": this.inputs,
					"Query": {
						"EmployeeType": "",
						"SolutionID": "",
						"OrganizeID": this.organiz[this.organiz.length - 1]
					},
					"OrderString": "",
					"ToExcel": true
				}).then(res => {
					if(res.state == 200) {
						this.loading = false
						if(res.data.ExcelResult && res.data.ExcelResult.length != 0) {
							var urls = res.data.ExcelResult
							window.location.href = api.hostname + urls
						}
					} else {
						this.loading = false
						this.$message.error(res.msg)
					}
				})
			},
			//获取员工列表
			Empgetlist(page, inpu, pagesizes,organiz) {
				this.loading = true
				this.$post(api.Empgetlist, {
					"PageSize": pagesizes,
					"PageIndex": page - 1,
					"KeyWord": inpu,
					"Query": {
						"EmployeeType": "",
						"SolutionID": "",
						"OrganizeID": organiz
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
						this.$message.error(res.msg)
					}
				})
			},
			//获取员工类型
			dictSelector() {
				this.$get(api.dictSelector + '/' + 1).then(res => {
					if(res.data.state == 200) {
						this.staffs = res.data.data
					} else {
						this.$message.error(res.data.msg)
					}

				})
			},
			//工资方案
			solutionctor() {
				this.$get(api.solutionctor).then(res => {
					console.log(res)
					if(res.data.state == 200) {
						this.paylist = res.data.data
					} else {
						this.$message.error(res.data.msg)
					}

				})
			},
			//电子卡
			cardselector() {
				this.$get(api.cardselector + '/' + 0).then(res => {
					console.log(res)
					if(res.data.state == 200) {
						this.Ecards = res.data.data
					} else {
						this.$message.error(res.data.msg)
					}

				})
			},
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
						this.ztee = res.data.data
						this.structure = this.$toTree(this.structure)
						console.log(this.structure)
					} else {
						this.$message.error(res.data.msg)
					}

				})
			},
			//组织架构
			handleChange() {

			},
			handleAvatarSuccess(res, file) {
				console.log(res);
				this.imageUrl = res.data.substring(
					2,
					res.data.length
				);
				console.log(this.imageUrl);
				this.$message({
					message: "上传成功",
					type: "success"
				});
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isGIF = file.type === 'image/gif';
				const isPNG = file.type === 'image/png';
				const isBMP = file.type === 'image/bmp';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if(!isJPG && !isGIF && !isPNG && !isBMP) {
					this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return(isJPG || isBMP || isGIF || isPNG) && isLt2M;
			},
			uploadError(response) {
				this.$message.error("上传相片失败！");
			},
			handleSizeChange(val) {
				this.pagesizs = val
				this.Empgetlist(this.pages, this.inputs, this.pagesizs,this.organiz[this.organiz.length - 1])
			},
			//分页
			handleCurrentChange(val) {
				this.pages = val
				this.Empgetlist(this.pages, this.inputs, this.pagesizs,this.organiz[this.organiz.length - 1])
			},
			//搜索
			filter() {
				this.pages = 1
				this.Empgetlist(this.pages, this.inputs, this.pagesizs,this.organiz[this.organiz.length - 1])
			},
			//添加工资项目弹框
			add() {

				this.cardselector()
				this.checked = true
				this.formInline.ID = '' //编号
				this.formInline.name = '' //姓名
				this.formInline.time = '' //出生年月
				this.formInline.radio2 = '男' //性别
				this.formInline.tel = '' //电话
				this.formInline.starTime = '' //入职时间
				this.formInline.endTime = '' //离职时间
				this.formInline.caid = '' //身份证号
				this.card = '' //电子卡号
				this.staffNum = '' //员工类型
				this.pay = '' //工资方案
				this.struc = [] //阻止架构
				this.imageUrl = ''
				this.adds1 = true
			},
			//确认添加
			addTrue() {
				if(this.formInline.ID == '') {
					this.$message({
						message: "工号不能为空",
						type: "warning"
					});
					return;
				} else if(this.formInline.name == '') {
					this.$message({
						message: "姓名不能为空",
						type: "warning"
					});
					return;
				} else if(this.formInline.starTime == '') {
					this.$message({
						message: "入职时间不能为空",
						type: "warning"
					});
					return;
				} else if(this.formInline.caid == '') {
					this.$message({
						message: "身份证号不能为空",
						type: "warning"
					});
					return;
				} else if(!this.$isCard(this.formInline.caid)) {
					this.$message({
						message: "身份证号格式不正确",
						type: "warning"
					});
					this.formInline.caid = ''
					return false;
				} else if(this.formInline.tel == '') {
					this.$message({
						message: "电话号码不能为空",
						type: "warning"
					});
					return;
				} else if(!this.$isTel(this.formInline.tel)) {
					this.$message.error('联系电话格式不正确，请输入正确的手机号或带区号的固定电话！');
					this.formInline.tel = '';
					return false;
				} else if(this.formInline.time == '') {
					this.$message({
						message: "出生年月不能为空",
						type: "warning"
					});
					return;
				} else if(this.card == '') {
					this.$message({
						message: "电子卡号不能为空",
						type: "warning"
					});
					return;
				} else if(this.staffNum == '') {
					this.$message({
						message: "员工类型不能为空",
						type: "warning"
					});
					return;
				} else if(this.pay == '') {
					this.$message({
						message: "工资方案不能为空",
						type: "warning"
					});
					return;
				} else if(this.struc == []) {
					this.$message({
						message: "组织架构不能为空",
						type: "warning"
					});
					return;
				} else {
					this.loading = true
					this.$post(api.Empaddnew, {
						"Code": this.formInline.ID,
						"CNName": this.formInline.name,
						"Gender": this.formInline.radio2,
						"EntryDate": this.formInline.starTime,
						"LeaveDate": this.formInline.endTime,
						"CardID": this.formInline.caid,
						"Tel": this.formInline.tel,
						"BirthDay": this.formInline.time,
						"HeadIMG": this.imageUrl,
						"ElecCardCode": this.card,
						"EmployeeType": this.staffNum,
						"SolutionID": this.pay,
						"OrganizeID": this.struc[this.struc.length - 1],
						"Devices":this.checked
					}).then(res => {
						if(res.state == 200) {
							this.loading = true
							this.adds1 = false
							this.pages = 1
							this.inputs = ''
							this.organiz=[]
							this.Empgetlist(this.pages, this.inputs, this.pagesizs,this.organiz[this.organiz.length - 1])
						} else {
							this.loading = true
							this.adds1 = false
							this.$message.error(res.msg);
						}
					})
				}
			},
			//修改弹框
			allots(id) {

				this.cardselector()
				this.id = id
				this.edits(this.id)
				this.adds2 = true
			},
			//通过id获取数据
			edits(id) {
				this.$get(api.getlistid + '/' + id).then(res => {
					if(res.data.state == 200) {
						this.formInline.ID = res.data.data.Code
						this.formInline.name = res.data.data.CNName
						this.formInline.radio2 = res.data.data.Gender
						this.formInline.starTime = res.data.data.EntryDate
						this.formInline.endTime = res.data.data.LeaveDate
						this.formInline.caid = res.data.data.CardID
						this.formInline.tel = res.data.data.Tel
						this.formInline.time = res.data.data.BirthDay
						this.imageUrl = res.data.data.HeadIMG
						this.card = res.data.data.ElecCardCode
						this.checked = res.data.data.Devices
//						this.xskah = 
						this.staffNum = res.data.data.EmployeeType
						this.pay = res.data.data.SolutionID
						this.struc = []
						var arr = this.fnDemo(this.ztee, res.data.data.OrganizeID)
						var set = new Set(arr)
						var newArr = Array.from(set)
						console.log(newArr)
						if(newArr.length <= 1) {
							this.struc.push(newArr[0].ID)
						} else {
							for(var i = newArr.length - 1; i >= 0; i--) {
								this.struc.push(newArr[i].ID)
							}
							this.struc.push(newArr[newArr.length - 1].ID)
						}
						console.log(this.struc)
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			//确认修改
			updateuser() {
				if(this.formInline.ID == '') {
					this.$message({
						message: "工号不能为空",
						type: "warning"
					});
					return;
				} else if(this.formInline.name == '') {
					this.$message({
						message: "姓名不能为空",
						type: "warning"
					});
					return;
				} else if(this.formInline.starTime == '') {
					this.$message({
						message: "入职时间不能为空",
						type: "warning"
					});
					return;
				} else if(this.formInline.caid == '') {
					this.$message({
						message: "身份证号不能为空",
						type: "warning"
					});
					return;
				} else if(!this.$isCard(this.formInline.caid)) {
					this.$message({
						message: "身份证号格式不正确",
						type: "warning"
					});
					this.formInline.caid = ''
					return false;
				} else if(this.formInline.tel == '') {
					this.$message({
						message: "电话号码不能为空",
						type: "warning"
					});
					return;
				} else if(!this.$isTel(this.formInline.tel)) {
					this.$message({
						message: '联系电话格式不正确，请输入正确的手机号或带区号的固定电话！',
						type: "warning"
					});
					this.formInline.tel = '';
					return false;
				} else if(this.formInline.time == '') {
					this.$message({
						message: "出生年月不能为空",
						type: "warning"
					});
					return;
				} else if(this.staffNum == '') {
					this.$message({
						message: "员工类型不能为空",
						type: "warning"
					});
					return;
				} else if(this.pay == '') {
					this.$message({
						message: "工资方案不能为空",
						type: "warning"
					});
					return;
				} else if(this.struc == []) {
					this.$message({
						message: "组织架构不能为空",
						type: "warning"
					});
					return;
				} else {
					this.loading = true
					this.$post(api.Empedititem, {
						"ID": this.id,
						"Code": this.formInline.ID,
						"CNName": this.formInline.name,
						"Gender": this.formInline.radio2,
						"EntryDate": this.formInline.starTime,
						"LeaveDate": this.formInline.endTime,
						"CardID": this.formInline.caid,
						"Tel": this.formInline.tel,
						"BirthDay": this.formInline.time,
						"HeadIMG": this.imageUrl,
						"ElecCardCode": this.card,
						"EmployeeType": this.staffNum,
						"SolutionID": this.pay,
						"OrganizeID": this.struc[this.struc.length - 1],
						"Devices":this.checked
					}).then(res => {
						if(res.state == 200) {
							this.loading = false
							this.adds2 = false
							
							this.Empgetlist(this.pages, this.inputs, this.pagesizs,this.organiz[this.organiz.length - 1])
						} else {
							this.loading = false
							this.adds2 = false
							this.$message.error(res.msg);
						}
					})
				}
			},
			//离职
			Quit(id) {
				this.leavenDate = true
				this.formInline.leaDate = ''
				this.id = id
			},
			//确认离职
			leaven() {
				if(this.formInline.leaDate == '') {
					this.$message({
						message: "时间不能为空",
						type: "warning"
					});
					return;
				}
				this.$get(api.Empdelitem + '/' + this.id + '/' + this.formInline.leaDate).then(res => {
					if(res.data.state == 200) {
						this.leavenDate = false
						
						this.Empgetlist(this.pages, this.inputs, this.pagesizs,this.organiz[this.organiz.length - 1])
					} else {
						this.leavenDate = false
						this.$message.error(res.data.msg);
					}
				})
			},
			//复职
			Aditem(id){
				this.$confirm("确定复职?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.Aditem + "/" + id)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "复职成功",
										type: "success"
									});
									
									this.Empgetlist(this.pages, this.inputs, this.pagesizs,this.organiz[this.organiz.length - 1])
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
							message: "已取消复职"
						});
					});
			},
			//配置
			allotsd(id, num) {
				this.dzk = ''
				this.id = id,
//				this.dzk = num;
				this.cardselector();
				this.format2 = true;
			},
			//确认配置
			allBcs2() {
				this.loading = true;
				this.$post(api.cardset, {
						"CardCode": this.dzk,
						"CardType": 1,
						"BusinessID": this.id
					})
					.then(res => {
						if(res.state == 200) {
							this.loading = false;
							this.format2 = false;
							this.$message({
								message: "配置成功",
								type: "success"
							});
							
							this.Empgetlist(this.pages, this.inputs, this.pagesizs)
						} else {
							this.loading = false;
							this.format2 = false;
							this.$message.error(res.msg);
						}
					})
					.catch(error => {
						this.loading = false;
						this.$message.error(error);
					});
			},
			//清除配置
			clearSet(id) {
				this.$confirm("将清除配置, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(api.clearset + "/" + id)
							.then(res => {
								if(res.data.state == 200) {
									this.loading = false;
									this.$message({
										message: "清除成功",
										type: "success"
									});
									
									this.Empgetlist(this.pages, this.inputs, this.pagesizs)
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
							message: "已取消清除"
						});
					});
			},
		}
	}
</script>
<style scoped="">
	.fldivs {
		width: calc(100% - 200px);
	}
	
	.avatar-uploader {
		width: 178px;
		height: 178px;
		border: 1px dashed #d9d9d9;
	}
	
	.avatar-uploader .el-upload--text {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>