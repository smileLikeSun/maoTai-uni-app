<template>
	<view class="content">
		<div class="search">
			<div>
				<input type="number" name="num" placeholder=" 请输入查询编号" v-model="num"/>
			</div>
			<div>
				<button type="primary" @click="search">查询</button>
			</div>
			
		</div>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				num: '',
				
			}
		},
		onLoad() {
			
		},
		methods: {
			search(e){
				var that = this;
				console.log('index: ', this.num)
				uni.navigateTo({
					url: '../maoTai/maoTaiDetail?num=' + that.num,
					success() {
						console.log('跳转成功！')
					},
					fail() {
						console.log('跳转失败！')
					}
				})
			}
		}
	}
</script>

<style>
	.content{
		margin-top: 10%;
		width: 90%;
	}
	.content .search{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.content .search input{
		border: 0.01vw #8799A3 solid;
		height: 90rpx;
		border-radius: 5rpx;
		/* margin-left: 10%; */
	}


</style>
