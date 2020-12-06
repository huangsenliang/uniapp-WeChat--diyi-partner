<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="section-top">
			<view class="title">{{ info.ibname || '' }}</view>
			<!-- <view class="sub">统一社会信用代码：456554565786328</view> -->
		</view>
		<view class="section-card">
			<view class="u-flex u-row-around u-col-center top">
				<view>
					<view class="label">月度累计开票</view>
					<view class="value">￥{{ count.monthMoney || 0 }}</view>
				</view>
				<view>
					<view class="label">年度累计开票</view>
					<view class="value">￥{{ count.yearMoney || 0 }}</view>
				</view>
			</view>
			<u-button @click="toSelf" type="primary">自助开票</u-button>
		</view>
		<view>
			<u-cell-group>
				<u-cell-item :arrow="false" :value="info.ibname || ''" title="名称"></u-cell-item>
				<!-- <u-cell-item :arrow="false" title="纳税人识别号" value="456554565786328"></u-cell-item> -->
				<!-- <u-cell-item :arrow="false" title="园区" value="上海市**园区"></u-cell-item> -->
				<u-cell-item :value="info.mainIndustry || ''" :arrow="false" title="行业类型"></u-cell-item>
				<u-cell-item :arrow="false" title="经营范围">
					<view class="u-p-l-20 u-text-left">
						{{ info.bizScope }}
						<view class="text-red">*以工商局核定为准</view>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" title="核定税种">
					<view class="u-p-l-20 u-text-left">
						<text>{{ info.bizType | filterTax }}</text>
					</view>
				</u-cell-item>
				<u-cell-item :value="info.bizName || ''" :arrow="false" title="经营者"></u-cell-item>
				<u-cell-item :value="(info.registeredMoney || '') + '万元'" :arrow="false" title="注册资金"></u-cell-item>
			</u-cell-group>
			<view class="u-p-30">营业执照</view>
			<view class="u-m-b-30"><u-image :src="info.businessLicenceUrl" width="100%" height="300rpx" mode="aspectFit"></u-image></view>
		</view>
		<view class="btn-b-blue" @click="toAdd">
			修改个人户信息
		</view>
	</view>
</template>

<script>
import { getDetail, getCount } from '@/api/individual.js';
import { getIndividualTax } from '@/utils/enum.js';
export default {
	filters: {
		filterTax(val) {
			if (val) {
				return getIndividualTax(val);
			}
			return '';
		}
	},
	data() {
		return {
			id: undefined,
			info: {},
			count: {}
		};
	},
	onLoad(e) {
		this.id = e.id;
	},
	onShow(){
		this.$nextTick(() => {
			this.fetchData();
		});
	},
	methods: {
		toAdd() {
			this.$u.route({
				url: '/pages/individual/add?type=editor&individualBusinessId='+this.id
			});
		},
		fetchData() {
			getDetail({
				individualEnterpriseId: this.id
			})
				.then(res => {
					let data = res.data;
					if (this.$u.test.isEmpty(data.ibname)) {
						data.ibname = data.candidatedNames.split(',')[0];
					}
					this.info = data;
				})
				.catch(res => {
					this.$toast(res.msg);
				});

			getCount({
				individualEnterpriseId: this.id
			})
				.then(res => {
					this.count = res.data;
				})
				.catch(res => {
					this.$toast(res.msg);
				});
		},
		toSelf() {
			uni.switchTab({
				url: '/pages/selfInvoice/index'
			});
		}
	}
};
</script>

<style lang="scss">
	.btn-b-blue{
		margin: 30rpx auto;
	}
.section-top {
	background-color: #406cff;
	padding: 80rpx 40rpx;
	.title {
		font-size: 38rpx;
		font-weight: 800;
		line-height: 53rpx;
		color: rgba(255, 255, 255, 1);
	}
	.sub {
		margin-top: 10rpx;
		font-size: 24rpx;
		font-weight: 400;
		line-height: 33rpx;
		color: rgba(255, 255, 255, 1);
	}
}
.section-card {
	margin-top: -20rpx;
	background: rgba(255, 255, 255, 1);
	border-radius: 20rpx 20rpx 0px 0px;
	padding: 80rpx 40rpx;

	.top {
		text-align: center;
		.label {
			font-size: 30rpx;
			font-weight: 400;
			line-height: 42rpx;
			color: rgba(136, 136, 136, 1);
		}
		.value {
			margin-top: 10rpx;
			margin-bottom: 50rpx;
			font-size: 38rpx;
			font-weight: 800;
			line-height: 53rpx;
			color: rgba(51, 51, 51, 1);
		}
	}
}
</style>
