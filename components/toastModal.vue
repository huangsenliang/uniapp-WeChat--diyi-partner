<template>
	<u-modal v-model="visible" @confirm="onConfirm">
		<view class="slot-content">
			<u-icon v-if="icon" :name="icon" :color="iconColor" size="100"></u-icon>
			<view class="content">{{content}}</view>
		</view>
	</u-modal>
</template>

<script>
export default {
	data() {
		return {
			visible: false,
			content: '',
			type: '',
			iconColor: '#09BB07',
			back: false
		};
	},
	computed: {
		icon() {
			const type = this.type
			let icon = false
			if (type === 'success') {
				icon = 'checkmark-circle-fill'
			} else if (type === 'error') {
				icon = 'close-circle-fill'
			}
			return icon
		}
	},
	methods: {
		show(options) {
			options = options || {}
			if (options.type) {
				this.type = options.type
			}
			this.back = options.back || false
			if (options.iconColor) {
				options.iconColor = options.iconColor
			} else {
				if (options.type === 'success') {
					this.iconColor = '#09BB07'
				} else if (options.type === 'error') {
					this.iconColor = '#EC5051'
				}
			}
			if (options.msg) {
				this.content = options.msg
			}
			this.visible = true
		},
		onConfirm() {
			if (this.back) {
				uni.navigateBack({
					
				})
			}
		}
	}
};
</script>

<style lang="scss">
	.slot-content {
		padding: 50rpx 0;
		text-align: center;
		.content {
			padding-top: 10rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			color: #666666;
			font-size: 30rpx;
		}
	}
</style>
