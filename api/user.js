import request from '@/common/http.interceptor.js'

/**
 * 创客（分包方）的基本信息相关接口
 */


/**
 * 注册用户
 */
export function register(data) {
	data.userType = 'PARTNER'
	return request.post('/diyi-auth/auth/register', data)
}

/**
 * 微信授权登录
 * @param {Object} data
 */
export function wechatLogin(data) {
	data.userType = 'PARTNER'
	return request.post('/diyi-auth/auth/wechat-login', data)
}

/**
 * 账号密码登录
 * @param {Object} data
 */
export function loginByPwd(data) {
	data.userType = 'PARTNER'
	return request.post('/diyi-auth/auth/password-login', data)
}

/**
 * 账号密码登录
 * @param {Object} data
 */
export function loginByMobile(data) {
	data.userType = 'PARTNER'
	return request.post('/diyi-auth/auth/mobile-login', data)
}


/**
 * 获取用户信息
 */
export function getInfo() {
	return request.get('/diyi-user/partner/home-page/query-current-partner-detail')
}

/**
 * 修改密码
 * @param {Object} data
 */
export function updatePassword(data) {
	data.userType = 'PARTNER'
	return request.post('/diyi-auth/auth/update-password', data)
}
/**
 * 更新用户信息
 * @param {Object} data
 */
export function updateInfo(data) {
	return request.post('/diyi-user/partner/home-page/update-partner-detail', data)
}
/**
 * 更新手机号
 * @param {Object} data
 */
export function updatePhone(data) {
	return request.post('/diyi-user/partner/home-page/update-phone-number', data)
}