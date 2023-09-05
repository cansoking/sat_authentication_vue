<template>
  <div v-loading="loading">
    <el-row :gutter="0">
      <el-col style="font-size: 30px; font-weight: 600" :span="3" :offset="0">星地认证信息</el-col>
      <el-col :span="4" :offset="17">
        <el-input @clear="resetData" clearable placeholder="请输入卫星#ID" v-model="search">
          <el-button @click="search_sat" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row type="flex" v-if="sat_data.length === 0" justify="center" style="margin-top: 20px;" :gutter="0">
      <el-col :span="24" :offset="0">
        <el-empty :image-size="300"></el-empty>
      </el-col>
    </el-row>
    <el-row v-else style="margin-bottom: 20px" :gutter="30">
      <el-col :span="12" :offset="0">
        <el-card style="margin-top: 20px;" class="box-card">
          <div slot="header" class="clearfix">
            <span v-if="search_flag">当前页搜索结果</span>
            <span v-else>当前轨道：{{ cur_page_num }} 号轨道</span>
            <el-button @click="second_level_auth" v-if="!search_flag" style="float: right; padding: 3px 5px; margin-left: 15px;"
              type="primary" round :plain="!$store.state.isSecondLevel">二级认证</el-button>
            <el-button @click="first_level_auth" v-if="!search_flag" style="float: right; padding: 3px 5px"
              type="primary" round :plain="!$store.state.isFirstLevel">一级认证</el-button>
          </div>
          <el-descriptions :column="1">
            <el-descriptions-item label="总计卫星数量">{{ sat_num }}</el-descriptions-item>
            <el-descriptions-item label="已认证卫星数量">
              <el-progress text-color="#222222" color="#67C23A" text-inside :format="show_auth_percentage"
                :stroke-width="20" :percentage="auth_sat_per"></el-progress>
            </el-descriptions-item>
            <el-descriptions-item label="未认证卫星数量">
              <el-progress text-color="#222222" color="#F56C6C" text-inside :format="show_y_auth_percentage"
                :stroke-width="20" :percentage="y_auth_sat_per"></el-progress>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col v-for="(sat, idx) in sat_data" :key="idx" :span="4" :offset="0">
        <el-card class="box-card" style="margin-top: 20px;">
          <div slot="header" class="clearfix">
            <span>卫星 #{{ sat.preleo.idsat }}</span>
            <el-tooltip class="item" effect="dark" content="查看认证日志" placement="bottom">
              <el-button size="mini" style="float: right" plain circle type="info" icon="el-icon-document-copy"
                @click="toLogPage(idx)">
              </el-button>
            </el-tooltip>
          </div>
          <div class="text item">
            <el-descriptions :column="1">
              <el-descriptions-item label="卫星IDsat">{{ sat.preleo.idsat }}</el-descriptions-item>
              <el-descriptions-item label="卫星SSID">{{ sat.preleo.ssid }}</el-descriptions-item>
              <el-descriptions-item label="认证状态">
                <el-tag v-if="sat.st === 0" size="small" type="danger">认证失败</el-tag>
                <el-tag v-if="sat.st === 1" size="small" type="success">已认证</el-tag>
                <el-tag v-if="sat.st === 2" size="small" type="warning">未注册</el-tag>
                <el-tag v-if="sat.st === 3" size="small" type="info">未连接</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="total_page_num != 0" type="flex" :gutter="0" justify="center" style="padding-top: 1%;">
      <el-col :span="10" :offset="0">
        <el-pagination :pager-count="7" background :current-page.sync="cur_page_num" @current-change="handleCurrentChange"
          :page-size="15" :total="total_page_num">
        </el-pagination>
      </el-col>
    </el-row>
    <el-backtop target=".el-main">
      <el-tooltip class="item" effect="dark" content="返回顶部" placement="left">
        <i style="color: #00adb5" class="el-icon-top"></i>
      </el-tooltip>
    </el-backtop>
  </div>
</template>

