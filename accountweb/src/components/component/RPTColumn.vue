<template>
  <div class="content-wrapper">
      <div class="title clearfix">
          报表列
          
      </div>
      <div class="content">
          <div class="panel">
            <div class="panel-heading clearfix">
                <button class="btn fl Green mini" @click="fnAdd">新建</button>
                <div class="search clearfix fr">
                    <el-input v-model="search" placeholder="请输入关键字"></el-input>
                    <button class="btn Info mini">查询</button>
                    <button class="btn Primary mini">导出Execl</button>
                </div>
            </div>
          </div>
        <div class="panel">
            <div class="panel-body">
                <el-table :data="tableData" stripe style="width: 100%" align="center">
                    <el-table-column prop="name" label="列名">
                    </el-table-column>
                    <el-table-column prop="title" label="列标题">
                    </el-table-column>
                    <el-table-column prop="type" label="数据类型">
                    </el-table-column>
                    <el-table-column prop="order" label="列顺序">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                                    <el-button size="mini" type="success">修改</el-button>
                                    <el-button size="mini" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pages">
                    <el-pagination small :current-page="pages"  layout="prev, pager, next" :total="total" background>
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog
            title="新建"
            :visible.sync="addTip"
            width="550px">
            <div class="tip ">
                <div class="row clearfix">
                    <label for="" class="fl">列名：</label>
                    <input type="text" placeholder="请输入列名" class="fl">
                </div>
                <div class="row clearfix">
                    <label for="" class="fl">列标题：</label>
                    <input type="text" placeholder="请输入列标题" class="fl">
                </div>
                <div class="row clearfix">
                    <label for="" class="fl">数据类型：</label>
                    <el-select v-model="typeValue" placeholder="请选择数据类型" class="fl">
                        <el-option
                        v-for="item in dataType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="row clearfix">
                    <label for="" class="fl">列顺序：</label>
                    <input type="text" placeholder="请输入列顺序" class="fl">
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addTip = false" size="small">取 消</el-button>
                <el-button type="primary" @click="confirm" size="small">确 定</el-button>
            </span>
        </el-dialog>
      </div>
  </div>
</template>
<script>
export default {
  name: "RPTColumn",
  data() {
    return {
      pages: 1, //翻页
      total: 20, //条数
      state: 1,
      search: "",
      addTip: false,
      tableData: [
        {
          name: "列名",
          title: "列标题",
          type: "字符",
          order: "1"
        }
      ],
      dataType: [
        {
          value: "1",
          label: "字符"
        },
        {
          value: "2",
          label: "整数"
        },
        {
          value: "3",
          label: "数字"
        },
        {
          value: "4",
          label: "日期"
        },
        {
          value: "5",
          label: "布尔"
        }
      ],
      typeValue: ""
    };
  },
  mounted() {},
  methods: {
    fnAdd() {
      this.addTip = true;
    },
    //确人新建
    confirm() {
      this.addTip = false;
    }
  }
};
</script>
<style scoped>

</style>
