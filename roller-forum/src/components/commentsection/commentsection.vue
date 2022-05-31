<template>
    <view class="content-box">
        <view class="content" v-for="(content,index) in contents" :key="index">
            <view class="content-top"> 
                <view class="content-personl"> 
                    <image :src="content.author.image" alt="">
                    <view class="content-name">
                        <text>{{content.author.username}}</text>
                        <!-- <text>{{content.createdAt}}</text> -->
                        <uni-dateformat :date="content.createdAt" :threshold = "[0,3600000]" format="MM月dd日 hh:mm"></uni-dateformat>
                    </view>
                        <uni-icons class="rooter" type="person-filled" size="30" v-if="content.author.account"></uni-icons>
                    
                </view>
                <!-- 点赞功能 废案：点赞之后的展示逻辑尚未弄清-->
                <!-- <uni-icons v-show='like==0' type="heart" size="30" color="red" @click="clicklike(index)" ref="icon"></uni-icons>
                <uni-icons v-show='like==1' type="heart-filled" size="30" color="red" @click="clicklike(index)" ref="icon"></uni-icons> -->
            </view>
            <view class="reply-body">
                <text>{{content.reply}}</text>
                <uni-icons type="trash-filled" size="20" v-if="content.author._id == mine" @click="deleteTheComment(content._id)"></uni-icons>
            </view>
            <hr>
            
        </view>
        <view class="notreply">
            <text>暂无更多回复</text>
        </view>
    </view>
</template>

<script>
export default {
    props:['post_id'],

    mounted() {
        uni.$on('upDataPostList',()=>{
            this.getReplyList()
        })
    },
    
    //data变化时，页面会重新渲染
    data() {
        return {
            like:0,
            contents:[],
            mine:uni.getStorageSync('_id')
        };
    },

    //监视 post_id,当他发生变化，则发送请求获取帖子的主要数据
    watch:{
        post_id(newValue,oldValue){
            this.post_id = newValue
            this.getReplyList()
        },
        immediate:true
    },

    methods: {

        //获取该帖子的回复列表
        async getReplyList(){
            const {post_id} = this
            console.log(post_id);
            const result = await this.$myRequest({
                url:`/comments/post/${post_id}`,
                method: 'GET',
                data:{post_id}
            })
            console.log(result);
            if(result.statusCode == 200){
                // this.contents = result.data.comments
                let arr = result.data.comments
                    arr.forEach(item => {
                        if(item.rooter){
                        this.renameKEY(item,"rooter","author")
                        }
                    })
                this.contents = arr
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
        async deleteTheComment(id){
            console.log(id,256);
            const result = await this.$myRequest({
                url:`/comments/deleteComment/${id}`,
                method: "DELETE"
            })
            console.log(result);
            if(result.statusCode == 200){
                uni.showToast({
                    title: '评论删除成功',
                    icon: 'success',
                    duration: 1500,
                });
                await this.getReplyList()
            }
            
        }
    }
}
</script>

<style lang='scss' scoped>
.content-box{
    padding-bottom: 100rpx;
    padding-top:30rpx;
    width:700rpx;
    margin:0 auto;
    background-color:rgb(194, 193, 193);
    box-shadow: 1px 1px 2px 2px rgba(222, 82, 82, 0.1);
    border-radius:15rpx;
    .notreply{
        text-align:center;
            
    }

    .content{
        *{
            padding:0;
        }
        padding:0 30rpx;
        hr{
            margin-bottom: 30rpx;
        }
        .reply-body{
            display:flex;
            justify-content:space-between;
        }
        .content-top{
            display:flex;
            justify-content: space-between;
            text-align: center;
            align-items: center;
            .content-personl{
                display:flex;
                .rooter{
                    margin-left: 80rpx;
                }
                image{
                    width:80rpx;
                    height:80rpx;
                    border-radius:15rpx
                }
                .content-name{
                    display:flex;
                    flex-direction: column;
                    font-size: 35rpx;
                    margin-left:20rpx;
                }
            }
        }
    }
}
</style>