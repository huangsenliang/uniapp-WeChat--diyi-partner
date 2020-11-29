<template>
	<!-- 个体户管理页面 -->
	<view class="page">
		<u-tabs :list="tabsList" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="content">
			<view class="group" v-show="current===0">
				<u-cell-group>
					<u-cell-item :title="item.title" v-for="(item,index) of personalList" :key="inex">
					</u-cell-item>
				</u-cell-group>
			</view>
			<view class="group" v-show="current===1">
				<u-cell-group>
					<u-cell-item :title="item.title+'22'" v-for="(item,index) of personalList" :key="inex">
					</u-cell-item>
				</u-cell-group>
			</view>
		</view>
		<view class="btn-wrap">
			<view class="btn-b-blue">
				申请注册
			</view>
		</view>
	</view>
	
</template>

<script>
export default {
	data() {
		return {
			tabsList: [{ name: '已注册' }, { name: '待办理' }],
			current: 0,
			personalList:[
				{title:"徐州市***营销中心"},
				{title:"徐州市***工作室"}
			]
		};
	},
	methods: {
		change(index) {
			this.current = index;
		}
	}
};
</script>

<style lang="scss">
	.page{
	
		.content{
			margin-top: 20rpx;
			/deep/ .u-cell_title{
				font-size: 30rpx;
			}
		}
		.btn-wrap{
			position: fixed;
			left: 50%;
			bottom: 41rpx;
			margin-left: -335rpx;
		}
	}
</style>
