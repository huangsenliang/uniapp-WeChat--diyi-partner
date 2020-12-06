<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="u-p-t-40 u-p-b-40 bg-white"><u-steps :list="numList" :current="current" un-active-color="#ccc"></u-steps></view>
		<view v-show="current == 0">
			<company-info v-if="type==='editor'" type="editor" :individualBusinessId="individualBusinessId" @next="next"></company-info>
			<company-info v-else @next="next"></company-info>
		</view>
		<view v-show="current == 1">
			<user-info v-if="type==='editor'" type="editor" :individualBusinessId="individualBusinessId" :info="verifiedInfo" @next="next" @prev="prev"></user-info>
			<user-info  v-else :info="verifiedInfo" @next="next" @prev="prev"></user-info>
		</view>
		<view v-show="current == 2">
			<handle v-if="type==='editor'" type="editor" :individualBusinessId="individualBusinessId" @next="submit" @prev="prev"></handle>
			<handle v-else @next="submit" @prev="prev"></handle>
		</view>
		<toast-modal ref="toastModal"></toast-modal>
	</view>
</template>

<script>
import toastModal from '@/components/toastModal.vue';
import companyInfo from './components/companyInfo.vue';
import userInfo from './components/userInfo.vue';
import handle from './components/handle.vue';
import { save,getDetail } from '@/api/individual.js';
export default {
	components: {
		companyInfo,
		userInfo,
		handle,
		toastModal
	},
	data() {
		return {
			type:"",
			individualBusinessId:"",
			formData: {},
			current: 0,
			numList: [
				{
					name: '企业信息',
					title: '填写企业信息'
				},
				{
					name: '经营者信息',
					title: '填写经营者信息'
				},
				{
					name: '提交办理',
					title: '提交办理'
				}
			],
			verifiedInfo: {}
		};
	},
	onLoad(options){
		console.log("options=====",options)
		if(options&&options.type){
			this.type = options.type
		}
		// console.log("this.type =======",this.type )
		if(options&&options.individualBusinessId){
			this.individualBusinessId = options.individualBusinessId;
			this.getDataForm()
		}
	},
	onReady() {
		uni.setNavigationBarTitle({
			title: this.numList[this.current].title
		});
		
	},
	watch: {
		current(newVal) {
			uni.setNavigationBarTitle({
				title: this.numList[newVal].title
			});
		}
	},
	methods: {
		getDataForm(){
			getDetail({
				individualEnterpriseId: this.individualBusinessId 
			}).then(res => {
				let data = res.data
				console.log("data=======",data)
				if (this.$u.test.isEmpty(data.ibname)) {
					data.ibname = data.candidatedNames.split(',')[0]
				}
				this.formData = data;
				
			}).catch(res => {
				this.$toast(res.msg)
			})
		},
		next(data) {
			this.formData = Object.assign(this.formData, data);
			console.log(this.formData);
			this.current++;
		},
		prev() {
			this.current--;
		},
		submit(data) {
			this.formData = Object.assign(this.formData, data);
			const form = Object.assign({}, this.formData);
			if(this.type==="editor"&&this.individualBusinessId){
				form.individualId = this.individualBusinessId;
			}
			this.$loading();
			save(form)
				.then(res => {
					this.$loading(false);
					this.$refs.toastModal.show({
						type: 'success',
						msg: '申请提交成功，平台客服人员会尽快联系您，请注意接听。',
						back: true
					});
				})
				.catch(res => {
					this.$loading(false);
					this.$toast(res.msg);
				});
		}
	}
};
</script>

<style></style>
