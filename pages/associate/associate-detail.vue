<template>
	<!-- 众包明细页面 -->
	<view class="page">
		<u-navbar title-width="300" back-icon-color="#000" :title-bold="true" :title="type == 0 ? '总包+分包交易明细' : '众包/众采交易明细'"></u-navbar>
		<view class="body">
			<!--  -->
			<view class="header-title">
				<view class="title-item flex">
					<text class="title">商户</text>
					<text class="name">上海****科技有限公司</text>
				</view>
				<view class="title-item flex">
					<text class="title">服务商</text>
					<text class="name">深圳***企业服务有限公司</text>
				</view>
			</view>
			<!--  -->
			<view class="content">
				<view class="title flex align-items">{{ type == 0 ? '总包+分包' : '众包/众采' }}</view>
				<view class="list-wrap">
					<view class="list-title flex align-items">支付信息</view>
					<view class="list-item flex justify-between align-items">
						<text>支付编号</text>
						<text class="right">0MA54W</text>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>支付清单</text>
						<image src="/static/shop/right.png" style="width: 40rpx;" mode="widthFix"></image>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>支付回单</text>
						<image src="/static/shop/right.png" style="width: 40rpx;" mode="widthFix"></image>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>关联的工单</text>
						<image src="/static/shop/right.png" style="width: 40rpx;" mode="widthFix"></image>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>交付支付验收单</text>
						<image src="/static/shop/right.png" style="width: 40rpx;" mode="widthFix"></image>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>支付编号</text>
						<text class="right">0MA54W</text>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>状态</text>
						<text class="right">审核通过</text>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>时间</text>
						<text class="right">2020-10-31 23:12:00</text>
					</view>
				</view>
				<!--  -->
				<view class="list-wrap">
					<view class="list-title flex align-items">发票信息</view>
					<view class="list-item flex justify-between align-items">
						<text>发票编号</text>
						<text class="right">0MA54W</text>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>发票</text>
						<image src="/static/shop/right.png" style="width: 40rpx;" mode="widthFix"></image>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>税票</text>
						<image src="/static/shop/right.png" style="width: 40rpx;" mode="widthFix"></image>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>开票状态</text>
						<text class="right">已开票</text>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>时间</text>
						<text class="right">审核通过</text>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>时间</text>
						<text class="right">2020-10-31 23:12:00</text>
					</view>
				</view>
				<!-- 物流 -->
				<view class="process-wrap">
					<view class="process-title flex align-items">物流信息</view>
					<view class="process-subtitle flex align-items">韵达快递 4305512637519</view>
					<view class="process-content">
						<logistics :wlInfo="wlInfo"></logistics>
					</view>
				</view>
			</view>
			<!-- 清单 -->
			<view class="associate-list">
				<view class="title flex align-items">支付清单明细</view>
				<view class="form-wrap">
					<view class="form-header flex">
						<view class="item1 flex align-items justify-center">姓名</view>
						<view class="item2 flex align-items justify-center">费用</view>
						<view class="item3 flex align-items justify-center">发票</view>
						<view class="item4 flex align-items justify-center">税票</view>
					</view>
					<view class="form-item flex" v-for="(item,index) of 5" :key="index">
						<view class="item1 flex align-items justify-center">张学友</view>
						<view class="item2 flex align-items justify-center">¥ 68888.00</view>
						<navigator class="item3 flex align-items justify-center">查看</navigator>
						<navigator class="item4 flex align-items justify-center">查看</navigator>
					</view>
					<view class="flex align-items justify-center" style="height: 80rpx; color: #999;">
						---我也是有底线的---
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import logistics from '@/components/xinyu-logistics/xinyu-logistics.vue';
export default {
	components: { logistics },
	data() {
		return {
			type: '',
			wlInfo: {
			    delivery_status: 1, //快递状态 1已签收 2配送中
			    // post_name: '韵达快递', //快递名称
			    // logo: 'https://cdn.kuaidi100.com/images/all/56/yunda.png', //快递logo
			    // exp_phone: '95546', //快递电话
			    // post_no: '4304678557725', //快递单号
				addrUser:"小梅",
				userPhone:"18244909688",
			    addr: '江西省南昌市青云谱区', //收货地址
			    //物流信息
			    list: [
			        {
			            "time": "2020-04-12 12:58:53",
			            "timeArr": ['2020-04-12', '12:58:53'],
			            "context": "江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888",
			            "location": ""
			        },
			        {
			            "time": "2020-04-11 15:45:44",
			            "timeArr": ['2020-04-11', '15:45:44'],
			            "context": "江西南昌分拨中心 从站点发出，本次转运目的地：江西南昌青云谱区",
			            "location": ""
			        },
			        {
			            "time": "2020-04-11 15:08:45",
			            "timeArr": ['2020-04-11', '15:08:45'],
			            "context": "江西南昌分拨中心 在分拨中心进行卸车扫描",
			            "location": ""
			        },
			        {
			            "time": "2020-04-10 17:42:41",
			            "timeArr": ['2020-04-10', '17:42:41'],
			            "context": "浙江义乌分拨中心 进行装车扫描，发往：江西南昌分拨中心",
			            "location": ""
			        },
			        {
			            "time": "2020-04-10 17:39:38",
			            "timeArr": ['2020-04-10', '17:39:38'],
			            "context": "浙江义乌分拨中心 在分拨中心进行称重扫描",
			            "location": ""
			        },
			        {
			            "time": "2020-04-10 16:02:46",
			            "timeArr": ['2020-04-10', '16:02:46'],
			            "context": "浙江义乌城西公司 进行下级地点扫描，发往：江西南昌地区包",
			            "location": ""
			        },
			        {
			            "time": "2020-04-10 15:48:42",
			            "timeArr": ['2020-04-10', '15:48:42'],
			            "context": "浙江义乌城西公司城西营销部 进行揽件扫描",
			            "location": ""
			        },
					{
					    "time": "2020-04-12 13:00:57",
					    "timeArr": ['2020-04-12', '13:00:57'],
					    "context": "江西南昌青云谱区 快件已被 丰巢智能柜 代签收。",
					    "location": ""
					}
			    ]
			}
		};
	},
	onLoad(options) {
		if (options && options.type) {
			// this.title = parseInt(options.type)==0?'总包+分包交易明细':"众包/众采交易明细";
			this.type = parseInt(options.type);
		}
	}
};
</script>

