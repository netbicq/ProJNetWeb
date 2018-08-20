<template>
	<div class="container legal" v-loading = 'loading'>
		<div class="marks">
		<div class="head-img">
			<img src="../../assets/flfw.png" />
		</div>
		<div class="wrap1">
			<ul class="clearfix">
				<li v-for='item in infoMenu'>
					<router-link v-if='item.type!=0' v-bind="{to:item.url+'/'+item.id}"  :key='item.id'>
						<div class="img">
							<img :src="item.icon" alt="">
						</div>
						<div class="words">
							<p>{{item.displayName}}</p>
							<span>{{item.subTitle}}</span>
						</div>
						
					</router-link>
					<router-link v-else v-bind="{to:'/Notarization/'+(item.id)}"  :key='item.id'>
						<div class="img">
							<img :src="item.icon" alt="">
						</div>
						<div class="words">
							<p>{{item.displayName}}</p>
							<span>{{item.subTitle}}</span>
						</div>
						
					</router-link>
				</li>
			</ul>

		</div>
		<div class="nav">
			<navs></navs>
		</div>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	import navs from '../nav'
	export default {
		name: "LegalService",
		components: {
			navs
		},
		data() {
			return {
				loading:true,
				infoMenu:[],
				id:''
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {},
		created() {
			localStorage.sevrID = this.$route.params.id
			this.loading = false
			this.id = this.$route.params.id?this.$route.params.id:this.$route.query.id
			this.GetTopMenu(this.id)
		},
		methods: {
			//跳转到首页
			fnHome() {
				this.$router.push({
					path: "/"
				});
			},
			//跳转到向阳之旅
			fnSunTour() {
				this.$router.push({
					path: "/SunTour"
				});
			},
			//跳转到社群管理
			fnComM() {
				this.$router.push({
					path: "/Community"
				});
			},
			//获取顶级菜单
			GetTopMenu(id) {
				this.loading = true
				this.$post(Api.GetTopMenu, {
					'parentId':id 
				}).then(res => {
					console.log()
					if(res.status == 200) {
						this.infoMenu = res.data.result
						this.loading = false
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
		}
	};
</script>
<style scoped>
	.wrap1 ul {
		width: 100%;
	}
	
	.wrap1 ul li {
		display: block;
		width: 43%;
		float: left;
		margin-top: 0.8rem;
		padding: 1rem;
		box-sizing: border-box;
		background-color: #ffffff;
		box-shadow: 0px 0px 7px #c5cad3;
		border-radius: 5px;
		margin-left: 4.2%;
	}
	.wrap1 ul li:nth-of-type(2n){
		margin-left: 4.2%;
	}
	
	.wrap1 ul li .words {
		width: 100%;
		margin-top: 1.2rem;
	}
	
	.wrap1 ul li .words p {
		width: 100%;
		color: #333333;
		font-size: 1.3rem;
	}
	
	.wrap1 ul li .words span {
		display: inline-block;
		width: 100%;
		font-size: 1.25rem;
		color: #808080;
		margin-top: 0.3rem;
	}
	
	.wrap1 ul li .img {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.wrap1 ul li .img img {
		width: 40%;
		vertical-align: middle;
	}
	
	.wrap1 a {
		color: #808080;
		/*display: inline-block;
		width: 49%;
		margin-top: 0.4rem;*/
	}
	.legal{
		position: fixed;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		background: url(../../assets/bj2_03.png) no-repeat left center;
		background-size: 100% 100%;
	}
	.marks{
	    position: absolute;
	    left: 0;
	    right: 0;
	    top: 0;
	    bottom: 0;
	    height: 100%;
		width: 100%;
	    text-align: center;
	    background:rgba(255,255,255,0.5);
	}
</style>