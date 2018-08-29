<template>
    <div class="container" v-loading = 'loading'>
        <div class="statusbar clearfix">
            <div class="w25 back" @click="fnBack()">
                <img src="../../assets/icon/back@2x.png" alt="">
                <span>返回</span>
            </div>
            <div class="w50 topcenter">
                <span>咨询详情</span>
            </div>
            <div class="w25" @click='reversion(ntails.id)'>
            	<span class="topsub">我要回复</span>
            </div>
        </div>
        <div class="wrap" style="margin-top: 3.3rem;">
            <div class="content">
                <div class="title">
                    <h1>{{ntails.title}}</h1>
                    <span>{{ntails.userName}}</span>
                    <span>回答<em>{{ntails.answeredCount}}</em>次</span>
                    <span>{{ntails.creationTime | yy}}</span>
                </div>
                <div class="banner">
                    <!-- <img src="../../assets/banner3.png" alt=""> -->
                </div>
                <div class="con">
                    <p>{{ntails.question}}</p>
                </div>
            </div>
        </div>
        <div class="containers" v-for="item in ntails.answers">
        <div class="con1" >
        	<div class="clearfix tops">
        		<span class="fl">{{item.name}}</span>
        		<span class="fr">{{item.creationTime | yy}}</span>
        	</div>
        	<div class="comment">
        		{{item.answer}}
        	</div>
        </div>
        <div class="clearfix con1" style="margin-top: 10px;padding-top: 1.05rem;margin-bottom: 1rem;">
    		<div class="fl">
    			<span style="font-size: 1.4rem;float: left;margin-right: 10px;">评分</span>
    			<el-rate disabled style='display: inline-block;float: left;margin-top: 2px;' v-model="item.evaluate">
				</el-rate>
    		</div>
    		<a v-if='fdd' @click='ping(item.id)' class='assess fr'>我要评价<img src="../../assets/icon/back@2x.png" class ='linkLefts'  alt=""></a>
    	</div>
    	</div>
        <el-dialog
		  title="回复"
		  :visible.sync="dialogVisible"
		  width="90%" class='dialog'>
		  <el-input
		  type="textarea"
		  :rows="2"
		  placeholder="请输入内容"
		  v-model="textareas">
		  
		</el-input>
		<div class="voice">
			<div class="plays" v-if="shows">
				<button @click='paly'><img src="../../assets/bofnag.png"/>{{timds}}s</button>
				<span class="clones" @click="clons"><img src="../../assets/clones_03.png"/></span>
			</div>
			<button @click='viod' v-if="ssta"><img src="../../assets/yuyin.png"/>点击录音</button>
			<button @click='outs' v-else=""><img src="../../assets/yuyin.png"/>正在录音，再次点击结束录音</button>
		</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button  size="small" @click="dialogVisible = false">取 消</el-button>
		    <el-button v-if='unbind'  size="small" type="primary" @click="resul">确 定</el-button>
		    <el-button v-else='' size="small" type="primary" @click="resul">确 定</el-button>
		  </span>
		</el-dialog>
    </div>
