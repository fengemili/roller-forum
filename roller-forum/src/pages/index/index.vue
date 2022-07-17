<template>
	<view class="body">
		<!-- 导航栏 -->
			<view class="tab">
			<view :class="tab1" @click='xinshou' tabIndex='1' ref="xinshou">新手</view>
			<view class="tab2" tabIndex='1' @click='shache'>刹车</view>
			<view class="tab3" tabIndex='1' @click='pinghua'>平花</view>
			<view class="tab4" tabIndex='1' @click='suhua'>速滑</view>
			</view>
			
			<!-- 内容区 -->
			<view class="content">
			<!-- 新手列表 -->
			<xinshouList v-show='table1' tag='新手' ref="xinshou"/>

			<!-- 刹车列表 -->
			<xinshouList v-show='table2' tag='刹车' ref="shache"/>

			<!-- 平花列表 -->
			<xinshouList v-show='table3' tag='平花' ref="pinghua"/>

			<!-- 速滑列表 -->
			<xinshouList v-show='table4' tag='速滑' ref="suhua"/>
		</view>
		
		<!-- 悬浮按钮 -->
		<hoverButton/>

	</view>
</template>

<script>
//导航组件
import xinshouList from '../../components/xinshou-list/xinshou'

//悬浮按钮组件
import hoverButton from '../../components/hover-button/hoverButton'


	export default {
		components:{ xinshouList, hoverButton },
		data() {
			return {
				tab1:'tab1',
				table1:true,
				table2:false,
				table3:false,
				table4:false,
				articles_xinshou:[],
				articles_shache:[],
				articles_suhua:[],
				articles_pinghua:[],
				limit:5,
				offset:1
			}
		},

		//下拉刷新
		onPullDownRefresh() {
			setTimeout(()=>{
			if(this.table1==true) {
				this.$refs.xinshou.offset = 1
				this.$refs.xinshou.getArticles()
			}
			if(this.table2==true) {
				this.$refs.shache.offset = 1
				this.$refs.shache.getArticles()
			}
			if(this.table3==true) {
				this.$refs.pinghua.offset = 1
				this.$refs.pinghua.getArticles()
			}
			if(this.table4==true) {
				this.$refs.suhua.offset = 1
				this.$refs.suhua.getArticles()
			}
				uni.stopPullDownRefresh()
			},1000)
		},

		

		methods: {
			xinshou(){
				this.tab1 = 'tab1'
				this.table1 = true
				this.table2 = false
				this.table3 = false
				this.table4 = false
				
			},

			shache(){
				this.tab1 = 'tab12'
				this.table1 = false
				this.table2 = true
				this.table3 = false
				this.table4 = false
			},

			pinghua(){
				this.tab1 = 'tab12'
				this.table1 = false
				this.table2 = false
				this.table3 = true
				this.table4 = false
			},

			suhua(){
				this.tab1 = 'tab12'
				this.table1 = false
				this.table2 = false
				this.table3 = false
				this.table4 = true
			},
			

			//上拉加载更多数据
			onReachBottom(){
					//新手列表的下拉刷新
					if(this.table1==true) {
						this.$refs.xinshou.loadStatus='loading'

						setTimeout(()=>{
						if(this.$refs.xinshou.offset<this.$refs.xinshou.page) {
							this.$refs.xinshou.offset +=1
							this.$refs.xinshou.showMoreArticles()
						}
						if(this.$refs.xinshou.offset==this.$refs.xinshou.page){
							this.$refs.xinshou.loadStatus='noMore'
						}
						},500)
					}
					//刹车列表的下拉刷新
					if(this.table2==true) {
						this.$refs.shache.loadStatus='loading'

						setTimeout(()=>{
						if(this.$refs.shache.offset<this.$refs.shache.page) {
							this.$refs.shache.offset +=1
							this.$refs.shache.showMoreArticles()
						}
						if(this.$refs.shache.offset==this.$refs.shache.page){
							this.$refs.shache.loadStatus='noMore'
						}
						},500)
					}
					//平花的下拉刷新
					if(this.table3==true) {
						this.$refs.pinghua.loadStatus='loading'

						setTimeout(()=>{
						if(this.$refs.pinghua.offset<this.$refs.pinghua.page) {
							this.$refs.pinghua.offset +=1
							this.$refs.pinghua.showMoreArticles()
						}
						if(this.$refs.pinghua.offset==this.$refs.pinghua.page){
							this.$refs.pinghua.loadStatus='noMore'
						}
						},500)
					}
					//速滑的下拉刷新
					if(this.table4==true) {
						this.$refs.suhua.loadStatus='loading'

						setTimeout(()=>{
						if(this.$refs.suhua.offset<this.$refs.suhua.page) {
							this.$refs.suhua.offset +=1
							this.$refs.suhua.showMoreArticles()
						}
						if(this.$refs.suhua.offset==this.$refs.suhua.page){
							this.$refs.suhua.loadStatus='noMore'
						}
						},500)
					}
						
				
			},

			//刷新
			onRefresh(){
				this.$refs.xinshou.getArticles()
				this.$refs.shache.getArticles()
				this.$refs.pinghua.getArticles()
				this.$refs.suhua.getArticles()
			}
		}
	}
</script>

<style lang='scss' scoped>

	.tab{
		width: 750rpx;
		height: 75rpx;
		display: flex;
		flex-direction:row;
		text-align:center;
		align-items:center;
		background-color:rgb(252, 249, 249);
		justify-content: space-around;
		font-size:30rpx;
		.tab1{
			font-size:40rpx;
		}
		.tab12{
			font-size:30rpx;
		}
		.tab1:focus{
			font-size:40rpx;
		}
		.tab2:focus{
			font-size:40rpx;
		}
		.tab3:focus{
			font-size:40rpx;
		}
		.tab4:focus{
			font-size:40rpx;
		}
	}
	
</style>
