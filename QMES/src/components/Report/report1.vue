<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">报表管理</span>
			<span class="h2">{{titles}}</span>
		</div>
		<div class="tables" v-if='shows'>
			<div class="clearfix">
				<div class="boxs clearfix">
					<div v-for='(item,index) in Parameters' :key="index">
						<span>{{item.ParameterCaption}}</span>
						<div>
							<el-input v-model="item.ParameterValue" clearable placeholder="请输入内容" v-if='item.ParameterType == 1'></el-input>
							<el-input-number v-model="item.ParameterValue" controls-position="right" @change="handleChange" :min="1" :max="1000000" v-if='item.ParameterType == 2'></el-input-number>
							<el-input v-model="item.ParameterValue" clearable placeholder="请输入数字" v-if='item.ParameterType == 3'></el-input>
							<el-date-picker class='times' v-model="item.ParameterValue" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" v-if='item.ParameterType == 4'>
							</el-date-picker>
							<el-checkbox class='bool' v-model="item.ParameterValue" v-if='item.ParameterType == 5'></el-checkbox>
							<el-select class='selects' v-model="item.ParameterValue" placeholder="请选择" v-if='item.ParameterType == 6'>
								<el-option v-for="item in item.DataSource" :key="item.ID" :label="item.Name" :value="item.ID">
								</el-option>
							</el-select>
						</div>
					</div>
				</div>
				<el-button type="primary" class='searchs' size="small" @click="search()">查询</el-button>
				<!--<div class="fr">
					<el-input v-model="inputs" placeholder="请输入用户名" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
				</div>-->
			</div>
		</div>
		<el-button style='margin-bottom: 20px;' v-else type="success" size="mini" @click='set()'>设置参数</el-button>
		<div class="tables" v-if='tableshows'>
			<table class='htable' cellspacing="0" cellpadding="0" border="0" style="width:100%;">
				<thead>
					<tr>
						<th v-for="(item,index) in theaed" :key="index">{{item.ColumnCaption}}</th>
						<th v-if='childrens.length!= 0'>操作</th>
					</tr>
				</thead>
				<tbody class="tbody">
					<tr v-for="(p,index) in tbody" :key="index">
						<td v-for="(item,index) in theaed" :key="index">{{p[item.ColumnName]}}</td>
						<td v-if='childrens.length!= 0'>
              <button class="detailBtn"  @click="detail(index,$event)">明细</button>
							<!-- <el-button type="primary" size="small">明细</el-button> -->
						</td>
					</tr>
          <tr class="adtr" v-show="isShow">
            <td :colspan="theaed.length+1"  v-if='childrens.length!= 0' >
              <div class="tables">
                <el-tabs v-model="activeName">
                  <el-tab-pane :label="item.TableInfo.ChildeCaption" :name="index.toString()" v-for="(item,index) in childrens" :key="index">
                    <table class='htable' cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                      <thead>
                        <tr>
                          <th v-for="(col,index) in item.TableColumns" :key="index">{{col.ColumnCaption}}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(p,index) in childDataBody[index]" :key="index">
                          <td v-for="(list,index) in item.TableColumns" :key="index">{{p[list.ColumnName]}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </td> 
          </tr>
				</tbody>
			</table>
			<div class="pages">
				<el-pagination small :current-page="pages" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" background>
				</el-pagination>
			</div>
		</div>
		
		<el-dialog title="设置参数" :visible.sync="adds2" width="600px">
			<div class="boxs boxs1 clearfix">
				<div v-for='(item,index) in Parameters' :key="index">
					<span>{{item.ParameterCaption}}</span>
					<div>
						<el-input v-model="item.ParameterValue" clearable placeholder="请输入内容" v-if='item.ParameterType == 1'></el-input>
						<el-input-number v-model="item.ParameterValue" controls-position="right" @change="handleChange" :min="1" :max="1000000" v-if='item.ParameterType == 2'></el-input-number>
						<el-input v-model="item.ParameterValue" clearable placeholder="请输入数字" v-if='item.ParameterType == 3'></el-input>
						<el-date-picker class='times' v-model="item.ParameterValue" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" v-if='item.ParameterType == 4'>
						</el-date-picker>
						<el-checkbox class='bool' v-model="item.ParameterValue" v-if='item.ParameterType == 5'></el-checkbox>
						<el-select v-model="item.ParameterValue" placeholder="请选择" v-if='item.ParameterType == 6'>
							<el-option v-for="item in item.DataSource" :key="item.ID" :label="item.Name" :value="item.ID">
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="adds2 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="updateuser()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import api from "../../axios/api";
export default {
  name: "report1",
  data() {
    return {
      activeName: "0",
      pages: 1,
      total: 1,
      adds2: false,
      loading: false,
      titles: "",
      id: "",
      Parameters: [],
      theaed: [],
      tbody: [],
      shows: true,
      childrens: [],
      childDataBody: [],
      tableshows: false,
      isShow: false
    };
  },
  watch: {
    $route(to, from) {
      if (to.fullPath !== from.fullPath) {
        this.getreport();
        this.shows = true;
        this.theaed = [];
        this.tbody = [];
        this.pages = 1;
        this.total = 1;
        this.tableshows=false;
        this.childrens = [];
      }
    }
  },
  created() {
    this.getreport();
  },
  methods: {
    set() {
      this.shows = true;
    },
    getreport() {
      this.$get(api.getreport + "/" + this.$route.params.id).then(res => {
        console.log(res)
        if (res.data.state == 200) {
          this.titles = res.data.data["ReportInfo"]?res.data.data["ReportInfo"].ReportName:"";
          this.id = res.data.data["ReportInfo"]?res.data.data["ReportInfo"].ID:'';
          this.Parameters = res.data.data.Parameters;
          for (let i = 0; i < this.Parameters.length; i++) {
            if (this.Parameters[i].ParameterType == 5) {
              var types = this.Parameters[i];
              var p = this.Parameters.splice(i, 1);
              this.Parameters.push(types);
            }
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleChange(value) {
      console.log(value);
    },
    updateuser() {
      this.pages = 1;
      this.loading = true;
      this.$post(api.execreport, {
        PageSize: 10,
        PageIndex: this.pages - 1,
        KeyWord: "",
        Query: {
          ReprotID: this.$route.params.id,
          Parameters: this.Parameters
        },
        OrderString: "",
        ToExcel: false
      }).then(res => {
        if (res.state == 200) {
          this.loading = false;
          this.adds2 = false;
          this.theaed = res.data.ReportColumns;
          this.tbody = res.data.ReprotData.Data;
          this.total = res.data.ReprotData.Items
            ? res.data.ReprotData.Items
            : 1;
          this.childrens = res.data.ChildeTables;
        } else {
          this.loading = false;
          this.adds2 = false;
          this.$message.error(res.msg);
        }
      });
    },
    handleCurrentChange(val) {
      this.pages = val;
      this.loading = true;
      this.$post(api.execreport, {
        PageSize: 10,
        PageIndex: this.pages - 1,
        KeyWord: "",
        Query: {
          ReprotID: this.$route.params.id,
          Parameters: this.Parameters
        },
        OrderString: "",
        ToExcel: false
      }).then(res => {
        if (res.state == 200) {
          this.loading = false;
          this.theaed = res.data.ReportColumns;
          this.tbody = res.data.ReprotData.Data;
          this.total = res.data.ReprotData.Items
            ? res.data.ReprotData.Items
            : 1;
          this.childrens = res.data.ChildeTables;
        } else {
          this.loading = false;
          this.$message.error(res.msg);
        }
      });
    },
    search() {
      this.pages = 1;
      this.loading = true;
      this.$post(api.execreport, {
        PageSize: 10,
        PageIndex: this.pages - 1,
        KeyWord: "",
        Query: {
          ReprotID: this.$route.params.id,
          Parameters: this.Parameters
        },
        OrderString: "",
        ToExcel: false
      }).then(res => {
        if (res.state == 200) {
          this.shows = false;
          this.loading = false;
          this.isShow = false;
          this.tableshows = true;
          this.theaed = res.data.ReportColumns;
          this.tbody = res.data.ReprotData.Data;
          console.log(this.theaed)
          console.log(this.tbody)
          this.total = res.data.ReprotData.Items
            ? res.data.ReprotData.Items
            : 1;
          this.childrens = res.data.ChildeTables;
        } else {
          this.loading = false;
          this.$message.error(res.msg);
        }
      });
    },
    detail(index, event) {
      this.isShow = !this.isShow;
      let tr = event.target.parentNode.parentNode;
      $(".adtr").insertAfter(tr);

      this.activeName = "0";
      this.childDataBody = [];
      let MasterKeyColumnValue;
      let ChildeKeyColumnValue;
      var arr = [];
      for (let i = 0; i < this.childrens.length; i++) {
        for (let j = 0; j < this.tbody.length; j++) {
          if (
            this.tbody[index].CardCode ==
            this.tbody[j][this.childrens[i].TableInfo.MasterKeyColumn]
          ) {
            MasterKeyColumnValue = this.tbody[j][
              this.childrens[i].TableInfo.MasterKeyColumn
            ];
          }
        }
        for (let x = 0; x < this.childrens[i].TableData.length; x++) {
          if (
            MasterKeyColumnValue ==
            this.childrens[i].TableData[x][
              this.childrens[i].TableInfo.ChildeKeyColumn
            ]
          ) {
            arr.push(this.childrens[i].TableData[x]);
          }
        }
        this.childDataBody.push(arr);
        
        arr = [];
      }
    }
  }
};
</script>

<style>
.boxs > div {
  width: 40%;
  float: left;
  height: 30px;
  margin-bottom: 20px;
}

.boxs > div:nth-of-type(2n) {
  float: right;
}

.searchs {
  float: right;
}

.boxs > div > span {
  width: 75px;
  float: left;
  text-align: right;
  padding-right: 10px;
  line-height: 30px;
}

.boxs > div > div {
  float: left;
  width: calc(100% - 85px);
}
.boxs > div > div .el-date-editor.el-input {
  width: 100%;
}
.bool {
  margin-top: 6px;
}
.htable {
  color: #606266;
  margin: auto;
  border-collapse: collapse;
  font-size: 12px;
  table-layout: fixed;
}
.htable td,
.htable th {
  text-align: center;
  padding: 5px;
  border: 1px solid #ebeef5;
}
.boxs1 > div {
  width: 50%;
}
.detailBtn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #23b7e5;
  color: #fff;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  padding: 7px 12px;
  font-size: 14px;
  border-radius: 4px;
  background-color: #23b7e5;
}

.adtr .el-tabs{
  max-height:600px;
  overflow-y: auto;
}
.adtr .el-tabs::-webkit-scrollbar {
 width: 8px;
}
.adtr .el-tabs::-webkit-scrollbar-track {
 background-color:#cfdbe2;
 -webkit-border-radius: 2em;
 -moz-border-radius: 2em;
 border-radius:2em;
}
.adtr .el-tabs::-webkit-scrollbar-thumb {
 background-color:#cfdbe2;
 -webkit-border-radius: 2em;
 -moz-border-radius: 2em;
 border-radius:2em;
}
</style>