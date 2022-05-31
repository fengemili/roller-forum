<template>
  <view class="body">
    <view>
      <uni-card
        :title="detail.author.username"
        mode="style"
        :is-shadow="true"
        :thumbnail="detail.author.image"
        :extra="detail.createdAt"
        note="Tips"
      >
        <h2>{{detail.title}}</h2>
        <text>{{detail.body}}</text>
        <view v-for="(img, index) in detail.imageList" :key="index">
          <image
            :src="img"
            mode="scaleToFill"
            @click="previewImage(index)"
          ></image>
        </view>
      </uni-card>
    </view>

      <!-- 评论区 -->
      <Commentsection :post_id='post_id'/>


      <!-- 评论框 -->
      <Commentbox :post_id='post_id'/>
    
  </view>
</template>

<script>
//评论框组件
import Commentbox from "../../components/commentbox/commentbox"
//评论区组件
import Commentsection from "../../components/commentsection/commentsection"
//时间格式化函数
import moment from 'moment'

export default {
  name:"deatilPage",
  components:{Commentbox,Commentsection},
  data() {
    return {
      detail: {
        author: {
          username:''
        }
      },
      content: "",
      post_id: ""
    };
  },

  //options  页面传递的参数
  onLoad(option) {
    this.getTheArticle(option.id);
  },
  methods: {
    //获取这个文章
    async getTheArticle(id) {
      let result = await this.$myRequest({
        url: `/articles/${id}`,
        method: "GET",
      });
        console.log(result);
      if (result.statusCode == 200) {
        this.post_id = result.data.article._id
        let arr = result.data.article;
        arr.createdAt = this.formatTime(arr.createdAt)
				if(arr.rooter){
					this.renameKEY(arr,"rooter","author")
          console.log(this.detail,123456);
        }
        this.detail = arr
      }
      console.log(this.detail)
    },

    //图片预览
    previewImage(index) {
      let photoList = this.detail.imageList;
      uni.previewImage({
        current: index,
        urls: photoList,
      });
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
			}
  },
};
</script>

<style lang='scss' scoped>
.body {
  position: relative;
}
</style>