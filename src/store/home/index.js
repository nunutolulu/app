import { reqCategoryList, reqGetFloorList } from "@/api";
import { reqGetBannerList } from "@/api";
// home模块的小仓库
const state = {
  // state中数据默认初始值别瞎写，服务器返回对象，服务器返回数据【根据接口的返回值初始化】
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  // floor的数据
  floorList: [],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  // 通过API里面的接口函数调用向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    // console.log(result);
    if (result.code == 200) {
      // console.log(this.$store);
      commit("CATEGORYLIST", result.data);
      // commit['CATEGORYLIST',result.data]
    }
  },
  // 获取mock的数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    // console.log(result);
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
  // 获取floor的数据
  async getFloorList({ commit }) {
    let result = await reqGetFloorList();
    // console.log(result);
    if (result.code == 200) {
      commit("GETFLOORLIST", result.data);
    }
  },
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
