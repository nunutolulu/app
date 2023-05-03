<template>
    <div>
        <!-- 三级联动的全局组件-已经是全局组件 -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <TodayRecom></TodayRecom>
        <CommodityRank></CommodityRank>
        <GuessLike></GuessLike>
        <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
        <!-- <Floor></Floor> -->
        <Brand></Brand>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// import TypeNav from './TypeNav/index.vue' 已经是全局组件，不需要import引入
import ListContainer from './ListContainer/index.vue'
import TodayRecom from './TodayRecom/index.vue'
import CommodityRank from './CommodityRank/index.vue'
import GuessLike from './GuessLike/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
export default {
    name: 'HomeIndex',
    components: {
        ListContainer,
        TodayRecom,
        CommodityRank,
        GuessLike,
        Floor,
        Brand
    },
    mounted() {
        // 派发action，获取数据
        // floor有两个组件，floor.json里存在两个数据对象
        this.$store.dispatch('home/getFloorList');
        // this.$store.dispatch('user/getUserInfo')
    },
    computed: {
        ...mapState({
            floorList: state => state.home.floorList
        })
    },

}
</script>

<style></style>