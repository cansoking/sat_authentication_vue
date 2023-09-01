<template>
    <div>
        <el-card :key="1" class="box-card">
            <div slot="header" class="clearfix">
                <span style="font-size: 30px; font-weight: 600;"> TCC卫星注册管理</span>
            </div>
            <template>
                <el-table stripe
                    :data="tableData.filter(data => !search || data.idsat.toString().toLowerCase() === search.toLowerCase())"
                    max-height="650px" border style="width: 100%">
                    <el-table-column prop="idsat" label="卫星身份信息(IDsat)" width="220">
                    </el-table-column>
                    <el-table-column prop="ssid" label="卫星广播身份(SSID)" width="370">
                        <template scope="scope">
                            <span v-if="scope.row.ssid != null">{{ scope.row.ssid }}</span>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="st" label="认证状态(ST)" width="370">
                        <template scope="scope">
                            <span v-if="scope.row.st === 0 || scope.row.st === '0'" style="color: #F56C6C;">认证失败</span>
                            <span v-else-if="scope.row.st === 1 || scope.row.st === '1'" style="color: #67C23A">已认证</span>
                            <span v-else-if="scope.row.st === 2 || scope.row.st === '2'" style="color: #E6A23C">未注册</span>
                            <span v-else-if="scope.row.st === 3 || scope.row.st === '3'" style="color: #909399">未连接</span>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ck" label="会话密钥(CK)" width="370">
                        <template scope="scope">
                            <span v-if="scope.row.ck != null">{{ scope.row.ck }}</span>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center">
                        <template slot="header" slot-scope="scope">
                            <el-input v-model="search" size="mini" placeholder="输入IDsat搜索" />
                        </template>
                        <template slot-scope="scope">
                            <el-popover placement="left" width="300" trigger="click">
                                <el-form size="mini" label-position="top" ref="form" :model="edit_temp_form.cur_table_data">
                                    <el-form-item required label="卫星广播身份(SSID)">
                                        <el-input :maxlength="8" v-model="edit_temp_form.cur_table_data.ssid"></el-input>
                                    </el-form-item>
                                    <el-form-item required label="认证状态(ST)">
                                        <!-- <el-input v-model="edit_temp_form.cur_table_data.st"></el-input> -->
                                        <el-select v-model="edit_temp_form.cur_table_data.st" placeholder="请选择认证状态">
                                            <el-option v-for="item in auth_status" :key="item.value" :label="item.label"
                                                :value="item.value">
                                                <span style="float: left">{{ item.label }}</span>
                                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value
                                                }}</span>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item required label="会话密钥(CK)">
                                        <el-input :maxlength="8" v-model="edit_temp_form.cur_table_data.ck"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="onSubmit">确认修改</el-button>
                                    </el-form-item>
                                </el-form>
                                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                                    slot="reference">编辑</el-button>
                            </el-popover>
                            <el-button size="mini" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-row v-if="total_page_num != 0" type="flex" :gutter="0" justify="center" style="padding-top: 1%;">
                <el-col :span="10" :offset="0">
                    <el-pagination :pager-count="7" background :current-page.sync="cur_page_num"
                        @current-change="handleCurrentChange" :page-size="15" :total="total_page_num">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'SatAuthTccPreInfo',

    data() {
        return {
            search: '',
            cur_page_num: 1,
            total_page_num: 0,
            edit_temp_form: {
                cur_idx: 0,
                cur_table_data: {}
            },
            tableData: [],
            auth_status: [
                {
                    value: 0,
                    label: '认证失败'
                },
                {
                    value: 1,
                    label: '已认证'
                },
                {
                    value: 2,
                    label: '未注册'
                },
                {
                    value: 3,
                    label: '未连接'
                }
            ]
        };
    },

    mounted() {
        this.getDataByPage(1, 15)
        this.$store.state.aside_cur_page = "tccsgauth"
    },

    methods: {
        getDataByPage(page_num, page_size) {
            var that = this;
            this.$axios.get("http://localhost:8080/satquery/tccleo/getTccLeoInfoByPage?curPage=" + page_num + "&pageSize=" + page_size).then
                (function (response) {
                    console.log("地面控制中心预置信息表获取成功");
                    that.total_page_num = response.data.total;
                    that.tableData = response.data.list;
                }, function (err) {
                    console.log("地面控制中心预置信息表数据获取失败");
                })
        },
        handleCurrentChange(val) {
            this.getDataByPage(val, 15);
        }, handleEdit(index, row) {
            this.edit_temp_form.cur_idx = index;
            // 深拷贝
            this.edit_temp_form.cur_table_data = JSON.parse(JSON.stringify(this.tableData[index]));
        },
        handleDelete(index, row) {
            this.edit_temp_form.cur_idx = index;
            // 深拷贝
            this.edit_temp_form.cur_table_data = JSON.parse(JSON.stringify(this.tableData[index]));
            this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete("http://localhost:8080/satquery/tccleo/deleteTccLeoByIDsat/" + this.tableData[index].idsat).then(res => {
                    if (res.data) {
                        this.tableData.splice(index, 1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        onSubmit() {
            this.$axios.put("http://localhost:8080/satquery/tccleo/updateTccLeo", this.edit_temp_form.cur_table_data).then((res) => {
                if (res.data) {
                    this.$set(this.tableData, this.edit_temp_form.cur_idx, this.edit_temp_form.cur_table_data);
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '修改失败!'
                    });
                }
            })
        }
    },
};
</script>

<style></style>