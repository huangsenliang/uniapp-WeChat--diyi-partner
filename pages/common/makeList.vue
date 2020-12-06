<template>
	<!-- 关联创客列表页面 -->
	<view class="page">
		<view class="image-box" v-for="(item, index) of dataList" :key="index">
			<view class="flex align-items">
				<u-image class="inline-block img" @click="$previewImage(item.idcardPic)" width="150rpx" height="100rpx" :src="item.idcardPic" mode="scaleToFill"></u-image>
				<u-image class="inline-blockimg" @click="$previewImage(item.idcardPicBack)" width="150rpx" height="100rpx" :src="item.idcardPicBack" mode="scaleToFill"></u-image>
			</view>
			<view class="content">
				<view class="">姓名：{{ item.name }}</view>
				<view class="">身份证号码：{{ item.idcardNo }}</view>
				<view class="">电话：{{ item.phoneNumber }}</view>
				<view class="btn-s-blue" @click="goBack(item)">选择</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import { getIdMakeList } from '@/api/common.js';
export default {
	data() {
		return {
			dataList: [],
			eventName: ''
		};
	},
	onLoad(options) {
		if (options && options.eventName) {
			this.eventName = options.eventName;
		}
		let data = {
			// phoneNumber:this.vuex_user.phoneNumber,
			// name:this.vuex_user.name,
			// idcardNo:this.vuex_user.idcardNo
		};
		getIdMakeList(data).then(res => {
			this.dataList = res.data.records;
		}).catch(res => {
				this.$toast(res.msg)
			})
	},
	methods: {
		
		goBack(item) {
			console.log(item);
			if (this.eventName) {
				this.$EventBus.$emit(this.eventName, JSON.stringify(item));
			}
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss">
.page {
	height: 100vh;
	background-color: $default-bg;
	.image-box {
		margin-top: 20rpx;
		background-color: #ffffff;
		padding: 30rpx;
		.content {
			margin-top: 20rpx;
			line-height: 50rpx;
			color: #000;
		}
		.img {
			margin-right: 100rpx;
		}
	}
}
</style>
