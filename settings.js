/**
 * 注意配置需要 VUE_APP_ 开始防止与其他内容冲突
 * 其他页面可调用 process.env.xxx 获取配置信息
 */
const ENV = {
	// 开发模式配置
	development: {
		VUE_APP_BASE_API_H5: 'http://246953jp33.qicp.vip/', // H5基本请求地址
		// VUE_APP_BASE_API: 'https://wxtest.diyicr.com', // 其他基本请求地址
		VUE_APP_BASE_API: 'https://246953jp33.qicp.vip', // 其他基本请求地址 (小程序、app)
		VUE_APP_UPLOAD_URL: '/diyi-user/common/oss-file-upload' // 上传地址
	},
	// 生产模式配置
	production: {
		// VUE_APP_BASE_API: 'https://wxtest.diyicr.com',
		VUE_APP_BASE_API: 'https://246953jp33.qicp.vip',
		// VUE_APP_BASE_API: 'http://246953jp33.qicp.vip', // 其他基本请求地址
		VUE_APP_UPLOAD_URL: '/diyi-user/common/oss-file-upload' // 上传地址
	}
}


module.exports = ENV
