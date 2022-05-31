<template>
    <view>
        <uni-easyinput suffixIcon="search"  v-model="keyword" placeholder="请输入内容-搜索帖子" @iconClick="searchTheResult"></uni-easyinput>

        <uni-card
                v-for="(art,index) in articles"
                :key="index"
                :title='art.title'
                mode="style"
                :is-shadow="true"
                :thumbnail="art.author.image"
                :extra="art.createdAt"
                note="Tips"
                @click="gotodetail(index)"
			>
                    <view class="body">
                    <h2>{{art.title}}</h2>
				    <text style="margin-bottom=10rpx;">{{art.body}}</text>
				    <image ref='img' :src="art.imageList[0]" mode="scaleToFill" v-show="art.imageList.length!=0"/>
                    </view>
			</uni-card>
            
    </view>
</template>

<script>
import moment from 'moment'

export default {
    data() {
        return {
            keyword: '',
            articles:[]
        }
    },
    methods:{

               //去详情页，并把该帖子的唯一Id传给详情页，供详情页请求数据
        gotodetail(index){
            let id = this.articles[index]._id
            uni.navigateTo({
                url: `../../pages/detail/detail?id=${id}`,
                success: (result)=>{
                },
                fail: ()=>{},
                complete: ()=>{}
            });
            
        },

        //拿到搜索的数据
        async searchTheResult(){
            this.articles=''
            const keyword = this.keyword
            console.log(this.searchValue);
            const result = await this.$myRequest({
                url: `/rooter/user/searchArticles/?keyword=${keyword}`,
                method: 'GET',
            })
            console.log(result);
            if(result.statusCode == 200){
            let arr = result.data.articles
                arr.forEach((item)=>{
                    item.createdAt = this.formatTime(item.createdAt);
                    if(item.rooter){
                        this.renameKEY(item,"rooter","author")
                    }
                })
                console.log(arr);
                this.articles = arr
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

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
    }
</style>