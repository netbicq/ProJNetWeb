<template>
	<div v-loading='loading'>
		<div class="title">
			项目管理
		</div>
		<div>
			<div class="panel">
				<div class="panel-heading clearfix">
					<button class="btn fl Green mini" @click="adds">新建项目</button>
					<div class="search clearfix fr">
						<el-input v-model="search" placeholder="请输入项目名称或业主单位,项目级别"></el-input>
						<button class="btn Info mini" @click='filter' style="margin-bottom: 2px;">查询</button>
					</div>
				</div>
			</div>
		</div>
		<div class="panel">
			<el-table :data="tableData5" :expand-row-keys="expands"  :row-key="getRowKeys" stripe style="width: 100%" @expand-change='expand'>
				<el-table-column type="expand">
					<template slot-scope="scope">
						<el-tabs v-model="activeName" @tab-click="handleClick">
							<el-tab-pane label="联系人" name="first">
								<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="200px" class='Owners'>
									<el-form-item label="责任管理部门具体责任人" class='fl w50'>
										<el-input v-model="scope.row.Project_Contacts.SiteLink" placeholder="责任管理部门具体责任人" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="责任管理部门具体责任人电话" class='fr w50'>
										<el-input v-model="scope.row.Project_Contacts.SiteLinkTEL" placeholder="责任管理部门具体责任人电话" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="责任管理部门项目负责人" class='fl w50'>
										<el-input v-model="scope.row.Project_Contacts.SitePrincipal" placeholder="责任管理部门项目负责人" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="责任管理部门项目负责人电话" class='fr w50'>
										<el-input v-model="scope.row.Project_Contacts.SitePrincipalTEL" placeholder="责任管理部门项目负责人电话" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="责任管理部门责任领导" class='fl w50'>
										<el-input v-model="scope.row.Project_Contacts.DeptPrincipal" placeholder="责任管理部门责任领导" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="责任管理部门责任领导电话" class='fr w50'>
										<el-input v-model="scope.row.Project_Contacts.DeptPrincipalTEL" placeholder="责任管理部门责任领导电话" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="业主单位具体责任人" class='fl w50'>
										<el-input v-model="scope.row.Project_Contacts.OwnerPrinci" placeholder="业主单位项目负责人" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="业主单位具体责任人" class='fr w50'>
										<el-input v-model="scope.row.Project_Contacts.OwnerTEL" placeholder="业主单位项目负责人电话" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="业主单位项目负责人" class='fl w50'>
										<el-input v-model="scope.row.Project_Contacts.Handler" placeholder="业主单位项目负责人" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="业主单位项目负责人电话" class='fr w50'>
										<el-input v-model="scope.row.Project_Contacts.HandlerTEL" placeholder="业主单位项目负责人电话" style="width:250px;"></el-input>
									</el-form-item>
									
									<!--<el-form-item label="业主分管领导" class='fl w50'>
										<el-input v-model="scope.row.Project_Contacts.Principal" placeholder="请输入分管领导" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="业主分管领导电话" class='fr w50'>
										<el-input v-model="scope.row.Project_Contacts.PrincipalTEL" placeholder="请输入分管领导电话" style="width:250px;"></el-input>
									</el-form-item>-->
									<el-form-item label="业主主要领导" class='fl w50'>
										<el-input v-model="scope.row.Project_Contacts.Leader" placeholder="请输入主要领导" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="业主主要领导电话" class='fr w50'>
										<el-input v-model="scope.row.Project_Contacts.LeaderTEL" placeholder="请输入主要领导电话" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="集团公司分管领导" class='fl w50'>
										<el-input v-model="scope.row.Project_Contacts.ComLead" placeholder="请输入集团公司分管领导" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="集团公司分管领导电话" class='fr w50'>
										<el-input v-model="scope.row.Project_Contacts.ComLeadTEL" placeholder="请输入集团公司分管领导电话" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="集团公司主要负责人" class='fl w50'>
										<el-input v-model="scope.row.Project_Contacts.ComPrincipal" placeholder="请输入集团公司主要负责人" style="width:250px;"></el-input>
									</el-form-item>
									<el-form-item label="集团公司主要负责人电话" class='fr w50'>
										<el-input v-model="scope.row.Project_Contacts.ComPrincipalTEL" placeholder="请输入集团公司主要负责人电话" style="width:250px;"></el-input>
									</el-form-item>
									<el-button type="primary" size="small" class='fr' @click='bclxr(scope.row.Project_Contacts)'>保存</el-button>
								</el-form>

							</el-tab-pane>
							<el-tab-pane label="进度计划" name="second">
								<el-form ref="plan" :model="plan" label-width="200px" class='Owners clearfix'>
									<el-form-item v-for='item in scope.row.Project_Points' :label="item.PointName" :key='item.PointID' class='fl w50'>
										<div style='display: block;'>
											<el-date-picker v-model="item.Schedule" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="计划完成日期">
											</el-date-picker><span v-if="item.Schedule" style="color: red;">保存后不得更改</span>
										</div>
										<el-button type="primary" style='width: 220px; display: block; margin-top: 15px;padding: 12px 20px;' :disabled='!(scope.row.Project_Info.State==3)' size="mini" class='fl' @click='bcjh(scope.row.Project_Info.ID,item.Schedule,item.PointID,item.ID)'>保存</el-button>
									</el-form-item>

								</el-form>
							</el-tab-pane>
							<el-tab-pane label="计划执行" name="third">
								<el-form ref="plan" :model="plan" label-width="200px" class='Owners clearfix'>
									<el-form-item v-for='item in scope.row.Project_Points' :label="item.PointName" :key='item.PointID' class='fl w50'>
										<el-date-picker v-model="item.Exec" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="实际完成日期">
										</el-date-picker><span v-if="item.Exec" style="color: red;">保存后不得更改</span>
										<el-input style='width: 220px; display: block; margin-top: 10px;' v-model="item.ExecMemo" placeholder=""></el-input>
										<el-button type="primary" style='width: 220px; display: block; margin-top: 15px;padding: 12px 20px;' :disabled="!item.Check" size="mini" class='fl' @click='bczx(scope.row.Project_Info.ID,item.Exec,item.ExecMemo,item.PointID,item.ID)'>保存</el-button>
									</el-form-item>

								</el-form>
							</el-tab-pane>
							<el-tab-pane label="问题列表" name="fourth">
								<el-table :data="scope.row.Project_Issue" height="250">
									<el-table-column label="问题内容" prop="IssueContent">
									</el-table-column>
									<el-table-column label="发布日期">
										<template slot-scope='scope'>
											{{scope.row.CreateDate|yy}}
										</template>
									</el-table-column>
									<el-table-column label="发布人" prop="CreateMan">
									</el-table-column>
									<el-table-column label="操作">
										<template slot-scope="scope">
											<el-button type="primary" size="mini" @click='logEdits(scope.row.ID,scope.row.ProjectID,scope.row.IssueContent)'>修改</el-button>
											<el-button type="danger" size="mini" @click='delquick(scope.row.ID)'>删除</el-button>
										</template>
									</el-table-column>

								</el-table>
							</el-tab-pane>
							<el-tab-pane label="日志" name="five">
								<el-table :data="scope.row.Project_Log" height="250">
									<el-table-column label="操作时间">
										<template slot-scope='scope'>
											{{scope.row.CreateDate|yy}}
										</template>
									</el-table-column>
									<el-table-column label="操作人" prop="CreateMan">
									</el-table-column>
									<el-table-column label="操作内容" prop="LogContent">
									</el-table-column>
								</el-table>
							</el-tab-pane>
						</el-tabs>
					</template>
				</el-table-column>
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column label="项目名称" prop="Project_Info.ProjectName">
				</el-table-column>
				<el-table-column label="业主单位" prop="OwnerStr">
				</el-table-column>
				<el-table-column label="责任管理部门名称" prop="Project_Info.Department">
				</el-table-column>
				<el-table-column label="项目级别" prop="ProJLeveStr">
				</el-table-column>
				<el-table-column label="所属行业" prop="ProjStr">
				</el-table-column>
				<el-table-column label="开工日期" prop="">
					<template slot-scope='scope'>
						{{scope.row.Project_Info.ComemenceDate|yy}}
					</template>
				</el-table-column>
				<el-table-column label="计划投资" prop="Project_Info.InvestMoney">
				</el-table-column>
				<el-table-column label="第一季度投资" prop="Project_Info.Q1Invest">
				</el-table-column>
				<el-table-column label="第二季度投资" prop="Project_Info.Q2Invest">
				</el-table-column>
				<el-table-column label="第三季度投资" prop="Project_Info.Q3Invest">
				</el-table-column>
				<el-table-column label="第四季度投资" prop="Project_Info.Q4Invest">
				</el-table-column>
				<el-table-column label="下一周工作计划" show-overflow-tooltip prop="Project_Info.NextPlan">
					<template slot-scope='scope'>
						<div @click='qs(scope.row.Project_Info.NextPlan)'>{{scope.row.Project_Info?scope.row.Project_Info.NextPlan:''}}</div>
					</template>
				</el-table-column>
				<el-table-column label="创建人" prop="Project_Info.CreateMan">
				</el-table-column>
				<el-table-column label="创建日期" prop="Project_Info.CreateDate">
					<template slot-scope='scope'>
						{{scope.row.Project_Info.CreateDate|yy}}
					</template>
				</el-table-column>
				<el-table-column label="状态" prop="StateStr">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown size="small" trigger="click" type="primary">
							<el-button type="primary" size="small" class="Info">
								操&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 作<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item v-if='Check&&(scope.row.Project_Info.State==2||scope.row.Project_Info.State==5)'>
									<button class="btn Success mini" @click="stateset(scope.row.Project_Info.ID,1)">审&nbsp;&nbsp;&nbsp;核&nbsp;&nbsp;&nbsp;&nbsp;通&nbsp;&nbsp;&nbsp;&nbsp;过</button>
								</el-dropdown-item>
								<el-dropdown-item v-if='scope.row.Project_Info.State==1'>
									<button class="btn Success mini" @click="stateset(scope.row.Project_Info.ID,6)">申&nbsp;&nbsp;&nbsp;请&nbsp;&nbsp;&nbsp;&nbsp;修&nbsp;&nbsp;&nbsp;&nbsp;改</button>
								</el-dropdown-item>
								<el-dropdown-item v-if="Check&&scope.row.Project_Info.State==6">
									<button class="btn Pink mini" @click="stateset(scope.row.Project_Info.ID,3)">审&nbsp;&nbsp;&nbsp;批&nbsp;&nbsp;&nbsp;&nbsp;通&nbsp;&nbsp;&nbsp;&nbsp;过</button>
								</el-dropdown-item>
								<el-dropdown-item v-if='scope.row.Project_Info.State==3'>
									<button class="btn Purple mini" @click="stateset(scope.row.Project_Info.ID,5)">提&nbsp;&nbsp;&nbsp;交&nbsp;&nbsp;&nbsp;&nbsp;审&nbsp;&nbsp;&nbsp;&nbsp;批</button>
								</el-dropdown-item>
								<el-dropdown-item v-if='scope.row.Project_Info.State==3'>
									<button class="btn Pink mini" @click="xiugai(scope.row.Project_Info)">修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 改</button>
								</el-dropdown-item>
								<el-dropdown-item v-if='Start'>
									<button class="btn Danger mini" @click="stateset(scope.row.Project_Info.ID,4)">开&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 工</button>
								</el-dropdown-item>
								<el-dropdown-item v-if='Start'>
									<button class="btn Warning mini" @click="dels(scope.row.Project_Info.ID)">删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 除</button>
								</el-dropdown-item>
								<el-dropdown-item>
									<button class="btn Green mini" @click="followUp(scope.row.Project_Info.ID,scope.row.Project_Info.Q1Invest,scope.row.Project_Info.Q2Invest,scope.row.Project_Info.Q3Invest,scope.row.Project_Info.Q4Invest,scope.row.Project_Info.Q1Memo,scope.row.Project_Info.Q2Memo,scope.row.Project_Info.Q3Memo,scope.row.Project_Info.Q4Memo,scope.row.Project_Info.NextPlan)">后&nbsp;&nbsp;&nbsp;续&nbsp;&nbsp;&nbsp;&nbsp;计&nbsp;&nbsp;&nbsp;&nbsp;划</button>
								</el-dropdown-item>
								<el-dropdown-item>
									<button class="btn Info mini" @click="fnResetPwdTip(scope.row.Project_Info.ID)">进展情况及问题</button>
								</el-dropdown-item>
								<el-dropdown-item v-if='Messagew'>
									<button class="btn Danger mini" @click="setMeggse(scope.row.Project_Info.ID)">配&nbsp;&nbsp;&nbsp;置&nbsp;&nbsp;&nbsp;&nbsp;短&nbsp;&nbsp;&nbsp;&nbsp;信</button>
								</el-dropdown-item>
                <el-dropdown-item v-if='scope.row.Project_Info.State==4'>
                  <button class="btn Warning mini" @click="stopwork(scope.row.Project_Info.ID)">取&nbsp;&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;&nbsp;开&nbsp;&nbsp;&nbsp;&nbsp;工</button>
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
		<el-dialog title="项目新建" :visible.sync="add" width="860px">
			<el-tabs v-model="aitives">
				<el-tab-pane label="项目信息" name="1" disabled>
					<el-form ref="project" :model="project" label-width="140px" class='Owners clearfix'>
						<el-form-item label="项目名称" class='fl w50'>
							<el-input v-model="project.names" placeholder="请输入项目名称" style="width:250px;"></el-input>
						</el-form-item>
						<el-form-item label="项目级别" class='fl w50'>
							<el-select v-model="project.value" placeholder="请选择" style="width:250px;">
								<el-option v-for="item in options" :key="item.ID" :label="item.DictName" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="业主单位" class='fl w50'>
							<el-select v-model="project.value1" placeholder="请选择" style="width:250px;">
								<el-option v-for="item in options1" :key="item.ID" :label="item.OwnerName" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="责任管理部门名称" class='fl w50'>
							<el-input v-model="project.zrglbm" placeholder="请输入责任管理部门名称" style="width:250px;"></el-input>
						</el-form-item>
						<el-form-item label="所属行业" class='fl w50'>
							<el-select v-model="project.value2" placeholder="请选择" style="width:250px;">
								<el-option v-for="item in options2" :key="item.ID" :label="item.DictName" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="计划投资" class='fl w50'>
							<el-input v-model="project.jhtz" placeholder="请输入金额" style="width:220px;"></el-input><span>万元</span>
						</el-form-item>
						<el-form-item label="开工日期" class='fl w50'>
							<el-date-picker v-model="project.dates" style="width:250px;" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-form>
					<div style="text-align: center;padding-bottom: 20px;">
						<button class="btn Green mini" @click="tabs()">下一步</button>
					</div>
				</el-tab-pane>
				<el-tab-pane label="进度计划" name="2" disabled> 
					<el-form ref="plan" :model="plan" label-width="180px" class='Owners'>
						<el-form-item v-for='item in newPack' :key='item.ID' :label="item.PointName" class='fl w50'>
							<el-date-picker v-model="item.Schedule" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:210px;">
							</el-date-picker>
						</el-form-item>
					</el-form>
					<div style="text-align: center;padding-bottom: 20px;">
						<button class="btn Green mini" @click="prve()">上一步</button>
						<button class="btn Green mini" @click="tabs()">下一步</button>
					</div>
				</el-tab-pane>
				<el-tab-pane label="联系人" name="3" disabled>
					<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="200px" class='Owners'>
						<el-form-item label="责任管理部门具体责任人" class='fl w50'>
							<el-input v-model="formLabelAlign.pxLinks" placeholder="责任管理部门具体责任人" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="责任管理部门具体责任人电话" class='fr w50'>
							<el-input v-model="formLabelAlign.pxLinksTel" placeholder="责任管理部门具体责任人电话" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="责任管理部门项目负责人" class='fl w50'>
							<el-input v-model="formLabelAlign.preside" placeholder="责任管理部门项目负责人" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="责任管理部门项目负责人电话" class='fr w50'>
							<el-input v-model="formLabelAlign.fTel" placeholder="责任管理部门项目负责人电话" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="责任管理部门责任领导" class='fl w50'>
							<el-input v-model="formLabelAlign.bmze" placeholder="责任管理部门责任领导" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="责任管理部门责任领导电话" class='fr w50'>
							<el-input v-model="formLabelAlign.bmzeTel" placeholder="责任管理部门责任领导电话" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="业主单位具体责任人" class='fl w50'>
							<el-input v-model="formLabelAlign.OwnerPrinci" placeholder="业主单位项目负责人" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="业主单位具体责任人电话" class='fr w50'>
							<el-input v-model="formLabelAlign.OwnerTEL" placeholder="业主单位项目负责人电话" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="业主单位项目负责人" class='fl w50'>
							<el-input v-model="formLabelAlign.Agent" placeholder="业主单位项目负责人" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="业主单位项目负责人电话" class='fr w50'>
							<el-input v-model="formLabelAlign.AgenTel" placeholder="业主单位项目负责人电话" style="width:200px;"></el-input>
						</el-form-item>
						
						<!--<el-form-item label="业主分管领导" class='fl w50'>
							<el-input v-model="formLabelAlign.leader" placeholder="请输入分管领导" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="业主分管领导电话" class='fr w50'>
							<el-input v-model="formLabelAlign.leaderTel" placeholder="请输入分管领导电话" style="width:200px;"></el-input>
						</el-form-item>-->
						<el-form-item label="业主主要领导" class='fl w50'>
							<el-input v-model="formLabelAlign.fugle" placeholder="请输入主要领导" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="业主主要领导电话" class='fr w50'>
							<el-input v-model="formLabelAlign.fugleTel" placeholder="请输入主要领导电话" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="集团公司分管领导" class='fl w50'>
							<el-input v-model="formLabelAlign.jtld" placeholder="请输入主要领导" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="集团公司分管领导电话" class='fr w50'>
							<el-input v-model="formLabelAlign.jtldTel" placeholder="请输入主要领导电话" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="集团公司主要负责人" class='fl w50'>
							<el-input v-model="formLabelAlign.jtfzr" placeholder="请输入主要领导" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="集团公司主要负责人电话" class='fr w50'>
							<el-input v-model="formLabelAlign.jtfzrTel" placeholder="请输入主要领导电话" style="width:200px;"></el-input>
						</el-form-item>
					</el-form>
					<div style="text-align: center;padding-bottom: 20px;">
						<button class="btn Green mini" @click="prve()">上一步</button>
						<button class="btn Green mini" @click="tabs()">下一步</button>
					</div>
				</el-tab-pane>
				<el-tab-pane label="后续计划" name="4" disabled>
					<el-tabs v-model="aitijhL" @tab-click="handleClick">
						<el-tab-pane label="第一季度" name="1" disabled>
							<div style="text-align: right;padding-bottom: 20px;">
								<button class="btn Green mini" @click="hxNext()">下一步</button>
							</div>
							<el-form ref="follow" :model="follow" label-width="80px" class='Owners'>
								<el-form-item label="完成投资">
									<el-input v-model="follow.money1" placeholder="请输入金额" style="width:660px;"></el-input><span style="margin-left: 5px;">万元</span>
								</el-form-item>
								<el-form-item label="形象进度" class='clearfix'>
									<el-input v-model="follow.Speed1" placeholder="" type="textarea" style="width:700px;"></el-input>
								</el-form-item>
							</el-form>
							
						</el-tab-pane>
						<el-tab-pane label="第二季度" name="2" disabled>
							<div style="text-align: right;padding-bottom: 20px;">
								<button class="btn Green mini" @click="hxPrve()">上一步</button>
								<button class="btn Green mini" @click="hxNext()">下一步</button>
							</div>
							<el-form ref="follow" :model="follow" label-width="80px" class='Owners'>
								<el-form-item label="完成投资">
									<el-input v-model="follow.money2" placeholder="请输入金额" style="width:660px;"></el-input><span style="margin-left: 5px;">万元</span>
								</el-form-item>
								<el-form-item label="形象进度" class='clearfix'>
									<el-input v-model="follow.Speed2" placeholder="" type="textarea" style="width:700px;"></el-input>
								</el-form-item>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="第三季度" name="3" disabled>
							<div style="text-align: right;padding-bottom: 20px;">
								<button class="btn Green mini" @click="hxPrve()">上一步</button>
								<button class="btn Green mini" @click="hxNext()">下一步</button>
							</div>
							<el-form ref="follow" :model="follow" label-width="80px" class='Owners'>
								<el-form-item label="完成投资">
									<el-input v-model="follow.money3" placeholder="请输入金额" style="width:660px;"></el-input><span style="margin-left: 5px;">万元</span>
								</el-form-item>
								<el-form-item label="形象进度" class='clearfix'>
									<el-input v-model="follow.Speed3" placeholder="" type="textarea" style="width:700px;"></el-input>
								</el-form-item>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="第四季度" name="4" disabled>
							<div style="text-align: right;padding-bottom: 20px;">
								<button class="btn Green mini" @click="hxPrve()">上一步</button>
								<button class="btn Green mini" @click="hxNext()">下一步</button>
							</div>
							<el-form ref="follow" :model="follow" label-width="80px" class='Owners'>
								<el-form-item label="完成投资">
									<el-input v-model="follow.money4" placeholder="请输入金额" style="width:660px;"></el-input><span style="margin-left: 5px;">万元</span>
								</el-form-item>
								<el-form-item label="形象进度" class='clearfix'>
									<el-input v-model="follow.Speed4" placeholder="" type="textarea" style="width:700px;"></el-input>
								</el-form-item>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="下一周工作计划" name="5" disabled>
							<div style="text-align: right;padding-bottom: 20px;">
								<button class="btn Green mini" @click="hxPrve()">上一步</button>
							</div>
							<el-form ref="follow" :model="follow" label-width="120px" class='Owners'>
								<el-form-item label="下一周工作计划" class='clearfix'>
									<el-input v-model="follow.nextPlan" placeholder="" type="textarea" style="width:660px;"></el-input>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
					<div style="text-align: center;padding-bottom: 20px;">
						<button class="btn Green mini" @click="prve()">上一步</button>
						<button class="btn Green mini" @click="confirm()">完&nbsp;&nbsp;&nbsp;&nbsp;成</button>
					</div>
				</el-tab-pane>
			</el-tabs>
			<!--<span slot="footer" class="dialog-footer" v-if="aitives==4">
				<el-button size="small" @click="add = false">取 消</el-button>
				
			</span>-->
		</el-dialog>
		<el-dialog title="进展情况及问题" :visible.sync="qus" width="424px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="0px" class='Owners'>
				<el-form-item>
					<el-input v-model="qustions" type='textarea' placeholder="请输入问题" :rows="2" style="width:100%;"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="qus = false">取 消</el-button>
			<el-button size="small" type="primary" @click="reset()">确 定</el-button>
		</span>
		</el-dialog>
		<el-dialog title="短信配置" :visible.sync="meggse" width="750px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="180px" class='Owners'>
				<el-form-item class='fr w50' v-for='item in listMeggse' :key='item.ID' :label="item.PointName">
					<el-checkbox v-model="item.IsSend">是否发送短信</el-checkbox>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="meggse = false">取 消</el-button>
			<el-button size="small" type="primary" @click="meggsend()">确 定</el-button>
		</span>
		</el-dialog>
		<el-dialog title="问题修改" :visible.sync="logs" width="424px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="60px" class='Owners'>
				<el-form-item label="问题：">
					<el-input v-model="qustions" type='textarea' placeholder="请输入问题" :rows="2" style="width:320px;"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="logs = false">取 消</el-button>
			<el-button size="small" type="primary" @click="edit()">确 定</el-button>
		</span>
		</el-dialog>
		<el-dialog title="后续计划" :visible.sync="ups" width="500px" class='eld'>
			<el-tabs v-model="activeName11">
				<el-tab-pane label="第一季度" name="first">
					<el-form ref="follow" :model="follow" label-width="80px" class='Owners'>
						<el-form-item label="完成投资">
							<el-input v-model="follow.money1" placeholder="请输入金额" style="width:340px;"></el-input><span style="margin-left: 5px;">万元</span>
						</el-form-item>
						<el-form-item label="形象进度" class='clearfix'>
							<el-input v-model="follow.Speed1" placeholder="" type="textarea" style="width:380px;"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="第二季度" name="second">
					<el-form ref="follow" :model="follow" label-width="80px" class='Owners'>
						<el-form-item label="完成投资">
							<el-input v-model="follow.money2" placeholder="请输入金额" style="width:340px;"></el-input><span style="margin-left: 5px;">万元</span>
						</el-form-item>
						<el-form-item label="形象进度" class='clearfix'>
							<el-input v-model="follow.Speed2" placeholder="" type="textarea" style="width:380px;"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="第三季度" name="third">
					<el-form ref="follow" :model="follow" label-width="80px" class='Owners'>
						<el-form-item label="完成投资">
							<el-input v-model="follow.money3" placeholder="请输入金额" style="width:340px;"></el-input><span style="margin-left: 5px;">万元</span>
						</el-form-item>
						<el-form-item label="形象进度" class='clearfix'>
							<el-input v-model="follow.Speed3" placeholder="" type="textarea" style="width:380px;"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="第四季度" name="fourth">
					<el-form ref="follow" :model="follow" label-width="80px" class='Owners'>
						<el-form-item label="完成投资">
							<el-input v-model="follow.money4" placeholder="请输入金额" style="width:340px;"></el-input><span style="margin-left: 5px;">万元</span>
						</el-form-item>
						<el-form-item label="形象进度" class='clearfix'>
							<el-input v-model="follow.Speed4" placeholder="" type="textarea" style="width:380px;"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="下一周工作计划" name="five">
					<el-form ref="follow" :model="follow" label-width="120px" class='Owners'>
						<el-form-item label="下一周工作计划" class='clearfix'>
							<el-input v-model="follow.nextPlan" placeholder="" type="textarea" style="width:340px;"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>

			<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="ups = false">取 消</el-button>
			<el-button size="small" type="primary" @click="DetePlan()">确 定</el-button>
		</span>
		</el-dialog>
		<el-dialog title="项目信息" :visible.sync="xm" width="464px">
			<el-form ref="follow" :model="follow" label-width="80px" class='Owners'>
				<el-form ref="project" :model="project" label-width="130px" class='Owners'>
					<el-form-item label="项目名称">
						<el-input v-model="project.names" placeholder="请输入项目名称" style="width:250px;"></el-input>
					</el-form-item>
					<el-form-item label="项目级别">
						<el-select v-model="project.value" placeholder="请选择" style="width:250px;">
							<el-option v-for="item in options" :key="item.ID" :label="item.DictName" :value="item.ID">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="业主单位">
						<el-select v-model="project.value1" placeholder="请选择" style="width:250px;">
							<el-option v-for="item in options1" :key="item.ID" :label="item.OwnerName" :value="item.ID">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="责任管理部门名称">
						<el-input v-model="project.zrglbm" placeholder="请输入责任管理部门名称" style="width:250px;"></el-input>
					</el-form-item>
					<el-form-item label="所属行业">
						<el-select v-model="project.value2" placeholder="请选择" style="width:250px;">
							<el-option v-for="item in options2" :key="item.ID" :label="item.DictName" :value="item.ID">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="计划投资">
						<el-input v-model="project.jhtz" placeholder="请输入金额" style="width:220px;"></el-input><span>万元</span>
					</el-form-item>
					<el-form-item label="开工日期">
						<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="project.dates" style="width:250px;" type="date" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
				</el-form>
			</el-form>
			<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="xm = false">取 消</el-button>
			<el-button size="small" type="primary" @click="qrxg()">确 定</el-button>
		</span>
		</el-dialog>
		<el-dialog title="下一周工作计划" :visible.sync="dialogVisibles" width="384px">
			<span style="display: block;
    width: 100%;
    word-wrap: break-word;">{{texts}}</span>
			<span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="dialogVisibles = false">取 消</el-button>
		    <el-button size="small" type="primary" @click="dialogVisibles = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import Api from "../axios/api";
	export default {
		name: 'Project',
		data() {
			return {
				meggse: false,
				activeName11: 'first',
				aitijhL: '1',
				xm: false,
				logList: [], //日志列表
				qustionList: [],
				qustions: '', //问题
				qus: false, //问题发布
				aitives: '1',
				activeName: 'first',
				tableData5: [],
				search: '', //搜索
				add: false, //新建弹框
				formLabelAlign: {
					preside: '', //片区负责人
					fTel: '', //片区负责人电话
					pxLinks: '', //片区联系人
					pxLinksTel: '', //片区联系人电话
					Agent: '', //经办人
					AgenTel: "", //经办人电话
					leader: '', //领导人
					leaderTel: '', //领导人电话
					fugle: '', //主要领导
					fugleTel: '', //主要领导电话
					jtld: '', //集团领导
					jtldTel: '', //集团领导电话
					jtfzr: '', //集团负责人
					jtfzrTel: '', //集团负责人电话
					bmze: '', //责任管理部门责任领导
					bmzeTel: '', //责任管理部门责任领导电话
					OwnerPrinci: '', //业主具体责任人
					OwnerTEL: '', //业主具体责任人电话
				}, //联系人
				plan: {
					Point_GCKXXYJBGPF: '', //
					Point_JSYDGHXKZPF: '', //
					Point_DKBGWC: '', //
					Point_CBSJJGSPF: '', //
					Point_SGTBZHSC: '', //
					Point_YSBZWC: "", //
					Point_CSKZJPF: '', //
					Point_SGJLZTP: '', //
					Point_XMKG: '', //
					Point_JSGCGHXKZPF: '', //
					Point_SGJLRYBA: '',
					Point_SGXKZPF: '',
					Point_GHXZYDJYJSPF: '',
					Point_LZYSXJGDPF: '',
					Point_TDCRHT: '',
					Point_TDSYQZ: '',
					Point_XMZPSJFAPF: '',
				}, //进度计划
				project: {
					names: '', //项目名称
					value: '', //级别
					value1: '', //单位
					value2: '', //行业
					jhtz: '', //计划投资
					dates: '', //时间
					zrglbm:''//责任管理部门名称
				}, //项目信息
				options: [{
					value: '1',
					label: '区级重点'
				}, {
					value: '2',
					label: '片区重点'
				}], //级别
				options1: [], //单位
				options2: [{
					value: '1',
					label: '交通'
				}, {
					value: '2',
					label: '生态保护'
				}, {
					value: '3',
					label: '农林水利'
				}, {
					value: '4',
					label: '产业发展'
				}, {
					value: '5',
					label: '城乡建设'
				}, {
					value: '6',
					label: '社会事业'
				}], //行业
				logs: false, //日志
				getRowKeys(row) {
					return row.Project_Info.ID;
				},
				expands: [],
				pagesizs: 10, //每页显示多少条
				total: 1, //总条数
				pages: 1, //页码
				ups: false, //后续弹框
				follow: {
					money1: '', //金额
					Speed1: '', //进度
					money2: '', //金额
					Speed2: '', //进度
					money3: '', //金额
					Speed4: '', //进度
					money4: '', //金额
					Speed4: '', //进度
					nextPlan: '', //下一周工作计划
				}, //后续计划
				optionsdata: [{
					value: 1,
					label: '第一季度'
				}, {
					value: 2,
					label: '第二季度'
				}, {
					value: 3,
					label: '第三季度'
				}, {
					value: 4,
					label: '第四季度'
				}],
				loading: false,
				rows: {},
				jhrow: [],
				id: '',
				pid: '',
				dialogVisibles: false,
				Check: false,
				jihua: [],
				Start: false,
				packing: [],
				newPack: [],
				texts: '',
				listMeggse: [],
				ID: '',
				rowsd:{},
				uId: "00000000-0000-0000-0000-000000000000",
				Messagew:false,
			}
		},
		created() {
			this.Check = sessionStorage.Check === 'false' ? false : true
			this.Start = sessionStorage.Start === 'true' ? true : false
			this.Messagew = sessionStorage.Messagew === 'true' ? true : false
			this.Selector()
			this.dicSelector()
			this.dicSelector1()
			this.getlistq()
			this.getlist(this.pagesizs, this.pages, this.search)
		},
		methods: {
			//配置短信
			setMeggse(id) {
				this.ID = id
				this.listMeggse = []
				this.loading = true
				this.$get(Api.getlistqMsggse + '/' + id).then(res => {
					console.log(res)
					if(res.data.state == 200) {
						this.listMeggse = res.data.data
						this.meggse = true
						this.loading = false
					} else {
						this.meggse = false
						this.loading = false
						this.$message.error(res.data.errmsg);
					}
				})

			},
			//确认修改短信
			meggsend() {
				if(this.listMeggse.length == 0) {
					this.meggse = false
					return false;
				} else {
					var list = []
					for(var i = 0; i < this.listMeggse.length; i++) {
						list.push({
							"ID": this.listMeggse[i].ID,
							"ProjectID": this.ID,
							"IsSend": this.listMeggse[i].IsSend
						})
					}
					this.loading = true
					this.$post(Api.editsmss, {
						"PJontse": list
					}).then(res => {
						console.log(res)
						if(res.state == 200) {
							this.$message({
								message: "修改成功",
								type: "success"
							});
							this.meggse = false
							this.loading = false
						} else {
							this.meggse = false
							this.loading = false
							this.$message.error(res.errmsg);
						}
					})
				}

			},
			qs(tex) {
				this.texts = tex
				this.dialogVisibles = true
			},
			//节点获取
			getlistq() {
				this.$get(Api.getlistq).then(res => {
					if(res.data.state == 200) {
						for(var i = 0; i < res.data.data.length; i++) {
							this.newPack.push({
								"Schedule": res.data.data[i].Schedule,
								"ProjectID": "",
								"PointID": res.data.data[i].ID,
								"PointName": res.data.data[i].PointName
							})
						}
						this.packing = res.data.data
						console.log(this.packing)
					} else {
						this.$message.error(res.data.errmsg);
					}
				})
			},
			//
			change(e, val, ValidityState) {
				console.log(e.target)
				console.log(val)
				console.log(ValidityState)
				ValidityState = ''
			},
			change1(val, event, dd) {
				console.log(val)
				console.log(event)
				event = ''
				console.log(dd)
			},
			//保存执行
			bczx(pId, Exec, ExecMem, PointID, Uid) {
				console.log(Exec)
				console.log(ExecMem)
				console.log(Uid == this.uId)
//				if(Exec == null && ExecMem == null) {
//					this.$message({
//						message: '参数不能为空',
//						type: 'warning'
//					});
//					return false
//				}
//				if(Exec == null && ExecMem == '') {
//					this.$message({
//						message: '参数不能为空',
//						type: 'warning'
//					});
//					return false
//				}
//				if(Exec == '' && ExecMem == null) {
//					this.$message({
//						message: '参数不能为空',
//						type: 'warning'
//					});
//					return false
//				}
				if(Exec != null && ExecMem != null && Exec != '' && ExecMem != '') {
					this.$message({
						message: '时间备注不能同时拥有',
						type: 'warning'
					});
					return
				}
				this.loading = true
				if(Uid == this.uId) {
					this.$post(Api.addschqe, {
						"Exec": Exec,
						"ExecMem": ExecMem,
						"ProjectID": pId,
						"PointID": PointID
					}).then(res => {
						if(res.state == 200) {
//							this.expands = []
//							this.qustionList = []
//							this.logList = []
//							this.jhrow = []
//							this.rows = {}
							this.loading = false
//							this.pages = 1
//							this.search == ''
							this.getlist(this.pagesizs, this.pages, this.search)
						} else {
							this.loading = false
							this.$message.error(res.errmsg);
						}
					})
				} else {
					this.$post(Api.editissqb, {
						"ID": Uid,
						"Exec": Exec,
						"ExecMem": ExecMem,
						"ProjectID": pId,
						"PointID": PointID
					}).then(res => {
						if(res.state == 200) {
//							this.expands = []
//							this.qustionList = []
//							this.logList = []
//							this.jhrow = []
//							this.rows = {}
							this.loading = false
							this.getlist(this.pagesizs, this.pages, this.search)
						} else {
							this.loading = false
							this.$message.error(res.errmsg);
						}
					})
				}
			},
			//修改进度计划
			bcjh(pId, Schedule, PointID, id) {
//				if(Exec != null && ExecMem != null && Exec != '' && ExecMem != '') {
//					this.$message({
//						message: '时间备注不能同时拥有',
//						type: 'warning'
//					});
//					return
//				}
				
//				if(Schedule == '' || Schedule == null) {
//					this.$message({
//						message: '参数不能为空',
//						type: 'warning'
//					});
//					return false
//				}
				this.loading = true
				if(id == this.uId) {
					this.$post(Api.editschq, {
						"Schedule": Schedule,
						"ProjectID": pId,
						"PointID": PointID
					}).then(res => {
						if(res.state == 200) {
//							this.expands = []
//							this.qustionList = []
//							this.logList = []
//							this.jhrow = []
//							this.rows = {}
							this.loading = false
							this.getlist(this.pagesizs, this.pages, this.search)
						} else {
							this.loading = false
							this.$message.error(res.errmsg);
						}
					})
				} else {
					this.$post(Api.editissq, {
						"ID": id,
						"Schedule": Schedule,
						"ProjectID": pId,
						"PointID": PointID
					}).then(res => {
						if(res.state == 200) {
//							this.expands = []
//							this.qustionList = []
//							this.logList = []
//							this.jhrow = []
//							this.rows = {}
							this.loading = false
							this.getlist(this.pagesizs, this.pages, this.search)
						} else {
							this.loading = false
							this.$message.error(res.errmsg);
						}
					})
				}

			},
			//修改联系人保存
			bclxr(rows) {
//				console.log(rows)
//				for(let k in rows) {
//					if(rows[k] == ''||rows[k] == null) {
//						this.$message({
//							message: '联系人参数不能为空',
//							type: 'warning'
//						});
//						return
//					}
//				}
				if(rows.SitePrincipalTEL != '' && rows.SitePrincipalTEL != null) {
					if(!this.$isTel(rows.SitePrincipalTEL)) {
						this.$message({
							message: '请输入正确的责任管理部门项目负责人电话',
							type: 'warning'
						});
						return
					}
				}
				if(rows.SiteLinkTEL != '' && rows.SiteLinkTEL != null) {
					if(!this.$isTel(rows.SiteLinkTEL)) {
						this.$message({
							message: '请输入正确的责任管理部门具体负责人电话',
							type: 'warning'
						});
						return
					}
				}
				if(rows.DeptPrincipalTEL != ''&&rows.DeptPrincipalTEL != null) {
					if(!this.$isTel(rows.DeptPrincipalTEL)) {
						this.$message({
							message: '请输入正确的责任管理部门责任领导电话',
							type: 'warning'
						});
						return
					}
				}
				if(rows.HandlerTEL != '' && rows.HandlerTEL != null) {
					if(!this.$isTel(rows.HandlerTEL)) {
						this.$message({
							message: '请输入正确的业主单位项目负责人电话',
							type: 'warning'
						});
						return
					}
				}
				
				if(rows.PrincipalTEL != '' && rows.PrincipalTEL != null ) {
					if(!this.$isTel(rows.PrincipalTEL)) {
						this.$message({
							message: '请输入正确的业主分管领导电话',
							type: 'warning'
						});
						return
					}
				}
				if(rows.LeaderTEL != '' && rows.LeaderTEL != null ) {
					if(!this.$isTel(rows.LeaderTEL)) {
						this.$message({
							message: '请输入正确的业主主要领导电话',
							type: 'warning'
						});
						return
					}
				}
				if(rows.ComLeadTEL != '' && rows.ComLeadTEL != null) {
					if(!this.$isTel(rows.ComLeadTEL)) {
						this.$message({
							message: '请输入正确的集团公司分管领导电话',
							type: 'warning'
						});
						return
					}
				}
				if(rows.ComPrincipalTEL != '' && rows.ComPrincipalTEL != null) {
					if(!this.$isTel(rows.ComPrincipalTEL)) {
						this.$message({
							message: '请输入正确的集团公司主要负责人电话',
							type: 'warning'
						});
						return
					}
				}
				if(rows.OwnerTEL != '' && rows.OwnerTEL != null) {
					if(!this.$isTel(rows.OwnerTEL)) {
						this.$message({
							message: '请输入业主具体责任人电话',
							type: 'warning'
						});
						return
					}
				}
				this.loading = true
				this.$post(Api.conedit, {
					"ID": rows.ID,
					"ProjectID": rows.ProjectID,
					"SitePrincipal": rows.SitePrincipal,
					"SitePrincipalTEL": rows.SitePrincipalTEL,
					"SiteLink": rows.SiteLink,
					"SiteLinkTEL": rows.SiteLinkTEL,
					"Handler": rows.Handler,
					"HandlerTEL": rows.HandlerTEL,
					"Principal": rows.Principal,
					"PrincipalTEL": rows.PrincipalTEL,
					"Leader": rows.Leader,
					"LeaderTEL": rows.LeaderTEL,
					"ComLead": rows.ComLead,
					"ComLeadTEL": rows.ComLeadTEL,
					"ComPrincipal": rows.ComPrincipal,
					"ComPrincipalTEL": rows.ComPrincipalTEL,
					"DeptPrincipal": rows.DeptPrincipal,
					"DeptPrincipalTEL": rows.DeptPrincipalTEL,
					"OwnerPrinci": rows.OwnerPrinci,
					"OwnerTEL": rows.OwnerTEL
				}).then(res => {
					console.log(res)
					if(res.state == 200) {
//						this.expands = []
//						this.qustionList = []
//						this.logList = []
//						this.jhrow = []
//						this.rows = {}
						this.loading = false
						this.getlist(this.pagesizs, this.pages, this.search) 
					} else {
						this.loading = false
						this.$message.error(res.errmsg);
					}
				})
			},
			//获取业主单位
			Selector() {
				this.$get(Api.Selector).then(res => {
					if(res.data.state == 200) {
						this.options1 = res.data.data
					} else {
						this.$message.error(res.data.errmsg);
					}
				})
			},
			//获取项目级别
			dicSelector() {
				this.$get(Api.dicSelector + '/' + 1).then(res => {
					if(res.data.state == 200) {
						this.options = res.data.data
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
						this.options2 = res.data.data
						console.log(this.options2)
					} else {
						this.$message.error(res.data.errmsg);
					}
				})
			},
			//获取项目列表
			getlist(pagesizs, pages, search) {
				this.loading = true
				this.$post(Api.progetlist, {
					"PageSize": pagesizs,
					"PageIndex": pages - 1,
					"KeyWord": search,
					"Query": search,
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
			expand(row) {
				this.rowsd = row
				this.activeName = 'first'
				this.qustionList = row.Project_Issue
				this.jhrow = row.Project_Points
				this.rows = row.Project_Contacts
				console.log(this.rows)
				this.logList = row.Project_Log
				if(row.Project_Info.ID == this.expands[0]) {
					this.expands = []
					this.qustionList = []
					this.logList = []
					this.jhrow = []
					this.rows = {}
					return
				}
				this.expands = [];
				this.qustionList = []
				this.logList = []
				this.rows = {}
				this.jhrow = []
				this.rows = row.Project_Contacts
				this.qustionList = row.Project_Issue
				this.logList = row.Project_Log
				this.jhrow = row.Project_Points
				this.expands.push(row.Project_Info.ID);
			},
			handleClick(tab, event) {
				console.log(tab)
				console.log(event)
			},
			//添加弹框
			adds() {
				this.aitijhL = '1'
				this.aitives = '1'
				this.follow.money1 = ''
				this.follow.money2 = ''
				this.follow.money3 = ''
				this.follow.money4 = ''
				this.follow.Speed1 = ''
				this.follow.Speed2 = ''
				this.follow.Speed3 = ''
				this.follow.Speed4 = ''
				this.follow.nextPlan
				for(var i = 0; i < this.newPack.length; i++) {
					this.newPack[i].Schedule = ''
				}
				//联系人
				for(let k in this.formLabelAlign) {
					this.formLabelAlign[k] = ''
				}
				//计划进度
				for(let k in this.plan) {
					this.plan[k] = ''
				}
				//项目信息
				for(let k in this.project) {
					this.project[k] = ''
				}
				this.add = true
			},
			objectKeyIsEmpty(obj) {
				let empty = null;
				for(const key in obj) {
					if(obj.hasOwnProperty(key)) {
						if(obj[key] === null || obj[key] === '') {
							empty = true;
						} else {
							empty = false;
							break;
						}
					}
				}
				return empty;
			},
			allFalse(obj){
				for(let k in this.project) {
					if(this.project[k] == '' || this.project[k] == "undefined" || this.project[k] == null) {
						this.$message({
							message: '项目信息参数不能为空',
							type: 'warning'
						});
						return false
					}else{
						
					}
				}
			},
			tabs(){
				if(this.aitives==1){
					for(let k in this.project) {
						if(this.project[k] == '' || this.project[k] == "undefined" || this.project[k] == null) {
							this.$message({
								message: '项目信息参数不能为空',
								type: 'warning'
							});
							return false
						}
					}
					this.aitives=((this.aitives-0)+1).toString()
				}else if(this.aitives==2){
					let o = 0
					for(let j = 0; j < this.newPack.length; j++) {
						if(this.newPack[j].Schedule == '' || this.newPack[j].Schedule == "undefined" || this.newPack[j].Schedule == null) {
							o++;
						}
					}
					if(o == this.newPack.length) {
						this.$message({
							message: '进度计划不能为空',
							type: 'warning'
						});
						return
					}
					this.aitives=((this.aitives-0)+1).toString()
				}else if(this.aitives==3){
					if(this.objectKeyIsEmpty(this.formLabelAlign)) {
						this.$message({
							message: '联系人参数不能为空',
							type: 'warning'
						});
						return
					}
					if(this.formLabelAlign.pxLinksTel != '') {
					if(!this.$isTel(this.formLabelAlign.pxLinksTel)) {
						this.$message({
							message: '请输入正确的责任管理部门具体责任人电话',
							type: 'warning'
						});
						return
					}
				}
				if(this.formLabelAlign.fTel != '') {
					if(!this.$isTel(this.formLabelAlign.fTel)) {
						this.$message({
							message: '请输入正确的责任管理部门项目负责人电话',
							type: 'warning'
						});
						return
					}
				}
				if(this.formLabelAlign.bmzeTel != '') {
					if(!this.$isTel(this.formLabelAlign.bmzeTel)) {
						this.$message({
							message: '请输入正确的责任管理部门责任领导电话',
							type: 'warning'
						});
						return
					}
				}
				if(this.formLabelAlign.AgenTel != '') {
					if(!this.$isTel(this.formLabelAlign.AgenTel)) {
						this.$message({
							message: '请输入正确的业主单位项目负责人电话',
							type: 'warning'
						});
						return
					}
				}
				if(this.formLabelAlign.OwnerTEL != '') {
					if(!this.$isTel(this.formLabelAlign.OwnerTEL)) {
						this.$message({
							message: '请输入正确的业主单位具体责任人电话',
							type: 'warning'
						});
						return
					}
				}
				if(this.formLabelAlign.leaderTel != '') {
					if(!this.$isTel(this.formLabelAlign.leaderTel)) {
						this.$message({
							message: '请输入正确的业主分管领导电话',
							type: 'warning'
						});
						return
					}
				}
				if(this.formLabelAlign.fugleTel != '') {
					if(!this.$isTel(this.formLabelAlign.fugleTel)) {
						this.$message({
							message: '请输入正确的业主主要领导电话',
							type: 'warning'
						});
						return
					}
				}
				if(this.formLabelAlign.jtldTel != '') {
					if(!this.$isTel(this.formLabelAlign.jtldTel)) {
						this.$message({
							message: '请输入正确的集团公司分管领导电话',
							type: 'warning'
						});
						return
					}
				}
				if(this.formLabelAlign.jtfzrTel != '') {
					if(!this.$isTel(this.formLabelAlign.jtfzrTel)) {
						this.$message({
							message: '请输入正确的集团公司主要负责人电话',
							type: 'warning'
						});
						return
					}
				}
					this.aitives=((this.aitives-0)+1).toString()
				}
				
//				console.log(this.aitives)
			},
			prve(){
				this.aitives=((this.aitives-0)-1).toString()
			},
			hxNext(){
				this.aitijhL=((this.aitijhL-0)+1).toString()
			},
			hxPrve(){
				this.aitijhL=((this.aitijhL-0)-1).toString()
			},
			//确认新建
			confirm() {
				if(this.objectKeyIsEmpty(this.follow)) {
					this.$message({
						message: '后续计划不能为空',
						type: 'warning'
					});
					return
				}
				
				this.loading = true
				this.$post(Api.proaddnew, {
					"ProjectInfo": {
						"ProjectName": this.project.names, //项目名称
						"OwnerID": this.project.value1, //业主单位
						"LevelID": this.project.value,
						"IndustryID": this.project.value2,
						"InvestMoney": this.project.jhtz,
						"ComemenceDate": this.project.dates,
						"Q1Invest": this.follow.money1,
						"Q2Invest": this.follow.money2,
						"Q3Invest": this.follow.money3,
						"Q4Invest": this.follow.money4,
						"Q1Memo": this.follow.Speed1,
						"Q2Memo": this.follow.Speed2,
						"Q3Memo": this.follow.Speed3,
						"Q4Memo": this.follow.Speed4,
						"NextPlan": this.follow.nextPlan,
						"Department":this.project.zrglbm,
					},
					"PointSchedules": this.newPack,
					"Contacts": {
						"ProjectID": "",
						"SitePrincipal": this.formLabelAlign.preside,
						"SitePrincipalTEL": this.formLabelAlign.fTel,
						"SiteLink": this.formLabelAlign.pxLinks,
						"SiteLinkTEL": this.formLabelAlign.pxLinksTel,
						"Handler": this.formLabelAlign.Agent,
						"HandlerTEL": this.formLabelAlign.AgenTel,
						"Principal": this.formLabelAlign.leader,
						"PrincipalTEL": this.formLabelAlign.leaderTel,
						"Leader": this.formLabelAlign.fugle,
						"LeaderTEL": this.formLabelAlign.fugleTel,
						"ComLead": this.formLabelAlign.jtld,
						"ComLeadTEL": this.formLabelAlign.jtldTel,
						"ComPrincipal": this.formLabelAlign.jtfzr,
						"ComPrincipalTEL": this.formLabelAlign.jtfzrTel,
						"DeptPrincipal": this.formLabelAlign.bmze,
						"DeptPrincipalTEL": this.formLabelAlign.bmzeTel,
						"OwnerPrinci": this.formLabelAlign.OwnerPrinci,
						"OwnerTEL": this.formLabelAlign.OwnerTEL
					}
				}).then(res => {
					if(res.state == 200) {
						this.pages = 1
						this.add = false
						this.loading = false
						this.search == ''
						this.getlist(this.pagesizs, this.pages, this.search)
						this.$message({
							message: "添加成功",
							type: "success"
						});
					} else {
						this.loading = false
						this.add = false
						this.$message.error(res.errmsg);
					}
				})
				this.add = true
			},
			//问题发布弹框
			fnResetPwdTip(id) {
				this.id = id
				this.qustions = ''
				this.qus = true
			},
			//确认问题发布
			reset() {
				if(this.qustions == '') {
					this.$message({
						message: '问题不能为空',
						type: 'warning'
					});
					return
				}
				this.loading = true
				this.$post(Api.addiss, {
					"ProjectID": this.id,
					"IssueContent": this.qustions
				}).then(res => {
					console.log(res)
					if(res.state == 200) {
						this.$message({
							message: "发布成功",
							type: "success"
						});
						this.expands = []
						this.qustionList = []
						this.logList = []
						this.jhrow = []
						this.rows = {}
						this.pages = 1

						this.loading = false
						this.search == ''
						this.getlist(this.pagesizs, this.pages, this.search)
					} else {
						this.loading = false
						this.add = false
						this.$message.error(res.errmsg);
					}
				})
				this.qus = false
			},
			//修改问题弹框
			logEdits(id, pid, cont) {
				this.id = id
				this.pid = pid
				this.qustions = cont
				this.logs = true
			},
			//确认修改问题
			edit() {
				if(this.qustions == '') {
					this.$message({
						message: '问题不能为空',
						type: 'warning'
					});
					return
				}
				this.loading = true
				this.$post(Api.editiss, {
					"ID": this.id,
					"ProjectID": this.pid,
					"IssueContent": this.qustions
				}).then(res => {
					console.log(res)
					if(res.state == 200) {
						this.$message({
							message: "修改成功",
							type: "success"
						});
//						this.expands = []
//						this.qustionList = []
//						this.logList = []
//						this.jhrow = []
//						this.rows = {}
						this.loading = false
						this.getlist(this.pagesizs, this.pages, this.search)
					} else {
						this.loading = false
						this.add = false
						this.$message.error(res.errmsg);
					}
				})
				this.logs = false
			},
      //取消开工
      stopwork(id){
			  console.log("id",id)
			  this.$get(Api.openproj + '/' + id).then(res => {
			    if (res.data.state == 200){
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.getlist(this.pagesizs, this.pages, this.search)
          } else {
            this.$message.error(res.errmsg);
          }
        })
      },
			//状态
			stateset(id, type) {
				this.$get(Api.stateset + '/' + type + '/' + id).then(res => {
					console.log(res)
					console.log(1)
					if(res.data.state == 200) {
						this.expands = []
						this.qustionList = []
						this.logList = []
						this.jhrow = []
						this.rows = {}
						this.pages = 1
						this.loading = false
						this.search == ''
						this.getlist(this.pagesizs, this.pages, this.search)
					} else {
						this.loading = false
						this.$message.error(res.data.errmsg);
					}
				})
			},
			//删除问题
			delquick(id) {
				this.$confirm("将永久删除, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(Api.deliss + "/" + id)
							.then(response => {
								console.log(response)
								if(response.data.state == 200) {
//									this.expands = []
//									this.qustionList = []
//									this.logList = []
//									this.jhrow = []
//									this.rows = {}
//									this.pages = 1
									this.loading = false
//									this.search == ''
									this.getlist(this.pagesizs, this.pages, this.search)
									this.$message({
										message: "删除成功",
										type: "success"
									});
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
			//后续计划弹框
			followUp(id, q1, q2, q3, q4, m1, m2, m3, m4, nextPlan) {
				this.id = id
				this.follow.money1 = q1 //金额
				this.follow.Speed1 = m1 //进度
				this.follow.money2 = q2 //金额
				this.follow.Speed2 = m2 //进度
				this.follow.money3 = q3 //金额
				this.follow.Speed3 = m3 //进度
				this.follow.money4 = q4 //金额
				this.follow.Speed4 = m4 //进度
				this.follow.nextPlan = nextPlan
				this.ups = true
			},
			
			//确认后续计划
			DetePlan() {
//				if(this.objectKeyIsEmpty(this.follow)) {
//					this.$message({
//						message: '后续计划不能为空',
//						type: 'warning'
//					});
//					return
//				}
				this.loading = true
				this.$post(Api.editafter, {
					"ID": this.id,
					"Q1Invest": this.follow.money1,
					"Q2Invest": this.follow.money2,
					"Q3Invest": this.follow.money3,
					"Q4Invest": this.follow.money4,
					"Q1Memo": this.follow.Speed1,
					"Q2Memo": this.follow.Speed2,
					"Q3Memo": this.follow.Speed3,
					"Q4Memo": this.follow.Speed4,
					"NextPlan": this.follow.nextPlan
				}).then(res => {
					console.log(res)
					if(res.state == 200) {
						this.$message({
							message: "修改成功",
							type: "success"
						});
						this.loading = false
						this.getlist(this.pagesizs, this.pages, this.search)
					} else {
						this.loading = false
						this.$message.error(res.errmsg);
					}
				})
				this.ups = false
			},
			//改变显示条数
			handleSizeChange(val) {
				this.pagesizs = val
				this.getlist(this.pagesizs, this.pages, this.search)
			},
			//翻页
			handleCurrentChange(val) {
				this.pages = val
				this.getlist(this.pagesizs, this.pages, this.search)
			},
			filter() {
				this.pages = 1
				this.getlist(this.pagesizs, this.pages, this.search)
			},
			xiugai(row) {
				this.project.names = row.ProjectName
				this.project.value1 = row.OwnerID
				this.project.value = row.LevelID
				this.project.value2 = row.IndustryID
				this.project.jhtz = row.InvestMoney
				this.project.zrglbm = row.Department
				this.project.dates = row.ComemenceDate
				this.id = row.ID
				this.xm = true
			},
			//确认修改
			qrxg() {
//				if(this.project.names == '') {
//					this.$message({
//						message: '项目不能为空',
//						type: 'warning'
//					});
//					return
//				}
				if(this.project.names == '') {
					this.$message({
						message: '项目不能为空',
						type: 'warning'
					});
					return
				}
//				if(this.project.zrglbm == '') {
//					this.$message({
//						message: '责任管理部门名称',
//						type: 'warning'
//					});
//					return
//				}
				if(this.project.jhtz == '') {
					this.$message({
						message: '金额不能为空',
						type: 'warning'
					});
					return
				}
				if(this.project.dates == '') {
					this.$message({
						message: '时间不能为空',
						type: 'warning'
					});
					return
				}
				this.loading = true
				this.$post(Api.editprojs, {
					"ID": this.id,
					"ProjectName": this.project.names,
					"OwnerID": this.project.value1,
					"LevelID": this.project.value,
					"IndustryID": this.project.value2,
					"InvestMoney": this.project.jhtz,
					"ComemenceDate": this.project.dates,
					"Department": this.project.zrglbm
				}).then(res => {
					console.log(res)
					if(res.state == 200) {
						this.xm = false
						this.loading = false
						this.getlist(this.pagesizs, this.pages, this.search)
					} else {
						this.loading = false
						this.xm = false
						this.$message.error(res.errmsg);
					}
				})
			},
			//删除
			dels(id) {
				this.$confirm("将永久删除, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.loading = true;
						this.$get(Api.deletepro + "/" + id)
							.then(response => {
								console.log(response)
								if(response.data.state == 200) {
									this.loading = false
									this.getlist(this.pagesizs, this.pages, this.search)
									this.$message({
										message: "删除成功",
										type: "success"
									});
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
			}
		}
	}
</script>

<style scoped="">
	.demo-table-expand {
		font-size: 0;
	}
	
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>
