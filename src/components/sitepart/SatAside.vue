<template>
  <div>
    <el-aside width="250px" style="background-color: #393e46">
      <!-- Aside content -->
      <el-menu
        :unique-opened="true"
        :default-active="$store.state.aside_cur_page"
        background-color="#393e46"
        text-color="#eeeeee"
        active-text-color="#00adb5"
        router
      >
        <el-menu-item index="tccpreinfo">
          <i class="el-icon-location"></i>
          TCC预置信息管理
        </el-menu-item>
        <el-menu-item index="tccsgauth">
          <i class="el-icon-magic-stick"></i>
          TCC卫星注册管理
        </el-menu-item>
        <el-menu-item index="satground">
          <i class="el-icon-s-flag"></i>
          星地认证信息
        </el-menu-item>
        <el-menu-item index="satauth">
          <i class="el-icon-discover"></i>
          星间认证信息
        </el-menu-item>
        <el-menu-item index="traffic">
          <i class="el-icon-connection"></i>
          恶意流量监测
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "SatAuthSatAside",

  data() {
    return {
    };
  },

  created() {
  },

  methods: {
  },
};
</script>

<style>
</style>