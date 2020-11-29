<template>
	<!-- 新建（编辑）商户页面 -->
	<view class="page">
		<!-- 基本信息 -->
		<view class="form-wrap">
			<view class="title">基本信息</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>商户名称</text>
				</view>
				<u-input placeholder="请输入" v-model="form.shopNmae" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>法人</text>
				</view>
				<u-input placeholder="请输入" v-model="form.legalNmae" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items"><text>法人身份证号</text></view>
				<u-input placeholder="请输入" v-model="form.identityCard" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>社会信用代码</text>
				</view>
				<u-input placeholder="请输入" v-model="form.socialCreditCode" type="text" />
			</view>
			<navigator url="/pages/common/business-license" class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>营业执照</text>
				</view>
				<view class="right-wrap flex align-items justify-end">
					<image style="width: 80rpx;" v-if="businessImage.length>0" :src="businessImage[0]" mode="widthFix"></image>
					<image class="arrow" src="/static/shop/right.png" mode="widthFix"></image>
				</view>
			</navigator>
		</view>
		<!-- 合作信息 -->
		<view class="form-wrap">
			<view class="title">合作信息</view>
			<navigator url="/pages/common/agreement-list" class="form-item flex align-items" >
				<view style="width: 500rpx;" class="label flex align-items">
					<text class="icon">*</text>
					<text>商户加盟平台协议</text>
				</view>
				<view class="right-wrap flex align-items justify-end"><image class="arrow" src="/static/shop/right.png" mode="widthFix"></image></view>
			</navigator>
			<navigator url="/pages/common/acknowledgement-list" class="form-item flex align-items" @click="showTemp2">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>商家承诺函</text>
				</view>
				<view class="right-wrap flex align-items justify-end"><image class="arrow" src="/static/shop/right.png" mode="widthFix"></image></view>
			</navigator>
			<view class="form-item flex align-items" @click="showMarketer = true"> 
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>营销人员</text>
				</view>
				<view class="right-choss">
					{{form.marketer}}
				</view>
				<image src="/static/shop/xiajiantou.png"  mode="widthFix" style="width: 40rpx;"></image>
				<u-select  @confirm="confirmMarketer" v-model="showMarketer" :list="marketerList"></u-select>
			</view>
			<view class="form-item flex align-items" @click="showOperating = true">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>运营人员</text>
				</view>
				<view class="right-choss">
					{{form.operating }}
				</view>
				<image src="/static/shop/xiajiantou.png"  mode="widthFix" style="width: 40rpx;"></image>
				<u-select  @confirm="confirmOperating" v-model="showOperating" :list="operatingList"></u-select>
			</view>
		</view>
		<view class="form-wrap" v-for="(item,index) of userInfoList" :key="index">
			<view class="title">联系人信息{{index+1}}</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>姓名</text>
				</view>
				<u-input placeholder="请输入" v-model="item.userName" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>职位</text>
				</view>
				<u-input placeholder="请输入" v-model="item.position" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items"><text class="icon">*</text><text>电话/手机</text></view>
				<u-input placeholder="请输入" v-model="item.phone" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>邮箱</text>
				</view>
				<u-input placeholder="请输入" v-model="item.email" type="text" />
			</view>
		</view>
		<view class="add-wrap flex align-items" @click="addUserInfo">
			<image src="/static/shop/add.png" mode="widthFix"></image>
			<text>新建商户</text>
		</view>
		<view class="form-wrap">
			<view class="title">开票信息</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>公司名称</text>
				</view>
				<u-input placeholder="请输入" v-model="form.shopNmae" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>纳税识别号</text>
				</view>
				<u-input placeholder="请输入" v-model="form.legalNmae" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items"><text class="icon">*</text><text>地址、电话</text></view>
				<u-input placeholder="请输入" v-model="form.identityCard" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>开户行及账号</text>
				</view>
				<u-input placeholder="请输入" v-model="form.socialCreditCode" type="text" />
			</view>
		</view>
		<!--  -->
		<view class="form-wrap">
			<view class="title">快递信息</view>
			<navigator url="/pages/address/index" class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>收货地址</text>
				</view>
				<view class="right-wrap flex align-items justify-end"><image class="arrow" src="/static/shop/right.png" mode="widthFix"></image></view>
			</navigator>
		</view>
		<!--  -->
		<view class="form-wrap">
			<view class="title">管理员账户信息</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>用户名</text>
				</view>
				<u-input placeholder="请输入" v-model="form.shopNmae" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>手机</text>
				</view>
				<u-input placeholder="请输入" v-model="form.legalNmae" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>密码</text>
				</view>
				<u-input placeholder="请输入" v-model="form.socialCreditCode" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>确认密码</text>
				</view>
				<u-input placeholder="请输入" v-model="form.socialCreditCode" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>创客加入邀请码</text>
				</view>
				<u-input placeholder="请输入" v-model="form.socialCreditCode" type="text" />
			</view>
		</view>
		<view class="btn-wrap flex justify-between">
			<view class="btn-m-gray">
				取消
			</view>
			<view class="btn-m-blue">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import {addEnterprise} from "@/api/enterprise.js";
	const userInfo = {
		userName:"",
		position:"",
		phone:"",
		email:""
	}
