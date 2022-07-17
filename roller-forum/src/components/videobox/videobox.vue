<template>
	<view>
    <uni-row class="demo-uni-row">
	<uni-col :span="24">
		<view class="demo-uni-col dark" v-for="(item,index) in infromation" :key="index">
			<!-- v-on:click  监听点击事件 -->
			<video class="video-cover" :src="item.videoUrl" ref="video"></video>
			<text class="title">{{item.title}}</text>
			<view class="author-info" @click="gotodetail(index)">
				<image class="avatar" :src="item.rooter.image"></image>
				<text class="upName">{{item.rooter.username}}</text>
			</view>
		</view>
	</uni-col>
</uni-row>
	<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
export default {
	name:"videobox",
	props:['tag'],
	data() {
		return {
			loadStatus: 'more',
			currentTime:0,
			infromation:[],
			offset:1,
			limit:5,
			page:0,
		};
	},
	mounted() {
		this.getVideoList()
	},
	methods:{

        //获取相关tag视频
        async getVideoList(){
            const result = await this.$myRequest({
                url: `/video/getVideoList?tag=${this.tag}&limit=${this.limit}&offset=${this.offset}`,
                method: "GET",
            })
            console.log(result);
			if(result.statusCode == 200) {
				this.page = Math.ceil(result.data.videoCount / this.limit)
				this.infromation = result.data.videos
			}
            
        },

		async showMoreVideos(){
			const result = await this.$myRequest({
                url: `/video/getVideoList?tag=${this.tag}&limit=${this.limit}&offset=${this.offset}`,
                method: "GET",
            })
			if(result.statusCode == 200){
				let arr = result.data.videos
					arr.forEach((item)=>{
                        this.infromation.push(item)
					})
				console.log(this.infromation);
			}
		},

		//去详情页
		gotodetail(index){
			let item = this.infromation[index]
			item.currentTime = this.$refs.video[index].currentTime
			uni.setStorageSync('currentTime', this.$refs.video[index].currentTime)
			uni.navigateTo({
				//JSON.stringify 把对象变成json数据方便编码
				//encodeURIComponent  把数据进行编码后再进行传输
				//页面传递只能传递基础参数
				url: '../../pages/vidodetail/vidodetail?item=' +   (JSON.stringify(item)),
				success: (result)=>{
					
				},
				fail: ()=>{},
				complete: ()=>{}
			});
		}
	}
}
</script>

<style lang='scss' scoped>
.demo-uni-row {
	margin-bottom: 10px;
	display: block;
	/* #endif */
}



.demo-uni-col {
	border-radius: 4px;
	margin: 10rpx 10rpx;
	margin-bottom: 20rpx;
	.author-info{
		display: flex;
		align-items: center;
		margin-top:10rpx;
		margin-left: 10rpx;
		padding-bottom: 10rpx;
		.avatar{
			width: 70rpx;
			height: 70rpx;
			border-radius: 4px;
		}
		.upName{
			margin-left: 10rpx;
		}
	}
	.video-cover{
		width: 100%;
		height: 380rpx;
		
	}
	.title{
		margin-top:10rpx;
		margin-left: 10rpx;
	}
}

.dark {
	background-color: #d3dce6;
}
</style>