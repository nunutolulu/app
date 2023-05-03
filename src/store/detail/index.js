import { reqDetailList } from "@/api";
import { reqAddOrUpdateShopCart } from "@/api";
// 封装游客身份模块uuid——生成一个随机字符串
import { getUUID } from "@/utils/uuid_token";
const state = {
  detailList: {},
  uuid_token: getUUID(),
};
const mutations = {
  GETDETAILINFO(state, detailList) {
    state.detailList = detailList;
  },
  // ADDORUPDATESHOPCART() {},
};
const actions = {
  // 通过API里面的接口函数调用向服务器发请求，获取服务器的数据
  async getDeatilInfo({ commit }, skuId) {
    // 此处的reqDetailList与api中的函数名一致
    let result = await reqDetailList(skuId);
    // console.log(result);
    if (result.code == 200) {
      //   console.log("请求成功");
      commit("GETDETAILINFO", result.data);
    }
  },
  // 将产品添加到购物车中——发请求
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // console.log(skuId, skuNum); 成功
    // 加入购物车返回的结果
    // 加入购物车以后（发请求，前台将参数带给服务器
    // 服务器写入数据成功，并没有返回其他数据，
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    // console.log(result);
    // 当前的函数，如果执行返回promise
    if (result.code == 200) {
      return true;
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const getters = {
  // categoryView数组——路径导航简化的数组
  categoryView(state) {
    return state.detailList.categoryView || {};
  },
  // 产品的信息
  skuInfo(state) {
    return state.detailList.skuInfo || {};
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.detailList.spuSaleAttrList || {};
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
