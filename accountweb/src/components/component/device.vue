<template>
  <div class="content-wrapper" v-loading="loading">
      <div class="title clearfix">
          	设备
      </div>
      <div class="content">
          <div class="panel">
            <div class="panel-heading clearfix">
                <button class="btn fl Green mini" @click="addDevice">新建</button>
                <div class="search clearfix fl" style="margin-left: 20px;">
                    <label for="">账套：</label>
                    <el-select v-model="value" clearable filterable placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.ID"
                        :label="item.AccountName"
                        :value="item.ID">
                        </el-option>
                    </el-select>
                </div>
                <div class="fl" style="margin-left: 20px;">
                <label for="">状态：</label>
                <el-select v-model="state"  filterable placeholder="请选择">
                        <el-option
                        v-for="item in states"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                
                <div class="search clearfix fr">
                    <el-input v-model="search" placeholder="请输入关键字"></el-input>
                    <button class="btn Info mini" @click='searchs()'>查询</button>
                    <button class="btn Primary mini" @click="fnExport">导出Execl</button>
                </div>
            </div>
          </div>
        <div class="panel">
            <div class="panel-body">
                <el-table :data="tableData" stripe style="width: 100%" align="center">
                    <el-table-column type="index" width="50">
                    </el-table-column>
                    <el-table-column prop="DeviceInfo.DeviceCode" label="设备号" sortable show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="DeviceInfo.DeviceName" label="设备名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="DeviceInfo.DeviceID" label="设备ID号" sortable show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="DeviceInfo.AccountCode" label="账套号" sortable show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="AccountName" label="账套名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="StateStr" label="状态">
                    </el-table-column>
                    <el-table-column prop="DeviceInfo.CreateMan" label="创建人" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="DeviceInfo.CreateDate" label="创建时间" :formatter="formatter" sortable show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-dropdown size="small"  trigger="click" type="primary">
                                <el-button type="primary" size="small" class="Info">
                                    操&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>
                                    <el-button size="mini" class='Success' @click='modiy(scope.row.DeviceInfo.ID,scope.row.DeviceInfo.DeviceCode,scope.row.DeviceInfo.DeviceName,scope.row.DeviceInfo.DeviceID,scope.row.DeviceInfo.AccountCode)'>修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
                                    </el-dropdown-item>
                                    <!--<el-dropdown-item>
                                    <el-button size="mini" class='Pink' @click='sta(scope.row.DeviceInfo.ID,1)'>正&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;常</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                    <el-button size="mini" class='Primary' @click='sta(scope.row.DeviceInfo.ID,2)'>维&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                    <el-button size="mini" class='Warning' @click='sta(scope.row.DeviceInfo.ID,3)'>报&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;废</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                    <el-button size="mini" class='Inverse' @click='sta(scope.row.DeviceInfo.ID,4)'>在&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;线</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                    <el-button size="mini" class='Danger' @click='sta(scope.row.DeviceInfo.ID,5)'>关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;闭</el-button>
                                    </el-dropdown-item>-->
                                    <el-dropdown-item>
                                    <el-button size="mini" class='Green' @click="fnAllot(scope.row.DeviceInfo.AccountCode,scope.row.DeviceInfo.ID)">分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;配</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                    <el-button size="mini"  class='Purple' @click='unbind(scope.row.DeviceInfo.ID)'>解除账套</el-button>
                                    </el-dropdown-item>
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
                    <!-- <el-pagination small :current-page="pages" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" background>
                    </el-pagination> -->
                </div>
            </div>
        </div>
        <el-dialog
            title="分配"
            :visible.sync="allotTip"
            width="500px">
            <div class="tip">
                <el-form :label-position="labelPosition" label-width="100px" >
                    <el-form-item label="选择账套：">
                        <el-select v-model="form.accid" clearable filterable placeholder="请选择" class="fl">
                            <el-option
                            v-for="item in options"
                            :key="item.AccountCode"
                            :label="item.AccountName"
                            :value="item.AccountCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="设备编号：">
                        <div class="row clearfix" style="padding-top: 5px;line-height: 30px;">
                            <input type="text" placeholder="请输入设备编号" class="fl"  style="width:35%;">
                            <label for="" class="fl" style="width:30px;text-align:center">至</label>
                            <input type="text" placeholder="请输入设备编号" class="fl" style="width:35%;">
                            <button class="btn Primary small" style="margin-left:20px">查找</button>
                        </div>
                    </el-form-item>-->
                </el-form>
                <!--<el-table ref="multipleTable" :data="tableData" stripe style="width: 100%" align="center" @selection-change="handleSelectionChange">
                    <el-table-column  type="selection" prop="card"> </el-table-column>
                    <el-table-column prop="code" label="设备编号">
                    </el-table-column>
                    <el-table-column prop="code" label="设备ID">
                    </el-table-column>
                    <el-table-column prop="state" label="状态">
                    </el-table-column>-->
                <!--</el-table>-->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allotTip = false" size="small">取 消</el-button>
                <el-button type="primary" @click="allot()" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="新建"
            :visible.sync="addTip"
            width="550px">
            <div class="tip">
                <el-form :label-position="labelPosition" label-width="100px" :model="addUser">
                  <el-form-item label="选择账套：">
                        <el-select v-model="form.accid" clearable filterable placeholder="请选择账套" class="fl">
                            <el-option
                            v-for="item in options"
                            :key="item.AccountCode"
                            :label="item.AccountName"
                            :value="item.AccountCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备编号：">
                        <el-input  placeholder="请输入设备编" v-model='form.num'></el-input>
                    </el-form-item>
                    <el-form-item label="设备名称：">
                        <el-input  placeholder="请输入设备名" v-model='form.name'></el-input>
                    </el-form-item>
                    <el-form-item label="设备ID号：">
                        <el-input  placeholder="请输入设备ID" v-model='form.id'></el-input>
                    </el-form-item>
                    
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addTip = false" size="small">取 消</el-button>
                <el-button type="primary" @click="confirm" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改"
            :visible.sync="editTip"
            width="550px">
            <div class="tip">
                <el-form :label-position="labelPosition" label-width="100px" :model="addUser">
                  <el-form-item label="选择账套：">
                        <el-select v-model="form.accid" clearable filterable placeholder="请选择账套" class="fl">
                            <el-option
                            v-for="item in options"
                            :key="item.AccountCode"
                            :label="item.AccountName"
                            :value="item.AccountCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备编号：">
                        <el-input  placeholder="请输入设备编" v-model='form.num'></el-input>
                    </el-form-item>
                    <el-form-item label="设备名称：">
                        <el-input  placeholder="请输入设备名" v-model='form.name'></el-input>
                    </el-form-item>
                    <el-form-item label="设备ID号：">
                        <el-input  placeholder="请输入设备ID" disabled v-model='form.id'></el-input>
                    </el-form-item>
                    
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editTip = false" size="small">取 消</el-button>
                <el-button type="primary" @click="edit()" size="small">确 定</el-button>
            </span>
        </el-dialog>
      </div>
  </div>
