<template>
	<div class="aside" v-if='$store.state.isCollapse'>
		<div class="aside-inner">
			<nav class="sidebar">
				<ul class="nav">
					<li class="home">
						<router-link to="/Dashboard"><i style='font-size: 25px;' class="icon iconfont icon-shouye1"></i><span>首页</span></router-link>
					</li>
					<li v-for='item in $store.menuList'>
						<a href="javascript:;">
							<i :class="'icon iconfont '+item.ModulInfo.IMGUrl"></i>
							<span>{{item.ModuleName}}</span>
						</a>
						<ul class="sidebar-subnav">
							<li v-for='items in item.Menu'>
								<router-link :to="items.RoutUrl">{{items.MenuName}}</router-link>
							</li>
						</ul>
					</li>
					<!--<li>
						<a href="javascript:;">
							<i class="icon iconfont icon-xitong"></i>
							<span>系统管理</span>
						</a>
						<ul class="sidebar-subnav">
							<li>
								<router-link to="/system">用户管理</router-link>
							</li>
							<li>
								<router-link to="/dicr">词典管理</router-link>
							</li>
						</ul>
					</li>
					<li>
						<a href="javascript:;">
							<i class="icon iconfont icon-zhigongguanli"></i>
							<span>项目管理</span>
						</a>
						<ul class="sidebar-subnav">
							<li>
								<router-link to="/Owner">业主管理</router-link>
							</li>
							<li>
								<router-link to="/Project">项目管理</router-link>
							</li>
						</ul>
					</li>
					<li>
						<a href="javascript:;">
							<i class="icon iconfont icon-baobiao"></i>
							<span>报表管理</span>
						</a>
						<ul class="sidebar-subnav">
							<li>
								<router-link to="/Report">报表管理</router-link>
							</li>
						</ul>
					</li>-->
				</ul>
			</nav>
		</div>
	</div>
	<div class="aside1" v-else="">
		<div class="aside-inner">
			<nav class="sidebar">
				<ul class="nav1">
					<li class="home">
						<router-link to="/index"><i style='font-size: 40px;' class="icon iconfont icon-shouye1"></i><span>Dashboard</span></router-link>
					</li>
					<li v-for='item in $store.menuList'>
						<a href="javascript:;">
							<i :class="'icon iconfont '+item.ModulInfo.IMGUrl"></i>
							<span>{{item.ModuleName}}</span>
						</a>
						<ul class="sidebar-subnav1">
							<li v-for='items in item.Menu'>
								<router-link :to="items.RoutUrl">{{items.MenuName}}</router-link>
							</li>
						</ul>
					</li>
					<!--<li>
						<a href="javascript:;">
							<i class="icon iconfont icon-xitong"></i>
							<span>系统管理</span>
						</a>
						<ul class="sidebar-subnav1">
							<li>
								<router-link to="/system">用户管理</router-link>
							</li>
							<li>
								<router-link to="/dicr">词典管理</router-link>
							</li>
						</ul>
					</li>
					<li>
						<a href="javascript:;">
							<i class="icon iconfont icon-zhigongguanli"></i>
							<span>项目管理</span>
						</a>
						<ul class="sidebar-subnav1">
							<li>
								<router-link to="/Owner">业主管理</router-link>
							</li>
							<li>
								<router-link to="/Project">项目管理</router-link>
							</li>
						</ul>
					</li>
					<li>
						<a href="javascript:;">
							<i class="icon iconfont icon-baobiao"></i>
							<span>报表管理</span>
						</a>
						<ul class="sidebar-subnav1">
							<li>
								<router-link to="/Report">报表管理</router-link>
							</li>
						</ul>
					</li>-->
				</ul>
			</nav>
		</div>
	</div>
</template>

<script>
	import store from "@/vuex/store";
	export default {
		name: "sideBar",
		data() {
			return {};
		},
		store,
		mounted() {
			this.$nextTick(function() {
				$('.aside .nav>li').on('click', function() {
					var that = $(this)
					$(this).addClass('active').siblings().removeClass('active')
					$(this).children('.sidebar-subnav').toggle(200).addClass("animated slideInLeft").parent().siblings().children("ul").hide(300)
					setTimeout(function() {
						that.children("ul").removeClass("slideInLeft animated")
					}, 1000);
				})
				$(".aside .nav>li>ul").click(function() {
					event.stopPropagation();
				})
				$(".aside1 .nav1>li").click(function() {
					event.stopPropagation();
				})
			})
		},
		created(){
			store.menuList =  JSON.parse(sessionStorage.menuList) 
		},
		methods: {

		}

	};
</script>

