<template>
	<div v-loading="loading">
		<div class="title">
			<span class="h1">基础管理</span>
			<span class="h2">词典</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<span>词典类型:</span>
				<el-select v-model="dictTypeValue" clearable filterable placeholder="请选择词典类型">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-button type="primary" size="small" @click="add()">添加词典</el-button>
				<div class="fr">
					<el-input v-model="search" placeholder="请输入名称" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="DictInfo.DictName" label="名称" sortable>
				</el-table-column>
				<el-table-column prop="DictInfo.DictValue" label="值" sortable>
				</el-table-column>
				<el-table-column prop="DictInfo.CreateMan" label="创建人">
				</el-table-column>
				<el-table-column :formatter='formatter' prop="DictInfo.CreateDate" label="创建时间">
				</el-table-column>
				<el-table-column prop="StateStr" label="状态">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="small" type="success" @click='edit(scope.row.DictInfo.ID,scope.row.DictInfo.DictName,scope.row.DictInfo.DictValue,scope.row.DictInfo.DictType)'>修改</el-button>
  						<el-button size="small" type="danger" @click='del(scope.row.DictInfo.ID)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pages">
				<el-pagination   @size-change="handleSizeChange" :page-sizes="[10,20,30,40,50]" :page-size="pagesizs" :current-page="pages" @current-change="handleCurrentChange" layout="sizes,prev, pager, next" :total="total" background>
				</el-pagination>
			</div>
		</div>
		<el-dialog title="添加词典" :visible.sync="addBox" width="414px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
        <el-form-item label="词典类型">
					<el-select  class='se' v-model="formLabelAlign.dictTypeValue" filterable placeholder="请选择词典类型">
					    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="词典名称">
					<el-input v-model="formLabelAlign.name" placeholder="请输入词典名称"></el-input>
				</el-form-item>
				<el-form-item label="词典值">
					<el-input v-model="formLabelAlign.value" placeholder="请输入词典值"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="addBox = false">取 消</el-button>
				<el-button size="small" type="primary" @click="append()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改词典" :visible.sync="modiy" width="414px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
        <el-form-item label="词典类型">
					<el-select  class='se' v-model="formLabelAlign.dictTypeValue" filterable placeholder="请选择词典类型">
					    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="词典名称">
					<el-input v-model="formLabelAlign.name" placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item label="词典值">
					<el-input v-model="formLabelAlign.value" placeholder="请输入词典值"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="modiy = false">取 消</el-button>
				<el-button size="small" type="primary" @click="updateuser()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import api from "../../axios/api";
export default {
  data() {
    return {
      loading: false,
      addBox: false, //添加弹框
      modiy: false, //修改弹框
      formLabelAlign: {
        dictTypeValue: "",
        id: "",
        name: "",
        value: ""
      }, //修改
      pages: 1, //页码
      total: 1, //总条数
      pagesizs:10,//页数
      tableData: [], //词典列表
      search: "", //搜索
      options: [
        {
          value: 1,
          label: "员工类型"
        }
      ], //词典选项
      dictTypeValue: "", //词典类型值
      istrue:false,
    };
  },
  mounted() {
    this.getData(this.pages, this.search,this.pagesizs);
  },
  methods: {
    formatter(row, column) {
      return this.$toMoment(row.DictInfo.CreateDate);
    },
    handleSizeChange(val){
    	this.pagesizs = val
    	this.getData(this.pages, this.search,this.pagesizs);
    },
    //分页
    handleCurrentChange(val) {
      this.pages = val;
      this.getData(this.pages, this.search,this.pagesizs);
    },
    //搜索
    filter() {
      this.pages = 1;
      this.getData(this.pages, this.search,this.pagesizs);
    },
    //添加词典弹框
    add() {
      this.formLabelAlign.dictTypeValue = this.dictTypeValue;
      this.formLabelAlign.name = "";
      this.formLabelAlign.value = "";
      this.addBox = true;
    },
    excel(){
    	this.loading = true;
	      this.$post(api.dictgetlist, {
	        PageSize: this.pagesizs,
	        PageIndex:this.pages,
	        KeyWord: this.search,
	        Query: {
	          DictType: this.dictTypeValue
	        },
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
	          this.$message.error(error);
	        });
    },
    //获取词典列表
    getData(pages, val, pagesize,istrue) {
      this.loading = true;
      this.$post(api.dictgetlist, {
        PageSize: pagesize,
        PageIndex: pages - 1,
        KeyWord: val,
        Query: {
          DictType: this.dictTypeValue
        },
        OrderString: "",
        ToExcel: istrue
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
          this.$message.error(error);
        });
    },
    //确认添加
    append() {
      if (this.formLabelAlign.name == "" || this.formLabelAlign.value == "") {
        this.$message({
          message: "参数不能为空",
          type: "warning"
        });
        return;
      }

      this.loading = true;
      this.addBox = false;
      this.$post(api.dictaddnew, {
        DictType: this.formLabelAlign.dictTypeValue,
        DictName: this.formLabelAlign.name,
        DictValue: this.formLabelAlign.value
      })
        .then(res => {
          if (res.state == 200) {
            this.loading = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.pages=1
            this.inputs=''
            this.cardList(this.pages, this.inputs, this.value,this.pagesizs);
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
    //修改弹框
    edit(id, name, value, type) {
      this.modiy = true;
      this.formLabelAlign.dictTypeValue = type;
      this.formLabelAlign.id = id;
      this.formLabelAlign.name = name;
      this.formLabelAlign.value = value;
    },
    //确认修改
    updateuser() {
      if (this.formLabelAlign.name == "" || this.formLabelAlign.value == "") {
        this.$message({
          message: "参数不能为空",
          type: "warning"
        });
        return;
      }
      this.modiy = false;
      this.loading = true;
      this.$post(api.editdict, {
        ID: this.formLabelAlign.id,
        DictType: this.formLabelAlign.dictTypeValue,
        DictName: this.formLabelAlign.name,
        DictValue: this.formLabelAlign.value
      })
        .then(res => {
          if (res.state == 200) {
            this.loading = false;
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.cardList(this.pages, this.inputs, this.value,this.pagesizs);
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
    //删除
    del(id) {
      this.$confirm("将永久删除该词典, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //        this.loading = true;
          this.$get(api.deldict + "/" + id).then(res => {
            if (res.data.state == 200) {
              this.loading = false;
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.cardList(this.pages, this.inputs, this.value,this.pagesizs);
            } else {
              this.loading = false;
              this.$message.error(res.data.msg);
            }
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
<style scoped="">
</style>