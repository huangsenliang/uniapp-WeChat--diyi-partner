import request from '@/common/http.interceptor.js'

/**
 * 添加商户
 */
export function addEnterprise(data) {
	return request.post('/diyi-user/partner/enterprise/create-enterprise', data)
}  
/**
 * 添加商户
 */
export function updateEnterprise(data) {
	return request.post('/diyi-user/partner/enterprise/update-enterprise', data)
}  
/**
 * 查询商户详情
 * */ 
export function getDetail(params) {
	return request.get("/diyi-user/partner/enterprise/query-enterprise-detail", {
		params
	})
}



/**
 * 查询合伙人所有商户编号姓名
 * */ 
export function getEnterpriseList(params) {
	return request.get("/diyi-user/partner/enterprise/query-enterprise-id-and-name-list", {
		params
	})
}

/**
 * 查询编辑商户详情
 * */ 
export function getDetail2(params) {
	return request.get("/diyi-user/partner/enterprise/query-enterprise-update-detail", {
		params
	})
}

/**
 * 编辑商户
 */
export function editorEnterprise(data) {
	return request.post('/diyi-user/partner/enterprise/update-enterprise', data)
}

/**
 * 查询商户交易数据
 * */  

export function getTransactionDetail(params) {
	return request.get("/diyi-order/partner/enterprise/query-enterprise-transaction", {
		params
	})
}

/**
 * 查询总包+分包
 * */  

export function geTenterpriseList(params) {
	return request.get("/diyi-order/partner/enterprise/query-pay-enterprise-list", {
		params
	})
}

/**
 * 查询总包支付清单详情
 * */  

export function gePayEnterpriseDetail(params) {
	return request.get("/diyi-order/partner/enterprise/query-pay-enterprise-detail", {
		params
	})
}




/**
 * 根据支付清单查询分包支付明细
 * */  

export function getPayMakerList(params) {
	return request.get("/diyi-order/partner/enterprise/query-pay-maker-list", {
		params
	})
}

/**
 * 查询总包支付清单物流信息
 * */  

export function getPayExpressDetail(params) {
	return request.get("/diyi-order/partner/enterprise/query-pay-enterprise-express", {
		params
	})
}




