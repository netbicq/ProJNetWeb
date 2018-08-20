<template>
	<div v-loading="loading">
		<div class="title">
			<span class="h1">基础管理</span>
			<span class="h2">班次</span>
		</div>
		<div class="tables">
		<div class="tables">
			<div class="clearfix">
				<span>班次:</span>
				<el-button type="primary" size="small" @click='add()'>添加</el-button>
				<div class="fr">
					<el-input v-model="inputs" placeholder="请输入班次名称" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop='ShiftInfo.ShiftName' label="班次名称" sortable> 
				</el-table-column>
				<el-table-column prop='ShiftInfo.STime' label="开始时间" sortable>
				</el-table-column>
				<el-table-column prop='ShiftInfo.ETime' label="结束时间" sortable>
				</el-table-column>
				<el-table-column prop="State" label="创建人">
					<template slot-scope='scope'>
						{{scope.row.ShiftInfo?scope.row.ShiftInfo.CreateMan:''}}
					</template>
				</el-table-column>
				<el-table-column label="创建时间">
					<template slot-scope='scope'>
						{{scope.row.ShiftInfo?$toMoment(scope.row.ShiftInfo.CreateDate):''}}
					</template>
				</el-table-column>
				<el-table-column prop="StateStr" label="状态">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><el-button type="primary">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<el-button size="small" type="success" @click='edit(scope.row.ShiftInfo.ID,scope.row.ShiftInfo.ShiftName,scope.row.ShiftInfo.STime,scope.row.ShiftInfo.ETime)'>修改</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button size="small" type="danger" @click='del(scope.row.ShiftInfo.ID)'>删除</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="primary" size="small" @click='states(scope.row.ShiftInfo.ID,1)'>正常</el-button>
								</el-dropdown-item>
								<el-dropdown-item>
									<el-button type="warning" size="small" @click='states(scope.row.ShiftInfo.ID,2)'>作废</el-button>
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
		</div>
		<el-dialog title="添加班次" :visible.sync="table" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="班次名称：">
					<el-input v-model="formLabelAlign.name" placeholder="请输入班次名称"></el-input>
				</el-form-item>
				<el-form-item label="开始时间：">
					<el-input v-model="formLabelAlign.stime" placeholder="请输入开始时间"></el-input>
				</el-form-item>
				<el-form-item label="结束时间：">
					<el-input v-model="formLabelAlign.etime" placeholder="请输入结束时间"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="table = false">取 消</el-button>
				<el-button size="small" type="primary" @click="allAdd()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改班次" :visible.sync="edits" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="班次名称：">
					<el-input v-model="formLabelAlign.name" placeholder="请输入班次名称"></el-input>
				</el-form-item>
				<el-form-item label="开始时间：">
					<el-input v-model="formLabelAlign.stime" placeholder="请输入开始时间"></el-input>
				</el-form-item>
				<el-form-item label="结束时间：">
					<el-input v-model="formLabelAlign.etime" placeholder="请输入结束时间"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="edits = false">取 消</el-button>
				<el-button size="small" type="primary" @click="ediTure()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import api from "../../axios/api";
