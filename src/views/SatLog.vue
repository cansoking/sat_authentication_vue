<template>
    <div>
        <el-page-header @back="goBack">
            <div style="font-size: 30px; font-weight: 600" slot="content">
                卫星 #1234 认证流程日志
            </div>
            <div slot="title" style="font-size: 20px; font-weight: 500;">
                返回
            </div>
        </el-page-header>
        <el-divider></el-divider>
        <el-row :gutter="0">
            <el-col :span="24" :offset="0">
                <el-descriptions :column="2" title="卫星基本信息">
                    <el-descriptions-item label="卫星信息1">aaaaaaaaaa</el-descriptions-item>
                    <el-descriptions-item label="卫星信息2">bbbbbbbbbb</el-descriptions-item>
                    <el-descriptions-item label="卫星信息3">cccccccccc</el-descriptions-item>
                    <el-descriptions-item label="卫星信息4">dddddddddd</el-descriptions-item>
                    <el-descriptions-item label="卫星信息5">eeeeeeeeee</el-descriptions-item>
                    <el-descriptions-item label="认证状态">
                        <el-tag size="small" type="success">已认证</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="认证流程日志"> </el-descriptions-item>
                </el-descriptions>
            </el-col>
        </el-row>
        <el-row :gutter="0">
            <el-col :span="24" :offset="0">
                <el-input style="width: 50%" :rows="20" type="textarea" :value="log_data" resize="none" readonly
                    placeholder="暂无日志" v-model="textarea1">
                </el-input>
            </el-col>
        </el-row>
        <el-row :gutter="0" style="margin-top: 5%">
            <el-col :span="24" :offset="0">
                <el-button type="primary" size="default">发起认证</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import SatHead from "../components/sitepart/SatHead.vue";
export default {
    components: { SatHead },
    name: "SatAuthSatLog",

    data() {
        return {};
    },

    mounted() { },

    methods: {
        goBack() {
            this.$router.go(-1);
        }
    },
};
</script>

<style></style>