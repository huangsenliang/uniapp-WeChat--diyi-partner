<template>
	<!-- 协议页面 -->
	<view class="page">
		<view class="image-box flex align-items" @click="openFile">
			<image src="/static/common/pdf.png" mode="widthFix"></image>
			<text class="name">xxx.pdf</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				fileUrl:""
			}
		},
		methods:{
			openFile(){
				this.$openFile(this.fileUrl)
			},
		}
	}
</script>

<style lang="scss">
	.page{
		.image-box{
			margin-top: 20rpx;
			background-color: #FFFFFF;
			padding: 30rpx;
			.name{
				font-size: 32rpx;
			}
			image{
				width: 122rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
