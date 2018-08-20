<template>
  <div class="content-wrapper" v-loading="loading">
      <div class="title clearfix">
          电子卡
          
      </div>
      <div class="content">
          <div class="panel">
            <div class="panel-heading clearfix">
                <button class="btn fl Green mini" @click="addCard()">新建</button>
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
                <el-select v-model="state" filterable placeholder="请选择">
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
                    <el-table-column prop="ElectronCard.CardCode" label="ID" sortable show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="ElectronCard.BusinessCode" label="卡号" sortable show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="ElectronCard.AccountCode" label="账套号" sortable show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="AccountName" label="账套名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="ElectronCard.CreateMan" label="创建人" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="ElectronCard.CreateDate" label="创建时间" :formatter="formatter" sortable show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="StateStr" label="状态">
                    </el-table-column>
                    <!--<el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-dropdown size="small"  trigger="click" type="primary">
                                <el-button type="primary" size="small" class="Info">
                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">   
                                    <el-dropdown-item>
                                    <el-button size="mini" class='Success' @click='editState(scope.row.ElectronCard.ID,1)'>正常</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                    <el-button size="mini" class='Warning' @click='editState(scope.row.ElectronCard.ID,4)'>回收</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                    <el-button size="mini"  class='Green' @click='editState(scope.row.ElectronCard.ID,3)'>挂失</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                    <el-button size="mini" class='Inverse' @click='editState(scope.row.ElectronCard.ID,2)'>损坏</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                    <el-button size="mini" class='Danger' @click='del(scope.row.ElectronCard.ID)'>删除</el-button>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            
                        </template>
                    </el-table-column>-->
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
            title="新建"
            :visible.sync="cardTip"
            width="550px">
            <div class="tip ">
                <el-form :label-position="labelPosition" label-width="100px" >
                    <el-form-item label="账套：">
                       <el-select v-model="form.setOfBooks" clearable filterable placeholder="请选择">
	                        <el-option
	                        v-for="item in form.setOfBooksList"
	                        :key="item.AccountCode"
	                        :label="item.AccountName"
	                        :value="item.AccountCode">
	                        </el-option>
	                    </el-select>
                    </el-form-item>
                    <el-form-item label="ID：">
                        <div class="row clearfix" style="padding-top: 5px;line-height: 30px;">
                            <input type="text" v-model="form.startZt" placeholder="请输入卡号" class="fl">
                        </div>
                    </el-form-item>
                    <el-form-item label="卡号：">
                        <div class="row clearfix" style="padding-top: 5px;line-height: 30px;">
                           <input type="text" v-model="form.StarNumber" placeholder="请输入开始编号">
                        </div>
                    </el-form-item>
                    <el-form-item label="文件导入：">
                        <div class="uploads">
                            <el-upload class="upload-demo"  :headers="myHeaders"  :file-list="fileList" drag :action="importFileUrl" :on-exceed="handleExceed" :on-error="uploadError" :on-success="uploadSuccess" :before-upload="beforeAvatarUpload">
                                <i class="el-icon-plus">点击上传</i>
                                <div class="el-upload__tip" slot="tip">只能上传xls、xlsx文件，且不超过10MB</div>
                            </el-upload>
                            <a :href="Template+'Template/电子卡模板.xlsx'" class="mbxz" target="_blank">模板下载</a>
                        </div>
                        <el-button class="Green"  size="small" style="float:right;"  @click="fnImport()">导入</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cardTip = false" size="small">取 消</el-button>
                <el-button type="primary" @click="cardnew()" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="分配"
            :visible.sync="allotTip"
            width="500px">
            <div class="tip">
                <el-form :label-position="labelPosition" label-width="100px" >
                    <el-form-item label="选择账套：">
                        <el-select v-model="value1" clearable filterable placeholder="请选择账套" >
                            <el-option
                            v-for="item in options"
                        :key="item.AccountCode"
                        :label="item.AccountName"
                        :value="item.AccountCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="卡号：">
                        <div class="row clearfix" style="padding-top: 5px;line-height: 30px;">
                            <input type="text" placeholder="请输入卡号" class="fl"  style="width:35%;">
                            <label for="" class="fl" style="width:30px;text-align:center">至</label>
                            <input type="text" placeholder="请输入卡号" class="fl" style="width:35%;">
                            <button class="btn Primary small" style="margin-left:20px">查找</button>
                        </div>
                    </el-form-item>
                </el-form>
                <el-table ref="multipleTable" :data="tableData" stripe style="width: 100%" align="center" @selection-change="handleSelectionChange">
                    <el-table-column  type="selection" prop="card"> </el-table-column>
                    <el-table-column label="卡号">
                    		<template slot-scope="scope">
                    		{{scope.row.ElectronCard.CardCode}}
                    	</template>
                    </el-table-column>
                    <el-table-column prop="StateStr" label="状态">
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allotTip = false" size="small">取 消</el-button>
                <el-button type="primary" @click="allot" size="small">确 定</el-button>
            </span>
        </el-dialog>
        
      </div>
  </div>
