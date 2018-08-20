import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from './kites/axios.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import $ from 'jquery'
import axios from 'axios'
import Api from "./kites/api";
import {
  post,
  get
} from './kites/axios'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
// // 登陆验证
// router.beforeEach((to, from, next) => {
//   //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
//   if (to.path === '/') {
//     next()
//   } else {
//     if (!localStorage.getItem('openID')) {
//       next({
//         path: '/'
//       })
//     } else {
//       next()
//     }
//   }
// })

//获取url参数
Vue.prototype.$getQueryString = function (name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}
Vue.prototype.$getUrl = function (name) {
  let url = window.location.href;
  let num;
  if (url.indexOf(name) > 0) {
    let reg = url.substring(
      url.indexOf(name) + name.length + 1,
      url.lenght
    );
    if (reg.indexOf("&") > 0) {
      num = reg.substring(0, reg.indexOf("&"));
    } else {
      num = reg;
    }
    localStorage.para = this.para = num;
  } else {
    return false;
  }
}
Vue.prototype.openIds=function(){
			
			var test = window.location.href
			var index = test.indexOf('=')
			var urls = test.substring(index + 1)
			if(test.indexOf('openID')!=-1) {
				var indexs = urls.indexOf('#/')
				localStorage.openID = urls.slice(0,indexs)
				return false;
			} else {
				if(localStorage.openID){
					return false;
				}else{
					var test1 = window.location.href
					var name = encodeURIComponent(test1)
					window.location.href = Api.auth + name
				}
			}
}
Vue.filter('datas', function (value) {
  if (!value) return ''
  let dates = new Date(value);
	let y = dates.getFullYear()
	let m = dates.getMonth() + 1;
	let d = dates.getDate();
	let s = dates.getHours();
	let f = dates.getMinutes();
	let ms = dates.getSeconds()
	return y + '-' + (m < 10 ? "0" + m : m) + '-' + (d < 10 ? "0" + d : d) + ' ' + (s < 10 ? "0" + s : s) +':'+(f < 10 ? "0" + f : f) +':' + (ms < 10 ? "0" + ms : ms)
//	+ ':' + f +':' + m;
})
Vue.filter('yy', function (value) {
  if (!value) return ''
  let dates = new Date(value);
	let y = dates.getFullYear()
	let m = dates.getMonth() + 1;
	let d = dates.getDate();
	return y + '-' + (m < 10 ? "0" + m : m) + '-' + (d < 10 ? "0" + d : d)
//	+ ':' + f +':' + m;
})
Vue.prototype.$isTel = function (str) {
  if (str == null) return false;
  // var ph= /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
//let ph = /^1\d{10}$/;
  let mb = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  return mb.test(str); //检测电话号码格式
}
//验证身份证
Vue.prototype.$isCard= function (str) {
  if (str == null) return false;
  // var ph= /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
  let card =/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
  return card.test(str) //检测电话号码格式
}
//Vue.use(axios)
Vue.use(ElementUI)
//import Qs from 'qs'
//import $ from 'jquery'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
