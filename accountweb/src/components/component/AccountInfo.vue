<template>
  <div class="content-wrapper">
      <div class="title">
          账套信息
      </div>
      <div class="content">
          <div class="panel">
            <div class="panel-heading">
            </div>
            <div class="panel-body clearfix">
                <div class="row w50 fl">
                    <label for="">账套编号：</label>
                    <input type="text" v-model="accountInfo.AccountCode" style="background-color: #ccc;" placeholder="请输入账套编号" disabled>
                </div>
                <div class="row w50 fr">
                    <label for="">账套名称：</label>
                    <input type="text"  v-model="accountInfo.AccountName" placeholder="请输入单位名称">
                </div>
                <div class="row w50 fl">
                    <label for="">账套简称：</label>
                    <input type="text" v-model="accountInfo.ShortName" placeholder="请输入简称">
                </div>
                <div class="row w50 fr">
                    <label for="">账套备注：</label>
                    <input type="text" v-model="accountInfo.Memo" placeholder="请输入备注">
                </div>
                <el-button type="" class="Info fr" size="mini" @click="fnSaveInfo()">保存</el-button>
            </div>
          </div>
          <div class="tab">
            <el-tabs type="border-card">
                <el-tab-pane label="数据库配置">
                    <div class="row w50 fl">
                        <label for="">数据库服务器：</label>
                        <input type="text" v-model="dataBase.DBServer" placeholder="请输入数据库服务器">
                    </div>
                    <div class="row w50 fr">
                        <label for="">数据库名：</label>
                        <input type="text" v-model="dataBase.DBName" placeholder="请输入数据库名">
                    </div>
                    <div class="row w50 fl">
                        <label for="">数据库用户名：</label>
                        <input type="text" v-model="dataBase.DBUid" placeholder="请输入数据库用户名">
                    </div>
                    <div class="row w50 fr">
                        <label for="">数据库密码：</label>
                        <input type="password" v-model="dataBase.DBPwd" placeholder="请输入数据库密码">
                    </div>
                    <el-button type="" class="Info fr" size="mini" @click="fnSaveDB">保存</el-button>
                    <!-- <button class="btn small Info fr" style="margin-right:20px;">保存</button> -->
                    <!-- 如果账套状态为已创建数据，则禁用按钮 -->
                    <el-button type="" class="Info fr" size="mini"  style="margin-right:20px;" :disabled="dataBase.State==3" @click="fnCreateDB()">创建数据库</el-button>
                    <!-- <button class="btn small Info fr" style="margin-right:20px;" disabled>创建数据库</button> -->
                </el-tab-pane>
                <el-tab-pane label="MQTT配置">
                    <div class="row w50 fl">
                        <label for="">MQTT服务器：</label>
                        <input type="text"  v-model="Mqtt.MQTTServer" placeholder="请输入MQTT服务器">
                    </div>
                    <div class="row w50 fr">
                        <label for="">MQTT用户名：</label>
                        <input type="text" v-model="Mqtt.MQTTUid" placeholder="请输入MQTT用户名">
                    </div>
                    <div class="row w50 fl">
                        <label for="">MQTT密码：</label>
                        <input type="password" v-model="Mqtt.MQTTPwd" placeholder="请输入MQTT密码">
                    </div>
                    <div class="row w50 fr">
                        <label for="">设备休眠时间：</label>
                        <input type="number" v-model="Mqtt.mins" placeholder="请输入设备休眠时间">
                    </div>
                    <button class="btn small Info fr" style="margin-right:20px;" @click="fnSaveMQTT">保存</button>
                </el-tab-pane>
                <el-tab-pane label="基本信息">
                    <div class="row w50 fl">
                        <label for="">负责人姓名：</label>
                        <input type="text" v-model="userInfo.Principal" placeholder="请输入负责人姓名">
                    </div>
                    <div class="row w50 fr">
                        <label for="">负责人电话：</label>
                        <input type="text" v-model="userInfo.Tel" placeholder="请输入负责人电话">
                    </div>
                    <div class="row w50 fl">
                        <label for="">有效期：</label>
                        <el-date-picker  v-model="userInfo.ValidDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="请选择日期">
                        </el-date-picker>
                        <!-- <input type="text" v-model="userInfo.ValidDate" placeholder="请输入有效期"> -->
                    </div>
                    <div class="row w50 fr">
                        <label for="">联系地址：</label>
                        <input type="text" v-model="userInfo.Address" placeholder="请输入联系地址">
                    </div>
                    <div class="row w50 fl">
                        <label for="">负责人EMail：</label>
                        <input type="text" v-model="userInfo.EMail" placeholder="请输入负责人EMail">
                    </div>
                    <div class="row w50 fr">
                        <label for="">Token有效期：</label>
                        <input type="text" v-model="userInfo.TokenValidTimes" placeholder="请输入Token有效时长">
                    </div>
                    <button class="btn small Info fr" style="margin-right:20px;" @click="fnSaveInfo">保存</button>
                </el-tab-pane>
            </el-tabs>
          </div>
      </div>
  </div>
