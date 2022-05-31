<template>
    <view>
        <!-- 悬浮按钮 -->
		<uni-fab
			:pattern="pattern"
			:content="content"
			horizontal="right"
			vertical="bottom"
			direction="horizontal"
			:popMenu="true"
			@trigger="trigger"
		></uni-fab>
    </view>
</template>

<script>
export default {
    data() {
        return {
            pattern:{
					color:'#3c3e49',
					selectedColor:'#007aff9',
					background:'#fff',
					buttonColor:'#3c3e49',
				},
				content:[
					{
						iconPath: '../../static/icon/sousuo.png',
                        selectedIconPath:'../../static/icon/sousuo.png',
						text: '搜索',
                        active:false,
					},
					{
						iconPath: '../../static/icon/bianji.png',
                        selectedIconPath:'../../static/icon/bianji.png',
						text: '发帖',
                        active:false,
					},
                    {
                        iconPath: '../../static/icon/backtop.png',
                        selectedIconPath:'../../static/icon/backtop.png',
                        text: '回到顶部',
                        active:false,
                    }
				],
        };
    },
    methods:{
        async trigger(e){
				console.log(e);
                if(e.index === 0){
                    uni.navigateTo({
                        url: '../../pages/search/search'
                    })
                }else if(e.index === 1){
                    console.log(uni.getStorageSync('token'));
                    if(uni.getStorageSync('token')!=''){
                        //登陆状态
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
                            //处于禁言状态
                            this.message = ''
                            uni.showToast({
                                title: '你被禁言了',
                                icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
                                duration: 3000    //持续时间为 3秒
                            })
                        }else{
                            uni.navigateTo({
                                url: '../../pages/publish/publish'
                            })
                        }
                    }else{
                        //未登陆
                        uni.showToast({
                            title: "未登陆，请登陆",
                            icon:"null",
                            duration:1500
                        })
                    }
                }else{
                    uni.pageScrollTo({
                        scrollTop: 0,//滚动到顶部
                        duration: 300//滚动时间
                    });
                }
			}
    }
}
</script>

<style>

</style>