/**
 * 获取个体户税种
 * @param {Object} value
 */
export function getPersonalTax(value) {
	const data = [{
		value: 'SMALL',
		name: '小规模 \n 3%普票、专票，开票额：450万元'
	}]
	if (!value) {
		return data
	}
	let name = ''
	for (let i = 0, len = data.length; i < len; i++) {
		if (data[i].value === value) {
			name = data[i].name
			break
		}
	}
	return name
}

/**
 * 获取个体户/个独状态
 * @param value
 * @returns {[{name: string, value: string}]|string}
 */
export function getIbState(value) {
	const data = [
		{
			value: 'EDITING',
			name: '编辑中'
		},
		{
			value: 'BUSINESSREGISTERING',
			name: '工商注册中'
		},
		{
			value: 'BANKACCOUNTING',
			name: '银行开户中'
		},
		{
			value: 'TAXREGISTERING',
			name: '税务登记中'
		},
		{
			value: 'OPERATING',
			name: '运营中'
		},
		{
			value: 'CANCELLED',
			name: '已注销'
		}
	]
	if (!value) {
		return data
	}
	let name = ''
	for (let i = 0, len = data.length; i < len; i++) {
		if (data[i].value === value) {
			name = data[i].name
			break
		}
	}
	return name
}

/**
 * 获取个独税种
 * @param {Object} value
 */
export function getIndividualTax(value) {
	const data = [{
			value: 'SMALL',
			name: '小规模 \n 3%普票、专票，开票额：450万元',
		},
		{
			value: 'TAXPAYER',
			name: '一般纳税人 \n 服务业6%专票，开票额：3000万 \n 商贸业13%专票，开票额：5000万',
		},
	]
	if (!value) {
		return data
	}
	let name = ''
	for (let i = 0, len = data.length; i < len; i++) {
		if (data[i].value === value) {
			name = data[i].name
			break
		}
	}
	return name
}

/**
 * 自助开票类型
 * @param {Object} value
 */
export function getInvoiceType(value) {
	const data = [{
			value: 'NATURALPERSON',
			name: '自然人'
		},
		{
			value: 'INDIVIDUALENTERPRISE',
			name: '个独'
		},
		{
			value: 'INDIVIDUALBUSINESS',
			name: '个体户'
		},
	]
	if (!value) {
		return data
	}
	let name = ''
	for (let i = 0, len = data.length; i < len; i++) {
		if (data[i].value === value) {
			name = data[i].name
			break
		}
	}
	return name
}

/**
 * 工单模式
 * @param {Object} value
 */
export function getTaskMode(value) {
	const data = [{
			value: 'DISPATCH',
			name: '派单'
		},
		{
			value: 'GRABBING',
			name: '抢单'
		},
		{
			value: 'BLEND',
			name: '混合'
		},
	]
	if (!value) {
		return data
	}
	let name = ''
	for (let i = 0, len = data.length; i < len; i++) {
		if (data[i].value === value) {
			name = data[i].name
			break
		}
	}
	return name
}
/**
 * 工单类型
 * @param {Object} value
 */
export function getTaskType(value) {
	const data = [{
			value: 'SUBPACKAGE',
			name: '总包+分包'
		},
		{
			value: 'CROWDSOURCED',
			name: '众包/众采'
		},
	]
	if (!value) {
		return data
	}
	let name = ''
	for (let i = 0, len = data.length; i < len; i++) {
		if (data[i].value === value) {
			name = data[i].name
			break
		}
	}
	return name
}
/**
 * 合同签署状态
 * @param {Object} value
 */
export function getSignStatus(value) {
	const data = [{
			value: 'UNSIGN',
			name: '未签署'
		},
		{
			value: 'SIGNING',
			name: '签署中'
		},
		{
			value: 'SIGNED',
			name: '已签署'
		},
	]
	if (!value) {
		return data
	}
	let name = ''
	for (let i = 0, len = data.length; i < len; i++) {
		if (data[i].value === value) {
			name = data[i].name
			break
		}
	}
	return name
}
/**
 * 合同类型
 * @param {Object} value
 */
