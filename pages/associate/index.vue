<template>
	<!-- 交易明细 -->
	<view class="page">
		<view class="tab-wrap">
			<u-tabs :list="tabs" :is-scroll="false" inactive-color="#B2B2B2" :current="current" @change="change"></u-tabs>
		</view>
		<view class="tab-body">
			<!-- 展板 -->
			<view class="header-title">
				<block v-if="current===0">
					<!--  -->
					<view class="choose-time" @click="show = true">
						<view class="flex align-items">
							<text class="labe">{{ list[chooseIndex].label }}</text>
							<image src="/static/shop/xiajiantou.png" mode="widthFix" style="width: 50rpx;"></image>
						</view>
						<u-select mode="single-column" @confirm="confirm" v-model="show" :list="list"></u-select>
					</view>
					<!--  -->
					<view class="flex align-items justify-between fb">
						<text class="left">
							总包+分包
						</text>
						<text class="right">
							¥563233.00
						</text>
					</view>
					<!--  -->
					<view class="flex align-items justify-between fb">
						<text class="left">
							众包/众采
						</text>
						<text class="right">
							¥563233.00
						</text>
					</view>
				</block>
				<block v-if="current===1">
					<view class="personal-num flex justify-between align-items">
						<text class="name">创客数</text>
						<text class="num">234家</text>
					</view>
				</block>
				<block v-if="current===2">
					<view class="personal-num flex justify-between align-items">
						<text class="name">服务商数</text>
						<text class="num">234人</text>
					</view>
				</block>
			</view>
			<!-- 列表 -->
			<view class="content-list">
				<view class="tab-wrap">
					<u-tabs :list="subTabs" :is-scroll="false" inactive-color="#B2B2B2" :current="current2" @change="change2"></u-tabs>
				</view>
				<view class="list-wrap">
					<view class="list-item" v-for="(item,index) of 5" :key="index">
						<view class="title-wrap flex align-items justify-between" @click="toAssociateDetail(item)">
							<view class="title">
								<text class="badge">服务商</text>
								<text>杭州市蚂蚁金服集团公司</text>
							</view>
							<view class="count">
								¥24000.00
							</view>
						</view>
						<view class="time">
							6月28日 11:40
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		const stateList = [{ value: 'EDITING', name: '交易流水' }, { value: 'BUSINESSREGISTERING', name: '创客数' }, { value: 'BANKACCOUNTING', name: '服务商数' }];
		return {
			tabs: stateList,
			subTabs:[
				{ value: '0', name: '总包+分包' },
				{ value: '1', name: '众包/众采' }
			],
			current: 0,
			current2:0,
			lists: [],
			show: false,

			chooseIndex: 0,
			list: [
				{
					value: '0',
					label: '最近30天'
				},
				{
					value: '1',
					label: '最近365天'
				},
				{
					value: '2',
					label: '最近全部总流水'
				}
			]
		};
	},
	methods: {
		// 跳转到明细
		toAssociateDetail(item){
			let type = this.current2==0?0:1;
			uni.navigateTo({
				url:"/pages/associate/associate-detail?type="+type+"&dataInfo="+JSON.stringify(item)
			})
		},
		// 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
		confirm(e) {
			this.chooseIndex = e[0].value;
		},
		change2(index) {
			this.current2 = index;
			console.log(index);
		},
		change(index) {
			this.current = index;
			console.log(index);
		}
	}
};
</script>

<style lang="scss">
	.page{
		.tab-wrap{
			border-bottom: 1rpx solid #e4e7ed;
		}
		.tab-body{
			// 展板
			.header-title{
				padding: 40rpx;
				height: 358rpx;
				background-color: #fff;
				.choose-time{
					.labe{
						font-size: 32rpx;
					}
				}
				.fb{
					margin-top: 37rpx;
					.left{
						font-size: 26rpx;
						color: #333333;
					}
					.right{
						font-size: 57rpx;
						color: #000;
						font-weight: bold;
					}
				}
				.personal-num{
					height: 100%;
					.name{
						font-size: 26rpx;;
					}
					.num {
						font-size: 57rpx;
						color: #333333;
					}
				}
			}
			// 列表内容
			.content-list{
				margin-top: 20rpx;
				.list-wrap{
					background-color: #FFFFFF;
					padding: 0 40rpx;
					.list-item{
						padding: 40rpx 0;
						border-bottom:1rpx solid #e4e7ed;
						.title-wrap{
							.title{
								.badge{
									display: inline-block;
									padding: 0 2rpx;
									margin-right: 5rpx;
									border: 1px solid #0486fe;
									font-size: 22rpx;
									color: #1890ff;
								}
								.count{
									font-size: 32rpx;
									color: #000000;
								}
							}
						}
						.time{
							margin-top: 10rpx;
							font-size: 28rpx;
							color: #888888;
						}
					}
				}
			}
			
		}
	}
</style>
