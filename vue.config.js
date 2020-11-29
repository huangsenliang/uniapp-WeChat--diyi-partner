const defaultSettings = require('./settings.js')

module.exports = {
	// 代理设置
	// #ifdef H5
	devServer: {
		proxy: {
			'/': {
				ws: false,
				target: 'https://wxtest.diyicr.com',
				changeOrigin: true,
				secure: false
			},
		}
	},
	// #endif
	chainWebpack: config => {
		// 添加环境变量   
		config.plugin("define")
			.tap(args => {
				let envconfigs = null
				if (args[0]["process.env"].NODE_ENV === '"development"') {
					envconfigs = defaultSettings['development']
					if (args[0]["process.env"].VUE_APP_PLATFORM === '"h5"') {
						envconfigs.VUE_APP_BASE_API = envconfigs.VUE_APP_BASE_API_H5
					}
				} else if (args[0]["process.env"].NODE_ENV === '"production"') {
					envconfigs = defaultSettings['production']
				}
				if (envconfigs) {
					for (let i in envconfigs) {
						if (envconfigs.hasOwnProperty(i)) {
							args[0]["process.env"][i] = '"' + envconfigs[i] + '"';
						}
					}
				}
				return args;
			});
	},
};
