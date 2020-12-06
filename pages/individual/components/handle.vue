<template>
	<view class="u-m-t-20">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="padding-lf bg-white">
			<u-form :model="form" ref="uForm">
				<u-form-item :label-width="labelWidth" label="联系人"><u-input v-model="form.contactName" :input-align="inputAlign" placeholder="请输入联系人" /></u-form-item>
				<u-form-item :label-width="labelWidth" label="电话"><u-input v-model="form.contactPhone" :input-align="inputAlign" placeholder="请输入电话" /></u-form-item>
			</u-form>
			<!-- <view class="padding-tb u-border-bottom">手持承诺书照片</view>
			<c-upload v-if="type==='editor'" :fileList="fileList" :show-upload-list="true" :max-count="1" @on-success="setField"></c-upload>
			<c-upload v-else :show-upload-list="true" :max-count="1" @on-success="setField"></c-upload> -->
		</view>
		<view class="u-m-40">
			<u-button @click="prev">上一步</u-button>
			<view class="u-m-t-20"><u-button @click="next" type="primary">提交</u-button></view>
		</view>
	</view>
</template>

<script>
import cUpload from '@/components/cUpload.vue';
import {getDetail2} from '@/api/individual.js';
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
	created(){
		if(this.type==="editor"){
			getDetail2({
				individualEnterpriseId: this.individualBusinessId 
			}).then(res=>{
				this.form.contactName = res.data.contactName;
				this.form.contactPhone = res.data.contactPhone;
				this.form.investorHandCommitment = res.data.investorHandCommitment;
			})
		}
	},
	components: {
		cUpload
	},
	computed:{
		fileList(){
			return [this.form.investorHandCommitment]
		}
	},
	data() {
		return {
			labelWidth: 150,
			inputAlign: 'right',
			form: {
				contactName: '',
				contactPhone: '',
				// investorHandCommitment: '' // 手持承诺书照片
			}
		};
	},
	methods: {
		// setField(res) {
		// 	this.form.investorHandCommitment = res.data;
		// },
		next() {
			let form = Object.assign({}, this.form);
			console.log(form)
			if(!this.type==='editor'){
				if (!form.contactName.length) {
					return this.$u.toast('请输入联系人');
				}
				if (!form.contactPhone.length) {
					return this.$u.toast('请输入电话');
				}
				if (!form.investorHandCommitment.length) {
					return this.$u.toast('请上传手持承诺书照片');
				}
				if (!this.$u.test.mobile(form.contactPhone)) {
					return this.$u.toast('请输入正确的电话');
				}
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
