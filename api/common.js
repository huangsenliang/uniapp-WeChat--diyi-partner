/**
 * 公用接口
 */
import request from '@/common/http.interceptor.js'

// export function test() {
// 	return request.get('/diyi-auth/auth/captcha')
// }

/**
 * 发送短信验证码
 */
export function getSms(data) {
	data.userType = 'PARTNER'  // 合伙人端
	return request.post('/diyi-auth/auth/send-code', data)
}

/**
 * 身份证识别
 * @param {Object} picString
 */
export function getIdCardInfo(picString) {
	return request.get('/diyi-order/selfhelpinvoice/identificationCard', {
		params: {
			infoImg: picString
		}
	})
}

/**
 * 文件上传
 * @param {Object} file
 */
export function upload(file, type) {
	const data = {}
	if (type !== 'video') {
		data.suffix = 'png,jpg'
	}
	return request.upload(process.env.VUE_APP_UPLOAD_URL, {
		params: {},
		formData: data,
		// #ifdef MP-ALIPAY
		fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
		// #endif
		filePath: file, // 要上传文件资源的路径。
		name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
	})
}

/**
 * 获取首页统计数据
 */
export function getCount() {
	return request.get('/diyi-order/maker/home-page/query-enterprise-num-and-income')
}

/**
 * 获取字典tree
 *
 * 民族    nation
 快递    express
 银行    bank
 行业    industry
 性别     sex
 通知     notice
 菜单      menu_category
 按钮功能    button_func
 是否       yes_no
 岗位        post_category
 契合度类型      fit_degree
 文化程度类型     culture
 * @returns {AxiosPromise}
 */
export function getDict(params) {
  return request.get('/diyi-system/dict/query-dict-tree', {
	  params
  })
}

/**
 * 查询当前合伙人关联的创客
 * @param {Object} params
 */
export function getIdMakeList(params) {
	return request.get('/diyi-user/partner/individual-business/query-maker-list', {
		params
	})
}