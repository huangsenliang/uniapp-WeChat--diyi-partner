<script>
	export default {
		onLaunch: function() {
			this.checkUpdateVersion();
		},
		onShow: function() {
		},
		onHide: function() {
		},
		methods: {
			checkUpdateVersion() {
				// #ifdef MP-WEIXIN
				//判断微信版本是否 兼容小程序更新机制API的使用
				if (wx.canIUse('getUpdateManager')) {
					//创建 UpdateManager 实例
					const updateManager = wx.getUpdateManager();
					//检测版本更新
					updateManager.onCheckForUpdate(function(res) {
						// 请求完新版本信息的回调
						if (res.hasUpdate) {
							//监听小程序有版本更新事件
							updateManager.onUpdateReady(function() {
								//TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
								updateManager.applyUpdate();
							});
							updateManager.onUpdateFailed(function() {
								// 新版本下载失败
								wx.showModal({
									title: '已经有新版本',
									content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开'
								});
							});
						}
					});
				} else {
					//TODO 此时微信版本太低（一般而言版本都是支持的）
					wx.showModal({
						title: '温馨提示',
						content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
					});
				}
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'common/icon/iconfont.css'; 
	@import 'uview-ui/index.scss';
	@import 'common/app.scss';
	
	page {
		background-color: $default-bg;
		font-family: PingFang SC, PingFang SC-Regular;
	}
</style>
