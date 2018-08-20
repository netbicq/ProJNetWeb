<template>
	<div>
		<div class="title">
			<span class="h1">人事薪资</span>
			<span class="h2">员工信息</span>
		</div>
		<div class="tables">
			<div class="clearfix">
				<span>员工信息:</span>
			</div>
		</div>
		<div class="tables" style="width: 50%">
			<div>
				<el-form :model="formInline" label-width="80px">
					<div class="clearfix">
						<div class="fl fldivs">
							<el-form-item label="员工编号">
								<el-input v-model="formInline.ID" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="姓名">
								<el-input v-model="formInline.name" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="性别">
								<el-radio-group v-model="formInline.radio2">
									<el-radio :label="1">男</el-radio>
									<el-radio :label="2">女</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="出生年月">
								<el-date-picker class='tiems' v-model="formInline.time" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</div>
						<div class="fr">
							<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</div>
					</div>
					<div class="clearfix">
						<div class="fl" style="width: 49%;">
							<el-form-item label="入职日期">
								<el-date-picker class='tiems' v-model="formInline.starTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</div>
						<div class="fr" style="width: 49%;">
							<el-form-item label="离职日期">
								<el-date-picker class='tiems' v-model="formInline.endTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="离职时间">
								</el-date-picker>
							</el-form-item>
						</div>
					</div>
					<el-form-item label="身份证号">
						<el-input v-model="formInline.caid" placeholder=""></el-input>
					</el-form-item>
					<div class="clearfix">
						<div class="fl" style="width:49%">
							<el-form-item label="电子卡号">
								<el-select class='se' v-model="staffNum" placeholder="请选择">
									<el-option v-for="item in staffs" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="工资方案">
								<el-select class='se' v-model="staffNum" placeholder="请选择">
									<el-option v-for="item in staffs" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="fr" style="width:49%">
							<el-form-item label="员工类型">
								<el-select class='se' v-model="staffNum" placeholder="请选择">
									<el-option v-for="item in staffs" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="组织架构">
								<el-select class='se' v-model="staffNum" placeholder="请选择">
									<el-option v-for="item in staffs" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
					</div>

				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'EmployeeInfo',
		data() {
			return {
				formInline: {
					ID: '',
					name: '',
					radio2: 1,
					time: '',
					starTime: '',
					endTime: '',
					caid: ''
				},
				staffs: [], //电子卡号
				staffNum: '',
				imageUrl: ''
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		}
	}
</script>
<style scoped="">
	.fldivs {
		width: calc(100% - 200px);
	}
	
	.avatar-uploader {
		width: 178px;
		height: 178px;
		border: 1px dashed #d9d9d9;
	}
	
	.avatar-uploader .el-upload--text {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>