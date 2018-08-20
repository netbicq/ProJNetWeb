<template>
	<div class="topBar clearfix">
		<div v-bind:class="{'logo': $store.state.isCollapse, 'logo1': !$store.state.isCollapse}">
            <img v-if="$store.state.isCollapse" src="../../../static/img/logo.png" alt="">
            <img v-if="!$store.state.isCollapse" src="../../../static/img/logo-single.png" alt="">
        </div>
		<div class="menus">
			<span @click="$store.commit('toggle')"></span>
		</div>
        <div class="info">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <span class="icon icon-user"></span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span @click="SetUpTip()">个人设置</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="LogOff()">注销</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog
            title="个人管理"
            :visible.sync="userTip"
            :show-close="false"
            :close-on-click-modal="false"
            :modal="false"
            width="400px">
            <el-tabs v-model="activeName">
              <el-tab-pane label="信息管理" name="info">
                  <el-form :label-position="labelPosition" label-width="100px" >
                    <el-form-item label="用户名：">
                      <el-input  placeholder="请输入用户名" v-model="user.Login" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：">
                      <el-input  placeholder="请输入姓名" v-model="user.CNName"></el-input>
                    </el-form-item>
                    <el-form-item label="电话：">
                      <el-input  placeholder="请输入电话" v-model="user.Tel"></el-input>
                    </el-form-item>
                    <el-form-item label="头像上传：">
                        <div class="uploads" style="width:178px">
                            <el-upload
                              class="avatar-uploader"
                              :action="actionUrl"
                              :show-file-list="false"
                              :headers="myHeaders"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload">
                              <img v-if="user.HeadIMG" :src="Host+user.HeadIMG" class="avatar">
                              <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 178px;"></i>
                            </el-upload>
                        </div>
                    </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="密码修改" name="pass">
                <el-form :label-position="labelPosition" label-width="100px" >
                    <el-form-item label="用户名：">
                      <el-input  placeholder="请输入用户名" v-model="user.Login" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="旧密码：">
                      <el-input  placeholder="请输入旧密码" v-model="user.OldPwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码：">
                      <el-input  placeholder="请输入新密码" v-model="user.NPwd" type="password"></el-input>
                    </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="fnCancel()" size="small">取 消</el-button>
                <el-button type="primary" @click="SetUp()" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改密码"
            :visible.sync="editPass"
            :show-close="false"
            :close-on-click-modal="false"
            :modal="false"
            width="400px">
            <el-form :label-position="labelPosition" label-width="100px" >
                <el-form-item label="用户名：">
                  <el-input  placeholder="请输入用户名" v-model="user.Login" disabled></el-input>
                </el-form-item>
                <el-form-item label="旧密码：">
                  <el-input  placeholder="请输入旧密码" v-model="user.OldPwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码：">
                  <el-input  placeholder="请输入新密码" v-model="user.NPwd" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="userTip = false" size="small">取 消</el-button> -->
                <el-button type="primary" @click="ConEditPass()" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <div class="mod" v-show="model">
        </div>
	</div>
</template>