<style>
	.aside {
		position: fixed;
		width: 220px;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 116;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		backface-visibility: hidden;
		background-color: #fff;
	}
	
	.aside1 {
		position: fixed;
		width: 70px;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 116;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		backface-visibility: hidden;
		background-color: #fff;
	}
	
	.aside1 .aside-inner {
		padding-top: 55px;
		height: 100%;
		width: 70px;
		overflow: hidden;
		border-right: 1px solid #ccc;
	}
	
	.aside-inner {
		padding-top: 75px;
		height: 100%;
		width: 220px;
		overflow: hidden;
		border-right: 1px solid #ccc;
	}
	
	.sidebar>.nav>li {
		margin-bottom: 20px;
		border-left: 3px solid transparent;
		-webkit-transition: border-left-color 0.4s ease;
		-o-transition: border-left-color 0.4s ease;
		transition: border-left-color 0.4s ease;
	}
	
	.aside-inner,
	.navbar-header,
	.sidebar>.nav>li {
		-webkit-transition: width 0.2s cubic-bezier(0.35, 0, 0.25, 1);
		-o-transition: width 0.2s cubic-bezier(0.35, 0, 0.25, 1);
		transition: width 0.2s cubic-bezier(0.35, 0, 0.25, 1);
	}
	
	.sidebar {
		margin-right: -17px;
		overflow-y: scroll;
		height: 100%;
		padding-bottom: 20px;
		background-color: #fff;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
	}
	
	.sidebar .nav-heading {
		padding: 12px 15px;
		color: #919DA8;
		font-size: 13px;
		letter-spacing: .035em;
		pointer-events: none;
		cursor: default;
	}
	
	.sidebar>.nav>li>a {
		padding: 12px 24px;
		letter-spacing: .025em;
		font-weight: normal;
		cursor: pointer;
		font-size: 16px;
		color: #515253;
	}
	
	.sidebar>.nav1>li>a {
		padding: 12px 24px;
		letter-spacing: .025em;
		font-weight: normal;
		cursor: pointer;
		font-size: 16px;
		color: #515253;
	}
	
	.sidebar>.nav>li>a>i {
		width: 1.1em;
		display: inline-block;
		font-style: normal;
		font-weight: normal;
		line-height: 1;
		font-size: 22px;
		-webkit-font-smoothing: antialiased;
	}
	
	.sidebar>.nav1>li>a>i {
		width: 1.1em;
		display: inline-block;
		font-style: normal;
		font-weight: normal;
		line-height: 1;
		font-size: 22px;
		-webkit-font-smoothing: antialiased;
	}
	
	.sidebar>.nav>li:hover>a {
		color: #23b7e5;
	}
	
	.sidebar>.nav1>li:hover>a {
		color: #23b7e5;
	}
	
	.sidebar>.nav>li.active>a {
		color: #23b7e5;
	}
	
	.sidebar>.nav1>li.active>a {
		color: #23b7e5;
	}
	
	.sidebar>.nav>li.active {
		border-left-color: #23b7e5;
	}
	
	.sidebar>.nav1>li.active {
		border-left-color: #23b7e5;
	}
	
	.sidebar>.nav>li>.sidebar-subnav {
		background-color: #fcfcfc;
		color: #23b7e5;
		display: block;
	}
	
	.sidebar>.nav1>li>.sidebar-subnav1 {
		background-color: #fcfcfc;
		color: #23b7e5;
		display: block;
	}
	
	.sidebar>.nav1>li>.sidebar-subnav1 {
		display: none;
	}
	
	.sidebar>.nav>li>.sidebar-subnav {
		display: none;
	}
	
	.sidebar-subnav>li>a,
	.sidebar-subnav>li>.nav-item {
		display: block;
		position: relative;
		padding: 10px 20px;
		padding-left: 53px;
		font-weight: normal;
		background-color: transparent !important;
		color: #515253;
	}
	
	.sidebar-subnav1>li>a,
	.sidebar-subnav1>li>.nav-item {
		display: block;
		position: relative;
		padding: 10px 20px;
		padding-left: 53px;
		font-weight: normal;
		background-color: transparent !important;
		color: #515253;
	}
	
	@keyframes slideInLeft {
		from {
			transform: translate3d(-100%, 0, 0);
			visibility: visible;
		}
		to {
			transform: translate3d(0, 0, 0);
		}
	}
	
	.slideInLeft {
		animation-name: slideInLeft;
	}
	
	.animated {
		animation-duration: 1s;
		animation-fill-mode: both;
	}
	
	.animated.infinite {
		animation-iteration-count: infinite;
	}
	
	.sidebar>.nav>li .router-link-active {
		color: #23b7e5;
	}
	
	.sidebar>.nav1>li .router-link-active {
		color: #23b7e5;
	}
	
	.aside1 .nav1>li {
		margin-bottom: 10px;
		position: relative;
	}
	
	.aside1 .sidebar .nav1>li>a>span {
		display: none;
	}
	
	.aside1 .sidebar .nav1>li {
		border: none;
		text-align: center;
	}
	
	.aside1 .sidebar .nav1>li a {
		padding: 0
	}
	
	.aside1 .sidebar .nav1>li>a i {
		font-size: 30px;
	}
	
	.aside1 .sidebar {
		overflow-y: initial;
		margin-right: -1px;
		overflow-x: initial;
		padding-bottom: 0;
		box-sizing: border-box;
		height: auto;
		border-right: 1px solid #ccc;
	}
	
	.aside1 .aside-inner {
		overflow: initial;
		box-sizing: border-box;
	}
	
	.aside1 .sidebar-subnav1 {
		position: absolute;
		top: 0;
		left: 69px;
		z-index: 999;
	}
	
	.aside1 .sidebar .nav1>li ul {
		display: none !important;
		padding: 0 15px;
		text-align: left;
		line-height: 40px;
		border: 1px solid #ccc;
		width: 150px;
	}
	
	.aside1 .sidebar .nav1>li.nav-heading {
		display: none !important;
	}
	
	.aside1 .sidebar .nav1>li:hover>ul {
		display: block !important;
	}
	
	.aside1 .home {
		margin-top: 20px;
	}
</style>