export default {
  name: "classes",
  data() {
    return {
      loading: false,
      inputs1: "",
      staffs: [], //电子卡号
      staffNum: "",
      format2: false, //配置规格弹框
      format1: false, //修改规格弹框
      format: false, //规格弹框
      edits: false, //修改班次弹框
      table: false, //添加班次弹框
      pages: 1, //页码
      total: 1, //页数
      pages1: 1, //页码
      total1: 1, //页数
      tableData: [], //卡片列表
      inputs: "", //搜索
      tableData1: [],
      formLabelAlign: {
        name: "",
        stime: "",
        etime: ""
      },
      staffNum: "",
      id: "",
      pagesizs:10
    };
  },
  created() {
    this.getshiftlist(this.pages, this.inputs,this.pagesizs);
  },
  methods: {
  	excel(){
  		this.loading = true;
      this.$post(api.getshiftlist, {
        PageSize: this.pagesizs,
        PageIndex: this.pages - 1,
        KeyWord: this.inputs,
        Query: "",
        OrderString: "",
        ToExcel: true
      })
        .then(res => {
          if (res.state == 200) {
            this.loading = false;
            if (res.data.ExcelResult && res.data.ExcelResult.length!=0) {
				var urls = res.data.ExcelResult
				window.location.href = api.hostname+urls
            }
          } else {
            this.loading = false;
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
  	},
    //获取班次列表
    getshiftlist(page, inp,pagesize) {
      this.loading = true;
      this.$post(api.getshiftlist, {
        PageSize: pagesize,
        PageIndex: page - 1,
        KeyWord: inp,
        Query: "",
        OrderString: "",
        ToExcel: false
      })
        .then(res => {
          if (res.state == 200) {
            this.loading = false;
            this.tableData = res.data.Data;
            this.total = res.data.Items ? res.data.Items : 1;
          } else {
            this.loading = false;
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    handleSizeChange(val){
    	this.pagesizs=val
    	this.getshiftlist(this.pages, this.inputs,this.pagesizs);
    },
    filter() {
      this.pages = 1;
      this.getshiftlist(this.pages, this.inputs,this.pagesizs);
    },
    //分页
    handleCurrentChange(val) {
      this.pages = val;
      this.getshiftlist(this.pages, this.inputs,this.pagesizs);
    },
    //获取卡列表
    cardselector() {
      this.$get(api.cardselector + "/" + 0)
        .then(res => {
          if (res.data.state == 200) {
            this.staffs = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //添加
    add() {
      this.formLabelAlign.name = "";
      this.formLabelAlign.stime = "";
      this.formLabelAlign.etime = "";
      this.cardselector();
      this.table = true;
    },
    //确定添加
    allAdd() {
      if (
        this.formLabelAlign.name == "" ||
        this.formLabelAlign.stime == "" ||
        this.formLabelAlign.etime == ""
      ) {
        this.$message({
          message: "参数不能为空",
          type: "warning"
        });
        return;
      }
      this.loading = true;
      this.$post(api.addshift, {
        ShiftName: this.formLabelAlign.name,
        STime: this.formLabelAlign.stime,
        ETime: this.formLabelAlign.etime
      })
        .then(res => {
          if (res.state == 200) {
            this.loading = false;
            this.table = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.pages = 1;
            this.inputs = "";
            this.getshiftlist(this.pages, this.inputs,this.pagesizs);
          } else {
            this.loading = false;
            this.table = false;
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //修改弹框
    edit(id, name, stime, etime) {
      this.id = id;
      this.formLabelAlign.name = name;
      this.formLabelAlign.stime = stime;
      this.formLabelAlign.etime = etime;
      this.edits = true;
    },
    //修改状态
    states(id, sta) {
      this.loading = true;
      this.$post(api.shiftstate, {
        ID: id,
        State: sta
      })
        .then(res => {
          if (res.state == 200) {
            this.loading = false;
            this.edits = false;
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.pages = 1;
            this.inputs = "";
           this.getshiftlist(this.pages, this.inputs,this.pagesizs);
          } else {
            this.loading = false;
            this.edits = false;
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //确认修改
    ediTure() {
      if (
        this.formLabelAlign.name == "" ||
        this.formLabelAlign.stime == "" ||
        this.formLabelAlign.etime == ""
      ) {
        this.$message({
          message: "参数不能为空",
          type: "warning"
        });
        return;
      }
      this.loading = true;
      this.$post(api.editshift, {
        ID: this.id,
        ShiftName: this.formLabelAlign.name,
        STime: this.formLabelAlign.stime,
        ETime: this.formLabelAlign.etime
      })
        .then(res => {
          if (res.state == 200) {
            this.loading = false;
            this.edits = false;
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.pages = 1;
            this.inputs = "";
            this.getshiftlist(this.pages, this.inputs,this.pagesizs);
          } else {
            this.loading = false;
            this.edits = false;
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //删除
    del(id) {
      this.$confirm("将删除该班次, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(api.delshift + "/" + id)
            .then(res => {
              if (res.data.state == 200) {
                this.loading = false;
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.pages = 1;
                this.inputs = "";
                this.getshiftlist(this.pages, this.inputs,this.pagesizs);
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
    //添加班次
    addBc() {
      this.formLabelAlign.name = "";
      this.staff = 0;
      this.staffNum = "";
      this.cardselector();
      this.format = true;
    },
    //确定添加
    allBcs() {
      if (this.formLabelAlign.name == "" || this.staffNum == "") {
        this.$message({
          message: "参数不能为空",
          type: "warning"
        });
        return;
      }
      this.loading = true;
      this.$post(api.addspec, {
        SpecName: this.formLabelAlign.name,
        ElecCardCode: this.staffNum
      })
        .then(res => {
          if (res.state == 200) {
            this.loading = false;
            this.format = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.pages1 = 1;
            this.inputs1 = "";
            this.getsepclist(this.pages1, this.inputs1);
          } else {
            this.loading = false;
            this.format = false;
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    	},
    }
  }
</script>
<style scoped="">
</style>