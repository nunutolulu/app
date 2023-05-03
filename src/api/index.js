// 当前这个模块，API进行统一管理
import requests from "./requests";
import mockRequests from "./mockRequests";
// 三级联动的接口
// /api/product/getBaseCategoryList get 无参数
// 发送请求:axios发请求返回Promise对象
export const reqCategoryList = () => {
  return requests({ url: "/product/getBaseCategoryList", method: "get" });
};

// 获取mock的虚拟数据——banner
export const reqGetBannerList = () => {
  return mockRequests({ url: "/banner", method: "get" });
};
// 获取floor的数据
export const reqGetFloorList = () => {
  return mockRequests({ url: "/floor", method: "get" });
};

// 获取search的数据 参数：需要传递参数
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少一个空对象
export const reqGetSearchInfo = (params) => {
  return requests({ url: "/list", method: "post", data: params });
};

// 获取detail详情页面的数据
export const reqDetailList = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });

// 添加到购物车成功的数据
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 获取购物车数据
export const reqGetShopCartList = () =>
  requests({ url: "/cart/cartList", method: "get" });

// 删除购物车数据
export const reqDeleteCartListById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

// 切换产品状态
export const reqUpdateChecked = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });

// 获取验证码
//  获取验证码 /api/user/passport/sendCode/{phone}
// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

// 注册用户
//  /api/user/passport/register
// 带的参数为对象data，里面有phone，code，password
export const reqUserRegister = (data) =>
  requests({ url: "/user/passport/register", data, method: "post" });

// 用户登录
export const reqUserLogin = (data) =>
  requests({ url: "/user/passport/login", data, method: "post" });

// 登录之后展示用户信息
//  /api/user/passport/auth/getUserInfo
// token通过请求头获取信息
export const reqGetUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

// 退出登录
// /api/user/passport/logout
export const reqExitLogin = () =>
  requests({ url: "/user/passport/logout", method: "get" });

// 获取用户地址信息
export const reqGetUserAddress = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });

// 获取商品列表清单
export const reqOrderInfo = () =>
  requests({ url: "/order/auth/trade", method: "get" });

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });

// 获取订单支付信息
// /api/payment/weixin/createNative/{orderId}
export const reqGetOrderPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });

//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });

//获取个人中心的数据
//api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
