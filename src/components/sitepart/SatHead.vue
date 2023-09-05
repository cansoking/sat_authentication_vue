<template>
  <div>
    <el-header style="background-color: #222831">
      <!-- Header content -->
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#222831" text-color="#eeeeee"
        active-text-color="#00adb5">
        <el-row :gutter="0" type="flex" align="middle">
          <el-col :span="0.5" :offset="0">
            <el-image :src="logo_img_url" fit="fill" style="width: 45px;"></el-image>
          </el-col>
          <el-col style="line-height: 60px; margin-left: 10px;" :span="12" :offset="0">
            <span style="color: white;">卫星认证控制中心</span>
          </el-col>
        </el-row>
      </el-menu>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "SatAuthSatHead",

  data() {
    return {
      logo_img_url: require("../../assets/logo.png")
    };
  },

  mounted() { },

  methods: {},
};
</script>

<style></style>