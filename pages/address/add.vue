<template>
	<!-- 添加新地址 -->
	<view class="wrap u-p-t-20">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="u-p-l-20 u-p-r-20 bg-white">
			<u-form :model="formData" :error-type="errorType" ref="uForm">
				<u-form-item :label-width="labelWidth" required label="姓名" prop="addressName"><u-input placeholder="请输入姓名" v-model="formData.addressName" /></u-form-item>
				<u-form-item :label-width="labelWidth" required label="手机号" prop="addressPhone"><u-input placeholder="请输入手机号" v-model="formData.addressPhone" /></u-form-item>
				<u-form-item :label-width="labelWidth" required label="所在地区" prop="region">
					<u-input type="select" :select-open="show" v-model="formData.region" placeholder="请选择地区" @click="showRegionPicker"></u-input>
				</u-form-item>
				<u-form-item :label-width="labelWidth" required label="详细地址" prop="detailedAddress">
					<u-input type="textarea" placeholder="请填写详细地址" v-model="formData.detailedAddress" />
				</u-form-item>
				<u-form-item :label-width="labelWidth" label="默认地址">
					<u-switch v-model="formData.isDefault" slot="right"></u-switch>
				</u-form-item>
			</u-form>
		</view>
		<view class="u-m-40">
			<u-button :loading="loading" @click="submit" type="primary">提交</u-button>
		</view>
		
		<u-picker mode="region" ref="uPicker" :default-region='region' @confirm="regionConfirm" v-model="show" />
	</view>
</template>

<script>
import { update } from '@/api/address.js'	
export default {
	data() {
		return {
			labelWidth: 150,
			errorType: ['toast'],
			loading: false,
			show: false,
			region: ['北京市', '市辖区', '东城区'],
			formData: {
				addressName: '',
				addressPhone: '',
				region: '',
				detailedAddress: '',
				isDefault: false,
			},
			rules: {
				addressName: [
					{
						required: true,
						message: '请输入收件人',
						trigger: ['blur']
					}
				],
				detailedAddress: [
					{
						required: true,
						message: '请输入详细地址',
						trigger: ['blur']
					}
				],
				region: [
					{
						required: true,
						message: '请选择地区',
						trigger: 'change'
					}
				],
				addressPhone: [
					{
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						required: true,
						message: '手机号码不正确',
						trigger: ['blur']
					}
				]
			}
		};
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		showRegionPicker() {
			this.show = true;
		},
		// 选择地区回调
		regionConfirm(e) {
			this.region = [e.province.label, e.city.label, e.area.label]
			this.formData.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			this.formData.province = e.province.label
			this.formData.city = e.city.label
			this.formData.area = e.area.label  
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					let {
						addressName,
						addressPhone,
						area,
						city,
						detailedAddress,
						isDefault,
						province
					} = this.formData
					let form = {addressName,addressPhone,area,city,detailedAddress,isDefault,province}
					this.loading = true
					this.$loading()
					update(form).then(res => {
						this.$toast('添加成功', true)
						this.$loading(false)
						this.$back()
					}).catch(res => {
						this.$toast(res.msg)
						this.$loading(false)
						this.loading = false
					})
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
			}
		}

		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 40rpx;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
}
</style>
