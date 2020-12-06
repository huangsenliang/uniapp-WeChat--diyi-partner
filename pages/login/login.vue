<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="u-text-center u-p-t-40">
			<u-image class="inline-block" src="/static/img/logo.png" width="372rpx" mode="widthFix"></u-image>
		</view>
		<view class="task-text">合伙人端</view>

		<view class="padding-lf u-m-t-60">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#406CFF" inactive-color="#D3D7DD"></u-tabs>
		</view>
		<view class="padding-lf u-m-t-60">
			<view v-show="current == 0">
				<u-field v-model="formDataA.mobile" placeholder="请输入手机号码/账户号" label-width="0"></u-field>
				<u-field v-model="formDataA.password" type="password" placeholder="请输入密码" label-width="0"></u-field>
			</view>
			<view v-show="current == 1">
				<u-field v-model="formDataB.mobile" type="number" placeholder="请输入手机号码" label-width="0"></u-field>
				<u-field v-model="formDataB.code" placeholder="请填写验证码" label-width="0">
					<view slot="right" class="u-border-left u-p-l-20">
						<u-button :hair-line="false" class="btn-text" plain size="mini" type="primary" @click="getCode">{{ codeText }}</u-button>
					</view>
				</u-field>
			</view>
			<view class="u-flex u-col-center u-font-28 u-row-between padding-lf u-p-t-20">
				<view class="sub-color" @click="toPage('/pages/login/forget')">忘记密码？</view>
				<view class="gray-color">
					没有账号？
					<text class="text-blue" @click="toPage('/pages/login/register')">立即注册</text>
				</view>
			</view>
			<view class="login-box">
				<u-button type="primary" @click="submit">登录</u-button>
			</view>
			<button class="weixin-circle u-m-t-40" hover-class="hover-class" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				<u-icon name="weixin-fill" size="60" color="#51ab70"></u-icon>
			</button>
			<view class="u-m-t-20">
				登录注册代表您已阅读并同意
				<text @click="toPage('/pages/article/protocol')" class="text-blue">《地衣众包用户协议》</text>
				和
				<text @click="toPage('/pages/article/privacy')" class="text-blue">《地衣众包隐私政策》</text>
			</view>
			<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
		</view>
	</view>
</template>

