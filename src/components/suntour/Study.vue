<template>
	<div class="container" v-loading= 'loading'>
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span v-show="isState==1">教育学习</span>
				<span v-show="isState==2">社区服务</span>
			</div>
			<div class="w25">
				<span v-if="unbind" class="topsub" @click="tijiao">提交</span>
				<span v-else="" class="topsub">提交</span>
			</div>
		</div>
		<div class="wrap" style="margin-top: 3.3rem;">
			<div class="content">
				<div class="row clearfix" v-show="isState==1">
					<label for="" class="label">学习方式</label>
					<el-select v-model="value" placeholder="请选择" class='areas1'>
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="row clearfix" v-show="isState==2">
					<label for="" class="label">类型</label>
					<el-select v-model="value1" placeholder="请选择" class='areas1'>
						<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="row clearfix" v-show="isState==1&&value=='1'">
					<label for="" class="label">组织单位/授课人</label>
					<input type="text" v-model="persons" placeholder="请输入组织单位/授课人">
				</div>
				<div class="row clearfix" v-show="isState==2&&value1=='1'">
					<label for="" class="label">组织者</label>
					<input type="text" v-model="persons" placeholder="请输入组织者">
				</div>
				<div class="row clearfix" v-show="isState==2&&value1=='2'">
					<label for="" class="label">见证者</label>
					<input type="text" v-model="persons" placeholder="请输入见证者">
				</div>
				<div class="row clearfix" v-show="isState==1">
					<label for="" class="label" style="width:100%;">学习内容</label>
					<textarea name="" id="" v-model="textares" rows="3" placeholder="请输入学习内容"></textarea>
				</div>
				<div class="row clearfix" v-show="isState==2">
					<label for="" class="label" style="width:100%;">劳动内容</label>
					<textarea name="" id="" v-model="textares" rows="3" placeholder="请输入劳动内容"></textarea>
				</div>
				<div class="row clearfix" v-show="isState==1">
					<label for="" class="label">学习时长</label>
					<input type="number" v-model="numbers" placeholder="请输入学习多少分钟">
				</div>
				<div class="row clearfix" v-show="isState==2">
					<label for="" class="label">劳动时长</label>
					<input type="number" v-model="numbers" placeholder="请输入劳动多少分钟">
				</div>
				<div class="row clearfix">
					<label for="" class="label" style="width:100%;">上传照片(.jpg，.png)</label>
					<div class="uploads">
						<el-upload class="avatar-uploader" multiple :show-file-list="false"  accept="image/*" capture="camera" :action=host :on-success="SuccessFile" :before-upload="beforeAvatarUpload">
							<img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "Study",
		data() {
			return {
				loading:false,
				options: [{
					value: '1',
					label: '集中教育'
				}, {
					value: '2',
					label: '自行学习'
				}],
				value: '', //学习方式
				options1: [{
					value: '1',
					label: '集中劳动'
				}, {
					value: '2',
					label: '公益服务'
				}],
				value1: '1', //工艺类型
				isState: 1,
				HeadIMG: "",
				dialogImageUrl: "",
				dialogVisible: false,
				host: Api.files,
				numbers: '',
				textares: '',
				persons: '',
				photoTile: '',
				fileList: [],
				unbind:true
			};
		},
		beforeCreate() {
			this.openIds()

		},
		computed: {
			uploadDisabled: function() {
				console.log(1)
				return this.fileList.length > 0
			},
		},
		mounted() {
			var ua = navigator.userAgent.toLowerCase()
			console.log(ua)
//			$("input:file").attr("accept", "image/*")
			var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1); //判断是否是苹果手机，是则是true
			if(isIos) {
				$("input:file").removeAttr("capture");
			} else {
				$("input:file").attr("capture", "camera");
			}
			this.isState = this.$route.params.id;
		},
		methods: {
			//返回上一页
			fnBack() {
				this.$router.go(-1);
			},
			changs(file, fileList) {
				//				this.fileList=[]
				console.log(file, fileList);
			},
			RemoveFile(file, fileList) {
				console.log(file, fileList);
			},
			beforeAvatarUpload(file) {
				this.loading = true;
				this.photoTile = file.lastModifiedDate
				const isJPG = file.type === "image/jpeg";
				const isPNG = file.type === "image/png";
				const isLt2M = file.size / 1024 / 1024 < 10;
				if(!isJPG && !isPNG) {
					this.$message.error("上传图片必须是JPG/PNG 格式!");
				}
				if(!isLt2M) {
					this.$message.error("上传图片大小不能超过 10MB!");
				}
				return(isJPG || isPNG) && isLt2M;
			},
			SuccessFile(res, file, fileList) {
				this.loading = false
				this.HeadIMG = res.result[0].filePath
				this.dialogImageUrl = file.url
				console.log(this.HeadIMG)
				this.$message({
					message: "上传成功",
					type: "success"
				});
			},
			ErrorFile(res) {
				this.loading = false
				console.log(res)
				this.$message.error("上传失败！");
			},
			tijiao() {
				if(this.isState == 1) {
					if(this.textares == '' || this.numbers == '' || this.HeadIMG == '') {
						this.$message.error('提交参数不能为空');
						return false
					}
					if(this.value == 1) {
						if(this.persons == '') {
							this.$message.error('提交参数不能为空');
							return false
						}
					}
					this.loading =true
					this.unbind = false
					this.$post(Api.CreateStudyRecord, {
						"type": this.value,
						"content": this.textares,
						"studyTime": this.numbers,
						"orgization": this.persons,
						"lng": 0,
						"lat": 0,
						"location": "",
						"photo": this.HeadIMG,
						"photoTime": this.photoTile
					}).then(res => {
						if(res.data.success == true) {
							this.fnBack()
						} else {
							this.loading=false
							this.unbind = true
							this.$message.error(res.data.error);
						}
					})
				} else if(this.isState == 2) {
					if(this.textares == '' || this.numbers == '' || this.HeadIMG == '') {
						this.$message.error('提交参数不能为空');
						return false
					}
					this.loading =true
					this.unbind = false
					this.$post(Api.CreateServiceRecord, {
						"type": this.value1,
						"content": this.textares,
						"studyTime": this.numbers,
						"orgization": this.persons,
						"lng": 0,
						"lat": 0,
						"location": "string",
						"photo": this.HeadIMG,
						"photoTime": this.photoTile
					}).then(res => {
						if(res.data.success == true) {
							this.fnBack()
						} else {
							this.loading = false
							this.unbind = true
							this.$message.error(res.data.error);
						}
					})
				}
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
		font-size: 1.3rem;
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
	
	.wrap .row textarea {
		outline: none;
		border: none;
		width: 100%;
		font-size: 1.25rem;
	}
	
	.areas1 {
		width: calc(100% - 10rem);
		font-size: 1.25rem;
		font-family: "微软雅黑";
	}
	
	.disabled .el-upload--picture-card {
		display: none;
	}
</style>