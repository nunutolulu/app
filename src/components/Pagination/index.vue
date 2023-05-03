<!-- 分页的功能——全局组件 -->
<template>
    <div class="pagination">
        <button @click="$emit('getPageNo', pageNo - 1)" :disabled="pageNo == 1">上一页</button>
        <button @click="$emit('getPageNo', 1)" v-if="startNumAndendNum.start > 1"
            :class="{ active: pageNo == 1 }">1</button>
        <button v-if="startNumAndendNum.start >= Math.floor(continues / 2)">···</button>

        <!-- 中间部分 v-for遍历 -->
        <template v-for="page in parseInt(startNumAndendNum.end)">
            <button @click="$emit('getPageNo', page)" :key="page" v-if="page >= startNumAndendNum.start"
                :class="{ active: page == pageNo }">
                {{ page }}
            </button>
        </template>

        <button v-if="startNumAndendNum.end <= (totalPage - Math.floor(continues / 2))">···</button>
        <!-- 总共的页数 -->
        <button @click="$emit('getPageNo', totalPage)" v-if="startNumAndendNum.end < totalPage"
            :class="{ active: pageNo == totalPage }">{{ totalPage }}</button>
        <button @click="$emit('getPageNo', pageNo + 1)" :disabled="pageNo == totalPage">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
        <!-- <h1>{{ startNumAndendNum }}</h1> -->
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        // 总共有多少页 total/pageSize 向上取整
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        },
        // 计算出连续的页码的起始数字和结束数字
        startNumAndendNum() {
            console.log(this.totalPage);
            let start = 0, end = 0;
            // 总的页数至少要大于连续的页码数
            if (this.totalPage > this.continues) {
                start = this.pageNo - parseInt(this.continues / 2);
                end = this.pageNo + parseInt(this.continues / 2);
                // 约束头部
                if (start < 1) {
                    start = 1;
                    end = this.continues
                }
                // 约束尾部
                if (end > this.totalPage) {
                    end = this.totalPage;
                    start = this.totalPage - this.continues + 1
                }
            } else {
                // 总的页数小于连续的页码数
                start = 1;
                end = this.totalPage;
            }
            // console.log(start);
            // console.log(end);
            return { start, end };
        }
    },
}
</script>  

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}

.active {
    background-color: skyblue;
}
</style>
