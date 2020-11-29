const globalName = 'lifeData'
const tokenName = 'vuex_token'

/**
 * 获取本地存储
 * @param {Object} name
 */
export function getStore(name) {
	try {
		return uni.getStorageSync((name || globalName));
	} catch (e) {
		return {}
	}
}

/**
 * 删除本地存储
 * @param {Object} name
 */
export function removeStore(name) {
	try {
		uni.removeStorageSync(name)
		return true
	} catch (e) {
		return false
	}
}

/**
 * 新增本地存储
 * @param {Object} name
 * @param {Object} val
 */
export function setStore(name, val) {
	try {
		uni.setStorageSync(name, val)
		return true
	} catch (e) {
		return false
	}
}

/**
 * 获取token
 */
export function getToken() {
	const lifeData = getStore(globalName)
	if (lifeData) {
		return lifeData[tokenName]
	}
	return false
}


/**
 * 存储token
 * @param {Object} token
 */
export function setToken(token) {
	let lifeData = getStore(globalName) || {}
	lifeData[tokenName] = token
	return setStore(lifeData)
}

