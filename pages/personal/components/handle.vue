<template>
	<view class="u-m-t-20">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="padding-lf bg-white">
			<u-form :model="form" ref="uForm">
				<u-form-item :label-width="labelWidth" label="联系人"><u-input v-model="form.contactName" :input-align="inputAlign" placeholder="请输入联系人" /></u-form-item>
				<u-form-item :label-width="labelWidth" label="电话"><u-input v-model="form.contactPhone" :input-align="inputAlign" placeholder="请输入电话" /></u-form-item>
			</u-form>
		</view>
		<view class="u-m-40">
			<u-button @click="prev">上一步</u-button>
			<view class="u-m-t-20"><u-button @click="next" type="primary">提交</u-button></view>
		</view>
	</view>
</template>

<script>
import {getDetail2} from '@/api/personal.js';
export default {
	props: {
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
			labelWidth: 150,
			inputAlign: 'right',
			form: {
				contactName: '',
				contactPhone: ''
			}
		};
	},
	created(){
		if(this.type==="editor"){
			getDetail2({
				individualBusinessId: this.individualBusinessId 
			}).then(res=>{
				this.form.contactName = res.data.contactName;
				this.form.contactPhone = res.data.contactPhone;
			})
		}
	},
	methods: {
		next() {
			let form = this.form;
			if (!form.contactName.length) {
				return this.$u.toast('请输入联系人');
			}
			if (!form.contactPhone.length) {
				return this.$u.toast('请输入电话');
			}
			if (!this.$u.test.mobile(form.contactPhone)) {
				return this.$u.toast('请输入正确的电话');
			}
			this.$emit('next', form);
		},
		prev(e) {
			this.$emit('prev');
		}
	}
};
</script>

<style lang="scss"></style>
