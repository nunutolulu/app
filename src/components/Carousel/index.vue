<!-- 轮播图 -->
<template>
    <div class="swiper-container" id="floor1Swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper';
export default {
    name: 'Carousel',
    props: ['list'],
    watch: {
        list: {
            // watch监听不到floor的变化，因为这个数据从未变化，他是父组件给的，在子组件中未出现变化
            immediate: true,//立即监听，不管数据有无变化，立即监听
            handler(newValue, oldValue) {
                if (this.list.length === 0) return;
                this.$nextTick(() => {
                    Swiper.use([Navigation, Pagination, Autoplay])
                    var mySwiper = new Swiper('.swiper-container', {
                        // direction: 'horizontal', // 水平切换选项
                        loop: true, // 循环模式选项
                        // observer: true,
                        direction: "horizontal",

                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            // type: "bullets",
                            clickable: true
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        /* autoplay: {
                            delay: 1000
                        } */
                    })
                })
            }
        }
    }
}
</script>

<style></style>