/**
 * 个体户
 */

import request from '@/common/http.interceptor.js'


/**
 * 个体户新增
 */
export function save(data) {
	return request.post('/diyi-user/partner/individual-business/add-or-update-individual-business', data)
}


/**
 * 获取个体户列表
 * REGISTERING("REGISTERING", "注册中"),
	TAXREGISTERING("TAXREGISTERING", "税务登记中"),
	OPERATING("OPERATING", "运营中"),
	CANCELLED("CANCELLED", "已注销");
 * @param {Object} params
 */
export function getList(params) {
	return request.get('/diyi-user/partner/individual-business/query-individual-business-list', {
		params
	})
}

/**
 * 查询个体户详情
 * @param {Object} params
 */
export function getDetail(params) {
	return request.get('/diyi-user/partner/individual-business/query-individual-business-detail', {
		params
	})
}

/**
 * 查询个体户详情
 * @param {Object} params
 */
export function getDetail2(params) {
	return request.get('/diyi-user/partner/individual-business/query-update-individual-business-detail', {
		params
	})
}


/**
 * 查询个体户月度开票金额和年度开票金额
 * @param {Object} params
 */
export function getCount(params) {
	return request.get('/diyi-order/partner/individual-business/query-month-and-year-invoice-money', {
		params
	})
}

/**
//  * 查询当前创客身份证信息
//  * @param {Object} params
//  */
// export function getIdCard(params) {
// 	return request.get('/diyi-user/partner/individual-business/query-idcard-info', {
// 		params
// 	})
// }




