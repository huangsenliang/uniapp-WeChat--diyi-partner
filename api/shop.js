/**
 * 商户
 * */ 
 
 /**
  * 商户新增
  */
 export function save(data) {
 	return request.post('/diyi-user/partner/enterprise/create-enterprise', data)
 }