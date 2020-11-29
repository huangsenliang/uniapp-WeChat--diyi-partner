<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="padding-lf">
			<u-field v-model="formData.mobile" type="number" placeholder="请输入手机号码" label-width="0"></u-field>
			<u-field v-model="formData.smsCode" placeholder="请填写验证码" label-width="0">
				<view slot="right" class="u-border-left u-p-l-20">
					<u-button :hair-line="false" class="btn-text" plain size="mini" type="primary" @click="getCode">{{ codeText }}</u-button>
				</view>
			</u-field>
			<u-field v-model="formData.password" type="password" placeholder="请输入密码" label-width="0"></u-field>
			<u-field v-model="formData.repassword" type="password" placeholder="确认密码" label-width="0"></u-field>
			<view class="u-p-t-80"><u-button type="primary" @click="submit">注册</u-button></view>
		</view>
		<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
import {getSms} from '@/api/common.js'	
import {register} from '@/api/user.js'
export default {
	data() {
		return {
			formData: {
				mobile: '',
				repassword: '',
				password: '',
				smsCode: ''
			},
			codeText: ''
		};
	},
	onReady() {
	
	},
	methods: {
		codeChange(text) {
			this.codeText = text;
		},
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				const formData = this.formData
				if (this.$u.test.isEmpty(formData.mobile)) {
					return this.$u.toast('手机号不能为空')
				}
				if (!this.$u.test.mobile(formData.mobile)) {
					return this.$u.toast('手机号不正确')
				}
				uni.showLoading({
					title: '正在获取验证码'
				});
				getSms({
					codeType: 'REGISTER',
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
		submit() {
			const formData = Object.assign({}, this.formData)
			if (this.$u.test.isEmpty(formData.mobile)) {
				return this.$u.toast('手机号不能为空')
			}
			if (this.$u.test.isEmpty(formData.smsCode)) {
				return this.$u.toast('验证码不能为空')
			}
			if (this.$u.test.isEmpty(formData.password)) {
				return this.$u.toast('密码不能为空')
			}
			if (formData.password !== formData.repassword) {
				return this.$u.toast('确认密码不正确')
			}
			if (!this.$u.test.mobile(formData.mobile)) {
				return this.$u.toast('手机号不正确')
			}
			register(formData).then(res => {
				this.$toast('注册成功', true)
				this.$back()
			}).catch(res => {
				this.$toast(res.msg)
			})
			
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
</style>
