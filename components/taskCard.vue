<template>
	<u-card margin="0" :border="false" border-radius="0" :show-foot="showFoot">
		<view class="card-header u-flex u-row-between u-col-center" slot="head">
			<view class="label u-flex-1">商户名称</view>
			<view class="content u-flex-3">{{ info.enterpriseName || '' }}</view>
		</view>
		<view class="card-body" slot="body">
			<view class="body-item u-flex u-row-between u-col-center u-p-t-0">
				<view class="label u-flex-1">工单名称</view>
				<view class="content u-flex-3">{{ info.worksheetName || '' }}</view>
			</view>
			<view class="body-item u-flex u-row-between u-col-center u-p-t-0">
				<view class="label u-flex-1">类 型</view>
				<view class="content u-flex-3">{{ info.worksheetType | filterType }}</view>
			</view>
			<view class="body-item u-flex u-row-between u-col-center u-p-t-0">
				<view class="label u-flex-1">模 式</view>
				<view class="content u-flex-3">{{ info.worksheetMode | filterMode }}</view>
			</view>
			<view class="body-item u-flex u-row-between u-col-center u-p-t-0">
				<view class="label u-flex-1">发布时间</view>
				<view class="content u-flex-3">{{ info.createTime | filterDate('YYYY-MM-DD HH:mm:ss') }}</view>
			</view>
			<view class="body-item u-flex u-row-between u-col-center u-p-t-0">
				<view class="label u-flex-1">工单号</view>
				<view class="content u-flex-3">{{ info.worksheetNo || '' }}</view>
			</view>
		</view>
		<view slot="foot"><slot name="foot" /></view>
	</u-card>
</template>

<script>
import { getTaskMode, getTaskType } from '@/utils/enum.js';
export default {
	name: 'task-card',
	filters: {
		filterType(val) {
			return val ? getTaskType(val) : '';
		},
		filterMode(val) {
			return val ? getTaskMode(val) : '';
		}
	},
	props: {
		info: {
			type: Object,
			default() {
				return {};
			}
		},
		showFoot: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.card-header {
	.label {
		font-size: 30rpx;
		color: rgba(136, 136, 136, 1);
	}
	.content {
		font-size: 34rpx;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		text-align: right;
	}
}
.card-body {
	font-size: 28rpx;
	line-height: 50rpx;
	color: rgba(136, 136, 136, 1);
	.content {
		text-align: right;
	}
}
</style>
