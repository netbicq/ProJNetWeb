<template>
	<div class="main">
		<topBar></topBar>
		<sideBar></sideBar>
		<section v-bind:class="{'mrgin': $store.state.isCollapse, 'mrgin1': !$store.state.isCollapse}">
			<div class="content-wrapper"><router-view/></div>
		</section>
	</div>
</template>

<script>
	import store from '@/vuex/store'
	import topBar from './assembly/topbar'
	import sideBar from './assembly/sidebar'
	export default{
		name:'casket',
		components:{
			topBar,sideBar
//sideBar,footBar
		},
		store,
	}
</script>
<style scoped="">
.main {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 100%;
    overflow-x: hidden;
}
.mrgin{
	margin-left: 220px;
}
.mrgin1{
	margin-left: 70px;
}
.content-wrapper{
    padding: 20px;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    margin-top: -1px;
}
</style>