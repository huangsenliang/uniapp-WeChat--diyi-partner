import request from '@/common/http.interceptor.js'

/**
 * 地址相关接口
 */


/**
 * 地址列表
 */
export function getList(params) {
	return request.get('/diyi-order/partner/address/query-address-list', {
		params
	})
}
/**
 * 详情
 */
export function getDetail(params) {
	return request.get('/diyi-order/partner/address/query-address-detail', {
		params
	})
}

/**
 * 新增/修改地址
 * @param {Object} data
 */
export function update(data) {
	return request.post('/diyi-order/partner/address/create-address', data)
}

/**
 * 删除地址
 * @param {Object} data
 */
export function del(params) {
	return request.post('/diyi-order/partner/address/delete-address', {}, {
		params
	})
}