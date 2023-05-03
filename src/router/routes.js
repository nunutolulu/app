// 所有的路由配置信息
// 引入路由组件
// 注释之后，实现路由懒加载
/* import HomeIndex from "../pages/Home/HomeIndex.vue";
import LoginIndex from "../pages/Login/LoginIndex.vue";
import RegisterIndex from "../pages/Register/RegisterIndex.vue";
import SearchIndex from "../pages/Search/SearchIndex.vue";
import DetailIndex from "../pages/Detail/index.vue";
import AddCartSuccess from "../pages/AddCartSuccess/index.vue";
import ShopCart from "../pages/ShopCart/index.vue";
import TradeIndex from "../pages/Trade/index.vue";
import Pay from "@/pages/Pay/index.vue";
import PaySuccess from "@/pages/PaySuccess/index.vue";
import Center from "@/pages/Center/index.vue";
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder"; */

/* 
  当打包构建应用时，js包会非常大，影响页面加载
  如果我们能把不同路由对应的组件分割成不同的代码块，当路由被访问的时候才加载对应组件，更加高效
*/
export default [
  // 配置路由
  {
    path: "/center",
    component: () => import("@/pages/Center/index.vue"),
    children: [
      {
        path: "myorder",
        component: () => import("@/pages/Center/MyOrder/index.vue"),
      },
      {
        path: "grouporder",
        component: () => import("@/pages/Center/GroupOrder/index.vue"),
      },
      // 重定向
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess/index.vue"),
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay/index.vue"),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        // 中断当前的导航，从哪来回哪去
        next(false);
      }
    },
  },
  {
    path: "/trade",
    component: () => import("@/pages/Trade/index.vue"),
    meta: { show: true },
    // 路由独享守卫——从购物车来的
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        next();
      } else {
        // 中断当前的导航，从哪来回哪去
        next(false);
      }
    },
  },
  {
    path: "/shopcart",
    component: () => import("@/pages/ShopCart/index.vue"),
    meta: { show: true },
  },
  {
    path: "/home",
    // 路由懒加载
    component: () => import("@/pages/Home/HomeIndex.vue"),
    meta: { show: true },
  },
  {
    path: "/login",
    component: () => import("@/pages/Login/LoginIndex.vue"),
    meta: { show: false },
  },
  {
    path: "/register",
    component: () => import("@/pages/Register/RegisterIndex.vue"),
    meta: { show: false },
  },
  {
    path: "/search/:keyword?",
    component: () => import("@/pages/Search/SearchIndex.vue"),
    meta: { show: true },
    name: "search",

    // 路由组件是否可以传递参数？
    // 布尔值写法：params
    // props: true,
    // 对象写法：额外的给路由组件传递一些props
    // props:{a:1,b:2}
    // 函数写法：可以给params参数、query参数，通过props传递给路由组件
    props: ($route) => {
      return { keyword: $route.params.keyword };
    },
  },
  {
    path: "/detail/:skuid",
    component: () => import("@/pages/Detail/index.vue"),
    meta: { show: true },
    name: "detail",
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/pages/AddCartSuccess/index.vue"),
    meta: { show: true },
  },
  // 重定向，当项目跑起来的时候，首先访问的是首页
  {
    path: "*",
    redirect: "/home",
  },
];
