<template>
	<view class="u-p-t-20 wrap">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="item" v-for="(res, k) in 2" :key="k">
			<view class="top">
				<!-- <view class="name">{{ res.addressName }}</view>
				<view class="phone">{{ res.addressPhone }}</view> -->
				<view class="name">小明</view>
				<view class="phone">1222222222</view>
				<view class="tag">
					<!-- <text v-if="res.isDefault == 1" class="red">默认</text> -->
					<text class="red">默认</text>
				</view>
			</view>
			<view class="bottom">{{res.detailedAddress}}</view>
			<view class="action u-row-right u-col-center">
				<u-icon @click="edit(res)" class="u-m-r-80 label-margin" label="编辑" label-pos="left" size="46" color="#9B9B9B" name="edit" custom-prefix="custom-icon"></u-icon>
				<u-icon @click="del(res)" class="u-m-r-20 label-margin" label="删除" label-pos="left" size="46" color="#9B9B9B" name="del" custom-prefix="custom-icon"></u-icon>
			</view>
		</view>      
		<view class="padding-tb"><u-loadmore :status="status" @loadmore="fetchData" bg-color="#efeff4" /></view>
		<view class="addSite"><u-button type="primary" @click="toAdd">添加</u-button></view>
	</view>
</template>

<script>
// import { getList, del } from '@/api/address.js';
export default {
	data() {
		return {
			lists: [],
			status: 'loadmore',
			paramsData: {
				current: 1,
				size: 10
			}
		};
	},
	onReady() {
		// this.fetchData();
	},
	onShow() {
		// this.resetData()
	},
	methods: {
		resetData(pulldown) {
			this.paramsData.current = 1;
			this.lists = [];
			this.$nextTick(() => {
				this.fetchData(pulldown);
			});
		},
		fetchData(pulldown) {
			this.status = 'loading';
			getList(Object.assign({}, this.paramsData))
				.then(res => {
					this.paramsData.current++;
					const data = res.data;
					this.lists = this.lists.concat(data.records);
					if (data.current < data.pages) {
						this.status = 'loadmore';
					} else {
						this.status = 'nomore';
					}
					if (pulldown) {
						uni.stopPullDownRefresh();
						this.$toast('刷新成功', true);
					}
				})
				.catch(res => {
					this.$toast(res.msg);
					this.status = 'loadmore';
				});
		},
		toAdd() {
			uni.navigateTo({
				url: '/pages/address/add'
			});
		},
		edit(item) {
			console.log("44444444444")
			uni.navigateTo({
				url: '/pages/address/edit?id=' + item.addressId
			});
		},
		del(item) {
			var that = this;
			uni.showModal({
				title: '提示',
				content: '确定要删除此地址吗？',
				success: function(res) {
					if (res.confirm) {
						that.doDel(item);
					}
				}
			});
		},
		doDel(item) {
			this.$loading()
			del({
				addressId: item.addressId
			}).then(res => {
				this.$toast('删除成功', true)
				this.resetData()
				this.$loading(false)
			}).catch(res => {
				this.$toast(res.msg)
				this.$loading(false)
			})
		}
	},
	onReachBottom: function() {
		if (this.status === 'nomore') {
			return;
		}
		this.fetchData();
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	padding-bottom: 150rpx;
}
.item {
	padding: 30rpx 40rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
	.top {
		display: flex;
		font-weight: bold;
		font-size: 36rpx;
		.phone {
			margin-left: 60rpx;
		}
		.tag {
			display: flex;
			font-weight: normal;
			align-items: center;
			text {
				display: block;
				width: 60rpx;
				height: 34rpx;
				line-height: 34rpx;
				color: #ffffff;
				font-size: 20rpx;
				border-radius: 6rpx;
				text-align: center;
				margin-left: 30rpx;
				background-color: rgb(49, 145, 253);
			}
			.red {
				background-color: red;
			}
		}
	}
	.bottom {
		display: flex;
		margin-top: 20rpx;
		font-size: 26rpx;
		line-height: 37rpx;
		justify-content: space-between;
		color: rgba(155, 155, 155, 1);
	}
	.action {
		display: flex;
		margin-top: 40rpx;
		font-size: 26rpx;
		line-height: 37rpx;
		color: rgba(155, 155, 155, 1);
	}
}
.addSite {
	justify-content: space-around;
	position: fixed;
	z-index: 10;
	bottom: 30rpx;
	left: 40rpx;
	right: 40rpx;
}
</style>
