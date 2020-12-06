<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" @click="toPage('/pages/user/userinfo')">
			<view class="u-m-r-10">
				<!-- #ifdef MP-WEIXIN -->
				<view class="avatar" v-if="$u.test.isEmpty(pic)"><open-data class="header" type="userAvatarUrl"></open-data></view>
				<u-avatar v-else :src="pic" size="132" mode="circle"></u-avatar>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<u-avatar :src="pic" size="132" mode="circle"></u-avatar>
				<!-- #endif -->
			</view>
			<view class="u-flex-1">
				<view class="u-p-b-10 u-flex u-row-left u-col-center">
					<view class="username ellipsis-text" v-if="vuex_user.name">{{ vuex_user.name }}</view>
					<view class="username ellipsis-text" v-else>
						<!-- #ifdef MP-WEIXIN -->
						<open-data type="userNickName"></open-data>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						{{ cert ? '认证用户' : '普通用户' }}
						<!-- #endif -->
					</view>
					<view class="vip-tag" :class="{active: cert}">
						<u-icon class="icon" name="vip" custom-prefix="custom-icon"></u-icon>
						{{ cert ? '认证用户' : '普通用户' }}
					</view>
				</view>
				<!-- <view class="usermsg u-line-1">个性标签语......</view> -->
			</view>
			<view class="u-m-l-10 u-p-10"><u-icon name="arrow-right" color="#969799" size="28"></u-icon></view>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="商户管理" @click="toShopIndex">
					<u-icon slot="icon" class="u-m-r-30" size="32" color="#B09E7A" name="hetong" custom-prefix="custom-icon"></u-icon>
				</u-cell-item>
				<u-cell-item title="个体户管理" @click="toPage('/pages/personal/index')">
					<u-icon slot="icon" class="u-m-r-30" size="30" color="#585F82" name="geti" custom-prefix="custom-icon"></u-icon>
				</u-cell-item>
				<u-cell-item title="个独管理" @click="toPage('/pages/individual/index')">
					<u-icon slot="icon" class="u-m-r-30" size="32" color="#F44343" name="gedu" custom-prefix="custom-icon"></u-icon>
				</u-cell-item>
				<u-cell-item title="收件地址" @click="toPage('/pages/address/index')">
					<u-icon slot="icon" class="u-m-r-30" size="32" color="#22A179" name="location" custom-prefix="custom-icon"></u-icon>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item :arrow="false" title="客服" :value="tel" @click="callphone">
					<u-icon slot="icon" class="u-m-r-30" size="32" color="#597AEA" name="kefu" custom-prefix="custom-icon"></u-icon>
				</u-cell-item>
			<!-- 	<u-cell-item title="关于地衣众包" @click="toPage('/pages/article/about')">
					<u-icon slot="icon" class="u-m-r-30" size="32" color="#E5AE42" name="info" custom-prefix="custom-icon"></u-icon>
				</u-cell-item> -->
			</u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tel: '400-1688-132'
		};
	},
	onReady() {
	},
	computed: {
		pic() {
			return this.vuex_user ? this.vuex_user.avatar : ''
		},
		cert() {
			return this.vuex_user && this.vuex_user.certificationState === 'CERTIFIED'
		}
	},
	onShow() {
		this.$setUserInfo()
	},
	methods: {
		toShopIndex(){
			uni.switchTab({
				url:"/pages/shop/index"
			})
		},
		toPage(url) {
			uni.navigateTo({
				url: url
			});
		},
		callphone() {
			var that = this;
			if (that.tel && that.tel.length) {
				uni.makePhoneCall({
					phoneNumber: that.tel
				});
			}
		}
	}
};
</script>

<style lang="scss">
.avatar {
	width: 132rpx;
	height: 132rpx;
	border-radius: 50%;
	overflow: hidden;
}
.username {
	width: 350rpx;
	font-size: 42rpx;
	font-weight: 800;
	color: rgba(51, 51, 51, 1);
}
.usermsg {
	font-size: 30rpx;
	color: rgba(51, 51, 51, 1);
}
.vip-tag {
	background-color: #c7c7cc;
	border-radius: 88rpx;
	color: #fff;
	font-size: 24rpx;
	margin-left: 10rpx;
	line-height: 42rpx;
	padding: 0 10rpx;
	.icon {
		margin-right: 6rpx;
	}

	&.active {
		background-color: #406cff;
		.icon {
			color: #ffbd00;
		}
	}
}

.user-box {
	margin-top: 40rpx;
	// background-color: #fff;
}
</style>
