<template>
    <div>
        <el-row :gutter="0">
            <el-col style="font-size: 30px; font-weight: 600" :span="3" :offset="0">恶意流量监测</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="0">
            <el-col :span="24" :offset="0">
                <el-input type="textarea" :rows="33" readonly placeholder="暂无监测信息" resize="none" v-model="traffic_log">
                </el-input>
            </el-col>
        </el-row>

    </div>
</template>
  
<script>
export default {
    data() {
        return {
            traffic_log: ""
        };
    },

    mounted() {
        this.$store.state.aside_cur_page = "traffic"
        // 获取日志数据
        this.$axios.get("http://localhost:8080/satquery/pretcc/get_traffic_log").then(res => {
            console.log("获取日志数据成功")
            this.traffic_log = res.data
        }).catch(err => {
            console.log("获取日志数据失败")
            this.traffic_log = ""
        })
        // 初始化websocket
        this.initWebSocket()
    },
    destroyed: function () { // 离开页面生命周期函数
        this.websocketclose("tcc");
    },
    computed: {
    },
    methods: {
        initWebSocket: function () { // 建立连接
            // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
            // var userId = store.getters.userInfo.id;
            var userId = "tcc";
            // var url = window._CONFIG['domianURL'].replace("https://", "wss://").replace("http://", "ws://") + "/websocket/" + userId;
            var url = "ws://localhost:8080" + "/websocket/" + userId;
            this.websock = new WebSocket(url);
            this.websock.onopen = this.websocketonopen;
            this.websock.send = this.websocketsend;
            this.websock.onerror = this.websocketonerror;
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onclose = this.websocketclose;
        },
        // 连接成功后调用
        websocketonopen: function () {
            console.log("WebSocket连接成功");
        },
        // 发生错误时调用
        websocketonerror: function (e) {
            console.log("WebSocket连接发生错误");
        },
        // 给后端发消息时调用
        websocketsend: function (e) {
            console.log("WebSocket连接发生错误");
        },
        // 接收后端消息
        // vue 客户端根据返回的cmd类型处理不同的业务响应
        websocketonmessage: function (e) {
            console.log("WebSocket接收到消息：" + e.data);
            this.traffic_log = e.data
        },
        // 关闭连接时调用
        websocketclose: function (e) {
            console.log(" (" + e + ") 连接关闭");
        }
    },
};
</script>
  
<style>
.el-progress {
    width: 70%;
}
</style>