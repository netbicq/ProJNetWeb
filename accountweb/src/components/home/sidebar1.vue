<template>
	<div v-bind:class="{'sideBar': $store.state.isCollapse, 'sideBar1': !$store.state.isCollapse}">
		<ul class="menu" v-if="$store.state.isCollapse">
      <li class="home actived" title="用户管理">
				<router-link to="/system" class="subnavTop"><i class="icon icon-yonghu"></i><span>用户管理</span></router-link>
			</li>
			<li class="" title="账套管理">
				<router-link to="/account" class="subnavTop"><i class="icon icon-tubiaozhizuomobanyihuifu-"></i><span>账套管理</span></router-link>
			</li>
			<li class="" title="电子卡">
				<router-link to="/card" class="subnavTop"><i class="icon icon-qiapian"></i><span>电子卡</span></router-link>
			</li>
			<li class="" title="设备">
				<router-link to="/device" class="subnavTop"><i class="icon icon-icon-"></i><span>设备</span></router-link>
			</li>
			<li class="" title="自定义报表">
				<router-link to="/RPTList" class="subnavTop"><i class="icon icon-icon-p_mrpbaobiao"></i><span>自定义报表</span></router-link>
			</li>
			<li class="" title="报表子表">
				<router-link to="/RPTChildeTable" class="subnavTop"><i class="icon icon-weibiaoti4"></i><span>报表子表</span></router-link>
			</li>
		</ul>
		
		<ul class="menu1" v-else>
      	<li class="home actived" title="用户管理">
				<router-link to="/system" class="subnavTop"><i class="icon icon-yonghu"></i><span>用户管理</span></router-link>
			</li>
			<li class="" title="账套管理">
				<router-link to="/account" class="subnavTop"><i class="icon icon-tubiaozhizuomobanyihuifu-"></i><span>账套管理</span></router-link>
			</li>
			<li class="" title="电子卡">
				<router-link to="/card" class="subnavTop"><i class="icon icon-qiapian"></i><span>电子卡</span></router-link>
			</li>
			<li class="" title="设备">
				<router-link to="/device" class="subnavTop"><i class="icon icon-icon-"></i><span>设备</span></router-link>
			</li>
			<li class="" title="自定义报表">
				<router-link to="/RPTList" class="subnavTop"><i class="icon icon-icon-p_mrpbaobiao"></i><span>自定义报表</span></router-link>
			</li>
			<li class="" title="报表子表">
				<router-link to="/RPTChildeTable" class="subnavTop"><i class="icon icon-weibiaoti4"></i><span>报表子表</span></router-link>
			</li>
		</ul>
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
    $(".router-link-active")
      .parent()
      .parent()
      .siblings()
      .css("color", "#23b7e5");
    $(".home").click(function() {
      $(".subnav").hide(300);
    });
    $(".subnav").hide();
    $(".menu>li").on("click", function() {
      $(this)
        .addClass("actived")
        .siblings()
        .removeClass("actived");
      var that = $(this);
      $(this)
        .children(".subnavTop")
        .css("color", "#23b7e5")
        .parent()
        .siblings()
        .children(".subnavTop")
        .css("color", "#515253")
        .end()
        .end()
        .children(".subnav")
        .toggle(200)
        .addClass("animated slideInLeft")
        .parent()
        .siblings()
        .children("ul")
        .hide(300);
      setTimeout(function() {
        that.children("ul").removeClass("slideInLeft animated");
      }, 1000);
    });
    $(".menu>li>ul").click(function() {
      event.stopPropagation();
    });
  }
 
};
</script>

<style>
.sideBar {
  padding-top: 55px;
  width: 200px;
  height: 100%;
  background: #fff;
  position: fixed;
  transition: all 0.2s ease;
  z-index: 99;
}
.m {
  margin-left: -70px;
}
.sideBar1 {
  padding-top: 55px;
  width: 70px;
  height: 100%;
  background: #fff;
  position: fixed;
  transition: all 0.2s ease;
  z-index: 99;
}
.sideBar::after,
.sideBar1::after {
  content: "";
  background: rgba(0, 0, 0, 0.15);
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  right: 0;
  width: 1px;
}

.menu {
  width: 100%;
  color: #fff;
  padding-bottom: 80px;
}

.menu li.actived {
  border-left-color: #23b7e5;
}
.menu > li {
  position: relative;
  transition: all 0.3s;
}

.subnav li a {
  padding-left: 45px;
  transition: all 0.3s;
}

.menu li {
  border-left: 3px solid transparent;
  -webkit-transition: border-left-color 0.2s ease;
  -o-transition: border-left-color 0.2s ease;
  transition: all 0.2s ease;
}

.menu a {
  color: #515253;
  padding: 12px 24px;
  letter-spacing: 0.025em;
  font-weight: 400;
  cursor: pointer;
  display: block;
  text-decoration: none;
  transition: all 0.3s;
  text-align: left;
}

.router-link-active {
  background-color: #fcfcfc;
  color: #23b7e5 !important;
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

.menu1 a {
  color: #515253;
  text-decoration: none;
}
.menu1 {
  height: 100%;
  width: 70px;
  color: #515253;
  transition: all 0.3s;
}
.menu1 .icon {
  font-size: 25px;
}
.menu1 span {
  display: none;
  transition: all 0.3s;
}
.menu1 > li {
  padding: 10px 0;
  position: relative;
}
.menu1 > li > a {
  text-align: center;
  display: block;
}
.menu1 > li > .subnav1 {
  width: 200px;
  background: #3a3f51;
  position: absolute;
  display: none;
  top: 0;
  left: 67px;
  z-index: 99;
  transition: all 0.3s;
  border-left: 2px solid #2f3447;
}
.subnav1 > li {
  line-height: 40px;
  text-indent: 20px;
}
.menu1 > li:hover .subnav1 {
  display: block !important;
}
.menu1 > li > .subnav1 > li > a {
  display: block;
}
.menu .icon {
  font-size: 15px;
  margin-right: 10px;
}
</style>
