<template>
	<!-- 新建（编辑）商户页面 -->
	<view class="page">
		<u-navbar back-icon-size="50rpx" title-size="40" title-color="#000" title-width="300" back-icon-color="#000" :title-bold="true" :title="type == 0 ? '新建商户' : '编辑商户'"></u-navbar>
		<!-- 基本信息 -->
		<view class="form-wrap">
			<view class="title">基本信息</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>商户名称</text>
				</view>
				<u-input input-align="right" style="width: 100%;" placeholder="请输入" v-model="form.enterpriseName" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>法人</text>
				</view>
				<u-input input-align="right" placeholder="请输入" v-model="form.legalPersonName" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items"><text>法人身份证号</text></view>
				<u-input input-align="right" placeholder="请输入" v-model="form.legalPersonIdcard" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>社会信用代码</text>
				</view>
				<u-input input-align="right" placeholder="请输入" v-model="form.socialCreditNo" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<!-- <text class="icon">*</text> -->
					<text>企业网址</text>
				</view>
				<u-input input-align="right" placeholder="请输入" v-model="form.enterpriseUrl" type="text" />
			</view>
			<view @click="toBizLicence" class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>营业执照</text>
				</view>
				<view class="right-wrap flex align-items justify-end">
					<u-image 
						width="80rpx" 
						height="70rpx" 
						:src="form.bizLicenceUrl"></u-image>
					<!-- <image style="width: 80rpx;" v-if="form.bizLicenceUrl" :src="form.bizLicenceUrl" mode="widthFix"></image> -->
					<image class="arrow" src="/static/shop/right.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 合作信息 -->
		<view class="form-wrap">
			<view class="title">合作信息</view>
			<navigator url="/pages/common/agreement-list" class="form-item flex align-items">
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
			<view v-if="false" class="form-item flex align-items" @click="showMarketer = true">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>营销人员</text>
				</view>
				<view class="right-choss">{{ form.marketer }}</view>
				<image src="/static/shop/xiajiantou.png" mode="widthFix" style="width: 40rpx;"></image>
				<u-select @confirm="confirmMarketer" v-model="showMarketer" :list="marketerList"></u-select>
			</view>
			<view v-if="false" class="form-item flex align-items" @click="showOperating = true">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>运营人员</text>
				</view>
				<view class="right-choss">{{ form.operating }}</view>
				<image src="/static/shop/xiajiantou.png" mode="widthFix" style="width: 40rpx;"></image>
				<u-select @confirm="confirmOperating" v-model="showOperating" :list="operatingList"></u-select>
			</view>
		</view>
		<view class="form-wrap">
			<view class="title">联系人信息1</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>姓名</text>
				</view>
				<u-input input-align="right" placeholder="请输入" v-model="form.contact1Name" type="text" />
			</view>
			<view class="form-item flex align-items" @click="showPosition1 = true">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>职位</text>
				</view>
				<view class="right-choss">{{ form.contact1Position|formatPosition }}</view>
				<image src="/static/shop/xiajiantou.png" mode="widthFix" style="width: 40rpx;"></image>
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>电话/手机</text>
				</view>
				<u-input input-align="right" placeholder="请输入" type="number" v-model="form.contact1Phone" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>邮箱</text>
				</view>
				<u-input input-align="right" placeholder="请输入" v-model="form.contact1Mail" type="text" />
			</view>
		</view>
		<view class="form-wrap">
			<view class="title">联系人信息2</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>姓名</text>
				</view>
				<u-input input-align="right" placeholder="请输入" v-model="form.contact2Name" type="text" />
			</view>
			<view class="form-item flex align-items" @click="showPosition2 = true">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>职位</text>
				</view>
				<view class="right-choss">{{ form.contact2Position|formatPosition }}</view>
				<image src="/static/shop/xiajiantou.png" mode="widthFix" style="width: 40rpx;"></image>
				<!-- <u-input placeholder="请输入" v-model="form.contact2Position" type="text" /> -->
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>电话/手机</text>
				</view>
				<u-input input-align="right"  placeholder="请输入" type="number" v-model="form.contact2Phone" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>邮箱</text>
				</view>
				<u-input input-align="right" placeholder="请输入" v-model="form.contact2Mail" type="text" />
			</view>
		</view>
		<!-- <view class="add-wrap flex align-items" @click="addUserInfo">
			<image src="/static/shop/add.png" mode="widthFix"></image>
			<text>新建商户</text>
		</view> -->
		<view class="form-wrap">
			<view class="title">开票信息</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>公司名称</text>
				</view>
				<u-input input-align="right" placeholder="请输入" v-model="form.invoiceEnterpriseName" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>纳税识别号</text>
				</view>
				<u-input input-align="right" placeholder="请输入" v-model="form.invoiceTaxNo" type="text" />
			</view>
			<view class="form-item-textarea flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>地址、电话</text>
				</view>
				<u-input style="width: 100%;" input-align="right" type="textarea" placeholder="请输入" v-model="form.invoiceAddressPhone" />
			</view>
			<view class="form-item-textarea flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>开户行及账号</text>
				</view>
				<u-input style="width: 100%;" input-align="right" type="textarea" placeholder="请输入" v-model="form.invoiceBankNameAccount" />
			</view>
		</view>
		<!--  -->
		<view class="form-wrap">
			<view class="title">快递信息</view>
			
			<view @click="chooseAddress" url="/pages/address/choose" class="form-item-textarea flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>收货地址</text>
				</view>
				<view class="right-wrap flex align-items justify-end">
					<u-input :disabled="true" style="width: 100%;" placeholder=" " input-align="right" type="textarea" v-model="form.detailedAddress" />
					<!-- <text v-show="form.detailedAddress">{{ form.detailedAddress }}</text> -->
					<image class="arrow" src="/static/shop/right.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!--  -->
		<view class="form-wrap">
			<view class="title">管理员账户信息</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>用户名</text>
				</view>
				<u-input input-align="right" placeholder="请输入" v-model="form.employeeUserName" type="text" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>手机</text>
				</view>
				<u-input input-align="right" placeholder="请输入" v-model="form.phoneNumber" type="number" />
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>姓名</text>
				</view>
				<u-input input-align="right" placeholder="请输入" v-model="form.workerName" type="text" />
			</view>

			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>密码</text>
				</view>
				<!-- <u-input placeholder="请输入" v-model="form.employeePwd" type="password " /> -->
				<u-field v-model="form.employeePwd" type="password" placeholder="请输入长度为6-18位的密码" label-width="0"></u-field>
			</view>
			<view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>确认密码</text>
				</view>
				<u-field v-model="employeePwd2" type="password" placeholder="请输入长度为6-18位的密码" label-width="0"></u-field>
				<!-- <u-input placeholder="请输入" v-model="employeePwd2" type="password " /> -->
			</view>
			<!-- <view class="form-item flex align-items">
				<view class="label flex align-items">
					<text class="icon">*</text>
					<text>创客加入邀请码</text>
				</view>
				<u-input placeholder="请输入" v-model="form.socialCreditCode" type="text" />
			</view> -->
		</view>
		<view class="btn-wrap flex justify-between">
			<view class="btn-m-gray" @click="del">取消</view>
			<view class="btn-m-blue" @click="submit">确定</view>
		</view>
		<u-select :list="positionList" v-model="showPosition1" @confirm="confirmPosition1"></u-select>
		<u-select :list="positionList" v-model="showPosition2" @confirm="confirmPosition2"></u-select>
	</view>
