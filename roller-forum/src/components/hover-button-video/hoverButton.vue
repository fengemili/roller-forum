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
						text: '搜索视频',
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
        trigger(e){
				console.log(e);
                if(e.index === 0){
                    uni.navigateTo({
                        url: '../../pages/videosearch/index'
                    })
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