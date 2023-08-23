<template>
  <div>
    <el-container direction="vertical">
      <sat-head></sat-head>
      <el-container :direction="horizontal">
        <sat-aside></sat-aside>
        <el-main height="">
          <!-- Main content -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SatAside from "../components/sitepart/SatAside.vue";
import SatHead from "../components/sitepart/SatHead.vue";
export default {
  components: { SatHead, SatAside },
  name: "SatAuthTccControl",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.el-header {
  position: relative;
  width: 100%;
  height: 60px;
}

.el-aside {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
}

.el-main {
  position: absolute;
  left: 270px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}

.el-aside::-webkit-scrollbar {
  display: none;
}
</style>