</template>

<script>
import { addEnterprise,getDetail2,updateEnterprise } from '@/api/enterprise.js';
const positionList = [
	{
		value: 'FINANCIAL',
		label: '财务人员'
	},
	{
		value: 'PERSONNEL',
		label: '人事人员'
	},
	{
		value: 'OPERATION',
		label: '运营人员'
	},
	{
		value: 'MARKETING',
		label: '营销人员'
	},
	{
		value: 'MANAGEMENT',
		label: '管理人员'
	},
	{
		value: 'SERVICE',
		label: '客服人员'
	},
	{
		value: 'OTHERS',
		label: '其他'
	}
];
const formData = {
	addressName: '', // 收件人姓名
	addressPhone: '', // 收件人手机号
	area: '', // 区
	bizLicenceUrl: '', // 营业执照
	city: '', // 市
	commitmentLetters: 'https://diyi-cr.oss-cn-shanghai.aliyuncs.com/upload/20201130/bd3478efe82d4fc1b923d951f2961118.png', // 商户承诺函
	contact1Mail: '', // 联系人1邮箱
	contact1Name: '',
	contact1Phone: '',
	contact1Position: '',
	contact2Mail: '',
	contact2Name: '',
	contact2Phone: '',
	contact2Position: '',
	detailedAddress: '', // 详细地址
	employeePwd: '', // 密码
	employeeUserName: '', // 用户名
	enterpriseName: '', // 商户名称
	invoiceAddressPhone: '', // 开票资料-地址和电话
	invoiceBankNameAccount: '', // 开户银行和账号
	invoiceEnterpriseName: '', // 公司名称
	invoiceTaxNo: '', // 纳税人识别号
	joinContract: 'https://diyi-cr.oss-cn-shanghai.aliyuncs.com/upload/20201130/bd3478efe82d4fc1b923d951f2961118.png', // 加盟合同
	legalPersonIdcard: '', // 法人身份证
	legalPersonName: '', // 法人
	phoneNumber: '', // 手机号码
	province: '', // 省
	socialCreditNo: '', // 统一社会信用代码
	enterpriseUrl: '', // 企业网址
	workerName: '' // 姓名
};
const userInfo = {
	userName: '',
	position: '',
	phone: '',
	email: ''
};
const notNull = {
	enterpriseName: '请输入商户名称', // 商户名称
	legalPersonName: '请输入法人', // 法人
	socialCreditNo: '请输入社会信用代码', // 统一社会信用代码
	bizLicenceUrl: '请上传营业执照', // 营业执照
	// joinContract: '请选择', // 加盟合同
	// commitmentLetters: '', // 商户承诺函
	contact1Name: '请输入联系人1姓名',
	contact1Position: '请输入联系人1职位',
	contact1Phone: '请输入联系人1电话',
	contact1Mail: '请输入联系人1邮箱', // 联系人1邮箱
	contact2Name: '请输入联系人2姓名',
	contact2Position: '请输入联系人2职位',
	contact2Phone: '请输入联系人2电话',
	contact2Mail: '请输入联系人2邮箱',
	invoiceEnterpriseName: '请输入公司名称', // 公司名称
	invoiceTaxNo: '请输入纳税人识别号', // 纳税人识别号
	invoiceAddressPhone: '请输入开票电话', // 开票资料-地址和电话
	invoiceBankNameAccount: '请输入开户银行和账号', // 开户银行和账号
	// addressName: '请选择收货地址', // 收件人姓名
	employeeUserName: '请输入用户名', // 用户名
	phoneNumber: '请输入手机号码', // 手机号码
	workerName: '请输入姓名', // 姓名
	// employeePwd: '请输入密码' // 密码
};
export default {
	computed: {
		businessImage() {
			//通过方法访问
			return this.$store.getters.getBusinessImgFiles;
		}
	},
	data() {
		return {
			enterpriseId:"",
			type:"",
			showPosition1: false,
			showPosition2: false,
			showMarketer: false,
			showOperating: false,
			userInfoList: [],
			form: {},
			employeePwd2: '',
			positionList: [
				{
					value: 'FINANCIAL',
					label: '财务人员'
				},
				{
					value: 'PERSONNEL',
					label: '人事人员'
				},
				{
					value: 'OPERATION',
					label: '运营人员'
				},
				{
					value: 'MARKETING',
					label: '营销人员'
				},
				{
					value: 'MANAGEMENT',
					label: '管理人员'
				},
				{
					value: 'SERVICE',
					label: '客服人员'
				},
				{
					value: 'OTHERS',
					label: '其他'
				}
			],
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
	onLoad(options) {
		if (options && options.type) {
			this.type = options.type;
		}
		if (options && options.enterpriseId) {
			this.enterpriseId = options.enterpriseId;
		}
		this.userInfoList.push(JSON.parse(JSON.stringify(userInfo)));
		if(this.type==="editor"){
			getDetail2({enterpriseId:this.enterpriseId}).then(res=>{
				console.log("res===>",res);
				this.form = res.data;
			})
		}else{
			this.form = formData;
		}
	},
	methods: {
		confirmPosition1(e) {
			this.form.contact1Position = e[0].value;
		},
		confirmPosition2(e) {
			this.form.contact2Position = e[0].value;
		},
		toBizLicence() {
			let eventName = 'businessLicenseBack';
			this.$EventBus.$off(eventName);
			this.$EventBus.$on(eventName, data => {
				this.$EventBus.$off(eventName);
				data = JSON.parse(data);
				this.form.bizLicenceUrl = data;
			});
			uni.navigateTo({
				url: '/pages/common/business-license?eventName=' + eventName + '&bizLicenceUrl=' + this.form.bizLicenceUrl
			});
		},
		chooseAddress() {
			if(this.type==="editor"){
				uni.navigateTo({
					url: '/pages/address/index'
				})
			}else{
				let eventName = 'addressListBack';
				this.$EventBus.$off(eventName);
				this.$EventBus.$on(eventName, data => {
					this.$EventBus.$off(eventName);
					data = JSON.parse(data);
					console.log('地址信息返还===', data);
					this.form.addressName = data.addressName;
					this.form.addressPhone = data.addressPhone;
					this.form.city = data.city;
					this.form.area = data.area;
					this.form.province = data.province;
					this.form.detailedAddress = data.detailedAddress;
				});
				uni.navigateTo({
					url: '/pages/address/choose?eventName=' + eventName
				});
			}
		},
		del() {
			this.employeePwd2 = "";
			this.form = formData;
		},
		isEmaile(e) {
		   return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(e)
		},
		submit() {
			
			console.log('提交数据：', this.form);
			// 非空判断
			for (let key in notNull) {
				if (!this.form[key]) {
					this.toast(notNull[key]);
					return;
				}
			}
			
			// if (!this.$u.test.mobile(this.form.phoneNumber)) {
			// 	return this.$u.toast('管理员手机号不正确');
			// }
			// if (!this.$u.test.mobile(this.form.contact1Phone)) {
			// 	return this.$u.toast('联系人1手机号不正确');
			// }
			// if (!this.$u.test.mobile(this.form.contact1Phone)) {
			// 	return this.$u.toast('联系人2手机号不正确');
			// }
			// if (!this.$u.test.mobile(this.form.invoiceAddressPhone)) {
			// 	return this.$u.toast('开票手机号不正确');
			// }
			if(this.type !=="editor"){
				// if (!this.form.addressName) {
				// 	this.toast('请选择收货地址');
				// 	return;
				// }  
				if(!this.form.employeePwd){
					return this.$u.toast('请输入密码');
				}
				if (this.employeePwd2 !== this.form.employeePwd) {
					this.toast('请再次输入确认密码');
					return;
				} 
				// if(!this.isEmaile(this.form.contact1Mail)){
				// 	return this.$u.toast('联系人1邮箱格式不正确');
				// }
				// if(!this.isEmaile(this.form.contact2Mail)){
				// 	return this.$u.toast('联系人2邮箱格式不正确');
				// }
				addEnterprise(this.form).then(res => {
					this.toast("添加成功!!");
					this.status = 'loadmore';
					setTimeout(function(){
						uni.navigateBack({delta: 1});
					},1500);
				}).catch(res => {
					this.toast(res.msg);
				});
			}else{
				this.form.enterpriseId = this.form.id;
				updateEnterprise(this.form).then(res => {
					this.toast("修改成功！")
					setTimeout(function(){
						uni.navigateBack({delta: 1});
					},1500);
				}).catch(res => {
					this.status = 'loadmore';
				});
				
			}
			
		},
		addUserInfo() {
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
		confirmMarketer(e) {
			this.form.marketer = e[0].label;
		},
		confirmOperating(e) {
			console.log(e);
			this.form.operating = e[0].label;
		}
	}
};
</script>

<style lang="scss">
.page {
	.add-wrap {
		border-top: 1rpx solid #efeff4;
		background-color: #fff;
		width: 100%;
		padding: 30rpx;
		image {
			width: 122rpx;
			margin-right: 19rpx;
		}
		text {
			font-size: 30rpx;
		}
	}
	.form-wrap {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 0 40rpx 0 30rpx;
		font-size: 28rpx;
		.title {
			height: 88rpx;
			line-height: 88rpx;
			font-size: 28rpx;
			color: #999999;
			border-bottom: 1rpx solid #efeff4;
		}
		.form-item,.form-item-textarea:not(:last-child) {
			border-bottom: 1rpx solid #efeff4;
		}
		.form-item-textarea {
			height: auto !important;
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
				// height: 100rpx;
				line-height: 100rpx;
				.arrow {
					width: 40rpx;
				}
			}
			.right-choss {
				color: #000;
				width: 100%;
				// height: 100rpx;
				padding-right: 10rpx;
				line-height: 100rpx;
				text-align: right;
			}
		}
		.form-item {
			height: 100rpx;
			u-input{
				width: 100%;
			}
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
			.right-choss {
				color: #000;
				width: 100%;
				height: 100rpx;
				padding-right: 10rpx;
				line-height: 100rpx;
				text-align: right;
			}
		}
	}
	.btn-wrap {
		margin: 96rpx 35rpx;
		padding-bottom: 96rpx;
	}
}
</style>
