<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 新加的div添加了事件委派，使鼠标离开的时候，但未离开全部商品分类，仍然有背景颜色 -->
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition name="sort">
                    <!-- 三级联动 -->
                    <div class="sort" v-show="show">
                        <!-- 此处的gosearch，结合事件委派，减少循环的次数，提高性能 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <!-- 一级分类 -->
                            <div class="item" v-for="(c1, index) in categoryList.slice(0, 16)" :key="c1.categoryId"
                                :class="{ cur: currentIndex == index }">
                                <h3 @mouseenter="changeIndex(index)">
                                    <!-- 声明式导航 -->
                                    <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                                    <!-- <router-view></router-view> -->
                                    <!-- 编程式导航 -->
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                        c1.categoryName
                                    }}</a>
                                </h3>
                                <div class="item-list clearfix"
                                    :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                    <!-- 二级分类 -->
                                    <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <!-- 声明式导航 -->
                                                <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                                                <!-- <router-view></router-view> -->
                                                <!-- 编程式导航 -->
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                                                    c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <!-- 三级分类 -->
                                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                    <!-- 声明式导航 -->
                                                    <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                                                    <!-- <router-view></router-view> -->
                                                    <!-- 编程式导航 -->
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{
                                                            c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </transition>

            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// 按需引用
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data() {
        return {
            // 用来表示鼠标当前的索引值的
            currentIndex: -1,
            show: true
        }
    },
    // 组件挂载完毕，向服务器发请求
    mounted() {
        // 通知vuex发请求，获取数据，存储于仓库中
        // console.log(this.$store);
        // this.show = false;
        // 如果不是home路由组件，将typenav隐藏
        if (this.$route.path != '/home') {
            this.show = false
        }
    },
    computed: {
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            // 注入一个参数state，其实为大仓库中的数据
            categoryList: state => state.home.categoryList
        })
    },
    methods: {
        // 鼠标进入修改响应式数据currentIndex属性
        /* changeIndex(index) {
            this.currentIndex = index;
            // 修改背景颜色在class中
        }, */
        // 使用es5的写法，使用k:v的格式，方可使用_.的格式，节流写法
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 50),
        // 一级分类鼠标移出的事件回调
        leaveIndex() {
            this.currentIndex = -1;
            if (this.$route.path != '/home') {
                this.show = false
            }
        },
        goSearch(event) {
            // this.$router.push('/search')
            // 目前的方式存在几个问题
            // 如何确定点击的是a标签才跳转？事件委派是把所有子节点的事件委派给父节点，而子节点有多个【a、em、div等】
            // 若已经确定了点击的a标签才跳转，那如何传递参数呢？携带name属性与各级节点的id属性？
            // console.log(event.target);

            // 1、子节点中的a标签带有data-categoryName属性
            let element = event.target;
            // console.log(element);
            // 获取当前触发这个事件的节点，需要带有data-categoryname
            // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
            let { categoryname, category1id, category2id, category3id } = element.dataset;
            // console.log(category1id);
            if (categoryname) {
                // 整理路由跳转的参数
                let location = { name: 'search' };
                let query = { categoryName: categoryname };
                // 一级、二级、三级的a标签
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }
                // 判断：如果路由跳转的时候，带有params参数，也需要带过去
                // 原因：如果点击三级列表自动按照query参数传递，但是右上角有个搜索框，它是params参数传递
                if (this.$route.params) {
                    location.params = this.$route.params
                    // 整理完参数
                    location.query = query;
                    // 路由跳转
                    this.$router.push(location)
                }

            }
        },
        enterShow() {
            this.show = true;
        }
    }
}
</script>

<style lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }

                /* .item :hover {
                    background-color: pink;
                } */
                .cur {
                    background-color: pink;
                }
            }
        }

        // 过渡动画的样式
        // 过渡动画，进入的开始阶段
        .sort-enter {
            height: 0px;
        }

        // 过渡动画的结束状态
        .sort-enter-to {
            height: 461px;
        }

        // 定义动画时间
        .sort-enter-active {
            transition: all 0.5s linear;
            overflow: hidden;
        }

        // 过渡动画，离开的阶段
        /* .sort-leave {
            height: 461px;
        }

        .sort-leave-to {
            height: 0px;
        }

        .sort-leave-active {
            transition: all 0.5s linear;
            overflow: hidden;
        } */
    }
}
</style>