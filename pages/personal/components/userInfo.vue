<template>
	<view class="u-p-t-20">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="bg-white u-p-30" @click="toMakeList">
			<view>投资人身份证</view>
			<view class="u-flex u-row-between u-col-center u-m-t-20 u-p-b-30">
				<u-image v-if="formData.idcardPic && formData.idcardPic.length" :src="formData.idcardPic" width="45vw" height="220rpx" mode="aspectFit"></u-image>
				<u-icon v-else label="身份证人像面" label-pos="bottom" label-color="#CCCCCC" size="220" color="#a8a8a8" name="idcard-z" custom-prefix="custom-icon"></u-icon>
				<u-image v-if="formData.idcardPicBack && formData.idcardPicBack.length" :src="formData.idcardPicBack" width="45vw" height="220rpx" mode="aspectFit"></u-image>
				<u-icon v-else label="身份证国徽面" label-pos="bottom" label-color="#CCCCCC" size="220" color="#a8a8a8" name="idcard-f" custom-prefix="custom-icon"></u-icon>
			</view>
		</view>
		<u-cell-group>
			<u-cell-item :arrow="false" title="姓名" :value="formData.name"></u-cell-item>
			<u-cell-item :arrow="false" title="身份证" :value="formData.idcardNo"></u-cell-item>
		</u-cell-group>
		<view class="u-m-40">
			<u-button @click="prev">上一步</u-button>
			<view class="u-m-t-20"><u-button @click="next" type="primary">下一步</u-button></view>
		</view>
	</view>
</template>

<script>
import {getDetail2} from '@/api/personal.js';
export default {
	props: {
		info: {
			type: Object,
			defalut() {
				return {};
			}
		},
		type: {
			type: String,
			defalut() {
				return "";
			}
		},
		individualBusinessId: {
			type: String,
			defalut() {
				return "";
			}
		},
	},
	data() {
		return {
			popupShow: false,
			formData:{
				name:"",
				idcardNo:"",
				idcardPic:"",
				idcardPicBack:"",
				makerId:""
			}
		};
	},
	created(){
		if(this.type==="editor"){
			getDetail2({
				individualBusinessId: this.individualBusinessId 
			}).then(res=>{
				this.formData.name = res.data.name;
				this.formData.idcardNo = res.data.idcardNo;
				this.formData.idcardPic = res.data.bizName;
				this.formData.idcardPicBack = res.data.bizName;
				this.formData.makerId = res.data.makerId;
			})
		}
	},
	computed: {
		// name() {
		// 	const { name } = this.info;
		// 	return name && name.length ? name : '';
		// },
		// idcard() {
		// 	const { idNo } = this.info;
		// 	return idNo && idNo.length ? idNo : '';
		// }
	},
	mounted() {},
	methods: {
		toMakeList() {
			let eventName = "makeListBack";
			this.$EventBus.$off(eventName);
			this.$EventBus.$on(eventName, data => {
				this.$EventBus.$off(eventName);
				data = JSON.parse(data);
				this.formData.name = data.name,
				this.formData.idcardNo = data.idcardNo;
				this.formData.idcardPic = data.idcardPic;
				this.formData.idcardPicBack = data.idcardPicBack;
				this.formData.makerId = data.id;
				console.log("页面返还数据======",data)
			});
			uni.navigateTo({
				url: '/pages/common/makeList?eventName='+eventName
			});
		},
		next() {
			this.info.makerId = this.formData.makerId;
			this.$emit('next', this.info);
		},
		prev(e) {
			this.$emit('prev');
		}
	}
};
</script>

<style lang="scss"></style>
