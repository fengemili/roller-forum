<template>
    <view>
        <view class='title'>
        <text class='title1'>登陆</text>
        </view>
        <view class='form'>
            <uni-easyinput v-model="user.email" placeholder="邮箱" focus></uni-easyinput>
            <uni-easyinput type="password" v-model="user.password" placeholder="请输入密码"></uni-easyinput>
        <button @click="login">登陆</button>
        </view>
        <a class="logout" @click="gotologout">没有账号?现在就去注册</a></a>
    </view>
</template>

<script>
export default {
    data(){
        return {
            user: {
                email:'',
                password:'',
            }
        }
    },
    methods: {
        gotologout(){
            uni.navigateTo({
                url: '../../pages/register/register',
                success: (result)=>{
                    
                },
                fail: ()=>{},
                complete: ()=>{}
            });
        },
        async login(){
            const {user} = this
            console.log(user,11111);
                const result = await this.$myRequest({
                    url:'/users/login',
                    method: 'POST',
                    data:{user}
                })
                console.log(result);
                if(result.statusCode >=200 && result.statusCode <=300){
                try {
                    uni.setStorageSync('token', result.data.token);
                    uni.setStorageSync('image',result.data.image);
                    uni.setStorageSync('username', result.data.username);
                    uni.setStorageSync('_id', result.data._id)
                } catch (error) {
                    console.log(error);
                }
            uni.switchTab({
                url: `../../pages/mine/mine`,
                success:(res)=>{
                    //页面栈，在当前页面调用别的页面的方法
                    let page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.curSegment = 1;
                    //在当前页调用了另外页面的方法
                    page.getUserInfo();
                },

            })
                }else{
                    uni.showToast({
                        title:'用户名或密码错误',
                        icon:'error'
                    })
                }
                
            
            
        }
    }
}
</script>

<style lang='scss'>
    .title{
        width: 700rpx;
        height:200rpx;
        margin:0 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: center;
        .title1{
            margin:0 auto;
        }
    }

    .form{
        width: 700rpx;
        margin:0 auto;
        margin-bottom: 75rpx;
        button{
            margin-top:75rpx;
            
        }
    }

    .logout{
        margin-left:30rpx;
        font-size:25rpx;

    }
</style>