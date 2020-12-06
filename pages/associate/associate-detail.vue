<template>
	<!-- 众包明细页面 -->
	<view class="page">
		<u-navbar
			back-icon-size="50rpx"
			title-size="40"
			title-color="#000"
			title-width="300"
			back-icon-color="#000"
			:title-bold="true"
			:title="type == 0 ? '总包+分包交易明细' : '众包/众采交易明细'"
		></u-navbar>
		<view class="body">
			<!--  -->
			<view class="header-title">
				<view class="title-item flex">
					<text class="title">商户</text>
					<text class="name">{{ payEnterpriseData.enterpriseName }}</text>
				</view>
				<view class="title-item flex">
					<text class="title">服务商</text>
					<text class="name">{{ payEnterpriseData.serviceProviderName }}</text>
				</view>
			</view>
			<!--  -->
			<view class="content">
				<view class="title flex align-items">{{ type == 0 ? '总包+分包' : '众包/众采' }}</view>
				<view class="list-wrap">
					<view class="list-title flex align-items">支付信息</view>
					<view class="list-item flex justify-between align-items">
						<text>支付编号</text>
						<text class="right">{{ payEnterpriseData.id }}</text>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>支付清单</text>
						<image :src="payEnterpriseData.chargeListUrl" style="width: 40rpx;" mode="widthFix"></image>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>支付回单</text>
						<image :src="payEnterpriseData.enterprisePayReceiptUrls" style="width: 40rpx;" mode="widthFix"></image>
					</view>
					<!-- <view class="list-item flex justify-between align-items">
						<text>关联的工单</text>
						<image src="/static/shop/right.png" style="width: 40rpx;" mode="widthFix"></image>
					</view> -->
					<view class="list-item flex justify-between align-items">
						<text>交付支付验收单</text>
						<image :src="payEnterpriseData.acceptPaysheetUrls" style="width: 40rpx;" mode="widthFix"></image>
					</view>
					<!-- <view class="list-item flex justify-between align-items">
						<text>支付编号</text>
						<text class="right">0MA54W</text>
					</view> -->
					<view class="list-item flex justify-between align-items">
						<text>状态</text>
						<text class="right">{{ payEnterpriseData.payState }}</text>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>时间</text>
						<text class="right">{{ payEnterpriseData.createTime }}</text>
					</view>
				</view>
				<!--  -->
				<view class="list-wrap">
					<view class="list-title flex align-items">发票信息</view>
					<!-- <view class="list-item flex justify-between align-items">
						<text>发票编号</text>
						<text class="right">0MA54W</text>
					</view> -->
					<!-- <view class="list-item flex justify-between align-items">
						<text>发票</text>
						<image src="/static/shop/right.png" style="width: 40rpx;" mode="widthFix"></image>
					</view> -->
					<!-- <view class="list-item flex justify-between align-items">
						<text>税票</text>
						<image src="/static/shop/right.png" style="width: 40rpx;" mode="widthFix"></image>
					</view> -->
					<view class="list-item flex justify-between align-items">
						<text>开票状态</text>
						<text class="right">{{ payEnterpriseData.companyInvoiceState }}</text>
					</view>
					<view class="list-item flex justify-between align-items">
						<text>审核状态</text>
						<text class="right">{{ payEnterpriseData.auditState }}</text>
					</view>
					<!-- <view class="list-item flex justify-between align-items">
						<text>时间</text>
						<text class="right">2020-10-31 23:12:00</text>
					</view> -->
				</view>
				<!-- 物流 -->
				<view class="process-wrap">
					<view class="process-title flex align-items">物流信息</view>
					<template v-if="express">
						<view class="process-subtitle flex align-items">{{ express.expressCompanyName }} {{ express.expressSheetNo }}</view>
						<view class="swipe-action">
							<!-- 物流信息 -->
							<!-- <logistics :wlInfo="wlInfo"></logistics> -->
							<view v-for="(item, index) of express.expressDetail" :key="index" class="cont flex">
								<!-- 左边 -->
								<view class="time-wrap flex flex-column justify-center align-items">
									<text v-if="item.time" class="time">{{ item.date }}</text>
									<text v-if="item.date" class="date">{{ item.time }}</text>
									<!-- 圆 -->
									<view class="circular-wrap flex align-items justify-center"><text class="circular-active"></text></view>
								</view>
								<!-- 右边 -->
								<view class="content-wrap">
									<text>{{ item.AcceptStation }}</text>
								</view>
							</view>
						</view>
						<view v-show="!isopenProcess" style="height: 80rpx;" @click="openProcess" class="flex align-items justify-center open-process">
							点击查看更多物流详情
							<image src="/static/shop/xiala.png" mode="widthFix"></image>
						</view>
						<view v-show="isopenProcess" style="height: 80rpx;" @click="openProcess" class="flex align-items justify-center open-process">
							点击收起
							<image src="/static/shop/shang.png" mode="widthFix"></image>
						</view>
					</template>
					<view v-else class="flex align-items justify-center" style="height: 80rpx;color: #888;">暂无快递信息!!</view>
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
					<view class="form-item flex" v-for="(item, index) of makerList" :key="index">
						<view class="item1 flex align-items justify-center">{{ item.name }}</view>
						<view class="item2 flex align-items justify-center">¥{{ item.totalFee }}</view>
						<view @click="openFile(item.invoiceUrl)" class="item3 flex align-items justify-center">查看</view>
						<view @click="openFile(item.taxUrl)" class="item4 flex align-items justify-center">查看</view>
					</view>
					<view class="flex align-items justify-center" style="height: 80rpx; color: #999;">---我也是有底线的---</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import logistics from '@/components/xinyu-logistics/xinyu-logistics.vue';
