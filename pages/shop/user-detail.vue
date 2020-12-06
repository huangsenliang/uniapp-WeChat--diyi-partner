<template>
	<!-- 商户详情 -->
	<view class="page">
		<view class="content">
			<u-cell-group>
				<u-cell-item class="header-title" title="商户名称" :value="formData.enterpriseName" :arrow="false"></u-cell-item>
				<u-cell-item title="法人" :value="formData.legalPersonName" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="联系电话" :value="formData.invoiceAddressPhone" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="社会信用代码" :value="formData.socialCreditNo" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="营业执照">
					<view class="right-wrap flex align-items justify-end">
						<image style="width: 80rpx;" class="arrow" :src="formData.bizLicenceUrl" mode="widthFix"></image>
					</view>
				</u-cell-item>
				<!--  -->
				<u-cell-item title="合作信息" class="black" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="商户加盟平台协议" :borderBottom="false"></u-cell-item>
				<u-cell-item title="商户承诺函"></u-cell-item>
				<!--  -->
				<u-cell-item title="联系人" class="black" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="姓名" :value="formData.contact1Name" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="职位" :value="formData.contact1Position|formatPosition" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="电话/手机" :value="formData.contact1Phone" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="邮箱" :value="formData.contact1Mail" :arrow="false"></u-cell-item>
				
				<u-cell-item title="联系人" class="black" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="姓名" :value="formData.contact2Name" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="职位" :value="formData.contact2Position|formatPosition" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="电话/手机" :value="formData.contact2Phone" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="邮箱" :value="formData.contact2Mail" :arrow="false"></u-cell-item>
				<!--  -->
				<u-cell-item title="开票信息" class="black" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="公司名称" :value="formData.invoiceEnterpriseName" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="纳税识别号" :value="formData.invoiceTaxNo" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="电话地址、电话手机" :borderBottom="false" :arrow="false">
					<view class="" style="width: 100%;text-align: right;">{{formData.invoiceAddressPhone}}</view>
				</u-cell-item>
				<u-cell-item title="开户行及账号" :value="formData.invoiceBankNameAccount" :arrow="false"></u-cell-item>
				<!--  -->
				<u-cell-item title="管理员账户信息" class="black" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="用户名" :value="formData.employeeUserName":borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="手机" :value="formData.phoneNumber" :borderBottom="false" :arrow="false"></u-cell-item>
				<!-- <u-cell-item title="状态" value="正常" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="创建时间" value="2020-10-31  23:12:00" :arrow="false"></u-cell-item> -->
			</u-cell-group>
			<view class="btn-wrap flex justify-between">
				<view class="btn-b-blue" @click="toAssociate">交易明细</view>
				<!-- <view style="margin-left: 25rpx;" class="btn-m-blue" @click="updata">修改信息</view> -->
			</view>
			
			
		</view>
	</view>
</template>

<script>
import { getDetail } from '@/api/enterprise.js';
export default {
	data() {
		return {
			enterpriseId: '',
			formData:{}
		};
	},
	onShow(){
		getDetail({enterpriseId:this.enterpriseId}).then(res=>{
			console.log("res==",res.data)
			this.formData = res.data;
		})
	},
	onLoad(options) {
		if (options && options.enterpriseId) {
			this.enterpriseId = options.enterpriseId;
		}
	},
	methods: {
		toAssociate(){
			uni.navigateTo({
				url:"/pages/associate/index?enterpriseId="+this.enterpriseId
			})
		},
		updata(){
			uni.navigateTo({
				url:"/pages/shop/add-user?type=editor&enterpriseId="+this.enterpriseId
			})
		}
	}
};
</script>

<style lang="scss">
.page {
	.content {
		background-color: #fff;
		padding-bottom: 200rpx;
	}
	padding-top: 20rpx;
	/deep/ .u-cell {
		padding: 10rpx 26rpx;
		color: #999999;
	}
	.header-title {
		padding: 30rpx;
		/deep/ .u-cell__value {
			color: #000;
			font-size: 32rpx;
		}
	}
	/deep/ .u-cell__value {
		color: #000;
	}
	.black {
		color: #000;
		padding: 30rpx;
	}
	.btn-wrap {
		position: fixed;
		left: 50%;
		z-index: 100000;
		bottom: 41rpx;
		margin-left: -335rpx;
	}
}
</style>
