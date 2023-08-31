<template>
  <div>
    <el-header style="background-color: #222831">
      <!-- Header content -->
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#222831"
        text-color="#eeeeee"
        active-text-color="#00adb5"
      >
        <el-menu-item index="1">
          <i style="font-size: 30px" class="el-icon-odometer"></i>
          卫星认证控制中心
        </el-menu-item>
      </el-menu>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "SatAuthSatHead",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style>
</style>