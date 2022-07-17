const BASE_URL = 'https://192.168.31.18/api'
export const myRequest = (options) =>{
    return new Promise((resolve,reject) =>{
        uni.request({
            url: BASE_URL + options.url,
            method: options.method || 'GET',
            data: options.data || {},
            header:{ 
                'Authentization':'Bearer '+ uni.getStorageSync('token')
            },
            success: res=>{
                // if(res.statusCode < 200 || res.statusCode>300){
                //     return uni.showToast({
                //         title: '获取数据失败'
                //     })
                // }
                resolve(res)
            },
            fail:(err)=>{
                uni.showToast({
                    title: '请求接口失败'
                })
                reject(err)
            }
        })
    })
}

