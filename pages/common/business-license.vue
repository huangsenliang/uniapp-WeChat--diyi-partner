<template>
	<!-- 营业执照页面 -->
	<view class="page">
		<view class="updata-wrap">
			<c-upload 
				:fileList="fileList" 
				:show-upload-list="true" 
				:max-count="1" 
				@on-remove="delField"
				@on-success="setField">
			</c-upload>
		</view>
		
		<!-- <view v-if="imgFiles.length > 0" class="add-wrap" @click="previewImage">
			<view class="image-box">
				<image style="width: 200rpx;" :src="imgFiles[0]" mode="widthFix"></image>
				<image @click.stop="delImg" class="del" src="/static/shop/del.png" mode="widthFix"></image>
			</view>
		</view>
		<view v-if="!imgFiles.length > 0" class="add-wrap" @click="chooseTheImg">
			<image src="/static/shop/add.png" mode="widthFix"></image>
			<view class="text">上传</view>
		</view> -->
		<!-- <view class="btn-b-blue btn" @click="chooseTheImg">
			重新上传
		</view> -->
	</view>
</template>

<script>
	import cUpload from '@/components/cUpload.vue';
export default {
	data() {
		return {
			eventName:"",
			bizLicenceUrl:"",
			fileList:[]
		};
	},
	components: {
		cUpload
	},
	computed:{
	  imgFiles:{
		  get(){
			  return this.$store.getters.getBusinessImgFiles;
		  },
		  set(newValue){
			  this.$store.commit('setBusinessImgFiles',newValue);
		  }
	  }
	},
	onLoad(options){
		 
		if(options&&options.eventName){
			this.eventName = options.eventName
		}
		if(options&&options.bizLicenceUrl){
			this.fileList.push({url:options.bizLicenceUrl})
		}
	},
	methods: {
		delField(res){
			console.log("删除图片路径===",res)
			if(this.eventName){
				this.$EventBus.$emit(this.eventName, JSON.stringify(""))
			}
		},
		setField(res) {
			console.log("上传路径：",res)
			// this.fileList.push(res.data);
			if(this.eventName){
				this.$EventBus.$emit(this.eventName, JSON.stringify(res.data))
			}
			// this.form.investorHandCommitment = res.data;
		},
		// 选择上传图片
		chooseTheImg() {
			this.$chooseImage(1).then(res => {
				this.imgFiles = res.tempFilePaths;
				this.$store.commit('setBusinessImgFiles',res.tempFilePaths);
			});
		},
		// 预览图片
		previewImage() {
			if (this.imgFiles.length > 0) {
				uni.previewImage({
					urls: this.imgFiles
				});
			}
		},
		// 上传图片
		uploadImg() {
			uni.uploadFile({
				url:process.env.VUE_APP_BASE_API + process.env.VUE_APP_UPLOAD_URL,
				filePath: this.imgFiles[0],
				name: 'file',
				formData: {
					
				},
				success: uploadFileRes => {
					console.log("上传成功：",uploadFileRes)
					// if(this.eventName){
					// 	this.$EventBus.$emit(this.eventName, JSON.stringify(item))
					// }
					resolve('success');
				}
			});
		},
		// 删除选择图片
		delImg(index) {
			this.imgFiles = [];
			this.$store.commit('setBusinessImgFiles',[])
		}
	}
};
</script>

<style lang="scss">
.page {
	.updata-wrap{
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding: 30rpx;
	}
	.add-wrap {	
		margin-top: 20rpx;
		background-color: #fff;
		padding: 30rpx;
		image {
			width: 122rpx;
			margin-right: 19rpx;
		}
		.text {
			width: 122rpx;
			text-align: center;
			font-size: 30rpx;
		}
		.image-box{
			position: relative;
			display: inline-block;
			.del{
				position: absolute;
				right: -20rpx;
				top: -20rpx;
				width: 50rpx;
			}
		}
	}
	.btn{
		position: fixed;
		left: 50%;
		bottom: 41rpx;
		margin-left: -335rpx;
	}
}
</style>
