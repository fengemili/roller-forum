<template>
			<view>
                <!-- 新手列表 -->
				<uni-card
                    v-for="(art,index) in articles"
                    :key="index"
                    :title='art.author.username'
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

                <uni-load-more :status="loadStatus"></uni-load-more>
			</view>
</template>

<script>
import moment from 'moment'

export default {

    props:['tag'],
    data() {
        return {
            loadStatus: 'more',
            limit:5,
            offset:1,
            articles:[]
        };
    },
    mounted(){
        console.log(this.tag,555);
        this.getArticles()
    },

    onPullDownRefresh() {
        console.log(2222);
    },

    methods: {

            //获取数据
			async getArticles(){
                const result = await this.$myRequest({
                    url:`/articles/?tag=${this.tag}&limit=${this.limit}&offset=${this.offset}`,
                    method: 'GET',
                })
                console.log(result);
				if(result.statusCode == 200){
					let arr = result.data.articles
					arr.forEach((item)=>{
						item.createdAt = this.formatTime(item.createdAt)
						if(item.rooter){
							this.renameKEY(item,"rooter","author")
						}
					})
					this.articles = arr
				}
            },

            async showMoreArticles(){
                const result = await this.$myRequest({
                    url:`/articles/?tag=${this.tag}&limit=${this.limit}&offset=${this.offset}`,
                    method: 'GET',
                })
                if(result.statusCode == 200){
					let arr = result.data.articles
					arr.forEach((item)=>{
						item.createdAt = this.formatTime(item.createdAt)
                        this.articles.push(item)
						if(item.rooter){
							this.renameKEY(item,"rooter","author")
						}
					})
					
				}
                if(result.data.articles.length < 5){
                    this.loadStatus = 'noMore'
                }else{
                    this.loadStatus = 'more'
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
				return moment.utc(item).format('MMMM Do, h:mm:ss a');
			},

        //去详情页，并把该帖子的唯一Id传给详情页，供详情页请求数据
        gotodetail(index){
            console.log(index);
            let id = this.articles[index]._id
            uni.navigateTo({
                url: `../../pages/detail/detail?id=${id}`,
                success: (result)=>{
                
                },
                fail: ()=>{},
                complete: ()=>{}
            });
        },
    },
}
</script>

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
    }
</style>