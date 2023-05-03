import Vue from "vue";
import App from "./App.vue";
// 三级联动的组件，注册为全局组件，任意地方都可以使用
import TypeNav from "./components/TypeNav/index.vue";
import Carousel from "./components/Carousel/index.vue";
import Pagination from "./components/Pagination/index.vue";
// 第一个参数：全局组件的名字，第二个参加：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

// 引入路由
import router from "./router";
Vue.config.productionTip = false;
import { reqCategoryList } from "./api/index.js";
reqCategoryList();
import { reqGetSearchInfo } from "./api/index.js";
reqGetSearchInfo();
// 引入仓库
// import store from "./store";
import store from "./store/index";

// 统一接口api文件夹中所有的请求函数
// 统一引入
import * as API from "@/api";

// 引入element-ui
import { Button, MessageBox } from "element-ui";
// element-ui注册的两种方式，直接component、挂载Vue原型上
Vue.component(Button.name, Button);
// Vue.use(Button);
// Vue.use(MessageBox);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 图片懒加载
import VueLazyload from "vue-lazyload";
import jgy from "@/assets/1.gif";
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: jgy,
});
// 引入mockServejs——mock数据
import "./mock/mockServe";
// 引入swiper样式,任何组件都可以用
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
// 引入自定义插件
// import myPlugins from "@/plugins/myPlugins";
// Vue.use(myPlugins, {
//   name: "upper",
// });
// 引入表单验证插件
// import "@/plugins/validate";
new Vue({
  render: (h) => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由[底下的写法KV一致 省略V【router小写】]
  router,
  // 注册仓库：组件实例的身上会多一个属性$store属性
  store,
}).$mount("#app");
