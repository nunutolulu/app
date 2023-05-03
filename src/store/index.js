// vuex的相关配置
import Vue from "vue";
import Vuex from "vuex";
//使用Vuex(插件)
Vue.use(Vuex);

// 引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopCart from "./shopCart";
import user from "./user";
import trade from "@/store/trade";
// 对外暴露store类的一个实例
export default new Vuex.Store({
  // 实现vuex仓库模块式开发存储数据
  modules: {
    home: home,
    search: search,
    detail: detail,
    shopCart: shopCart,
    user: user,
    trade: trade,
  },
});
