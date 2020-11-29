<template>
	<!-- 商户详情 -->
	<view class="page">
		<view class="content">
			<u-cell-group>
				<u-cell-item class="header-title" title="商户名称" value="杭州市阿里巴巴集团公司" :arrow="false"></u-cell-item>
				<u-cell-item title="商户编号" value="0MA54W876548901" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="法人" value="马小云" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="联系电话" value="13866667777" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="社会信用代码" value="91370104MA3N1HWC7M" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="营业执照" ></u-cell-item>
				<!--  -->
				<u-cell-item title="合作信息" class="black" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="商户加盟平台协议"  :borderBottom="false"></u-cell-item>
				<u-cell-item title="商户承诺函" ></u-cell-item>
				<!--  -->
				<u-cell-item title="联系人" class="black" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="姓名" value="马小云" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="职位" value="财务总监" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="电话/手机" value="18866669999" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="邮箱" value="maxiaoyun@126.com"  :arrow="false"></u-cell-item>
				<!--  -->
				<u-cell-item title="开票信息" class="black" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="公司名称" value="杭州市阿里巴巴集团公司" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="纳税识别号" value="91370104MA3N1HWC7M" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="电话地址、电话手机"  :borderBottom="false" :arrow="false">
					<view class="" style="width: 100%;text-align: right;">
						上海市徐汇区虹梅路1801号上海腾讯大厦(漕河泾开发区）18866669999
					</view>
				</u-cell-item>
				<u-cell-item title="开户行及账号" value="中国工商银行4455486452345765235"  :arrow="false"></u-cell-item>
				<!--  -->
				<u-cell-item title="管理员账户信息" class="black" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="用户名" value="maxiaoyun" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="手机" value="13866667777" :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="创客加入邀请码" value="ckyqm002" :arrow="false"></u-cell-item>
				<u-cell-item title="状态" value="正常"  :borderBottom="false" :arrow="false"></u-cell-item>
				<u-cell-item title="创建时间" value="2020-10-31  23:12:00"  :arrow="false"></u-cell-item>
			</u-cell-group>
			<navigator class="btn btn-b-blue" url="/pages/associate/index">交易明细</navigator>
		</view>
		
	</view>
</template>

<script></script>

<style lang="scss">
.page {
	.content{
		background-color: #fff;
		padding-bottom:200rpx ;
	}
	padding-top: 20rpx;
	/deep/ .u-cell {
		padding: 10rpx 26rpx;
		color: #999999;
	}
	.header-title{
		padding: 30rpx;
		/deep/ .u-cell__value {
			color: #000;
			font-size: 32rpx;
		}
	}
	/deep/ .u-cell__value {
		color: #000;
	}
	.black{
		color: #000;
		padding: 30rpx;
	}
	.btn{
		position: fixed;
		left: 50%;
		bottom: 41rpx;
		margin-left: -335rpx;
	}
}
</style>
