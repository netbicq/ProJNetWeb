// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
import $ from 'jquery'
import Promise from 'promise-polyfill';   
   
// To add to window  
if (!window.Promise) {  
  window.Promise = Promise;  
}
import axios from 'axios'
import { post, get } from './axios/fetch'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$toMoment = function(fmt) {
	let date = new Date(fmt);
	let y = date.getFullYear()
	let m = date.getMonth() + 1;
	let d = date.getDate();
	
	return y + '-' + (m < 10 ? "0" + m : m) + '-' + (d < 10 ? "0" + d : d)
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
//定义全局变量
Vue.prototype.$toTree = function(data) {
	data.forEach(function(item) {
		delete item.children;
	});
	var tree = {};
	data.forEach(function(item) {
		tree[item.value] = item;
	});
	var datas = [];
	data.forEach(function(item) {
		var parent = tree[item.ParentID];
		if(parent) {
			(parent.children || (parent.children = [])).push(item);
		} else {
			datas.push(item);
		}
	});
	return datas;
}
Vue.prototype.$post = post;
Vue.prototype.$get = get;
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})