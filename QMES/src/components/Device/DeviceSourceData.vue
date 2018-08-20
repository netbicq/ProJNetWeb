<template>
	<div v-loading='loading'>
		<div class="title">
			<span class="h1">设备管理</span>
			<span class="h2">设备源数据</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<div class="inBook zy">
					<span class="span1">时间</span>
					<el-date-picker class='tied' v-model="starTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
					</el-date-picker>
				</div>
				<div class="fr">
					<el-input v-model="inputs" placeholder="请输入设备ID" style="width:217px;"></el-input>
					<el-button type="primary" @click="filter()">查询</el-button>
					<el-button type="success" @click='excel()'>导出Excel</el-button>
				</div>
			</div>
		</div>
		<div class="tables">
			<el-table :data="tableData" :expand-row-keys="expands"  :row-key="getRowKeys" stripe style="width: 100%" @expand-change='expand'>
				<el-table-column type="expand">
			      <template slot-scope="props">
			      	<el-table :data="infos" border>
								<el-table-column type="index"	width="50">
								</el-table-column>
			      		<el-table-column prop="Name" label="名称">
								</el-table-column>
								<el-table-column prop="Code" label="卡号">
								</el-table-column>
								<el-table-column prop="BuType" label="类型">
								</el-table-column>
			      	</el-table>
			      	<!--<el-form label-position="left" inline class="demo-table-expand" v-for='(item,index) in infos' :key='index'>
			          <el-form-item label="名称:">
			            <span>{{item.Name}}</span>
			          </el-form-item>
			          <el-form-item label="卡号:">
			            <span>{{item.DevData?item.DevData.BusinessCode:''}}</span>
			          </el-form-item>
			          <el-form-item label="类型:">
			            <span>{{item.BuType}}</span>
			          </el-form-item>
			        </el-form>-->
			      </template>
			    </el-table-column>
				<el-table-column prop="devinfo.LocalName" label="本地名称">
				</el-table-column>
				<el-table-column prop="devinfo.DeviceID" label="设备ID">
				</el-table-column>
				<el-table-column prop="devinfo.LocalCode" label="本地编号">
				</el-table-column>
				<el-table-column prop="DevSouce.RealTime" label="时间">
				</el-table-column>
				<el-table-column prop="DevSouce.Amount" label="数量">
				</el-table-column>
			</el-table>
			<div class="pages">
				<el-pagination @size-change="handleSizeChange" :page-sizes="[10,20,30,40,50]" :page-size="pagesizs" :current-page="pages" @current-change="handleCurrentChange" layout="sizes,prev, pager, next" :total="total" background>
				</el-pagination>
			</div>
		</div>
		<el-dialog title="核算" :visible.sync="adds1" width="20%">
			<el-form ref="formLabelAlign" :model="formLabelAlign" label-width="100px">
				<el-form-item label="核算月度：">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="组织架构">
					<el-select class='se' v-model="staffNum" placeholder="请选择">
						<el-option v-for="item in staffs" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="职员">
					<el-select class='se' v-model="staffNum" placeholder="请选择">
						<el-option v-for="item in staffs" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="">
					<el-checkbox v-model="formLabelAlign.checked">覆盖已有数据</el-checkbox>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="adds1 = false">取 消</el-button>
				<el-button size="small" type="primary" @click="update()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import api from "../../axios/api.js";
export default {
  name: "DeviceSourceData",
  data() {
    return {
      loading: false,
      adds1: false,
      staffs: [], //电子卡号
      staffNum: "",
      options: [],
      value: "",
      SpecID:'',
      Speclist:[],
      pages: 1, //页码
      total: 1, //页数
      pagesizs:10,
      tableData: [], //卡片列表
      inputs: "", //搜索
      formLabelAlign: {
        name: "",
        checked: false
      },
      formInline: {
        starTime: "",
        endTime: ""
      },
      starTime:'',
      msgID:'',
      infos:[],
      getRowKeys(row) {
            return row.DevSouce.MsgID;
      },
      expands: [],
    };
  },
  created() {
    this.getlistsou(this.pages,this.inputs,this.pagesizs,this.starTime);
    this.proceselector()
    this.sepcselector()
  },
  methods: {
	expand(row){
		if(row.DevSouce.MsgID==this.expands[0]){
			this.expands =[]
			return
		}
		this.expands = [];
        this.expands.push(row.DevSouce.MsgID);
		this.msgID = row.DevSouce.MsgID
		this.loading =true
		this.$get(api.getlistdata+'/'+ this.msgID).then(res=>{
  			if(res.data.state==200){
  				this.loading =false
  				this.infos = res.data.data
  			}else{
  				this.loading =false
  				this.$message.error(res.data.msg);
  			}
  		})
	},
  	//获取工艺选择器
  	proceselector(){
  		this.$get(api.proceselector).then(res=>{
  			if(res.data.state==200){
  				this.options = res.data.data
  			}else{
  				this.$message.error(res.data.msg);
  			}
  		})
  	},
  	//获取规格选择器
  	sepcselector(){
  		this.$get(api.sepcselector).then(res=>{
  			if(res.data.state==200){
  				this.Speclist = res.data.data
  			}else{
  				this.$message.error(res.data.msg);
  			}
  		})
  	},
    //获取源数据
    getlistsou(page,val,pagesizes,datas) {
      this.loading = true;
      this.$post(api.getlistsou, {
        PageSize: pagesizes,
        PageIndex: page-1,
        KeyWord: val,
        Query: {
          "BusinessID": "",
	      "MsgID": "",
	      "time": datas
        },
        OrderString: "",
        ToExcel: false
      }).then(res => {
        if(res.state==200){
        	this.loading = false;
        	this.total = res.data.Items ? res.data.Items : 1;
        	this.tableData = res.data.Data;
        }else {
	        this.loading = false;
	        this.$message.error(res.msg);
	    }
       
      });
    },
    handleSizeChange(val){
    	this.pagesizs = val
    	this.getlistsou(this.pages,this.inputs,this.pagesizs,this.starTime);
    },
    handleCurrentChange(val) {
    	 this.pages = val
    	 this.getlistsou(this.pages,this.inputs,this.pagesizs,this.starTime);
    },
    filter(){
    	this.pages = 1
    	this.getlistsou(this.pages,this.inputs,this.pagesizs,this.starTime);
    },
    excel(){
    	this.loading = true;
      this.$post(api.getlistsou, {
        PageSize: this.pagesizs,
        PageIndex: this.pages-1,
        KeyWord: this.inputs,
        Query: {
          "BusinessID": "",
	      "MsgID": "",
	      "time": this.starTime
        },
        OrderString: "",
        ToExcel: true
      }).then(res => {
        if(res.state==200){
        	this.loading = false;
        	if (res.data.ExcelResult && res.data.ExcelResult.length!=0) {
				var urls = res.data.ExcelResult
				window.location.href = api.hostname+urls
            }
        }else {
	        this.loading = false;
	        this.$message.error(res.msg);
	    }
       
      });
    },
    //核算弹框
    hesuan() {
      this.adds1 = true;
    },
    //确认核算
    update() {
      this.adds1 = false;
    }
  }
};
</script>
<style scoped="">
</style>