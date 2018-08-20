import axios from 'axios';
import router from '../router';


axios.defaults.timeout = 10000;
axios.defaults.baseURL = '';
//http request 拦截器
axios.interceptors.request.use(
	config => {
		const openid = localStorage.openID
		const token = localStorage.token
		config.data = JSON.stringify(config.data);
		config.headers = {
			'Content-Type': 'application/json;charset=UTF-8',
			'openid':openid,
			'Authorization':'Bearer '+token
		}
		return config;
	},
	error => {
		return Promise.reject(err);
	}
);

//http response 拦截器
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return Promise.reject(error)
	}
)

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				resolve(response);
			}, err => {
				reject(err)
				if(err.response.status==500){
					router.push({
						path: '/'
					})
				}else if(err.response.status==403){
					router.push({
						path: '/powe'
					})
				} else if(err.response.status==401){
					router.push({
						path: '/login'
					})
				}else if(err.response.status==400){
					router.push({
						path: '/'
					})
				}
			})
	})
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params
			})
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				reject(err)
				if(err.response.status==500){
					router.push({
						path: '/'
					})
				}else if(err.response.status==403){
					router.push({
						path: '/powe'
					})
				} else if(err.response.status==401){
					router.push({
						path: '/login'
					})
				}else if(err.response.status==400){
					router.push({
						path: '/'
					})
				}
				
			})
	})
}