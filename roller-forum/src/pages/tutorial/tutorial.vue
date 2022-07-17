<template>
    <view>
        <uni-segmented-control :current="current" :values="Navigate" @clickItem="onClickItem" styleType="button" activeColor="#4cd964"></uni-segmented-control>
        <view class="content">
            <view v-show="current === 0">
                <Videobox tag="新手" ref='xinshou'/>
            </view>
            <view v-show="current === 1">
                <Videobox tag="刹车" ref='shache'/>
            </view>
            <view v-show="current === 2">
                <Videobox tag="平花" ref='pinghua'/>
            </view>
            <view v-show="current === 3">
                <Videobox tag="速滑" ref='suhua'/>
            </view>
        </view>
        <HoverButton/>
    </view>
</template>

<script>
import Videobox from '../../components/videobox/videobox'
import HoverButton from '../../components/hover-button-video/hoverButton'

    export default {
        data() {
            return {
                current:0,
                Navigate:['新手','刹车','平花','速滑',],
            }
        },
        //组件注册
        components:{ Videobox, HoverButton },

        //页面加载时触发 onLoad()当存在组件时，并不会执行
        mounted(){

        },

		onPullDownRefresh() {
			setTimeout(()=>{
			if(this.current==0) {
				this.$refs.xinshou.offset = 1
				this.$refs.xinshou.getVideoList()
			}
			if(this.current==1) {
				this.$refs.shache.offset = 1
				this.$refs.shache.getVideoList()
			}
			if(this.current==2) {
				this.$refs.pinghua.offset = 1
				this.$refs.pinghua.getVideoList()
			}
			if(this.current==3) {
				this.$refs.suhua.offset = 1
				this.$refs.suhua.getVideoList()
			}
				uni.stopPullDownRefresh()
			},1000)
		},

        methods:{
            //控制导航栏
            onClickItem(e){
                console.log(e);
                this.current = e.currentIndex
            },
        onReachBottom(){
            //新手列表的下拉刷新
					if(this.current==0) {
						this.$refs.xinshou.loadStatus='loading'

						setTimeout(()=>{
						if(this.$refs.xinshou.offset<this.$refs.xinshou.page) {
							this.$refs.xinshou.offset +=1
							this.$refs.xinshou.showMoreVideos()
						}
						if(this.$refs.xinshou.offset==this.$refs.xinshou.page){
							this.$refs.xinshou.loadStatus='noMore'
						}
						},500)
					}
					//刹车列表的下拉刷新
					if(this.current==1) {
						this.$refs.shache.loadStatus='loading'

						setTimeout(()=>{
						if(this.$refs.shache.offset<this.$refs.shache.page) {
							this.$refs.shache.offset +=1
							this.$refs.shache.showMoreVideos()
						}
						if(this.$refs.shache.offset==this.$refs.shache.page){
							this.$refs.shache.loadStatus='noMore'
						}
						},500)
					}
					//平花的下拉刷新
					if(this.current==2) {
						this.$refs.pinghua.loadStatus='loading'

						setTimeout(()=>{
						if(this.$refs.pinghua.offset<this.$refs.pinghua.page) {
							this.$refs.pinghua.offset +=1
							this.$refs.pinghua.showMoreVideos()
						}
						if(this.$refs.pinghua.offset==this.$refs.pinghua.page){
							this.$refs.pinghua.loadStatus='noMore'
						}
						},500)
					}
					//速滑的下拉刷新
					if(this.current==3) {
						this.$refs.suhua.loadStatus='loading'

						setTimeout(()=>{
						if(this.$refs.suhua.offset<this.$refs.suhua.page) {
							this.$refs.suhua.offset +=1
							this.$refs.suhua.showMoreVideos()
						}
						if(this.$refs.suhua.offset==this.$refs.suhua.page){
							this.$refs.suhua.loadStatus='noMore'
						}
						},500)
					}
					
        }
        }
    }
</script>


<style>

</style>