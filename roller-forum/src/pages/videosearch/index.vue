<template>
    <view>
        <uni-easyinput suffixIcon="search"  v-model="keyword" placeholder="请输入内容-搜索视频" @iconClick="searchTheResult"></uni-easyinput>
        
        <Videobox v-show="isSuccess" :infromation="videos"/>
    </view>
</template>

<script>
import Videobox from '../../components/videobox/videobox'
import moment from 'moment'

export default {
    name:"searchVideo",
    components:{Videobox},
    data() {
        return {
            keyword: '',
            videos:[],
            isSuccess: false
        };
    },

    methods:{
        //拿到搜索的数据
        async searchTheResult(){
            this.video=''
            const keyword = this.keyword
            console.log(this.keyword);
            const result = await this.$myRequest({
                url: `/video/searchvideo/?keyword=${keyword}`,
                method: 'GET',
            })
            console.log(result,458);
            if(result.statusCode == 200){
            let arr = result.data.videos
                arr.forEach((item)=>{
                    item.createdAt = this.formatTime(item.createdAt);
                })
                console.log(arr);
                this.videos = arr
                console.log(this.isSuccess);
                this.isSuccess = true
            }
        },

        	//重命名函数
			renameKEY(arr,oldname,newname) {
				if(arr[oldname]){
					// console.log(Object.getOwnPropertyDescriptor(arr,oldname));
					Object.defineProperty(arr,newname,Object.getOwnPropertyDescriptor(arr,oldname))
					delete arr[oldname]
				}
			},
			
			//时间格式化
			formatTime(item){
				moment.locale('zh-cn');
				return moment.utc(item).format('MMMM, h:mm:ss a');
			}
    }
}
</script>
