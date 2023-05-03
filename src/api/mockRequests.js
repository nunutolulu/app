// 向模拟的数据发送请求，baseURL会产生变化

// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// start 进度条开始 done:进度条结束

// 1、利用axios对象的方法create，去创建一个axios实例
// 2、requests就是axios，不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发送请求的时候，路径当中会出现api
  baseURL: "/mock",
  // 代表请求超时的时间5s
  timeout: 5000,
});
// 请求拦截器，在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config配置对象，对象中一个属性很重要，headers请求头
  // 进度条开始
  nprogress.start();
  return config;
});
// 响应拦截器
requests.interceptors.response.use(
  // 成功的回调函数，服务器响应数据回来以后，响应拦截器可以检测，做一些事情
  // 进度条结束
  (res) => {
    nprogress.done();
    return res.data;
  },
  // 服务器响应失败的服务器
  (err) => {
    // return Promise.reject(new Error("faile"));
    alert(err.message);
    return Promise.reject(res);
  }
);

// 对外暴露
export default requests;
