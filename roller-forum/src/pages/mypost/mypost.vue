<template>
			<view>
                    <!-- 帖子 -->
                    <view v-for="(item,index) in myPostList" :key="index" class="content" @click="gotoDetail(index)">
                        <view class="content-left">
                            <text>{{item.title}}</text>
                            <view class="content-botton">
                                <!-- 日期格式化 -->
                                <uni-dateformat :date="item.createdAt" :threshold="[0,0]"></uni-dateformat>
                                <uni-icons type="trash-filled" size="24" @click.native.stop="deletePost(index)"></uni-icons>
                            </view>
                        </view>
                        <image class='img' :src="item.imageList[0]">
                    </view>
                    
			</view>
</template>


<script>
export default {
    name:"mypost",
    data() {
        return {
            myPostList: [],
        };
    },
    onload() {
        this.getMyposts()
    },
    mounted(){
        this.getMyposts()
    },

    methods: {
        //跳转到帖子详细页面
        gotoDetail(index){
            let id = this.myPostList[index]._id;
            uni.navigateTo({
                //id为帖子的唯一ID
                url: `../../pages/detail/detail?id=${id}`,
            });
        },

        //获取我帖子列表
        async getMyposts(){
            const athourId = uni.getStorageSync('_id');
            const result = await this.$myRequest({
                url:`/articles/mypostList/${athourId}`,
                method: 'GET'
            })
            console.log(result);
            if(result.statusCode == 200) {
                this.myPostList = result.data.article
            }
        },

        async deletePost(index){
            console.log(this.myPostList[index]._id);
            const id = this.myPostList[index]._id
            const result = await this.$myRequest({
                url:`/articles/deletearticle/${id}`,
                method: "DELETE",
            })
            console.log(result);
            if(result.statusCode == 204){
                this.getMyposts()
                uni.showToast({
                    title: '帖子删除成功',
                    icon: 'none',
                    duration: 1500,
                });
            }
            
        }
    },
}
</script>


<style lang="scss">
    .content{
        padding: 0 10rpx;
        margin-top: 20rpx;
        display: flex;
        
        .img{
            width: 350rpx;
            height: 180rpx;
        }
        .content-left{
            padding-right:10rpx;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content:space-between;
            .content-botton{
                display: flex;
                justify-content:space-between;
                font-size: 24rpx;
                color: rgb(136, 132, 132)
            }
        }
    }
    
</style>