import { gePayEnterpriseDetail, getPayMakerList, getPayExpressDetail } from '@/api/enterprise.js';
let wlInfo = {
	expressCompanyName: '韵达快递', //快递名称
	expressSheetNo: '95546', //快递电话
	//物流信息
	expressDetail: [
		{
			// AcceptTime: '2020-04-12 12:58:53',
			date: '2020-04-12',
			time: '12:58:53',
			AcceptStation: '江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888'
		},
		{
			// AcceptTime: '2020-04-12 12:58:53',
			date: '2020-04-12',
			time: '12:58:53',
			AcceptStation: '江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888'
		},
		{
			// AcceptTime: '2020-04-12 12:58:53',
			date: '2020-04-12',
			time: '12:58:53',
			AcceptStation: '江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888'
		},
		{
			// AcceptTime: '2020-04-12 12:58:53',
			date: '2020-04-12',
			time: '12:58:53',
			AcceptStation: '江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888'
		},
		{
			// AcceptTime: '2020-04-12 12:58:53',
			date: '2020-04-12',
			time: '12:58:53',
			AcceptStation: '江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888'
		},
		{
			// AcceptTime: '2020-04-12 12:58:53',
			date: '2020-04-12',
			time: '12:58:53',
			AcceptStation: '江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888'
		}
	]
};
export default {
	components: { logistics },
	data() {
		return {
			isopenProcess: true,
			payEnterpriseId: '',
			type: '',
			makerList: [],
			payEnterpriseData: {},
			express: {}
		};
	},
	methods: {
		openProcess() {
			this.isopenProcess = !this.isopenProcess;
			let list = JSON.parse(JSON.stringify(wlInfo.expressDetail));
			if (this.isopenProcess) {
				this.express.expressDetail = list;
			} else {
				this.express.expressDetail = list.slice(0, 2);
			}
		},
		openFile(url) {
			if (url) {
				uni.previewImage({
					urls
				});
			}
		}
	},
	onLoad(options) {
		if (options && options.type) {
			// this.title = parseInt(options.type)==0?'总包+分包交易明细':"众包/众采交易明细";
			this.type = parseInt(options.type);
		}

		if (options && options.payEnterpriseId) {
			this.payEnterpriseId = options.payEnterpriseId;
		}
		gePayEnterpriseDetail({ payEnterpriseId: this.payEnterpriseId })
			.then(res => {
				this.payEnterpriseData = res.data;
			})
			.catch(res => {
				this.$toast(res.msg);
			});
		this.express = JSON.parse(JSON.stringify(wlInfo));
		if(this.express.expressDetail.length>2){
			this.isopenProcess = false
			this.express.expressDetail = wlInfo.expressDetail.slice(0, 2);
		}else{
			this.isopenProcess = true
		}
		getPayExpressDetail({ payEnterpriseId: this.payEnterpriseId })
			.then(res => {
				console.log('res===>', res.data);

				if (res.data) {
					wlInfo = res.data;
				}
				let arr = [];
				// 数据重构
				wlInfo.expressDetail.forEach(item => {
					let arrSplit = item.AcceptTime.split(' ');
					arr.push({
						date: arrSplit[0],
						time: arrSplit[1],
						AcceptStation: item.AcceptStation
					});
				});
				wlInfo.expressDetail = arr;
				this.express = JSON.parse(JSON.stringify(wlInfo));
				if (wlInfo.expressDetail.length > 2) {
					this.isopenProcess = false
					this.express.expressDetail = wlInfo.list.slice(0, 2);
				}
			})
			.catch(res => {
				this.$toast(res.msg);
			});

		getPayMakerList({ payEnterpriseId: this.payEnterpriseId })
			.then(res => {
				this.makerList = res.data.records;
			})
			.catch(res => {
				this.$toast(res.msg);
			});
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

			background-color: #fff;
			.title {
				color: #000;
				height: 88rpx;
				font-size: 28rpx;
				// border-bottom: 1rpx solid $color-gray;
			}
			.list-wrap {
				border-top: 1rpx solid $color-gray;
				padding: 0 30rpx;
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
					padding: 0 30rpx;
					color: #000;
					height: 60rpx;
					font-size: 24rpx;
				}
				.process-subtitle {
					padding: 0 30rpx;
					height: 60rpx;
					color: #999999;
					font-size: 24rpx;
				}
			}
		}
		.associate-list {
			background-color: #fff;
			margin-top: 20rpx;
			padding: 0 30rpx;
			.title {
				height: 80rpx;
				border-bottom: 1rpx solid $color-gray;
			}
			.form-wrap {
				overflow-y: auto;
				height: 500rpx;
				.form-header {
					color: #000;
				}
				.form-item {
					color: #888;
					.item3 {
						color: #1890ff;
					}
					.item4 {
						color: #1890ff;
					}
				}
				.form-header,
				.form-item {
					height: 80rpx;
					font-size: 24rpx;
					border-bottom: 1rpx solid $color-gray;
					.item1 {
						flex: 1;
					}
					.item2 {
						flex: 2;
					}
					.item3 {
						flex: 1;
					}
					.item4 {
						flex: 1;
					}
				}
			}
		}
	}
}

