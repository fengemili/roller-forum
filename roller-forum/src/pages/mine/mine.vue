<template>
    <view>
        <!-- 未登陆 -->
        <view v-show="notlogin" class="login" @click="gotoLogin">
            <img class="noneavrt" src="../../static/logo.png" alt="">
            <h3 class="userName">未登录?,请登陆</h3>
        </view>


        <!-- 已登录 -->
        <view v-show="!notlogin" class="login" @click="showDrawer">
            <img class="noneavrt" src="../../static/logo.png" alt="" v-if="user.image==null || user.image==''">
            <img class="isavrt" :src="user.image" alt="" v-if="user.image!=null && user.image!=''">
            <text class="userName">{{user.username}}</text>
        </view>

        <uni-drawer ref="showRight" mode="right" :mask-click="false">
			<scroll-view style="height: 100%;" scroll-y="true">
                <view class="scroll">
                <!-- 头像区域 -->
                <view class="avart-box">
                    <img class="noneavrt" src="../../static/logo.png" alt="" @click="changeAvart" v-if="user.image==null || user.image==''">
                    <img class="scroll-isavrt" :src="user.image" alt="" @click="changeAvart" v-if="user.image!=null && user.image!=''">
                </view>
                <!-- 用户名 -->
                <text class="userName" v-show="!ischange" @click="ischange=true">用户名:{{user.username}}</text>
                <view v-show="ischange" class='changUserName'>
                    <uni-easyinput v-model="user.username" placeholder="请输入内容"></uni-easyinput>
                    <button @click="changeUserName" type="primary" size='mini' class="save">保存</button>
                </view>
				<button @click="closeDrawer" type="primary" class='closeDrawer'>关闭Drawer</button>
                </view>
			</scroll-view>
		</uni-drawer>

        <uni-list>
            <uni-list-item  title="我的帖子" clickable :show-badge="true" @click="gotomypost"></uni-list-item>
            <uni-list-item  title="关于我们" clickable  @click="onClick"></uni-list-item>
        </uni-list>
        <button class="btn-logout" @click="logout">退出登陆</button>
    </view>
</template>

<script>
export default {
    name: "mine",
    //页面出现时回调用的一个钩子函数
    onShow(){
        this.getUserInfo()
    },
    data() {
        return {
            notlogin:true,
            image:'',
            ischange:false,
            user:{
                username:'',
                image:'',
                token:'',
                _id:'',
            },
            newName:''
        };
    },
    watch:{
        image(){
            return this.$nextTick(()=>{
                return this.user.image;
            });
        }
    },

    //我的页面不允许刷新
    onPullDownRefresh() {
        uni.stopPullDownRefresh()
    },

    methods:{
        //去登陆页
        gotoLogin(){
            uni.navigateTo({
                url: "../../pages/login/login",
            });
        },

        //关于页面
        onClick(){
            uni.showToast({
                title:'还没想好怎么介绍，就不先不介绍了',
                icon: 'none',
                duration:1000
            })
        },

        //去我的帖子页
        gotomypost(){
            uni.navigateTo({
                url: "../../pages/mypost/mypost",
            });
        }, 
        //从本地缓存获取用户信息
        getUserInfo(){
            try {
                this.notlogin = false
                if(this.notlogin == false){
                    this.user.image =  uni.getStorageSync('image')
                    this.user.username = uni.getStorageSync('username')
                    this.user.token = uni.getStorageSync('token')
                    this.user._id = uni.getStorageSync('_id')
                }
                 if(this.user._id ==''){
                    this.notlogin = true
                }
                
            } catch (error) {
            }
        },

        userLogIn(){
            try {
                this.user.image =  uni.getStorageSync('image')
                this.user.username = uni.getStorageSync('username')
                this.user.token = uni.getStorageSync('token')
                this.user._id = uni.getStorageSync('_id')
                this.notlogin = false;
            } catch (error) {
            }
        },

        //注销
        logout(){
            try {
                this.notlogin = true;
                uni.clearStorage();
            } catch (error) {
                
            }
            
        },

        
        showDrawer(){
            this.$refs.showRight.open();
        },

        closeDrawer() {
				this.$refs.showRight.close();
		},

        //该变头像
        changeAvart(){
            let _id= this.user._id;
            let tempFilePaths;
            uni.chooseImage({
                count: 1, //默认9
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album'], //从相册选择
                success: (chooseImageRes) => {
                    tempFilePaths = chooseImageRes.tempFilePaths;
                    uni.uploadFile({
                            url: 'https://192.168.31.18/api/uploadavart', 
                            filePath: tempFilePaths[0],
                            name: 'file',
                            formData: {
                                "_id": _id
                            },
                            success:  (uploadFileRes) => {
                                this.image = uploadFileRes.data;
                                this.user.image = uploadFileRes.data;
                                uni.setStorageSync('image',uploadFileRes.data)
                                this.getUserInfo()
                            }
                        });
                        
                    
                    
                }
            });
        },

        //改变用户名
        async changeUserName(){
            this.ischange = false;
            const newName  = this.user.username;
            uni.setStorageSync('username',newName);
            const {user} = this
            const result = await this.$myRequest({
                url:'/user/userInfo',
                method: 'PUT',
                data:{newName,user}
            })
                this.getUserInfo()
        }
    },

}
</script>

<style lang='scss'>
        .login{
            width:700rpx;
            height:300rpx;
            margin: 0 auto;
            margin-bottom:50rpx;
            display: flex;
            flex-direction:row;
            align-items:center;
            justify-content: flex-start;
            border:4rpx solid bisque;
            border-radius:5%;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            .noneavrt{
                height: 100rpx;
                width: 100rpx;
                margin-left:50rpx;
                border-radius: 35%;
            }
            .isavrt{
                height: 100rpx;
                width: 100rpx;
                margin-left:50rpx;
                border-radius: 35%;
                
            }
            .userName{
                margin-left: 100rpx;
            }
        }
        .btn-logout{
            margin-top: 75rpx;
        }

        .scroll{
            display:flex;
            justify-content:center;
            align-items: center;
            flex-direction:column;
            .closeDrawer{
                margin-bottom: 50rpx;
            };
            .avart-box{
                margin: 0 auto;
                border-radius: 10px;
                width: 100%;
                height: 300rpx;
                border-bottom: 1px solid black;
                display: flex;
                justify-content:center;
                align-items: center;
                img{
                    margin: 0 auto;
                }
                .noneavrt{
                    height: 100rpx;
                    width: 100rpx;
                    margin-left:50rpx;
                    border-radius: 35%;
                    margin: 0 auto;
                }
                .scroll-isavrt{
                    height: 100rpx;
                    width: 100rpx;
                    border-radius: 35%;
                }
            };
            .changUserName{
                display: flex;
                justify-content:center;
                align-items: center;
                flex-direction:column;
                .save{
                    margin-top: 75rpx;
                }
            }
        }
</style>