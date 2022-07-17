<template>
    <view>
        <uni-easyinput suffixIcon="search"  v-model="keyword" placeholder="请输入内容-搜索帖子" @iconClick="searchTheResult"></uni-easyinput>

        <view v-if="state == 2">
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
                <uni-load-more :status="loadStatus"></uni-load-more>
        </view>

                <view class='nodata' v-if="state == 1">
                    <view class="image">
                    </view>
                    <text>暂未有数据</text>
                </view>
            
    </view>
</template>

<script>
import moment from 'moment'

export default {
    data() {
        return {
            loadStatus:'more',
            keyword: '',
            articles:[],
            limit: 5,
            offset:1,
            page:0,
            //0 代表尚未发送请求， 1代表myPostList的长度为0，2代表myPostList的长度大于0
            state:0,
        }
    },
    onPullDownRefresh() {
        this.searchTheResult()
        uni.stopPullDownRefresh()
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
            this.offset = 1
            this.articles=''
            const keyword = this.keyword
            const result = await this.$myRequest({
                url: `/rooter/user/searchArticles/?keyword=${keyword}&limit=${this.limit}&offset=${this.offset}`,
                method: 'GET',
            })
            console.log(result);
            if(result.statusCode == 200){
                this.page = Math.ceil(result.data.articlesCount / this.limit)
                let arr = result.data.articles
                arr.forEach((item)=>{
                    item.createdAt = this.formatTime(item.createdAt);
                    if(item.rooter){
                        this.renameKEY(item,"rooter","author")
                    }
                })
                console.log(arr);
                this.articles = arr
                if(this.articles.length > 0){
                    this.state = 2
                }else{
                    this.state = 1
                }
            }
        },
        //下拉到最底部就触发
        onReachBottom(){
            this.loadStatus = 'loading'
            setTimeout(()=>{
                if(this.offset < this.page){
                    this.offset +=1
                    this.showMoreSearchResults()
                }
                if(this.offset == this.page){
                    this.loadStatus = 'noMore'
                }
            },500)

        },
        
        async showMoreSearchResults(){
            const keyword = this.keyword
            const result = await this.$myRequest({
                url: `/rooter/user/searchArticles/?keyword=${keyword}&limit=${this.limit}&offset=${this.offset}`,
                method: 'GET',
            })
            if(result.statusCode == 200){
                this.page = Math.ceil(result.data.articlesCount / this.limit)
                let arr = result.data.articles
                arr.forEach((item)=>{
                    item.createdAt = this.formatTime(item.createdAt);
                    if(item.rooter){
                        this.renameKEY(item,"rooter","author")
                    }
                    this.articles.push(item);
                })
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

    .image{
        padding: 0;
        width:750rpx;
        height:480rpx;
        background-image: url('../../static/nodata.png');
        background-size: cover;
    }

    .nodata{
        text-align: center;
    }
</style>