export default {
	computed:{
			businessImage() {  //通过方法访问
	            return this.$store.getters.getBusinessImgFiles;
	        },
	},
	data() {
		return {
			showMarketer:false,
			showOperating:false,
			userInfoList:[],
			form: {
				shopNmae: '',
				legalNmae: '',
				identityCard: '',
				socialCreditCode: '',
				businessCode: '',
				marketer:"请选择",
				operating:"请选择"
			},
			marketerList: [
				{
					value: '1',
					label: '小明'
				},
				{
					value: '2',
					label: '小红'
				}
			],
			operatingList: [
				{
					value: '1',
					label: '小王'
				},
				{
					value: '2',
					label: '小李'
				}
			]
		};
	},
	onLoad(){
		this.userInfoList.push(JSON.parse(JSON.stringify(userInfo)));
	},
	methods:{
		addUserInfo(){
			this.userInfoList.push(JSON.parse(JSON.stringify(userInfo)));
		},
		// 打开商家承诺函
		showTemp() {
			this.$openFile(this.temp);
		},
		// 打开协议
		showTemp() {
			this.$openFile(this.temp);
		},
		confirmMarketer(e){
			this.form.marketer=e[0].label;
		},
		confirmOperating(e){
			console.log(e)
			this.form.operating=e[0].label;
		}
	}
};
</script>

<style lang="scss">
.page {
	.add-wrap{
		border-top: 1rpx solid #efeff4;
		background-color: #fff;
		width: 100%;
		padding: 30rpx ;
		image{
			width:122rpx;
			margin-right: 19rpx;
		}
		text{
			font-size: 30rpx;
		}
	}
	.form-wrap {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 0 30rpx;
		font-size: 32rpx;
		.title {
			height: 88rpx;
			line-height: 88rpx;
			font-size: 28rpx;
			color: #999999;
			border-bottom: 1rpx solid #efeff4;
		}
		.form-item:not(:last-child) {
			border-bottom: 1rpx solid #efeff4;
		}
		.form-item {
			height: 100rpx;
			.label {
				min-width: 200rpx;
				padding-right: 15rpx;
				.icon {
					color: red;
					padding-right: 10rpx;
				}
			}
			.right-wrap {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				.arrow {
					width: 40rpx;
				}
			}
			.right-choss{
				color: rgb(192, 196, 204);
				width: 100%;
				height: 100rpx;
				padding-right: 10rpx;
				line-height: 100rpx;
				text-align: right;
			}
			
		}
	}
	.btn-wrap{		
		margin: 96rpx 35rpx;
		padding-bottom: 96rpx;
	}
}
</style>
