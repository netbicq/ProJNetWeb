// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

import axios from 'axios'
import {
  post,
  get
} from './axios/axios'

Vue.prototype.$post = post;
Vue.prototype.$get = get;

// 登陆验证
router.beforeEach((to, from, next) => {
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
  if (to.path === '/') {
    next()
  } else {
    if (to.meta.requiresAuth && !sessionStorage.getItem('token')) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})
//时间格式化
Vue.prototype.$toMoment = function (fmt) {
  let date = new Date(fmt);
  let y = date.getFullYear()
  let m = date.getMonth() + 1;
  let d = date.getDate();
  return y + '-' + m + '-' + d;
}
Vue.prototype.$toMoment1 = function(fmt) {
	let date = new Date(fmt);
	let y = date.getFullYear()
	let m = date.getMonth() + 1;
	let d = date.getDate();
	let s = date.getHours();
	let f = date.getMinutes();
	let ms = date.getSeconds()
	return y + '-' + (m < 10 ? "0" + m : m) + '-' + (d < 10 ? "0" + d : d) + ' ' + (s < 10 ? "0" + s : s) +':'+(f < 10 ? "0" + f : f) +':' + (ms < 10 ? "0" + ms : ms)
}
//验证电话号码，座机和手机
Vue.prototype.$isTel = function (str) {
  if (str == null) return false;
  // var ph= /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
  let ph = /^1\d{10}$/;
  let mb = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
  return ph.test(str) || mb.test(str); //检测电话号码格式
}
//验证邮箱格式
Vue.prototype.$isEmail = function (str) {
  if (str == null) return false;
  let reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
  return reg.test(str); //检测字符串是否符合正则表达式
}
//判断对象属性值为空
Vue.prototype.$isNull = function (object) {
  for (let prop in object) {
    if (object[prop] === '' || object[prop] === null || object[prop] === undefined) {
      // console.log(prop, '为空')
      return prop;
    }
  }
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
