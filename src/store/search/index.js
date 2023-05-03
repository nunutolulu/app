import { reqGetSearchInfo } from "@/api";

// search模块的小仓库
const state = {
  // 通过浏览器的网络，来查看数据的格式
  searchList: {},
};
const mutations = {
  GETSEARCHINFO(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  // 当前这个函数在调用获取服务器数据的时候，至少传递一个参数）空对象
  // params参数：是当用户派发action的时候，第二个参数传递过来的
  async getSearchInfo({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params);
    // console.log(result);
    if (result.code == 200) {
      commit("GETSEARCHINFO", result.data);
    }
  },
};
// 计算属性
// 项目中getters主要的作用是：简化仓库中的数据
// 可以把将来在组件当中需要的数据简化一下，方便使用
const getters = {
  // 当前形参的state，为当前仓库中的state，并非大仓库中的那个state
  goodsList(state) {
    // 假如网络不给力、没有网，应该返回的是undefined
    // 计算新的属性属性值，至少返回一个空数组
    return state.searchList.goodsList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
