<template>
    <div class="container">
        <div class="statusbar clearfix">
            <div class="w25 back" @click="fnBack()">
                <img src="../../assets/icon/back@2x.png" alt="">
                <span>返回</span>
            </div>
            <div class="w50 topcenter">
                <span>信息上报</span>
            </div>
            <div class="w25">
                <!-- <img src="../../assets/icon/back@2x.png" alt=""> -->
            </div>
        </div>
        <div class="wrap" style="margin-top: 3.3rem;">
            <div class="content">
                <div class="row clearfix">
                    <label for="" class="label">电话</label>
                    <input type="text" placeholder="请输入电话号码" v-model="tel">
                </div>
                <div class="row clearfix">
                    <label for="" class="label">密码</label>
                    <input type="password" placeholder="请输入密码" v-model="pass">
                </div>
            </div>
             <div class="btn">
                <button @click="fnSubmit()">登陆</button>
            </div>
        </div>
    </div>
</template>
<script>
import Api from "../../kites/api";
export default {
  name: "InfoReport",
  data() {
    return {
    	tel:'',
    	pass:''
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
    fnSubmit(){
    	
        this.$router.push({ path: "/InfoReports" });
    }
  }
};
</script>
<style scoped>
.wrap {
  padding-bottom: 0;
}
.wrap .row {
  width: 100%;
  line-height: 3.3rem;
  border-bottom: 1px solid #c9c9ca;
}
.wrap .row .label {
  display: inline-block;
  width: 4rem;
  float: left;
  text-align: left;
  font-size: 1.3rem;
  color: #5a5959;
}
.wrap .row input {
  box-sizing: border-box;
  width: calc(100% - 4.1rem);
  height: 2.5rem;
  border-radius: .4rem;
  outline: none;
  border: none;
  font-size: 1.25rem;
}
.wrap .btn {
  width: 100%;
}
.wrap .btn button {
  width: 70%;
  font-size: 1.25rem;
  padding: .8rem 0;
  outline: none;
  border: none;
  color: #ffffff;
  border-radius: .4rem;
  background-color: #39589e;
  margin: 1.6rem 0;
}
</style>


