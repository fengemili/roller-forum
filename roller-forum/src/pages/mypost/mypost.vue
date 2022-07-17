<template>
			<view class="root">
                    <!-- 帖子 -->
                    <view v-for="(item,index) in myPostList" :key="index" class="content" @click="gotoDetail(index)" v-if="state == 2">
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

                    <view class='nodata' v-if="state == 1">
                    <view class="image">
                    </view>
                    <text>暂未有数据</text>
                    </view>
                    
			</view>
</template>


<script>
export default {
    name:"mypost",
    data() {
        return {
            myPostList: [],
            //0 代表尚未发送请求， 1代表myPostList的长度为0，2代表myPostList的长度大于0
            state:0,
            height:'',
        };
    },
    onload() {
        this.getMyposts()
    },
    mounted(){
        uni.startPullDownRefresh()
        this.getMyposts()
    },

    watch:{
        myPostList(){
            // this.havedata = true;
        }
    },

    onPullDownRefresh() {
        this.getMyposts()
    },

    methods: {

        refresh(){
            console.log('刷新了');
        },
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
                if(this.myPostList.length > 0) {
                    this.state = 2
                }else {
                    this.state = 1
                }
                uni.stopPullDownRefresh()
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
    .root{
        margin: 0;
        padding: 0;
        width: 750rpx;
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

