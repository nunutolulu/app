import {
  reqGetShopCartList,
  reqDeleteCartListById,
  reqUpdateChecked,
} from "@/api";

const state = {
  shopCartList: [],
};
const mutations = {
  GETSHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};
const actions = {
  async getShopCartList({ commit }) {
    let res = await reqGetShopCartList();
    // console.log("shopCart成功", res);
    if (res.code == 200) {
      commit("GETSHOPCARTLIST", res.data);
    }
  },
  // 通过id删除指定的商品
  async deleteCartListById({ commit }, skuId) {
    let res = await reqDeleteCartListById(skuId);
    // console.log(res);
    if (res.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 修改购物车某个产品的勾选状态
  async updateCheckById({ commit }, { skuId, isChecked }) {
    let res = await reqUpdateChecked(skuId, isChecked);
    // console.log(res);
    if (res.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 删除选中的商品
  async deleteAllCheckedCart({ dispatch, getters }) {
    // 获取购物车当中全部的产品
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((cart) => {
      let promise =
        cart.isChecked == 1 ? dispatch("deleteCartListById", cart.skuId) : "";
      // console.log(res);
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
  // 修改全部产品的选中状态
  updateAllCartChecked({ dispatch, state }, isChecked) {
    let PromiseAll = [];
    state.shopCartList[0].cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == isChecked
          ? ""
          : dispatch("updateCheckById", {
              skuId: item.skuId,
              isChecked: isChecked,
            });
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
};
const getters = {
  cartList(state) {
    return state.shopCartList[0] || {};
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
