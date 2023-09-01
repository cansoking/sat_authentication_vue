<template>
    <div>
        <el-page-header @back="goBack">
            <div style="font-size: 30px; font-weight: 600" slot="content">
                卫星 #{{ sat_data.preleo.idsat }} 认证流程日志
            </div>
            <div slot="title" style="font-size: 20px; font-weight: 500;">
                返回
            </div>
        </el-page-header>
        <el-divider></el-divider>
        <el-row :gutter="0">
            <el-col :span="24" :offset="0">
                <el-descriptions :column="2" title="卫星基本信息">
                    <el-descriptions-item label="卫星广播身份SSID">{{ sat_data.preleo.ssid }}</el-descriptions-item>
                    <el-descriptions-item label="身份保护密钥K">{{ sat_data.preleo.k }}</el-descriptions-item>
                    <el-descriptions-item label="会话密钥CK">{{ sat_data.preleo.ck }}</el-descriptions-item>
                    <el-descriptions-item label="主密钥MainKey">{{ sat_data.preleo.mainKey }}</el-descriptions-item>
                    <el-descriptions-item label="默认认证密钥DKauth">{{ sat_data.preleo.dkauth }}</el-descriptions-item>
                    <el-descriptions-item label="默认加密密钥DKenc">{{ sat_data.preleo.dkenc }}</el-descriptions-item>
                    <el-descriptions-item label="工作加密密钥Wkenc">{{ sat_data.preleo.wkenc }}</el-descriptions-item>
                    <el-descriptions-item label="卫星身份IDsat">{{ sat_data.preleo.idsat }}</el-descriptions-item>
                    <el-descriptions-item label="认证流程日志"> </el-descriptions-item>
                    <el-descriptions-item label="认证状态">
                        <el-tag v-if="sat_data.st === 0" size="small" type="danger">认证失败</el-tag>
                        <el-tag v-else-if="sat_data.st === 1" size="small" type="success">已认证</el-tag>
                        <el-tag v-else-if="sat_data.st === 2" size="small" type="warning">未注册</el-tag>
                        <el-tag v-else-if="sat_data.st === 3" size="small" type="info">未连接</el-tag>
                    </el-descriptions-item>
                </el-descriptions>
            </el-col>
        </el-row>
        <el-row :gutter="0">
            <el-col :span="24" :offset="0">
                <el-input style="width: 50%" :rows="20" type="textarea" resize="none" readonly placeholder="暂无日志"
                    v-model="log_data">
                </el-input>
            </el-col>
        </el-row>
        <el-row :gutter="0" style="margin-top: 5%">
            <el-col :span="24" :offset="0">
                <el-button @click="authSingle" type="primary" size="default">发起一级认证</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "SatAuthSatLog",

    data() {
        return {
            sat_data: {},
            log_data: ''
        };
    },

    created() {
        this.sat_data = this.$route.params.sat_data
        this.log_data = this.sat_data.preleo.log
    },

    methods: {
        goBack() {
            this.$router.go(-1);
        },
        authSingle() {
            this.$axios.get("http://localhost:8080/satquery/tccleo/authSingle/" + this.sat_data.preleo.idsat).then(res => {
                let st = res.data.st
                this.sat_data = res.data
                this.log_data = res.data.preleo.log
                if (st === 1) {
                    this.$notify({
                        title: '认证成功',
                        message: '卫星' + this.sat_data.preleo.idsat + '认证成功',
                        type: 'success',
                        offset: 150
                    });
                } else {
                    this.$notify.error({
                        title: '认证失败',
                        message: '卫星' + this.sat_data.preleo.idsat + '认证失败',
                        offset: 150
                    });
                }
            }).catch(err => {
                this.$notify.error({
                    title: '认证失败',
                    message: '卫星' + this.sat_data.preleo.idsat + '认证失败',
                    offset: 150
                });
                console.log("errors", err);
            })
        }
    },
};
</script>

<style></style>