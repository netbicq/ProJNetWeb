<template>
  <div class="content-wrapper" v-loading='loading'>
      <div class="title clearfix">
          报表子表
      </div>
      <div class="content">
          <div class="panel">
            <div class="panel-heading clearfix">
            </div>
            <div class="panel">
                <div class="panel-heading clearfix">
                    <button class="btn fl Green mini" @click="fnAdd1">新建</button>
                    <div class="search  fl" style="margin-left:20px;">
                        <label for="">选择报表：</label>
                        <el-select v-model="ReportValue" placeholder="请选择" @change='changes()'>
                            <el-option
                            v-for="item in ReportOptions"
                            :key="item.ReportInfo.ID"
                            :label="item.ReportInfo.ReportName"
                            :value="item.ReportInfo.ID">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="search clearfix fr">
                        <!-- <el-input v-model="search" placeholder="请输入关键字"></el-input> -->
                        <!-- <button class="btn Info mini" @click='fnSearch()'>查询</button> -->
                        <!-- <button class="btn Primary mini">导出Execl</button> -->
                    </div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-body">
                    <el-table :data="tableData1" @row-click="handdle" stripe style="width: 100%" align="center">
                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="ChildeTableInfo.ChildeCaption"  label="子表标题"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ChildeTableInfo.MasterKeyColumn" label="主表主键列"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ChildeTableInfo.ChildeKeyColumn" label="子表主键列"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ChildeTableInfo.ChildeIndex" label="子表顺序" sortable  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-dropdown size="small"  trigger="click" type="primary">
                                <el-button type="primary" size="small" class="Info">
                                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                        <el-button size="mini" type="success" @click="fnEdit(scope.row.ChildeTableInfo.ID, scope.row.ChildeTableInfo.ChildeCaption, scope.row.ChildeTableInfo.MasterKeyColumn, scope.row.ChildeTableInfo.ChildeKeyColumn, scope.row.ChildeTableInfo.ChildeIndex)">修改</el-button>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                        <el-button size="mini" type="danger" @click="fnDel(scope.row.ChildeTableInfo.ID)">删除</el-button>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pages"> 
                        <!-- <el-pagination small :current-page="pages"  @current-change="handleCurrentChange"  layout="prev, pager, next" :total="total" background>
                        </el-pagination> -->
                    </div>
                </div>
            </div>
          </div>
        <div class="tab">
            <el-tabs type="border-card">
                <el-tab-pane label="列">
                    <div class="row w50 fl">
                        <label for="">列名：</label>
                        <input type="text" v-model="Column.Name" placeholder="请输入列名">
                    </div>
                    <div class="row w50 fr">
                        <label for="">列标题：</label>
                        <input type="text"  v-model="Column.Title" placeholder="请输入列标题">
                    </div>
                    <div class="row w50 fl">
                        <label for="">数据类型：</label>
                        <el-select v-model="Column.TypeValue" placeholder="请选择数据类型">
                            <el-option
                                v-for="item in dataType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="row w50 fr">
                        <label for="">列顺序：</label>
                        <input type="text" v-model="Column.Order" placeholder="请输入列顺序">
                    </div>
                    <div class="row w50 fl">
	                    		<label for="">是否可见：</label><el-checkbox style='text-align: left;' v-model="Column.Visiable"></el-checkbox>
	                	</div>
                    <div class="row w50 fr">
                        <el-button type="" class="Info fr" size="mini" style="margin-right:20px;" @click='adds()'>添加</el-button>
                    </div>
                    <el-table :data="tableData2" stripe style="width: 100%" align="center">
                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="ChildeColumnInfo.ColumnName"  label="列名"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ChildeColumnInfo.ColumnCaption"  label="列标题"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ChildeColumnInfo.DataType"  label="数据类型"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ChildeColumnInfo.OrderIndex"  label="列顺序" sortable  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="是否显示" show-overflow-tooltip>
                            <template slot-scope="scope">
                              <span>{{scope.row.ChildeColumnInfo.Visiable?'是':'否'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click='dels(scope.row.ChildeColumnInfo.ID)'>删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                
            </el-tabs>
          </div>
          <el-dialog
            title="子表管理"
            :visible.sync="addTip1"
            width="550px">
            <div class="tip ">
                <div class="row clearfix">
                    <label for="" class="fl">子表标题：</label>
                    <input type="text" v-model="SubTable.ChildeCaption" placeholder="请输入子表标题" class="fl">
                </div>
                <div class="row clearfix">
                    <label for="" class="fl">主表主键列：</label>
                    <input type="text" v-model="SubTable.MasterKeyColumn" placeholder="请输入主表主键列" class="fl">
                </div>
                <div class="row clearfix">
                    <label for="" class="fl">子表主键列：</label>
                    <input type="text" v-model="SubTable.ChildeKeyColumn" placeholder="请输入子表主键列" class="fl">
                </div>
                <div class="row clearfix">
                    <label for="" class="fl">子表顺序：</label>
                    <input type="text" v-model="SubTable.ChildIndex" placeholder="请输入子表顺序" class="fl">
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addTip1 = false" size="small">取 消</el-button>
                <el-button type="primary" @click="confirm" size="small">确 定</el-button>
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
      state: 1,
      search: "",
      SubtableState: "add", //判断时修改还是新建
      addTip1: false,
      ReportID: "",
      SubTable: {
        ChildeCaption: "",
        MasterKeyColumn: "",
        ChildeKeyColumn: "",
        ChildIndex: "",
        ID: "",
      },
      tableData1: [],//报表子表列表
      tableData2: [],//报表子表列列表
      dataType: [
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
      ],
      Column: {
        Name: "",
        Title: "",
        TypeValue: "", //数据类型
        Order: "",
        Visiable: false
      },
      ReportValue: "",
      ReportOptions: [], //报表集合
      ids: ""
    };
  },
  mounted() {
    this.getReportData();
  },
  methods: {
    
    //切换
    changes() {
      this.getData(this.ReportValue);
    },
    //获取报表列表
    getReportData() {
      this.$get(Api.reportselector)
        .then(res => {
          if (res.data.state == 200) {
            this.ReportOptions = res.data.data;
            this.ReportValue = this.ReportOptions[0].ReportInfo.ID;
            this.getData(this.ReportValue);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error)=> {});
    },
    //获取指定报表的子表集合
    getData(id) {
      this.loading = true;
      this.$get(Api.gettables + "/" + id)
        .then(res => {
          if (res.data.state == 200) {
            this.loading = false;
            this.tableData1 = res.data.data;
            if (this.tableData1.length != 0) {
              this.handdle(this.tableData1[0]);
              this.ids = this.tableData1[0].ChildeTableInfo.ID;
            } else {
              this.tableData2 = [];
            }
          } else {
            this.loading = false;
            this.$message.error(res.data.msg);
          }
        })
        .catch((error)=> {
          this.loading = false;
          this.$message.error(error);
        });
    },
    fnAdd1() {
      this.addTip1 = true;
      this.SubtableState = "add";
      this.SubTable.ChildeCaption = "";
      this.SubTable.MasterKeyColumn = "";
      this.SubTable.ChildeKeyColumn = "";
      this.SubTable.ChildIndex = "";
    },
    fnEdit(id, title, mainkey, sonkey, order) {
      this.addTip1 = true;
      this.SubtableState = "edit";
      this.SubTable.ID = id;
      this.SubTable.ChildeCaption = title;
      this.SubTable.MasterKeyColumn = mainkey;
      this.SubTable.ChildeKeyColumn = sonkey;
      this.SubTable.ChildIndex = order;
    },

    confirm() {
      switch(this.$isNull(this.SubTable)){
        case 'ChildeCaption':
          this.$message.error('子表标题不能为空');
          return;
        case 'MasterKeyColumn':
          this.$message.error('主表主键列不能为空');
          return;
        case 'ChildeKeyColumn':
          this.$message.error('子表主键列不能为空');
          return;
        case 'ChildIndex':
          this.$message.error('子表顺序不能为空');
          return;
        default:
          // console.log(this.$isNull(this.SubTable))
      }

      this.addTip1 = false;
      if (this.SubtableState == "add") {
        this.loading = true;
        this.$post(Api.tablenew, {
            ReportID: this.ReportValue,
            ChildeCaption: this.SubTable.ChildeCaption,
            MasterKeyColumn: this.SubTable.MasterKeyColumn,
            ChildeKeyColumn: this.SubTable.ChildeKeyColumn,
            ChildeIndex: this.SubTable.ChildIndex
          })
          .then(res => {
            this.loading = false;
            if (res.data.state == 200) {
              this.getData(this.ReportValue);
              this.$message({
                message: "新建成功",
                type: "success"
              });
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((error)=> {
            this.loading = false;
            this.$message.error(error);
          });
      } else {
        this.loading = true;
        this.$post(Api.edittable, {
            ID: this.SubTable.ID,
            ReportID: this.ReportValue,
            ChildeCaption: this.SubTable.ChildeCaption,
            MasterKeyColumn: this.SubTable.MasterKeyColumn,
            ChildeKeyColumn: this.SubTable.ChildeKeyColumn,
            ChildeIndex: this.SubTable.ChildIndex
          })
          .then(res => {
            this.loading = false;
            if (res.data.state == 200) {
              this.getData(this.ReportValue);
              this.$message({
                message: "修改成功",
                type: "success"
              });
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((error)=> {
            this.loading = false;
            this.$message.error(error);
          });
      }
    },
    //点击行获取id
    handdle(row) {
      this.ids = row.ChildeTableInfo.ID;
      this.getDataColumn(this.ids)
    },
    //获取子表列数据
    getDataColumn(id){
      this.loading = true;
      this.$get(Api.gettcols + "/" + id).then(res => {
        if (res.data.state == 200) {
          this.loading = false;
          this.tableData2 = res.data.data;
        } else {
          this.loading = false;
          this.$message.error(res.data.msg);
        }
      }).catch((error)=> {
            this.loading = false;
            this.$message.error(error);
          });
    },
    //添加
    adds() {
      switch(this.$isNull(this.Column)){
        case 'Name':
          this.$message.error('列名不能为空');
          return;
        case 'Title':
          this.$message.error('列标题不能为空');
          return;
        case 'TypeValue':
          this.$message.error('数据类型不能为空');
          return;
        case 'Order':
          this.$message.error('列顺序不能为空');
          return;
        default:
          // console.log(this.$isNull(this.Column))
      }
      
      this.$post(Api.tcolnew, {
          ReportID: this.ReportValue,
          ChildeID: this.ids,
          ColumnName: this.Column.Name,
          ColumnCaption: this.Column.Title,
          DataType: this.Column.TypeValue,
          Visiable: this.Column.Visiable,
          OrderIndex: this.Column.Order
        })
        .then(res => {
          if (res.data.state == 200) {
            this.Column.Name = "";
            this.Column.Title = "";
            this.Column.TypeValue = "";
            this.Column.Order = "";
            this.getDataColumn(this.ids)
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.Column.Name = "";
            this.Column.Title = "";
            this.Column.TypeValue = "";
            this.Column.Order = "";
            this.$message.error(res.data.msg);
          }
        });
    },
    //删除子表列
    dels(id) {
      this.$confirm("将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(Api.deltablecol + "/" + id)
            .then(response => {
              if (response.data.state == 200) {
                this.loading = false;
                this.getData(this.ReportValue);
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
              } else {
                this.loading = false;
                this.$message.error(response.data.msg);
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
    //删除报表子表
    fnDel(id) {
      this.$confirm("将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(Api.deltable + "/" + id)
            .then(response => {
              if (response.data.state == 200) {
                this.loading = false;
                this.getData(this.ReportValue);
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
              } else {
                this.loading = false;
                this.$message.error(response.data.msg);
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
};
</script>
<style scoped>
.coll .row {
  display: inline-block;
  width: 49%;
}
</style>
