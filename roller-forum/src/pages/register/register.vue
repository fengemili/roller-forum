<template>
    <view>
        <view class='title'>
        <text class='title1'>注册</text>
        </view>
        <view class='form'>
            <uni-easyinput v-model="user.email" placeholder="邮箱" focus></uni-easyinput>
            <uni-easyinput v-model="user.username" placeholder="用户名"></uni-easyinput>
            <uni-easyinput type="password" v-model="user.password" placeholder="请输入密码"></uni-easyinput>
            <uni-easyinput type="password" v-model="password" placeholder="请再一次输入密码"></uni-easyinput>
        <button @click="gotologout">注册</button>
        </view>
        
    </view>
</template>

<script>
export default {
    data(){
        return {
            password:'',
            user:{
                username:'',
                email:'',
                password:'',
            }
        }
    },
    methods: {
        async gotologout(){


            if(this.user.password == '' || this.password==''){
                uni.showToast({
                        title:'确认密码或密码不能为555空',
                        icon:'error'
                })
            }

            if(this.user.email=='' || this.user.username==''){
                uni.showToast({
                        title:'邮箱或用户名不能为空5',
                        icon:'error'
                })
            }

            if(this.user.password != this.password){
                uni.showToast({
                        title:'确认密码与密码不同',
                        icon:'error'
                })
            }

            if(this.password == this.user.password && this.user.password != '' && this.user.email != '' && this.user.username != ''){
                const {user} = this
                const result = await this.$myRequest({
                    url:'/users',
                    method: 'POST',
                    data:{user}
                })
                console.log(result);
                if(result.statusCode >= 200 && result.statusCode < 300){
                    uni.showToast({
                        title:'用户注册成功'
                    })
                    uni.navigateTo({
                    url: '../../pages/login/login',
                    success: (result)=>{
                        
                    },
                    fail: ()=>{},
                    complete: ()=>{}
                });
                }else{
                    uni.showToast({
                        title:result.data.errors[0].msg,
                        icon:'error'
                    })
                }
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