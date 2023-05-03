import { reqGetUserAddress, reqOrderInfo } from "@/api/index";
const state = {
  userAddressList: [],
  orderInfo: {},
};
const mutations = {
  GETUSERADDRESS(state, userAddressList) {
    state.userAddressList = userAddressList;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};
const actions = {
  // 获取用户地址信息
  async getUserAddress({ commit }) {
    let res = await reqGetUserAddress();
    // console.log(res);
    if (res.code == 200) {
      commit("GETUSERADDRESS", res.data);
    }
  },
  // 获取商品列表清单
  async getOrderInfo({ commit }) {
    let res = await reqOrderInfo();
    console.log(res);
    if (res.code == 200) {
      commit("GETORDERINFO", res.data);
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
