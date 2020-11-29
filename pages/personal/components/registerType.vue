<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="注册类型" :value="typeText" @click="show = true"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-40">
			<u-button @click="next" class="u-m-40" type="primary">下一步</u-button>
		</view>
		<u-select :default-value="selectIndex" :list="lists" v-model="show" @confirm="confirm"></u-select>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			form: {
				registerType: ''
			},
			typeText: '请选择注册类型',
			selectIndex: [],
			lists: [
				{
					value: '1',
					label: '个体工商户',
					extra: [0]
				},
				{
					value: '2',
					label: '个体工商户2',
					extra: [1]
				}
			]
		};
	},
	mounted() {},
	methods: {
		confirm(e) {
			e.map((val, index) => {
				this.form.registerType = val.value;
				this.typeText = val.label;
				this.selectIndex = val.extra;
			});
		},
		next() {
			const form = this.form;
			if (!form.registerType) {
				return this.$u.toast('请选择注册类型');
			}
			this.$emit('next', form);
		}
	}
};
</script>

<style lang="scss"></style>