<script>
import SatPagination from "@/components/sitepart/SatPagination.vue";
export default {
  components: { SatPagination },
  name: "SatAuthSatGround",

  data() {
    return {
      loading: false,
      cur_page_num: 1,
      total_page_num: 0,
      search: '',
      search_flag: false,
      sat_data: []
    };
  },

  mounted() {
    this.getPageData(1)
    this.$store.state.aside_cur_page = "satground"
  },
  computed: {
    sat_num() {
      return this.sat_data.length
    },
    auth_sat_num() {
      let num = 0
      for (const sat of this.sat_data) {
        if (sat.st === 1 || sat.st === '1') {
          num++
        }
      }
      return num
    },
    y_auth_sat_num() {
      return this.sat_num - this.auth_sat_num
    },
    auth_sat_per() {
      let asn = this.auth_sat_num
      let sn = this.sat_num
      if (sn === 0) return 0
      return Math.round(asn / sn * 100)
    },
    y_auth_sat_per() {
      let yasn = this.y_auth_sat_num
      let sn = this.sat_num
      if (sn === 0) return 0
      return Math.round(yasn / sn * 100)
    }
  },
  methods: {
    first_level_auth() {
      this.loading = true
      this.$axios.get("http://localhost:8080/satquery/tccleo/auth").then(res => {
        this.loading = false
        this.$notify({
          title: '一级认证完成',
          dangerouslyUseHTMLString: true,
          message: '认证总数：' + res.data.total_auth + '<br>成功认证：' + res.data.auth_suc + '<br>失败认证：' + res.data.auth_fail,
          type: "success",
          offset: 100
        });
        this.getPageData(this.cur_page_num)
        this.$store.state.isSecondLevel = false
        this.$store.state.isFirstLevel = true
      }).catch(err => {
        this.loading = false
        this.$notify.error({
          title: '认证失败',
          message: "发生未知错误",
          offset: 100
        });
        console.log("errors", err);
      })
    },
    second_level_auth() {
      this.loading = true
      // 首先进行一级认证
      this.$axios.get("http://localhost:8080/satquery/tccleo/auth").then(res => {
        this.loading = false
        this.$notify({
          title: '一级认证完成',
          dangerouslyUseHTMLString: true,
          message: '认证总数：' + res.data.total_auth + '<br>成功认证：' + res.data.auth_suc + '<br>失败认证：' + res.data.auth_fail,
          type: "success",
          offset: 100
        });
      }).catch(err => {
        this.$notify.error({
          title: '认证失败',
          message: "发生未知错误",
          offset: 100
        });
        console.log("errors", err);
      })
      // 请求二级认证
      this.$axios.get("http://localhost:8080/satquery/leoleo/twoAuth").then(res => {
        this.loading = false
        this.$notify({
          title: '二级认证完成',
          dangerouslyUseHTMLString: true,
          message: '认证总数：' + res.data.total_auth + '<br>成功认证：' + res.data.auth_suc + '<br>失败认证：' + res.data.auth_fail,
          type: "success",
          offset: 100
        });
        this.getPageData(this.cur_page_num)
        this.$store.state.isSecondLevel = true
        this.$store.state.isFirstLevel = false
      }).catch(err => {
        this.loading = false
        this.$notify.error({
          title: '认证失败',
          message: "发生未知错误",
          offset: 100
        });
        console.log("errors", err);
      })
    },
    show_auth_percentage(percentage) {
      return this.auth_sat_num + "/" + this.sat_num
    },
    show_y_auth_percentage(percentage) {
      return this.y_auth_sat_num + "/" + this.sat_num
    },
    resetData() {
      this.search = ''
      this.search_flag = false
      this.cur_page_num = 1
      this.getPageData(1)
    },
    search_sat() {
      this.cur_page_num = 1
      this.getPageData(1)
      this.search_flag = true
    },
    getPageData(page) {
      this.$axios.get("http://localhost:8080/satquery/tccleo/getSatGroundInfo", {
        params: {
          curPage: page,
          pageSize: 15,
          search: this.search
        }
      }).then(res => {
        this.sat_data = res.data.list
        this.total_page_num = res.data.total
      }).catch(err => {
        console.log("errors", err);
      })
    },
    toLogPage(idx) {
      this.$router.push({
        name: "satlog",
        params: {
          sat_data: this.sat_data[idx]
        }
      })
    },
    handleCurrentChange(val) {
      this.getPageData(val)
    },
  },
};
</script>

<style>
.el-progress {
  width: 70%;
}
</style>