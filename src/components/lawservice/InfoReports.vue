<template>
	<div class="container" v-loading=loading>
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>信息上报</span>
			</div>
			<div class="w25">
				<span v-if="unbind" class="topsub" @click="fnSubmit">提交</span>
				<span v-else="" class="topsub">提交</span>
			</div>
		</div>
		<div class="swiper" style="margin-top: 3.3rem;">
			<img src="../../assets/infor.png" alt="">
		</div>
		<div class="wrap">
			<div class="content">
				<div class="row clearfix">
					<label for="" class="label">发生时间<span class="red">*</span></label>
					<input type="date" placeholder="请选择时间" v-model="datime">
				</div>
				<div class="row clearfix">
					<label for="" class="label">案件类型<span class="red">*</span></label>
					<el-select v-model="cate" placeholder="请选择" class='areas'>
						<el-option v-for="item in category" :key="item.value" :label="item.name" :value="item.value">
						</el-option>
					</el-select>

				</div>
				<div class="row clearfix">
					<label for="" class="label" style="width:100%;">案件描述<span class="red">*</span></label>
					<textarea v-model="describe" name="" id="" rows="3" placeholder="请输入案件描述"></textarea>
				</div>
				<div class="row clearfix">
					<label for="" class="label">所在辖区<span class="red">*</span></label>
					<el-select v-model="value" placeholder="请选择" class='areas' @change='change'>
						<el-option v-for="item in areas" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<div class="row clearfix">
					<label for="" class="label">上报单位<span class="red">*</span></label>
					<el-select v-model="unit" placeholder="请选择" class='areas'>
						<el-option v-for="item in reporUnit" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<div class="row clearfix">
					<label for="" class="label">居住地<span class="red">*</span></label>
					<el-input type="textarea" :rows="2" class='adss' placeholder="请输入地址" v-model="adds">
					</el-input>
				</div>
				<div class="row clearfix">
					<label for="" class="label">是否群体<span class="red">*</span></label>
					<el-checkbox style='text-align:initial;float: left;margin-left: 15px;' v-model="checked"></el-checkbox>
				</div>
				<div class="row clearfix" style="margin-top: 20px;padding-bottom: 20px;">
					<label for="" class="label">上传图片</label>
					<div id="shangbao">
						<el-upload id='inputs' multiple accept="image/*"  :class="{disabled:uploadDisabled}" :action=host :limit="3" :before-upload="beforeAvatarUpload" :file-list="fileList" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccess" :on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
				</div>
				<div class="row clearfix" style="margin-top: 20px;">
					<label for="" class="label">上传视频</label>
					<div id="video">
						<el-upload :class="{disabled:uploadDisabled1}" capture="camera" accept="video/*" :action=host  :file-list="vedeoList" :limit="1" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo" :on-progress="uploadVideoProcess" :on-remove="handleRemove1">
								<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
						<el-progress v-if="videoFlag == true" type="circle" :percentage='videoUploadPercent' style="margin-top:30px;"></el-progress>
						<video id="video" v-if="isvedeo" :src="hostname+'/'+vedid" controls="controls"></video>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "InfoReports",
		data() {
			return {
				videoUploadPercent:0,
				videoFlag:false,
				host: Api.files,
				isActive: 1,
				sex: "男",
				datime: '',
				type: '',
				areas: [], //区域
				adds: '',
				value: '',
				category: [],
				cate: '',
				describe: '',
				loading: false,
				id: '',
				unbind: true,
				reporUnit: [],
				unit: '',
				checked: true,
				dialogImageUrl:'',
				dialogVisible:false,
				fileList:[],
				vedeoList:[],
				vedid:'',
				hostname:Api.hostname,
				isvedeo:false,
				filepaths:[]
			};
		},
		beforeCreate() {
			this.openIds()
			if(localStorage.userType != 3) {
				this.$router.push({
					path: '/powe'
				})
			}
		},
		computed:{
			uploadDisabled:function() {
				console.log(this.fileList.length)
		        return this.fileList.length >2
		    },
		    uploadDisabled1:function() {
		    	console.log(this.vedeoList.length)
		        return this.vedeoList.length >0
		    },
		},
		watch:{
			fileList:function(value){
				this.filepaths = value.concat(this.vedeoList)
				console.log(this.filepaths)
			},
			vedeoList:function(value){
				this.filepaths = this.fileList.concat(value)
				console.log(this.filepaths)
			},
		},
		mounted() {
			var ua = navigator.userAgent.toLowerCase()
			console.log(ua)
//			$("input:file").attr("accept", "image/*")
			var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1); //判断是否是苹果手机，是则是true
			if(isIos) {
				$("#inputs .el-upload input:file").removeAttr("capture");
			} else {
				$("#inputs .el-upload input:file").attr("capture", "camera");
			}
			
			this.id = this.$route.params.id
			this.authenticate()

		},
		methods: {
			//获取token
			authenticate() {
				this.$post(Api.acctoken, {
					"openId": localStorage.openID,
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						localStorage.token = res.data.result.token
						this.GetAreasList()
						this.GetType()
						this.GetMenuDetail()
					} else {
						this.$message.error(res.data.error.message);
					}
				})
			},
			//获取区域列表
			GetAreasList() {
				this.$post(Api.GetDistricts).then(res => {
					if(res.status == 200) {
						this.areas = res.data.result.items
					} else {
						this.$message.error(res.data.error);
					}
				})
			},
			//获取上级
			GetMenuDetail() {
				this.$post(Api.GetMenuDetail, {
					'id': this.id
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.titles = res.data.result.displayName
						this.parentId = res.data.result.parentId
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
			//返回上一页
			fnBack() {
				this.$router.push({
					name: 'LegalService',
					params: {
						id: this.parentId
					}
				})
			},
			//提交
			fnSubmit() {
				if(this.unit == '' || this.datime == '' || this.cate == '' || this.describe == '' || this.value == '' || this.adds == '') {
					this.$message.error('参数不能为空');
					return false;
				}
				var arrString = []
				for(var i=0;i<this.filepaths.length;i++){
					for(var j = 0;j<this.filepaths[i].response.result.length;j++ ){
						console.log(this.filepaths[i])
						arrString.push(this.filepaths[i].response.result[j].filePath)
					}
				}
				this.unbind = false
				this.loading = true
				this.$post(Api.CreateInfoCase, {
					"reportTime": this.datime,
					"caseType": this.cate,
					"caseDescription": this.describe,
					"distinctId": this.value,
					"reportUnitId": this.unit,
					"address": this.adds,
					"isGroup": this.checked,
					"filePaths": arrString
				}).then(res => {
					if(res.data.success == true) {
						this.loading = false
						this.$message({
							message: "上报成功",
							type: "success"
						});
						this.$router.push({
							path: "/LegalService",
							query: {
								id: 24
							}
						});
					} else {
						this.unbind = false
						this.loading = true
						this.$message.error(res.data.error);
					}
				})
			},
			fnSwitch(type) {
				this.isActive = type;
			},
			//获取类型
			GetType() {
				this.$post(Api.GetSelectionDatasByType, {
					"type": 4
				}).then(res => {
					if(res.status == 200) {
						this.category = res.data.result
					} else {
						this.$message.error(res.data.error);
					}
				})
			},
			change() {
				this.reporUnit = []
				this.unit = ''
				this.GetReportUnit(this.value)
			},
			//通过区域获取上报单位
			GetReportUnit(id) {
				this.$post(Api.GetReportUnit, {
					"districtId": id
				}).then(res => {
					if(res.status == 200) {
						console.log(res)
						this.reporUnit = res.data.result
					} else {
						this.$message.error(res.data.error);
					}
				})
			},
			//上传移除
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		        this.fileList = fileList
		    },
		    //文件列表中已上传的文件时
		    handlePictureCardPreview(file) {
		    	this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    //上传之前
		    beforeAvatarUpload(file) {
		        const isJPG = file.type === "image/jpeg";
				const isPNG = file.type === "image/png";
				const isLt2M = file.size / 1024 / 1024 < 10;
//				if(!isJPG && !isPNG) {
//					this.$message.error("上传图片必须是JPG/PNG 格式!");
//				}
				if(!isLt2M) {
					this.$message.error("上传图片大小不能超过 10MB!");
				}
				return(isJPG || isPNG) && isLt2M;
		    },
		    //上传成功
		    handleAvatarSuccess(res, file) {
		    	this.fileList.push(file)
		    },
		    
		    
		    //视频
		    beforeUploadVideo(file) {
		    	console.log(file)
//		    	const isMp4 = file.type === "video/mp4";
//				const isOgg = file.type === "video/ogg";
//				const isFlv = file.type === "video/flv";
//				const isAvi = file.type === "video/avi";
//				const isWmv = file.type === "video/wmv";
//				const isRmvb = file.type === "video/rmvb"
//				const isMov= file.type === "video/mov"
			    const isLt10M = file.size / 1024 / 1024  < 10;
//			    if (['video/mp4','video/mov','video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
//			        this.$message.error('请上传正确的视频格式');
//			        return false;
//			    }
			    if (!isLt10M) {
			        this.$message.error('上传视频大小不能超过10MB哦!');
			        return false;
			    }
			},
			uploadVideoProcess(event, file, fileList){
			    this.videoFlag = true;
			    this.videoUploadPercent =  file.percentage.toFixed(0)-0;
			},
			handleVideoSuccess(res, file){
				this.vedeoList.push(file)
				this.videoUploadPercent =  100
		        this.vedid = res.result[0].filePath 
		        this.videoFlag = false
		        this.isvedeo=true
			},
			//上传移除
			handleRemove1(file, fileList) {
		        this.vedeoList = fileList
		        this.vedid=''
		        this.isvedeo=false
		    },
		}
	};
</script>
<style scoped>
	.wrap {
		padding-bottom: 0 !important;
	}
	
	.wrap .content {
		padding: 1.6rem;
	}
	
	.wrap .row {
		position: relative;
		width: 100%;
		line-height: 3.3rem;
		border-bottom: 1px solid #c9c9ca;
	}
	
	.wrap .row:last-child {
		border-bottom: none;
	}
	
	.wrap .row .label {
		display: inline-block;
		width: 8.3rem;
		float: left;
		text-align: left;
		font-size: 1.3rem;
		color: #5a5959;
	}
	
	.wrap .row .radio {
		box-sizing: border-box;
		width: calc(100% - 9rem);
		height: 2.5rem;
		border-radius: .4rem;
		outline: none;
		border: none;
		float: right;
		font-size: 1.3rem;
		text-align: left;
	}
	
	.wrap .row input {
		box-sizing: border-box;
		width: calc(100% - 9rem);
		height: 2.5rem;
		border-radius: .4rem;
		outline: none;
		border: none;
		font-size: 1.25rem;
		z-index: 1;
	}
	
	.wrap .row select {
		box-sizing: border-box;
		width: calc(100% - 9rem);
		height: 2.5rem;
		border-radius: .4rem;
		outline: none;
		border: none;
		font-size: 1.25rem;
		z-index: 5;
	}
	
	.wrap .row .btn button {
		float: left;
		outline: none;
		border: none;
		color: #5a5959;
		font-size: 1.25rem;
		border-radius: .4rem;
		padding: .4rem .8rem;
		margin: .4rem;
		background-color: #efefef;
	}
	
	.wrap .row .btn button.active {
		color: #fff !important;
		background-color: #39589e !important;
	}
	
	.wrap .row textarea {
		outline: none;
		border: none;
		width: 100%;
		font-size: 1.25rem;
	}
	
	.red {
		color: red;
	}
</style>