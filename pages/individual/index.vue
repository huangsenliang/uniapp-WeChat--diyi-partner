<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<u-sticky>
			<view><u-tabs :list="tabs" :is-scroll="true" inactive-color="#B2B2B2" :current="current" @change="change"></u-tabs></view>
		</u-sticky>
		<view class="u-m-t-20 with-padding-btn">
			<view>
				<u-cell-group><u-cell-item v-for="(i, k) in lists" :key="k" :title="i.ibname" @click="toDetail(i)"></u-cell-item></u-cell-group>
			</view>
			<view class="padding-tb"><u-loadmore :status="status" @loadmore="fetchData" bg-color="#efeff4" /></view>
		</view>
		<view class="fixed-box"><u-button @click="toAdd" type="primary">申请注册</u-button></view>
	</view>
</template>

<script>
import { getList } from '@/api/individual.js';
import { getIbState } from '@/utils/enum.js';
export default {
	data() {
		// const stateList = getIbState();
		const stateList = [
			{ value: 'EDITING', name: '编辑中' },
			{ value: 'BUSINESSREGISTERING', name: '工商注册中' },
			{ value: 'BANKACCOUNTING', name: '银行开户中' },
			{ value: 'TAXREGISTERING', name: '税务登记中' },
			{ value: 'OPERATING', name: '运营中' },
			{ value: 'CANCELLED', name: '已注销' }
		];
		return {
			status: 'loadmore',
			paramsData: {
				current: 1,
				size: 10,
				ibstate: stateList[0].value
			},
			tabs: stateList,
			current: 0,
			lists: []
		};
	},
	onLoad(){
		
	},
	onShow() {
		this.resetData();
	},
	methods: {
		change(index) {
			this.current = index;
			this.paramsData.ibstate = this.tabs[index].value;
			this.resetData();
		},
		resetData(pulldown) {
			this.paramsData.current = 1;
			this.lists = [];
			this.$nextTick(() => {
				this.fetchData(pulldown);
			});
		},
		fetchData(pulldown) {
			console.log("刷新")
			this.status = 'loading';
			getList(Object.assign({}, this.paramsData))
				.then(res => {
					this.paramsData.current++;
					const data = res.data;
					let list = data.records || [];
					for (let i = 0, len = list.length; i < len; i++) {
						if (this.$u.test.isEmpty(list[i].ibname)) {
							list[i].ibname = list[i].candidatedNames.split(',')[0];
						}
					}
					this.lists = this.lists.concat(list);
					if (data.current < data.pages) {
						this.status = 'loadmore';
					} else {
						this.status = 'nomore';
					}
					if (pulldown) {
						uni.stopPullDownRefresh();
						this.$toast('刷新成功', true);
					}
				})
				.catch(res => {
					this.$toast(res.msg);
					this.status = 'loadmore';
				});
		},
		toDetail(i) {
			this.$u.route({
				url: '/pages/individual/detail',
				params: {
					id: i.id
				}
			});
		},
		toAdd() {
			this.$u.route({
				url: '/pages/individual/add'
			});
		}
	},
	onReachBottom: function() {
		if (this.status === 'nomore') {
			return;
		}
		this.fetchData();
	}
};
</script>

<style lang="scss">
.fixed-box {
	z-index: 6;
	position: fixed;
	bottom: 40rpx;
	left: 0;
	right: 0;
	padding-left: 40rpx;
	padding-right: 40rpx;
}
.with-padding-btn {
	padding-bottom: 120rpx;
}
</style>
