<template>
  <div>
    <el-row :gutter="0">
      <el-col style="font-size: 30px; font-weight: 600" :span="3" :offset="0">星间认证信息</el-col>
      <el-col :span="4" :offset="17">
        <el-input @clear="resetData" clearable placeholder="请输入卫星#ID" v-model="search">
          <el-button @click="search_sat" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row type="flex" v-if="sat_data.length === 0 || $store.state.isSecondLevel === false" justify="center" style="margin-top: 20px;" :gutter="0">
      <el-col :span="24" :offset="0">
        <el-empty :image-size="300"></el-empty>
      </el-col>
    </el-row>
    <el-row v-else style="margin-bottom: 15px" :gutter="30">
      <el-col v-for="(sat, idx) in sat_data" :key="idx" :span="6" :offset="0">
        <el-card class="box-card" style="margin-top: 20px;">
          <div slot="header" class="clearfix">
            <span>ID #{{ sat.id }}</span>
            <el-tooltip class="item" effect="dark" content="查看认证日志" placement="bottom">
              <el-button size="mini" style="float: right" plain circle type="info" icon="el-icon-document-copy"
                @click="toLogPage(idx)">
              </el-button>
            </el-tooltip>
          </div>
          <div class="text item">
            <el-descriptions :column="1">
              <el-descriptions-item label="源卫星IDsat">{{ sat.idsatSrc }}</el-descriptions-item>
              <el-descriptions-item label="目标卫星IDsat">{{ sat.idsatDst }}</el-descriptions-item>
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
    <el-row v-if="total_page_num != 0 && $store.state.isSecondLevel === true" type="flex" :gutter="0" justify="center" style="padding-top: 1%;">
      <el-col :span="10" :offset="0">
        <el-pagination :pager-count="7" background :current-page.sync="cur_page_num" @current-change="handleCurrentChange"
          :page-size="12" :total="total_page_num">
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
  },
  computed: {
  },
  methods: {
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
      this.$axios.get("http://localhost:8080/satquery/leoleo/getLeoLeoInfoByPage", {
        params: {
          curPage: page,
          pageSize: 12,
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
        name: "satauthlog",
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