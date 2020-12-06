<template>
	<view class="page">
		<u-top-tips ref="uTips"></u-top-tips>
		<!-- 输入框 -->
		<view class="search-wrap">
			<u-search @change="change" @custom="custom" bg-color="#fff" shape="square" placeholder="商户名" v-model="paramsData.enterpriseName" @search="search"></u-search>
			</view>
		<view class="group">
			<u-cell-group>
				<u-cell-item v-for="(item, index) of lists" :key="index" @click="toDetail(item)" :title="item.enterpriseName"></u-cell-item>
				<view class="padding-tb"><u-loadmore style="background-color: #fff;" :status="status" @loadmore="fetchData" bg-color="#efeff4" /></view>
			</u-cell-group>
			<navigator url="/pages/shop/add-user" class="add-wrap flex align-items">
				<image src="/static/shop/add.png" mode="widthFix"></image>
				<text>新建商户</text>
			</navigator>
		</view>
	</view>
</template>

<script>
import { getEnterpriseList } from '@/api/enterprise.js';
export default {
	data() {
		return {
			lists: [],
			status: 'loadmore',
			paramsData: {
				current: 1,
				size: 10,
				enterpriseName:""
			}
		};
	},
	onShow() {
		this.resetData();
	},
	methods: {
		change(value){
			if(!value){
				this.resetData();
			}
		},
		search(value){
			this.resetData();
		},
		custom(value){
			this.resetData();
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
			getEnterpriseList(Object.assign({}, this.paramsData))
				.then(res => {
					console.log("res===",res)
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
		toDetail(item) {
			uni.navigateTo({
				url: '/pages/shop/user-detail?enterpriseId='+item.enterpriseId 
			});
		},
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
.page {
	.search-wrap {
		height: 88rpx;
		line-height: 88rpx;
		padding: 0 16rpx;
		/deep/ .u-action {
			color: #406cff;
		}
	}
	.group {
		background-color: #fff;
	}
	.add-wrap {
		padding: 30rpx;
		image {
			width: 122rpx;
			margin-right: 19rpx;
		}
		text {
			font-size: 30rpx;
		}
	}
}
</style>