</template>
<script>
import Api from "../../kites/api";
export default {
  name: "NoticeDetails",
  data() {
    return {
    	pingjia: 1,
    	loading:false,
    	id:'',
    	ntails:{},
    	pinId:'',
    	dialogVisible:false,
    	textareas:'',
    	openid:'',
    	fdd:false,
    	unbind:true,
    	localId:'',
    	START:'',
    	recordTimer:'',
    	END:'',
    	ssta:true,
    	timds:'',
    	shows:false,
    	serverId:''
    };
  },
  beforeCreate() {
			this.openIds()
		},
  mounted() {
  		this.weixin()
  },
  created(){
  	this.openid = localStorage.openID
  	this.id = this.$route.params.id
  	this.GetOnlineQuestion()
  },
  methods: {
  	ping(id){
		this.$router.push({
			name: 'evaluates',
			params: {
	            id: id
	        },
	        query:{
	        	id:this.id
	        }
		})
	},
	resul(){
		if(this.textareas==''){
			this.$message({
				message: '回复不能为空',
				type: 'warning'
			});
			return
		}
		this.loading = true
		this.unbind = false,
		this.$post(Api.AddOnlineQuestionAnswer,{
		  "questionId": this.pinId,
		  "answer": this.textareas,
		  "openId":localStorage.openID,
		  "filePath":this.serverId
		}).then(res=>{
			if(res.data.success == true) {
				this.loading = false
				this.unbind = true,
				this.$message({
					message: "回复成功",
					type: "success"
				});
				this.dialogVisible=false
				this.GetOnlineQuestion()
			} else {
				this.loading = false
				this.unbind = true,
				this.$message.error(res.data.error.message);
			}
		})
	},
	//获取token鉴权
	reversion(id) {
		this.pinId = id
		this.$post(Api.acctoken, {
			"openId": localStorage.openID,
		}).then(res => {
			console.log(res)
			if(res.data.success == true) {
				localStorage.token = res.data.result.token
				this.dialogVisible=true
				this.textareas=''
			} else {
				this.$message.error(res.data.error.message);
			}
		})
	},
    //返回上一页
    fnBack() {
      	this.$router.push({
			 path: localStorage.consuUrl
		})
    },
    //获取详情
    GetOnlineQuestion(){
    	this.loading = true
    	this.$post(Api.GetOnlineQuestion,{
		  "id": this.id
		}).then(res=>{
			if(res.data.success== true){
				this.loading = false
				this.ntails = res.data.result
				if(this.openid.trim() == this.ntails.openId.trim()){
					this.fdd = true
				}else{
					this.fdd = false
				}
			}else{
				this.loading = false
				this.$message.error(res.data.error);
			}
		})
    },
    //weixinApi
    weixin(){
    	var urls = window.location.href
		this.$post('http://www.quickcq.com/api/services/app/weChat/GetJSConfig',{
			"url":urls
		}).then(res=>{
			console.log(res)
			if(res.data.success==true){
				wx.config({
	                debug: false, // 开启调试模式
	                appId: res.data.result.data.appId, // 必填，公众号的唯一标识
	                timestamp: res.data.result.data.timestamp, // 必填，生成签名的时间戳
	                nonceStr: res.data.result.data.nonceStr, // 必填，生成签名的随机串
	                signature: res.data.result.data.signature, // 必填，签名，见附录1
	                jsApiList: [
                        "startRecord",
						"stopRecord",
						"onVoiceRecordEnd",
						"playVoice",
						"pauseVoice",
						"stopVoice",
						"onVoicePlayEnd",
						"uploadVoice",
						"downloadVoice"
	                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	           });
			}
		})
		wx.ready(function(){
			wx.onVoiceRecordEnd({
                // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                complete: function(res) {
                    this.localId = res.localId;
                    console.log("自动停止-》 录音结果：", localId);
                }
            });
            wx.onVoicePlayEnd({
				success: function (res) {
					var localId = res.localId; // 返回音频的本地ID
					console.log('完毕')
				}
			});
		    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		});
    },
    //开始录音
    viod(){
    	var $this = this
    	this.timds = ''
    	this.shows = false
    	$this.START = new Date().getTime();
    	console.log($this.START)
    	this.recordTimer = setTimeout(function(){
        wx.startRecord({
            success: function(){
                localStorage.rainAllowRecord = 'true';
                $this.ssta =  false
                console.log('开始录音')
            },
            cancel: function () {
                alert('用户拒绝授权录音');
            }
        });
    	},300);
    },
    //结束录音
    outs(){
    	var $this = this
    	this.END = new Date().getTime();
    	console.log($this.END)
    	
	    if(($this.END - $this.START) < 1000){
	        $this.END = 0;
	        $this.START = 0;
	        //小于300ms，不录音
	        clearTimeout($this.recordTimer);
	    }else{
	        wx.stopRecord({
	          success: function (res) {
	            $this.localId = res.localId;
	            $this.ssta =  true
	            console.log('结束录音')
	            $this.timds = (($this.END - $this.START)/1000).toFixed(1)
	            $this.shows = true
	            $this.shnag();
	          },
	          fail: function (res) {
	            alert(JSON.stringify(res));
	          }
	        });
	    }
    },
    //播放录音
    paly(){
    	var $this = this
    	if ($this.localId) {
            console.log("播放录音");
            wx.playVoice({
                localId: $this.localId
            });
        }
    },
    clons(){
    	var $this = this
    	this.localId = ''
    	this.timds = ''
    	$this.serverId=''
    	this.shows = false
    	wx.stopVoice({
			localId: $this.localId // 需要停止的音频的本地ID，由stopRecord接口获得
		});
    },
    //上传
    shnag(){
    	var $this = this
    	wx.uploadVoice({
        localId:$this.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            
            //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
            $this.serverId = res.serverId
            console.log($this.serverId)
            $.ajax({
                url: Api.files,
                type: 'post',
                data: JSON.stringify($this.serverId),
                dataType: "json",
                success: function (data) {
                	console.log(data)
                    console.log('文件已经保存到的服务器');//这回，我使用七牛存储
                },
                error: function (xhr, errorType, error) {
                    console.log(error+'1');
                }
            });
        }
    	});
    },
     
    //下载
    xia(){
    	
    	wx.downloadVoice({
			serverId: '', // 需要下载的音频的服务器端ID，由uploadVoice接口获得
			isShowProgressTips: 1, // 默认为1，显示进度提示
			success: function (res) {
				var localId = res.localId; // 返回音频的本地ID
			}
		});
    }
    //
  }
};
</script>
<style scoped>
.wrap {
  padding-bottom: .8rem !important;
}
.wrap .title {
  width: 100%;
  box-sizing: border-box;
  padding: 0 1.25rem;
  text-align: left;
  color: #cccccc;
  
}
.wrap .title h1{
	font-weight: 400;
}
.wrap .title span {
  display: inline-block;
  color: #b0b1b1;
  font-size: 1rem;
  margin-top: 0.5rem;
}
.wrap .title span em{
	font-size: 1.25rem;
	color: #3c5a9f;
	font-style: normal;
}
.wrap .title span:nth-of-type(2){
	margin:  0 1rem;
}
.wrap .banner {
  width: 100%;
  /* margin-top: 1.6rem; */
}
.wrap .banner img {
  width: 100%;
}
.wrap .con {
  width: 100%;
  padding: 1.25rem .4rem;
}
.wrap .con p {
  width: 100%;
  text-align: left;
  font-size: 1.25rem;
  color: #646161;
  text-indent: 2em;
}
.con1{
	background: #fff;
	padding: 0 2.05rem;
	box-sizing: border-box;
	padding-bottom: 1.05rem;
}
.con1 .tops{
	line-height: 3.5rem;
	color: #b0b1b1;
}
.con1 .tops span:nth-of-type(1){
	font-size: 1.5rem;
	color: #b0b1b1;
	font-family: "微软雅黑";
}
.con1 .comment{
	text-align: left;
	padding-bottom: 0.8rem;
	color: #b0b1b1;
	text-indent: 2rem;
	line-height: 1.5rem;
}
.con1 a{
	color: #666666;
	font-size: 1.25rem;
}
.linkLefts{
	vertical-align: middle;
    transform: scale(.5) rotate(-180deg);
}
.voice{
	margin-top: 20px;
}
.voice button{
	background: #fff;
	border:1px solid #C0C4CC;
	width: 100%;
	height: 40px;
	line-height: 40px;
	border-radius: 5px;
	box-shadow: 0 0 3px #C8C9CC;
	outline: none;
	font-size: 12px;
}
.voice button img{
	height: 30px;
	vertical-align: middle;
}
.voice .plays{
	margin-bottom: 15px;
}
.voice .plays button{
	background: #efefef;
	border: none;
	outline: none;
	height: 40px;
	line-height: 40px;
	border-radius: 20px;
	width: 70%;
	text-align: left;
	text-indent: 20px;
}
.voice .plays button img{
	height: 25px;
	margin-right: 10px;
}
.clones{
	float: right;
	height: 40px;
	margin-right: 10px;
}
</style>


