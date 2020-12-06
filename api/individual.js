/**
 * 个独管理
 */

import request from '@/common/http.interceptor.js'



/**
 * 个独新增
 */
export function save(data) {
	return request.post('/diyi-user/partner/individual-enterprise/add-or-update-individual-enterprise', data)
}


/**
 * 获取个独列表
 * REGISTERING("REGISTERING", "注册中"),
	TAXREGISTERING("TAXREGISTERING", "税务登记中"),
	OPERATING("OPERATING", "运营中"),
	CANCELLED("CANCELLED", "已注销");
 * @param {Object} params
 */
export function getList(params) {
	return request.get('/diyi-user/partner/individual-enterprise/query-individual-enterprise-list', {
		params
	})
}

/**
 * 查询个独详情
 * @param {Object} params
 */
export function getDetail(params) {
	console.log("8888888888")
	return request.get('/diyi-user/partner/individual-enterprise/query-individual-enterprise-detail', {
		params
	})
}

/**
 * 查询编辑个独详情(详细)
 * @param {Object} params
 */
export function getDetail2(params) {
	
	return request.get('/diyi-user/partner/individual-enterprise/query-update-individual-enterprise-detail', {
		params
	})
}


/**
 * 查询个独月度开票金额和年度开票金额
 * @param {Object} params
 */
export function getCount(params) {
	return request.get('/diyi-order/partner/individual-enterprise/query-month-and-year-invoice-money', {
		params
	}) 
}
/**
 * 查询当前创客身份证信息
 * @param {Object} params
 */
export function getIdCard(params) {
	return request.get('/diyi-user/partner/individual-enterprise/query-idcard-info', {
		params
	})
}
