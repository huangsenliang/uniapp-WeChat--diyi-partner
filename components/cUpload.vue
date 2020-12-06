<template>
	<view class="page">
		<u-upload
			ref="upload"
			:custom-btn="customBtn"
			:show-upload-list="showUploadList"
			:header="header"
			:multiple="multiple"
			upload-text=" "
			:max-count="maxCount"
			:action="action"
			:file-list="fileList"
			:before-upload="myBeforeUpload"
			@on-success="uploadSuccess"
			@on-remove="uploadRemove"
			@on-error="uploadError"
			@on-change="uploadChange"
			@on-uploaded="uploadUploaded"
			:form-data="formData"
			name="file"
			width="160"
		>
			<view v-if="customBtn" slot="addBtn"><slot></slot></view>
		</u-upload>
	</view>
	
</template>

<script>
/**
 * 重新封装了u-upload 用于统一上传，基本参数与u-upload一致
 * 对返回进行了处理, 仅当code为200时才出发成功回调
 */
export default {
	props: {
		// 是否自定义显示
		customBtn: {
			type: Boolean,
			default: false
		},
		showUploadList: {
			type: Boolean,
			default: false
		},
		// 是否开启图片多选，部分安卓机型不支持
		multiple: {
			type: Boolean,
			default: false
		},
		uploadText: {
			type: String,
			default: '选择图片'
		},
		maxCount: {
			type: [String, Number],
			default: 9
		},
		fileList: {
			type: Array,
			default() {
				return [];
			}
		},
	},
	data() {
		return {
			formData:{
				suffix:'png,jpg'
			},
			action: process.env.VUE_APP_BASE_API + process.env.VUE_APP_UPLOAD_URL
		};
	},
	computed: {
		header() {
			return {
				'diyi-auth': 'Bearer ' + this.vuex_token
			};
		}
	},
	created(){
		console.log(" this.vuex_token=======", this.vuex_token)
	},
	methods: {
		
		uploadSuccess(res, index, lists) {
			if (res.code != 200) {
				this.$u.toast(res.message)
				this.$emit('on-error', res, index, lists);
			} else {
				this.$emit('on-success', res, index, lists);
			}
		},
		uploadRemove(res,index, lists) {
			// this.$emit('on-del',"");
			// console.log(res,555555555)
			this.$emit('on-remove', index, lists);
		},
		uploadError(res, index, lists) {
			this.$emit('on-error', res, index, lists);
		},
		// 图片上传后，无论成功或者失败都会触发
		uploadChange(res, index, lists) {
			this.$emit('on-change', res, index, lists);
		},
		uploadUploaded(lists) {
			this.$loading(false)
			this.$emit('on-uploaded', lists);
		},
		myBeforeUpload(index, list) {
			this.$loading()
			return true
		}
	}
};
</script>

<style></style>
