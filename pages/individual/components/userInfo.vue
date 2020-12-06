<template>
	<view class="u-p-t-20">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="bg-white u-p-30">
			<view>投资人身份证</view>
			<view class="u-flex u-row-between u-col-center u-m-t-20 u-p-b-30" @click="toMakeList">
				<u-image
					v-if="formData.idcardPic && formData.idcardPic.length"
					:src="formData.idcardPic"
					width="45vw"
					height="220rpx"
					mode="aspectFit"
				></u-image>
				<u-icon v-else label="身份证人像面" label-pos="bottom" label-color="#CCCCCC" size="220" color="#a8a8a8" name="idcard-z" custom-prefix="custom-icon"></u-icon>
				<u-image
					v-if="formData.idcardPicBack && formData.idcardPicBack.length"
					:src="formData.idcardPicBack"
					width="45vw"
					height="220rpx"
					mode="aspectFit"
				></u-image>
				<u-icon v-else label="身份证国徽面" label-pos="bottom" label-color="#CCCCCC" size="220" color="#a8a8a8" name="idcard-f" custom-prefix="custom-icon"></u-icon>
			</view>
		</view>
		<u-cell-group>
			<u-cell-item :arrow="false" title="姓名" :value="formData.name"></u-cell-item>
			<u-cell-item :arrow="false" title="身份证" :value="formData.idcardNo"></u-cell-item>
		</u-cell-group>
		
		<view class="u-m-40">
			<u-button @click="prev">上一步</u-button>
			<view class="u-m-t-20">
				<u-button @click="next" type="primary">下一步</u-button>
			</view>
		</view>
		<u-popup v-model="popupShow" mode="top" length="60%">
				<view class="padding-tb">
					<image src="/static/img/example.jpg" style="width: 100%;" mode="aspectFit"></image>
					<view class="u-text-center u-m-t-40">需要看清楚身份证字和人脸清晰</view>
				</view>
		</u-popup>
	</view>
</template>

<script>
	import {getDetail2} from '@/api/individual.js';
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
	created(){
		if(this.type==="editor"){
			getDetail2({
				individualEnterpriseId: this.individualBusinessId 
			}).then(res=>{
				console.log("经营者信息填充数据：",res.data)
				this.formData.name = res.data.name;
				this.formData.idcardNo = res.data.idcardNo;
				this.formData.idcardPic = res.data.idcardPic;
				this.formData.idcardPicBack = res.data.idcardPicBack;
				this.formData.makerId = res.data.makerId;
			})
		}
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
	computed: {
		// name() {
		// 	const {name} = this.info
		// 	return name && name.length ? name : ''
		// },
		// idcard() {
		// 	const {idNo} = this.info
		// 	return idNo && idNo.length ? idNo : ''
		// }
	},
	mounted() {
	},
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
			});
			uni.navigateTo({
				url: '/pages/common/makeList?eventName='+eventName
			});
		},
		upload(type) {
			uni.chooseImage({
				count: 1,
				success: chooseImageRes => {
					const filePath = chooseImageRes.tempFilePaths[0];
				}
			});
		},
		uploadHand(type) {
			uni.chooseImage({
				count: 1,
				success: chooseImageRes => {
					const filePath = chooseImageRes.tempFilePaths[0];
				}
			});
		},
		next() {
			// this.info = this.formData;
			this.$emit('next', this.formData);
		},
		prev(e) {
			this.$emit('prev');
		}
	}
};
</script>

<style lang="scss">

</style>
