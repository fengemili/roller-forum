<template>
    <view>
        <uni-easyinput suffixIcon="search"  v-model="keyword" placeholder="请输入内容-搜索视频" @iconClick="searchTheResult"></uni-easyinput>
        
    <view v-if="state == 2">
    <uni-row class="demo-uni-row">
        <uni-col :span="24">
            <view class="demo-uni-col dark" v-for="(item,index) in videos" :key="index">
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

        <view class='nodata' v-if="state == 1">
            <view class="image">
            </view>
            <text>暂未有数据</text>
        </view>
            
    </view>
</template>

<script>
import Videobox from '../../components/videobox/videobox'
import moment from 'moment'

export default {
    name:"searchVideo",
    components:{Videobox},
    data() {
        return {
            loadStatus:'more',
            keyword: '',
            videos:[],
            isSuccess: false,
            limit:5,
            offset:1,
            page:0,
            //0 代表尚未发送请求， 1代表myPostList的长度为0，2代表myPostList的长度大于0
            state:0,
        };
    },

    onPullDownRefresh(){
        this.searchTheResult()
        uni.stopPullDownRefresh()
    },

    methods:{
        //拿到搜索的数据
        async searchTheResult(){
            if(this.keyword == ''){
                uni.showToast({
                    title: '请输入关键字',
                    icon:"error"
                })
                return
            }
            this.video=''
            this.offset = 1
            const keyword = this.keyword
            const result = await this.$myRequest({
                url: `/video/searchvideo/?keyword=${keyword}&limit=${this.limit}&offset=${this.offset}`,
                method: 'GET',
            })
            console.log(result);
            if(result.statusCode == 200){
                this.page = Math.ceil(result.data.videosCount / this.limit)
                let arr = result.data.videos
                arr.forEach((item)=>{
                    item.createdAt = this.formatTime(item.createdAt);
                })
                this.videos = arr
                this.isSuccess = true
            }

            if(this.videos.length > 0){
                    this.state = 2
            }else{
                    this.state = 1
            }
        },

		//去详情页
		gotodetail(index){
			let item = this.videos[index]
			uni.navigateTo({
				//JSON.stringify 把对象变成json数据方便编码
				//encodeURIComponent  把数据进行编码后再进行传输
				//页面传递只能传递基础参数
				url: '../../pages/vidodetail/vidodetail?item=' + encodeURIComponent(JSON.stringify(item)),
				success: (result)=>{
					
				},
				fail: ()=>{},
				complete: ()=>{}
			});
		},

        	//上拉加载更多数据
			onReachBottom(){
                this.loadStatus = 'loading'
                console.log('eee');
                setTimeout(()=>{
                    if(this.offset < this.page){
                        this.offset += 1
                        this.showMoreVideos()
                    }
                    if(this.offset == this.page){
                        this.loadStatus = 'noMore'
                    }
                },500)
            },

            async showMoreVideos(){
                const keyword = this.keyword
                    const result = await this.$myRequest({
                        url: `/video/searchvideo/?keyword=${keyword}&limit=${this.limit}&offset=${this.offset}`,
                        method: 'GET',
                    })
                    console.log(result,8888);
                if(result.statusCode == 200){
                let arr = result.data.videos
                    arr.forEach((item)=>{
                        item.createdAt = this.formatTime(item.createdAt);
                        this.videos.push(item);
                    })

                }
                this.loadStatus = 'more'
            },

        	//重命名函数
			renameKEY(arr,oldname,newname) {
				if(arr[oldname]){
					// console.log(Object.getOwnPropertyDescriptor(arr,oldname));
					Object.defineProperty(arr,newname,Object.getOwnPropertyDescriptor(arr,oldname))
					delete arr[oldname]
				}
			},
			
			//时间格式化
			formatTime(item){
				moment.locale('zh-cn');
				return moment.utc(item).format('MMMM, h:mm:ss a');
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


    .image{
        padding: 0;
        width:750rpx;
        height:480rpx;
        background-image: url('../../static/nodata.png');
        background-size: cover;
    }

    .nodata{
        text-align: center;
    }
</style>