/**
 * 添加商户
 */
export function addEnterprise(data) {
	return request.post('/diyi-user/partner/enterprise/create-enterprise', data)
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