</template>
<script>
import api from "../../axios/api";
export default {
  name: "device",
  data() {
    return {
      editTip: false,
      states: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "正常"
        },
        {
          value: 2,
          label: "维修"
        },
        {
          value: 3,
          label: "报废"
        },
        {
          value: 4,
          label: "在线"
        },
        {
          value: 5,
          label: "关机"
        }
      ],
      state: 0,
      loading: false,
      pages: 1, //翻页
      total: 1, //条数
      PageSize: 10,
      search: "",
      addUser: {}, //新建设备信息
      addTip: false,
      allotTip: false,
      labelPosition: "right",
      tableData: [],
      options: [],
      value: "",
      form: {
        name: "",
        id: "",
        num: "",
        accid:''
      },
      id: ""
    };
  },
  mounted() {},
  created() {
    this.getselector();
    this.getlistdevice(this.pages, this.value, this.state, this.search);
  },
  methods: {
    //格式化时间
    formatter(row, column) {
      return this.$toMoment(row.DeviceInfo.CreateDate);
    },
    //导出Execl
    fnExport() {
      this.loading = true;
      this.$post(api.getlistdevice, {
          PageSize: this.PageSize,
          PageIndex: this.pages - 1,
          KeyWord: this.search,
          Query: {
            State: this.state,
            AccountID: this.value
          },
          OrderString: "",
          ToExcel: true
        })
        .then(res => {
          if (res.data.state == 200) {
            this.loading = false;
            if (res.data.data.ExcelResult != "") {
              // this.$message.error(res.data.data.ExcelResult);
              window.location.href=Host+res.data.data.ExcelResult;
            }
          } else {
            this.loading = false;
            this.$message.error(res.data.msg);
          }
        }).catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //获取账套列表
    getselector() {
      this.$get(api.getselector).then(res => {
        if (res.data.state == 200) {
          this.options = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    handleSizeChange(val) {
      this.PageSize = val;
      this.getlistdevice(this.pages, this.value, this.state, this.search);
    },
    //翻页
    handleCurrentChange(val) {
      this.pages = val;
      this.getlistdevice(this.pages, this.value, this.state, this.search);
    },
    //搜索
    searchs() {
      this.pages = 1;
      this.getlistdevice(this.pages, this.value, this.state, this.search);
    },
    //获取设备列表
    getlistdevice(pages, val, stat, ser) {
      this.loading = true;
      this.$post(api.getlistdevice, {
          PageSize: this.PageSize,
          PageIndex: pages - 1,
          KeyWord: ser,
          Query: {
            State: stat,
            AccountID: val
          },
          OrderString: "",
          ToExcel: false
        })
        .then(res => {
          if (res.data.state == 200) {
            this.loading = false;
            this.tableData = res.data.data.Data;
            this.total = res.data.data.Items ? res.data.data.Items : 1;
          } else {
            this.loading = false;
            this.$message.error(res.data.msg);
          }
        }).catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //分配弹框
    fnAllot(code, id) {
      this.form.accid = code;
      this.id = id;
      this.allotTip = true;
    },
    //确认分配
    allot() {
      if(this.form.accid==''){
        this.$message.error('请选择账套');
        return false;
      }
      this.loading = true;
      this.$post(api.deviceallot, {
          ID: this.id,
          AccountCode: this.form.accid
        })
        .then(res => {
          if (res.data.state == 200) {
            this.loading = false;
            this.$message({
              message: "分配成功",
              type: "success"
            });
            this.pages = 1;
            this.value = "";
            this.state = 0;
            this.search = "";
            this.getlistdevice(this.pages, this.value, this.state, this.search);
          } else {
            this.loading = false;
            this.$message.error(res.data.msg);
          }
        }).catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
      this.allotTip = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //新建弹窗
    addDevice() {
      this.form.num = "";
      this.form.id = "";
      this.form.name = "";
      this.form.accid = "";
      this.addTip = true;
    },
    //确人新建
    confirm() {
      switch(this.$isNull(this.form)){
        case 'name':
          this.$message.error('设备名称不能为空');
          return;
        case 'id':
          this.$message.error('设备ID不能为空');
          return;
        case 'num':
          this.$message.error('设备编号不能为空');
          return;
        case 'accid':
          this.$message.error('请选择账套');
          return;
        default:
          // console.log(this.$isNull(this.form))
      }
      this.loading = true;
      this.$post(api.devicenew, {
          DeviceCode: this.form.num,
          DeviceName: this.form.name,
          DeviceID: this.form.id,
          AccountCode: this.form.accid
        })
        .then(res => {
          if (res.data.state == 200) {
            this.addTip = false;
            this.loading = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.pages = 1;
            this.value = "";
            this.state = 0;
            this.search = "";
            this.getlistdevice(this.pages, this.value, this.state, this.search);
          } else {
            this.loading = false;
            this.$message.error(res.data.msg);
          }
        }).catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //修改
    modiy(id, DeviceCode, DeviceName, DeviceID, AccountCode) {
      this.id = id;
      this.form.num = DeviceCode;
      this.form.id = DeviceID;
      this.form.name = DeviceName;
      this.form.accid = AccountCode;
      this.editTip = true;
    },
    //确认修改
    edit() {
      switch(this.$isNull(this.form)){
        case 'name':
          this.$message.error('设备名称不能为空');
          return;
        case 'id':
          this.$message.error('设备ID不能为空');
          return;
        case 'num':
          this.$message.error('设备编号不能为空');
          return;
        case 'accid':
          this.$message.error('请选择账套');
          return;
        default:
          // console.log(this.$isNull(this.form))
      }
      this.loading = true;
      this.$post(api.editdevice, {
          ID: this.id,
          DeviceCode: this.form.num,
          DeviceName: this.form.name,
          DeviceID: this.form.id,
          AccountCode: this.form.accid
        })
        .then(res => {
          if (res.data.state == 200) {
            this.editTip = false;
            this.loading = false;
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.pages = 1;
            this.value = "";
            this.state = 0;
            this.search = "";
            this.getlistdevice(this.pages, this.value, this.state, this.search);
          } else {
            this.loading = false;
            this.$message.error(res.data.msg);
          }
        }).catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //解除绑定
    unbind(id) {
      this.$confirm("将解除绑定, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(api.unbind + "/" + id)
            .then(res => {
              if (res.data.state == 200) {
                this.loading = false;
                this.pages = 1;
                this.value = "";
                this.state = 0;
                this.search = "";
                this.getlistdevice(
                  this.pages,
                  this.value,
                  this.state,
                  this.search
                );
                this.$message({
                  message: "解绑成功",
                  type: "success"
                });
              } else {
                this.loading = false;
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消解绑"
          });
        });
    },
    //修改状态
    sta(id, sts) {
      this.$confirm("将修改该卡片状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(api.devicesetstate + "/" + id + "/" + sts)
            .then(res => {
              if (res.data.state == 200) {
                this.loading = false;
                this.pages = 1;
                this.value = "";
                this.state = 0;
                this.search = "";
                this.getlistdevice(
                  this.pages,
                  this.value,
                  this.state,
                  this.search
                );
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
              } else {
                this.loading = false;
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    }
  }
};
</script>
<style scoped>
</style>
