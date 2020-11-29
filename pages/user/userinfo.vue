<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="u-p-t-20">
			<u-cell-group>
				<u-cell-item title="姓名" center :arrow="vuex_user.idcardVerifyStatus !== 'VERIFYPASS'" @click="toEdit(vuex_user.idcardVerifyStatus !== 'VERIFYPASS')">
					<view>
						<u-icon v-if="vuex_user.certificationState === 'CERTIFIED'" class="u-m-r-10" name="checked" custom-prefix="custom-icon" color="#09BB07"></u-icon>
						{{ vuex_user.name }}
					</view>
				</u-cell-item>
				<u-cell-item title="头像" center @click="toEdit">
					<view class="u-flex u-col-center u-row-right">
						<!-- #ifdef MP-WEIXIN -->
						<u-image v-if="!$u.test.isEmpty(vuex_user.avatar)" class="inline-block" width="80rpx" height="80rpx" :src="vuex_user.avatar"
						 mode="scaleToFill"></u-image>
						<open-data v-else class="header" type="userAvatarUrl"  style="width: 80rpx;height: 80rpx;"></open-data>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<u-image class="inline-block" width="80rpx" height="80rpx" :src="vuex_user.avatar" mode="scaleToFill"></u-image>
						<!-- #endif -->
					</view>
				</u-cell-item>
				<u-cell-item title="政治面貌" center :value="vuex_user.politicState || ''" @click="toEdit"></u-cell-item>
				<u-cell-item title="民族" center :value="vuex_user.nationality || ''" @click="toEdit"></u-cell-item>
				<u-cell-item title="文化程度" center :value="vuex_user.levelofedu || ''" @click="toEdit"></u-cell-item>
				<u-cell-item title="电子邮箱" :value="vuex_user.emailAddress || ''" center @click="toEdit"></u-cell-item>
				<u-cell-item title="身份证号" center :arrow="vuex_user.idcardVerifyStatus !== 'VERIFYPASS'" @click="toEdit(vuex_user.idcardVerifyStatus !== 'VERIFYPASS')">
					<view>
						<u-icon v-if="vuex_user.idcardVerifyStatus === 'VERIFYPASS'" class="u-m-r-10" name="checked" custom-prefix="custom-icon"
						 color="#09BB07"></u-icon>
						{{ vuex_user.idcardNo || '' }}
					</view>
				</u-cell-item>
				<u-cell-item title="手机号码" center @click="toChangePhone">
					<view>
						<u-icon v-if="vuex_user.phoneNumberVerifyStatus === 'VERIFYPASS'" class="u-m-r-10" name="checked" custom-prefix="custom-icon"
						 color="#09BB07"></u-icon>
						{{ vuex_user.phoneNumber || '' }}
					</view>
				</u-cell-item>
				<u-cell-item title="银行卡号" center :arrow="vuex_user.bankCardVerifyStatus !== 'VERIFYPASS'" @click="toEdit(vuex_user.bankCardVerifyStatus !== 'VERIFYPASS')">
					<view>
						<u-icon v-if="vuex_user.bankCardVerifyStatus === 'VERIFYPASS'" class="u-m-r-10" name="checked" custom-prefix="custom-icon"
						 color="#09BB07"></u-icon>
						{{ vuex_user.bankCardNo || '' }}
					</view>
				</u-cell-item>
				<u-cell-item title="开户行" center :arrow="vuex_user.bankCardVerifyStatus !== 'VERIFYPASS'" @click="toEdit(vuex_user.bankCardVerifyStatus !== 'VERIFYPASS')">
					<view>
						<u-icon v-if="vuex_user.bankCardVerifyStatus === 'VERIFYPASS'" class="u-m-r-10" name="checked" custom-prefix="custom-icon"
						 color="#09BB07"></u-icon>
						{{ vuex_user.bankName || '' }}
					</view>
				</u-cell-item>
				<u-cell-item title="开户支行" center :arrow="vuex_user.bankCardVerifyStatus !== 'VERIFYPASS'" @click="toEdit(vuex_user.bankCardVerifyStatus !== 'VERIFYPASS')">
					<view>
						<u-icon v-if="vuex_user.bankCardVerifyStatus === 'VERIFYPASS'" class="u-m-r-10" name="checked" custom-prefix="custom-icon"
						 color="#09BB07"></u-icon>
						{{ vuex_user.subBankName || '' }}
					</view>
				</u-cell-item>
				<u-cell-item title="线上经营场所" :value="vuex_user.runAddress || ''" center @click="toEdit"></u-cell-item>
				<u-cell-item title="线下经营地址" :value="vuex_user.houseAddress || ''" center @click="toEdit"></u-cell-item>
				<u-cell-item title="住址" :value="vuex_user.livingAddress || ''" center @click="toEdit"></u-cell-item>
				<u-cell-item title="自我描述" :value="vuex_user.selfDesc || ''" center @click="toEdit"></u-cell-item>
				<!-- <u-cell-item title="商铺" :value="vuex_user.shopUrl || ''" center @click="toEdit"></u-cell-item> -->
				<!-- <u-cell-item title="商铺用户名" :value="vuex_user.shopUserName || ''" center @click="toEdit"></u-cell-item> -->
				<u-cell-item :arrow="false" @click="$previewImg(vuex_user.idcardPic)" title="身份证正面图" center>
					<view class="u-flex u-col-center u-row-right">
						<u-image class="inline-block" width="80rpx" height="80rpx" :src="vuex_user.idcardPic" mode="scaleToFill"></u-image>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" @click="$previewImg(vuex_user.idcardPicBack)" title="身份证反面图" center>
					<view class="u-flex u-col-center u-row-right">
						<u-image class="inline-block" width="80rpx" height="80rpx" :src="vuex_user.idcardPicBack" mode="scaleToFill"></u-image>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" @click="$previewImg(vuex_user.idcardHand)" title="手持身份证正面" center>
					<view class="u-flex u-col-center u-row-right">
						<u-image class="inline-block" width="80rpx" height="80rpx" :src="vuex_user.idcardHand" mode="scaleToFill"></u-image>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" @click="$previewImg(vuex_user.idcardBackHand)" title="手持身份证背面" center>
					<view class="u-flex u-col-center u-row-right">
						<u-image class="inline-block" width="80rpx" height="80rpx" :src="vuex_user.idcardBackHand" mode="scaleToFill"></u-image>
					</view>
				</u-cell-item>
			</u-cell-group>
			<view class="u-m-40">
				<u-button type="primary" @click="toRestPwd">修改密码</u-button>
				<view class="u-m-t-20">
					<u-button type="default" @click="logout">退出登录</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onShow() {
			this.$setUserInfo({
				success: () => {},
				error: res => {}
			});
		},
		methods: {
			toEdit(canEdit) {
				if (canEdit !== false) {
					this.$u.route({
						url: 'pages/user/edit'
					})
				}
			},
			logout() {
				this.$u.vuex('vuex_token', '');
				this.$u.vuex('vuex_user', {});
				this.$u.vuex('vuex_token_data', {});
				uni.reLaunch({
					url: '/pages/login/login'
				});
			},
			toRestPwd() {
				this.$u.route({
					url: 'pages/login/forget',
					params: {
						tel: this.vuex_user.phoneNumber
					}
				})
			},
			toChangePhone() {
				this.$u.route({
					url: 'pages/user/changePhone',
					params: {
						tel: this.vuex_user.phoneNumber
					}
				})
			}
		}
	};
</script>

<style lang="scss"></style>
