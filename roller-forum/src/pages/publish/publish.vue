<template>
    <view>
            <uni-easyinput v-model="article.title" placeholder="请输入标题"></uni-easyinput>
            <uni-easyinput v-model="article.body" placeholder="请输入内容"></uni-easyinput>
            <uni-data-checkbox v-model="value" :localdata="range" @change="change"></uni-data-checkbox>
            <uni-file-picker 
                v-model="imageValue" 
                fileMediatype="image" 
                mode="grid" 
                @select="select" 
                @progress="progress" 
                @success="success" 
                @fail="fail" 
            />
        <button @click="send">发布</button>
    </view>
</template>

<script>
export default {
    name:"publish",
		data() {
			return {
				imageValue:[],
                imageValues:[],
                article:{
                    title:'',
                    body:'',
                    tag:''
                },
                value: null,
			    range: [{"value": 0,"text": "新手"	},{"value": 1,"text": "刹车"},{"value": 2,"text": "平滑"},{"value": 3,"text": "速滑"}]
			}
		},

		methods:{
            async send(){
                if(this.article.tag == ''){
                    console.log(588888);
                    uni.showToast({
                        title:'请选择标签',
                        icon:'error'
                    })
                    return 
                }
                console.log(this.article);
                const {article} = this
                const result = await this.$myRequest({
                    url:'/articles',
                    method: 'POST',
                    data:{article}
                })
                console.log(result);
                let _id= result.data.article._id;
                if(this.imageValues!=''){
                const tempFilePaths = this.imageValues
                for(let i = 0;i < tempFilePaths.length; i++) {
                        uni.uploadFile({
                            url: 'https://192.168.31.18/api/uploads', 
                            filePath: tempFilePaths[i],
                            name: 'file',
                            formData: {
                                "_id": _id
                            },
                            
                            success: (uploadFileRes) => {
                                console.log(uploadFileRes.data);
                                uni.switchTab({
                                    url: `../../pages/index/index`,
                                    success:(res)=>{
                                        //页面栈，在当前页面调用别的页面的方法
                                        let page = getCurrentPages().pop();
                                        if (page == undefined || page == null) return;
                                        page.curSegment = 1;
                                        //在当前页调用了另外页面的方法
                                        page.onRefresh();
                                    },
                                })
                            }
                        });
                    }
                }else{
                    uni.switchTab({
                        url: `../../pages/index/index`,
                        success:(res)=>{
                            //页面栈，在当前页面调用别的页面的方法
                            let page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.curSegment = 1;
                            //在当前页调用了另外页面的方法
                            page.onRefresh();
                        },
                    })
                }

            },
            
            //多选框赋值
            change(e){
                console.log('e:',e);
                this.article.tag = e.detail.data.text
		    },

            // 获取上传状态
			select(e){
				console.log('选择文件：',e)
                this.imageValues = e.tempFilePaths
			},
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},
			
			// 上传成功
			success(e){
				console.log('上传成功')
                
			},
			
			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			}
		}
}
</script>

<style>

</style>