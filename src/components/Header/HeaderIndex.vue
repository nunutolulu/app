<template>
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <!-- 没有用户名 -->
                    <p v-if="!userName">
                        <span>请</span>
                        <!-- <a href="###">登录</a> -->
                        <!-- 声明式导航，有to属性 -->
                        <router-link to="/login">登录</router-link>
                        <!-- <a href="###" class="register">免费注册</a> -->
                        <router-link class="register" to="/register">免费注册</router-link>
                    </p>
                    <!-- 用户已登录 -->
                    <p v-else>
                        <a>{{ userName }}</a>
                        <a class="register" @click="exitLogin">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center/myorder">我的订单</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" to="/home">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderIndex',
    data() {
        return {
            keyword: ""
        }
    },
    computed: {
        // 用户名信息
        userName() {
            return this.$store.state.user.userInfo.name
        }
    },
    methods: {
        // 搜索按钮的回调函数，向search路由跳转
        goSearch() {

            // 路由传参
            // 第一种：字符串形式
            // this.$router.push('/search/' + this.keyword + "?k=" + this.keyword.toUpperCase())
            // 第二种：模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            // 第三种：对象的写法
            // this.$router.push({ name: 'search', params: { keyword: this.keyword }, query: { k: this.keyword.toUpperCase() } })

            // 编程式导航
            // this.$router.push({ name: 'search', params: { keyword: this.keyword || undefined } })
            if (this.$route.params) {
                let locations = {
                    name: 'search',
                    params: { keyword: this.keyword || undefined }
                };
                locations.query = this.$route.query;
                this.$router.push(locations)
            }


            /*  if (this.$route.query.categoryName) {
                 locations.query = this.$route.query;
             } */
        },
        // 退出登录
        async exitLogin() {
            try {
                this.$store.dispatch('user/exitLogin');
                // 回到首页
                this.router.push('/home')
            } catch (error) {
                alert(error.message)
            }
        },
        // 订单信息
        /* myTrade() {
            this.router.push('/trade')
        } */
    },
    mounted() {
        // 通过全局事件总线清楚关键字
        this.$bus.$on('inputValueClear', () => {
            this.keyword = '';
        })
    }
}
</script>

<style></style>