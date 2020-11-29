<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="padding-lf">
			<view>
				<u-field v-model="formDataB.mobile" type="number" placeholder="请输入新手机号" label-width="0"></u-field>
				<u-field v-model="formDataB.code" placeholder="请填写验证码" label-width="0">
					<view slot="right" class="u-border-left u-p-l-20">
						<u-button :hair-line="false" class="btn-text" plain size="mini" type="primary" @click="getCode">{{ codeText }}</u-button>
					</view>
				</u-field>
				<view class="u-p-t-80"><u-button type="primary" @click="submit">确定</u-button></view>
			</view>
		</view>
		<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
import { getSms } from '@/api/common.js';
import { updatePhone } from '@/api/user.js';
export default {
	data() {
		return {
			step: 0,
			formDataB: {
				mobile: '',
				code: ''
			},
			codeText: ''
		};
	},
	onLoad() {
	},
	onReady() {
	},
	methods: {
		codeChange(text) {
			this.codeText = text;
		},
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				const formData = this.formDataB;
				if (formData.mobile === this.vuex_user.phoneNumber) {
					return this.$u.toast('原手机号与新手机号不能一致');
				}
				if (this.$u.test.isEmpty(formData.mobile)) {
					return this.$u.toast('原手机号不能为空');
				}
				if (!this.$u.test.mobile(formData.mobile)) {
					return this.$u.toast('原手机号不正确');
				}
				getSms({
					codeType: 'UPDATEPHONE',
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
			if (this.$u.test.isEmpty(formData.mobile)) {
				return this.$u.toast('新手机号不能为空');
			}
			if (this.$u.test.isEmpty(formData.code)) {
				return this.$u.toast('验证码不能为空');
			}
			if (!this.$u.test.mobile(formData.mobile)) {
				return this.$u.toast('新手机号不正确');
			}
			updatePhone({
				mobile: this.formDataB.mobile,
				smsCode: this.formDataB.code
			}).then(res => {
				this.$toast('修改成功', 'success');
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
