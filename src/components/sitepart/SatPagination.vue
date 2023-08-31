<template>
    <div>
        <el-row type="flex" :gutter="0" justify="center" style="padding-top: 1%;">
            <el-col :span="5" :offset="0">
                <el-pagination prev-text="&lt;上一页" next-text="下一页&gt;" :pager-count="5" layout="prev, slot, next"
                    :current-page.sync="cur_page_num" @current-change="handleCurrentChange" :page-size="12"
                    :total="total_page_num">
                    <span style="padding-left: 50px; padding-right: 50px; font-size: 15px;">第 {{
                        cur_page_num }} 页</span>
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'SatAuthSatPagination',

    data() {
        return {
            cur_page_num: 1,
            total_page_num: 120,
        };
    },

    mounted() {

    },

    methods: {
        handleCurrentChange(val) {
            console.log(val);
        },
    },
};
</script>

<style></style>