</template>
<script>
import api from "../../axios/api";
export default {
  name: "card",
  data() {
    return {
      form: {
        setOfBooks: "", //选择的账套
        setOfBooksList: [], //账套列表
        startZt: "", //开始
        endZt: "", //结束
        StrType:'B',
        StrContent:'',
        StarNumber:'',
      },
      loading: false,
      labelPosition: "right",
      fileList: [],
      Template:api.Template,
      Host: api.hostname,
      importFileUrl: api.files,
      myHeaders: {
        token: sessionStorage.token
      },
      imageUrl: "",
      allotTip: false,
      pages: 1, //翻页
      total: 1, //条数
      PageSize: 10,
      state: 1,
      search: "",
      cardTip: false,
      tableData: [], //电子卡列表
      options: [],
      value: "",
      value1: "",
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
          label: "损坏"
        },
        {
          value: 3,
          label: "挂失"
        },
        {
          value: 4,
          label: "回收"
        }
      ],
      state: 0,
      multipleSelection: []
    };
  },
  mounted() {},
  created() {
    this.getselector();
    this.cardlist(this.pages, this.value, this.state, this.search);
  },
  methods: {
    //格式化时间
    formatter(row, column) {
      return this.$toMoment(row.ElectronCard.CreateDate);
    },
    //导出Execl
    fnExport() {
      this.loading = true;
      this.$post(api.cardlist, {
          PageSize: this.PageSize,
          PageIndex: this.pages - 1,
          KeyWord: this.search,
          Query: {
            AccountID: this.value,
            State: this.state
          },
          OrderString: "",
          ToExcel: true
        })
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            if (res.data.data.ExcelResult != "") {
              // this.$message.error(res.data.data.ExcelResult);
              window.location.href=Host+res.data.data.ExcelResult;
            }
          } else {
            this.loading = false;
            this.$message({
              message: res.data.msg,
              type: "error",
              duration: 1000
            });
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    handleSizeChange(val) {
      this.PageSize = val;
      this.cardlist(this.pages, this.value, this.state, this.search);
    },
    //获取账套列表
    getselector() {
      this.$get(api.getselector)
        .then(res => {
          if (res.data.state == 200) {
            this.options = res.data.data;
            this.form.setOfBooksList = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
              duration: 1000
            });
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //翻页
    handleCurrentChange(val) {
      this.pages = val;
      this.cardlist(this.pages, this.value, this.state, this.search);
    },
    //搜索
    searchs() {
      this.pages = 1;
      this.cardlist(this.pages, this.value, this.state, this.search);
    },
    //获取电子卡列表
    cardlist(page, val, sta, sear) {
      this.loading = true;
      this.$post(api.cardlist, {
          PageSize: this.PageSize,
          PageIndex: page - 1,
          KeyWord: sear,
          Query: {
            AccountID: val,
            State: sta
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
            this.$message({
              message: res.data.msg,
              type: "error",
              duration: 1000
            });
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //新建弹窗
    addCard() {
      this.cardTip = true;
      this.form.setOfBooks = "";
      this.form.startZt = "";
      this.form.endZt = "";
      this.form.StrContent = "";
      this.form.StarNumber = "";
      this.fileList = [];
    },
    //确认新建电子卡
    cardnew() {
      console.log(this.form)
      switch(this.$isNull(this.form)){
        case 'startZt':
          this.$message.error('ID不能为空');
          return;
        case 'setOfBooks':
          this.$message.error('请选择账套');
          return;
        case 'StarNumber':
          this.$message.error('请输入卡号');
          return;
        default:
      }

      if (this.fileList.length == 0) {
        
        this.cardTip = false;
        this.loading = true;
        this.$post(api.cardnew,{
				  "AccountCode": this.form.setOfBooks,
				  "BusinessCode": this.form.StarNumber,
				  "CardCode": this.form.startZt,
				})
          .then(res => {
            if (res.data.state == 200) {
              this.loading = false;
              this.pages = 1;
              this.value = "";
              this.state = 0;
              this.search = "";
              this.cardlist(this.pages, this.value, this.state, this.search);
              this.$message({
                message: "添加成功" + res.data.data + "条",
                type: "success"
              });
            } else {
              this.loading = false;
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            this.loading = false;
            this.$message.error(error);
          });
      } else {
        this.cardTip = false;
      }
    },
    //删除
    del(id) {
      this.$confirm("将永久删除该卡片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(api.delcard + "/" + id)
            .then(response => {
              if (response.data.state == 200) {
                this.loading = false;
                this.pages = 1;
                this.value = "";
                this.state = 0;
                this.search = "";
                this.cardlist(this.pages, this.value, this.state, this.search);
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
    //修改状态
    editState(id, stae) {
      this.$confirm("将修改该卡片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(api.setstate + "/" + id + "/" + stae)
            .then(response => {
              if (response.data.state == 200) {
                this.loading = false;
                this.pages = 1;
                this.value = "";
                this.state = 0;
                this.search = "";
                this.cardlist(this.pages, this.value, this.state, this.search);
                this.$message({
                  message: "修改成功",
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
            message: "已取消修改"
          });
        });
    },
    fnAllot() {
      this.allotTip = true;
    },
    //分配
    allot() {
      this.$post(api.cardallot, {
          AccountID: "",
          CardCodes: ["", ""]
        })
        .then(res => {
          console.log(res);
        });
      this.allotTip = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleExceed(files, fileList) {
      console.log(files);
      console.log(fileList);
    },
    beforeAvatarUpload(file) {
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      const extension3 = file.name.split(".")[1] === "doc";
      const extension4 = file.name.split(".")[1] === "docx";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2 && !extension3 && !extension4) {
        this.$message.error("上传模板只能是 xls、xlsx格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传模板大小不能超过 10MB!");
      }
      return extension || extension2 || extension3 || (extension4 && isLt2M);
    },
    uploadSuccess(response) {
      console.log(response);
      this.imageUrl = response.data.substring(10, response.data.length);
      console.log(this.imageUrl);
      this.$message({
        message: "上传成功",
        type: "success"
      });
    },
    // 上传错误
    uploadError(response) {},
    //导入电子卡片
    fnImport() {
      this.loading = true;
      this.cardTip = false;
      this.$post(api.cardimport, {
          FileName: this.imageUrl
        })
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            this.$message({
              message: "导入成功" + res.data.data + "条",
              type: "success"
            });
            this.cardTip = false;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    }
  }
};
</script>
<style scoped>
.uploads {
  display: inline-block;
  width: 80%;
}
</style>
