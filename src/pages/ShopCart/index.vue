<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart, index) in cartInfoList" :key="index">
          <li class="cart-list-con1">
            <!-- 复选框 -->
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <!-- 第五列 选择数量 -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
              @change="handler('change', $event.target.value * 1 - cart.skuNum, cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <!-- 第六列，小计 -->
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGoodsById(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length > 0"
          @click="updateAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapGetters } from 'vuex';
export default {
  name: 'ShopCart',
  // data(){},
  computed: {
    ...mapGetters('shopCart', ['cartList']),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 计算产品总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.skuPrice * 1.00
      });
      return sum;
    },
    // 判断底部复选框是否勾选
    isAllChecked() {
      // 遍历数组里面元素，只要全部元素isChecked属性为1，真
      // 只要有一个不是1 假
      return this.cartInfoList.every(item => item.isChecked == 1)
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取个人购物车数据
    getData() {
      this.$store.dispatch('shopCart/getShopCartList')
    },
    // 修改购物车的某个商品数量
    // 防止用户操作太频繁，使用防抖与节流——主要采用的是节流
    handler: throttle(async function (type, disNum, cart) {
      // type形参 区分三个元素
      // disNum + - input的最终个数
      // cart 点击的是哪一个产品，身上有id
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 用户输入的非法
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            // 给服务器带去的是差值
            disNum = parseInt(disNum) - cart.skuNum;
          }
          // disNum = (isNaN(disNum || disNum < 1)) ? 0 : parseInt(disNum) - cart.skuNum;
          break;
      }
      // console.log(disNum);
      // 派发action
      try {
        // 代表修改成功
        await this.$store.dispatch('detail/addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        // 再次获取数据展示
        this.getData();
      } catch (error) { alert(error.message) }
    }, 500),
    // 删除选中的产品
    async deleteGoodsById(skuId) {
      try {
        await this.$store.dispatch("shopCart/deleteCartListById", skuId);
        this.getData();
      } catch (error) { alert(error.message) }
    },
    // 勾选状态的修改
    async updateChecked(cart, event) {
      try {
        // 带给服务器的参数isChecked，应该是0/1，而不是布尔值
        let checked = event.target.isChecked ? "1" : "0"
        // 如果修改数据成功，再次获取服务器数据返回
        await this.$store.dispatch("shopCart/updateCheckById", { skuId: cart.skuId, isChecked: checked });
        this.getData();
      } catch (error) { alert(error.message) }
    },
    // 删除全部选中的产品
    // 这个回调函数无法收集有用的数据
    async deleteAllCheckedCart() {
      try {
        // 派发action
        await this.$store.dispatch('shopCart/deleteAllCheckedCart', this.cartList);
        this.getData();
      } catch (error) {
        alert(error.message)
      }

    },
    // 全选按钮
    async updateAllCartChecked(event) {
      try {
        // console.log(event);
        let isChecked = event.target.checked ? "1" : "0"
        await this.$store.dispatch('shopCart/updateAllCartChecked', isChecked);
        this.getData();
      } catch (error) {
        alert(error.message)
      }

    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }


        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>