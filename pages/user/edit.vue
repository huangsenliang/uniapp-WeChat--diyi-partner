<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="u-p-t-20">
			<view class="bg-white">
				<u-field v-if="vuex_user.idcardVerifyStatus !== 'VERIFYPASS'" v-model="formData.name" :input-align="inputAlign"
				 label="姓名" placeholder="请输入">
				</u-field>
				<u-cell-item title="头像" center @click="uploadImg">
					<view class="u-flex u-col-center u-row-right">
						<!-- #ifdef MP-WEIXIN -->
						<u-image v-if="!$u.test.isEmpty(formData.avatar)" class="inline-block" width="80rpx" height="80rpx" :src="formData.avatar"
						 mode="scaleToFill"></u-image>
						<open-data v-else class="header" style="width: 80rpx;height: 80rpx;" type="userAvatarUrl"></open-data>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<u-image class="inline-block" width="80rpx" height="80rpx" :src="formData.avatar" mode="scaleToFill"></u-image>
						<!-- #endif -->
					</view>
				</u-cell-item>
				<u-field v-model="formData.politicState" :input-align="inputAlign" label="政治面貌" placeholder="请输入">
				</u-field>
				<u-cell-item title="民族" :value="formData.nationality" center @click="nationShow = true"></u-cell-item>
				<u-cell-item title="文化程度" :value="formData.levelofedu" center @click="cultureShow = true"></u-cell-item>
				</u-field>
				<u-field v-model="formData.emailAddress" :input-align="inputAlign" label="电子邮箱" placeholder="请输入">
				</u-field>
				<u-field v-if="vuex_user.idcardVerifyStatus !== 'VERIFYPASS'" v-model="formData.idcardNo" label-width="200"
				 :input-align="inputAlign" label="身份证号码" placeholder="请输入">
				</u-field>
				<template v-if="vuex_user.bankCardVerifyStatus !== 'VERIFYPASS'">
					<u-field v-model="formData.bankCardNo" :input-align="inputAlign" label="银行卡号" placeholder="请输入">
					</u-field>
					<u-field v-model="formData.bankName" :input-align="inputAlign" label="开户银行" placeholder="请输入">
					</u-field>
					<u-field v-model="formData.subBankName" :input-align="inputAlign" label="开户支行" placeholder="请输入">
					</u-field>
				</template>
				<u-field v-model="formData.runAddress" label-width="200" :input-align="inputAlign" label="线上经营场所" placeholder="请输入">
				</u-field>
				<u-field v-model="formData.houseAddress" label-width="200" :input-align="inputAlign" label="线下经营地址" placeholder="请输入">
				</u-field>
				<u-field v-model="formData.livingAddress" :input-align="inputAlign" label="住址" placeholder="请输入">
				</u-field>
				<u-field v-model="formData.selfDesc" :input-align="inputAlign" label="自我描述" placeholder="请输入">
				</u-field>
			</view>
			<view class="u-m-40">
				<u-button type="primary" @click="submit">确定</u-button>
			</view>
			<c-select v-model="nationShow" key="nation" :list="nation" @confirm="setField('nationality', $event)"></c-select>
			<c-select v-model="cultureShow" key="culture" :list="culture" @confirm="setField('levelofedu', $event)"></c-select>
		</view>
	</view>
</template>

<script>
	import cSelect from '@/components/cSelect.vue'
	import {
		updateInfo
	} from '@/api/user.js'
	import {
		upload, getDict
	} from '@/api/common.js'
	export default {
		components: {
			cSelect
		},
		data() {
			return {
				inputAlign: 'right',
				formData: {
					name:"",  // 姓名
					avatar:"",  // 头像
					politicState:"",  // 政治面貌
					nationality:"",  // 民族
					levelofedu:"",  // 文化程度
					emailAddress:"",  //电子邮箱
					idcardNo:"", //身份证号码
					bankCardNo:"",  // 银行卡号
					bankName:"",  // 开户银行
					subBankName:"",  // 开户支行
					runAddress:"", // 线上经营场所
					houseAddress:"",  // 线下经营地址
					livingAddress:"", //  住址
					selfDesc:"",  // 自我描述
				},
				nationShow: false,
				cultureShow: false,
				nation: [],
				culture: []
			};
		},
		onReady() {
			this.setForm()
			this.fetchDict()
		},
		methods: {
			fetchDict() {
				// 民族类型
				getDict({
					code: 'nation'
				}).then(res => {
					const data = res.data || []
					const newData = []
					if (data.length) {
						const child = data[0].children || []
						for (let i = 0, len = child.length; i < len; i++) {
							newData.push({
								value: child[i].dictValue,
								label: child[i].dictValue
							})
						}
					}
					this.nation = newData
				}).catch(res => {
					this.$toast(res.msg)
				})
				// 文化程度
				getDict({
					code: 'culture'
				}).then(res => {
					const data = res.data || []
					const newData = []
					if (data.length) {
						const child = data[0].children || []
						for (let i = 0, len = child.length; i < len; i++) {
							newData.push({
								value: child[i].dictValue,
								label: child[i].dictValue
							})
						}
					}
					this.culture = newData
				}).catch(res => {
					this.$toast(res.msg)
				})
			},
			setField(field, e) {
				this.formData[field] = e[0].value
			},
			setForm() {
				const data = this.vuex_user || {}
				const formData = this.formData
				for (let i in formData) {
					if (formData.hasOwnProperty(i) && data.hasOwnProperty(i)) {
						this.formData[i] = data[i]
					}
				}
			},
			submit() {
				const formData = this.formData
				console.log("提交数据：",formData)
				updateInfo(formData).then(res => {
					this.$toast('修改成功', true)
					this.$back()
				}).catch(res => {
					this.$toast(res.msg)
				})
			},
			uploadImg() {
				uni.chooseImage({
					count: 1,
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths[0];
						this.$loading()
						upload(tempFilePaths).then(res => {
							this.formData.avatar = res.data || ''
							this.$loading(false)
						}).catch(res => {
							this.$toast(res.msg)
							this.$loading(false)
						})
				    }
				});
			}
		}
	};
</script>

<style lang="scss">

</style>
