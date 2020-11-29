<template>
	<view class="page">
		<u-top-tips ref="uTips"></u-top-tips>
		<!-- 输入框 -->
		<view class="search-wrap">
			<u-search bg-color="#fff" shape="square"  placeholder="商户名称或手机号" v-model="searchValue"></u-search>
		</view>
		<view class="group">
			<u-cell-group>
				<u-cell-item v-for="(item,index) of list" :key="index" @click="toDetail(item.url)" :title="item.title">
				</u-cell-item>
			</u-cell-group>
			<navigator url="/pages/shop/add-user" class="add-wrap flex align-items">
				<image src="/static/shop/add.png" mode="widthFix"></image>
				<text>新建商户</text>
			</navigator>
		</view>
		
	</view>
</template>

<script>

export default {
	
	data() {
		return {
			searchValue:"",
			list:[
				{
					title:"杭州市阿里巴巴集团公司",
					url:"/pages/shop/user-detail"
				},
				{
					title:"上海市崇明区***生态园",
					url:"/pages/zhiwen-livepush/zhiwen-livepush"
				},
				{
					title:"深圳市腾讯科技有限责任公司",
					url:""
				},
				{
					title:"北京市文化传播有限责任公司",
					url:""
				}
			],
		};
	},
	onReady() {},
	methods: {
		toDetail(url){
			uni.navigateTo({url: url})
		}
	}
};
</script>

<style lang="scss">
	.page{
		.search-wrap{
			height: 88rpx;
			line-height: 88rpx;
			padding: 0 16rpx;
			/deep/ .u-action{
				color: #406CFF;
			}
		}
		.group{
			background-color: #fff;			
		}
		.add-wrap{
			padding: 30rpx ;
			image{
				width:122rpx;
				margin-right: 19rpx;
			}
			text{
				font-size: 30rpx;
			}
		}
	}
</style>
