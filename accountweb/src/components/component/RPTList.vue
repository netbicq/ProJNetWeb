<template>
  <div class="content-wrapper"  v-loading="loading">
      <div class="title clearfix">
          自定义报表
          
      </div>
      <div class="content">
        <div class="panel">
            <div class="panel-heading"></div>
            <div class="panel">
                <div class="panel-heading clearfix">
                    <button class="btn fl Green mini" @click="fnReportAddTip">新建</button>
                    <div class="search clearfix fr">
                        <el-input v-model="search" placeholder="请输入报表名称"></el-input>
                        <button class="btn Info mini" @click="fnSearch">查询</button>
                        <!-- <button class="btn Primary mini" @click="fnExport">导出Execl</button> -->
                    </div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-body">
                    <el-table :data="tableData" style="width: 100%" align="center" @row-click="handdle">
                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="ReportInfo.ReportName" label="报表名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ReportInfo.DataSource" label="数据源" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ScopTypeStr" label="作用域类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="StateStr" label="状态">
                        </el-table-column>
                        <el-table-column prop="ReportInfo.CreateMan" label="创建人" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ReportInfo.CreateDate" label="创建时间" :formatter="formatter" sortable show-overflow-tooltip>
                        </el-table-column>
                        
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-dropdown size="small"  trigger="click" type="primary">
                                <el-button type="primary" size="small" class="Info">
                                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <el-button size="mini" type="success" @click="fnReportEditTip(scope.row.ReportInfo.ID,scope.row.ReportInfo.ReportName,scope.row.ReportInfo.DataSource,scope.row.ReportInfo.ScopeType)">修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
                                        </el-dropdown-item>
                                        <!--<el-dropdown-item v-if='scope.row.ReportInfo.State==2'>                          
                                            <el-button size="mini" class="Purple" @click="stateset(2,scope.row.ReportInfo.ID)">正&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;常</el-button>
                                        </el-dropdown-item>
                                        <el-dropdown-item v-else>
                                            <el-button size="mini" type="warning" @click="stateset(1,scope.row.ReportInfo.ID)">停&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用</el-button>
                                        </el-dropdown-item>-->
                                        <el-dropdown-item>
                                            <el-button size="mini" type="danger" @click="fnDelReport(scope.row.ReportInfo.ID)">删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</el-button>
                                        </el-dropdown-item>
                                        <!--<el-dropdown-item>
                                            <el-button size="mini"  class="Primary" @click="fnSee(scope.row.ReportInfo.ID)">查&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;看</el-button>
                                        </el-dropdown-item>-->
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pages">
                      <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pages"
                    :page-sizes="[10, 20, 30, 40, 50, 100]"
                    :page-size="10"
                    layout="sizes, prev, pager, next"
                    :total="total" background>
                  </el-pagination>
                        <!-- <el-pagination small :current-page="pages"  @current-change="handleCurrentChange"  layout="prev, pager, next" :total="total" background>
                        </el-pagination> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="tab">
            <el-tabs type="border-card">
                <el-tab-pane label="报表参数">
                    <div class="panel" style="margin:0 0 20px 0;">
                        <div class="panel-heading clearfix">
                            <button class="btn fl Green mini" @click="fnParaAddTip">新建</button>
                            <!-- <div class="search clearfix fr">
                                <el-input v-model="search2" placeholder="请输入关键字"></el-input>
                                <button class="btn Info mini">查询</button>
                            </div> -->
                        </div>
                    </div>
                    <el-table :data="tabData1" stripe style="width: 100%" align="center">
                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="ParameterInfo.ParameterName" label="参数名" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ParameterTypeStr" label="参数类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ParameterInfo.ParameterCaption" label="参数标题" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ParameterInfo.TypeListSource" label="选择器源" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ParameterInfo.TypeListValueType" label="选择器值类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="TypeListValueTypeStr" label="选择器值名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" @click="fnParaEditTip(scope.row.ParameterInfo.ID,scope.row.ParameterInfo.ParameterName,scope.row.ParameterInfo.ParameterType,scope.row.ParameterInfo.ParameterCaption,scope.row.ParameterInfo.TypeListSource,scope.row.ParameterInfo.TypeListValueType)">修改</el-button>
                                <el-button size="mini" type="danger" @click="fnDelPara(scope.row.ParameterInfo.ID)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="报表列">
                    <div class="panel" style="margin:0 0 20px 0;">
                        <div class="panel-heading clearfix">
                            <button class="btn fl Green mini" @click="fnColumnAddTip">新建</button>
                            <!-- <div class="search clearfix fr">
                                <el-input v-model="search" placeholder="请输入关键字"></el-input>
                                <button class="btn Info mini">查询</button>
                            </div> -->
                        </div>
                    </div>
                    <el-table :data="tabData2" stripe style="width: 100%" align="center">
                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="ColumnInfo.ColumnName" label="列名" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ColumnInfo.ColumnCaption" label="列标题" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="DataTypeStr" label="数据类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ColumnInfo.OrderIndex" label="列顺序" sortable show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column  label="是否显示" show-overflow-tooltip>
                            <template slot-scope="scope">
                              <span>{{scope.row.ColumnInfo.Visiable?'是':'否'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" @click="fnColumnEditTip(scope.row.ColumnInfo.ID,scope.row.ColumnInfo.ColumnName,scope.row.ColumnInfo.ColumnCaption,scope.row.ColumnInfo.DataType,scope.row.ColumnInfo.OrderIndex,scope.row.ColumnInfo.Visiable)">修改</el-button>
                                <el-button size="mini" type="danger" @click="fnDelColumn(scope.row.ColumnInfo.ID)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="作用域">
                    <div class="panel" style="margin:0 0 20px 0;">
                        <div class="panel-heading clearfix">
                            <div class="search clearfix fl">
                                <label for="">选择账套：</label>
                                <el-select v-model="ScopeValue" filterable placeholder="请选择账套">
                                    <el-option
                                    v-for="item in AccountOptions"
                                    :key="item.AccountCode"
                                    :label="item.AccountName"
                                    :value="item.AccountCode">
                                    </el-option>
                                </el-select>
                                <button class="btn Green mini" @click="setReportScope()">加入</button>
                            </div>
                        </div>
                    </div>
                    <el-table :data="tabData3" stripe style="width: 100%" align="center">
                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="AccountInfo.AccountCode" label="账套编号" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="AccountInfo.AccountName" label="账套名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="AccountInfo.Principal" label="负责人" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="有效期" :formatter="formatter1" show-overflow-tooltip>
												    <template slot-scope="scope">
												    	{{scope.row.AccountInfo?$toMoment(scope.row.AccountInfo.ValidDate):''}}
												    </template>                       
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="fnDelScope(scope.row.ID)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
          </div>
        <el-dialog
            title="报表管理"
            :visible.sync="ReportTip"
            width="500px">
            <div class="tip ">
                <el-form :label-position="labelPosition" label-width="100px" :model="ReportUser">
                    <el-form-item label="报表名称：">
                        <el-input  placeholder="请输入报表名称" v-model="ReportUser.ReportName"></el-input>
                    </el-form-item>
                    <el-form-item label="数据源：">
                        <el-input  placeholder="请输入数据源" v-model="ReportUser.DataSource"></el-input>
                    </el-form-item>
                    <el-form-item label="作用域：">
                        <el-select v-model="ReportUser.ScopeValue" placeholder="请选择作用域">
                            <el-option
                            v-for="item in fieldOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="选择账套：" v-show="ReportUser.ScopeValue==2">
                        <el-select v-model="ReportUser.AccountValue" placeholder="请选择账套">
                            <el-option
                            v-for="item in AccountOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ReportTip = false" size="small">取 消</el-button>
                <el-button type="primary" @click="confirmReportAdd" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="报表参数管理"
            :visible.sync="ParaTip"
            width="500px">
            <div class="tip ">
                <el-form :label-position="labelPosition" label-width="110px" :model="ParaUser">
                    <el-form-item label="参数名：">
                        <el-input  placeholder="请输入参数名" v-model="ParaUser.ParaName"></el-input>
                    </el-form-item>
                    <el-form-item label="参数类型：">
                        <el-select v-model="ParaUser.ParaType" placeholder="请选择参数类型">
                            <el-option
                            v-for="item in parameter"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="参数标题：">
                        <el-input  placeholder="请输入参数标题" v-model="ParaUser.ParaTitle"></el-input>
                    </el-form-item>
                     <el-form-item label="选择器源：" v-show="ParaUser.ParaType==6">
                        <el-input  placeholder="请输入选择器源" v-model="ParaUser.Source"></el-input>
                    </el-form-item>
                    <el-form-item label="选择器值类型：" v-show="ParaUser.ParaType==6">
                        <el-select v-model="ParaUser.CalssValue" placeholder="请选择选择器值类型">
                            <el-option
                            v-for="item in ClassType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ParaTip = false" size="small">取 消</el-button>
                <el-button type="primary" @click="confirmParaAdd" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="报表列管理"
            :visible.sync="ColumnTip"
            width="500px">
            <div class="tip ">
                <el-form :label-position="labelPosition" label-width="110px" :model="ColumnUser">
                    <el-form-item label="列名：">
                        <el-input  placeholder="请输入列名" v-model="ColumnUser.ColumnName"></el-input>
                    </el-form-item>
                    <el-form-item label="列标题：">
                        <el-input  placeholder="请输入列标题" v-model="ColumnUser.ColumnTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="数据类型:">
                        <el-select v-model="ColumnUser.ColumnDataType" placeholder="请选择数据类型">
                            <el-option
                            v-for="item in ColDTOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="列顺序:">
                        <el-input  placeholder="请输入列顺序" v-model="ColumnUser.ColumnOrder"></el-input>
                    </el-form-item>
                    <el-form-item label="是否可见：">
                            <el-checkbox v-model="ColumnUser.Visiable"></el-checkbox>
                        </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ColumnTip = false" size="small">取 消</el-button>
                <el-button type="primary" @click="confirmColumnAdd" size="small">确 定</el-button>
            </span>
        </el-dialog>
      </div>
  </div>
</template>
<script>
import Api from "../../axios/api";
export default {
  name: "RPTList",
  data() {
    return {
      loading: false,
      labelPosition: "right",
      pages: 1, //翻页
      total: 1, //条数
      PageSize: 10,
      state: 1,
      ReporState: "add", //判断是修改报表还是新建报表
      ParaState: "add", //判断是修改参数还想新建参数
      ColumnState: "add", //判断时修改列还是新建列
      search: "",
      ReportTip: false, //报表新建弹窗
      ParaTip: false, //报表参数新建弹窗
      ColumnTip: false, //报表列新建弹窗
      ReportUser: {
        ID: "",
        ReportName: "",
        DataSource: "",
        ScopeValue: "",
        AccountValue: ""
      }, //报表新建参数集合
      ParaUser: {
        ID: "",
        ParaName: "",
        ParaType: "",
        ParaTitle: "",
        Source: "",
        CalssValue: ""
      }, //报表参数新建参数集合
      ColumnUser: {
        ColumnName: "",
        ColumnTitle: "",
        ColumnDataType: "",
        ColumnOrder: "",
        ID: "",
        Visiable: false
      }, //报表列新建参数集合
      ScopeValue: "",
      tableData: [], //报表数据
      tabData1: [], //报表参数数据
      tabData2: [], //报表列数据
      tabData3: [], //作用域列表
      AccountOptions: [], //账套集合
      fieldOptions: [
        {
          value: 1,
          label: "所有账套"
        },
        {
          value: 2,
          label: "指定账套"
        }
      ], //作用域
      parameter: [
        {
          value: 1,
          label: "字符"
        },
        {
          value: 2,
          label: "整数"
        },
        {
          value: 3,
          label: "数字"
        },
        {
          value: 4,
          label: "日期"
        },
        {
          value: 5,
          label: "布尔"
        },
        {
          value: 6,
          label: "选择器"
        }
      ], //参数类型
      ColDTOptions: [
        {
          value: 1,
          label: "字符"
        },
        {
          value: 2,
          label: "整数"
        },
        {
          value: 3,
          label: "数字"
        },
        {
          value: 4,
          label: "日期"
        },
        {
          value: 5,
          label: "布尔"
        }
      ], //数据类型
      ClassType: [
        {
          value: 1,
          label: "字符"
        },
        {
          value: 2,
          label: "数字"
        },
        {
          value: 3,
          label: "ID"
        }
      ] //选择器值类型
    };
  },
  mounted() {
    this.getAccount();
    this.getReportData(this.pages, this.search);
  },
  methods: {
    //格式化时间
    formatter(row, column) {
      return this.$toMoment(row.ReportInfo.CreateDate);
    },
    //格式化时间
    formatter1(row, column) {
      return this.$toMoment(row.AccountInfo.ValidDate);
    },
    //导出Execl
    fnExport() {
      this.loading = true;
      this.$post(Api.getreorts, {
          PageSize: this.PageSize,
          PageIndex: this.pages - 1,
          KeyWord: this.search,
          Query: "",
          OrderString: "",
          ToExcel: true
        })
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            if (res.data.data.ExcelResult != "") {
              this.$message.error(res.data.data.ExcelResult);
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    handleSizeChange(val) {
      this.PageSize = val;
      this.getReportData(this.pages, this.search);
    },
    //查询
    fnSearch() {
      this.pages = 1;
      this.getReportData(this.pages, this.search);
    },
    //分页
    handleCurrentChange(val) {
      this.pages = val;
      this.getReportData(this.pages, this.search);
    },
    //获取报表数据
    getReportData(page, val) {
      this.loading = true;
      this.$post(Api.getreorts, {
          PageSize: this.PageSize,
          PageIndex: page - 1,
          KeyWord: val,
          Query: "",
          OrderString: "",
          ToExcel: false
        })
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            this.tableData = res.data.data.Data;
            this.total = res.data.data.Items ? res.data.data.Items : 1;
            this.ReportUser.ID = res.data.data.Data[0].ReportInfo.ID;

            this.getParaDate(this.ReportUser.ID);
            this.getColumnDate(this.ReportUser.ID);
            this.fnRepSel(this.ReportUser.ID);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //报表新建弹窗
    fnReportAddTip() {
      this.ReportTip = true;
      this.ReporState = "add";
      this.ReportUser.ReportName = "";
      this.ReportUser.DataSource = "";
      this.ReportUser.ScopeValue = 1;
      //   this.ReportUser.AccountValue = "";
    },
    //修改报表弹窗
    fnReportEditTip(id, name, source, scope) {
      this.ReportTip = true;
      this.ReporState = "edit";
      this.ReportUser.ID = id;
      this.ReportUser.ReportName = name;
      this.ReportUser.DataSource = source;
      this.ReportUser.ScopeValue = scope;
    },
    //报表确认新建或修改
    confirmReportAdd() {
      if (
        this.ReportUser.ReportName == "" ||
        this.ReportUser.DataSource == ""
      ) {
        this.$message({
          message: "参数不能为空",
          type: "warning"
        });
        return false;
      }
      this.ReportTip = false;
      if (this.ReporState == "add") {
        this.$post(Api.reportnew, {
            ReportName: this.ReportUser.ReportName,
            DataSource: this.ReportUser.DataSource,
            ScopeType: this.ReportUser.ScopeValue
          })
          .then(res => {
            this.loading = false;
            if (res.data.state == 200) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.getReportData(this.pages, this.search);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            this.loading = false;
            this.$message.error(error);
          });
      } else {
        this.$post(Api.editreport, {
            ID: this.ReportUser.ID,
            ReportName: this.ReportUser.ReportName,
            DataSource: this.ReportUser.DataSource,
            ScopeType: this.ReportUser.ScopeValue
          })
          .then(res => {
            this.loading = false;
            if (res.data.state == 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.getReportData(this.pages, this.search);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            this.loading = false;
            this.$message.error(error);
          });
      }
    },
    //删除指定ID的报表
    fnDelReport(id) {
      this.$confirm("将执行删除操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(Api.delrpt + "/" + id)
            .then(res => {
              this.loading = false;
              if (res.data.state == 200) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getReportData(this.pages, this.search);
              } else {
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
    //点击行获取id
    handdle(row) {
      this.ReportUser.ID = row.ReportInfo.ID;
      this.getParaDate(this.ReportUser.ID);
      this.getColumnDate(this.ReportUser.ID);
      this.fnRepSel(this.ReportUser.ID);
    },
    //查看
    fnSee(id) {
      this.ReportUser.ID = id;
      this.getParaDate(id);
      this.getColumnDate(id);
      this.fnRepSel(id);
    },
    //获取报表参数列表
    getParaDate(id) {
      this.loading = true;
      this.$get(Api.getparas + "/" + id)
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            this.tabData1 = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //报表参数新建弹窗
    fnParaAddTip() {
      this.ParaTip = true;
      this.ParaState = "add";
      this.ParaUser.ParaName = "";
      this.ParaUser.ParaType = "";
      this.ParaUser.ParaTitle = "";
      this.ParaUser.Source = "";
      this.ParaUser.CalssValue = "";
    },
    //报表参数修改弹窗
    fnParaEditTip(id, name, type, title, source, valuetype) {
      this.ParaTip = true;
      this.ParaState = "edit";
      this.ParaUser.ID = id;
      this.ParaUser.ParaName = name;
      this.ParaUser.ParaType = type;
      this.ParaUser.ParaTitle = title;
      this.ParaUser.Source = source;
      this.ParaUser.CalssValue = valuetype;
    },
    //确认新建报表参数
    confirmParaAdd() {
      if(this.ParaUser.ParaName==''||this.ParaUser.ParaTitle==''||this.ParaUser.ParaType==''){
        this.$message({
          message: "参数不能为空",
          type: "warning"
        });
        return false;
      }
      
      if (this.ParaUser.ParaType != 6) {
        this.ParaUser.Source = "";
      }
      this.ParaTip = false;
      if (this.ParaState == "add") {
        this.$post(Api.paranew, {
            ReportID: this.ReportUser.ID,
            ParameterName: this.ParaUser.ParaName,
            ParameterCaption: this.ParaUser.ParaTitle,
            ParameterType: this.ParaUser.ParaType,
            TypeListTypeSource: this.ParaUser.Source,
            TypeListValueType: this.ParaUser.CalssValue
          })
          .then(res => {
            this.loading = false;
            if (res.data.state == 200) {
              this.$message({
                message: "新建成功",
                type: "success"
              });
              this.getParaDate(this.ReportUser.ID);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            this.loading = false;
            this.$message.error(error);
          });
      } else {
        this.$post(Api.editpara, {
            ID: this.ParaUser.ID,
            ReportID: this.ReportUser.ID,
            ParameterName: this.ParaUser.ParaName,
            ParameterCaption: this.ParaUser.ParaTitle,
            ParameterType: this.ParaUser.ParaType,
            TypeListTypeSource: this.ParaUser.Source,
            TypeListValueType: this.ParaUser.CalssValue
          })
          .then(res => {
            this.loading = false;
            if (res.data.state == 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.getParaDate(this.ReportUser.ID);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            this.loading = false;
            this.$message.error(error);
          });
      }
    },
    //删除指定ID报表参数
    fnDelPara(id) {
      this.$confirm("将执行删除操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(Api.delpara + "/" + id)
            .then(res => {
              this.loading = false;
              if (res.data.state == 200) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getParaDate(this.ReportUser.ID);
              } else {
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
    //获取报表列列表
    getColumnDate(id) {
      this.loading = true;
      this.$get(Api.getcols + "/" + id)
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            this.tabData2 = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //报表列新建弹窗
    fnColumnAddTip() {
      this.ColumnTip = true;
      this.ColumnState = "add";
      this.ColumnUser.ID = "";
      this.ColumnUser.ColumnName = "";
      this.ColumnUser.ColumnTitle = "";
      this.ColumnUser.ColumnDataType = "";
      this.ColumnUser.ColumnOrder = "";
      this.ColumnUser.Visiable = false;
    },
    //修改报表列弹窗
    fnColumnEditTip(id, name, title, type, order, vis) {
      this.ColumnTip = true;
      this.ColumnState = "edit";
      this.ColumnUser.ID = id;
      this.ColumnUser.ColumnName = name;
      this.ColumnUser.ColumnTitle = title;
      this.ColumnUser.ColumnDataType = type;
      this.ColumnUser.ColumnOrder = order;
      this.ColumnUser.Visiable = vis;
    },
    //确认新建修改报表列
    confirmColumnAdd() {
      switch(this.$isNull(this.ColumnUser)){
        case 'ColumnName':
          this.$message.error('列名不能为空');
          return;
        case 'ColumnTitle':
          this.$message.error('列标题不能为空');
          return;
        case 'ColumnDataType':
          this.$message.error('数据类型不能为空');
          return;
        case 'ColumnOrder':
          this.$message.error('列顺序不能为空');
          return;
        default:
          // console.log(this.$isNull(this.ColumnUser))
      }

      this.ColumnTip = false;
      if (this.ColumnState == "add") {
        this.$post(Api.colnew, {
            ReportID: this.ReportUser.ID,
            ColumnName: this.ColumnUser.ColumnName,
            ColumnCaption: this.ColumnUser.ColumnTitle,
            DataType: this.ColumnUser.ColumnDataType,
            Visiable: this.ColumnUser.Visiable,
            OrderIndex: this.ColumnUser.ColumnOrder
          })
          .then(res => {
            this.loading = false;
            if (res.data.state == 200) {
              this.$message({
                message: "新建成功",
                type: "success"
              });
              this.getColumnDate(this.ReportUser.ID);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            this.loading = false;
            this.$message.error(error);
          });
      } else {
        this.$post(Api.editcol, {
            ID: this.ColumnUser.ID,
            ColumnName: this.ColumnUser.ColumnName,
            ColumnCaption: this.ColumnUser.ColumnTitle,
            DataType: this.ColumnUser.ColumnDataType,
            Visiable: this.ColumnUser.Visiable,
            OrderIndex: this.ColumnUser.ColumnOrder
          })
          .then(res => {
            this.loading = false;
            if (res.data.state == 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.getColumnDate(this.ReportUser.ID);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            this.loading = false;
            this.$message.error(error);
          });
      }
    },
    //删除指定ID报表列
    fnDelColumn(id) {
      this.$confirm("将执行删除操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(Api.delcol + "/" + id)
            .then(res => {
              this.loading = false;
              if (res.data.state == 200) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getColumnDate(this.ReportUser.ID);
              } else {
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
    //获取账套列表
    getAccount() {
      this.$get(Api.getselector)
        .then(res => {
          if (res.data.state == 200) {
            this.AccountOptions = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //设置报表作用域
    setReportScope() {
      if(this.ScopeValue==''){
        this.$message.error('请选择账套');
        return false;
      }
      this.loading = true;
      this.$post(Api.setscope, {
          ReportID: this.ReportUser.ID,
          AccountCodes: this.ScopeValue
        })
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            this.$message({
              message: "账套加入成功",
              type: "success"
            });
            this.fnRepSel(this.ReportUser.ID);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //删除指定报表作用域
    fnDelScope(id) {
      this.$confirm("将执行删除操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(Api.delscope + "/" + id)
            .then(res => {
              this.loading = false;
              if (res.data.state == 200) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.fnRepSel(this.ReportUser.ID);
              } else {
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
    fnRepSel(id) {
      this.$get(Api.getscopelist+'/'+id)
        .then(res => {
          if (res.data.state == 200) {
            this.tabData3 = res.data.data;
            console.log(this.tabData3)
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
  }
};
</script>
<style scoped>
</style>
