// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

// 使用插件
Vue.use(VueRouter);

// 引入路由的配置
import routes from "./routes";

// 配置路由
let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 返回的y=0，代表的是滚动条在最上方
    return { y: 0 };
  },
});

export default router;
// 全局守卫：前置守卫（在路由跳转之间进行判断
router.beforeEach(async (to, from, next) => {
  // to去哪里，from从哪来，next是放行到指定的路由
  // next();
  // console.log(this);
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  // 空对象也是真true
  if (token) {
    // 用户已经登录了还想去login 不可能，停留在首页
    if (to.path == "/login") {
      next("/home");
    } else {
      // 登录，去的不是login【home|search|detail|shopCart】
      if (name) {
        next();
      } else {
        // 没有用户信息，派发action让仓库存储信息再跳转
        try {
          // 获取信息成功
          await store.dispatch("user/getUserInfo");
          next();
        } catch (error) {
          // alert(error.message);
          await store.dispatch("user/exitLogin");
          next("/login");
        }
      }
    }
  } else {
    // 未登录时不能去交易相关、支付相关（pay、paysuccess）、不能去个人中心（center）
    let toPath = to.path;
    if (
      toPath.indexOf("trade") != -1 ||
      toPath.indexOf("pay") != -1 ||
      toPath.indexOf("center") != -1
    ) {
      // 把未登录的时候想去而没有去成的信息，存储在地址栏当中
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});
