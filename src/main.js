// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import $ from 'jquery'

import axios from 'axios'
import { post, get } from './axios/fetch'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
//Vue.filter('yy', function (value) {
//if (!value) return ''
//let dates = new Date(value);
//	let y = dates.getFullYear()
//	let m = dates.getMonth() + 1;
//	let d = dates.getDate();
//	return y + '.' + m + '.' + d
////	+ ':' + f +':' + m;
//})

Vue.prototype.$isTel = function (str) {
  if (str == null) return false;
  // var ph= /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
  let ph = /^1\d{10}$/;
  let mb = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
  return ph.test(str) || mb.test(str); //检测电话号码格式
}
//验证身份证
Vue.prototype.$isCard= function (str) {
  if (str == null) return false;
  // var ph= /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
  let card =/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
  return card.test(str) //检测电话号码格式
}
Vue.filter('yy', function (value) {
  if (!value) return ''
  let dates = new Date(value);
  if(dates=='Invalid Date'){
  	return value
  }
	let y = dates.getFullYear()
	let m = dates.getMonth() + 1;
	let d = dates.getDate();
	return y + '.' + (m < 10 ? "0" + m : m) + '.' + (d < 10 ? "0" + d : d)
//	+ ':' + f +':' + m;
})
Vue.filter('date', function (value) {
  if (!value) return ''
  let dates = new Date(value);
	let y = dates.getFullYear()
	let m = dates.getMonth() + 1;
	let d = dates.getDate();
	return y + '.' + (m < 10 ? "0" + m : m)
//	+ ':' + f +':' + m;
})
//Vue.filter('getValue', function (ojb,strkey){
//	if(ojb==''){
//		return ''
//	}else{
//		var strkeyArr = ojb.split('.').filter(item=>item!=='');
//		var s = strkeyArr[0]
//		var b = strkeyArr[1]
//	  return strkey[s][b]
//	}
//})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})