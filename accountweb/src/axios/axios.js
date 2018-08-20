import axios from 'axios';
import router from '../router';


axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';
//http request 拦截器
axios.interceptors.request.use(
	config => {
		const token = sessionStorage.token
		config.data = JSON.stringify(config.data);
		config.headers = {
			'Content-Type': 'application/json;charset=UTF-8',
			'Token':token
		}
		if(!token) {
			router.push({
				path: "/",
			})
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
		if(response.data.msg== "非法请求" || response.data.msg== "Token失效"|| response.data.msg== "登录超时"){
			router.push({
				path: '/'
			})
		}
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
			})
	})
}