</template>
<script>
import Api from "../../axios/api";
export default {
  name: "AccountInfo",
  data() {
    return {
      pages: 1, //翻页
      total: 20, //条数
      state: 1,
      search: "",
      ID: "",
      Data: "",
      accountInfo: {
        AccountCode: "",
        AccountName: "",
        ShortName: "",
        Memo: ""
      }, //账套信息
      userInfo: {
        Principal: "",
        Tel: "",
        ValidDate: "",
        EMail: "",
        Address: "",
        TokenValidTimes:''
      }, //基本信息
      dataBase: {
        DBServer: "",
        DBName: "",
        DBUid: "",
        DBPwd: "",
        State:1
      }, //数据库信息
      Mqtt: {
        MQTTServer: "",
        MQTTUid: "",
        MQTTPwd: "",
        mins:''
      } //MQTT信息
    };
  },
  mounted() {
    this.ID = this.$route.params.id;
    this.getAccount(this.ID);
  },
  methods: {
    getAccount(id) {
      this.loading = true;
      this.$get(Api.getmodel + "/" + id)
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            this.Data = res.data.data;

            //账套信息
            this.accountInfo.AccountCode = res.data.data.AccountCode;
            this.accountInfo.AccountName = res.data.data.AccountName;
            this.accountInfo.ShortName = res.data.data.ShortName;
            this.accountInfo.Memo = res.data.data.Memo;

            //基本信息
            this.userInfo.Principal = res.data.data.Principal;
            this.userInfo.Tel = res.data.data.Tel;
            this.userInfo.ValidDate = res.data.data.ValidDate;
            this.userInfo.EMail = res.data.data.EMail;
            this.userInfo.Address = res.data.data.Address;
            this.userInfo.TokenValidTimes = res.data.data.TokenValidTimes;

            //数据库信息
            this.dataBase.DBServer = res.data.data.DBServer;
            this.dataBase.DBName = res.data.data.DBName;
            this.dataBase.DBUid = res.data.data.DBUid;
            this.dataBase.DBPwd = res.data.data.DBPwd;
            this.dataBase.State=res.data.data.State;

            //MQTT信息
            this.Mqtt.MQTTServer = res.data.data.MQTTServer;
            this.Mqtt.MQTTUid = res.data.data.MQTTUid;
            this.Mqtt.MQTTPwd = res.data.data.MQTTPwd;
            this.Mqtt.mins = res.data.data.DeviceSleepTime;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error)=> {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //创建数据库
    fnCreateDB() {
      this.loading = true;
      this.$get(Api.createdb + "/" + this.ID)
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            this.$message({
              message: "数据库创建成功",
              type: "success"
            });
            this.getAccount(this.ID);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error)=> {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //保存数据库配置
    fnSaveDB() {
      this.loading = true;
      this.$post(Api.setdbserver, {
          AccountID: this.ID,
          DBServer: this.dataBase.DBServer,
          DBName: this.dataBase.DBName,
          DBUid: this.dataBase.DBUid,
          DBPwd: this.dataBase.DBPwd
        })
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            this.$message({
              message: "数据库配置保存成功",
              type: "success"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error)=> {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //保存账套信息
    fnSaveInfo() {
      if(!this.$isEmail(this.userInfo.EMail)){
        this.$message.error('邮箱格式不对，请重新输入！');
        this.userInfo.EMail='';
        return false;
      }
      if(!this.$isTel(this.userInfo.Tel)){
        this.$message.error('联系电话格式不正确，请输入正确的手机号或带区号的固定电话！');
        this.userInfo.Tel='';
        return false;
      }
      this.loading = true;
      this.$post(Api.setaccountinfo, {
          AccountID: this.ID,
          AccountName: this.accountInfo.AccountName,
          ShortName: this.accountInfo.ShortName,
          Principal: this.userInfo.Principal,
          Tel: this.userInfo.Tel,
          Address: this.userInfo.Address,
          EMail: this.userInfo.EMail,
          ValidDate: this.userInfo.ValidDate,
          Memo: this.accountInfo.Memo,
          TokenValidTimes:this.userInfo.TokenValidTimes
        })
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            this.$message({
              message: "账套信息保存成功",
              type: "success"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error)=> {
          this.loading = false;
          this.$message.error(error);
        });
    },
    //保存MQTT配置
    fnSaveMQTT() {
      this.loading = true;
      this.$post(Api.setmqtt, {
          AccountID: this.ID,
          MQTTServer: this.Mqtt.MQTTServer,
          MQTTUid: this.Mqtt.MQTTUid,
          MQTTPwd: this.Mqtt.MQTTPwd,
          DeviceSleepTime:this.Mqtt.mins
        })
        .then(res => {
          this.loading = false;
          if (res.data.state == 200) {
            this.$message({
              message: "MQTT配置保存成功",
              type: "success"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error)=> {
          this.loading = false;
          this.$message.error(error);
        });
    },
    
  }
};
</script>
<style scoped>

</style>
