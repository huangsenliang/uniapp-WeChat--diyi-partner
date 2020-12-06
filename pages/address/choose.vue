<template>
	<view class="u-p-t-20 wrap">
		<u-top-tips ref="uTips"></u-top-tips>
		<view v-for="(res, k) in lists" :key="k" @click="choose(res)" class="item" hover-class="hover-class">
			<view class="top">
				<view class="name">{{ res.addressName }}</view>
				<view class="phone">{{ res.addressPhone }}</view>
				<view class="tag">
					<text v-if="res.isDefault == 1" class="red">默认</text>
				</view>
			</view>
			<view class="bottom">{{res.detailedAddress}}</view>
		</view>
		<view class="padding-tb"><u-loadmore :status="status" @loadmore="fetchData" bg-color="#efeff4" /></view>
		<view class="addSite"><u-button type="primary" @click="toAdd">添加</u-button></view>
	</view>
</template>

<script>
/**
	 * 
	 * 地址选择页面，type: address
	 * 会触发 choose 监听，请勿在页面栈中重复调用此页面或重复监听choose
	 * 使用：
	 * 需回调页面新增以下监听
	 * 
			onLoad() {
				uni.$on('choose',function(type, data){
					 console.log(data);
				})
			},
			onUnload() {  
					// 移除监听事件  
				 uni.$off('choose');  
			},
	 * 
	 */
	import { getList } from '@/api/address.js';
export default {
	data() {
		return {
		eventName:"",	
		lists: [],
		status: 'loadmore',
		paramsData: {
			current: 1,
			size: 10
		}
		};
	},
	onLoad(options){
		if(options&&options.eventName){
			this.eventName = options.eventName;
		}
	},
	onShow() {
		this.resetData();
	},
	methods: {
		choose(item) {
			if(this.eventName){
				this.$EventBus.$emit(this.eventName, JSON.stringify(item))
			}
			uni.navigateBack({});
		},
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

<style lang="scss">
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
