<template>
    <div>
      <el-row :gutter="0">
        <el-col style="font-size: 30px; font-weight: 600" :span="3" :offset="0"
          >星间认证信息</el-col
        >
        <el-col :span="2" :offset="13">
          <el-button type="primary" plain>一级认证</el-button>
        </el-col>
        <el-col :span="2" :offset="0">
          <el-button type="primary" plain>二级认证</el-button>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-input placeholder="请输入卫星#ID" v-model="search">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row style="margin-bottom: 20px" v-for="ridx in 3" :gutter="30">
        <el-col v-for="idx in 4" :span="6" :offset="0">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卫星 #1234</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="查看认证日志"
                placement="bottom"
              >
                <el-button
                  size="mini"
                  style="float: right"
                  plain
                  circle
                  type="info"
                  icon="el-icon-document-copy"
                  @click=""
                >
                </el-button>
              </el-tooltip>
            </div>
            <div class="text item">
              <el-descriptions :column="1">
                <el-descriptions-item label="卫星信息1"
                  >aaaaaaaa</el-descriptions-item
                >
                <el-descriptions-item label="卫星信息2"
                  >bbbbbbbb</el-descriptions-item
                >
                <el-descriptions-item label="卫星信息3"
                  >cccccccc</el-descriptions-item
                >
                <el-descriptions-item label="认证状态">
                  <el-tag size="small" type="success">已认证</el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-backtop target=".el-main">
        <el-tooltip
          class="item"
          effect="dark"
          content="返回顶部"
          placement="left"
        >
          <i style="color: #00adb5" class="el-icon-top"></i>
        </el-tooltip>
      </el-backtop>
    </div>
  </template>
  
  <script>
  export default {
    name: "SatAuthSatGround",
  
    data() {
      return {};
    },
  
    mounted() {},
  
    methods: {},
  };
  </script>
  
  <style>
  </style>