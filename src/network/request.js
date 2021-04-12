import axios from 'axios'

export function request(config){
  //1.创建axios实例
  const instance =axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })

//2.axios的拦截器
//请求拦截
instance.interceptors.request.use(config => {
//请求拦截成功
// console.log(config)
//什么时候拦截 
//1、比如config中的一些信息不符合服务器的要求
//2、比如每次发送网络请求时，都希望在界面中展示一个请求的图标
//3、某些网络请求（登录），必须携带一些特殊的信息
return config
},err =>{
//请求拦截失败
// console.log(err)
})
//响应拦截
instance.interceptors.response.use(res =>{
  //响应拦截成功
  // console.log(res)
  return res.data
},err => {
  //响应拦截失败
  // console.log(err)
})
//3.发送真正的网络请求
  return instance(config)
}
