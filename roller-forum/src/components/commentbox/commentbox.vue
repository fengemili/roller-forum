<template>
    <view class="input-poa">
        <view class="ipt"> <input type="text" class=“uni-input” cursor-spacing=“10“ v-model="reply"/><button @click="sendReply">发送</button></view>
    </view>
</template>

<script>
export default {
    props:['post_id'],
    data() {
        return {
            reply:'',
        }
    },
    methods:{
        //发送评论
        async sendReply(){
            //确保登陆，然后发送请求查看是否处于禁言状态
            if(uni.getStorageSync('token')!=''){
            let bio
            let userId = uni.getStorageSync('_id')
            const power = await this.$myRequest({
                url:`/user/${userId}`,
                method: 'GET',
            })
            console.log(power);
            if(power.statusCode == 200){
                bio = power.data.user.bio
            }
            
            if(bio == "2"){
                //禁言状态
                this.message = ''
                uni.showToast({
                    title: '你被禁言了',
                    icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
                    duration: 3000    //持续时间为 3秒
                })
            }else{
                //权限正常
                if(this.reply!=""){
                    const {post_id,reply} = this
                    const userId = uni.getStorageSync('_id');
                    const result = await this.$myRequest({
                            url:`/comments/post/send`,
                            method: 'POST',
                            data:{reply,post_id,userId}
                    })
                        console.log(result);
                        this.reply = ''
                        uni.$emit('upDataPostList')
                }else{
                    uni.showToast({
                        title: '输入内容不能为空',
                        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
                        duration: 1000    //持续时间为 2秒
                    })
                }
            }

            }else{
                uni.showToast({
                    title: "未登陆，请登陆",
                    icon:"null",
                    duration:1500
                })
            }

            
        }
    }
}
</script>

<style lang="scss" scoped>
    .input-poa {
        width: 100%;
        height: 100rpx;
        position: fixed;
        bottom:0;
        left: 0;
        background-color: rgb(176, 174, 174);
        box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
        .ipt {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: space-around;
        button{
            height:100rpx;
        }
        input{
            height:100rpx;
            flex:1;
            border-radius: 15px;
            background-color: rgb(249, 244, 244);
            box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
        }
        }
    }
</style>