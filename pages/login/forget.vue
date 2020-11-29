<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="padding-lf">
			<view v-show="step == 0">
				<u-field v-model="formDataA.mobile" type="number" placeholder="请输入手机号码" label-width="0"></u-field>
				<u-field v-model="formDataA.code" placeholder="请填写验证码" label-width="0">
					<view slot="right" class="u-border-left u-p-l-20">
						<u-button :hair-line="false" class="btn-text" plain size="mini" type="primary" @click="getCode">{{ codeText }}</u-button>
					</view>
				</u-field>
				<view class="u-p-t-80"><u-button type="primary" @click="next">下一步</u-button></view>
			</view>
			<view v-show="step == 1">
				<u-field v-model="formDataB.password" type="password" placeholder="请输入新密码" label-width="0"></u-field>
				<u-field v-model="formDataB.repassword" type="password" placeholder="确认新密码" label-width="0"></u-field>
				<view class="u-p-t-80"><u-button type="primary" @click="submit">确定</u-button></view>
			</view>
		</view>
		<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
import { getSms } from '@/api/common.js';
import { updatePassword } from '@/api/user.js';
export default {
	data() {
		return {
			step: 0,
			formDataA: {
				mobile: '',
				code: ''
			},
			formDataB: {
				password: '',
				repassword: ''
			},
			codeText: ''
		};
	},
	onLoad(e) {
		this.formDataA.mobile = e.tel || ''
	},
	onReady() {},
	methods: {
		codeChange(text) {
			this.codeText = text;
		},
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				const formData = this.formDataA;
				if (this.$u.test.isEmpty(formData.mobile)) {
					return this.$u.toast('手机号不能为空');
				}
				if (!this.$u.test.mobile(formData.mobile)) {
					return this.$u.toast('手机号不正确');
				}
				getSms({
					codeType: 'UPDATEPASSWORD',
					mobile: formData.mobile
				})
					.then(res => {
						this.$toast('发送成功', true);
						this.$refs.uCode.start();
					})
					.catch(res => {
						this.$toast(res.msg);
					});
			} else {
				this.$u.toast('倒计时结束后再发送');
			}
		},
		next() {
			this.step++;
		},
		submit() {
			const formData = this.formDataB;
			if (this.$u.test.isEmpty(formData.password)) {
				return this.$u.toast('密码不能为空');
			}
			if (formData.password !== formData.repassword) {
				return this.$u.toast('两次密码不一致');
			}
			updatePassword({
				newPassword: formData.password,
				phoneNumber: this.formDataA.mobile,
				smsCode: this.formDataA.code
			}).then(res => {
				this.$toast('密码修改成功', 'success');
				this.$back();
			}).catch(res => {
				this.$toast(res.msg);
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
