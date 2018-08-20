<template>
	<div class="footBar">
		© 有限公司
	</div>
</template>

<script>
	export default{
		name:'footBar'
	}
</script>

<style>
	.footBar{
		position: fixed;
		bottom: 0;
		width: 100%;
		border-top: 1px solid #e4eaec;;
		height: 40px;
		line-height: 40px;
		padding: 10px 20px;
		background: #f5f7fa;
        z-index: 2;
        text-align: left;
	}
</style>