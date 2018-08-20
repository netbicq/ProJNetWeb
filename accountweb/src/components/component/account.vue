<template>
  <div class="content-wrapper" v-loading="loading">
      <div class="title">
          账套管理
      </div>
      <div class="content">
           <div class="panel">
            <div class="panel-heading clearfix">
                <button class="btn fl Green mini" @click="fnAdd">新建</button>
                <div class="search  fl" style="margin-left:20px;">
                    <label for="">状态：</label>
                    <el-select v-model="state" placeholder="请选择">
                        <el-option
                        v-for="item in stateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="search clearfix fr">
                    <el-input v-model="search" placeholder="请输入关键字"></el-input>
                    <button class="btn Info mini" @click="fnSearch">查询</button>
                    <button class="btn Primary mini" @click="fnExport">导出Execl</button>
                </div>
            </div>
          </div>
        <div class="panel">
            <div class="panel-body">
                <el-table :data="tableData" stripe style="width: 100%" align="center">
                    <el-table-column type="index" width="50">
                    </el-table-column>
                    <el-table-column prop="AccountInfo.AccountCode" label="账套编号" sortable show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="AccountInfo.AccountName" label="账套名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="AccountInfo.ShortName" label="账套简称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="AccountInfo.DBServer" label="数据库服务器" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="AccountInfo.DBName" label="数据库名" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="AccountInfo.DBUid" label="用户名" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="AccountInfo.CreateMan" label="创建人" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="AccountInfo.CreateDate" label="创建时间" :formatter="formatter" sortable show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="StateStr" label="状态">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-dropdown size="small"  trigger="click" type="primary">
                                <el-button type="primary" size="small" class="Info">
                                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <button class="btn Warning mini" @click="fnClose(scope.row.AccountInfo.ID)">关闭</button>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                             <button class="btn Danger mini" @click="fnDel(scope.row.AccountInfo.ID)">删除</button>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <button class="btn Info mini"  @click="fnSee(scope.row.AccountInfo.ID)">查看</button>
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
        <div class="prop">
            <el-dialog title="新建账套" :visible.sync="addTip" width="400px">
                <div>
                    <el-form :label-position="labelPosition" label-width="80px" :model="user">
                        <el-form-item label="账套编号:">
                            <el-input v-model="user.Code" placeholder="请输入账套编号"></el-input>
                        </el-form-item>
                        <el-form-item label="账套名称:">
                            <el-input v-model="user.Name" placeholder="请输入账套名称"></el-input>
                        </el-form-item>
                        <el-form-item label="账套简称:">
                            <el-input v-model="user.Abbr" placeholder="请输入账套简称"></el-input>
                        </el-form-item>
                        <el-form-item label="账套备注:">
                            <el-input v-model="user.Memo" placeholder="请输入账套备注"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button   @click="addTip = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd()" size="small">确 定</el-button>
                </span>
		    </el-dialog>
        </div>
      </div>
  </div>
</template>
<script>
import Api from "../../axios/api";
export default {
  name: "account",
  data() {
    return {
      loading: false,
      addTip: false,
      pages: 1, //翻页
      total: 1, //条数
      PageSize: 10,
      state: 0,
      labelPosition: "right",
      search: "",
      user: {
        Code: "",
        Name: "",
        Abbr: "",
        Memo: ""
      },
      stateOptions: [
        {
          value: 0,
          label: "所有"
        },
        {
          value: 1,
          label: "正常"
        },
        {
          value: 2,
          label: "关闭"
        },
        {
          value: 3,
          label: "数据库已创建"
        }
      ],
      tableData: []
    };
  },
  mounted() {
    this.getData(this.pages, this.search);
  },
  methods: {
    //格式化时间
    formatter(row, column) {
      return this.$toMoment(row.AccountInfo.CreateDate);
    },
    //导出Execl
    fnExport() {
      this.loading = true;
      this.$post(Api.getacclist, {
          PageSize: this.PageSize,
          PageIndex: this.pages - 1,
          KeyWord: this.search,
          Query: {
            State: this.state
          },
          OrderString: "",
          ToExcel: true
        })
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            if(res.data.data.ExcelResult!=''){
              // this.$message.error(res.data.data.ExcelResult);
              window.location.href=Host+res.data.data.ExcelResult;
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error)=> {
          this.loading = false;
          this.$message.error(error);
        });
    },
    handleSizeChange(val) {
      this.PageSize = val;
      this.getData(this.pages, this.search);
    },
    //查询
    fnSearch() {
      this.pages = 1;
      this.getData(this.pages, this.search);
    },
    //分页
    handleCurrentChange(val) {
      this.pages = val;
      this.getData(this.pages, this.search);
    },
    //获取列表数据
    getData(page, val) {
      this.loading = true;
      this.$post(Api.getacclist, {
          PageSize: this.PageSize,
          PageIndex: page - 1,
          KeyWord: val,
          Query: {
            State: this.state
          },
          OrderString: "",
          ToExcel: false
        })
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            this.tableData = res.data.data.Data;
            this.total = res.data.data.Items ? res.data.data.Items : 1;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error)=> {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //添加弹窗
    fnAdd() {
      this.addTip = true;
      this.user.Code = "";
      this.user.Name = "";
      this.user.Abbr = "";
      this.user.Memo = "";
    },
    //确认添加
    confirmAdd() {
      switch(this.$isNull(this.user)){
        case 'Code':
          this.$message.error('账套编号不能为空');
          return;
        case 'Name':
          this.$message.error('账套名称不能为空');
          return;
        case 'Abbr':
          this.$message.error('账套简称不能为空');
          return;
        default:
          // console.log(this.$isNull(this.user))
      }
      this.addTip = false;
      this.loading = true;
      this.$post(Api.addaccount, {
          AccountCode: this.user.Code,
          AccountName: this.user.Name,
          ShortName: this.user.Abbr,
          Memo: this.user.Memo
        })
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.getData(this.pages, this.search);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error)=> {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //查看
    fnSee(id) {
      this.$router.push({
        path: "/AccountInfo/" + id
      });
    },
    //关闭
    fnClose(id) {},
    //删除
    fnDel(id) {
      this.$confirm("将执行删除操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(Api.delmodel + "/" + id)
            .then(res => {
              this.loading = false;
              if (res.data.state == 200) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getData(this.pages, this.search);
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
    }
  }
};
</script>
<style scoped>
.search {
  display: inline-block;
}
.search .el-input {
  width: 180px;
}
</style>
