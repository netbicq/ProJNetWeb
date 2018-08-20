<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">基础管理</span>
			<span class="h2">组织架构</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<span>组织架构:</span>
				<el-button type="primary" size="small" @click='adds("00000000-0000-0000-0000-000000000000")'>添加</el-button>
			</div>
		</div>
		<div class="tables">
			<zk-table ref="table" index-text="#" :data="data" :columns="columns" :stripe="props.stripe" :border="props.border" :show-header="props.showHeader" :show-summary="props.showSummary" :show-row-hover="props.showRowHover" :show-index="props.showIndex" :tree-type="props.treeType" :is-fold="props.isFold" :expand-type="props.expandType" :selection-type="props.selectionType">
				<template slot='likes' slot-scope="scope">
					<el-dropdown trigger="click">
						<span class="el-dropdown-link"><el-button type="primary">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button></span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<el-button type="primary" size="small" @click='adds(scope.row.value)'>添加</el-button>
							</el-dropdown-item>
							<el-dropdown-item>
								<el-button type="success" size="small" @click='clic(scope.row.value,scope.row.OrgName,scope.row.Principal,scope.row.Tel)'>修改</el-button>
							</el-dropdown-item>
							<el-dropdown-item>
								<el-button size="small" class='Danger' @click='dels(scope.row.value)'>删除</el-button>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</zk-table>
		</div>
		<el-dialog title="组织架构" :visible.sync="allot" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="组织名称">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="负责人">
					<el-input v-model="formLabelAlign.man"></el-input>
				</el-form-item>
				<el-form-item label="负责人电话">
					<el-input v-model="formLabelAlign.tel"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="allot = false">取 消</el-button>
				<el-button size="small" type="primary" @click="alloTure()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改组织架构" :visible.sync="allot1" width="384px">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="组织名称">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="负责人">
					<el-input v-model="formLabelAlign.man"></el-input>
				</el-form-item>
				<el-form-item label="负责人电话">
					<el-input v-model="formLabelAlign.tel"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="allot1 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="edits()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import ZkTable from "vue-table-with-tree-grid";
import api from "../../axios/api";
export default {
  name: "organzie",
  components: {
    ZkTable
  },
  data() {
    return {
      loading: false,
      id: "",
      allot1: false,
      formLabelAlign: {
        name: "",
        man: "",
        tel: ""
      },
      allot: false,
      inputs: "",
      props: {
        stripe: true,
        border: false,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: true,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false
      },
      data: [],
      node: [],
      columns: [
        {
          label: "名称",
          prop: "OrgName"
        },
        {
          label: "负责人",
          prop: "Principal"
        },
        {
          label: "负责人电话",
          prop: "Tel"
        },
        {
          label: "创建人",
          prop: "CreateMan"
        },
        {
          label: "创建人时间",
          prop: "CreateDate"
        },
        {
          label: "操作",
          prop: "likes",
          type: "template",
          template: "likes"
        }
      ]
    };
  },
  computed: {
    propList() {
      return Object.keys(this.props).map(item => ({
        name: item
      }));
    }
  },
  created() {
    this.orgetlist();
  },
  methods: {
    formatter(row, column) {
      return this.$toMoment(row.DictInfo.CreateDate);
    },
    //添加一级
    adds(id) {
      this.id = id;
      this.formLabelAlign.name = "";
      this.formLabelAlign.man = "";
      this.formLabelAlign.tel = "";
      this.allot = true;
    },
    //确认添加
    alloTure() {
      if (
        this.formLabelAlign.name == "" ||
        this.formLabelAlign.man == "" ||
        this.formLabelAlign.tel == ""
      ) {
        this.$message({
          message: "参数不能为空",
          type: "warning"
        });
        return;
      }
      if(!this.$isTel(this.formLabelAlign.tel)){
	        this.$message.error('联系电话格式不正确，请输入正确的手机号或带区号的固定电话！');
	        this.formLabelAlign.tel='';
	        return false;
	    }
      this.loading = true;
      this.$post(api.orgaddnew, {
        ParentID: this.id,
        OrgName: this.formLabelAlign.name,
        Principal: this.formLabelAlign.man,
        Tel: this.formLabelAlign.tel
      })
        .then(res => {
          if (res.state == 200) {
            this.loading = false;
            this.id = "";
            this.allot = false;
            this.orgetlist();
          } else {
            this.loading = false;
            this.allot = false;
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //查询
    filter() {},
    //获取列表
    orgetlist() {
      this.data = [];
      this.loading = true;
      this.$get(api.orgetlist)
        .then(res => {
          if (res.data.state == 200) {
            this.loading = false;
            this.node = res.data.data;
            for (var i = 0; i < res.data.data.length; i++) {
              this.data.push({
                OrgName: res.data.data[i].OrgName,
                Principal: res.data.data[i].Principal,
                OLevel: res.data.data[i].OLevel,
                CreateMan: res.data.data[i].CreateMan,
                CreateDate: this.$toMoment(res.data.data[i].CreateDate),
                Tel: res.data.data[i].Tel,
                State: res.data.data[i].State,
                value: res.data.data[i].ID,
                ParentID: res.data.data[i].ParentID
              });
            }
            this.data = this.$toTree(this.data);
          } else {
            this.loading = false;
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    clic(id, name, man, tel) {
      this.id = id;
      this.formLabelAlign.name = name;
      this.formLabelAlign.man = man;
      this.formLabelAlign.tel = tel;
      this.allot1 = true;
    },
    //确认修改
    edits() {
      if (
        this.formLabelAlign.name == "" ||
        this.formLabelAlign.man == "" ||
        this.formLabelAlign.tel == ""
      ) {
        this.$message({
          message: "参数不能为空",
          type: "warning"
        });
        return;
      }
      if(!this.$isTel(this.formLabelAlign.tel)){
	        this.$message.error('联系电话格式不正确，请输入正确的手机号或带区号的固定电话！');
	        this.formLabelAlign.tel='';
	        return false;
	    }
      this.loading = true;
      this.$post(api.editorg, {
        ID: this.id,
        OrgName: this.formLabelAlign.name,
        Principal: this.formLabelAlign.man,
        Tel: this.formLabelAlign.tel
      })
        .then(res => {
          if (res.state == 200) {
            this.loading = false;
            this.id = "";
            this.allot1 = false;
            this.orgetlist();
          } else {
            this.loading = false;
            this.allot1 = false;
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    dels(id) {
      this.$confirm("将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$get(api.delorg + "/" + id)
            .then(res => {
              if (res.data.state == 200) {
                this.loading = false;
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.orgetlist();
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
    }
  }
};
</script>

<style scoped>
.switch-list {
  margin: 20px 0;
  list-style: none;
  overflow: hidden;
}

.switch-item {
  margin: 20px;
  float: left;
}
</style>