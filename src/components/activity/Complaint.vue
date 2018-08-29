<template>
    <div class="container">
        <div class="statusbar clearfix">
            <div class="w25 back" @click="fnBack()">
                <img src="../../assets/icon/back@2x.png" alt="">
                <span>返回</span>
            </div>
            <div class="w50 topcenter">
                <span>投诉建议</span>
            </div>
            <div class="w25">
                <span class="topsub" @click="fnSubmit">提交</span>
            </div>
        </div>
        <div class="wrap" style="margin-top: 3.3rem;">
            <div class="content">
                <label for=""  class="label" style="width:100%;">投诉建议<span class="red">*</span></label>
                <textarea name="" id=""  rows="8" placeholder="请输入您的投诉建议"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
import Api from "../../kites/api";
export default {
  name: "Complaint",
  data() {
    return {};
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
    //提交投诉建议
    fnSubmit() {}
  }
};
</script>
<style scoped>
.wrap {
  padding-bottom: 0;
}
.wrap .content {
  margin-top: .4rem;
  min-height: 16rem;
}
.wrap .content .label {
  display: inline-block;
  width: 8.3rem;
  float: left;
  text-align: left;
  font-size: 1.3rem;
  color: #5a5959;
}
.wrap .content textarea {
  outline: none;
  border: none;
  width: 100%;
  font-size: 1.25rem;
}
</style>


