<template>
	<div>
		<div class="statusbar clearfix">
			<!--<div class="w25 back" @click="fnBack()">
				<img src="../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>-->
			<div class="w50 topcenter" style="float: inherit;">
				<span>锡山司法</span>
			</div>
		</div>
		<div class="divs">
			<img src="../assets/icon/close@3x.png" class="imgquna"/>
			<p class="tishi">对不起,您没有访问权限</p>
			<router-link to='/' class='fanhuishouye'>返回首页</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		name:'powe',
	}
</script>

<style>
	.divs{
		position: absolute;
		left: 50%;
		top:45%;
		transform: translate(-50%,-50%);
	}
	.imgquna{
		width: 60%;
	}
	.tishi{
		font-size: 16px;
		line-height: 30px;
		white-space:nowrap;
	}
	.fanhuishouye{
		font-size: 14px;
		color: #00a1d6;
	}
</style>