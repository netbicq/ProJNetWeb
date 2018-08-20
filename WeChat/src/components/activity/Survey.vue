<template>
    <div class="container">
        <div class="statusbar clearfix">
            <div class="w25 back" @click="fnBack()">
                <img src="../../assets/icon/back@2x.png" alt="">
                <span>返回</span>
            </div>
            <div class="w50 topcenter">
                <span>需求调研</span>
            </div>
            <div class="w25">
                <!-- <img src="../../assets/icon/back@2x.png" alt=""> -->
            </div>
        </div>
        <div class="wrap" style="margin-top: 3.3rem;">
            <ul>
                <li>
                    <p>1.你觉得离婚后孩子抚养权的归谁？</p>
                    <el-radio-group v-model="radios1">
                        <el-radio :label="1">男方所有</el-radio>
                        <el-radio :label="2">女方所有</el-radio>
                        <el-radio :label="3">协商解决</el-radio>
                    </el-radio-group>
                </li>
                <li>
                    <p>2.离婚后可以重新分割财产吗，离婚后怎么重新分割？</p>
                    <el-radio-group v-model="radios2">
                        <el-radio :label="1">男方所有</el-radio>
                        <el-radio :label="2">女方所有</el-radio>
                        <el-radio :label="3">协商解决</el-radio>
                    </el-radio-group>
                </li>
                <li>
                    <p>3.消费者维护自身权益时如何收集证据？</p>
                    <el-radio-group v-model="radios3">
                        <el-radio :label="1">男方所有</el-radio>
                        <el-radio :label="2">女方所有</el-radio>
                        <el-radio :label="3">协商解决</el-radio>
                    </el-radio-group>
                </li>
                <li>
                    <p>4.未婚妈妈同样享受妇女保护法吗</p>
                    <el-radio-group v-model="radios4">
                        <el-radio :label="1">男方所有</el-radio>
                        <el-radio :label="2">女方所有</el-radio>
                        <el-radio :label="3">协商解决</el-radio>
                    </el-radio-group>
                </li>
            </ul>
            <div class="btn">
                <button>提交</button>
            </div>
        </div>
    </div>
</template>
<script>
import Api from "../../kites/api";
export default {
  name: "Survey",
  data() {
    return {
      radios1: 1,
      radios2: 1,
      radios3: 1,
      radios4: 1
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
    }
  }
};
</script>
<style scoped>
.wrap {
  padding-bottom: 0;
}
.wrap ul {
  width: 100%;
}
.wrap ul li {
  width: 100%;
  margin-top: .4rem;
  background-color: #ffffff;
  padding: .8rem 1.6rem;
  box-sizing: border-box;
}
.wrap ul li p {
  display: inline-block;
  width: 100%;
  text-align: left;
  font-size: 1.3rem;
  color: #595757;
  margin-bottom: .4rem;
}
.el-radio-group {
  width: 100% !important;
}
.el-radio-group label {
  width: 100%;
  display: inline-block;
  text-align: left;
  line-height: 2.5rem;
  margin-left: .8rem;
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