<script>
	import {
		getInfo,
		wechatLogin,
		loginByMobile,
		loginByPwd
	} from '@/api/user.js';
	import {
		getSms
	} from '@/api/common.js'
	export default {
		data() {
			return {
				current: 0,
				list: [{
					name: '账号密码登录'
				}, {
					name: '手机号登录'
				}],
				formDataA: {
					mobile: '',
					password: ''
				},
				formDataB: {
					mobile: '',
					code: ''
				},
				codeText: '',
				wxCode: ''
			};
		},
		onReady() {
			this.getWxCode();
			console.log("this.$u===",this.$u.vuex)
		},
		methods: {
			toPage(url) {
				uni.navigateTo({
					url: url
				});
			},
			change(index) {
				this.current = index;
			},
			codeChange(text) {
				this.codeText = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					const formData = this.formDataB;
					if (this.$u.test.isEmpty(formData.mobile)) {
						return this.$u.toast('手机号不能为空');
					}
					if (!this.$u.test.mobile(formData.mobile)) {
						return this.$u.toast('手机号不正确');
					}
					uni.showLoading({
						title: '正在获取验证码'
					});
					getSms({
						codeType: 'LOGIN',
						mobile: formData.mobile
					}).then(res => {
						uni.hideLoading();
						this.$refs.uCode.start();
					}).catch(res => {
						this.$toast(res.msg)
						uni.hideLoading();
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			getUserInfo(tokenData) {
				this.$u.vuex('vuex_token_data', tokenData)
				this.$u.vuex('vuex_token', tokenData.accessToken)
				this.$nextTick(() => {
					this.$loading()
					console.log("登录成功")
					setTimeout(() => {
						this.$loading(false)
						uni.reLaunch({
							url: '/pages/home/index'
						})
					}, 1000)
					// 获取修改用户信息
					this.$setUserInfo({
						success: () => {
							this.$loading(false)
							this.$toast('登录成功', true)
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/index/index'
								})
							}, 1000)
						},
						error: (res) => {
							this.$loading(false)
							this.$toast(res.msg)
							this.getWxCode()
						}
					})
				})
			},
			submit() {
				this.getWxCode();
				if (this.current == 0) {
					// 账号密码登录
					const formData = Object.assign({}, this.formDataA)
					if (this.$u.test.isEmpty(formData.mobile)) {
						return this.$u.toast('手机号不能为空')
					}
					if (!this.$u.test.mobile(formData.mobile)) {
						return this.$u.toast('手机号不正确')
					}
					if (this.$u.test.isEmpty(formData.password)) {
						return this.$u.toast('手机号不能为空')
					}
					loginByPwd({
						account: formData.mobile,
						password: formData.password,
						wechatCode: this.wxCode||"4444"
					}).then(res => {
						console.warn("登录信息返还：",res.data);
						if(res.code===400){
							return this.$u.toast(res.msg)
						}
						this.getUserInfo(res.data)
					}).catch(res => {
						this.$toast(res.msg)
						this.getWxCode()
					})
				} else {
					// 验证码登录
					const formData = Object.assign({}, this.formDataB)
					if (this.$u.test.isEmpty(formData.mobile)) {
						return this.$u.toast('手机号不能为空')
					}
					if (!this.$u.test.mobile(formData.mobile)) {
						return this.$u.toast('手机号不正确')
					}
					if (this.$u.test.isEmpty(formData.code)) {
						return this.$u.toast('请输入验证码')
					}
					loginByMobile({
						mobile: formData.mobile,
						smsCode: formData.code,
						wechatCode: this.wxCode||"8888"
					}).then(res => {
						this.getUserInfo(res.data)
					}).catch(res => {
						this.$toast(res.msg)
						this.getWxCode()
					})
				}
				// this.getUserInfo();
			},
			getWxCode(refresh) {
				// #ifdef MP-WEIXIN
				const that = this;
				that.$loading();
				wx.login({
					success: function(res) {
						that.wxCode = res.code;
						console.log("wxCode====",res)
						that.$loading(false);
					},
					complete: function() {
						that.$loading(false);
					}
				});
				// #endif
			},
			getPhoneNumber(e) {
				console.log("用户信息=======",e)
				const that = this;
				that.$loading();
				wx.checkSession({
					success: function() {
						const ency = e.detail.encryptedData;
						const iv = e.detail.iv;
						if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
							// 用户拒绝授权
						} else {
							wechatLogin({
								encryptedData: ency,
								iv: iv,
								wechatCode: that.wxCode
							}).then(res => {
								that.getUserInfo(res.data)
							}).catch(res => {
								that.getWxCode();
								that.$toast(res.msg)
							})
							//同意授权
						}
					},
					fail: function() {
						that.$toast('微信授权码重新获取中，请重新尝试');
						that.getWxCode();
					},
					complete: function() {}
				});
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.logo-text {
		margin-top: 14rpx;
		font-size: 30rpx;
		line-height: 42rpx;
		color: rgba(102, 102, 102, 1);
		letter-spacing: 10rpx;
	}

	.task-text {
		margin-top: 36rpx;
		text-align: center;
		font-size: 36rpx;
		font-weight: 400;
		line-height: 50rpx;
		color: rgba(51, 51, 51, 1);
	}

	.login-box {
		margin-top: 100rpx;
	}

	.sub-color {
		color: #666666;
	}

	.gray-color {
		color: #d3d7dd;
	}

	.weixin-circle {
		height: 95rpx;
		width: 95rpx;
		background-color: #f7f7f7;
		border-radius: 50%;
		display: flex;
		align-content: center;
		justify-content: center;
		margin: auto;
		padding: 0;

		&::after {
			border: none;
		}
	}
</style>
