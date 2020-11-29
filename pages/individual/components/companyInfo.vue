<template>
	<!-- 个独 -->
	<view class="u-p-t-20">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="u-from">
			<u-form :model="form" :error-type="errorType" ref="uForm">
				<view class="bg-white padding-lf">
					<u-form-item :label-width="labelWidth" label="注册资本" prop="registeredMoney">
						<u-input :input-align="inputAlign" :clearable="false" v-model="form.registeredMoney" type="digit" />
						<view slot="right">万元</view>
					</u-form-item>
				</view>
				<view class="bg-white padding-lf">
					<!-- <u-form-item :label-width="labelWidth" label="行业类型" prop="registeredMoney">
						<u-input :input-align="inputAlign" :clearable="false" v-model="form.mainIndustry" />
					</u-form-item> -->
					<u-cell-group>
						<u-cell-item title="行业类型" :value="typeText" @click="show = true"></u-cell-item>
						<u-cell-item hover-class="none" :arrow="false" title="经营范围">
							<view class="u-p-l-20 u-text-left">
								{{ form.bizScope }}
								<view class="text-red">*以工商局核定为准</view>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
				<view class="u-padding-30">选择税种</view>
				<view class="bg-white padding-lf">
					<u-form-item label-width="0rpx" prop="bizType">
						<u-radio-group v-model="form.bizType" class="radio-group-wrap" :wrap="true" size="50">
							<u-radio v-for="(i, k) in taxList" :key="k" :name="i.value" class="radio-wrap" shape="circle">
								<text>{{ i.name }}</text>
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</view>
				<view class="u-padding-30">企业名称（首选）</view>
				<view class="bg-white padding-lf">
					<u-form-item label-width="0rpx" prop="companyName"><u-input v-model="form.companyName" placeholder="例如：徐州市***营销中心" /></u-form-item>
				</view>
				<view class="u-padding-30">企业名称（备选）</view>
				<view class="bg-white padding-lf">
					<u-form-item v-for="(i, k) in otherName" :key="i.key" label-width="0rpx">
						<u-input v-model="i.value" placeholder="请输入备选企业名称" />
						<view slot="right" @click="delOtherName(k)"><u-icon name="trash"></u-icon></view>
					</u-form-item>
				</view>
				<view @click="addOtherName" class="u-p-30 u-text-center bg-white" hover-class="hover-class">新增备选企业</view>
			</u-form>
		</view>
		<view class="u-m-40">
			<view class="u-m-t-20"><u-button @click="next" type="primary">下一步</u-button></view>
		</view>

		<c-select :list="lists" v-model="show" @confirm="confirm"></c-select>
	</view>
</template>

<script>
import cSelect from '@/components/cSelect.vue';
import { getIndividualTax } from '@/utils/enum.js';
import { getDict } from '@/api/common.js';
import { getDetail2} from '@/api/individual.js';
export default {
	props: {
		individualBusinessId: {
			type: String,
			defalut() {
				return '';
			}
		},
		type: {
			type: String,
			defalut() {
				return '';
			}
		}
	},
	created() {
		if (this.type === 'editor') {
			getDetail2({
				individualBusinessId: this.individualBusinessId
			})
				.then(res => {
					let data = res.data;
					if (this.$u.test.isEmpty(data.ibname)) {
						data.ibname = data.candidatedNames.split(',')[0];
					}
					console.log('data======', data);
					this.form = data;
					this.typeText = data.mainIndustry;
					let nameList = data.candidatedNames.split(',');
					this.form.candidatedNames = nameList[0];
					this.otherName = [];
					nameList.forEach((item, index) => {
						if (index > 0) {
							this.otherName.push({
								key: this.$u.guid(),
								value: item
							});
						}
					});
				})
				.catch(res => {
					this.$toast(res.msg);
				});
		}
	},
	components: {
		cSelect
	},
	data() {
		return {
			labelWidth: 150,
			inputAlign: 'right',
			errorType: ['toast'],
			// 默认选中的行业类型
			selectIndex: [],
			typeText: '请选择行业类型',
			show: false,
			// 开篇类型
			taxList: [],
			lists: [
				{
					value: '1',
					label: '企业管理',
					extra: [0]
				},
				{
					value: '2',
					label: '企业管理2',
					extra: [1]
				}
			],
			// 备用名称
			otherName: [],
			form: {
				bizScope: '',
				registeredMoney: null,
				mainIndustry: '',
				bizType: '',
				companyName: ''
			},
			rules: {
				registeredMoney: [
					{
						required: true,
						type: 'number',
						message: '请输入注册资本',
						trigger: ['blur']
					}
				],
				bizType: [
					{
						required: true,
						message: '请选择税种',
						trigger: ['change']
					}
				],
				companyName: [
					{
						required: true,
						message: '请输入企业名称（首选）',
						trigger: ['blur']
					}
				]
			}
		};
	},
	onLoad() {},
	mounted() {
		this.taxList = getIndividualTax();
		// 若备用名称输入框不存在则新建一个
		if (!this.otherName.length) {
			this.addOtherName();
		}
		this.$refs.uForm.setRules(this.rules);
		this.fetchDict();
	},
	methods: {
		fetchDict() {
			// 行业
			getDict({
				code: 'industry'
			})
				.then(res => {
					const data = res.data || [];
					const newData = [];
					if (data.length) {
						const child = data[0].children || [];
						for (let i = 0, len = child.length; i < len; i++) {
							newData.push({
								value: child[i].dictValue,
								label: child[i].dictValue,
								extra: child[i].remark
							});
						}
					}
					this.lists = newData;
				})
				.catch(res => {
					this.$toast(res.msg);
				});
		},
		// 新增备用名称
		addOtherName() {
			this.otherName.push({
				key: this.$u.guid(),
				value: ''
			});
		},
		// 删除备用名称
		delOtherName(index) {
			this.otherName.splice(index, 1);
		},
		confirm(e) {
			const item = e[0];
			this.typeText = item.label;
			this.form.mainIndustry = item.value;
			this.form.bizScope = item.extra;
		},
		sumbit(){
			let form = Object.assign({}, this.form);
			// 将非空备用名称组合进返回函数中
			const other = this.otherName;
			let otherArray = [];
							
			otherArray.push(form.companyName);
							
			other.map((val, index) => {
				let value = this.$u.trim(val.value);
				if (value.length) {
					otherArray.push(value);
				}
			});
			let name = form.candidatedNames;
			let name2 = otherArray.join(',');
			form.candidatedNames = name + name2;
			this.$emit('next', form);
		},
		next() {
			let form = Object.assign({}, this.form);
			if(this.type==="editor"){
				this.sumbit()
			}else{
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// 自定义行业类型
						if (!form.mainIndustry) {
							return this.$u.toast('请选择行业类型');
						}
						this.sumbit();
					}
				});
			}
			
		},
		prev(e) {
			this.$emit('prev');
		}
	}
};
</script>

<style lang="scss"></style>
