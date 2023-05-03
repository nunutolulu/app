import { v4 as uuidv4 } from "uuid";
// 要生成一个随机的字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  //先看看本地是否有uuid
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  //如果没有本地uuid执行生成
  if (!uuid_token) {
    uuid_token = uuidv4();
    //本地储存起来
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  //返回出去
  return uuid_token;
};