.open-process {
	color: #888;
	image {
		width: 20rpx;
		margin-left: 10rpx;
	}
}

// 物流样式
.swipe-action {
	.cont {
		// 激活样式
		min-height: 160rpx;
		&:last-child {
			.circular-active {
				width: 12rpx;
				height: 12rpx;
				background: #0576fe;
				border-radius: 50%;
			}
			.state-active {
				background: #50d54e !important;
			}
		}
		.time-wrap {
			position: relative;
			flex: 2.5;
			padding-top: 33rpx;
			border-right: 1rpx #dddddd dashed;
			.time {
				font-size: 24rpx;
				color: #333333;
			}
			.date {
				font-size: 24rpx;
				color: #333333;
				opacity: 0.5;
			}
			.circular-wrap {
				position: absolute;
				top: 50rpx;
				right: 0;
				transform: translateX(50%);
				width: 20rpx;
				height: 20rpx;
				background: #c8e1ff;
				border-radius: 50%;
			}
		}
		.content-wrap {
			flex: 5;
			padding: 33rpx 41rpx;
			// 标题
			// .title {
			// 	.name {
			// 		font-size: 32rpx;
			// 		color: #333333;
			// 		font-weight: 600;
			// 	}
			// 	.state {
			// 		margin-left: 28rpx;
			// 		display: inline-block;
			// 		font-size: 20rpx;
			// 		color: #ffffff;
			// 		width: 120rpx;
			// 		background: #cccccc;
			// 		border-radius: 20rpx;
			// 		text-align: center;
			// 	}
			// }
			// .item {
			// 	width: 100%;
			// 	font-size: 28rpx;
			// 	color: #333333;
			// }
		}
	}
}
</style>