export function getSignType(value) {
	const data = [{
			value: 'MAKERJOINAGREEMENT',
			name: '加盟合同',
			bool: true
		},
		{
			value: 'ENTERPRISEJOINAGREEMENT',
			name: '商户加盟协议',
			bool: true
		},
		{
			value: 'SERVICEPROVIDERJOINAGREEMENT',
			name: '服务商加盟协议',
			bool: true
		},
		{
			value: 'AGENTJOINAGREEMENT',
			name: '渠道商加盟协议',
			bool: true
		},
		{
			value: 'PARTNERJOINAGREEMENT',
			name: '合伙人加盟协议',
			bool: true
		},
		{
			value: 'PARKAGREEMENT',
			name: '园区合作协议',
			bool: true
		},
		{
			value: 'TAXBUREAUAGREEMENT',
			name: '税局合作协议',
			bool: true
		},
		{
			value: 'BUSINESSCIRCLESAGREEMENT',
			name: '工商合作协议',
			bool: true
		},
		{
			value: 'MAKERPOWERATTORNEY',
			name: '授权委托书',
			bool: true
		},
		{
			value: 'ENTMAKSUPPLEMENTARYAGREEMENT',
			name: '商户-创客补充协议',
			bool: true
		},
		{
			value: 'SERENTSUPPLEMENTARYAGREEMENT',
			name: '服务商-商户补充协议',
			bool: true
		},
		{
			value: 'MAKERTAXPOWERATTORNEY',
			name: '创客单独税务事项委托授权书',
			bool: true
		},
		{
			value: 'MAKERPAYPOWERATTORNEY',
			name: '创客单独支付事项委托授权书',
			bool: true
		},
		{
			value: 'ENTERPRISEPRICEAGREEMENT',
			name: '商户加盟价格协议',
			bool: true
		},
		{
			value: 'ENTERPRISEPROMISE',
			name: '商户承诺函',
			bool: true
		},
		{
			value: 'ENTERPRISEPOWERATTORNEY',
			name: '商户授权书',
			bool: true
		},
		{
			value: 'OTHERAGREEMENT',
			name: '其他协议',
			bool: true
		}
	]
	if (!value) {
		return data
	}
	let name = ''
	for (let i = 0, len = data.length; i < len; i++) {
		if (data[i].value === value) {
			name = data[i].name
			break
		}
	}
	return name
}
/**
 * 视频审核状态
 * @param {Object} value
 */
export function getVideoStatus(value) {
	const data = [{
			value: 'TOAUDIT',
			name: '未审核',
			type: 'text-default'
		},
		{
			value: 'AUDITPASS',
			name: '审核通过',
			type: 'text-success'
		},
		{
			value: 'AUDITFAIL',
			name: '审核未通过',
			type: 'text-danger'
		},
	]
	if (!value) {
		return data
	}
	let name = ''
	for (let i = 0, len = data.length; i < len; i++) {
		if (data[i].value === value) {
			name = data[i].name
			break
		}
	}
	return name
}

/**
 * 认证状态
 * @param {Object} value
 */
export function getCertStatus(value, obj) {
	const data = [{
			value: 'TOVERIFY',
			name: '未验证',
			type: 'text-default'
		},
		{
			value: 'VERIFYPASS',
			name: '验证通过',
			type: 'text-success'
		},
		{
			value: 'VERIFYFAIL',
			name: '验证未通过',
			type: 'text-danger'
		},
	]
	if (!value) {
		return data
	}
	let name = obj ? {} : ''
	for (let i = 0, len = data.length; i < len; i++) {
		if (data[i].value === value) {
			if (obj) {
				name = data[i]
			} else {
				name = data[i].name
			}
			break
		}
	}
	return name 
}