<script>
import store from "@/vuex/store";
import Api from "../../axios/api";
export default {
  name: "topBar",
  data() {
    return {
      Host: Api.hostname,
      userTip: false,
      editPass: false,
      actionUrl: Api.files,
      imageUrl: "",
      labelPosition: "right",
      activeName: "info",
      model: false,
      myHeaders: {
        token: sessionStorage.token
      },
      user: {
        ID: "",
        Login: "",
        CNName: "",
        Tel: "",
        HeadIMG: "",
        OldPwd: "",
        NPwd: ""
      },
      UserProfile: "",
      userInfo: ""
    };
  },
  store,
  mounted() {
    this.UserProfile = JSON.parse(sessionStorage.UserProfile);
    this.userInfo = JSON.parse(sessionStorage.UserInfo);
    this.user.Login = this.UserProfile.Login;
    this.user.CNName = this.UserProfile.CNName;
    this.user.Tel = this.UserProfile.Tel;
    this.user.HeadIMG = this.UserProfile.HeadIMG;
    this.user.ID = this.userInfo.ID;
    this.fnJudge();
  },
  methods: {
    //判断是否是第一次登陆
    fnJudge() {
      this.$post(Api.checkuser, {})
        .then(res => {
          if (res.data.state == 200) {
            if (res.data.data) {
              this.$message({
                message: '首次登陆，请先修改密码！',
                type: 'warning'
              });
              $('body').css('overflow','hidden');//浮层出现时窗口不能滚动设置
              this.model = true;
              this.editPass = true;
            }else{
              $('body').css('overflow','auto');// 浮层关闭时滚动设置
              this.model = false;
              this.editPass=false;
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    ConEditPass() {
      if (this.user.OldPwd == "" || this.user.NPwd == "") {
        this.$message.error("密码不能为空");
        return false;
      }
      this.$post(Api.changepwd, {
        ID: this.user.ID,
        OldPwd: this.user.OldPwd,
        Pwd: this.user.NPwd
      })
        .then(res => {
          if (res.data.state == 200) {
            this.$message({
              message: "修改成功,请重新登陆！",
              type: "success"
            });
            $('body').css('overflow','auto');// 浮层关闭时滚动设置
            this.model = false;
            this.editPass = false;
            sessionStorage.clear();
            this.$router.push({
              path: "/"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    SetUpTip() {
      $('body').css('overflow','hidden');//浮层出现时窗口不能滚动设置
      this.model=true;
      this.userTip = true;
    },
    //取消
    fnCancel(){
      $('body').css('overflow','auto');// 浮层关闭时滚动设置
      this.model=false;
      this.userTip = false;
    },
    //个人设置
    SetUp() {
      $('body').css('overflow','auto');// 浮层关闭时滚动设置
      if (this.activeName == "info") {
        this.userTip = false;
        this.model=false;
        this.loading = true;
        this.$post(Api.setprofile, {
          Login: this.user.Login,
          CNName: this.user.CNName,
          Tel: this.user.Tel,
          HeadIMG: this.user.HeadIMG
        })
          .then(res => {
            this.loading = false;
            if (res.data.state == 200) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              sessionStorage.UserProfile = JSON.stringify(this.user);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            this.loading = false;
            this.$message.error(error);
          });
      } else if (this.activeName == "pass") {
        if (this.user.OldPwd == "" || this.user.NPwd == "") {
          this.$message.error("密码不能为空");
          return false;
        }
        this.userTip = false;
        this.model=false;
        this.loading = true;
        this.$post(Api.changepwd, {
          ID: this.user.ID,
          OldPwd: this.user.OldPwd,
          Pwd: this.user.NPwd
        })
          .then(res => {
            this.loading = false;
            if (res.data.state == 200) {
              this.$message({
                message: "修改成功,请重新登陆！",
                type: "success"
              });
              sessionStorage.clear();
              this.$router.push({
                path: "/"
              });
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            this.loading = false;
            this.$message.error(error);
          });
      }
    },
    //退出
    LogOff() {
      this.$post(Api.exituser)
        .then(res => {
          if (res.data.state == 200) {
            this.$router.push({
              path: "/"
            });
            sessionStorage.clear();
            sessionStorage.clear();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    handleAvatarSuccess(res, file) {
      this.user.HeadIMG = res.data.substring(2, res.data.length);
      this.$message({
        message: "上传成功",
        type: "success"
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传错误
    uploadError(response) {
      this.$message.error("上传头像失败！");
    }
  }
};
</script>

<style scoped>
.topBar {
  height: 55px;
  background-color: #23b7e5;
  background-image: linear-gradient(90deg, #23b7e5 0, #51c6ea);
  background-repeat: repeat-x;
  border: 0;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1999;
  box-sizing: border-box;
  box-shadow: 0px -13px 71px #888888;
}
.menus {
  float: left;
  width: 55px;
  height: 55px;
}
.menus span {
  display: inline-block;
  width: 20px;
  height: 3px;
  border-top: 9px double #ffffff;
  border-bottom: 3px solid #ffffff;
  margin-top: 19px;
}

.logo {
  width: 200px;
  height: 100%;
  text-align: center;
  float: left;
  position: relative;
  box-sizing: border-box;
  padding: 10px 15px;
  transition: all 0.2s ease;
}
.logo1 {
  width: 70px;
  text-align: center;
  float: left;
  /*margin-right: 60px;*/
  margin-top: 7px;
  position: relative;
  transition: all 0.2s ease;
}
.info {
  float: right;
  width: 80px;
  height: 55px;
}
.info span {
  position: relative;
  display: inline-block;
  color: #ffffff;
  margin-top: 8px;
  font-size: 16px;
}
.drop {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 1px solid #000;
}
.mod {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  position: fixed;
  z-index: 1;
}
.editpass {
  position: fixed;
  width: 400px;
  height: 325px;
  margin: auto;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  z-index: 2;
}
</style>