<template>
  <view>
    
    <uni-row class="demo-uni-row">
        <uni-col :span="24">
            <view class="demo-uni-col dark">
                <!-- v-on:click  监听点击事件 -->
                <video class="video-cover" :src="video.videoUrl" ref="video"  profile='auto'></video>
                <text class="title">{{video.title}}</text>
                <view class="author-info">
                    <image class="avatar" :src="video.rooter.image"></image>
                    <text class="upName">{{video.rooter.username}}</text>
                    <uni-icons class="rooter" type="person-filled" size="30"></uni-icons>
                </view>
                
            </view>
        </uni-col>
    

        <uni-col :span="24">
            <view class="demo-uni-col dark">
                <view class="message-box" v-for="(replyer,index) in messageList" :key="index">
                    <view class="author-info">
                        <image class="avatar" :src="replyer.author.image"></image>
                        <view class='nameandtime'>
                            <text class="upName">{{replyer.author.username}}</text>
                            <uni-dateformat class="date" :date="replyer.createdAt" :threshold = "[0,3600000]" format="MM月dd日 hh:mm"></uni-dateformat>
                        </view>
                        <uni-icons class="rooter" type="person-filled" size="30" v-if="replyer.author.account"></uni-icons>
                    </view>
                    <view class="reply-body">
                        <text>{{replyer.message}}</text>
                        <uni-icons type="trash-filled" size="20" v-if="replyer.author._id == mine" @click="deleteTheMessage(replyer._id)"></uni-icons>
                    </view>
                    <view class='line'></view>
                    
                </view>
                <view class="noreply">
                    <text>暂无更多回复</text>
                </view>
            </view>
        </uni-col>
        
    </uni-row>
    <MessageInput :videoId="video._id"></MessageInput>
  </view>
</template>

<script>
import MessageInput from "../../components/messageInput/index"

export default {
    name:'videoDetail',
    data() {
        return {
            video: {
                rooter:{}
            },
            player:null,
            messageList:[],
            mine:uni.getStorageSync('_id')
        };
    },

    components:{MessageInput},

        mounted() {
        uni.$on('upDataVideoList',()=>{
            this.getMessageList()
        })
    },

    onLoad(op) {
        console.log(op);
        //JSON.parse  把json数据变成对象
        //decodeURIComponent 把json数据解码为原来的数据
        //才能拿到传递的数据
        const item =  JSON.parse(decodeURIComponent(op.item))
        this.video = item
        console.log(item._id);
        this.getMessageList()
    },

    methods: {
        //获取回复列表
        async getMessageList(){
            const result = await this.$myRequest({
                url:`/message/getMessageList/${this.video._id}`,
                method:'GET'
            })
            console.log(result);
            console.log(result.data);
            if(result.statusCode == 200){
                let arr = result.data
                arr.forEach(item=>{
                    if(item.rooter){
                        this.renameKEY(item,'rooter','author')
                    }
                    
                })
                this.messageList = result.data
            }
        },

        //重命名函数
		renameKEY(arr,oldname,newname) {
			if(arr[oldname]){
				// console.log(Object.getOwnPropertyDescriptor(arr,oldname));
				Object.defineProperty(arr,newname,Object.getOwnPropertyDescriptor(arr,oldname))
				delete arr[oldname]
			}
		},

        //删除留言
        async deleteTheMessage(id){
            console.log(id);
            const result = await this.$myRequest({
                url:`/message/deleteMessage/${id}`,
                method: 'delete'
            })
            console.log(result);
            if(result.statusCode == 200){
                uni.showToast({
                    title: '留言删除成功',
                    icon: 'success',
                    duration: 1500,
                });
                await this.getMessageList()
            }
            
        }
    }

}
</script>

<style lang='scss' scoped>
.fix{
    position: absolute;
}
.demo-uni-row {
	margin-bottom: 10px;
	display: block;
	/* #endif */
}

.message-box{
    padding: 10rpx;
    .line{
        margin:10rpx 0;
        border-bottom: 1px solid rgb(120, 116, 116);
    }
    .author-info{
		display: flex;
		align-items: center;
		// margin-top:10rpx;
		// margin-left: 10rpx;
		// padding-bottom: 10rpx;
        margin-bottom: 10rpx;
        .rooter{
            margin-left: 20rpx;
        }
		.avatar{
			width: 70rpx;
			height: 70rpx;
			border-radius: 4px;
		}
		.nameandtime{
            display: flex;
            flex-direction: column;
            margin-left: 20rpx;
        .upName{
			margin-top: 10rpx;
		}
        .date{
            font-size: 12px;
        }
        }
	}
    .reply-body{
        display: flex;
        justify-content:space-between;
    }
}



.demo-uni-col {
	border-radius: 4px;
	margin: 10rpx 10rpx;
    .noreply{
        text-align:center;
        font-size: 30rpx;
    }
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