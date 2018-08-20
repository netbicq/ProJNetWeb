<template>
	<div>
	<div class="aside" v-if='$store.state.isCollapse'>
		<div class="aside-inner">
			<nav class="sidebar">
				<ul class="nav">
					<li v-for="(item,index) in MenuList" :key="index" @click="fnCollapse($event)">
                <i :class="'icon '+item.ModulInfo.IMGUrl"></i>
						<a href="javascript:;">
							<span>{{item.ModuleName}}</span>
						</a>
						<ul class="sidebar-subnav" @click="fnUl($event)">
							<li v-for="(child,index) in item.Menu" :key="index">
                <i :class="'icon '+child.IMGUrl"></i>
								<router-link :to="child.RoutUrl">{{child.MenuName}}</router-link>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</div>
	<div class="aside1" v-else>
		<div class="aside-inner">
			<nav class="sidebar">
        <ul class="nav1" @click="fnColl($event)">
            <li v-for="(item,index) in MenuList" :key="index" @click="fnCollapse($event)">
                <i :class="'icon1 '+item.ModulInfo.IMGUrl"></i>
              <a href="javascript:;">
                <span>{{item.ModuleName}}</span>
              </a>
              <ul class="sidebar-subnav1" @click="fnUl($event)">
                <li v-for="(child,index) in item.Menu" :key="index">
                  <i :class="'icon '+child.IMGUrl"></i>
                  <router-link :to="child.RoutUrl">{{child.MenuName}}</router-link>
                </li>
              </ul>
            </li>
        </ul>
			</nav>
		</div>
	</div>
	</div>
</template>

<script>
import store from "@/vuex/store";
import Api from "../../axios/api";
export default {
  name: "sidebar",
  store,
  data() {
    return {
      MenuList: []
    };
  },
  computed: {
    getUserIcons() {
      return this.$store.state.isCollapse;
    }
  },
  watch: {
    getUserIcons(val) {}
  },
  mounted() {
    this.MenuList=JSON.parse(sessionStorage.MenuList)
    this.fnGetMenu()
  },
  methods: {
    //获取菜单列表
    fnGetMenu() {
      this.$get(Api.getmenu + "/" + sessionStorage.login)
        .then(res => {
          if (res.data.state == 200) {
            this.MenuList = res.data.data;
            sessionStorage.MenuList=JSON.stringify(res.data.data);
          } else {
            this.$message.error(error);
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    fnCollapse(event) {
      let that = event.currentTarget;
//    $(that)
//      .addClass("active")
//      .siblings()
//      .removeClass("active");
//
//    $(that)
//      .children(".sidebar-subnav")
//      .toggle(200)
//      .addClass("animated slideInLeft")
//      .parent()
//      .siblings()
//      .children("ul")
//      .hide(300);
//
//    setTimeout(function() {
//      $(that)
//        .children("ul")
//        .removeClass("slideInLeft animated");
//    }, 1000);
//  },
    fnUl(event) {
      event.stopPropagation();
    },
    fnColl(event) {
      event.stopPropagation();
    }
  }
};
</script>

<style scoped>
.aside {
  padding-top: 75px;
  width: 200px;
  height: 100%;
  background: #fff;
  position: fixed;
  transition: all 0.2s ease;
  z-index: 99;
}
.aside1 {
  padding-top: 75px;
  width: 70px;
  height: 100%;
  background: #fff;
  position: fixed;
  transition: all 0.2s ease;
  z-index: 99;
}

.aside::after,
.aside1::after {
  content: "";
  background: rgba(0, 0, 0, 0.15);
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  right: 0;
  width: 1px;
}
.aside-inner {
  overflow-x: hidden;
}

.sidebar > .nav > li {
  margin-bottom: 20px;
  box-sizing: border-box;
  padding-left: 10px;
  border-left: 3px solid transparent;
  -webkit-transition: border-left-color 0.4s ease;
  -o-transition: border-left-color 0.4s ease;
  transition: border-left-color 0.4s ease;
}

.aside-inner,
.navbar-header,
.sidebar > .nav > li {
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
  color: #919da8;
  font-size: 13px;
  letter-spacing: 0.035em;
  pointer-events: none;
  cursor: default;
}

.sidebar > .nav > li > a {
  padding: 12px 8px;
  letter-spacing: 0.025em;
  font-weight: normal;
  cursor: pointer;
  font-size: 16px;
  color: #515253;
}
.sidebar > .nav1 > li > a {
  padding: 12px 24px;
  letter-spacing: 0.025em;
  font-weight: normal;
  cursor: pointer;
  font-size: 16px;
  color: #515253;
}

.sidebar > .nav > li > a > i {
  width: 1.1em;
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  font-size: 22px;
  -webkit-font-smoothing: antialiased;
}
.sidebar > .nav1 > li > a > i {
  width: 1.1em;
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  font-size: 22px;
  -webkit-font-smoothing: antialiased;
}

.sidebar > .nav > li:hover > a {
  color: #23b7e5;
}
.sidebar > .nav1 > li:hover > a {
  color: #23b7e5;
}

.sidebar > .nav > li.active > a {
  color: #23b7e5;
}
.sidebar > .nav1 > li.active > a {
  color: #23b7e5;
}

.sidebar > .nav > li.active {
  border-left-color: #23b7e5;
}
.sidebar > .nav1 > li.active {
  border-left-color: #23b7e5;
}

.sidebar > .nav > li > .sidebar-subnav {
  background-color: #fcfcfc;
  /* color: #23b7e5; */
  display: block;
}
.sidebar > .nav1 > li > .sidebar-subnav1 {
  background-color: #fcfcfc;
  /* color: #23b7e5; */
  display: block;
}

.sidebar > .nav1 > li > .sidebar-subnav1 {
  display: none;
}
.sidebar > .nav > li > .sidebar-subnav {
  display: none;
}
.sidebar-subnav > li{
  box-sizing: border-box;
  padding-left:20px; 
}

.sidebar-subnav > li > a,
.sidebar-subnav > li > .nav-item {
  position: relative;
  display: inline-block;
  padding: 10px 10px 10px 0px;
  font-weight: normal;
  background-color: transparent !important;
  color: #515253;
}
.sidebar-subnav1 > li > a,
.sidebar-subnav1 > li > .nav-item {
  position: relative;
  display: inline-block;
  padding: 10px 10px 10px 0px;
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

.sidebar > .nav > li .router-link-active {
  color: #23b7e5;
}
.sidebar > .nav1 > li .router-link-active {
  color: #23b7e5;
}

.aside1 .nav1 > li {
  margin-bottom: 10px;
  position: relative;
}

.aside1 .sidebar .nav1 > li > a > span {
  display: none;
}

.aside1 .sidebar .nav1 > li {
  border: none;
  text-align: center;
}

.aside1 .sidebar .nav1 > li a {
  padding: 0;
}

.aside1 .sidebar .nav1 > li > a i {
  font-size: 30px;
}

.aside1 .sidebar {
  overflow-y: initial;
  margin-right: 0px;
  overflow-x: initial;
  padding-bottom: 0;
  box-sizing: border-box;
  height: auto;
  /* border-right: 1px solid #ccc; */
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

.aside1 .sidebar .nav1 > li ul {
  display: none !important;
  padding: 0 15px;
  text-align: left;
  line-height: 40px;
  border: 1px solid #ccc;
  width: 150px;
}

.aside1 .sidebar .nav1 > li.nav-heading {
  display: none !important;
}

.aside1 .sidebar .nav1 > li:hover > ul {
  display: block !important;
}
</style>