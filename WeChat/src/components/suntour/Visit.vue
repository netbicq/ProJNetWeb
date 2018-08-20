<template>
    <div class="container" v-loading = loading>
        <div class="statusbar clearfix">
            <div class="w25 back" @click="fnBack">
                <img src="../../assets/icon/back@2x.png" alt="">
                <span>返回</span>
            </div>
            <div class="w50 topcenter">
                <span>接受走访</span>
            </div>
            <div v-if='unbind' class="w25" @click="CreateVisitRecord">
                <span class="topsub">提交</span>
            </div>
             <div v-else="" class="w25">
                <span class="topsub">提交</span>
            </div>
        </div>
        <div class="wrap" style="margin-top: 3.3rem;">
            <div class="content">
                <div class="row clearfix">
                    <label for="" class="label">走访人</label>
                    <input type="text" v-model="persons" placeholder="请输入走访人">
                </div>
                <div class="row clearfix">
                    <label for="" class="label">时间</label>
                    <input type="date" v-model="dates" placeholder="请选择时间">
                </div>
                <div class="row clearfix">
                    <label for="" class="label">地点</label>
                    <input type="text" v-model="adds" placeholder="请输入地点">
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import Api from "../../kites/api";
export default {
  name: "Visit",
  data() {
    return {
    	loading:false,
    	persons:'',//走访人
    	dates:'',//时间
    	adds:'',//地址
    	unbind:true
    };
  },
  beforeCreate() {
			this.openIds()
		},
  mounted() {},
  methods: {
    //返回上一页
    fnBack() {
      this.$router.go(-1);
    },
    //提交走访记录
    CreateVisitRecord(){
    	if(this.dates==''|| this.adds=='' ||this.persons==''){
			this.$message.error('提交参数不能为空');
			return false
		}
    	this.unbind = false
    	this.loading = true
    	this.$post(Api.CreateVisitRecord,{
		  "visitPerson": this.persons,
		  "visitTime": this.dates,
		  "visitAddress": this.adds
		}).then(res=>{
			if(res.data.success == true){
				this.fnBack()
			}else{
				this.unbind = true
    			this.loading = false
				this.$message.error(res.data.error);
			}
		})
    },
  }
};
</script>
<style scoped>
.topsub {
  color: #000;
  font-size: 1.25rem;
  display: inline-block;
}
.wrap {
  padding-bottom: 0;
}

.wrap .row {
  width: 100%;
  line-height: 3.3rem;
  border-bottom: 1px solid #c9c9ca;
}
.wrap .row:last-child {
  border-bottom: none;
}
.wrap .row .label {
  display: inline-block;
  width: 10rem;
  float: left;
  text-align: left;
  font-size: 16px;
  color: #5a5959;
}
.wrap .row input {
  box-sizing: border-box;
  width: calc(100% - 10.1rem);
  height: 2.5rem;
  border-radius: .4rem;
  outline: none;
  border: none;
  font-size: 1.25rem;
}

.wrap .row select {
  box-sizing: border-box;
  width: calc(100% - 10.1rem);
  height: 2.5rem;
  border-radius: .4rem;
  outline: none;
  border: none;
  font-size: 1.25rem;
}
</style>