<style lang="scss">
.page {
	.body {
		.header-title {
			padding: 30rpx;
			background-color: #ffffff;
			.title-item {
				margin-top: 20rpx;
				font-size: 28rpx;
				.title {
					width: 180rpx;
					margin-right: 25rpx;
					color: #999999;
				}
				.name {
					color: #000;
				}
			}
		}
		.content {
			margin-top: 20rpx;
			padding: 0 30rpx;
			background-color: #fff;
			.title {
				color: #000;
				height: 88rpx;
				font-size: 28rpx;
				// border-bottom: 1rpx solid $color-gray;
			}
			.list-wrap {
				border-top: 1rpx solid $color-gray;
				.list-title {
					color: #000;
				}
				.list-title,
				.list-item {
					height: 60rpx;
					font-size: 24rpx;
				}
				.list-item {
					color: #999999;
					.right {
						color: #000;
					}
				}
			}
			.process-wrap {
				border-top: 1rpx solid $color-gray;
				.process-title {
					color: #000;
					height: 60rpx;
					font-size: 24rpx;
				}
				.process-subtitle {
					height: 60rpx;
					color: #999999;
					font-size: 24rpx;
				}
			}
			
		}
		.associate-list{
			background-color: #fff;
			margin-top: 20rpx;
			padding: 0 30rpx;
			.title{
				height: 80rpx;
				border-bottom: 1rpx solid $color-gray;
			}
			.form-wrap{
				overflow-y: auto;
				height: 500rpx;
				.form-header{
					color: #000;
				}
				.form-item{
					color: #888;
					.item3{
						color: #1890FF;
					}
					.item4{
						color: #1890FF;
					}
				}
				.form-header,.form-item{
					height: 80rpx;
					font-size: 24rpx;
					border-bottom: 1rpx solid $color-gray;
					.item1{
						flex: 1;
					}
					.item2{
						flex: 2;
					}
					.item3{
						flex: 1;
					}
					.item4{
						flex: 1;
					}
				}
			}
		}
	}
}
</style>
