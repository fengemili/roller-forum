<template>
    <view>
        <uni-segmented-control :current="current" :values="Navigate" @clickItem="onClickItem" styleType="button" activeColor="#4cd964"></uni-segmented-control>
        <view class="content">
            <view v-show="current === 0">
                <Videobox tag="新手"/>
            </view>
            <view v-show="current === 1">
                <Videobox tag="刹车"/>
            </view>
            <view v-show="current === 2">
                <Videobox tag="平花"/>
            </view>
            <view v-show="current === 3">
                <Videobox tag="速滑"/>
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

        methods:{
            //控制导航栏
            onClickItem(e){
                console.log(e);
                this.current = e.currentIndex
            },

        }
    }
</script>


<style>

</style>