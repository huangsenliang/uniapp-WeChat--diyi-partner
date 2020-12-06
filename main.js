import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import store from './store'
const dayjs = require('@/utils/dayjs.min.js');
import * as filters from './common/filter.js'

import {
	getInfo
} from '@/api/user.js';

Vue.use(uView)

const vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

Vue.config.productionTip = false

App.mpType = 'app'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$toast = function(msg, type, options) {
	if (!msg) return;
	options = options || {}
	const ref = options.ref || 'uTips'
	this.$refs[ref].show({
		title: msg,
		type: type ? 'success' : 'error',
		duration: options.duration || 2000
	});
}

// 轻提示
Vue.prototype.toast = (content, position) => {
	if (content) {
		uni.showToast({
			title: content,
			icon: 'none',
			position: position || 'bottom',
			duration: 2000
		})
	}
}

Vue.prototype.$toPage = function(url) {
	uni.navigateTo({
		url: url
	})
}

Vue.prototype.$dayjs = dayjs
/**
 * 延迟返回
 */
Vue.prototype.$back = function(duration) {
	setTimeout(() => {
		uni.navigateBack({

		})
	}, duration || 1000)
}

Vue.prototype.$loading = function(type) {
	if (type === false) {
		uni.hideLoading();
	} else {
		uni.showLoading({
			title: '请稍后'
		});
	}
}
/**
 * 打开文档
 * @param {Object} url
 */
Vue.prototype.$openFile = function(url) {
	// if (test.isEmpty(url)) {
	// 	return uni.showToast({
	// 		title: '打开文档失败',
	// 		icon: 'none',
	// 		duration: 2000
	// 	})
	// }
	const srcArr = url.split('.')
	if (srcArr.length && srcArr[srcArr.length - 1] === 'pdf') {
		const that = this
		uni.downloadFile({
			url: url,
			success: function(res) {
				var filePath = res.tempFilePath;
				uni.openDocument({
					filePath: filePath,
					success: function(res) {},
					fail: function() {
						uni.showToast({
							title: '打开文档失败',
							icon: 'none',
							duration: 2000
						})
					}
				});
			}
		});
	} else {
		uni.previewImage({
			urls: [url],
			longPressActions: {
				success: function(data) {},
				fail: function(err) {}
			}
		});
	}
}
// bus总线制
Vue.prototype.$EventBus = new Vue();

// 上传图片
Vue.prototype.$chooseImage = (count = 8) => {
	return new Promise((resolve) => {
		uni.chooseImage({
			count: count,
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图
			sourceType: ['camera', 'album'], //从相册选择
			success: function(res) {
				resolve(res)
			}
		});
	})
}

Vue.prototype.$previewImg = function(src) {
	if (test.isEmpty(src)) {
		return uni.showToast({
			title: '打开文件失败',
			icon: 'none',
			duration: 2000
		})
	}
	const srcArr = src.split('.')
	if (srcArr.length && srcArr[srcArr.length - 1] === 'pdf') {
		uni.downloadFile({
			url: url,
			success: function(res) {
				var filePath = res.tempFilePath;
				uni.openDocument({
					filePath: filePath,
					success: function(res) {},
					fail: function() {
						uni.showToast({
							title: '打开文档失败',
							icon: 'none',
							duration: 2000
						})
					}
				});
			}
		});
	} else {
		uni.previewImage({
			urls: [src],
			longPressActions: {
				success: function(data) {},
				fail: function(err) {}
			}
		});
	}
}

// 图片预览
Vue.prototype.$previewImage = (url)=>{
			if (url) {
				uni.previewImage({
					urls: [url],
				});
			}
		},

/**
 * 更新用户信息
 * @param {Object} options
 */
Vue.prototype.$setUserInfo = function(options) {
	options = options || {}
	getInfo()
		.then(res => {
			this.$u.vuex('vuex_user', res.data)
			if (options.success) {
				options.success(res)
			}
			if (options.callback) {
				options.callback(res)
			}
		})
		.catch(res => {
			if (options.error) {
				options.error(res)
			}
			if (options.callback) {
				options.callback(res)
			}
		});
}

/**
 * YYYY-MM-DD HH:mm:ss
 */
Vue.filter('filterDate', (string, format) => {
	if (!string) return ''
	format = format || 'YYYY-MM-DD'
	return dayjs(string).format(format)
})

const app = new Vue({
	store,
    ...App
})

app.$mount()
