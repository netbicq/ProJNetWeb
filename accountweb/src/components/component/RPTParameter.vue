<template>
  <div class="content-wrapper">
      <div class="title clearfix">
          报表参数
      </div>
      <div class="content">
          <div class="panel">
            <div class="panel-heading clearfix">
                <h3>报表信息展示</h3>
                <label for="" class="fl">报表：</label>
                    <el-select v-model="paraValue" placeholder="请选择参数类型" class="fl">
                        <el-option
                        v-for="item in parameter"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
            </div>
            <div class="panel-body">
                <el-table :data="tableData1" stripe style="width: 100%" align="center">
                    <el-table-column prop="name" label="报表名称">
                    </el-table-column>
                    <el-table-column prop="type" label="数据源">
                    </el-table-column>
                    <el-table-column prop="title" label="作用域">
                    </el-table-column>
                    <el-table-column prop="classSource" label="状态">
                    </el-table-column>
                </el-table>
            </div>
          </div>
          <div class="panel">
               <div class="panel-body">
          <div class="panel">
            <div class="panel-heading clearfix">
                <button class="btn fl Green mini" @click="fnAdd1">新建</button>
                <div class="search clearfix fr">
                    <el-input v-model="search" placeholder="请输入关键字"></el-input>
                    <button class="btn Info mini">查询</button>
                    <button class="btn Primary mini">导出Execl</button>
                </div>
            </div>
          </div>
        <div class="panel">
            <div class="panel-body">
                <el-table :data="tableData1" stripe style="width: 100%" align="center">
                    <el-table-column prop="name" label="参数名">
                    </el-table-column>
                    <el-table-column prop="type" label="参数类型">
                    </el-table-column>
                    <el-table-column prop="title" label="参数标题">
                    </el-table-column>
                    <el-table-column prop="classSource" label="选择器源">
                    </el-table-column>
                    <el-table-column prop="classType" label="选择器值类型">
                    </el-table-column>
                    <el-table-column prop="className" label="选择器值名称">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-dropdown size="small"  trigger="click" type="primary">
                            <el-button type="primary" size="small" class="Info">
                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>
                                    <el-button size="mini" type="success">修改</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                    <el-button size="mini" type="danger">删除</el-button>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pages">
                    <el-pagination small :current-page="pages"  layout="prev, pager, next" :total="total" background>
                    </el-pagination>
                </div>
            </div>
        </div>
               </div>
          </div>
         
          <el-dialog
            title="新建"
            :visible.sync="addTip1"
            width="550px">
            <div class="tip ">
                <div class="row clearfix">
                    <label for="" class="fl">参数名：</label>
                    <input type="text" placeholder="请输入参数名" class="fl">
                </div>
                <div class="row clearfix">
                    <label for="" class="fl">参数类型：</label>
                    <el-select v-model="paraValue" placeholder="请选择参数类型" class="fl">
                        <el-option
                        v-for="item in parameter"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="row clearfix">
                    <label for="" class="fl">参数标题：</label>
                    <input type="text" placeholder="请输入参数标题" class="fl">
                </div>
                <div class="row clearfix" v-show="paraValue==6">
                    <label for="" class="fl">选择器源：</label>
                    <input type="text" placeholder="请输入选择器源" class="fl">
                </div>
                <div class="row clearfix">
                    <label for="" class="fl">选择器值类型：</label>
                    <el-select v-model="calssValue" placeholder="请选择选择器值类型" class="fl">
                        <el-option
                        v-for="item in classType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addTip1 = false" size="small">取 消</el-button>
                <el-button type="primary" @click="confirm" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="新建"
            :visible.sync="addTip2"
            width="550px">
            <div class="tip ">
                <div class="row clearfix">
                    <label for="" class="fl">选择器列名：</label>
                    <input type="text" placeholder="请输入选择器列名" class="fl">
                </div>
                <div class="row clearfix">
                    <label for="" class="fl">选择器列标题：</label>
                    <input type="text" placeholder="请输入选择器列标题" class="fl">
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addTip2 = false" size="small">取 消</el-button>
                <el-button type="primary" @click="confirm" size="small">确 定</el-button>
            </span>
        </el-dialog>
      </div>
  </div>
</template>
<script>
export default {
  name: "RPTParameter",
  data() {
    return {
      pages: 1, //翻页
      total: 20, //条数
      state: 1,
      search: "",
      addTip1: false,
      addTip2: false,
      tableData1: [
        {
          name: "参数名",
          type: "字符",
          title: "卡号",
          classSource: "选择器源",
          classType: "字符",
          className: "class"
        }
      ],
      tableData2: [
        {
          name: "列名",
          title: "标题"
        }
      ],
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
      ],
      paraValue: "",
      classType: [
        {
          value: "1",
          label: "字符"
        },
        {
          value: "2",
          label: "数字"
        },
        {
          value: "3",
          label: "ID"
        }
      ],
      calssValue: ""
    };
  },
  mounted() {
  },
  watch: {
    search: function(val, oldVal) {
      this.tableData1 = this.tableData1.filter(item => ~item.name.indexOf(val));
    }
  },
  methods: {
    //新建弹窗
    fnAdd1() {
      this.addTip1 = true;
    },
    fnAdd2() {
      this.addTip2 = true;
    },
    //确人新建
    confirm() {
      this.addTip1 = false;
    }
  }
};
</script>
<style scoped>

</style>
