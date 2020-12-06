import Request from '@/common/luch-request/index.js'
import store from '@/store/index.js'

const http = new Request();


http.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = process.env.VUE_APP_BASE_API
	config.header = {
		...config.header,
		'content-type': 'application/json;charset=UTF-8'
	}
	return config
})


http.interceptors.request.use((config) => {
	// 引用token
	config.header.Authorization = 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0';
	if (store.state.vuex_token) {
		config.header['diyi-auth'] = 'Bearer ' + store.state.vuex_token;
	}

	return config;
}, (config) => {
	return Promise.reject(config)
})

http.interceptors.response.use(
	(response) => {
		let res = response.data || {}
		if (!res.code) {
			return Promise.reject({
				msg: '请求失败',
				code: 300,
				data: null
			})
		}

		if (res.code === 200) {
			return res
		} 
		else if (res.code === 401) {
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}, 1500)
			return Promise.reject({
				msg: null,
				code: 401,
				data: null
			})
		} else {
			return Promise.reject(res)
		}
	},
	(response) => {
		if (response.statusCode === 401) {
			uni.showToast({
				title: '请求超时，请重新登录',
				icon: 'none',
				duration: 1500
			})
			uni.removeStorageSync('lifeData')
			store.vuex_token = ''
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}, 1500)
			return Promise.reject({
				msg: null,
				code: 401,
				data: null
			})
		}
		let data = response.data
		if (!response.data.msg) {
			response.data.msg = '请求失败'
		}
		return Promise.reject(data)
	})



export default http
