import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqGetUserInfo,
  reqExitLogin,

} from "@/api";

import { setToken, getToken, removeToken } from "@/utils/token";
const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR(state) {
    state.token = "";
    state.userInfo = "";
    removeToken();
  },

};
const actions = {
  // 获取验证码的请求
  async getCode({ commit }, phone) {
    let res = await reqGetCode(phone);
    // console.log(res);
    if (res.code == 200) {
      commit("GETCODE", res.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 注册用户
  async userRegister({ commit }, user) {
    let res = await reqUserRegister(user);
    // console.log(res);
    if (res.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 用户登录
  async userLogin({ commit }, user) {
    let res = await reqUserLogin(user);
    // console.log(res);
    // 服务器下发token，用户唯一标识符uuid
    if (res.code == 200) {
      commit("USERLOGIN", res.data.token);
      // 持久化存储
      setToken(res.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let res = await reqGetUserInfo();
    // console.log(res);
    if (res.code == 200) {
      commit("GETUSERINFO", res.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
      // return false;
    }
  },
  // 退出登录
  async exitLogin({ commit }) {
    let res = await reqExitLogin();
    // console.log(res);
    if (res.code == 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
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
