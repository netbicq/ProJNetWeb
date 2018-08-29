<template>
	<ul v-loading='loading'>
		<li @click="fnHome">
			<img src="../assets/icon/tab_home_n@2x.png" alt="">
			<span>首页</span>
		</li>
		<li v-bind:class="{ 'active':menu[0].id == id ? true:false}">
			<router-link :to="menu[0].url+'/'+menu[0].id">
				<img v-if='menu[0].id == id' src="../assets/icon/tab_message_s@2x.png" alt="">
				<img v-else src="../assets/icon/tab_message_n@2x.png" alt="">
				<span v-if='menu[0].displayName'>{{menu[0].displayName}}</span>
				<span v-else>信息查询</span>
			</router-link>
		</li>
		<li v-bind:class="{ 'active':menu[1].id == id ? true:false}">
			<router-link :to="menu[1].url+'/'+menu[1].id">
				<img v-if='menu[1].id == id'src="../assets/icon/law_s@2x.png" alt="">
				<img v-else="" src="../assets/icon/law_n@2x.png" alt="">
				<span v-if='menu[1].displayName'>{{menu[1].displayName}}</span>
				<span v-else="">法律服务</span>
			</router-link>
		</li>
		<li v-bind:class="{ 'active':menu[2].id == id ? true:false}">
			<router-link :to="menu[2].url+'/'+menu[2].id">
				<img v-if='menu[2].id == id' src="../assets/icon/ative_s@2x.png" alt="">
				<img v-else src="../assets/icon/ative_n@2x.png" alt="">
				<span v-if='menu[2].displayName'>{{menu[2].displayName}}</span>
				<span v-else>在线活动</span>
			</router-link>
		</li>
		<li @click="fnSunTour">
			<img src="../assets/icon/111.png" alt="">
			<span>在线审批</span>
		</li>
	</ul>
</template>

<script>
	import Api from "../kites/api";
	export default {
		name: "navs",
		data() {
			return{
				menu: [{
						'type': "",
						'id': "",
						'name': "",
						'displayName': "",
						'icon': '',
						'url': ""
					},
					{
						'type': "",
						'id': "",
						'name': "",
						'displayName': "",
						'icon': '',
						'url': ""
					},
					{
						'type': "",
						'id': "",
						'name': "",
						'displayName': "",
						'icon': '',
						'url': ""
					}
				], //菜单
				id: 0,
				loading:false,
			}
		},
		created() {
			this.id = this.$route.params.id
			this.GetTopMenu()
		},
		methods:{
			//获取顶级菜单
			GetTopMenu() {
//				this.loading = true
				this.$post(Api.GetTopMenu, {
					'parentId': ''
				}).then(res => {
					if(res.data.success == true) {
						this.menu = res.data.result
						this.loading = false
						localStorage.meun = JSON.stringify(res.data.result)
					} else {
						this.$message.error(res.data.error.message);
					}
				})
			},
			fnHome() {
				this.$router.push({
					path: "/"
				});
			},
			//跳转到向阳之旅
			fnSunTour() {
				this.$router.push({
					path: "/Onapprove"
				});
			},
		}
	}
</script>

<style>
</style>