<template>
	<div class="container">
		<div class="statusbar clearfix">
			<div class="w25 back" style="opacity: 0;">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>法律援助</span>
			</div>
			<div class="w25">
				<!-- <img src="../../assets/icon/back@2x.png" alt=""> -->
			</div>
		</div>
		<div class="wrap" style="padding-top: 3.3rem;">
			<div class="result" v-if="state">
				<img src="../../assets/icon/ok.png" alt="">
				<span>提交成功</span>
				<p>您的申请已经送达</p>
				<p>我们会尽快安排专人处理您的申请</p>
			</div>
			<div class="result" v-else>
				<img src="../../assets/icon/error.png" alt="">
				<span>提交失败</span>
				<p>您的申请提交失败，请重新提交</p>
			</div>
			<div class="btn">
				<button @click="fnLegalServer">返回法律服务</button>
			</div>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "SubResult",
		data() {
			return {
				state: true,
			};
		},
		beforeCreate() {
			this.openIds()
		},
		beforeRouteEnter (to, from, next) {
	       console.log(to)
	       console.log(from)
	       localStorage.fromUrl = from.path
	       next();
    	},
		mounted() {},
		methods: {
			fnLegalServer() {
				this.$router.push({
					path: "/LegalService",
					query: {id: 24}
				});
			}
		}
	};
</script>
<style scoped>
	.wrap {
		padding-bottom: 0;
	}
	
	.result {
		width: 100%;
	}
	
	.result span {
		display: inline-block;
		width: 100%;
		text-align: center;
		font-size: 1.3rem;
		color: #000000;
		font-weight: 600;
		margin-bottom: .8rem;
	}
	
	.result img {
		width: 11.25rem;
		height: 11.25rem;
	}
	
	.result p {
		display: inline-block;
		width: 100%;
		text-align: center;
		font-size: 1.2rem;
		color: #000000;
		line-height: 2rem;
	}
	
	.wrap .btn button {
		width: 50%;
		font-size: 1.25rem;
		padding: .8rem 0;
		outline: none;
		border: none;
		color: #ffffff;
		margin-top: 1.6rem;
		border-radius: .8rem;
		background-color: #39589e;
	}
</style>